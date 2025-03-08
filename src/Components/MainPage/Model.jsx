import React, { useState } from "react";
import axios from "axios";

const Model = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [creditScore, setCreditScore] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    "Business Type": "",
    "Years of Operation": "",
    "Partnership Type": "",
    "Applicant Age": "",
    "Associates CIBIL Score": "",
    "Licensing Verified": "",
    "Quality Control Verified": "",
    "PAN Registered": "",
    "TAN Registered": "",
    "GST Registered": "",
    "Excise Registered": "",
    "GST Filing Status": "",
    "Tax Return Filed": "",
    Geography: "",
    "Purpose of Loan": "",
    "Market Forecast": "",
    "Market Stability Years": "",
    "USP Strength": "",
    "Social Media Followers": "",
    "Social Media Engagement": "",
    "Online Review Rating": "",
    "Annual Revenue (in Lakh)": "",
    "Annual Fixed Expenses (in Lakh)": "",
    "Annual Variable Expenses (in Lakh)": "",
    "Supplier Payments (in Lakh)": "",
    "Loan Defaults": "",
    "Credit Utilization Ratio": "",
    "Digital Invoice Usage": "",
    "Bank Transactions (per year)": "",
    "Collateral Strength": "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Convert relevant fields to numbers before sending
    const formattedData = {
      "Business Type": formData["Business Type"],
      "Years of Operation": Number(formData["Years of Operation"]),
      "Partnership Type": formData["Partnership Type"],
      "Applicant Age": Number(formData["Applicant Age"]),
      "Associates CIBIL Score": Number(formData["Associates CIBIL Score"]),
      "Licensing Verified": formData["Licensing Verified"],
      "Quality Control Verified": formData["Quality Control Verified"],
      "PAN Registered": formData["PAN Registered"],
      "TAN Registered": formData["TAN Registered"],
      "GST Registered": formData["GST Registered"],
      "Excise Registered": formData["Excise Registered"],
      "GST Filing Status": formData["GST Filing Status"],
      "Tax Return Filed": formData["Tax Return Filed"],
      Geography: formData["Geography"],
      "Purpose of Loan": formData["Purpose of Loan"],
      "Market Forecast": formData["Market Forecast"],
      "Market Stability Years": Number(formData["Market Stability Years"]),
      "USP Strength": formData["USP Strength"],
      "Social Media Followers": Number(formData["Social Media Followers"]),
      "Social Media Engagement": formData["Social Media Engagement"],
      "Online Review Rating": Number(formData["Online Review Rating"]),
      "Annual Revenue (in Lakh)": Number(formData["Annual Revenue (in Lakh)"]),
      "Annual Fixed Expenses (in Lakh)": Number(
        formData["Annual Fixed Expenses (in Lakh)"]
      ),
      "Annual Variable Expenses (in Lakh)": Number(
        formData["Annual Variable Expenses (in Lakh)"]
      ),
      "Supplier Payments (in Lakh)": Number(
        formData["Supplier Payments (in Lakh)"]
      ),
      "Loan Defaults": formData["Loan Defaults"],
      "Credit Utilization Ratio": Number(formData["Credit Utilization Ratio"]),
      "Digital Invoice Usage": formData["Digital Invoice Usage"],
      "Bank Transactions (per year)": Number(
        formData["Bank Transactions (per year)"]
      ),
      "Collateral Strength": formData["Collateral Strength"],
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, {
        data: formattedData,
      });

      if (response.status === 200) {
        setCreditScore(response.data.predicted_cibil_score);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.detail || "Failed to fetch CIBIL score");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to determine input type
  const getInputType = (key) => {
    if (
      key.includes("Age") ||
      key.includes("Years") ||
      key.includes("Score") ||
      key.includes("Followers") ||
      key.includes("Rating") ||
      key.includes("Lakh") ||
      key.includes("Ratio") ||
      key.includes("per year")
    ) {
      return "number";
    } else if (
      key === "Licensing Verified" ||
      key === "Quality Control Verified" ||
      key === "PAN Registered" ||
      key === "TAN Registered" ||
      key === "GST Registered" ||
      key === "Excise Registered" ||
      key === "Tax Return Filed" ||
      key === "Loan Defaults" ||
      key === "Digital Invoice Usage"
    ) {
      return "select";
    }
    return "text";
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Predict CIBIL Score</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium">{key}</label>
            {getInputType(key) === "select" ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="p-2 border rounded-lg"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : (
              <input
                type={getInputType(key)}
                name={key}
                step="any"
                value={formData[key]}
                onChange={handleChange}
                className="p-2 border rounded-lg"
                min={getInputType(key) === "number" ? "0" : undefined}
                required
              />
            )}
          </div>
        ))}

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Prediction"}
          </button>
        </div>
      </form>

      {creditScore !== null && (
        <h3 className="mt-4 text-xl font-bold">
          Predicted CIBIL Score: {creditScore}
        </h3>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Model;
