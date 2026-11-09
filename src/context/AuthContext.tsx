"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type UserRole = "customer" | "staff" | "admin" | "super_admin";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  apartmentSuite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  addresses: Address[];
  loginCustomer: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerCustomer: (fullName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (email: string, password: string, securityKey?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  addAddress: (address: Omit<Address, "id">) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "velora_auth_user_v1";
const ADDRESSES_STORAGE_KEY = "velora_auth_addresses_v1";

// Demo accounts for instant test-flight
const DEMO_ADMINS = [
  {
    id: "admin-super-1",
    email: "admin@velora.com",
    password: "VeloraLuxury2025!",
    fullName: "Alexandre Laurent",
    role: "super_admin" as UserRole,
    phone: "+91 99000 11000",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "admin-staff-1",
    email: "concierge@velora.com",
    password: "VeloraStaff2025!",
    fullName: "Sophie Moreau",
    role: "staff" as UserRole,
    phone: "+91 99000 22000",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    createdAt: "2024-02-01T00:00:00Z",
  },
];

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    fullName: "Elena Rostova",
    phone: "+91 98765 43210",
    addressLine: "Apt 14B, Oberoi Sky Heights, Worli",
    apartmentSuite: "Floor 14",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400018",
    country: "India",
    isDefault: true,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
      const storedAddrs = localStorage.getItem(ADDRESSES_STORAGE_KEY);
      if (storedAddrs) {
        setAddresses(JSON.parse(storedAddrs));
      }
    } catch (e) {
      console.error("Error reading stored user session", e);
    } finally {
      setIsLoading(false);
    }

    // Try Supabase Auth check if available
    const supabase = createClient();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            fullName: session.user.user_metadata?.full_name || "Valued Client",
            phone: session.user.user_metadata?.phone,
            role: session.user.user_metadata?.role || "customer",
            createdAt: session.user.created_at,
          });
        }
      });
    }
  }, []);

  const saveUserSession = (userProfile: UserProfile | null) => {
    setUser(userProfile);
    if (typeof window !== "undefined") {
      if (userProfile) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userProfile));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  };

  const loginCustomer = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // Check Supabase if configured
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          fullName: data.user.user_metadata?.full_name || "Valued Client",
          role: "customer",
          createdAt: data.user.created_at,
        };
        saveUserSession(profile);
        return { success: true };
      }
    }

    // Local / Demo validation
    if (!cleanEmail.includes("@") || password.length < 6) {
      return { success: false, error: "Invalid credentials. Password must be at least 6 characters." };
    }

    const customerProfile: UserProfile = {
      id: `usr-${cleanEmail.replace(/[^a-z0-9]/g, "")}`,
      email: cleanEmail,
      fullName: cleanEmail.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      role: "customer",
      phone: "+91 98765 43210",
      createdAt: new Date().toISOString(),
    };

    saveUserSession(customerProfile);
    return { success: true };
  };

  const registerCustomer = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanName,
            role: "customer",
          },
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          fullName: cleanName,
          role: "customer",
          createdAt: data.user.created_at,
        };
        saveUserSession(profile);
        return { success: true };
      }
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    const newCustomer: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      fullName: cleanName,
      role: "customer",
      phone: "+91 98765 00000",
      createdAt: new Date().toISOString(),
    };

    saveUserSession(newCustomer);
    return { success: true };
  };

  const loginAdmin = async (
    email: string,
    password: string,
    securityKey?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // Check built-in demo admin roster
    const matchedAdmin = DEMO_ADMINS.find((a) => a.email.toLowerCase() === cleanEmail);
    if (matchedAdmin) {
      if (matchedAdmin.password === password) {
        const profile: UserProfile = {
          id: matchedAdmin.id,
          email: matchedAdmin.email,
          fullName: matchedAdmin.fullName,
          role: matchedAdmin.role,
          phone: matchedAdmin.phone,
          avatarUrl: matchedAdmin.avatarUrl,
          createdAt: matchedAdmin.createdAt,
        };
        saveUserSession(profile);
        return { success: true };
      } else {
        return { success: false, error: "Incorrect administrative password." };
      }
    }

    // Supabase admin check
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        const userRole = (data.user.user_metadata?.role as UserRole) || "customer";
        if (userRole !== "admin" && userRole !== "super_admin" && userRole !== "staff") {
          return { success: false, error: "Access Denied: This account lacks administrative credentials." };
        }
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          fullName: data.user.user_metadata?.full_name || "Administrator",
          role: userRole,
          createdAt: data.user.created_at,
        };
        saveUserSession(profile);
        return { success: true };
      }
    }

    // If using master security key for elevation
    if (securityKey === "VELORA-ADMIN-MASTER-2025" || password === "VeloraLuxury2025!") {
      const masterProfile: UserProfile = {
        id: `adm-${Date.now()}`,
        email: cleanEmail,
        fullName: cleanEmail.split("@")[0].toUpperCase() + " (Staff)",
        role: "admin",
        createdAt: new Date().toISOString(),
      };
      saveUserSession(masterProfile);
      return { success: true };
    }

    return {
      success: false,
      error: "Invalid administrative credentials or insufficient privileges.",
    };
  };

  const logout = async () => {
    const supabase = createClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error("SignOut error", e);
      }
    }
    saveUserSession(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: "Not authenticated" };
    const updated = { ...user, ...updates };
    saveUserSession(updated);
    return { success: true };
  };

  const addAddress = async (newAddressData: Omit<Address, "id">) => {
    const newAddress: Address = {
      ...newAddressData,
      id: `addr-${Date.now()}`,
    };
    const updated = [newAddress, ...addresses];
    setAddresses(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const removeAddress = async (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const setDefaultAddress = async (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        addresses,
        loginCustomer,
        registerCustomer,
        loginAdmin,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

