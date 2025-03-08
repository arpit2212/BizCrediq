from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
import pandas as pd
import joblib
import os
import numpy as np

# Initialize FastAPI app
app = FastAPI(title="CIBIL Score Prediction API", 
              description="API for predicting CIBIL scores based on business data")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all domains (change to specific frontend URL in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define feature names
FEATURES = [
    "Business Type", "Years of Operation", "Partnership Type", "Applicant Age", "Associates CIBIL Score",
    "Licensing Verified", "Quality Control Verified", "PAN Registered", "TAN Registered", "GST Registered",
    "Excise Registered", "GST Filing Status", "Tax Return Filed", "Geography", "Purpose of Loan", "Market Forecast",
    "Market Stability Years", "USP Strength", "Social Media Followers", "Social Media Engagement",
    "Online Review Rating", "Annual Revenue (in Lakh)", "Annual Fixed Expenses (in Lakh)",
    "Annual Variable Expenses (in Lakh)", "Supplier Payments (in Lakh)", "Loan Defaults",
    "Credit Utilization Ratio", "Digital Invoice Usage", "Bank Transactions (per year)", "Collateral Strength"
]

# Define input schema with validation
class CibilInput(BaseModel):
    data: Dict[str, Any]

# Model loading with error handling
@app.on_event("startup")
async def load_model():
    global lgb_model, label_encoders
    try:
        lgb_model = joblib.load("lgbm_cibil_model.pkl")
        label_encoders = joblib.load("label_encoders_lgbm.pkl")
    except FileNotFoundError as e:
        print(f"Error loading model files: {e}")

# Health check endpoint
@app.get("/health")
def health_check():
    if 'lgb_model' not in globals() or 'label_encoders' not in globals():
        return {"status": "error", "message": "Model files not loaded"}
    return {"status": "healthy"}

# API prediction endpoint
@app.post("/predict", response_model=Dict[str, float])
def predict_cibil_score(input_data: CibilInput):
    # Check if model is loaded
    if 'lgb_model' not in globals() or 'label_encoders' not in globals():
        raise HTTPException(status_code=503, detail="Model not loaded. Please try again later.")
    
    try:
        user_input = input_data.data
        
        # Check for missing required features
        missing_features = [feature for feature in FEATURES if feature not in user_input]
        if missing_features:
            raise HTTPException(
                status_code=400, 
                detail=f"Missing required features: {', '.join(missing_features)}"
            )
        
        # Create a copy to avoid modifying original data
        processed_input = {}
        
        # Process each feature and ensure correct data types
        for feature in FEATURES:
            value = user_input.get(feature)
            
            # Process categoricals with label encoding if needed
            if feature in label_encoders and not isinstance(value, (int, float)):
                try:
                    # For categorical features, apply label encoding
                    processed_input[feature] = label_encoders[feature].transform([value])[0]
                except (ValueError, KeyError):
                    # For unknown categories, use default value
                    processed_input[feature] = 0
                    print(f"Warning: Unknown category for {feature}: {value}")
            else:
                # For numeric features, ensure they're numeric
                if value == "":
                    processed_input[feature] = 0
                else:
                    # Trust that the React form has already converted these to numbers
                    processed_input[feature] = value
        
        # Convert to DataFrame and ensure right column order
        df_cols = {}
        for feature in FEATURES:
            df_cols[feature] = [processed_input.get(feature, 0)]
        
        user_df = pd.DataFrame(df_cols)
        
        # Ensure all columns are numeric for LightGBM
        for col in user_df.columns:
            user_df[col] = pd.to_numeric(user_df[col], errors='coerce').fillna(0)
        
        # Predict CIBIL Score
        predicted_cibil_score = lgb_model.predict(user_df)[0]
        
        # Ensure prediction is in a reasonable range (300-900 for CIBIL scores)
        predicted_cibil_score = max(300, min(900, predicted_cibil_score))
        
        return {"predicted_cibil_score": round(predicted_cibil_score, 2)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# Documentation endpoint
@app.get("/")
def read_root():
    return {
        "api_name": "CIBIL Score Prediction API",
        "version": "1.0",
        "endpoints": {
            "/predict": "POST - Predict CIBIL score",
            "/health": "GET - Check API health"
        },
        "required_features": FEATURES
    }

# Run with: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)