"use client";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import app, { auth } from "@/firebase/config";
import { toast } from "react-toastify";
import { getDatabase, get, ref, set } from "firebase/database";
import SignInwithGoogle from "../loginwithgoogle/page";
import PasswordReset from "../passwordreset/page";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const db = getDatabase(app);

  function notifyExtensionOnLogin(uid) {
    console.log("called");
    const event = new CustomEvent("userLoggedIn", { detail: { uid } });
    document.dispatchEvent(event);
  }

  useEffect(() => {
    const checkAuthState = async () => {
      const uid = localStorage.getItem("UID");
      const apiKey = localStorage.getItem("api_key");
      const isLogin = localStorage.getItem("IsLogin");
      const subscriptionType = localStorage.getItem("SubscriptionType");

      console.log("Checking login state:", { uid, isLogin, apiKey, subscriptionType });

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await notifyExtensionOnLogin(user.uid);
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Ensure Firebase initializes
      const user = auth.currentUser;

      if (user && isLogin === "true") {
        if (!user.emailVerified) {
          toast.error("Email not verified. Please verify before logging in.", {
            position: "bottom-center",
          });
          return;
        }

        if (apiKey !== "null" && apiKey !== null) {
          if (subscriptionType === "FreeTrialStarted" || subscriptionType === "Premium") {
            window.location.href = "/home";
          } else {
            window.location.href = "/resume2";
          }
        } else {
          window.location.href = "/gemini";
        }
      }
    };

    checkAuthState();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      if (user && user.emailVerified) {
        localStorage.setItem("UID", user.uid);
        localStorage.setItem("IsLogin", "true");
        if (user.displayName) {
          localStorage.setItem("UserName", user.displayName);
        }

        notifyExtensionOnLogin(user.uid);


        const getReferralCodeFromCookie = () => {
          const cookie = document.cookie.split('; ').find(row => row.startsWith('referral='));
          return cookie ? cookie.split('=')[1] : null;
        };
        const referralCode = getReferralCodeFromCookie()
        console.log(referralCode, "code", typeof (referralCode))
        //** SAVE REFERAL CODE IN DATABASE  */
        const currentDate = new Date();
        const formattedDateTime = currentDate.toISOString().replace("T", " ").split(".")[0];
        let currentUser = auth?.currentUser?.uid;

        if (referralCode) {
          console.log("Save in database/firebase")
          const newDocRef = ref(db, `/referrals/${referralCode}/${currentUser}`);
          console.log(newDocRef, typeof (newDocRef), "referrals");
          get(newDocRef).then((snapshot) => {
            if (!snapshot.exists()) {
              // If the referral code doesn't exist, create a new entry
              set(newDocRef, {
                signupDate: formattedDateTime,
                amount: 0,
              }).then(() => {

              })
            }
          })
        }

        toast.success("User logged in Successfully", { position: "top-center" });

        const subscriptionRef = ref(db, `user/${user.uid}/Payment/SubscriptionType`);
        const subscriptionSnapshot = await get(subscriptionRef);
        const subscriptionType = subscriptionSnapshot.val();
        localStorage.setItem("SubscriptionType", subscriptionType);

        const apiRef1 = ref(db, `user/${user.uid}/API/apiKey`);
        const apiRef2 = ref(db, `user/${user.uid}/API/apikey`);
        const apiSnapshot1 = await get(apiRef1);
        const apiSnapshot2 = await get(apiRef2);

        let apiKey = "";
        apiSnapshot1.exists() ? (apiKey = apiSnapshot1.val()) : (apiKey = apiSnapshot2.val());
        localStorage.setItem("api_key", apiKey);

        if (apiKey) {
          if (subscriptionType === "FreeTrialStarted" || subscriptionType === "Premium") {
            window.location.href = "/home";
          } else {
            window.location.href = "/resume2";
          }
        } else {
          window.location.href = "/gemini";
        }
      } else {
        toast.error("Email is not verified. Please verify your email and try again!", { position: "bottom-center" });
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#11011E] via-[#35013E] to-[#11011E] p-6">
      <div className="w-full max-w-md p-8 bg-[rgba(255,255,255,0.05)] rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.1)]">
        <h1 className="text-2xl font-raleway font-semibold mb-6 text-center animate-slideDown text-[#ECF1F0]">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full p-3 border border-gray-600 rounded-lg bg-[#1A1A2E] text-white focus:ring-2 focus:ring-[#0FAE96]"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full p-3 border border-gray-600 rounded-lg bg-[#1A1A2E] text-white focus:ring-2 focus:ring-[#0FAE96]"
          />
          <div className="text-right">
            <a href="/passwordreset" className="text-[#0FAE96] hover:text-[#FF00C7] transition-colors duration-200">Forgot password?</a>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#0FAE96] text-white p-3 rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-105">
            {loading ? "Signing in..." : "Sign in"}
          </button>
          
          {/* Centered Google Sign-In Button */}
          <div className="flex justify-center">
          {/* <p className="text-sm text-[#B6B6B6]">Or continue with</p><br></br> */}
            <SignInwithGoogle />
          </div>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Don&apos;t have an account? <a href="/sign-up" className="text-[#0FAE96] hover:text-[#FF00C7] transition-colors duration-200">Sign up</a>
        </p>
      </div>
    </main>
  );
}

export default Login;
