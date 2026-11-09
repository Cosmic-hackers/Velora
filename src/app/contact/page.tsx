"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Private Styling Inquiry");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFullName("");
      setEmail("");
      setMessage("");
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Client Care & Appointments
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal">
          The Personal Concierge
        </h1>
        <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
          Whether inquiring about custom proportions, private appointments, or consignment tracking,
          our dedicated concierge team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & Coordinates */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-6">
            <h3 className="font-editorial text-2xl text-[#171717]">Maison Flagships</h3>

            <div className="space-y-4 text-xs text-[#77716A]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9B8065] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#171717]">VELORA Maison Worli</p>
                  <p>14 Rue Royale & High Street Phoenix, Worli, Mumbai 400013</p>
                  <p className="text-[11px] text-[#9B8065] mt-0.5">By Private Appointment Only</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#9B8065] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#171717]">Direct Concierge Correspondence</p>
                  <p>concierge@velora-couture.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#9B8065] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#171717]">Client Care Hotline</p>
                  <p>+91 (0) 22 8490 2200 / +91 99000 11000</p>
                  <p className="text-[11px] text-[#77716A] mt-0.5">Mon – Sat, 10:00 – 19:00 IST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#EFE9DE] border border-[#DED8CF] text-xs space-y-2">
            <h4 className="font-editorial text-base text-[#171717]">Bespoke Alterations</h4>
            <p className="text-[#77716A] leading-relaxed">
              Every VELORA suit jacket and trouser includes complimentary custom tailoring through our
              master tailors in Mumbai, Bengaluru and New Delhi.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-8 sm:p-10 border border-[#DED8CF]">
          {isSent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#9B8065] mx-auto stroke-[1.5]" />
              <h3 className="font-editorial text-2xl text-[#171717]">Dossier Received</h3>
              <p className="text-xs text-[#77716A] max-w-sm mx-auto leading-relaxed">
                Thank you, {fullName}. Our styling concierge will review your dispatch and respond within four business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-editorial text-2xl text-[#171717]">Inquire with Concierge</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Julian Sterling"
                    className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="julian@example.com"
                    className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Nature of Inquiry
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                >
                  <option value="Private Styling Inquiry">Private Styling & Fit Guidance</option>
                  <option value="Order Consignment Assistance">Order Consignment & Courier Tracking</option>
                  <option value="Bespoke Tailoring Request">Bespoke Tailoring & Alteration Service</option>
                  <option value="Press & Archival Acquisitions">Press & Editorial Loan Requests</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Message & Notes *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding your sizing, order code, or preferred appointment date..."
                  className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-xs flex items-center justify-center gap-2"
              >
                <span>Dispatch to Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

