import React from "react";
import aboutpng from "../../assets/aboutus.png";

const AboutUsContain = () => {
  return (
    <div className="mt-20 text-center p-6 bg-gray-100 rounded-lg shadow-lg ">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
      <p className="text-lg text-gray-700">
      Credit Basics
Credit is the trust that allows individuals and businesses to borrow money with the promise to repay it later. Lenders assess a borrower's creditworthiness using credit scores, financial history, and repayment patterns. A high credit score means lower borrowing risk, while a low score can result in higher interest rates or loan rejections.

      </p>
       <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-10 md:py-20">
            {/* Left Side Content */}

            <div className="md:w-1/2 space-y-6 text-center md:text-left">
             
            <h2 className="text-2xl font-semibold text-blue-500 mt-2 ml-23">Key Factors Affecting Credit Scores:</h2>
      <ul className=" text-lg list-disc list-inside text-gray-800 text-left mx-auto max-w-lg mt-2">
        <li><strong>Payment History:</strong> On-time payments improve scores, while defaults lower them.</li>
        <li><strong>Credit Utilization:</strong> Using too much of your available credit can be risky.</li>
        <li><strong>Length of Credit History:</strong> Older credit accounts contribute to better scores.</li>
        <li><strong>Types of Credit:</strong> A mix of credit cards, loans, and mortgages can help.</li>
        <li><strong>New Credit Inquiries:</strong> Frequent loan applications may lower your score.</li>
      </ul>
              
              {/* Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
               
              </div>
            </div>
            
            {/* Right Side Image */}
            <div className="hidden md:flex md:w-1/2 justify-center mt-8 md:mt-0">
              <img
                src={aboutpng}
                alt="Tech Illustration"
                className="w-72 h-auto md:w-full max-w-sm md:max-w-full"
              />
            </div>
          </div>
    </div>
  );
};

export default AboutUsContain;
