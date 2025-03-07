import React from 'react';
import Footer from "../Components/Footer/Fotter";
import Header from "../Components/Header/Header";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#0f1632] relative flex flex-col mt-15">
      {/* Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-sm md:max-w-md border border-white/20 mt-20 mb-20 lg:ml-[110px]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
              Contact Us
            </h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-transparent text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-transparent text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 rounded bg-transparent text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="message"
                  placeholder="Your Message"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition-all duration-300 w-full"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
