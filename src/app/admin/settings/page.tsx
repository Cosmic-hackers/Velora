"use client";

import React, { useState } from "react";
import { Settings, CheckCircle2 } from "lucide-react";
import { StoreService } from "@/lib/store";

export default function AdminSettingsPage() {
  const current = StoreService.getStoreSettings();

  const [storeName, setStoreName] = useState(current.storeName);
  const [tagline, setTagline] = useState(current.tagline);
  const [contactEmail, setContactEmail] = useState(current.contactEmail);
  const [contactPhone, setContactPhone] = useState(current.contactPhone);
  const [address, setAddress] = useState(current.address);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(current.freeShippingThreshold);
  const [defaultShippingCost, setDefaultShippingCost] = useState(current.defaultShippingCost);
  const [heroCampaignStyle, setHeroCampaignStyle] = useState<"campaign_diptych" | "editorial_split" | "campaign_portrait">(
    (current as any).heroCampaignStyle || "campaign_diptych"
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    StoreService.updateStoreSettings({
      storeName,
      tagline,
      contactEmail,
      contactPhone,
      address,
      freeShippingThreshold: Number(freeShippingThreshold),
      defaultShippingCost: Number(defaultShippingCost),
      heroCampaignStyle,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
          Configuration & Policies
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
          Maison Store Settings
        </h1>
        <p className="text-xs text-[#77716A] mt-1">
          Manage brand coordinates, threshold shipping policies, and official contact channels.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-[#EFE9DE] border border-[#9B8065] text-[#171717] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#9B8065]" />
          <span>Maison configuration successfully saved.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-6">
        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            Brand Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Maison Name
              </label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Official Tagline
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Active Homepage Hero Campaign
              </label>
              <select
                value={heroCampaignStyle}
                onChange={(e) => setHeroCampaignStyle(e.target.value as any)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              >
                <option value="campaign_diptych">
                  The Roth Trench Campaign — Full-Width Diptych (KHAITE Luxury Reference)
                </option>
                <option value="editorial_split">
                  The Signature Collection — Two-Column Editorial Split (Editorial Reference)
                </option>
                <option value="campaign_portrait">
                  Studio Campaign 04 — Close-Up Portrait & Silhouette (Campaign Reference)
                </option>
              </select>
              <p className="text-[10px] text-[#77716A] mt-1">
                Controls the active campaign presentation showcased to all clients on the homepage hero.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            Concierge Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Concierge Email
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Client Care Phone
              </label>
              <input
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Flagship Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            Courier & Shipping Policy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Complimentary Shipping Threshold (₹)
              </label>
              <input
                type="number"
                required
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Standard Shipping Cost (₹)
              </label>
              <input
                type="number"
                required
                value={defaultShippingCost}
                onChange={(e) => setDefaultShippingCost(Number(e.target.value))}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#DED8CF]">
          <button type="submit" className="btn-primary text-xs py-3.5 px-8">
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}

