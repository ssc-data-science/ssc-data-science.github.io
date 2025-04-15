# Introduction to AI and Machine Learning (CSC3MN202)

**Programme:** B. Sc. Computer Science
**Course Code:** CSC3MN202
**Course Title:** Introduction to AI and Machine Learning
**Type of Course:** Minor
**Semester:** III
**Academic Level:** 200 - 299
**Credits:** 4 (Lecture: 3, Practical: 2)
**Total Hours:** 75

**Pre-requisites:**
1.  Fundamental Mathematics Concepts: Sets
2.  Fundamentals of Python Programming

**Course Summary:** This course provides an introduction to the ideas, techniques, and applications of artificial intelligence (AI). The fundamentals of knowledge representation, machine learning, and problem solving will be taught to the students.

---

## Module I: Introduction to Artificial Intelligence & Problem Solving

**(15 Hours, 12 Marks)**

This module introduces the fundamental concepts of Artificial Intelligence, its history, major domains, and core techniques for solving problems computationally.

### Unit 1: Introduction to AI – Evolution of AI, AI problems, AI Techniques, AI Applications (4 Hrs)

#### What Is Artificial Intelligence?

Artificial intelligence (AI) is a field of study concerned with building computer systems that exhibit intelligent behavior – systems that can adapt to their environments and learn from experience. Although most attempts to define complex and widely used terms precisely are exercises in futility, it is useful to draw at least an approximate boundary around the concept to provide a perspective on the discussion that will follow (Rich, 1983). Artificial Intelligence (AI) is the study of how to make computers do things at which, at the moment, people are better.

What exactly is artificial intelligence? The definition has changed over time, but at its core, AI involves creating machines capable of performing tasks that typically require human intelligence, such as learning, problem-solving, perception, language understanding, and decision-making.

#### Evolution of AI

