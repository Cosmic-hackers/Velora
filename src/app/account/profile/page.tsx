"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AccountProfilePage() {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await updateProfile({
      fullName,
      phone,
    });

    setSavedMessage("Your profile information has been successfully updated.");
    setTimeout(() => setSavedMessage(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div>
        <Link
          href="/account"
          className="text-xs uppercase tracking-widest text-[#9B8065] hover:text-[#171717] inline-flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
        </Link>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717]">
          Personal Dossier & Profile
        </h1>
        <p className="text-xs text-[#77716A] mt-1">
          Manage your personal details, contact coordinates, and authentication preferences.
        </p>
      </div>

      {savedMessage && (
        <div className="p-4 bg-[#EFE9DE] border border-[#9B8065] text-[#171717] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#9B8065]" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
            Email Address (Primary Login)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full bg-[#EFE9DE] border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#77716A] cursor-not-allowed"
            />
          </div>
          <span className="text-[10px] text-[#77716A] mt-1 block">
            To alter your email address, contact the Maison Concierge for identity verification.
          </span>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center">
          <Link
            href="/forgot-password"
            className="text-xs uppercase tracking-wider text-[#9B8065] hover:underline"
          >
            Update Password →
          </Link>
          <button type="submit" className="btn-primary text-xs py-3 px-8">
            Save Modifications
          </button>
        </div>
      </form>
    </div>
  );
}

