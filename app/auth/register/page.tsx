"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  EyeClosed,
  Eye,
} from "lucide-react";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const { register, isAuthenticated, loading } = useAuth();

  // Redirect if already logged in

  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  console.log(BEendpoints);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const res = await register(email, password, name);
      if (res) router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Register with GR-Tech
          </h1>
          <p className="text-zinc-400">
            Create your account and start saving with solar
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-8 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-amber-400/60" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:border-amber-400/50 focus:outline-none transition-colors text-white placeholder-zinc-500"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-amber-400/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:border-amber-400/50 focus:outline-none transition-colors text-white placeholder-zinc-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-amber-400/60" />
                <input
                  id="password"
                  type={passwordVisible.password ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:border-amber-400/50 focus:outline-none transition-colors text-white placeholder-zinc-500"
                  required
                />

                <div className="absolute right-3 top-3.5 w-5 h-5 text-amber-400/60">
                  {passwordVisible.password ? (
                    <span
                      onClick={() =>
                        setPasswordVisible((prev) => ({
                          ...prev,
                          password: false,
                        }))
                      }
                    >
                      <EyeClosed className="w-5 h-5" />
                    </span>
                  ) : (
                    <span
                      onClick={() =>
                        setPasswordVisible((prev) => ({
                          ...prev,
                          password: true,
                        }))
                      }
                    >
                      <Eye className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                At least 8 characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-amber-400/60" />
                <input
                  id="confirmPassword"
                  type={passwordVisible.confirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:border-amber-400/50 focus:outline-none transition-colors text-white placeholder-zinc-500"
                  required
                />
                <div className="absolute right-3 top-3.5 w-5 h-5 text-amber-400/60">
                  {passwordVisible.confirmPassword ? (
                    <span
                      onClick={() =>
                        setPasswordVisible((prev) => ({
                          ...prev,
                          confirmPassword: false,
                        }))
                      }
                    >
                      <EyeClosed className="w-5 h-5" />
                    </span>
                  ) : (
                    <span
                      onClick={() =>
                        setPasswordVisible((prev) => ({
                          ...prev,
                          confirmPassword: true,
                        }))
                      }
                    >
                      <Eye className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-zinc-700/30"></div>
            <span className="text-xs text-zinc-500">or</span>
            <div className="flex-1 h-px bg-zinc-700/30"></div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-400">
              Access exclusive solar products
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-400">
              Track your orders and installations
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-400">
              Get personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
