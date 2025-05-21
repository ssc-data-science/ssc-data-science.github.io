import { GoogleGenAI } from "@google/genai";
import { firebaseConfig, GENAPIS, GENMODALNAMES, GENMODALS } from "./config";
import { getClasses, getCourses, getData, setData } from "./api";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router";

export const askGen2Lite = async (message) => {
  let isdone = false;
  let c = 0;
  let responseText = null;
  

  while (!isdone && c < GENAPIS.length) {
    const ai = new GoogleGenAI({ apiKey: GENAPIS[c] });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: message,
        temperature: 0
      });

      if (response && response.text) {
        isdone = true;
        await updateStats("gemini-2.0-flash-lite")
        responseText = response.text;
      } else {
        console.error("Response or response.text is undefined:", response);
      }
    } catch (e) {
      console.error("Error with API key", GENAPIS[c], ":", e);
    }
    c++;
  }

  if (!isdone) {
    console.error("All API keys failed for gemini-2.0-flash-lite.");
  }
  return responseText;
};

export const askGen2Flash = async (message) => {
  let isdone = false;
  let c = 0;
  let responseText = null;

  while (!isdone && c < GENAPIS.length) {
    // Ensure we are using the correct API key for gemini-2.0-flash if they differ
    // For now, assuming GENAPIS can be used for both or user handles this.
    const ai = new GoogleGenAI({ apiKey: GENAPIS[c] });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash", // Changed model name
        contents: message,
        temperature: 0.1 // Slightly higher temp for creative tasks like question gen
      });

      if (response && response.text) {
        isdone = true;
        await updateStats("gemini-2.0-flash"); // Update stats for the correct model
        responseText = response.text;
      } else {
        console.error("Response or response.text is undefined for gemini-2.0-flash:", response);
      }
    } catch (e) {
      console.error("Error with API key for gemini-2.0-flash", GENAPIS[c], ":", e);
    }
    c++;
  }

  if (!isdone) {
    console.error("All API keys failed for gemini-2.0-flash.");
  }
  return responseText;
};

export const askGenForTopics = async (noteContent) => {
    let isdone = false;
    let c = 0;
    let responseText = null;
    const prompt = `From the following text, extract the 5 to 7 most important main topics. List each topic on a new line. Do not add any extra formatting, numbering, or introductory/concluding remarks. Just the topics. Text:\n\n${noteContent}`;

    while (!isdone && c < GENAPIS.length) {
        const ai = new GoogleGenAI({ apiKey: GENAPIS[c] });
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash", 
                contents: prompt,
                temperature: 0 
            });

            if (response && response.text) {
                isdone = true;
                await updateStats("gemini-2.0-flash"); 
                responseText = response.text;
            } else {
                console.error("Response or response.text is undefined for topic extraction:", response);
            }
        } catch (e) {
            console.error("Error with API key for topic extraction", GENAPIS[c], ":", e);
        }
        c++;
    }

    if (!isdone) {
        console.error("All API keys failed for topic extraction.");
    }
    return responseText;
};


export class HelperAI {
  constructor(app, userdata) {
    this.userdata = userdata;
    this.userid = userdata.uid;
    this.app = app
    this.data = undefined
    this.actions = [
      {
        name: 'openNote',
        info: 'the function to open a note by url, also this adds function for AI to suggest what to study based on past logs, notes are at `/notes/${course.id}/${course.grade}/module${moduleIndex}.html`, also whne user asks find time spend by using the time user starts a sesssion and opens a note',
        example: '[date 21] user says What_should_I_study_next?\n[AI] I think it\'s best for you to look into statistics, since you wasn\'t focusing much on it, would you like to open the notes for module 1\n[date] User says yes\n[ACTION] openNote /notes/cs1/fyug-sem-3/module1.html',
        act: (arg) =>{
          window.open(arg)
        },
        type: 'call'
      },
    ]



    this.preprompt = ''
  }


