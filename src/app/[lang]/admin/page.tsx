"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import dynamic from "next/dynamic";

const AdminArticles = dynamic(() => import("./AdminArticles"), { ssr: false });

export default function AdminArticlesWrapper() {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState<{ code: string; token: string } | null>(null);
  const [cookies] = useCookies(["auth"]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingAuth(true);
      const authCookie = cookies.auth;
      if (!authCookie) {
        console.log("No auth cookie");
        setLoadingAuth(false);
        return;
      }

      const params = new URLSearchParams(authCookie);
      const token = params.get("token") || "";
      if (!token) {
        console.log("No token in cookie");
        setLoadingAuth(false);
        return;
      }

      try {
        const res = await axios.post(
          "https://api.rgb.irpsc.com/api/auth/me",
          null,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        let code = res.data.data.code || "";
        code = code.trim().toLowerCase(); // trim و lowercase برای اطمینان
        // console.log("Citizen ID from API:", code);

        // بررسی اجازه دسترسی
        const allowedIds = ["hm-2000003", "hm-2000007" , "hm-2000001"];
        if (allowedIds.includes(code)) {
          setAllowed(true);
        }

        setLoggedInUserData({ code, token });
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoadingAuth(false);
      }
    };

    fetchUser();
  }, [cookies]);

  if (loadingAuth) return <p  className="mx-auto my-10">در حال بررسی دسترسی...</p>;
  if (!allowed || !loggedInUserData) return <p className="mx-auto my-10">دسترسی ندارید</p>;

  return <AdminArticles loggedInUserData={loggedInUserData} />;
}
