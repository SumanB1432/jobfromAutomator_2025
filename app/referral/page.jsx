"use client";
import React, { useEffect, useState } from "react";
import app from "@/firebase/config";
import { getDatabase, ref, get } from "firebase/database";
import ReferralInvite from '@/components/referal/referralinvite';
import ReferralStats from '@/components/referal/referralstats';
import ReferralBenefit from '@/components/referal/referralbenefit';


const Referral = ({ params }) => {
  const [isLogin, setIsLogin] = useState(null);
  const [fullName, setFullName] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const db = getDatabase(app);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const loginStatus = localStorage.getItem("IsLogin");
//       setIsLogin(loginStatus);

//       const userId = localStorage.getItem("UID");
//       if (userId) {
//         const findUser = ref(db, `user/${userId}`);
//         get(findUser).then((snapshot) => {
//           let Name = snapshot.val()?.name;
//           let fname = snapshot.val()?.fname;
//           let lname = snapshot.val()?.lname;
//           let user = Name || `${fname} ${lname}`;
//           setFullName(user.replace(/\s/g, ""));
//         });
//       }
//     };

//     fetchUserData();
//   }, []);

//   const copyToClipboard = () => {
//     const referralURL = `${window.location.origin}/${fullName}`;
//     navigator.clipboard
//       .writeText(referralURL)
//       .then(() => {
//         setCopySuccess("Copied!");
//         setTimeout(() => setCopySuccess(""), 2000);
//       })
//       .catch(() => {
//         setCopySuccess("Failed to copy!");
//       });
//   };

  return (
<section className="py-16 px-24 bg-card-bg  rounded-2xl my-16 mx-24">
  <ReferralInvite />
  <div className="my-8 mb-16"></div>
  <ReferralBenefit />
  <div className="my-8"></div>
  <ReferralStats />
</section>
  );
};

export default Referral;
