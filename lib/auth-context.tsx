"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
  isActive: string;
}

interface AuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
  ) => Promise<boolean | undefined>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth from localStorage
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const adminRes = await axios.get(
          BEendpoints.check_admin_user_auth_status,
          {
            withCredentials: true,
          },
        );

        //check admin user
        if (!adminRes.data.ok) {
          setAdminUser(null);
        } else {
          setAdminUser(adminRes.data.data);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    };
    const checkAuth = async () => {
      try {
        const res = await axios.get(BEendpoints.check_user_auth_status, {
          withCredentials: true,
        });

        //check user
        if (!res.data.ok) {
          setUser(null);
        } else {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    checkAdminAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        BEendpoints.login_user,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      const { data: userData, message, ok } = response.data;

      if (!ok) {
        throw new Error(message || "Login failed");
      }

      setUser(userData);
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        BEendpoints.login_admin_user,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      const { data: userData, message, ok } = response.data;

      if (!ok) {
        throw new Error(message || "Login failed");
      }

      setAdminUser(userData);
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
  ) => {
    try {
      setLoading(true);
      const res = await axios.post(
        BEendpoints.register_user,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        { withCredentials: true },
      );

      if (res.data.ok) {
        setUser(res.data.data);
        toast.success(res.data.message || "Account created successfully");
        return true;
      } else throw new Error("Unable to create account");
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const res = await axios.get(BEendpoints.logout, { withCredentials: true });
    if (res.data.ok) {
      setUser(null);
      toast.success(res.data.message || "Logged out successfully");
      router.push("/");
    } else {
      toast.error("Logout failed");
    }
  };

  const updateUser = (newUser: User) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const value: AuthContextType = {
    user,
    adminUser,
    loading,
    isAuthenticated: !!user,
    login,
    adminLogin,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
