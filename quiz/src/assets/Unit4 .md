Unit 4:

**What is Machine Learning?**

Machine Learning (ML) is a subset of Artificial Intelligence (AI) that enables computers to learn patterns from data and make decisions or predictions without being explicitly programmed. Instead of using fixed rules, ML models improve their performance over time by analyzing large amounts of data.

**Why is Machine Learning Important?**

* Automates complex decision-making processes.

* Enhances accuracy and efficiency in data-driven tasks.

* Enables predictive analysis and pattern recognition.

* Powers modern AI applications like speech recognition, recommendation systems, and self-driving cars.

**Types of Machine Learning Algorithms**

Machine Learning algorithms can be categorized into the following types:

1. **Supervised Learning** – Uses labeled data to make predictions.

2. **Unsupervised Learning** – Works with unlabeled data to find hidden patterns.

3. **Semi-supervised Learning** – Uses both labeled and unlabeled data.

4. **Reinforcement Learning** – Learns from rewards and penalties to optimize actions.

**1\. Supervised Learning**

Supervised learning involves training a model on a dataset that contains **input-output pairs** (labeled data). The model learns to map inputs to correct outputs and generalizes this knowledge to new data.

**Supervised Learning is divided into:**

1. **Classification:**

   * Predicts discrete categories (e.g., spam vs. not spam, disease detection).

   * **Common Algorithms:**

     * KNN(K nearest Neighbor)

     * Decision Trees

     * Random Forest

     * Support Vector Machines (SVM)

     * Neural Networks

2. **Regression:**

   * Predicts continuous values (e.g., house prices, temperature forecasting).

   * **Common Algorithms:**

     * Linear Regression

     * Polynomial Regression

     * Decision Tree Regression

     * Random Forest Regression

     * Support Vector Regression (SVR)

**2\. Unsupervised Learning**

Unsupervised learning works with **unlabeled data** to discover patterns and relationships. The model learns structures from the input without explicit supervision.

**Unsupervised Learning is divided into:**

1. **Clustering:**

   * Groups similar data points together (e.g., customer segmentation, anomaly detection).

   * **Common Algorithms:**

     * K-Means Clustering

     * Hierarchical Clustering

     * DBSCAN

2. **Dimensionality Reduction:**

   * Reduces the number of features while preserving meaningful information (e.g., compressing high-dimensional images).

   * **Common Algorithms:**

     * Principal Component Analysis (PCA)

     * t-SNE (t-Distributed Stochastic Neighbor Embedding)

**3\. Semi-Supervised Learning**

Semi-supervised learning combines both **labeled and unlabeled data** for training. It is useful when labeled data is limited but a large amount of unlabeled data is available.

**Example Use Cases:**

* Medical diagnosis (some labeled patient records, but a lot of unlabeled data).

* Web page classification (only some web pages are manually labeled).

**Common Algorithms:**

* Self-training

* Graph-based methods

* Semi-supervised Support Vector Machines

**4\. Reinforcement Learning**

Reinforcement Learning (RL) is a trial-and-error learning approach where an **agent** interacts with an **environment** to maximize a reward.

**Key Components of Reinforcement Learning:**

* **Agent:** Learner or decision-maker.

* **Environment:** The system the agent interacts with.

* **Actions:** Choices available to the agent.

* **Rewards:** Feedback signal for actions taken.

* **Policy:** The strategy the agent follows.

**Common RL Algorithms:**

* Q-Learning

* Deep Q-Networks (DQN)

* Policy Gradient Methods

 **Train-Test Split** – Why it is needed and how to implement it.

Train-test split is a technique used to evaluate machine learning models by dividing the dataset into:

* **Training set (80%)** – Used to train the model.

* **Test set (20%)** – Used to evaluate the model's performance on unseen data.

**Model Training** – Training a machine learning model using a dataset.

 **High Bias (Underfitting):** If k is **too large**, the model oversimplifies patterns.

 **High Variance (Overfitting):** If k is **too small**, the model memorizes training data.