The field of AI has a rich history, dating back to the mid-20th century. Early work focused on symbolic reasoning, attempting to replicate human thought processes using logic and rules (e.g., Newell & Simon's Logic Theorist). This led to developments in areas like game playing (checkers, chess) and theorem proving. The subsequent decades saw periods of excitement ("AI Springs") fueled by breakthroughs, followed by periods of reduced funding and skepticism ("AI Winters") when overly optimistic predictions were not met.

Key milestones include:
*   **Early Years (1950s-60s):** Birth of AI as a field (Dartmouth Workshop, 1956), development of early programs like Logic Theorist and GPS (General Problem Solver), initial work on perceptrons.
*   **Knowledge-Based Systems (1970s-80s):** Rise of expert systems (e.g., MYCIN for medical diagnosis) that encoded domain-specific knowledge as rules. Emphasis on knowledge representation and reasoning.
*   **Machine Learning Emerges (1980s-90s):** Renewed interest in connectionism (neural networks) with the development of backpropagation. Rise of machine learning algorithms like decision trees (ID3, C4.5). Development of theoretical foundations (PAC learning).
*   **Modern AI (2000s-Present):** Explosion of data ("Big Data") and computational power fuels advances in machine learning, particularly deep learning. Successes in areas like image recognition, natural language processing (NLP), game playing (AlphaGo), and autonomous systems. Statistical approaches become dominant.

#### AI Problems

AI addresses a wide range of problems. Some core categories include:

1.  **Problem Solving & Search:** Finding a sequence of actions to reach a goal state from an initial state (e.g., game playing, route finding, puzzles).
2.  **Knowledge Representation & Reasoning:** How to store knowledge about the world and use it to infer new facts or make decisions (e.g., expert systems, semantic webs).
3.  **Learning:** Enabling systems to improve their performance on a task through experience (covered extensively in later modules).
4.  **Perception:** Enabling systems to interpret sensory input (e.g., computer vision, speech recognition).
5.  **Natural Language Processing (NLP):** Enabling systems to understand and generate human language (e.g., machine translation, chatbots, text summarization).
6.  **Planning:** Devising a sequence of actions to achieve a complex goal, often involving reasoning about time and resources.
7.  **Robotics:** Integrating perception, planning, learning, and action to enable physical agents to operate in the real world.

#### AI Techniques

Various techniques are employed to tackle AI problems:

1.  **Search Algorithms:** Methods for exploring possible solutions in a state space (e.g., Breadth-First Search, Depth-First Search, A*, Heuristic Search). (Rich, 1983, Chapter 2, 3)
2.  **Logic-Based Methods:** Using formal logic (propositional, predicate) for knowledge representation and reasoning (e.g., resolution, theorem proving). (Rich, 1983, Chapter 5)
3.  **Probabilistic Reasoning:** Using probability theory to handle uncertainty (e.g., Bayesian networks). (Alpaydin, 2010, Chapter 3, 16; Rich, 1983, Chapter 6)
4.  **Machine Learning:** Algorithms that learn patterns and models from data (e.g., decision trees, neural networks, support vector machines). (Mitchell, 1997; Alpaydin, 2010)
5.  **Optimization Techniques:** Methods for finding the best solution according to some objective function (e.g., gradient descent, simulated annealing).

#### AI Applications

AI has permeated numerous fields:
*   **Healthcare:** Medical diagnosis, drug discovery, personalized medicine.
*   **Finance:** Fraud detection, algorithmic trading, credit scoring.
*   **Transportation:** Autonomous vehicles, traffic management, route optimization.
*   **Entertainment:** Game playing AI, recommendation systems (movies, music).
*   **E-commerce:** Product recommendations, personalized advertising, customer service chatbots.
*   **Manufacturing:** Predictive maintenance, quality control, robotics automation.
*   **Security:** Intrusion detection, biometric identification.
*   **Science:** Data analysis in fields like astronomy, genomics, climate modeling.

### Unit 2: Various AI Domains (Introduction only) (2 Hrs)

AI is not a monolithic field but encompasses several specialized domains. Here's a brief overview:

*   **Machine Learning (ML):** Focuses on algorithms that allow systems to learn from data without being explicitly programmed. This is a major focus of this course.
*   **Natural Language Processing (NLP):** Deals with the interaction between computers and human language, enabling machines to understand, interpret, and generate text and speech.
*   **Computer Vision:** Enables computers to "see" and interpret visual information from images or videos. Tasks include object recognition, image segmentation, and facial recognition.
*   **Robotics:** Combines AI techniques (perception, planning, learning) with mechanical engineering to create intelligent physical agents (robots) capable of interacting with the environment.
*   **Expert Systems:** AI systems designed to emulate the decision-making ability of a human expert in a specific, narrow domain, typically using a knowledge base and an inference engine.
*   **Planning and Scheduling:** Developing sequences of actions (plans) or allocating resources over time (schedules) to achieve specific goals, often under constraints.
*   **Knowledge Representation and Reasoning (KR&R):** Concerned with how knowledge about the world can be represented formally and how automated reasoning processes can derive new knowledge from existing information.

### Unit 3: Problem Solving Techniques - Search Algorithms, Knowledge representation and reasoning (Concepts only) (3 Hrs)

#### Problem Solving as Search

Many AI problems can be framed as searching for a solution within a defined **state space**.
*   **State:** A configuration of the problem world (e.g., a board configuration in checkers, a specific arrangement of puzzle tiles).
*   **Initial State:** The starting configuration.
*   **Goal State(s):** The desired configuration(s).
*   **Operators/Actions:** Rules that transform one state into another (e.g., legal moves in a game).
*   **Path:** A sequence of states connected by operators.
*   **Solution:** A path from the initial state to a goal state.

The **state space** is the set of all states reachable from the initial state by any sequence of actions. Problem-solving involves searching this space for a solution path. (Rich, 1983, Chapter 2)

**Common Search Strategies (Conceptual Overview):**

*   **Uninformed Search:** Strategies that explore the state space without using any knowledge about the problem domain beyond the state definitions and operators.
    *   *Breadth-First Search (BFS):* Explores level by level. Guaranteed to find the shortest path (in terms of number of steps) if one exists. Can be memory-intensive.
    *   *Depth-First Search (DFS):* Explores as deeply as possible along one path before backtracking. More memory-efficient than BFS but may not find the shortest path and can get stuck in infinite paths.
*   **Informed (Heuristic) Search:** Strategies that use problem-specific knowledge (heuristics) to guide the search towards promising states, often aiming to reduce the search effort.
    *   *Best-First Search:* Expands the node that appears most promising according to a heuristic evaluation function.
    *   *A* Search:* Combines the cost to reach the node (g) and a heuristic estimate of the cost to reach the goal (h) to guide the search (f = g + h). Optimal if the heuristic is admissible (never overestimates the true cost). (Rich, 1983, Chapter 3)

#### Knowledge Representation and Reasoning (KR&R) (Concepts)

AI systems often need to represent knowledge about the world and reason with it.
*   **Knowledge Representation (KR):** The process of formalizing knowledge in a way that a computer system can use. Common KR schemes include:
    *   *Logic (Propositional, Predicate):* Representing facts and rules using logical connectives and quantifiers. (Rich, 1983, Chapter 5)
    *   *Semantic Networks:* Graph-based structures where nodes represent concepts and edges represent relationships between them. (Rich, 1983, Chapter 7)
    *   *Frames:* Data structures representing stereotyped situations, containing slots for specific attributes and their values. (Rich, 1983, Chapter 7)
    *   *Production Rules:* IF-THEN rules representing condition-action pairs, often used in expert systems. (Rich, 1983, Chapter 2)
*   **Reasoning:** The process of manipulating represented knowledge to derive new conclusions, solve problems, or make decisions. Inference mechanisms depend on the KR scheme used (e.g., logical deduction, graph traversal).

### Unit 4: Problem Solving Techniques - Constraint Satisfaction Problems, Game Playing (Concepts only) (3 Hrs)

#### Constraint Satisfaction Problems (CSPs)

Many AI problems involve finding a state or configuration that satisfies a set of constraints.
*   **Variables:** A set of variables {X1, ..., Xn}.
*   **Domains:** Each variable Xi has a domain Di of possible values.
*   **Constraints:** A set of constraints that specify allowable combinations of values for subsets of variables.
*   **Goal:** Find an assignment of values to all variables from their respective domains such that all constraints are satisfied.

**Examples:** Map coloring, scheduling problems, Sudoku.

**Solving CSPs (Conceptual Overview):**
CSPs are typically solved using specialized search algorithms that incorporate constraint propagation (using constraints to reduce the domains of variables) and backtracking search. Techniques include:
*   Backtracking Search
*   Constraint Propagation (e.g., Arc Consistency)
*   Heuristics for variable and value ordering. (Rich, 1983, Chapter 3)

#### Game Playing

Game playing has been a classic AI research area. Games often involve:
*   **Multiple Agents (Players):** Usually two players with opposing goals.
*   **Defined Rules:** Clear rules governing moves and winning conditions.
*   **Search Space:** The tree of possible game states reachable through legal moves.

**Key Concepts:**

*   **Game Tree:** Represents all possible sequences of moves. Nodes are game states, edges are moves.
*   **Minimax Algorithm:** A recursive algorithm for choosing the optimal move in a two-player game, assuming the opponent also plays optimally. It minimizes the maximum possible loss for the player. (Rich, 1983, Chapter 4)
*   **Alpha-Beta Pruning:** An optimization technique for minimax that prunes branches of the game tree that cannot influence the final decision, significantly reducing the search space. (Rich, 1983, Chapter 4)
*   **Evaluation Function:** Used to estimate the desirability of a game state when the full game tree cannot be explored (e.g., in chess). Learning evaluation functions is a key task (as seen in the Checkers example).

### Unit 5: Problem Solving Techniques - Machine Learning, Simulated Annealing (Concepts only) (3 Hrs)

#### Machine Learning in Problem Solving

Machine learning (ML) offers alternative approaches to problem-solving, especially when explicit rules or models are hard to define.
*   **Learning from Experience:** ML systems improve their problem-solving strategies by learning from past data or interactions.
*   **Examples:**
    *   Learning an evaluation function for game playing (like Checkers).
    *   Learning search control rules to guide search algorithms more effectively.
    *   Using Reinforcement Learning (see Module IV) to learn optimal action sequences through trial-and-error.

Machine learning allows systems to automatically discover patterns and strategies that might be missed by human designers, particularly in complex domains. (Mitchell, 1997, Chapter 1; Alpaydin, 2010, Chapter 1)

#### Simulated Annealing (Concept)

Simulated Annealing is a probabilistic optimization technique inspired by the annealing process in metallurgy. It's used for finding a good approximation to the global optimum of a given function in a large search space.
*   **Idea:** Analogous to slowly cooling a material to reach a minimum energy state. Starts with a high "temperature," allowing random moves (even to worse states) to escape local optima. Gradually "cools" the system, reducing the probability of accepting worse moves, eventually settling near a good solution.
*   **Use in AI:** Can be applied to optimization problems arising in search, planning, or learning where the search space is complex and prone to local optima.

---

## Module II: Introduction to Neural Networks

**(8 Hours, 12 Marks)**

This module introduces the basics of Artificial Neural Networks (ANNs), inspired by the structure and function of the human brain. We explore simple models like the perceptron and the foundations of learning in these networks.

### Unit 6: Introduction to Artificial Neural Network (2 Hrs)

Artificial Neural Networks (ANNs) are computational models inspired by the structure and function of biological neural networks in the brain. They consist of interconnected processing units called **neurons** or **nodes**, organized in layers. (Alpaydin, 2010, Chapter 11; Mitchell, 1997, Chapter 4)

**Key Characteristics:**
*   **Parallel Processing:** Information is processed in parallel across many simple units.
*   **Distributed Representation:** Knowledge is often distributed across the network's connections (weights), rather than being stored in specific locations.
*   **Learning from Data:** ANNs learn by adjusting the strengths (**weights**) of the connections between neurons based on training data.
*   **Fault Tolerance:** Performance often degrades gracefully if parts of the network are damaged.

**Why Study ANNs?**
*   **Brain Inspiration:** To understand natural intelligence and potentially replicate its capabilities.
*   **Parallel Computation Paradigm:** Offers a framework for massive parallel computation.
*   **Practical Applications:** Effective for tasks like pattern recognition, classification, regression, and function approximation, especially with complex, high-dimensional data.

### Unit 7: Understanding Brain & Perceptron Model (2 Hrs)

#### Biological Inspiration (Brief Overview)

The brain is composed of billions of neurons connected by synapses. A neuron receives signals from other neurons through its dendrites, integrates these signals in its cell body (soma), and if the total signal exceeds a threshold, it "fires," sending a signal down its axon to other neurons via synapses. Learning is believed to involve changes in the strength of these synaptic connections. (Alpaydin, 2010, Section 11.1.1)

#### The Perceptron Model

The **perceptron** (Rosenblatt, 1962) is one of the earliest and simplest ANN models. (Alpaydin, 2010, Section 11.2; Mitchell, 1997, Chapter 4)
*   **Structure:** Consists of input units, weights associated with each input, and a single output unit. Often includes a **bias** term (an input fixed at +1 with its own weight).
*   **Computation:**
    1.  Calculates a weighted sum of its inputs: $o = \sum_{j=1}^{d} w_j x_j + w_0 = \mathbf{w}^T \mathbf{x}$ (using augmented vectors $\mathbf{w} = [w_0, w_1, ..., w_d]^T$ and $\mathbf{x} = [1, x_1, ..., x_d]^T$).
    2.  Applies an **activation function** (typically a step function or threshold function) to the weighted sum to produce the output: $y = \text{step}(o)$.
        *   Step function: $y = 1$ if $o > \theta$, else $y = 0$ (or -1). Threshold $\theta$ can be absorbed into the bias weight $w_0$.

The perceptron essentially implements a linear discriminant, defining a hyperplane ($ \mathbf{w}^T \mathbf{x} = 0 $) that separates the input space into two classes.

### Unit 8: Single Layer Perceptron Model & Learning in Single layer Perceptron Model (2 Hrs)

A single-layer perceptron consists of one layer of output neurons, each receiving input directly from the input layer.

**Capabilities:**
*   Can learn linearly separable functions (e.g., AND, OR).
*   Cannot learn functions that are not linearly separable (e.g., XOR). (Minsky & Papert, 1969)

**Learning: The Perceptron Training Rule**

The goal is to find a weight vector $\mathbf{w}$ such that the perceptron correctly classifies all training examples. The Perceptron Training Rule iteratively adjusts weights based on misclassified examples: (Mitchell, 1997, Section 4.4)

For each training example $\langle \mathbf{x}, t \rangle$ (where $t$ is the target output):
1.  Compute the perceptron output $o = \text{sgn}(\mathbf{w}^T \mathbf{x})$ (using sign function: +1 or -1).
2.  Update weights: $w_j \leftarrow w_j + \Delta w_j$, where $\Delta w_j = \eta (t - o) x_j$.
    *   $\eta$ is the learning rate (a small positive constant).
    *   Update occurs only if the example is misclassified ($t \neq o$).
    *   The weight update moves the decision boundary to better classify the current example.

**Convergence:** If the training data is linearly separable and $\eta$ is sufficiently small, the Perceptron Training Rule is guaranteed to converge to a weight vector that correctly classifies all training examples.

**Gradient Descent Learning (Delta Rule):**
For perceptrons with continuous activation functions (like the sigmoid) or for regression, gradient descent is used. The update rule minimizes the squared error $E = \frac{1}{2} \sum_{d \in D} (t_d - o_d)^2$. The online update for a single example $\langle \mathbf{x}, t \rangle$ is:
$\Delta w_j = \eta (t - o) x_j$ (for linear units)
$\Delta w_j = \eta (t - o) o(1-o) x_j$ (for sigmoid units, where $o = \text{sigmoid}(\mathbf{w}^T \mathbf{x})$)
This is also known as the **delta rule** or **Widrow-Hoff rule**. (Mitchell, 1997, Section 4.4)

### Unit 9: Multi-Layer Perceptron Model & Learning in Multi-layer Perceptron Model (2 Hrs)

To overcome the limitations of single-layer perceptrons (i.e., inability to represent non-linearly separable functions like XOR), **Multi-Layer Perceptrons (MLPs)** were introduced. (Alpaydin, 2010, Section 11.5; Mitchell, 1997, Chapter 4)

**Structure:**
*   Consists of an input layer, one or more **hidden layers**, and an output layer.
*   Neurons in hidden layers typically use non-linear activation functions (e.g., sigmoid, tanh, ReLU).
*   The hidden layers allow the network to learn complex, non-linear mappings between inputs and outputs by transforming the input into a different feature space where the problem might become linearly separable.

**Universal Approximation Theorem:** MLPs with one hidden layer (using a suitable non-linear activation function like sigmoid) and enough hidden units can approximate any continuous function to an arbitrary degree of accuracy. (Hornik et al., 1989)

**Learning: Backpropagation Algorithm**

Training an MLP involves finding weights for all connections (input-to-hidden, hidden-to-output) that minimize an error function (e.g., sum-of-squared errors for regression, cross-entropy for classification). The **Backpropagation algorithm** is the standard method for training MLPs using gradient descent. (Alpaydin, 2010, Section 11.7; Mitchell, 1997, Section 4.5)

**Concept:**
1.  **Forward Pass:** Input pattern is presented, activations propagate forward through the network to produce an output.
2.  **Backward Pass:** The error between the network's output and the target output is calculated. This error is then propagated backward through the network, layer by layer.
3.  **Weight Update:** Weights are adjusted based on their contribution to the error, using the gradient calculated during the backward pass (using the chain rule of calculus).

*   Output layer weights are updated using the delta rule.
*   Hidden layer weights are updated based on the backpropagated error signal, which reflects how much that hidden unit contributed to the output error.

Backpropagation allows efficient calculation of the gradient of the error function with respect to all weights in the network, enabling the use of gradient descent for training complex, multi-layered architectures.

---

## Module III: Python Packages for AI

**(15 Hours, 10 Marks)**

Developing AI and Machine Learning applications often involves using specialized software libraries. Python has become the dominant language for AI/ML due largely to its powerful and easy-to-use libraries. This module introduces key Python packages essential for data manipulation, visualization, and building ML/DL models.

### Unit 10: Pandas (3 Hrs)

*   **Purpose:** Pandas is the fundamental library for data manipulation and analysis in Python. It provides high-performance, easy-to-use data structures and data analysis tools.
*   **Key Data Structures:**
    *   `Series`: A one-dimensional labeled array capable of holding any data type.
    *   `DataFrame`: A two-dimensional labeled data structure with columns of potentially different types. Think of it like a spreadsheet, a SQL table, or a dictionary of Series objects. This is the primary Pandas data structure used in ML.
*   **Core Functionality in AI/ML:**
    *   **Loading Data:** Reading data from various file formats (CSV, Excel, JSON, SQL databases, etc.) into DataFrames.
    *   **Data Cleaning:** Handling missing values (NaNs), dropping or filling them.
    *   **Data Transformation:** Applying functions, merging/joining datasets, reshaping (pivoting), selecting subsets of data (indexing, slicing).
    *   **Feature Engineering:** Creating new features from existing ones.
    *   **Exploratory Data Analysis (EDA):** Calculating descriptive statistics (mean, median, std dev), grouping data (`groupby`), checking distributions.
*   **Integration:** Works seamlessly with NumPy and other scientific libraries like Scikit-learn and Matplotlib.

### Unit 11: Matplotlib (3 Hrs)

*   **Purpose:** Matplotlib is the foundational library for creating static, animated, and interactive visualizations in Python. It provides a wide variety of plotting capabilities.
*   **Core Functionality in AI/ML:**
    *   **Data Visualization:** Creating plots to understand data distributions, relationships between variables, and model results.
    *   **Common Plots:**
        *   Line plots (e.g., plotting error over training epochs).
        *   Scatter plots (e.g., visualizing clusters or relationships between two features).
        *   Histograms (e.g., showing the distribution of a feature).
        *   Bar charts (e.g., comparing performance metrics).
        *   Box plots (e.g., visualizing distribution summaries).
        *   Heatmaps (e.g., visualizing correlation matrices).
    *   **Customization:** Extensive options for customizing plot appearance (labels, titles, colors, styles).
*   **Integration:** Often used in conjunction with Pandas and NumPy. Libraries like Seaborn are built on top of Matplotlib to provide higher-level interfaces for more complex statistical visualizations.

### Unit 12: Keras (3 Hrs)

*   **Purpose:** Keras is a high-level API (Application Programming Interface) for building and training neural networks, particularly deep learning models. It focuses on user-friendliness, modularity, and extensibility. It can run on top of different backends like TensorFlow, Theano, or CNTK.
*   **Key Concepts:**
    *   **Models:** The main container is the `Model` (usually `Sequential` for simple stacks of layers or the Functional API for more complex architectures).
    *   **Layers:** Building blocks of neural networks (e.g., `Dense` for fully connected layers, `Conv2D` for convolutional layers, `LSTM` for recurrent layers, `Dropout` for regularization).
    *   **Compilation:** Configuring the learning process via the `compile` method (specifying optimizer, loss function, metrics).
    *   **Training:** Fitting the model to data using the `fit` method.
    *   **Evaluation/Prediction:** Assessing model performance (`evaluate`) and making predictions on new data (`predict`).
*   **Use in AI/ML:** Primarily used for deep learning tasks like image classification, natural language processing, and time series analysis. Simplifies the process of defining, training, and evaluating complex neural network architectures.

### Unit 13: Scikit-learn (3 Hrs)

*   **Purpose:** Scikit-learn is one of the most comprehensive and widely used libraries for traditional machine learning algorithms in Python. It provides efficient tools for data analysis and machine learning built upon NumPy, SciPy, and Matplotlib.
*   **Core Functionality:**
    *   **Classification:** Algorithms like SVM, k-NN, Decision Trees, Random Forests, Logistic Regression, Naive Bayes.
    *   **Regression:** Linear Regression, Ridge Regression, Lasso, SVR, Decision Trees.
    *   **Clustering:** K-Means, DBSCAN, Hierarchical Clustering, Spectral Clustering.
    *   **Dimensionality Reduction:** PCA, LDA, NMF.
    *   **Model Selection:** Tools for splitting data (train/test split), cross-validation, hyperparameter tuning (GridSearchCV, RandomizedSearchCV).
    *   **Preprocessing:** Feature scaling (StandardScaler, MinMaxScaler), encoding categorical variables (OneHotEncoder), handling missing values (Imputer).
    *   **Metrics:** Functions for evaluating model performance (accuracy, precision, recall, F1-score, ROC AUC, mean squared error).
*   **API:** Provides a consistent and simple API across different algorithms (`fit`, `predict`, `transform`).

---

## Module IV: Machine Learning Fundamentals

**(7 Hours, 16 Marks)**

This module covers the core concepts underpinning Machine Learning, differentiating between major learning paradigms and introducing key techniques within each.

### Unit 15: Introduction to Machine learning (1 Hr)

Machine learning is programming computers to optimize a performance criterion using example data or past experience. We need learning in cases where we cannot directly write a computer program to solve a given problem, but need example data or experience. (Alpaydin, 2010, Chapter 1).

Machine learning uses the theory of statistics in building mathematical models, because the core task is making inference from a sample. The role of computer science is twofold: First, in training, we need efficient algorithms to solve the optimization problem, as well as to store and process the massive amount of data we generally have. Second, once a model is learned, its representation and algorithmic solution for inference needs to be efficient as well. (Alpaydin, 2010, Chapter 1).

**Definition (Mitchell, 1997):** A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.

### Unit 16: Applications of Machine Learning (1 Hr)

ML algorithms have proven to be of great practical value in numerous domains: (Mitchell, 1997, Chapter 1; Alpaydin, 2010, Chapter 1)
*   **Data Mining:** Discovering patterns in large databases (e.g., market basket analysis, fraud detection).
*   **Computer Vision:** Image recognition, object detection.
*   **Natural Language Processing (NLP):** Spam filtering, machine translation, sentiment analysis.
*   **Robotics:** Autonomous navigation, control learning.
*   **Bioinformatics:** Sequence alignment, predicting protein structure.
*   **Recommendation Systems:** Suggesting products, movies, or articles.
*   **Finance:** Stock market prediction, credit scoring.

### Unit 17: Supervised machine learning - Classification, regression (Concepts only) (2 Hrs)

In **supervised learning**, the goal is to learn a mapping from inputs **x** to outputs **y**, given a labeled set of input-output pairs $D = \{(\mathbf{x}^{(t)}, y^{(t)}) \}_{t=1}^N$. The algorithm learns a function $g(\mathbf{x} | \theta)$ parameterized by $\theta$ that approximates the true underlying function $f(\mathbf{x})$. (Mitchell, 1997, Chapter 1; Alpaydin, 2010, Chapter 2)

*   **Classification:** The output $y$ is a discrete category or class label (e.g., spam/not spam, digit 0-9, low-risk/high-risk). The learned function $g(\mathbf{x})$ is called a **classifier** or **discriminant function**. Goal is often to minimize misclassification error. (Alpaydin, 2010, Section 1.2.2)
*   **Regression:** The output $y$ is a continuous numerical value (e.g., price of a house, temperature). The learned function $g(\mathbf{x})$ is called a **regressor**. Goal is often to minimize the squared error between predicted and actual values, $E = \sum_t (y^{(t)} - g(\mathbf{x}^{(t)}))^2$. (Alpaydin, 2010, Section 1.2.3)

### Unit 18: Unsupervised machine learning (1 Hr)

In **unsupervised learning**, we are given only input data $D = \{\mathbf{x}^{(t)} \}_{t=1}^N$ without corresponding output labels. The goal is to find regularities, patterns, or structure in the input data. (Alpaydin, 2010, Section 1.2.4)

Common tasks include:
*   **Density Estimation:** Modeling the underlying probability distribution $p(\mathbf{x})$ of the data.
*   **Clustering:** Grouping similar instances together into clusters.
*   **Dimensionality Reduction:** Finding a lower-dimensional representation of the data while preserving important structure.

### Unit 19: Clustering, Dimensionality Reduction (Concepts only) (1 Hr)

*   **Clustering:** The process of partitioning a dataset into groups (clusters) such that instances within a cluster are more similar to each other than to instances in other clusters. Similarity is typically based on a distance measure (e.g., Euclidean distance). Common algorithms include K-Means. (Alpaydin, 2010, Chapter 7)
*   **Dimensionality Reduction:** The process of reducing the number of features (dimensions) of the data, typically for visualization, computational efficiency, or noise reduction. (Alpaydin, 2010, Chapter 6)
    *   **Feature Selection:** Selecting a subset of the original features.
    *   **Feature Extraction:** Creating new, lower-dimensional features from combinations of the original ones (e.g., Principal Component Analysis - PCA).

### Unit 20: Basics of reinforcement learning (1 Hr)

**Reinforcement Learning (RL)** deals with an **agent** learning to behave in an **environment** by performing **actions** and receiving **rewards** or **penalties**. The agent learns a **policy** (a mapping from states to actions) that maximizes its cumulative reward over time. (Mitchell, 1997, Chapter 13; Alpaydin, 2010, Section 1.2.5, Chapter 18)

**Key Concepts:**
*   **Agent:** The learner or decision-maker.
*   **Environment:** Everything outside the agent.
*   **State (s):** A description of the current situation.
*   **Action (a):** A choice made by the agent.
*   **Reward (r):** Feedback from the environment indicating the immediate desirability of an action/state.
*   **Policy (π):** The agent's strategy for choosing actions in given states.
*   **Value Function (V(s) or Q(s, a)):** Represents the expected long-term cumulative reward starting from a state or state-action pair.
*   **Exploration vs. Exploitation:** The dilemma of choosing between trying new actions to discover their rewards (exploration) and choosing actions known to yield high rewards (exploitation).

RL is suitable for problems involving sequential decision-making, such as game playing, robotics, and control systems.

### Unit 21: Definition and history of deep learning (1 Hr)

**Deep Learning** is a subfield of machine learning based on artificial neural networks with multiple layers (**deep architectures**). These deep networks learn hierarchical representations of data, where higher-level features are composed from lower-level ones.

*   **Definition:** Using neural networks with significant depth (many layers) to learn complex patterns and representations directly from data.
*   **Brief History:** Roots in early neural network research (perceptrons, backpropagation). Experienced a resurgence in the mid-2000s due to:
    *   Availability of large datasets (e.g., ImageNet).
    *   Increased computational power (especially GPUs).
    *   Algorithmic advances (e.g., better initialization, activation functions like ReLU, regularization techniques like dropout, new architectures like Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs)).

