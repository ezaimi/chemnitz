"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosConfig";
import { User } from "@/types/User";

import Header from "@/components/general/Header";
import { fetchCurrentUser } from "@/api/userApi";

// Test credentials (must exist in your DB!)
const TEST_EMAIL = "john@example.com";
const TEST_PASSWORD = "john123"; // Replace with a real test password

export default function TestCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  // Helper: Log in with test credentials
  // const autoLogin = async () => {
  //   setError("");
  //   try {
  //     await axiosInstance.post("/auth/login", {
  //       email: TEST_EMAIL,
  //       password: TEST_PASSWORD,
  //     }, { withCredentials: true });
  //   } catch (e: any) {
  //     setError(
  //       e?.response?.data?.message ||
  //         e.message ||
  //         "Login failed (check test credentials!)"
  //     );
  //   }
  // };

  // Helper: Fetch user info
  // const loadUser = async () => {
  //   setError("");
  //   setUser(null);
  //   try {
  //     const u = await fetchCurrentUser();
  //     setUser(u);
  //   } catch (e: any) {
  //     setError(
  //       e?.response?.data?.message || e.message || "Failed to fetch user"
  //     );
  //   }
  // };

  // Helper: Log out
  const logout = async () => {
    setError("");
    setUser(null);
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    } catch (e: any) {
      setError(
        e?.response?.data?.message || e.message || "Failed to log out"
      );
    }
  };

  // On mount: try login, then fetch user
  // useEffect(() => {
  //   (async () => {
  //     await autoLogin();
  //     await loadUser();
  //   })();
  //   // eslint-disable-next-line
  // }, []);

   useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);


  return (
    <div className="p-4 max-w-lg mx-auto">
      <h3 className="font-bold text-lg mb-2">Logged in User (Test)</h3>
      {error && <div className="text-red-500 p-2">{error}</div>}

      {user ? (
        <div className="bg-white rounded p-4 shadow mb-4">
          <span className="font-bold">{user.name || "No name"}</span>
          <span className="ml-2 text-gray-500">{user.email}</span>
          <div className="text-xs text-gray-400 mt-2">
            Role: {user.role || "user"}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-900"
            onClick={async () => {
              await logout();
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="p-2">Loading user...</div>
      )}

      <div className="mt-4">
        <label className="font-semibold text-sm text-gray-700 mb-1 block">
          Raw user object:
        </label>
        <textarea
          className="w-full h-40 bg-gray-100 rounded p-2 text-xs font-mono"
          value={user ? JSON.stringify(user, null, 2) : ""}
          readOnly
        />
      </div>
    </div>
  );
}
