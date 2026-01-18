import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export type UserRole = "admin" | "faculty" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  profile?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  changePassword: (newPassword: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const handleSession = async (session: any) => {
      if (!mounted) return;

      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      await loadUserProfile(session.user);
    };

    // Initial session load
    supabase.auth.getSession().then(({ data }) => {
      handleSession(data.session);
    });

    // Auth listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      console.log("Auth user:", authUser.id);

      const role = (authUser.user_metadata?.role || "student") as UserRole;

      let profile: any = null;
      let name = authUser.user_metadata?.name || authUser.email;
      let department = undefined;

      // ============================
      // ===== STUDENT PROFILE ======
      // ============================
      if (role === "student") {
        const { data: student, error } = await supabase
          .from("students")
          .select("*")
          .eq("user_id", authUser.id)
          .maybeSingle();

        if (error) throw error;
        if (!student) throw new Error("Student profile not found");

        let section = null;
        let departmentRow = null;

        if (student.section_id) {
          const { data } = await supabase.from("sections").select("*").eq("id", student.section_id).single();
          section = data;
        }

        if (student.department_id) {
          const { data } = await supabase.from("departments").select("*").eq("id", student.department_id).single();
          departmentRow = data;
        }

        profile = {
          ...student,
          sections: section,
          departments: departmentRow,
        };

        name = student.name;
        department = departmentRow?.name;
      }

      // ============================
      // ===== FACULTY PROFILE ======
      // ============================
      if (role === "faculty") {
        const { data: faculty, error } = await supabase
          .from("faculty")
          .select("*")
          .eq("user_id", authUser.id)
          .maybeSingle();

        console.log("Faculty profile:", faculty);

        if (error) throw error;
        if (!faculty) throw new Error("Faculty profile not found");

        profile = faculty;
        name = faculty.name;
      }

      // ============================
      // ===== ADMIN PROFILE ========
      // ============================
      if (role === "admin") {
        profile = { role: "admin" };
        name = authUser.user_metadata?.name || "Admin";
      }

      setUser({
        id: authUser.id,
        email: authUser.email || "",
        role,
        name: name || "User",
        department,
        profile,
      });
    } catch (err) {
      console.error("Profile load error:", err);

      // FAIL SAFE: allow login even if profile missing
      setUser({
        id: authUser.id,
        email: authUser.email || "",
        role: (authUser.user_metadata?.role || "student") as UserRole,
        name: authUser.user_metadata?.name || "User",
        profile: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const userRole = data.user?.user_metadata?.role;
    if (userRole !== role) {
      await supabase.auth.signOut();
      throw new Error("Invalid role for this user");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const changePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        changePassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