**Bias and Variance** – Understanding their impact on model performance.

| Model | Train Accuracy | Test Accuracy |
| :---- | :---- | :---- |

|  (Underfitting) | Low | Low |
| :---- | :---- | :---- |

|  (Overfitting) | High | Low |
| :---- | :---- | :---- |

**4\. Overfitting vs. Underfitting**

**Overfitting**

Occurs when a model memorizes the training data instead of learning patterns. **Symptoms**:

* High accuracy on training data but poor performance on test data.

**Underfitting**

Occurs when a model is too simple and cannot learn from training data. **Symptoms**:

* Poor accuracy on both training and test data.

**Model Evaluation**

Evaluating a machine learning model is essential to determine how well it **generalizes** to unseen data. Evaluating a machine learning model is essential to understand its **performance** and **generalization ability**.The key aspects of model evaluation in **classification problems** include:

1. **Performance Metrics** – Accuracy, Precision, Recall, F1-score,

2. **Confusion Matrix** – To analyze classification results.

**Accuracy**

Accuracy is the **ratio of correctly predicted observations to the total observations**. It is the simplest evaluation metric.

Accuracy=CorrectPredictions /TotalPredictions  

or 

Accuracy=(TP+TN)TP+TN+FP+FN

**2\. Confusion Matrix**

**Definition:**  
A **confusion matrix** is a table that describes the **performance of a classification model** by comparing **actual labels vs. predicted labels**. In classification problems, model performance is evaluated using **True Positives (TP), True Negatives (TN), False Positives (FP), and False Negatives (FN)**.

**TP (True Positive)** → Model **correctly** predicted **Positive**.

* Example: A cancer detection model correctly detects cancer.

**TN (True Negative)** → Model **correctly** predicted **Negative**.

* Example: A spam filter correctly classifies an email as **not spam**.

 **FP (False Positive)** → Model **incorrectly** predicted **Positive**.

* Example: A spam filter wrongly marks an important email as **spam**.

**FN (False Negative)** → Model **incorrectly** predicted **Negative**.

**3\. Precision, Recall, and F1-Score**

**(a) Precision**

Precision tells us how many of the predicted **positive cases were actually correct**.

**Precision=TP/(TP+FP)**

**(b) Recall (Sensitivity / True Positive Rate)**

Recall measures **how many actual positive cases were correctly identified** by the model.

**Recall=TP/(TP+FN)**

**(c) F1-Score**

The F1-score is the **harmonic mean of Precision and Recall**, balancing both metrics.

**F1=2×Precision×Recall/(Precision+Recall)**

**K-Nearest Neighbors (KNN) Algorithm**

K-Nearest Neighbors (KNN) is a **supervised machine learning algorithm** used for both **classification** and **regression** tasks. It is a **non-parametric, instance-based** algorithm that makes predictions based on the similarity between data points.

How KNN Works?

1. **Choose the number of neighbors (K).**

2. **Measure the distance** between the new data point and all training samples using a distance metric (e.g., Euclidean distance).

3. **Find the K nearest neighbors** (smallest distances).

4. **For classification:**

   * Assign the most common class (majority voting) among the K nearest neighbors.

5. **For regression:**

   * Predict the average (or weighted average) of the neighbors' values.

![][image1]

* When you want to classify a data point into a category (like spam or not spam), the K-NN algorithm looks at the **K closest points** in the dataset. These closest points are called neighbors. The algorithm then looks at which category the neighbors belong to and picks the one that appears the most. This is called **majority voting**.

* In regression, the algorithm still looks for the **K closest points**. But instead of voting for a class in classification, it takes the **average** of the values of those K neighbors. This average is the predicted value for the new point for the algorithm.

**Applications**

