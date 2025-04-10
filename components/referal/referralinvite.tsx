'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import gift from '@/public/images/gift.svg';
import app from "@/firebase/config";
import { getDatabase, ref, get } from "firebase/database";

const ReferralInvite = () => {
  const [showReferralLink, setShowReferralLink] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  const [fullName, setFullName] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const db = getDatabase(app);

  useEffect(() => {
    const fetchUserData = async () => {
      const loginStatus = localStorage.getItem("IsLogin");
      setIsLogin(loginStatus);

      const userId = localStorage.getItem("UID");
      if (userId) {
        const findUser = ref(db, `user/${userId}`);
        get(findUser).then((snapshot) => {
          const Name = snapshot.val()?.name;
          const fname = snapshot.val()?.fname;
          const lname = snapshot.val()?.lname;
          const user = Name || `${fname} ${lname}`;
          setFullName(user.replace(/\s/g, ""));
        });
      }
    };
    fetchUserData();
  }, []);

  const handleStartClick = () => {
    if (isLogin !== null && isLogin !== "null") {
      setShowReferralLink(true);
    } else {
      window.location.href = "/sign-in";
    }
  };

  const handleCopy = () => {
    const referralURL = `${window.location.origin}/${fullName}`;
    navigator.clipboard.writeText(referralURL).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    }).catch(() => {
      setCopySuccess("Failed to copy!");
    });
  };

  return (
    <div className="transform scale-[1.3] origin-center relative max-w-5xl mx-auto bg-gradient-to-r from-main-bg via-[rgba(112,0,255,0.3)] to-[rgba(255,0,199,0.3)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 md:p-12 overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.35]">
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-[#7000FF] opacity-30 blur-[200px] rounded-full z-0" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-[#FF00C7] opacity-30 blur-[200px] rounded-full z-0" />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h3 className="font-raleway font-bold text-white text-4xl md:text-4xl text-text-title mb-4 tracking-wide transition-colors duration-300 hover:text-primary-accent">
            Earn Money While You Job Hunt!
          </h3>
          <p className="font-roboto text-base text-white md:text-lg text-text-body mb-6 max-w-md mx-auto md:mx-0">
            Refer a friend and earn $9 for every successful referral—no limit, just extra cash while you search!
          </p>
          <button
            onClick={handleStartClick}
            className="inline-block bg-[#0FAE96] bg-primary-accent text-pure-white font-raleway font-semibold text-base py-3 px-8 rounded-lg hover:bg-opacity-80 transition-transform duration-300 focus:ring-2 focus:ring-primary-accent focus:ring-opacity-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:bg-[#0FAE96]/80 transform transition duration-200 hover:scale-105 text-sm sm:text-base"
          >
            {isLogin !== null && isLogin !== "null" ? "Get Referral Link" : "Log In"}
          </button>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src={gift} alt="Gift box with confetti" width={256} height={256} className="object-contain transform transition-transform duration-500 hover:rotate-3" />
        </div>
      </div>
      {showReferralLink && (
        <div className="mt-6 transition-opacity duration-500 ease-in-out">
          <div className="max-w-md mx-auto px-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md">
              <input
                type="text"
                value={`${window.location.origin}/${fullName}`}
                readOnly
                className="w-full flex-grow bg-transparent text-white font-roboto text-xs sm:text-sm px-3 py-2 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0FAE96] transition"
              />
              <button
                onClick={handleCopy}
                className="inline-block whitespace-nowrap bg-[#0FAE96] text-white font-raleway font-medium text-sm px-4 py-2 rounded-md hover:bg-[#0FAE96]/80 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#0FAE96] focus:ring-opacity-50 hover:bg-[#0FAE96]/80 transform transition duration-200 hover:scale-105 text-sm sm:text-base"
              >
                Copy
              </button>
            </div>
            {copySuccess && <p className="text-green-400 text-center mt-2">{copySuccess}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralInvite;
