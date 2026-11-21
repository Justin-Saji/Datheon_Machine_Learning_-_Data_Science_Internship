# Datheon – Data Science & Machine Learning Internship

This repository contains four machine learning projects completed as part of the **Data Science & Machine Learning Internship at Datheon**. The projects cover multiclass classification, regression, customer churn prediction, and NLP-based sentiment analysis.

The internship focuses on practical implementation of data preprocessing, feature engineering, model development, evaluation, optimization, and data visualization using Python and Scikit-learn.

## Internship Tasks

| Task | Project | Problem Type | Main Algorithms |
|---|---|---|---|
| 1 | Multi-Class Benchmark Classification Pipeline (Iris / Wine) | Classification | Logistic Regression, Decision Tree |
| 2 | Real Estate Housing Price Prediction | Regression | OLS, Ridge, Lasso |
| 3 | Predictive Customer Churn Classifier | Classification | Random Forest, XGBoost |
| 4 | NLP Sentiment Classification on Customer Reviews | NLP Classification | Multinomial Naive Bayes, Logistic Regression |

---

# Task 1: Multi-Class Benchmark Classification Pipeline (Iris / Wine)

## Project Overview

Developed a machine learning classification pipeline to predict Iris flower species based on four numerical measurements. The project compares classification algorithms and evaluates their predictive performance using the Iris dataset.

## Objectives

- Explore and understand the dataset.
- Perform data preprocessing and feature scaling.
- Train and evaluate multiple classification models.
- Compare model performance using classification metrics.
- Visualize dataset patterns and model predictions.
- Save trained models for future predictions.

## Dataset

**Dataset:** Iris Flower Dataset

- Total records: 150
- Number of features: 4
- Number of target classes: 3

### Input Features

1. Sepal Length
2. Sepal Width
3. Petal Length
4. Petal Width

### Target Classes

- Iris Setosa
- Iris Versicolor
- Iris Virginica

## Machine Learning Algorithms

- **Logistic Regression:** Performs multiclass classification by estimating the probability of each flower species.
- **Decision Tree Classifier:** Classifies flower species using feature-based decision rules.

## Implementation Workflow

1. Load and explore the dataset.
2. Perform preprocessing and feature scaling using StandardScaler.
3. Split the dataset into training and testing sets.
4. Train the classification models.
5. Generate predictions on unseen test data.
6. Evaluate performance using accuracy, precision, recall, and F1-score.
7. Visualize classification results and confusion matrices.
8. Save trained models using Joblib.

## Evaluation Metrics

- Accuracy
- Precision
- Recall
- F1-Score
- Confusion Matrix

## Visualizations

- Dataset distribution and pairwise feature relationships.
- Correlation heatmap.
- Confusion matrices.
- Decision boundary visualizations.
- Model performance comparison.

## Saved Model Files

- `logistic_regression_iris.joblib`
- `decision_tree_iris.joblib`

---

# Task 2: Real Estate Housing Price Prediction

## Project Overview

Developed a regression-based machine learning pipeline to predict median house values using the California Housing dataset. The project focuses on feature engineering, handling missing values, addressing multicollinearity, and comparing regularized and non-regularized regression models.

## Objectives

- Explore and analyze the California Housing dataset.
- Handle missing values through imputation.
- Engineer interaction features.
- Analyze correlations and identify multicollinearity.
- Standardize numerical features.
- Compare regression algorithms.
- Optimize model hyperparameters using GridSearchCV.
- Evaluate prediction accuracy and analyze residual errors.

## Dataset

**Dataset:** California Housing Dataset

The dataset contains housing-related information from California census block groups.

### Input Features

- Median Income
- Housing Median Age
- Average Rooms
- Average Bedrooms
- Population
- Average Occupancy
- Latitude
- Longitude

### Target Variable

**Median House Value**

## Machine Learning Algorithms

- **Ordinary Least Squares (OLS):** Establishes a baseline regression model by minimizing the sum of squared prediction errors.
- **Ridge Regression (L2):** Applies L2 regularization to reduce the impact of large coefficients and help address multicollinearity.
- **Lasso Regression (L1):** Applies L1 regularization and can reduce less important feature coefficients to zero.

## Implementation Workflow

1. Load the California Housing dataset.
2. Perform exploratory data analysis.
3. Identify and impute missing values.
4. Analyze feature relationships using correlation heatmaps.
5. Engineer interaction features.
6. Standardize continuous numerical variables.
7. Analyze multicollinearity among input features.
8. Train OLS, Ridge, and Lasso regression models.
9. Optimize Ridge and Lasso hyperparameters using GridSearchCV.
10. Compare model performance on the test dataset.
11. Visualize predicted versus actual house values.
12. Analyze residual distributions.

## Hyperparameter Optimization

GridSearchCV is used to identify suitable regularization strengths (`alpha`) for Ridge and Lasso regression through cross-validation.

