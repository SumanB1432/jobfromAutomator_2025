"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { usePersonalDataStore } from "@/app/store";
import { GoPerson } from "react-icons/go";
import { BiWorld } from "react-icons/bi";
import { AiOutlineLink, AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import EducationInput from "./sections/EducationInput";
import ExperienceInput from "./sections/ExperienceInput";
import AchievementInput from "./sections/AchievementInput";
import CertificationInput from "./sections/CertificationInput";
import ProjectInput from "./sections/ProjectInput";
import SkillsInput from "./sections/SkillsInput";
import LanguageInput from "./sections/LanguageInput";

export default function LeftSidebar() {
  const { personalData, updatePersonalData } = usePersonalDataStore();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const handleChangePersonal = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updatePersonalData(name, value);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full h-[1000px] overflow-y-scroll scrollbar-none bg-gradient-to-b from-[#0F011E] via-[rgba(17,1,30,0.95)] to-[#0F011E] text-text-subtitle shadow-2xl rounded-xl">
      {/* Basics Section */}
      <section className="p-8 border-b border-[rgba(255,255,255,0.05)] bg-[#0F011E] backdrop-blur-md">
        <div className="flex items-center gap-4 mb-10 relative">
          <GoPerson className="text-3xl text-primary-accent drop-shadow-lg animate-pulse-slow" />
          <h2 className="text-3xl font-extrabold font-raleway text-transparent bg-gradient-to-r from-pink-300 to-green-400 bg-clip-text tracking-wider">
            Basics
          </h2>

          <div className="absolute -top-4 -left-4 w-20 h-20 bg-emphasis-purple opacity-20 rounded-full blur-3xl"></div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
            Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-accent via-[#0F8E76] to-[#0F6E56] rounded-full flex items-center justify-center text-pure-white text-2xl font-raleway shadow-lg ring-4 ring-[rgba(15,174,150,0.2)] transition-transform hover:scale-110 hover:ring-[rgba(15,174,150,0.4)] duration-300 overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                personalData.name?.[0] || "M"
              )}
            </div>

            <button
              onClick={handleIconClick}
              className="p-3 border border-[rgba(255,255,255,0.1)] rounded-xl bg-[rgba(255,255,255,0.05)] backdrop-blur-sm hover:bg-[rgba(15,174,150,0.1)] hover:border-primary-accent transition-all duration-300"
            >
              <AiOutlineLink className="text-text-subtitle hover:text-primary-accent transition-colors duration-200" />
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-4 border border-[rgba(255,255,255,0.1)] rounded-xl bg-[rgba(255,255,255,0.05)] backdrop-blur-sm text-text-title font-roboto placeholder-text-subtitle focus:ring-2 focus:ring-primary-accent focus:border-primary-accent focus:bg-white hover:bg-white valid:bg-white hover:text-black transition-all duration-300 shadow-inner"
            name="name"
            value={personalData.name || ""}
            onChange={handleChangePersonal}
            placeholder="Your full name"
          />

        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
            Headline
          </label>
          <input
            type="text"
            className="w-full p-4 border border-[rgba(255,255,255,0.1)] rounded-xl bg-[rgba(255,255,255,0.05)] backdrop-blur-sm text-text-title font-roboto placeholder-text-subtitle focus:ring-2 focus:ring-primary-accent focus:border-primary-accent focus:bg-white hover:bg-white valid:bg-white hover:text-black transition-all duration-300 shadow-inner"
            name="headline"
            value={personalData.headline || ""}
            onChange={handleChangePersonal}
            placeholder="Your professional headline"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-4 pl-12 border border-[rgba(255,255,255,0.1)] rounded-xl 
             bg-white placeholder-text-subtitle placeholder-shown:bg-[rgba(255,255,255,0.05)]
             backdrop-blur-sm text-text-title font-roboto focus:ring-2 focus:ring-primary-accent 
             focus:border-primary-accent hover:bg-white hover:text-black transition-all duration-300 shadow-inner"
                name="email"
                value={personalData.email || ""}
                onChange={handleChangePersonal}
                placeholder="Your email"
              />
              <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtitle hover:text-primary-accent transition-colors duration-200" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
              Website
            </label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-4 pl-12 border border-[rgba(255,255,255,0.1)] rounded-xl 
             bg-white placeholder-text-subtitle placeholder-shown:bg-[rgba(255,255,255,0.05)]
             backdrop-blur-sm text-text-title font-roboto focus:ring-2 focus:ring-primary-accent 
             focus:border-primary-accent hover:bg-white hover:text-black transition-all duration-300 shadow-inner"
                name="website"
                value={personalData.website || ""}
                onChange={handleChangePersonal}
                placeholder="Your website"
              />
              <BiWorld className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtitle hover:text-primary-accent transition-colors duration-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
              Twitter
            </label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-4 pl-12 border border-[rgba(255,255,255,0.1)] rounded-xl 
             bg-white placeholder-text-subtitle placeholder-shown:bg-[rgba(255,255,255,0.05)]
             backdrop-blur-sm text-text-title font-roboto focus:ring-2 focus:ring-primary-accent 
             focus:border-primary-accent hover:bg-white hover:text-black transition-all duration-300 shadow-inner"
                name="twitter"
                value={personalData.twitter || ""}
                onChange={handleChangePersonal}
                placeholder="Your Twitter profile"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtitle w-6 h-6 hover:text-primary-accent transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22 4.5a9 9 0 01-2.6.7 4.5 4.5 0 00-7.7 4c-4 0-7.5-2-10-5a4.5 4.5 0 001.5 6c-1 0-2-.3-2.5-1v.1a4.5 4.5 0 003.5 4.4 4.5 4.5 0 01-2 .1 4.5 4.5 0 004.2 3A9 9 0 012 19c2 1 4 1.5 6.5 1.5 7.5 0 12-6 12-12v-.5a8.5 8.5 0 002-2.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
              LinkedIn
            </label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-4 pl-12 border border-[rgba(255,255,255,0.1)] rounded-xl 
             bg-white placeholder-text-subtitle placeholder-shown:bg-[rgba(255,255,255,0.05)]
             backdrop-blur-sm text-text-title font-roboto focus:ring-2 focus:ring-primary-accent 
             focus:border-primary-accent hover:bg-white hover:text-black transition-all duration-300 shadow-inner"
                name="linkedin"
                value={personalData.linkedin || ""}
                onChange={handleChangePersonal}
                placeholder="Your LinkedIn profile"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtitle w-6 h-6 hover:text-primary-accent transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="9"
                  width="4"
                  height="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="4"
                  cy="4"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
              Phone
            </label>
            <div className="relative">
              <input
                type="tel"
                className="w-full p-4 pl-12 border border-[rgba(255,255,255,0.1)] rounded-xl 
             bg-white placeholder-text-subtitle placeholder-shown:bg-[rgba(255,255,255,0.05)]
             backdrop-blur-sm text-text-title font-roboto focus:ring-2 focus:ring-primary-accent 
             focus:border-primary-accent hover:bg-white hover:text-black transition-all duration-300 shadow-inner"
                name="phone"
                value={personalData.phone || ""}
                onChange={handleChangePersonal}
                placeholder="+1 (123) 456-7890"
              />
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtitle hover:text-primary-accent transition-colors duration-200" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-4 pl-12 border border-[rgba(255,255,255,0.1)] rounded-xl 
             bg-white placeholder-text-subtitle placeholder-shown:bg-[rgba(255,255,255,0.05)]
             backdrop-blur-sm text-text-title font-roboto focus:ring-2 focus:ring-primary-accent 
             focus:border-primary-accent hover:bg-white hover:text-black transition-all duration-300 shadow-inner"
                name="address"
                value={personalData.address || ""}
                onChange={handleChangePersonal}
                placeholder="Your location"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtitle w-6 h-6 hover:text-primary-accent transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="9"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium mb-3 font-roboto text-text-subtitle tracking-tight uppercase">
              GitHub
            </label>
            <div className="relative">
              <input
                type="url"
                className="w-full p-4 pl-12 border border-[rgba(255,255,255,0.1)] rounded-xl 
             bg-white placeholder-text-subtitle placeholder-shown:bg-[rgba(255,255,255,0.05)]
             backdrop-blur-sm text-text-title font-roboto focus:ring-2 focus:ring-primary-accent 
             focus:border-primary-accent hover:bg-white hover:text-black transition-all duration-300 shadow-inner"
                name="github"
                value={personalData.github || ""}
                onChange={handleChangePersonal}
                placeholder="Your GitHub profile"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtitle w-6 h-6 hover:text-primary-accent transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.388-1.333-1.758-1.333-1.758-1.089-.745.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.996.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.933 0-1.311.467-2.382 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.513 11.513 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.119 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.625-5.48 5.922.43.372.814 1.102.814 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <ExperienceInput />
      <EducationInput />
      <SkillsInput />
      <AchievementInput />
      <CertificationInput />
      <ProjectInput />
      <LanguageInput />
    </div>
  );
}