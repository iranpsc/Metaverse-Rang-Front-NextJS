"use client";

import { ArrowRight } from "@/components/svgs";
import UserCard from "@/components/shared/UserCard";
import { useState } from "react";

export default function TopTrainersClient({
    params,
    mainData,
    users,
    title,
    viewAllText,
    buttonText,
    levelText,

}: any) {
      const [activeBtnId, setActiveBtnId] = useState(null);
    
    return (
        <>
            <div className="w-full flex justify-between items-center lg:px-[42px] px-5">
                <p className="font-azarMehr font-medium text-[16px] md:text-[28px] dark:text-white">
                    {title}
                </p>

                <div className="flex items-center gap-4 md:hidden">
                    <p className="font-azarMehr text-[12px] dark:text-white">
                        {viewAllText}
                    </p>
                    <ArrowRight className="rtl:rotate-180 w-6" />
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row pb-10 gap-1 items-center">
                {users.map((user: any, index: number) => (
                    <div key={user.id} style={{ minWidth: 280 }}>
                        <UserCard
                            item={user}
                            index={index}
                            params={params}
                            minWidth="280px"
                            levelText={levelText}
                            buttonText={buttonText}
                            mainData={mainData}
                            activeBtnId={activeBtnId}
                            setActiveBtnId={setActiveBtnId}
                            
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
