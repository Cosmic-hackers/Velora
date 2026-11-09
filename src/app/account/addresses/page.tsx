"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Plus, Trash2, CheckCircle2, ArrowLeft } from "lucide-react";
import { useAuth, Address } from "@/context/AuthContext";

export default function AccountAddressesPage() {
  const { addresses, addAddress, removeAddress, setDefaultAddress } = useAuth();

  const [isAdding, setIsAdding] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [apartmentSuite, setApartmentSuite] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [postalCode, setPostalCode] = useState("400018");
  const [country, setCountry] = useState("India");
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine || !city || !postalCode) return;

    await addAddress({
      fullName,
      phone,
      addressLine,
      apartmentSuite,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    setIsAdding(false);
    setFullName("");
    setPhone("");
    setAddressLine("");
    setApartmentSuite("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="border-b border-[#DED8CF] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Link
            href="/account"
            className="text-xs uppercase tracking-widest text-[#9B8065] hover:text-[#171717] inline-flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
          </Link>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717]">
            Saved Delivery Addresses ({addresses.length})
          </h1>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isAdding ? "Cancel" : "Add New Address"}</span>
        </button>
      </div>

      {/* Add New Address Form Modal / Box */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-4 animate-fadeIn"
        >
          <h3 className="font-editorial text-xl text-[#171717]">Add Delivery Destination</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Recipient Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Elena Rostova"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Address Line *
              </label>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="Apt 14B, Oberoi Sky Heights, Worli"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Apartment / Floor (Optional)
              </label>
              <input
                type="text"
                value={apartmentSuite}
                onChange={(e) => setApartmentSuite(e.target.value)}
                placeholder="Floor 14, East Wing"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Mumbai"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                State *
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Maharashtra"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Postal Code *
              </label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="400018"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Country
              </label>
              <input
                type="text"
                disabled
                value={country}
                className="w-full bg-[#EFE9DE] border border-[#DED8CF] p-2.5 text-xs text-[#77716A]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="accent-[#171717]"
            />
            <label htmlFor="isDefault" className="text-xs text-[#171717] cursor-pointer">
              Set as primary destination for one-click checkout
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs uppercase tracking-wider text-[#77716A]"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs py-2 px-6">
              Save Address
            </button>
          </div>
        </form>
      )}

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-6 bg-[#FAF7F2] border space-y-4 relative ${
              addr.isDefault ? "border-[#171717] ring-1 ring-[#171717]" : "border-[#DED8CF]"
            }`}
          >
            {addr.isDefault && (
              <span className="inline-block bg-[#171717] text-white text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-medium">
                Primary Destination
              </span>
            )}

            <div className="text-xs text-[#77716A] space-y-1 leading-relaxed">
              <p className="font-semibold text-sm text-[#171717]">{addr.fullName}</p>
              <p>{addr.addressLine}</p>
              {addr.apartmentSuite && <p>{addr.apartmentSuite}</p>}
              <p>
                {addr.city}, {addr.state} {addr.postalCode}
              </p>
              <p>{addr.country}</p>
              <p className="pt-1 text-[#171717]">Tel: {addr.phone}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#DED8CF]/80 text-xs">
              {!addr.isDefault ? (
                <button
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-[#9B8065] hover:underline uppercase tracking-wider text-[11px] font-medium"
                >
                  Make Primary
                </button>
              ) : (
                <span className="text-[11px] text-[#9B8065] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Primary
                </span>
              )}

              <button
                onClick={() => removeAddress(addr.id)}
                className="text-red-700 hover:text-red-900 p-1 transition-colors"
                title="Delete address"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