## Evaluation Metrics

- **RMSE:** Measures the square root of the average squared prediction error.
- **MAE:** Measures the average absolute difference between actual and predicted values.
- **R² Score:** Measures how much of the variation in house prices is explained by the model.

## Visualizations

- Exploratory data analysis plots.
- Correlation heatmap.
- Predicted versus actual house values.
- Residual distribution curves.
- Regression model performance comparison.

---

# Task 3: Predictive Customer Churn Classifier (Random Forest & XGBoost)

## Project Overview

Developed a customer churn prediction system using machine learning to identify telecom customers who are likely to discontinue their services. The project focuses on handling severe class imbalance and optimizing predictive performance using ROC-AUC.

## Objectives

- Analyze customer data and identify churn patterns.
- Preprocess numerical and categorical features.
- Handle missing and invalid values.
- Encode categorical variables and scale numerical features.
- Address class imbalance using different techniques.
- Train and compare Random Forest and XGBoost models.
- Evaluate models using cross-validation and test data.
- Identify important factors influencing customer churn.

## Dataset

**Dataset:** Telco Customer Churn

- Total customers: 7,043
- Total columns: 21
- Churn rate: Approximately 26.5%
- Class imbalance: Approximately 2.8:1

The notebook uses the Telco Customer Churn dataset and can load a local CSV file or retrieve a public copy when the file is unavailable.

## Data Preprocessing

- Converted `TotalCharges` into numeric values.
- Handled 11 blank `TotalCharges` values by assigning zero, as they belonged to customers with zero tenure.
- Applied OneHotEncoder to categorical features.
- Applied StandardScaler to `tenure`, `MonthlyCharges`, and `TotalCharges`.

## Machine Learning Algorithms and Imbalance Handling

Three approaches were compared:

- **Random Forest + SMOTE:** Uses Synthetic Minority Over-sampling Technique to generate additional minority-class training samples.
- **Random Forest + Class Weights:** Uses `class_weight="balanced_subsample"` to account for class imbalance.
- **XGBoost + Scale Positive Weight:** Uses `scale_pos_weight` to give additional importance to the minority churn class.

## Implementation Workflow

1. Load the Telco Customer Churn dataset.
2. Perform data cleaning and preprocessing.
3. Encode categorical variables and scale numerical features.
4. Analyze the class distribution.
5. Apply different class-imbalance handling strategies.
6. Train Random Forest and XGBoost classifiers.
7. Evaluate models using stratified 5-fold cross-validation.
8. Test model performance using an 80/20 hold-out split.
9. Generate ROC curves and confusion matrices.
10. Identify the top ten important features.

SMOTE is implemented inside an imbalanced-learn Pipeline to prevent data leakage during cross-validation.

## Model Performance

**ROC-AUC Results**

| Model | CV ROC-AUC | Test ROC-AUC |
|---|---:|---:|
| Random Forest + SMOTE | 0.843 | 0.839 |
| Random Forest + Class Weight | 0.847 | 0.842 |
| **XGBoost + Scale Positive Weight** | **0.847** | **0.846** |

**Best-performing model:** XGBoost with `scale_pos_weight`.

Additional results at the default 0.5 classification threshold:

- Churn recall: 79%
- Churn precision: 52%
- Overall accuracy: 75%

## Key Churn Drivers

The most influential features included:

- Month-to-month contracts.
- Short customer tenure.
- Absence of online security or technical support.
- Fiber-optic internet service.
- Electronic-check payment method.

## Visualizations

- Class distribution.
- ROC curves.
- Confusion matrices.
- Feature importance charts.
- Model performance comparison.

---

# Task 4: NLP Sentiment Classification on Customer Reviews (TF-IDF)

## Project Overview

Developed an NLP-based sentiment classification pipeline to identify positive and negative sentiment in customer reviews. The project focuses on text preprocessing, TF-IDF feature extraction, and comparing traditional machine learning classifiers.

## Objectives

- Clean and preprocess raw review text.
- Remove unnecessary HTML tags and punctuation.
- Tokenize text and remove stopwords.
- Apply lemmatization.
- Convert textual data into numerical features using TF-IDF.
- Train and compare sentiment classification models.
- Evaluate model performance using hold-out testing and cross-validation.
- Predict sentiment and confidence for custom review input.

## Datasets

Two datasets are used for different purposes:

**1. Task Sample Dataset**

- Source: `sentiment_reviews.xlsx`, or an embedded copy if the file is unavailable.
- Contains 10 sample reviews from the task brief.
- Neutral reviews are removed because the classification task is binary.
- Used to demonstrate the preprocessing and prediction workflow.

**2. Benchmark Dataset**

- Source: NLTK `movie_reviews` corpus.
- Total reviews: 2,000.
- Balanced positive and negative classes.
- Training records: 1,600.
- Testing records: 400.

The 10-row sample is only for demonstrating the pipeline; its small hold-out set is not suitable for meaningful accuracy evaluation.

