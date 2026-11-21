
from pathlib import Path

import joblib
import pandas as pd

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS


# --------------------------------------------------
# APPLICATION CONFIGURATION
# --------------------------------------------------

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR

FEATURES = [
    "sepal_length",
    "sepal_width",
    "petal_length",
    "petal_width"
]


# --------------------------------------------------
# LOAD TRAINED MACHINE LEARNING MODELS
# --------------------------------------------------

MODELS = {}

try:
    MODELS["logistic_regression"] = joblib.load(
        MODEL_DIR / "logistic_regression_iris.joblib"
    )

    MODELS["decision_tree"] = joblib.load(
        MODEL_DIR / "decision_tree_iris.joblib"
    )

    print("Machine learning models loaded successfully.")

except Exception as error:
    MODELS = {}
    print(f"Error loading models: {error}")


# --------------------------------------------------
# HOME ROUTE - SERVE FRONTEND
# --------------------------------------------------

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


# --------------------------------------------------
# API: APPLICATION STATUS
# --------------------------------------------------

@app.route("/api/status", methods=["GET"])
def api_status():

    return jsonify({
        "status": "running",
        "message": "Welcome to IrisScope API",
        "available_models": list(MODELS.keys())
    })


# --------------------------------------------------
# API: FLOWER PREDICTION
# --------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def predict():

    if not MODELS:
        return jsonify({
            "success": False,
            "error": "Machine learning models are not loaded."
        }), 500

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "success": False,
            "error": "Please provide valid JSON input."
        }), 400

    model_name = data.get(
        "model",
        "logistic_regression"
    )

    if model_name not in MODELS:
        return jsonify({
            "success": False,
            "error": "Invalid model. Choose logistic_regression or decision_tree."
        }), 400

    try:

        values = {}

        for feature in FEATURES:

            value = data.get(feature)

            if value is None:
                raise ValueError(
                    f"Missing feature: {feature}"
                )

            number = float(value)

            if not pd.notna(number) or number <= 0:
                raise ValueError(
                    f"{feature} must be a positive number."
                )

            values[feature] = number

        input_data = pd.DataFrame(
            [values],
            columns=FEATURES
        )

        model = MODELS[model_name]

        prediction = model.predict(input_data)[0]

        probabilities = model.predict_proba(input_data)[0]

        classes = model.classes_

        probability_results = {
            str(label): round(float(probability) * 100, 2)
            for label, probability in zip(classes, probabilities)
        }

        return jsonify({
            "success": True,
            "model": model_name,
            "predicted_species": str(prediction),
            "probabilities": probability_results,
            "input": values
        })

    except (ValueError, TypeError) as error:

        return jsonify({
            "success": False,
            "error": str(error)
        }), 400

    except Exception as error:

        return jsonify({
            "success": False,
            "error": f"Prediction failed: {error}"
        }), 500


# --------------------------------------------------
# API: IRIS DATASET AND VISUALIZATION
# --------------------------------------------------

@app.route("/api/dataset", methods=["GET"])
def get_dataset():

    try:

        dataset_path = BASE_DIR / "iris.csv"

        df = pd.read_csv(dataset_path)

        # Normalize species labels
        df["species"] = (
            df["species"]
            .astype(str)
            .str.lower()
            .str.replace("iris-", "", regex=False)
            .str.strip()
        )

        required_columns = FEATURES + ["species"]

        missing_columns = [
            column
            for column in required_columns
            if column not in df.columns
        ]

        if missing_columns:
            return jsonify({
                "success": False,
                "error": f"Missing columns: {missing_columns}"
            }), 400

        # Convert measurements to numeric values
        for feature in FEATURES:
            df[feature] = pd.to_numeric(
                df[feature],
                errors="coerce"
            )

        df = df.dropna(subset=required_columns)

        records = df[required_columns].to_dict(
            orient="records"
        )

        means = (
            df.groupby("species")[FEATURES]
            .mean()
            .round(2)
            .to_dict(orient="index")
        )

        return jsonify({
            "success": True,
            "total_records": len(df),
            "records": records,
            "averages": means
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "error": f"Dataset loading failed: {error}"
        }), 500


# --------------------------------------------------
# RUN FLASK APPLICATION
# --------------------------------------------------

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
