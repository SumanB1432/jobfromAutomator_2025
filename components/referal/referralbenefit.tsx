import React from 'react';
import Image from 'next/image';
import Money from '@/public/images/money.png'; // Replace with your actual image path

const ReferralBenefit = () => {
  return (
    <section className="relative bg-[#11011E] px-6 md:px-[90px] py-[60px] text-white text-center max-w-[1440px] mx-auto overflow-hidden">
      {/* Top Badge */}
      <div className="flex justify-center mb-4">
        <span className="bg-[#14303C] text-[#3EE2A8] text-xs font-semibold px-4 py-1 rounded-full">
          ● Why join our program?
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-[28px] md:text-[32px] font-raleway font-bold leading-snug mb-4">
        Get paid to share Job Form Automator
      </h2>

      {/* Subtext */}
      <p className="text-sm md:text-base text-[#B6B6B6] font-roboto max-w-2xl mx-auto mb-10 leading-relaxed">
        For every user you refer, receive a $9 commission after they successfully automate their first job application. Plus, your referrals will benefit from 7 days of auto-applying to 20 jobs daily.
      </p>

      {/* Reward Card */}
      <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl max-w-[280px] mx-auto p-6 shadow-lg">
        <div className="flex justify-center mb-6">
          <Image src={Money} alt="Coins Reward" width={120} height={120} />
        </div>
        <div className="text-[40px] font-bold font-raleway text-white leading-none mb-2">$9</div>
        <div className="text-sm font-roboto text-[#B6B6B6]">Per Referral</div>
      </div>

      {/* Background Blur */}
      <div className="absolute bottom-[-200px] left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-[#7000FF] opacity-20 blur-[200px] rounded-full z-0" />
    </section>
  );
};

export default ReferralBenefit;
