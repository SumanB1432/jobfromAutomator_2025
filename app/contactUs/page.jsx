"use client"
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    userQuery: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_yze7ky8";
    const templateId = "template_oxfdv2q";
    const userId = "F2CUah0cRJS6yCSzN";

    const templateParams = {
      user_name: formData.name,
      from_email: formData.email,
      phoneNumber: formData.phoneNumber,
      userQuery: formData.userQuery,
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then(() => {
        toast.success("Your query has been sent successfully!");
        setFormData({ name: "", email: "", phoneNumber: "", userQuery: "" });
      })
      .catch(() => {
        toast.error("There was an issue sending your query. Please try again later.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#11011E] to-[#1A022D] text-white px-4 py-12">
      <div className="max-w-[900px] w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-[#ECF1F0] mb-6 bg-gradient-to-r from-[#0FAE96] to-[#FF00C7] bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Have a question or suggestion? Reach out to us!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-[rgba(255,255,255,0.08)] text-[#ECF1F0] border border-[rgba(255,255,255,0.1)] focus:ring-2 focus:ring-[#0FAE96] focus:outline-none placeholder-gray-400"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Mobile Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            className="w-full p-4 rounded-lg bg-[rgba(255,255,255,0.08)] text-[#ECF1F0] border border-[rgba(255,255,255,0.1)] focus:ring-2 focus:ring-[#0FAE96] focus:outline-none placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-[rgba(255,255,255,0.08)] text-[#ECF1F0] border border-[rgba(255,255,255,0.1)] focus:ring-2 focus:ring-[#0FAE96] focus:outline-none placeholder-gray-400"
          />
          <textarea
            name="userQuery"
            placeholder="Message"
            value={formData.userQuery}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-[rgba(255,255,255,0.08)] text-[#ECF1F0] border border-[rgba(255,255,255,0.1)] focus:ring-2 focus:ring-[#0FAE96] focus:outline-none placeholder-gray-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0FAE96] to-[#0FAE96] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#0FAE96]/80 hover:to-[#0FAE96]/80 transition-all duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