  async log(message) {
    const timestamp = new Date().toISOString();
    try {
      if (this.data == undefined) this.data = await getData(this.app, this.userid, 'ai-helper')
      if (this.data == null) this.data = ''
    } catch (e) {
      this.data = ''
    }

    this.data += this.data == '' ? `[${timestamp}] ${message}` : `\n[${timestamp}] ${message}`
    setData(this.app, this.userid, 'ai-helper', this.data)
  }

  async update() {
    try {

      this.preprompt = `
    For the chat and user actions log given below, you are supposed to reply or suggest an action for the user.
    also for messages reply as per as message, also you are given userdata to refer
    if it is an action return only 
    [ACTION] action_name message

    You only have actions given below:`
    for(let i of this.actions){
      this.preprompt+='\n'+i.name+'\n'+i.info+'Example:\n'+i.example
    }
     this.preprompt += `
    
    Example

    Input: [7 am] Ihjas logged in
           [7 am] Ihjas started a session
    Output: [AI] Welcome Ihjas
    
    Input: [Day1 7 am] Ihjas logged in
           [AI] Welcome Ihjas
           [Day1 8 pm] Ihjas started a session
           [AI] Welcome back!
           [Day8 9 pm] Ihjas started a session
    Output: [ACTION] setReminder You_ate_not_consistant._Would_you_like_to_set_a_reminder?

    Input: [Day1 7 am] Ihjas logged in
           [AI] Welcome Ihjas
           [Day1 8 pm] Ihjas started a session
           [AI] Welcome back!
           [Day8 9 pm] Ihjas started a session
           [ACTION] setReminder You_are_not_consistant._Would_you_like_to_set_a_reminder?
           [date] Ihjas clicked Yes and it returned true
    Output:[AI] Your reminder is set!

    For messages give output like this give continues ouput based on previous convo, return actions when user asks about actions
    Input: [8 AM] Ihjas says Hi_AI
    Output: [AI] Hello Ihjas

    So now give output based on the content:

  `
      if (this.data == undefined) this.data = await getData(this.app, this.userid, 'ai-helper')
      if (this.data == null) this.data = ''
      const classInfo = await getClasses(this.app)
      const courses = await getCourses(this.app)
      let mycourses = courses.find(c=>c.grade == this.userdata.class)

      this.preprompt += "[USERDATA\n]" + JSON.stringify(this.userdata) + "\n{USERCOURSES]\n"+JSON.stringify(mycourses)+"\n[CLASSES]\n" + JSON.stringify(classInfo) + "\n[CHAT]\n"
      this.preprompt += this.data

      const out = await askGen2Lite(this.preprompt) // HelperAI still uses lite for its own operations
      this.data += this.data == '' ? `${out}` : `\n${out}`
      await setData(this.app, this.userid, 'ai-helper', this.data)
      return this.data


    } catch (e) {
      return e
    }
  }

  async parse() {

    let lastMessage;

    if (this.data == undefined) this.data = await getData(this.app, this.userid, 'ai-helper')
    if (this.data == null) this.data = ''
    let messages = this.data.split('\n');

    messages = messages.filter(msg => msg && msg.trim() !== '');

    if (messages.length > 0) {
      lastMessage = messages[messages.length - 1];
    } else {
      return { type: 'empty', message: '' };
    }

    if (lastMessage.startsWith('[AI]')) {
      return { type: 'text', message: lastMessage.substring(4) };
    } else if (lastMessage.startsWith('[ACTION]')) {
      const actionParts = lastMessage.substring(9).split(' ');
      const actionName = actionParts[0].trim();
      const actionMessage = actionParts.slice(1).join(' ').split('_').join(' ');
      console.log(actionName + " " + actionMessage);
      console.log(this.actions);
      let amInt = -1
      this.actions.forEach((a, i) => {
        console.log(a.name + " " + actionName)
        if (a.name == actionName) amInt = i
      })
      const action = this.actions[amInt]
      console.log(action);
      console.log(amInt);
      if (action) {
        return { type: 'action', action: action, message: actionMessage };
      } else {
        return { type: 'text', message: 'Unknown action: ' + lastMessage };
      }
    } else if (lastMessage.startsWith('[EMPTY OUT]')) {
      return { type: 'empty', message: '' };
    } else {
      return { type: 'text', message: lastMessage };
    }

  }
}

