"use client";

import React, { useState } from "react";
import { X, Ruler, Sparkles } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender?: "men" | "women" | "unisex";
}

export function SizeGuideModal({ isOpen, onClose, gender = "women" }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [activeTab, setActiveTab] = useState<"women" | "men">(gender === "men" ? "men" : "women");

  if (!isOpen) return null;

  const womenData = [
    { size: "XS", it: "38", uk: "6", us: "2", bustCm: "80-84", waistCm: "60-64", hipsCm: "86-90", bustIn: "31-33", waistIn: "24-25", hipsIn: "34-35" },
    { size: "S", it: "40", uk: "8", us: "4", bustCm: "84-88", waistCm: "64-68", hipsCm: "90-94", bustIn: "33-35", waistIn: "25-27", hipsIn: "35-37" },
    { size: "M", it: "42", uk: "10", us: "6", bustCm: "88-92", waistCm: "68-72", hipsCm: "94-98", bustIn: "35-36", waistIn: "27-28", hipsIn: "37-39" },
    { size: "L", it: "44", uk: "12", us: "8", bustCm: "92-96", waistCm: "72-76", hipsCm: "98-102", bustIn: "36-38", waistIn: "28-30", hipsIn: "39-40" },
    { size: "XL", it: "46", uk: "14", us: "10", bustCm: "96-102", waistCm: "76-82", hipsCm: "102-108", bustIn: "38-40", waistIn: "30-32", hipsIn: "40-42" },
  ];

  const menData = [
    { size: "S", it: "46", uk: "36", us: "36", chestCm: "92-96", waistCm: "78-82", neckCm: "38", chestIn: "36-38", waistIn: "31-32", neckIn: "15" },
    { size: "M", it: "48", uk: "38", us: "38", chestCm: "96-100", waistCm: "82-86", neckCm: "39", chestIn: "38-39", waistIn: "32-34", neckIn: "15.5" },
    { size: "L", it: "50", uk: "40", us: "40", chestCm: "100-104", waistCm: "86-90", neckCm: "41", chestIn: "39-41", waistIn: "34-35", neckIn: "16" },
    { size: "XL", it: "52", uk: "42", us: "42", chestCm: "104-108", waistCm: "90-94", neckCm: "42", chestIn: "41-43", waistIn: "35-37", neckIn: "16.5" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#E9E6E0] shadow-2xl p-6 sm:p-10 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#E9E6E0]">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#77736E]">
              <Ruler className="w-3.5 h-3.5 text-[#A18A70]" />
              <span>ATELIER SIZING CONVERSION</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal mt-1">
              Garment Dimensions & Fit
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#171717] hover:opacity-60 transition-opacity"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {/* Tab Controls: Gender & Metric/Imperial Units */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-b border-[#E9E6E0]">
          {/* Department toggle */}
          <div className="inline-flex border border-[#E9E6E0] p-1 bg-white text-xs uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("women")}
              className={`px-4 py-1.5 transition-all ${
                activeTab === "women" ? "bg-[#171717] text-white font-medium" : "text-[#77736E] hover:text-[#171717]"
              }`}
            >
              WOMEN&apos;S SIZING
            </button>
            <button
              onClick={() => setActiveTab("men")}
              className={`px-4 py-1.5 transition-all ${
                activeTab === "men" ? "bg-[#171717] text-white font-medium" : "text-[#77736E] hover:text-[#171717]"
              }`}
            >
              MEN&apos;S SIZING
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="inline-flex items-center gap-1.5 text-xs text-[#77736E]">
            <span className="text-[10px] uppercase tracking-wider">Unit:</span>
            <div className="inline-flex border border-[#E9E6E0] p-0.5 bg-white text-[11px] font-mono">
              <button
                onClick={() => setUnit("cm")}
                className={`px-2.5 py-1 ${unit === "cm" ? "bg-[#171717] text-white" : "text-[#77736E]"}`}
              >
                CM
              </button>
              <button
                onClick={() => setUnit("in")}
                className={`px-2.5 py-1 ${unit === "in" ? "bg-[#171717] text-white" : "text-[#77736E]"}`}
              >
                INCHES
              </button>
            </div>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="py-6 overflow-x-auto">
          {activeTab === "women" ? (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E9E6E0] text-[10px] uppercase tracking-[0.2em] text-[#77736E]">
                  <th className="py-2.5 font-medium">Size</th>
                  <th className="py-2.5 font-medium">IT</th>
                  <th className="py-2.5 font-medium">UK</th>
                  <th className="py-2.5 font-medium">US</th>
                  <th className="py-2.5 font-medium">Bust ({unit})</th>
                  <th className="py-2.5 font-medium">Waist ({unit})</th>
                  <th className="py-2.5 font-medium">Hips ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E6E0]/60 font-mono text-[11px] text-[#171717]">
                {womenData.map((row) => (
                  <tr key={row.size} className="hover:bg-white/80 transition-colors">
                    <td className="py-3 font-semibold font-sans">{row.size}</td>
                    <td className="py-3 text-[#77736E]">{row.it}</td>
                    <td className="py-3 text-[#77736E]">{row.uk}</td>
                    <td className="py-3 text-[#77736E]">{row.us}</td>
                    <td className="py-3">{unit === "cm" ? row.bustCm : row.bustIn}</td>
                    <td className="py-3">{unit === "cm" ? row.waistCm : row.waistIn}</td>
                    <td className="py-3">{unit === "cm" ? row.hipsCm : row.hipsIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E9E6E0] text-[10px] uppercase tracking-[0.2em] text-[#77736E]">
                  <th className="py-2.5 font-medium">Size</th>
                  <th className="py-2.5 font-medium">IT</th>
                  <th className="py-2.5 font-medium">UK/US</th>
                  <th className="py-2.5 font-medium">Chest ({unit})</th>
                  <th className="py-2.5 font-medium">Waist ({unit})</th>
                  <th className="py-2.5 font-medium">Neck ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E6E0]/60 font-mono text-[11px] text-[#171717]">
                {menData.map((row) => (
                  <tr key={row.size} className="hover:bg-white/80 transition-colors">
                    <td className="py-3 font-semibold font-sans">{row.size}</td>
                    <td className="py-3 text-[#77736E]">{row.it}</td>
                    <td className="py-3 text-[#77736E]">{row.uk}</td>
                    <td className="py-3">{unit === "cm" ? row.chestCm : row.chestIn}</td>
                    <td className="py-3">{unit === "cm" ? row.waistCm : row.waistIn}</td>
                    <td className="py-3">{unit === "cm" ? row.neckCm : row.neckIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Measuring Advice Note */}
        <div className="p-4 bg-white border border-[#E9E6E0] text-xs text-[#77736E] space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#171717] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#A18A70]" />
            <span>Atelier Fit Guidance</span>
          </div>
          <p className="font-light leading-relaxed">
            Our pieces are cut for an architectural drape. If between sizes or seeking an oversized editorial aesthetic, we recommend selecting your larger size. Complimentary styling concierge is available at <span className="text-[#171717] underline">concierge@velora-couture.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

