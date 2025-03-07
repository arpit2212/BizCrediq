import React, { useState } from "react";

const Model = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [creditScore, setCreditScore] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    yearsOfOperation: "",
    partnershipType: "",
    applicantAge: "",
    cibilScore: "",
    licensingVerified: "",
    qualityControlVerified: "",
    panRegistered: "",
    tanRegistered: "",
    gstRegistered: "",
    exciseRegistered: "",
    gstFilingStatus: "",
    taxReturnFiled: "",
    geography: "",
    purposeOfLoan: "",
    marketForecast: "",
    marketStabilityYears: "",
    uspStrength: "",
    socialMediaFollowers: "",
    socialMediaEngagement: "",
    onlineReview: "",
    annualRevenue: "",
    annualFixedExpenses: "",
    annualVariableExpenses: "",
    supplierPayments: "",
    loanDefaults: "",
    creditUtilizationRatio: "",
    digitalInvoiceUsage: "",
    bankTransactions: "",
    collateralStrength: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Map form data to the format expected by the Flask API
      const apiData = {
        "Business Type": formData.businessType,
        "Years of Operation": formData.yearsOfOperation,
        "Partnership Type": formData.partnershipType,
        "Applicant Age": formData.applicantAge,
        "Associates CIBIL Score": formData.cibilScore,
        "Licensing Verified": formData.licensingVerified,
        "Quality Control Verified": formData.qualityControlVerified,
        "PAN Registered": formData.panRegistered,
        "TAN Registered": formData.tanRegistered,
        "GST Registered": formData.gstRegistered,
        "Excise Registered": formData.exciseRegistered,
        "GST Filing Status": formData.gstFilingStatus,
        "Tax Return Filed": formData.taxReturnFiled,
        "Geography": formData.geography,
        "Purpose of Loan": formData.purposeOfLoan,
        "Market Forecast": formData.marketForecast,
        "Market Stability Years": formData.marketStabilityYears,
        "USP Strength": formData.uspStrength,
        "Social Media Followers": formData.socialMediaFollowers,
        "Social Media Engagement": formData.socialMediaEngagement,
        "Online Review Rating": formData.onlineReview,
        "Annual Revenue (in Lakh)": formData.annualRevenue,
        "Annual Fixed Expenses (in Lakh)": formData.annualFixedExpenses,
        "Annual Variable Expenses (in Lakh)": formData.annualVariableExpenses,
        "Supplier Payments (in Lakh)": formData.supplierPayments,
        "Loan Defaults": formData.loanDefaults,
        "Credit Utilization Ratio": formData.creditUtilizationRatio,
        "Digital Invoice Usage": formData.digitalInvoiceUsage,
        "Bank Transactions (per year)": formData.bankTransactions,
        "Collateral Strength": formData.collateralStrength
      };
      
      // Replace with your Flask API endpoint
      const apiUrl = "http://localhost:5000/predict";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }
      
      // Set the credit score from the API response
      setCreditScore(data.predicted_cibil_score_formatted);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "An error occurred while checking the credit score");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCreditScore(null);
    setError(null);
    setFormData({
      companyName: "",
      businessType: "",
      yearsOfOperation: "",
      partnershipType: "",
      applicantAge: "",
      cibilScore: "",
      licensingVerified: "",
      qualityControlVerified: "",
      panRegistered: "",
      tanRegistered: "",
      gstRegistered: "",
      exciseRegistered: "",
      gstFilingStatus: "",
      taxReturnFiled: "",
      geography: "",
      purposeOfLoan: "",
      marketForecast: "",
      marketStabilityYears: "",
      uspStrength: "",
      socialMediaFollowers: "",
      socialMediaEngagement: "",
      onlineReview: "",
      annualRevenue: "",
      annualFixedExpenses: "",
      annualVariableExpenses: "",
      supplierPayments: "",
      loanDefaults: "",
      creditUtilizationRatio: "",
      digitalInvoiceUsage: "",
      bankTransactions: "",
      collateralStrength: ""
    });
  };

  return (
    <div className="border-5 border-blue-500 border-double p-4 mt-10">
      <div className="bg-white border-2 border-white/20 backdrop-blur-lg shadow-lg text-black rounded-lg p-10 w-full mx-auto">
        <h1 className="text-3xl text-center font-bold mb-6">Check Business Credit Score</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Company Name */}
            <div className="flex flex-col">
              <label htmlFor="companyName" className="font-semibold">Company Name*</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Enter company name"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            {/* 2. Business Type */}
            <div className="flex flex-col">
              <label htmlFor="businessType" className="font-semibold">Business Type*</label>
              <select
                id="businessType"
                name="businessType"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.businessType}
                onChange={handleChange}
              >
                <option value="">Select Business Type</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Technology">Technology</option>
                <option value="Service">Service</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>

            {/* 3. Years of Operation */}
            <div className="flex flex-col">
              <label htmlFor="yearsOfOperation" className="font-semibold">Years of Operation*</label>
              <input
                type="number"
                id="yearsOfOperation"
                name="yearsOfOperation"
                placeholder="Enter years"
                required
                min="0"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.yearsOfOperation}
                onChange={handleChange}
              />
            </div>

            {/* 4. Partnership Type */}
            <div className="flex flex-col">
              <label htmlFor="partnershipType" className="font-semibold">Partnership Type*</label>
              <select
                id="partnershipType"
                name="partnershipType"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.partnershipType}
                onChange={handleChange}
              >
                <option value="">Select Partnership Type</option>
                <option value="Partnership">Partnership</option>
                <option value="Private Limited">Private Limited</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
              </select>
            </div>

            {/* 5. Applicant Age */}
            <div className="flex flex-col">
              <label htmlFor="applicantAge" className="font-semibold">Applicant Age*</label>
              <input
                type="number"
                id="applicantAge"
                name="applicantAge"
                placeholder="Enter age"
                required
                min="18"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.applicantAge}
                onChange={handleChange}
              />
            </div>

            {/* 6. Associates CIBIL Score */}
            <div className="flex flex-col">
              <label htmlFor="cibilScore" className="font-semibold">Associates CIBIL Score*</label>
              <input
                type="number"
                id="cibilScore"
                name="cibilScore"
                placeholder="Enter CIBIL score"
                required
                min="300"
                max="900"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.cibilScore}
                onChange={handleChange}
              />
            </div>

            {/* 7. Licensing Verified */}
            <div className="flex flex-col">
              <label htmlFor="licensingVerified" className="font-semibold">Licensing Verified*</label>
              <select
                id="licensingVerified"
                name="licensingVerified"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.licensingVerified}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            {/* 8. Quality Control Verified */}
            <div className="flex flex-col">
              <label htmlFor="qualityControlVerified" className="font-semibold">Quality Control Verified*</label>
              <select
                id="qualityControlVerified"
                name="qualityControlVerified"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.qualityControlVerified}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            {/* 9. PAN Registered */}
            <div className="flex flex-col">
              <label htmlFor="panRegistered" className="font-semibold">PAN Registered*</label>
              <select
                id="panRegistered"
                name="panRegistered"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.panRegistered}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            {/* 10. TAN Registered */}
            <div className="flex flex-col">
              <label htmlFor="tanRegistered" className="font-semibold">TAN Registered*</label>
              <select
                id="tanRegistered"
                name="tanRegistered"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.tanRegistered}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            {/* 11. GST Registered */}
            <div className="flex flex-col">
              <label htmlFor="gstRegistered" className="font-semibold">GST Registered*</label>
              <select
                id="gstRegistered"
                name="gstRegistered"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.gstRegistered}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            {/* 12. Excise Registered */}
            <div className="flex flex-col">
              <label htmlFor="exciseRegistered" className="font-semibold">Excise Registered*</label>
              <select
                id="exciseRegistered"
                name="exciseRegistered"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.exciseRegistered}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            {/* 13. GST Filing Status */}
            <div className="flex flex-col">
              <label htmlFor="gstFilingStatus" className="font-semibold">GST Filing Status*</label>
              <select
                id="gstFilingStatus"
                name="gstFilingStatus"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.gstFilingStatus}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Compliant">Compliant</option>
                <option value="Non-Compliant">Non-Compliant</option>
              </select>
            </div>

            {/* 14. Tax Return Filed */}
            <div className="flex flex-col">
              <label htmlFor="taxReturnFiled" className="font-semibold">Tax Return Filed*</label>
              <select
                id="taxReturnFiled"
                name="taxReturnFiled"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.taxReturnFiled}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* 15. Geography */}
            <div className="flex flex-col">
              <label htmlFor="geography" className="font-semibold">Geography*</label>
              <select
                id="geography"
                name="geography"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.geography}
                onChange={handleChange}
              >
                <option value="">Select Geography</option>
                <option value="Urban">Urban</option>
                <option value="Metropolitan">Metropolitan</option>
                <option value="Rural">Rural</option>
                <option value="Suburban">Suburban</option>
              </select>
            </div>

            {/* 16. Purpose of Loan */}
            <div className="flex flex-col">
              <label htmlFor="purposeOfLoan" className="font-semibold">Purpose of Loan*</label>
              <select
                id="purposeOfLoan"
                name="purposeOfLoan"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.purposeOfLoan}
                onChange={handleChange}
              >
                <option value="">Select Purpose</option>
                <option value="Business Expansion">Business Expansion</option>
                <option value="Working Capital">Working Capital</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
                <option value="Equipment Purchase">Equipment Purchase</option>
                <option value="Inventory Purchase">Inventory Purchase</option>
              </select>
            </div>

            {/* 17. Market Forecast */}
            <div className="flex flex-col">
              <label htmlFor="marketForecast" className="font-semibold">Market Forecast*</label>
              <select
                id="marketForecast"
                name="marketForecast"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.marketForecast}
                onChange={handleChange}
              >
                <option value="">Select Forecast</option>
                <option value="Stable">Stable</option>
                <option value="Growing">Growing</option>
                <option value="Volatile">Volatile</option>
                <option value="Declining">Declining</option>
              </select>
            </div>

            {/* 18. Market Stability Years */}
            <div className="flex flex-col">
              <label htmlFor="marketStabilityYears" className="font-semibold">Market Stability Years*</label>
              <input
                type="number"
                id="marketStabilityYears"
                name="marketStabilityYears"
                placeholder="Enter years"
                required
                min="0"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.marketStabilityYears}
                onChange={handleChange}
              />
            </div>

            {/* 19. USP Strength */}
            <div className="flex flex-col">
              <label htmlFor="uspStrength" className="font-semibold">USP Strength*</label>
              <select
                id="uspStrength"
                name="uspStrength"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.uspStrength}
                onChange={handleChange}
              >
                <option value="">Select Strength</option>
                <option value="Strong">Strong</option>
                <option value="Moderate">Moderate</option>
                <option value="Weak">Weak</option>
                <option value="Very Strong">Very Strong</option>
              </select>
            </div>

            {/* 20. Social Media Followers */}
            <div className="flex flex-col">
              <label htmlFor="socialMediaFollowers" className="font-semibold">Social Media Followers*</label>
              <input
                type="number"
                id="socialMediaFollowers"
                name="socialMediaFollowers"
                placeholder="Enter number of followers"
                required
                min="0"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.socialMediaFollowers}
                onChange={handleChange}
              />
            </div>

            {/* 21. Social Media Engagement */}
            <div className="flex flex-col">
              <label htmlFor="socialMediaEngagement" className="font-semibold">Social Media Engagement (0-1)*</label>
              <input
                type="number"
                id="socialMediaEngagement"
                name="socialMediaEngagement"
                placeholder="Enter engagement ratio"
                required
                min="0"
                max="1"
                step="0.01"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.socialMediaEngagement}
                onChange={handleChange}
              />
            </div>

            {/* 22. Online Review */}
            <div className="flex flex-col">
              <label htmlFor="onlineReview" className="font-semibold">Online Review (Out of 10)*</label>
              <input
                type="number"
                id="onlineReview"
                name="onlineReview"
                placeholder="Enter review score"
                required
                min="0"
                max="10"
                step="0.1"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.onlineReview}
                onChange={handleChange}
              />
            </div>

            {/* 23. Annual Revenue */}
            <div className="flex flex-col">
              <label htmlFor="annualRevenue" className="font-semibold">Annual Revenue (in Lakh)*</label>
              <input
                type="number"
                id="annualRevenue"
                name="annualRevenue"
                placeholder="Enter annual revenue"
                required
                min="0"
                step="0.01"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.annualRevenue}
                onChange={handleChange}
              />
            </div>

            {/* 24. Annual Fixed Expenses */}
            <div className="flex flex-col">
              <label htmlFor="annualFixedExpenses" className="font-semibold">Annual Fixed Expenses (in Lakh)*</label>
              <input
                type="number"
                id="annualFixedExpenses"
                name="annualFixedExpenses"
                placeholder="Enter fixed expenses"
                required
                min="0"
                step="0.01"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.annualFixedExpenses}
                onChange={handleChange}
              />
            </div>

            {/* 25. Annual Variable Expenses */}
            <div className="flex flex-col">
              <label htmlFor="annualVariableExpenses" className="font-semibold">Annual Variable Expenses (in Lakh)*</label>
              <input
                type="number"
                id="annualVariableExpenses"
                name="annualVariableExpenses"
                placeholder="Enter variable expenses"
                required
                min="0"
                step="0.01"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.annualVariableExpenses}
                onChange={handleChange}
              />
            </div>

            {/* 26. Supplier Payments */}
            <div className="flex flex-col">
              <label htmlFor="supplierPayments" className="font-semibold">Supplier Payments (in Lakh)*</label>
              <input
                type="number"
                id="supplierPayments"
                name="supplierPayments"
                placeholder="Enter supplier payments"
                required
                min="0"
                step="0.01"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.supplierPayments}
                onChange={handleChange}
              />
            </div>

            {/* 27. Loan Defaults */}
            <div className="flex flex-col">
              <label htmlFor="loanDefaults" className="font-semibold">Loan Defaults*</label>
              <select
                id="loanDefaults"
                name="loanDefaults"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.loanDefaults}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* 28. Credit Utilization Ratio */}
            <div className="flex flex-col">
              <label htmlFor="creditUtilizationRatio" className="font-semibold">Credit Utilization Ratio (0-1)*</label>
              <input
                type="number"
                id="creditUtilizationRatio"
                name="creditUtilizationRatio"
                placeholder="Enter ratio"
                required
                min="0"
                max="1"
                step="0.01"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.creditUtilizationRatio}
                onChange={handleChange}
              />
            </div>

            {/* 29. Digital Invoice Usage */}
            <div className="flex flex-col">
              <label htmlFor="digitalInvoiceUsage" className="font-semibold">Digital Invoice Usage*</label>
              <select
                id="digitalInvoiceUsage"
                name="digitalInvoiceUsage"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.digitalInvoiceUsage}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* 30. Bank Transactions */}
            <div className="flex flex-col">
              <label htmlFor="bankTransactions" className="font-semibold">Bank Transactions (per year)*</label>
              <input
                type="number"
                id="bankTransactions"
                name="bankTransactions"
                placeholder="Enter number of transactions"
                required
                min="0"
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.bankTransactions}
                onChange={handleChange}
              />
            </div>

            {/* 31. Collateral Strength */}
            <div className="flex flex-col">
              <label htmlFor="collateralStrength" className="font-semibold">Collateral Strength*</label>
              <select
                id="collateralStrength"
                name="collateralStrength"
                required
                className="border-2 border-blue-500 rounded-lg p-3 mt-2 w-full bg-transparent"
                value={formData.collateralStrength}
                onChange={handleChange}
              >
                <option value="">Select Strength</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {creditScore !== null ? (
            <div className="bg-black border-2 border-white/20 backdrop-blur-lg shadow-lg text-white rounded-lg mt-6 p-4 text-center">
              <p className="text-xl font-bold mb-2">Credit Score: <span className="text-2xl">{creditScore}</span></p>
              <p className="mb-4 text-white/80">Based on your business profile and financial data</p>
              <button
                onClick={resetForm}
                type="button"
                className="w-full bg-red-500 text-white font-bold py-2 rounded-lg mt-2 hover:bg-red-600 transition duration-300"
              >
                Check for Another Company
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-gray-500' : 'bg-black hover:bg-blue-500'} text-white font-bold py-2 rounded-lg mt-6 transition duration-300`}
            >
              {isLoading ? 'Processing...' : 'Check Credit Score'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Model;