### Unit 22: Key differences between traditional machine learning and deep learning (1 Hr)

| Feature                 | Traditional Machine Learning                  | Deep Learning                                     |
| :---------------------- | :------------------------------------------- | :------------------------------------------------ |
| **Feature Engineering** | Heavily relies on manual feature engineering | Learns features automatically from raw data       |
| **Data Requirements**   | Can work well with smaller datasets         | Generally requires large amounts of labeled data |
| **Hardware**            | Can often run on standard CPUs              | Often requires GPUs/TPUs for efficient training   |
| **Architecture**        | Typically shallower models (e.g., SVM, DT)  | Deep architectures with many layers (ANNs)      |
| **Interpretability**    | Often more interpretable                     | Can be more like a "black box"                  |
| **Performance**         | State-of-the-art for some structured data   | State-of-the-art for unstructured data (images, text, speech) |
| **Problem Suitability** | Well-suited for structured data, smaller N  | Excels at complex pattern recognition tasks       |

---

## Module V: Hands-on Artificial Intelligence & Machine Learning using Python

**(30 Hours, 20 Marks)**

This module focuses on the practical application of AI and ML concepts using Python libraries. It includes building models for various tasks, understanding feature engineering, and applying these techniques in case studies and projects. *(Note: The actual implementation details would be covered in the practical sessions. This section describes the concepts behind the practical work.)*

