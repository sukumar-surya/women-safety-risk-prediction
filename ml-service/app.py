from fastapi import FastAPI
import pandas as pd
import joblib

app = FastAPI()

model = joblib.load("women_safety_model.pkl")
features = joblib.load("model_features.pkl")

@app.post("/predict")
def predict(data: dict):
    df = pd.DataFrame([data])
    df = df.reindex(columns=features, fill_value=0)

    prediction = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0].tolist()

    return {
        "risk_level": int(prediction),
        "probabilities": probabilities
    }