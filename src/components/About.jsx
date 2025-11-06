import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6  ">
      <div className="max-w-5xl bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 bg-gradient-to-r from-blue-300 to-purple-400">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="About us"
            className="rounded-lg shadow-md object-cover w-full h-64 md:h-full"
          />
        </div>

        {/* Text Content Section */}
        <div className="md:w-1/2 text-black">
          <h1 className="text-4xl font-extrabold mb-4">About Our Company</h1>
          <p className="mb-4 text-lg leading-relaxed font-medium ">
            We are dedicated to delivering the best employee management
            solutions tailored to your organization's needs. Our team of experts
            works tirelessly to create innovative and user-friendly software
            that empowers businesses worldwide.
          </p>
          <p className="text-lg leading-relaxed font-medium">
            Founded in 2025, our mission has always been to simplify management
            processes by integrating technology and intuitive design. Our
            commitment to excellence and customer satisfaction sets us apart in
            the industry.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
