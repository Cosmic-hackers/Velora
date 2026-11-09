"use client";

import React, { useState } from "react";
import { Mail, Download, CheckCircle2 } from "lucide-react";
import { StoreService } from "@/lib/store";

export default function AdminNewsletterPage() {
  const [subscribers] = useState<string[]>(StoreService.getNewsletterSubscribers());

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Email Address,Status,Subscribed Date"]
        .concat(subscribers.map((s) => `${s},Active,${new Date().toLocaleDateString()}`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `velora_newsletter_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Private Dispatches
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
            Gazette Subscribers ({subscribers.length})
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="btn-secondary text-xs py-2.5 px-6 flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Dossier</span>
        </button>
      </div>

      <div className="bg-[#FAF7F2] border border-[#DED8CF] overflow-hidden">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-[#DED8CF] bg-[#EFE9DE]/50 text-[#77716A] uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Patron Email Address</th>
              <th className="py-3 px-4">Subscription Status</th>
              <th className="py-3 px-4 text-right">Dispatch Frequency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DED8CF]/60 text-[#171717]">
            {subscribers.map((email, idx) => (
              <tr key={idx} className="hover:bg-white/60 transition-colors">
                <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#9B8065]" />
                  <span>{email}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold">
                    Subscribed
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right text-[#77716A]">
                  Seasonal Previews Only
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