### Unit 1: Practical Applications, Case Study and Course Project (20 Hrs)

#### 1. Neural Network Implementation Concepts

*   **Building a Single Layer Perceptron (SLP) using Keras:**
    *   Concept: Define a `Sequential` model in Keras. Add a single `Dense` layer (fully connected) with the appropriate number of output units and activation function (e.g., 'sigmoid' for binary classification, 'linear' for regression). Compile the model with a loss function (e.g., 'binary_crossentropy', 'mse') and an optimizer (e.g., 'sgd', 'adam'). Train using `model.fit()`.
*   **Setting up a Multi-layer Perceptron (MLP) model:**
    *   Concept: Similar to SLP, but add one or more `Dense` hidden layers *before* the output layer. Hidden layers typically use non-linear activation functions like 'relu' or 'sigmoid'. The number of units in hidden layers is a hyperparameter.

#### 2. Supervised Machine Learning Implementation Concepts

*   **Linear Regression using Scikit-learn:**
    *   Concept: Use `sklearn.linear_model.LinearRegression`. Prepare data (features X, target y). Instantiate the model. Train using `model.fit(X_train, y_train)`. Predict using `model.predict(X_test)`. Evaluate using metrics like Mean Squared Error (MSE).
*   **Decision Tree using Scikit-learn:**
    *   Concept: Use `sklearn.tree.DecisionTreeClassifier` (for classification) or `DecisionTreeRegressor` (for regression). Prepare data. Instantiate the model (hyperparameters include `max_depth`, `criterion` like 'gini' or 'entropy'). Train using `model.fit(X_train, y_train)`. Predict using `model.predict(X_test)`. Evaluate using appropriate metrics (accuracy, MSE). Decision trees work by recursively partitioning the feature space based on tests on feature values.

