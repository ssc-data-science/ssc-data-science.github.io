import { GoogleGenAI } from "@google/genai";
import { GENAPIS } from "./config";
import { getClasses, getData, setData } from "./api";

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
    console.error("All API keys failed.");
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
        name: 'setReminder',
        info: 'Sets reminder a daily reminder',
        acts: [
          {
            label: 'Yes',
            call: ()=>{
              // set notification
              console.log("Try to set a reminder")
              return true
            }
          },
          {
            label: 'No',
            call: ()=>{
              // do nothing
              return true
            }
          }
        ],
        type: 'choice'
      },
    ]



    this.preprompt = ''
  }

  async log(message) {
    const timestamp = new Date().toISOString();
    try{
      if(this.data == undefined) this.data = await getData(this.app, this.userid, 'ai-helper' )
      if(this.data == null) this.data = ''
    }catch(e){
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

    You only have actions given below:

    setReminder
       this action sets reminder for everyday, it can only be done once 
    
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
           [ACTION] setReminder You_ate_not_consistant._Would_you_like_to_set_a_reminder?
           [date] Ihjas clicked Yes and it returned true
    Output:[AI] Your reminder is set!

    For messages give output like this give continues ouput based on previous convo, return actions when user asks about actions
    Input: [8 AM] Ihjas says Hi_AI
    Output: [AI] Hello Ihjas

    So now give output based on the content:

  `
      if(this.data == undefined) this.data = await getData(this.app, this.userid, 'ai-helper' )
      if(this.data == null) this.data = ''
      const classInfo =  await getClasses(this.app)


      this.preprompt += "[USERDATA\n]"+JSON.stringify(this.userdata)+"\n[CLASSES]\n"+JSON.stringify(classInfo)+"\n[CHAT]\n"
      this.preprompt += this.data

      console.log(this.data)
      const out = await askGen2Lite(this.preprompt)

      // if out is EMPTY OUT, stop here      
      if(out == '[EMPTY OUT]') return this.data

      
      this.data += this.data == '' ? `${out}` : `\n${out}`
      await setData(this.app, this.userid, 'ai-helper', this.data)
      return this.data


    } catch (e) {
      return e
    }
  }

  async parse(){

    let lastMessage;

    if(this.data == undefined) this.data = await getData(this.app, this.userid, 'ai-helper' )
    if(this.data == null) this.data = ''
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
      this.actions.forEach((a,i)=>{
        console.log(a.name + " " + actionName)
        if(a.name == actionName) amInt = i
      })
      const action = this.actions[amInt]
      console.log(action);
      console.log(amInt);
      if (action) {
        return { type: 'action', action: action, message: actionMessage };
      } else {
        return { type: 'text', message: 'Unknown action: '+lastMessage };
      }
    } else if (lastMessage.startsWith('[EMPTY OUT]')) {
      return { type: 'empty', message: '' };
    } else {
      return { type: 'text', message: lastMessage };
    }

  }
}