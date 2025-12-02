"use client";
import React, { useState } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface EmailModalProps {
    open: boolean;
    onClose: () => void;
    mainData: any;
    params: any;
    id: any;  // ⬅ اینجا اضافه شد
}
const EmailModal: React.FC<EmailModalProps> = ({ open, onClose, mainData, params, id }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = () => {
        if (!email.trim()) {
            setError("لطفاً ایمیل را وارد کنید");
            return;
        }

        if (!validateEmail(email)) {
            setError(findByUniqueId(mainData, 320));
            return;
        }

        // 📌 اگر ایمیل درست بود → محتوای مودال تغییر می‌کند
        setError("");
        setSuccess(true);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            {/* BACKDROP */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/25 backdrop-blur-sm"
            ></div>

            {/* ---------- حالت SUCCESS ---------- */}
            {success ? (
                <div className="relative py-14 bg-[#0C0D0F] dark:bg-[#0C0D0F] text-white p-8 rounded-xl w-[90%] max-w-xl z-50 flex flex-col items-center gap-6">

                    {/* CLOSE BUTTON */}
                    <svg onClick={onClose} className="absolute start-[25px] top-[25px] cursor-pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74638 7L13.6346 2.11179C13.8666 1.88021 13.9971 1.56595 13.9974 1.23815C13.9977 0.910351 13.8677 0.595863 13.6361 0.36387C13.4045 0.131876 13.0903 0.00138122 12.7625 0.00109174C12.4347 0.000802246 12.1202 0.130742 11.8882 0.362326L7 5.25054L2.11179 0.362326C1.8798 0.130333 1.56515 0 1.23706 0C0.90897 0 0.59432 0.130333 0.362326 0.362326C0.130333 0.59432 0 0.90897 0 1.23706C0 1.56515 0.130333 1.8798 0.362326 2.11179L5.25054 7L0.362326 11.8882C0.130333 12.1202 0 12.4349 0 12.7629C0 13.091 0.130333 13.4057 0.362326 13.6377C0.59432 13.8697 0.90897 14 1.23706 14C1.56515 14 1.8798 13.8697 2.11179 13.6377L7 8.74946L11.8882 13.6377C12.1202 13.8697 12.4349 14 12.7629 14C13.091 14 13.4057 13.8697 13.6377 13.6377C13.8697 13.4057 14 13.091 14 12.7629C14 12.4349 13.8697 12.1202 13.6377 11.8882L8.74638 7Z" fill="#6A6B74" />
                    </svg>

                    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-light-primary dark:stroke-dark-yellow" d="M23.248 38.6641L26.873 42.2891L34.7272 35.0391" stroke="#FFC700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path className="stroke-light-primary dark:stroke-dark-yellow" d="M21.2913 4.83594L12.543 13.6084" stroke="#FFC700" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path className="stroke-light-primary dark:stroke-dark-yellow" d="M4.83301 18.974C4.83301 14.5031 7.22551 14.1406 10.198 14.1406H47.8013C50.7738 14.1406 53.1663 14.5031 53.1663 18.974C53.1663 24.1698 50.7738 23.8073 47.8013 23.8073H10.198C7.22551 23.8073 4.83301 24.1698 4.83301 18.974Z" stroke="#FFC700" stroke-width="1.5" />
                        <path className="stroke-light-primary dark:stroke-dark-yellow" d="M8.45801 24.1641L11.8655 45.0441C12.6388 49.7324 14.4997 53.1641 21.4113 53.1641H35.9838C43.4997 53.1641 44.6113 49.8774 45.4813 45.3341L49.5413 24.1641" stroke="#FFC700" stroke-width="1.5" stroke-linecap="round" />
                    </svg>

                    {/* TEXT */}
                    <p className="text-center text-base dark:text-white px-7">
                        {findByUniqueId(mainData, 1528)}
                    </p>

                    {/* VIEW EMAIL BUTTON */}
                    <button
                        onClick={() => window.open(`mailto:${email}`)}
                        className="bg-[#F9CC00] text-black font-bold py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <path d="M1.45419 16.0031H4.84734V7.76264L2.62546 3.88281L0 4.12713V14.5489C0 15.3523 0.650761 16.0031 1.45419 16.0031Z" fill="#0085F7" />
                            <path d="M16.4805 16.0031H19.8736C20.6771 16.0031 21.3278 15.3523 21.3278 14.5489V4.12713L18.7061 3.88281L16.4805 7.76264V16.0031H16.4805Z" fill="#00A94B" />
                            <path d="M16.4805 1.4581L14.4873 5.26149L16.4805 7.75964L21.3278 4.12413V2.18522C21.3278 0.388068 19.2762 -0.638354 17.8377 0.44018L16.4805 1.4581Z" fill="#FFBC00" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8475 7.76248L2.94824 3.75052L4.8475 1.46094L10.6643 5.82352L16.4811 1.46094V7.76248L10.6643 12.1251L4.8475 7.76248Z" fill="#FF4131" />
                            <path d="M0 2.18522V4.12413L4.84734 7.75964V1.4581L3.49008 0.44018C2.05164 -0.638354 0 0.388068 0 2.18522Z" fill="#E51C19" />
                        </svg><span>{findByUniqueId(mainData, 220)}</span>
                    </button>
                </div>
            ) : (
                /* ---------- حالت FORM ---------- */
                <div className="relative bg-white dark:bg-[#0C0D0F] rounded-xl p-6 w-[90%] max-w-xl shadow-xl z-50 flex flex-col gap-6">

                    <svg onClick={onClose} className="absolute start-[25px] top-[25px] cursor-pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74638 7L13.6346 2.11179C13.8666 1.88021 13.9971 1.56595 13.9974 1.23815C13.9977 0.910351 13.8677 0.595863 13.6361 0.36387C13.4045 0.131876 13.0903 0.00138122 12.7625 0.00109174C12.4347 0.000802246 12.1202 0.130742 11.8882 0.362326L7 5.25054L2.11179 0.362326C1.8798 0.130333 1.56515 0 1.23706 0C0.90897 0 0.59432 0.130333 0.362326 0.362326C0.130333 0.59432 0 0.90897 0 1.23706C0 1.56515 0.130333 1.8798 0.362326 2.11179L5.25054 7L0.362326 11.8882C0.130333 12.1202 0 12.4349 0 12.7629C0 13.091 0.130333 13.4057 0.362326 13.6377C0.59432 13.8697 0.90897 14 1.23706 14C1.56515 14 1.8798 13.8697 2.11179 13.6377L7 8.74946L11.8882 13.6377C12.1202 13.8697 12.4349 14 12.7629 14C13.091 14 13.4057 13.8697 13.6377 13.6377C13.8697 13.4057 14 13.091 14 12.7629C14 12.4349 13.8697 12.1202 13.6377 11.8882L8.74638 7Z" fill="#6A6B74" />
                    </svg>

                    <div className="flex w-full justify-center">

                        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="dark:stroke-dark-yellow" d="M41.084 49.5443H16.9173C9.66732 49.5443 4.83398 45.9193 4.83398 37.4609V20.5443C4.83398 12.0859 9.66732 8.46094 16.9173 8.46094H41.084C48.334 8.46094 53.1673 12.0859 53.1673 20.5443V37.4609C53.1673 45.9193 48.334 49.5443 41.084 49.5443Z" stroke="#0066FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path className="dark:stroke-dark-yellow" d="M41.0827 21.75L33.5185 27.7917C31.0293 29.7733 26.9452 29.7733 24.456 27.7917L16.916 21.75" stroke="#0066FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>

                    <p className=" font-bold text-center dark:text-[#F4F4F4] text-lg">
                        {findByUniqueId(mainData, 2)}
                    </p>
                    <p className="text-center text-[#868B90] dark:text-[#F4F4F4] text-lg">
                        {findByUniqueId(mainData, 1530)} <span className="text-light-primary dark:text-dark-yellow px-1">{id}</span> {findByUniqueId(mainData, 1531)}
                    </p>

                    {/* INPUT */}
                    <div className=" w-full">
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                            placeholder={findByUniqueId(mainData, 2) + " ..."}
                            className={`w-full bg-[#FCFCFC] dark:bg-black mt-3 dark:text-white border-0 rounded-xl px-4 py-3 text-sm ring-1 outline-none transition
                                ${error ? "ring-[#DE5753]" : "ring-[#DEDEE9] dark:ring-[#1A1A18]"}
                            `}
                        />

                        {/* ERROR TEXT */}
                        {error && (
                            <div className="text-[#DE5753]  mt-3 px-1 flex items-center gap-1 text-xs">

                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.00033 12.8307C10.2087 12.8307 12.8337 10.2057 12.8337 6.9974C12.8337 3.78906 10.2087 1.16406 7.00033 1.16406C3.79199 1.16406 1.16699 3.78906 1.16699 6.9974C1.16699 10.2057 3.79199 12.8307 7.00033 12.8307Z" stroke="#DE5753" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 4.66406V7.58073" stroke="#DE5753" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.99707 9.33594H7.00231" stroke="#DE5753" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                {error}
                            </div>
                        )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        onClick={handleSubmit}
                        className="mx-auto text-base bg-light-primary dark:bg-dark-yellow text-white dark:text-black py-3 px-10 rounded-xl   mt-3"
                    >
                        {findByUniqueId(mainData, 34)}
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmailModal;