* **Recommendation Systems**: Many recommendation systems, such as those used by Netflix or Amazon, rely on KNN to suggest products or content. KNN observes at user behavior and finds similar users. If user A and user B have similar preferences, KNN might recommend movies that user A liked to user B.

* **Spam Detection**: KNN is widely used in filtering spam emails. By comparing the features of a new email with those of previously labeled spam and non-spam emails, KNN can predict whether a new email is spam or not.

* **Customer Segmentation**: In marketing firms, KNN is used to segment customers based on their purchasing behavior . By comparing new customers to existing customers, KNN can easily group customers into segments with similar choices and preferences. This helps businesses target the right customers with right products or advertisements.

* **Speech Recognition**: KNN is often used in speech recognition systems to transcribe spoken words into text. The algorithm compares the features of the spoken input with those of known speech patterns. It then predicts the most likely word or command based on the closest matches.

**Evaluation of Model :Regression**

Evaluation Measures in Regression problems

 **MAE** → If you need an easy-to-interpret absolute error measure.

 **MSE/RMSE** → If large errors should be penalized more.

 **MAPE** → When percentage errors are important.

 **R² Score** → When assessing how well the model explains variance.

**1\. Error-Based Metrics**

These metrics measure how far the predicted values are from the actual values.

**(i) Mean Absolute Error (MAE)**

* Measures the average absolute difference between actual and predicted values.

![][image2]

**(ii) Mean Squared Error (MSE)**

* Measures the **average squared** difference between actual and predicted values.

![][image3]

**(iii) Root Mean Squared Error (RMSE)**

* Square root of MSE, gives error in the same unit as the target variable.

  ![][image4]

**(iv) Mean Absolute Percentage Error (MAPE)**

* Measures error as a percentage of actual values.

  ![][image5]

2.Goodness-of-Fit Metrics

**(v) R² Score (Coefficient of Determination)**

* Measures how well the model explains the variance in the data.  
  ![][image6]

**1\. What is Linear Regression?**

Linear Regression is a **supervised learning algorithm** used for **predicting a continuous value** based on input features. It establishes a relationship between the **dependent variable (Y)** and one or more **independent variables (X)** using a linear equation. statistical method 

**Equation of Linear Regression**

For a **simple linear regression** (one independent variable):

Y==mX+c

where:

* Y \= Predicted output (dependent variable)

* X \= Input feature (independent variable)

* m= Slope (coefficient of X)

* c= Intercept (bias)

**Types of Linear Regression**

