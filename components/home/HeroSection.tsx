/** @format */
"use client";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-[#11011E] py-16 px-6 md:px-16 lg:px-20 text-center overflow-hidden">
      {/* Blurred Accent Elements */}
      <div className="absolute top-[-150px] left-[-150px] w-96 h-96 bg-[#90e6d9a9] opacity-40 blur-[200px]"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-96 h-96 bg-[#90e6d9a9] opacity-40 blur-[200px]"></div>

      {/* Star Rating */}
      <div className="relative z-10 flex justify-center items-center mb-4 animate-fadeIn">
        <span className="flex items-center bg-[#FFFFFF05] border border-[#ffffff17] px-3 py-1 rounded-full">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Image
                key={index}
                src="/images/star.png"
                alt="Star"
                className="w-3 h-3 mr-1"
                width={12}
                height={12}
              />
            ))}
          <span className="font-roboto text-[#B6B6B6] text-xs">5 star rated</span>
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="relative z-10 font-raleway font-bold text-[#ECF1F0] text-3xl lg:text-5xl mb-4 leading-tight animate-slideInUp">
        Apply 10x faster, <br />
        Get 3x more interviews <br />
        with automation
      </h1>

      {/* Subheading */}
      <p className="relative z-10 font-roboto text-[#B6B6B6] text-lg mb-8 animate-fadeIn">
        Our AI Job search tool automatically applies to all the jobs on platforms like LinkedIn,
        <br />
        Indeed, and Monster Job using AI bots.
      </p>

      {/* CTA Button */}
      <div className="relative z-10 flex justify-center mb-8">
        <button className="bg-[#0FAE96] hover:bg-[#0FAE96]/90 text-white font-roboto font-semibold text-lg px-6 py-3 rounded-lg shadow-lg transition">
          Get started - Try it for free
        </button>
      </div>

      {/* Trust Indicators: Avatars and User Count */}
      <div className="relative z-10 flex flex-col items-center animate-fadeIn">
        {/* Circular Avatars */}
        <div className="flex -space-x-4 mb-2">
          {["Img1.png", "Img2.png", "Img3.png", "Img4.png"].map((img, index) => (
            <Image
              key={index}
              src={`/images/${img}`}
              alt={`Avatar ${index + 1}`}
              className="w-10 h-10 rounded-full border border-[#FFFFFF]"
              width={40}
              height={40}
            />
          ))}
        </div>
        {/* User Base Text */}
        <p className="font-roboto text-[#B6B6B6] text-sm">
          and <span className="text-[#0FAE96] font-bold">150+</span> jobseekers using Jobform Automator
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
