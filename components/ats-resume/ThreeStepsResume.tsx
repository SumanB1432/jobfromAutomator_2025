import React, { useEffect, useRef, useState } from "react";


export default function ThreeStepsResume() {
  const steps = [
    {
      id: 1,
      title: "Check Resume & Skills",
      description:
        "Find what’s missing and create the perfect ATS resume.",
      icon: "/images/resume.svg", // Path to the image for step 1
    },
    {
      id: 2,
      title: "Learn & Apply with AI",
      description:
        "Fill skill gaps for free and auto-apply to jobs.",
      icon: "/images/skill.svg", // Path to the image for step 2
    },
    {
      id: 3,
      title: "Get Hired",
      description:
        "Stand out. Get interviews. Land your dream job.",
      icon: "/images/job.svg", // Path to the image for step 3
    },
  ];

  const stepRefs = useRef([]); // Reference for steps
  const [isInView, setIsInView] = useState(false); // State to track visibility of steps



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true); // Show step when in view
          } else {
            setIsInView(false); // Hide step when out of view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the step is in view
    );

    // Observe only non-null elements
    stepRefs.current
      .filter((step) => step !== null)
      .forEach((step) => observer.observe(step));

    return () => {
      stepRefs.current
        .filter((step) => step !== null)
        .forEach((step) => observer.unobserve(step));
    };
  }, []);

  return (
    <div className="text-white py-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
        {/* Section Title */}
        <div className="px-4 backdrop-blur-3xl py-2 space-x-3 border-[1.5px] border-[#FFFFFF0D] rounded-full flex items-center bg-[#FFFFFF05]">
          <div className="w-3 h-3 bg-[#0FAE96] rounded-full"></div>
          <div className="text-[#0FAE96] text-sm">How it works ?</div>
        </div>
        <h2 className="text-3xl font-bold">3 Steps to Get Your Dream Job</h2>
        <p className="text-gray-400">
        Build your resume in one click, fix skill gaps, auto-apply with AI, and get hired for your dream job—faster than ever.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => (stepRefs.current[index] = el)} // Assign DOM element
              className={`bg-[#FFFFFF05]  border-[#ffffff17] border-[1.5px] rounded-lg p-6 space-y-4 transition-all duration-500 ease-in-out transform ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Icon */}
              <div className="bg-[#2C223B] w-12 h-12 flex items-center justify-center rounded-full">
                <img
                  src={step.icon}
                  alt={`Icon for ${step.title}`}
                  className="w-6 h-6"
                />
              </div>
              {/* Title */}
              <h3 className="text-xl text-[#0FAE96]">{step.title}</h3>
              {/* Description */}
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <button className="bg-[#0FAE96] hover:bg-[#228273] text-white py-3 px-6 rounded-lg font-semibold mt-8"
                      onClick={openModalForAnalyze}
                      disabled={analyzeLoading}>
          Analyze Your Skills
        </button> */}
      </div>
    </div>
  );
}
