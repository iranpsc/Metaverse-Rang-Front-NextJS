import axios from "axios";

export const redirectToSSOLogin = async (pathname: string) => {
  try {
    // ست کردن فلگ برای تشخیص برگشت از SSO
    sessionStorage.setItem("fromRedirect", "true");

    let referral;
    const parts = pathname.split("/");
    const last = parts[parts.length - 1];

    if (last.startsWith("hm-") || last.startsWith("HM-")) {
      referral = last;
    }

    const urlToUse = `${window.location.origin}${pathname}`;
    const apiUrl = `https://api.rgb.irpsc.com/api/auth/redirect?redirect_to=${encodeURIComponent(urlToUse)}${referral ? `&referral=${referral}` : ""}`;

    const res = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res?.data?.url) {
      window.location.href = res.data.url;
    } else {
      throw new Error("Failed to fetch redirect URL.");
    }
  } catch (error) {
    console.error("Login redirect error:", error);
  }
};