**When there is only one independent feature it is known as Simple Linear Regression or [Univariate Linear Regression](https://www.geeksforgeeks.org/univariate-linear-regression-in-python/) and when there are more than one feature it is known as Multiple Linear Regression or [Multivariate Regression](https://www.geeksforgeeks.org/multivariate-regression/).**

**Unsupervised Learning**

**K-Means Clustering:**

**K-Means is an unsupervised machine learning algorithm used for clustering data into K distinct groups. It works by partitioning a dataset into K clusters, where each data point belongs to the nearest cluster centroid.**

**Advantages of K-Means Clustering**

1. **Simple & Efficient: Easy to implement and computationally efficient for large datasets.**

2. **Scalability: Can handle large datasets efficiently compared to hierarchical clustering.**

3. **Fast Convergence: Converges quickly to a solution, especially with the K-Means++ initialization.**

4. **Handles Different Data Types: Works well with numerical data.**

5. **Interpretable Results: Provides well-defined cluster assignments.**

**Working of K-Means Algorithm**

1. **Choose K (Number of Clusters)**

   * **Decide how many clusters you want to divide your data into.**

2. **Initialize Centroids**

   * **Randomly select K initial points as cluster centroids.**

3. **Assign Data Points to the Nearest Centroid**

   * **Compute the Euclidean distance between each data point and centroids.**

   * **Assign each data point to the closest centroid.**

4. **Recalculate Centroids**

   * **Compute the new centroid by taking the mean of all points in each cluster.**

5. **Repeat Until Convergence**

   * **Continue steps 3 and 4 until centroids no longer change or a predefined number of iterations is reached.**

   

**These metrics assess clustering quality without ground truth labels by analyzing intra-cluster and inter-cluster distances.**

**(a) Silhouette Score**

* **Measures how well each data point fits into its assigned cluster.**

* **Ranges from \-1 to 1:**

  * **1 → Well-clustered**

  * **0 → On the boundary**

  * **\-1 → Poor clustering (incorrect assignment**

**Naive bayes Algorithm**

Naïve Bayes is a probabilistic classifier based on Bayes’ Theorem, assuming that features are independent (hence, "naïve"). It is widely used for text classification, including spam detection.

Bayes theorem

P(A/B)=P(B/A).P(A)/P(B)

**Types of Bayes algorithm**

Gaussian Naive Bayes: continuous values associated with each feature are assumed to be distributed according to a Gaussian distribution. 

Multinomial Naive Bayes: It is used when features represent the frequency of terms (such as word counts) in a document. It is commonly applied in text classification, where term frequencies are important.

Bernoulli Naive Bayes deals with binary features, where each feature indicates whether a word appears or not in a document.

**Singular Value Decomposition (SVD)**

Singular Value Decomposition (SVD) is a **matrix factorization** technique used in **dimensionality reduction, noise reduction, and feature extraction**. It decomposes a matrix into three matrices:

Eg with rows are people, and columns are products. The numbers in the table show how much each person likes each product. SVD helps you split that table into three parts:

* **U**: This part tells you about the people (like their general preferences).

* **Σ**: This part shows how important each factor is (how much each rating matters).

* **Vᵀ**: This part tells you about the products (how similar they are to each other)

  Mathematically, the SVD of a matrix A (of size m×n*m*×*n*) is represented as:

A=UΣVT

The SVD decomposition function simplifies complex data by breaking it into three smaller parts. This helps uncover hidden patterns and relationships, making it easier to analyse and work with large datasets. 

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAABUCAYAAAC4LWpXAAAMYElEQVR4Xu2d++tN2RvH5x9ALhEhhBrFaERJbokYMYaZZprG5SN3yV25pUkMYcSIuaYpYdwlktsPbrmTkNxGg2bI3QxhmvXttb49p3WWfS6fz+dc9lmf51W7ztl7n332WXu91/OsZz1rnfeMoiglz3v+DkVRSg8VsqIEgApZUQJAhawoAaBCVpQAUCErSgCokBUlAFTIihIAKmRFCQAVsqIEgApZUQJAhawoAaBCVpQAUCErSgCokBUlAFTIihIAKmRFCQAVsqIEgApZUQJAhawoAaBCVpQAUCFXYX799Vfz559/mn///dccPnzYbrxWSg8VchXlypUrZtmyZebDDz80Y8aMMfv37zcffPCB2bx5s3+qUgKokKso33//vfn2229Nw4YNzZkzZ+y+Pn362H1K6aFCrqK8ePHCfPXVV9Ya//fff3Zf8+bNzW+//eadqZQCKuQY8/LlS+v+Dho0yPzzzz/+4UrTrFkzc/78efv67du3pqyszAp827Zt5tWrV97ZSpxRIceQq1evmh9//NHUrVvXVKtWzbq8f//9t39apWnfvr15+PChfX3//n1rjY8dO2aWL1/unanEHRVyDNm3b5+ZMGGC7cfmU8hTp05NuNVcf/z48WbKlCnm2bNn3plK3FEhx5g9e/bkVchv3rxJev/o0SMdfipRVMgxJt9CVsJBhRxjVMhKtqiQY4wKWckWFXKMUSEr2aJCjjEVETLjzcOGDTPvv/9+XradO3f6X6nEABVyjKmIkBlOmjFjhv0cW506dcx3331ntm/fnvXGePK0adNM06ZNE9eRbcCAATZRRckMSTWXL18uSHKNCjnGVETIwDhwv379EuJjTNofasoWKiETKj755BN7rdq1a5uTJ0/6pykeu3btMp9++qn56KOPbD47uQH5RIUcYyoqZGAihGtJf/75Z/+UctO1a1d7LTeRRHmXa9eumY8//tj89ddftgEdMmSIadKkiZ1xli9UyDFEBOxv5RU0ltj9fC4ytqiYXPeHH37wD1keP35sPv/8c7N7927/UFDcvXvXeilRMMebxu7gwYP2PXEFyv+XX37xzswdBRfy6dOnk/pjf/zxh39KEhQKboqcz+d9aAEbNWpkt169epmjR4/airZu3brEOXyP3xdMte3d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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAABUCAYAAABz09mAAAAPIUlEQVR4Xu2dicvl0x/Hf/8AMkSEkCXKkC3L2EOSnexEyBLZJttQiBRZS8baCGMrxpZMCSEa+7429i3rjGVCzq/X+f0+17nnud9tnu/nzl3er/r2PM+9597ne8/9nvf5bOd8/xOEEKIh/8kfEEKIKiQcQojGSDiEEI2RcAghGiPhEEI0RsIhhGiMhEMI0RgJhxCiMRIOIURjJBxCiMZIOIQQjZFwCCEaI+EQQjRGwiGEaIyEQwjRGAmHEKIxEg4hRGMkHEKIxkg4hBCNkXAIIRoj4RBCNEbCIfrOO++8Ey644IKw8cYbh+OPPz7MnTs3vPbaa+G+++7Lm4oBRcIh+s4NN9wQnn/++bDKKquEl156KT7266+/hiuvvDJrKQYVCYfoOwsXLgyLFi2K1sY///wTH5s/f3645557spaLxyWXXBIuvfTS/OGxwrsPJBxiifDll1+GW265pfP3o48+GsWjDRg0HOOMdx9IOEaMBQsWhNNOOy2cfPLJ+VOR3377LcYXcBPWXHPNcPXVV4fff/89bxbb0WappZbqtGuT6667Lnz//ffx92+//TZssMEG4bnnngtXXXVV1rI53oOmH2CJ3XHHHWGjjTYKH3/8cf50Jd59IOEYEebNmxcOPPDAsMwyy8TBftxxx+VNwi+//BL22GOPsO2224ZPP/00XpBcmPvss098Lm9HG7B2aZvJwvmZm0J8Y8899wynn356K/8DE93TTPfGRGPdddeNn2Pq1Knhvffey5uV4t0HEo4RYdasWeHuu+8O5513XqFwEHxcdtllw9NPP915jN95LA1MWrsU2rUZvMSiSfn777/j0Qbes603ZJmmTZsWxcJEZLvttgtff/113rQQ7z6QcIwYDO4i4dhss82iS4BrYHAxrrfeetEKAdwHa5dCO9r89NNPXY8PIt6zrTcI6J9//tn12B9//NH1dxXefSDhGDHKhIPHd9ttt+gaGPzOYzwHZDasXQrteHzOnDldjw8iZYOGeM69994b40DmKhmkhnvFe/rJjBkzwuWXXx5jVSm4i01iHWV90AYSjhFjssJhry8SjjbdFS+KzHRm8VNPPTW6czz/5JNPdj3P53vssce6HusnCBduyeabbx4OOOCAjoiRgVp//fUnfCdlFPVBW0g4RgwJR/FsSwzo7LPPjpYGqeD0s+AKrLDCCuHVV19NXtE/fvjhhygW5iriPlpMA4FbeumlY91LXYr6oC0kHCOGhKN4tj3ooIOiMPz111/hsMMO67I4qCFhwFqKGBjMbQVsq6CO5YQTTogVtQSm99tvv05c48ILL4x9n9a98H2k32NOUR+0hYRjxJiscFBfUSYcPF/Ed999F81s2nFsscUWcf3JAw88UPu48cYbYw3KDjvs0HkfO2bOnJn/y55UDRrexz6vweBMBybMnj17QpAy5/HHH5/wGcqOKjbZZJOYhv3kk0/i3wjaWmut1SVqnBPn9uGHH6Yv7aKqDyaLhGPEmKxwPPHEE6XCwfNl4Kdb4Rg1JQ8++GDepDZkfxjM1DHwfohJnTqPMjOdWZzZPE03kxqmbuXll19OWi4ZcEmwhrCKwL6Po48+ekIwt4yyPmgDCceIUSYcq622WmE6lueA2gFrl0I7Hq8qROLipvrTrITVV189roadDLgLWC4MKmocqigbNPZ5089ns3o6o5M9WhIZFvostepyN+Wzzz4L1157bfjggw86bXpR1gdtIOEYMcqEY++9954w+E0oDj744Pg3g8XapdCONnXqCRh4RxxxREc8mM3rWApVUEdy1FFHdWbjIsoGjQlHalERX+A8ET3em8H60EMPLZF4DueRZnY4T4K2Zg2dccYZUUQ33XTTmG0poqwP2sBdOPginnnmmY6P9/DDD3cFoHpBvjr1C6tmOeP++++PnUyAqRdcGC+88MIEv9MOvrCvvvqqyyTkXDnnvG2vo+pzeWKCkR+pgPC5iCHQR8cee2wchMsvv3y46667uj6ztaMNdR3WrompDFb+zsHvbZBmRoqoGjSvvPJKtIQo0SfNufLKK8c+AYSRA8um7nXXJqSL6etDDjkkxjvoO1tFzIFbhbCfeeaZ+Uu7qOqDyeIuHD///HPYf//9w5QpUzoXUVkR0RdffNHpsLXXXjtu9sLArSINzBXl4rkgWA/BjGMXM4Eo/uZYccUV4+OU91rg6ZFHHonPrbrqqvE5flp7Ds7RPleV/z8okC1gANJPeel3ig3SqnZFXHHFFV0ihpndD+oMGqwirpmPPvoouilWOQsMUAZrlWXjBWMGy8jiSul2A2SFWHRYNDkadfpgMrgLh7H77rt3BKHIBOQLO//882PwKg0Q1SG9SPPoeA7vS7tctfGl2WSG5zjXFFJ3RXl+zPuTTjqp53PjjC2Ws+8F96UqS9EGRYOGSWnXXXcNO++8cxRPMEstvSbJaDApYHGk63o84dq/6aabwp133tl57PPPPw8bbrhh/GnwuQgSc/5lO6YV9UFb9E04dtlll3DRRRfFL4lB1guWVU+fPj2akGVpv17wRWPi5RdBL3ApciU3uLiwQng+hfcsW6uBD8prRTcERnELTDwInJa5GW1QlIpkQuEccE+ID1gGKI/BYGHR5vrrr590YLcuVvhl1y4CS1o6z0oR86AN7nzZdV7UB23RN+HgQzIjM2unZqGBUDCQrQAmjfxXgTWAAuPPc2H0CgymcAEViYAFylLhsJLfXGhOOeWUTuSdz7Y45vw4YIPA+hWXEjfBi6LZlvMgI7HOOuuE5ZZbLtZgFBV4lRVXeYF7zHlxfuecc07P1bCcLyJTZbkV9UFb9EU4GFAM7vn/T3thHeRghTAIrQCprpuCYGB+Aq4Hr8XVKcL819xNAf4n58F7EOcwTMzeeOONfxuH/6XKjG+++SZ5RuTwPZlwcBRtNNQG3oNmGPDug74IB4LBrG3mmEWwDdSTXa6tFDh3E8q4+eabw4knnhh/N381L15KsXPIrQfALCRgirC9/vrrncftfc1C4XyfffbZaJ2I+lhhGAc1GV54m+nDgHcf9EU4yDaQ0cirFA3SqFgCtoVcvolMEfh522yzTccPNWslL15KMXeJFDGmoB2kHrmY99prr65YhVUaprOlHQhiE9JsTJ2DmM8ogZuQ9h+ThQfes+0w4N0H7sKBm8LWdIZVwoFlUWyxkQ18rI4qGFRbbrlldB9s8FOPwOtXWmmlvHnE3BTa1A3Q2crEvCAqDUxhKd12223/PikKISXLNoQmHhdffHHt76Iu3oNmGPDuA3fhYFYmo2JYZBsY/Oeee24ceKmbUpVOBSyDNdZYo2uG5m9en7tChrkp9v/rYG5KHtAlQ2S8/fbbnThLv0ln8H4ekwExtuIwjyxLkZmef4ZROXpR1Adt4S4cuCnsM2CQ6uLDMvMcc8wxnaIgy1zgplQVtwAp23wtAdYH1kZRZ5IyRVSKhCUndVN6BVOBi55Zs466p65RnaMo4j/s0GeXXXZZDJBWZQcWB+9BMwx494G7cOCasBWaYTEGdmEitmFY5iJfhNULCmJ6FVsx2LA8ioTDrB2sjjqkNR29gqmAn47pjdVRRR7DqDpGLcZhmLvSxvqVXngPmmHAuw/chIOLg1mYoizWPdjMQmYCs98Cmsyq5PRxZxigzN4IQA6BVd6TRT60oyw3hXTfm2++2Sk75z1sQRb/G2vDysP5H1V5et7/rLPOiu15z/fff7/LGqBUmTUO5N1ffPHF/OWiB1bPgWh4lp97D5phwLsPXISDAZv7YTa4eC51XW6//fYJbXtZDHlmg2q/tODKXJT0sApVq83o9VwvzCrKX9PrYMFR7jKJ3rAsgLU+dr9YL7wHzTDg3QcuwiFEDnENFhFSremN96AZBrz7QMIh+gLFdfm6Cy+8B80w4N0HEg7hCitMCXi3VWLOUn/iXGUpXO9BMwx494GEQ7hh2ZPDDz+8lQwK77f11ltXpuu9B80w4N0HEg7hBgHsfMn6ZKDIrs6Gxd6DZhjw7gMJxxhBERu3P7QsEPtN4ELw0za2aQtSr22lXXFLnnrqqZjFKtuDwvAeNCnz5s2L/Xrrrbd2Zdc457feeitp2V+8+0DCMQZQzs8eJVYgx9qbdM8SCvQYlG3AgKGMnJLyfE/WqsPuqcJq56222mpC6ju9SVEZ3oPGYJElNUi24XO6KjtdWrEk8O4DCccYQDk/tTNWcs+2iOkK4HTh4WSxrQnyQd/GUbZVXor3oDHM+rEbdduyBFt3lW4dgKD++OOPnb+98e4DCccYQKEcpfE2C6YbENl6nLrrd8pgQeP2228/oXS+raOu2+M9aIx33323039pBbFtD8FyBYNtHNra6b0O3n0g4RgjuBsYs2B6z1Qzs/PVv8OM96BJYY0SGxSlQdv0/q8GO8QRB+kX3n0g4RgjsCrSOIHdfMlmS3bZrrpD2DDgPWhSbJ9buzVG6qYg0Lgo7JTOTnULFizIXu2Hdx9IOMaI3E0xa8NmS0SkamXyMOA9aFIQjvS2GbY9BG4KcSRut8EmTxStsYlUv/DuAwnHmMDMl7spZlJz8bNKma39RgHvQZPCCnAE2faftQWVZtmxw93ChQvj30V7unjg3QcSjjGBbQTsfiLpY/vuu2/ceX6nnXZy2VRnSeA9aFKw1Ngaky0WjjzyyNjHCIdlXAhMEwfh7mupaHvj3QcSDuHKrFmz4p4s3LO3CczW1HWQTalT9JXiPWgMhBZXL91wCbeFeg7b7wVhwRXEMum1z4wX3n0g4RCucJOh2bNnN7ZmuD0FdRvcnGhQhYMYUeqmIBJkWNL9Roh9IH78THe888a7DyQcYmCxStdBFQ7uMctucosWLYoVpIceemgsjU8hQLrjjjvGTblnzJjR9Zwn3n0g4RBuzJkzJ1oNi7tD2qALB0ybNi1MmTIlTJ06NZba9wK3i7VAZVsBtI13H0g4hAsEBJmF2RjabnfBgrB8fUp+pAvDFlc4hD8SDuECs+zcuXPjBtHEAhYHCcfgIuEQblDwRBVl3RuI50g4BhcJh3CDQU+MA4uDsmtuwpQvXMuPa665pvN6CcfgIuEQbnBD8OnTp4eZM2c2DgwS6+BWCqQ7CT4iIGJwkHAINyiCym+cJUYDCYcQojESDiFEYyQcQojGSDiEEI2RcAghGiPhEEI0RsIhhGiMhEMI0Zj/AvZ2kKkIso4tAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeEAAADZCAYAAAAXFIh6AAAuLElEQVR4Xu3di68U5f3H8d8/AIRLMBg0YLgEGpCIEqmCQSMXDYgKQZCKkIogorRcqlg0hGproWAlCvzAC421UlDxAlFQSq0gFrkqYEREEAJSUEEuLRCeX95P853fsw+ze/YcljN7Dp9XsjlnZ2Zn57I7n3kuM/s/TkRERDLxP/EAERERqR4KYRERkYwohEVERDKiEBYREcmIQlhERCQjCmEREZGMKIRFREQyohAWERHJiEJYREQkIwphERGRjCiERUREMqIQFhERyYhCWEREJCMKYRERkYwohEVERDKiEBYREcmIQlhERCQjCmEREblgHD582A0dOtRNmjTJNW3a1N19991+WFYUwiIicsF4+OGH3bx58/z/q1atcg0bNnQTJkyIpqo+CmERkTKwfPlyV6dOnXN6PPfcc/FsE2fOnHGvvfaaGzhwoDt69Gg8utY4deqUD1XWN8Z69+rVyzVp0sQ///77713Xrl3dVVddFU1ZfRTCIiJlgIDo06ePD1OqSSty6NAht2XLFjd16lTXvn17/7q+ffu648ePx5N6ixcvdp07d3a7d++OR9UI7777rjt58mQ8OBXVyzNmzEgN4gULFviqaPz444+ue/fuCmEREfkvwrJevXpuypQpqSGSD+HaoUMH98QTT8SjfHjdddddRYdYOTl27Jj7+c9/7jZu3Oh69Ojh/2dYRdh+nTp1cgcOHIhHeWyLESNG+JLwnj174tHVRiEsIlJGCF6qUwliArky1q5d62688UZ38ODBnOG0fVLdXdNQtfzQQw/5sIQFcjFtuNQSXHrppUn7b4yScs+ePd3+/fvjUdVKISwiUmaoTqV6mZJtZaqPCa25c+e6L774IhlGqBNitH/WRJRYT58+nTzn/2JK9CdOnHC3336769atW2rv52HDhiXDqZbOikJYRKQM0S5MEPfv3z9vO28x9u7d69q2bRsPviBMnz7dNW7c2G3YsCFn+CeffJJUaRPAv/71r3PGVyeFsIhIGaK0N3r0aB/EBElVzZw509WvXz8e7EuBAwYM8NWy9913n9u6dWsyjtJzWnhVp1tuucW9/PLL/mQkrH5mmYrdHp9//rmvkh41apR/TvD27t37rF7lkydPjl5ZfRTCIiJlyjpbERRV7TxEAKWF1uOP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>