## Text Preprocessing

The text preprocessing pipeline includes:

1. Convert text to lowercase.
2. Remove HTML tags.
3. Remove punctuation and unnecessary characters.
4. Tokenize the reviews.
5. Remove stopwords.
6. Apply WordNet lemmatization.

Negation words such as `not`, `no`, and `never` are retained to preserve sentiment meaning.

## Feature Extraction

**TF-IDF Vectorization**

`TfidfVectorizer(max_features=5000)` is used to convert text into numerical features.

The benchmark section also compares unigram and bigram features to capture individual words and two-word combinations.

## Machine Learning Algorithms

- **Multinomial Naive Bayes:** Uses word-frequency-based probability estimates for text classification.
- **Logistic Regression:** Learns relationships between TF-IDF features and sentiment labels to classify reviews.

## Implementation Workflow

1. Load the sample reviews and benchmark dataset.
2. Clean and preprocess the review text.
3. Tokenize, remove stopwords, and lemmatize.
4. Extract TF-IDF features.
5. Train Multinomial Naive Bayes and Logistic Regression models.
6. Evaluate models using a hold-out test set.
7. Perform 5-fold cross-validation.
8. Compare model performance.
9. Implement `predict_sentiment(text, model)` to return a sentiment label and confidence.
10. Test custom reviews through an interactive input cell.

## Model Performance

**Benchmark Results – NLTK Movie Reviews**

| Model | Test Accuracy | 5-Fold CV |
|---|---:|---:|
| Multinomial Naive Bayes | 0.820 (82.0%) | 0.818 ± 0.014 |
| **Logistic Regression** | **0.855 (85.5%)** | **0.854 ± 0.012** |

**Best-performing model:** Logistic Regression with 85.5% test accuracy.

## Limitations

- The benchmark models are trained on movie reviews, so performance may differ on product-review language.
- TF-IDF is based on word features and does not fully understand sarcasm or long-range context.
- An in-domain dataset, such as Amazon product reviews, would be more appropriate for product-specific sentiment prediction.

---

# Technologies & Tools Used

| Category | Technologies |
|---|---|
| Programming Language | Python |
| Data Processing | Pandas, NumPy |
| Machine Learning | Scikit-learn |
| Classification | Logistic Regression, Decision Tree, Random Forest, XGBoost, Multinomial Naive Bayes |
| Regression | Linear Regression, OLS, Ridge, Lasso |
| NLP | NLTK, TF-IDF, WordNet |
| Imbalanced Data Handling | SMOTE, imbalanced-learn |
| Data Visualization | Matplotlib, Seaborn |
| Model Optimization | GridSearchCV, Cross-Validation |
| Model Evaluation | Accuracy, Precision, Recall, F1-Score, ROC-AUC, RMSE, MAE, R² |
| Development Environment | Jupyter Notebook, Google Colab, VS Code |
| Version Control | Git, GitHub |

---

# Repository Structure

The repository can be organized as follows:

```text
Datheon-ML-DS-Internship/
│
├── Task-1-Iris-Classification/
│   ├── Iris_Classification_ML_Project.ipynb
│   ├── iris.csv
│   ├── logistic_regression_iris.joblib
│   └── decision_tree_iris.joblib
│
├── Task-2-Housing-Price-Prediction/
│   └── Housing_Price_Prediction.ipynb
│
├── Task-3-Customer-Churn-Prediction/
│   └── churn_rf_xgboost.ipynb
│
├── Task-4-Sentiment-Classification/
│   └── sentiment_analysis_tfidf.ipynb
│
└── README.md
```

Notebook and dataset filenames can be adjusted to match the actual repository files.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Project

```bash
cd Datheon-ML-DS-Internship
```

### 3. Install Dependencies

```bash
pip install pandas numpy matplotlib seaborn scikit-learn nltk xgboost imbalanced-learn joblib jupyter openpyxl
```

### 4. Launch Jupyter Notebook

```bash
jupyter notebook
```

Open the relevant task folder and execute the notebook cells in sequence.

**Requirements:**

- Python 3.9 or later is recommended.
- Internet access is required on the first run for the NLTK corpora and public dataset fallbacks used by the sentiment and churn notebooks.
- Some tasks may use local dataset files when available.

---

# Learning Outcomes

Through these four internship tasks, I gained practical experience in:

- Exploratory Data Analysis and data preprocessing.
- Feature engineering, feature scaling, and data imputation.
- Multiclass classification and regression.
- Natural Language Processing and text classification.
- TF-IDF feature extraction and sentiment analysis.
- Customer churn prediction and class imbalance handling.
- Training and comparing machine learning algorithms.
- Regularization techniques and hyperparameter optimization.
- Cross-validation and model evaluation.
- Error analysis, residual analysis, and feature importance.
- Data visualization and interpretation.
- Saving and reusing trained machine learning models.

---