#### 3. Unsupervised Machine Learning Implementation Concepts

*   **K-Means Clustering using Scikit-learn:**
    *   Concept: Use `sklearn.cluster.KMeans`. Specify the number of clusters `k` (`n_clusters` parameter). Prepare data (features X). Instantiate the model. Fit the model using `model.fit(X)`. Obtain cluster labels using `model.labels_` or predict cluster for new data using `model.predict(X_new)`. K-Means works by iteratively assigning points to the nearest centroid and updating centroids based on the mean of assigned points.

#### 4. Feature Engineering Concepts

*   **Principal Component Analysis (PCA) using Scikit-learn:**
    *   Concept: Use `sklearn.decomposition.PCA`. Specify the number of components `n_components`. Fit the model to the data using `model.fit(X)`. Transform the data to the lower-dimensional space using `model.transform(X)`. PCA finds orthogonal directions (principal components) of maximum variance in the data. (Alpaydin, 2010, Section 6.3)
*   **Feature Selection from a dataset:**
    *   Concept: Selecting a subset of relevant features to improve model performance or reduce complexity. Methods include:
        *   *Filter Methods:* Select features based on statistical properties (e.g., correlation, mutual information) independent of the ML model.
        *   *Wrapper Methods:* Use the ML model's performance to evaluate feature subsets (e.g., Recursive Feature Elimination). (Mitchell, 1997, Chapter 9 - intro; Alpaydin, 2010, Section 6.2)
        *   *Embedded Methods:* Feature selection is part of the model training (e.g., Lasso regression).