/* model data structure 
[
  {
    "name":"gemini-2.0-flash-lite",
    "usageLastMinute":"get using firebase and add one to it"
    "usageToday":"get using firebase and add one to it"
    "lastUpdateTimeStamp":"use thos to tweak the above two"
  },
 {
    "name":"gemini-2.0-flash",
    "usageLastMinute":0,
    "usageToday":0,
    "lastUpdateTimeStamp":"timestamp"
  }
]

the above is stored at /apiusage/default (as an array, index corresponds to GENMODALNAMES)

*/

export const updateStats = async (modalName) => {
  try {
    const app = initializeApp(firebaseConfig); // Consider initializing app once globally
    const db = getDatabase(app);
    const modalIndex = GENMODALNAMES.indexOf(modalName);

    if (modalIndex === -1) {
      console.error(`Modal ${modalName} not found in GENMODALNAMES.`);
      return;
    }

    const usageRef = ref(db, `apiusage/default/${modalIndex}`);
    const snapshot = await get(usageRef);
    let usageData = snapshot.exists() ? snapshot.val() : {
      name: modalName,
      usageLastMinute: 0,
      usageToday: 0,
      lastUpdateTimeStamp: new Date().toISOString()
    };

    const now = new Date();
    const lastUpdate = new Date(usageData.lastUpdateTimeStamp);
    const timeDiff = now.getTime() - lastUpdate.getTime();

    if (timeDiff >= 60000) { // If more than a minute has passed
      usageData.usageLastMinute = 0;
      if (now.getDate() !== lastUpdate.getDate() || now.getMonth() !== lastUpdate.getMonth() || now.getFullYear() !== lastUpdate.getFullYear()) {
        usageData.usageToday = 0; // Reset daily usage if it's a new day
      }
    }

    usageData.usageLastMinute += 1;
    usageData.usageToday += 1;
    usageData.lastUpdateTimeStamp = now.toISOString();
    usageData.name = modalName; // Ensure name is correct

    await set(usageRef, usageData);
    console.log(`API usage stats updated successfully for ${modalName}.`);
  } catch (error) {
    console.error(`Error updating API usage stats for ${modalName}:`, error);
  }
};

export const getStats = async (modalName) => {
  try {
    const app = initializeApp(firebaseConfig); // Consider initializing app once globally
    const db = getDatabase(app);
    const modalIndex = GENMODALNAMES.indexOf(modalName);

    if (modalIndex === -1) {
      console.error(`Modal ${modalName} not found in GENMODALNAMES. Returning default empty stats.`);
      return {
        name: modalName,
        usageLastMinute: 0,
        usageToday: 0,
        lastUpdateTimeStamp: new Date().toISOString()
      };
    }

    const usageRef = ref(db, `apiusage/default/${modalIndex}`);
    const snapshot = await get(usageRef);
    let usageData = snapshot.exists() ? snapshot.val() : {
      name: modalName,
      usageLastMinute: 0,
      usageToday: 0,
      lastUpdateTimeStamp: new Date().toISOString()
    };
    
    // Ensure name field is present
    if (!usageData.name) {
        usageData.name = modalName;
    }

    return usageData;
  } catch (error) {
    console.error(`Error getting API usage stats for ${modalName}:`, error);
    return { // Return a default structure on error
      name: modalName,
      usageLastMinute: 0,
      usageToday: 0,
      lastUpdateTimeStamp: new Date().toISOString()
    };
  }
};