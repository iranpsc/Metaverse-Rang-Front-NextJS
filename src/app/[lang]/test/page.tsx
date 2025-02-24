"use client";
import { switchDigits } from "@/components/utils/DigitSwitch";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [description, setDescription] = useState(""); // State to store the description

  useEffect(() => {
    // Fetch the first API
    const fetchDescription = async () => {
      try {
        const response = await axios.get(
          `https://api.rgb.irpsc.com/api/levels/1/general-info`
        );
        console.log("GENERAL INFO", response.data);
        const fetchedDescription = response.data?.data?.description;
        setDescription(fetchedDescription || "No description available");
      } catch (error) {
        console.error("Error fetching the general info API:", error);
        setDescription("Error loading description");
      }
    };

    // Fetch the second API
    const fetchUsers = async (_page = 1) => {
      try {
        const response = await axios.get(
          `https://api.rgb.irpsc.com/api/users?page=${_page}`
        );
        console.log("ALL CITIZENS", response.data);
      } catch (error) {
        console.error("Error fetching the users API:", error);
      }
    };

    fetchDescription(); // Fetch the first API
    fetchUsers(); // Fetch the second API (default to page 1)
  }, []); // Runs only once when the component mounts

  return (
    <div className="relative w-full">
      <div>
        <p>persian:::{switchDigits(11112, "fa")}</p>
        <p>persian:::{switchDigits("1111", "fa")}</p>
        <p>latin:::{switchDigits("۵۵۵", "en")}</p>
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