### Unit 2: Case study – AI tools / Use of AI in any movie (3 Hrs)

*   **Concept:** This involves analyzing a specific application or portrayal of AI.
    *   **AI Tools Case Study:** Could involve researching a specific AI platform (e.g., IBM Watson, Google AI Platform), an AI library beyond those in Module III, or a specific AI application (e.g., a particular chatbot, a medical diagnosis tool). The study would focus on its architecture, capabilities, limitations, and real-world impact.
    *   **AI in Movies:** Analyzing how AI is depicted in a chosen film (e.g., *2001: A Space Odyssey*, *Blade Runner*, *Her*, *Ex Machina*). The analysis would cover:
        *   The capabilities shown (e.g., NLP, reasoning, emotion, consciousness).
        *   How realistic these capabilities are compared to current AI.
        *   The ethical and societal issues raised by the film's portrayal of AI.
        *   The underlying AI concepts (even if fictionalized) being explored.

### Unit 3: Implementation of Comparison of any two machine learning algorithms on a dataset (7 Hrs)

*   **Concept:** This practical unit involves applying the principles of experimental design and statistical comparison (covered conceptually in Alpaydin, 2010, Chapter 19; Mitchell, 1997, Chapter 5) to evaluate ML algorithms.
*   **Steps:**
    1.  **Choose Dataset:** Select an appropriate dataset for a specific task (classification or regression).
    2.  **Choose Algorithms:** Select two relevant ML algorithms (e.g., K-NN vs. Decision Tree, Linear Regression vs. SVR).
    3.  **Preprocessing:** Prepare the data (handle missing values, encode features, scale features if necessary).
    4.  **Splitting Data:** Divide the data into training and testing sets (or use cross-validation).
    5.  **Training:** Train both models on the training data. Hyperparameter tuning (e.g., finding the best `k` for K-NN, `max_depth` for Decision Tree) might be needed, often using cross-validation on the training set itself.
    6.  **Evaluation:** Evaluate both trained models on the unseen test set using appropriate performance metrics (e.g., accuracy, precision, recall, F1-score for classification; MSE, MAE, R-squared for regression).
    7.  **Comparison:** Compare the performance metrics. If using cross-validation, statistical tests (like paired t-tests) can be used to determine if the difference in performance is statistically significant.
    8.  **Conclusion:** Report the findings, discussing which algorithm performed better on the specific dataset and task, and potential reasons why.

---

**References:**

*   Rich, Elaine., Knight, Kevin., Nair, Shivsankar B. (1983, 2009). *Artificial Intelligence*. Tata McGraw Hill Publisher. [Note: Syllabus likely refers to 3rd Ed. 2009, but OCR provided seems older]
*   Mitchell, Tom M. (1997). *Machine Learning*. McGraw-Hill.
*   Alpaydin, Ethem. (2010). *Introduction to Machine Learning* (2nd ed.). PHI / MIT Press. [Note: Syllabus mentions 3rd Ed. PHI, OCR is 2nd Ed. MIT Press - content largely similar for intro topics]

*(Further detailed references from specific chapters of these books would be included within each unit in a full textbook)*

---