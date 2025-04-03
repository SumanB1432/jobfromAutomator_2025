"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

const ResumeATSChecker = () => {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation sequence for benefits items
  const [animatedItems, setAnimatedItems] = useState([]);
  const benefits = [
    { icon: CheckCircle, text: "92% of employers use ATS software" },
    { icon: CheckCircle, text: "75% of resumes are rejected before human review" },
    { icon: CheckCircle, text: "Get personalized improvement tips" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          
          // Stagger the animations of benefit items
          const timer = setTimeout(() => {
            benefits.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedItems(prev => [...prev, index]);
              }, index * 200);
            });
          }, 400);
          
          return () => clearTimeout(timer);
        } else {
          setIsInView(false);
          setAnimatedItems([]);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-8 py-12 flex justify-center">
      <div
        ref={elementRef}
        className={`relative w-full max-w-6xl bg-gradient-to-br from-[#1A0B29] to-[#11011E] text-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ease-out ${
          isInView
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-10 opacity-0"
        }`}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0FAE96] opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        
        <div className="flex flex-col lg:flex-row justify-between items-center px-6 sm:px-8 md:px-12 py-8 md:py-10 border border-[#ffffff15] rounded-2xl backdrop-blur-sm">
          {/* Content Section */}
          <div className="text-center lg:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Is Your Resume Getting <span className="text-[#0FAE96]">Rejected</span> by ATS?
            </h3>
            
            <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
              Most resumes are filtered out by Applicant Tracking Systems before a human ever sees them. Our AI-powered scanner identifies the issues holding your resume back.
            </p>
            
            {/* Benefits */}
            <div className="mt-6 space-y-2.5">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 transition-all duration-500 ${
                    animatedItems.includes(index) 
                      ? "opacity-100 transform translate-x-0" 
                      : "opacity-0 transform -translate-x-4"
                  }`}
                >
                  <benefit.icon className="text-[#0FAE96]" size={18} />
                  <span className="text-sm sm:text-base text-gray-200">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 lg:mt-0 lg:ml-8 flex flex-col items-center">
            <div className="bg-[#1D0F30] p-5 rounded-xl border border-[#ffffff10] shadow-lg mb-4 w-full max-w-xs">
              <div className="text-center mb-2">
                <span className="inline-block px-3 py-1 bg-[#0FAE96] bg-opacity-10 rounded-full text-[#0FAE96] text-xs font-medium mb-2">
                  FREE ANALYSIS
                </span>
                <h4 className="text-lg font-semibold text-white">Get Your ATS Score</h4>
              </div>
              
              <button 
                className={`w-full bg-gradient-to-r from-[#0FAE96] to-[#0D9882] text-black font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transform transition-all duration-300 ${
                  isHovered ? "scale-[1.02]" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>Scan My Resume</span>
                <ArrowRight size={18} className={`transition-transform duration-300 ${isHovered ? "transform translate-x-1" : ""}`} />
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-3">
                Takes less than 2 minutes • No signup required
              </p>
            </div>
            
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border-2 border-[#11011E] flex items-center justify-center text-[10px] overflow-hidden">
                    <img src={`/api/placeholder/24/24`} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                <span className="text-[#0FAE96] font-medium">2,400+</span> scans today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeATSChecker;
