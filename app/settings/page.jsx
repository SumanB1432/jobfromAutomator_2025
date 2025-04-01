"use client";
import React, { useState } from "react";
import { auth } from "@/firebase/config";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import "./settings.css";

const Settings = function () {
    let user = auth.currentUser;
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function updateKey() {
        window.location.href = "/updategemini";
    }

    async function updateData() {
        window.location.href = "/updateresume";
    }

    async function deleteAccount() {
        window.location.href = "/deleteaccount";
    }

    async function handleLogout() {
        try {
            await auth.signOut();
            localStorage.clear();
            window.location.href = "/sign-in";
            function notifyExtensionOnLogout() {
                const event = new CustomEvent("onLogout");
                document.dispatchEvent(event);
            }
            notifyExtensionOnLogout();
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    return (
        <div className="min-h-screen text-white relative text-lg">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0  bg-gradient-to-b from-[#11011E] via-[#35013e] to-[#11011E] opacity-60"></div>
            </div>

            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-2xl rounded-3xl shadow-lg border p-8">
                    <h1 className="text-center text-3xl font-bold text-[#0FAE96] mb-8">Settings</h1>
                    <div className="space-y-6">
                        {[{ label: "Update Gemini Key", action: updateKey },
                          { label: "Update Data", action: updateData },
                          { label: "Delete Account", action: () => setIsModalOpen(true), color: "bg-red-600" },
                          { label: "Logout", action: handleLogout }].map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-[rgba(255,255,255,0.1)] rounded-2xl px-6 py-4 shadow-md">
                                <span className="text-white font-semibold">{item.label}</span>
                                <button
                                    className={`${item.color || "bg-gradient-to-r from-[#0FAE96] to-[#7000FF]"} text-white font-semibold text-lg px-6 py-2 rounded-xl shadow-md hover:scale-105 transition-all`}
                                    onClick={item.action}
                                >
                                    {item.label}
                                </button>
                            </div>
                        ))}
                    </div>
                    {isModalOpen && <DeleteAccountModal onClose={() => setIsModalOpen(false)} />}
                </div>
            </div>
        </div>
    );
}

export default Settings;
