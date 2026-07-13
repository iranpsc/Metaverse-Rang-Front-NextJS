'use client';
import { useState } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ClipButton from "@/components/shared/ClipButton";

interface AvalancheCTAProps {
    params: { lang: string };
    mainData: { mainData: string };
}

// ----- Form data shape -----
interface EmailListFormData {
    firstName: string;
    lastName: string;
    email: string;
    twitter: string;
    location: string;
    interest: string[];
    isDeveloper: string;
    hasWeb3Experience: string;
    isStudent: string;
    hearAboutUs: string;
    agreePrivacy: boolean;
    agreeMarketing: boolean;
    agreeNewsletter: boolean;
}

const initialFormData: EmailListFormData = {
    firstName: "",
    lastName: "",
    email: "",
    twitter: "",
    location: "",
    interest: [],
    isDeveloper: "",
    hasWeb3Experience: "",
    isStudent: "",
    hearAboutUs: "",
    agreePrivacy: false,
    agreeMarketing: false,
    agreeNewsletter: false,
};

const TOTAL_STEPS = 5;

const INTEREST_OPTIONS = [
    "DeFi",
    "Enterprise & Institutions",
    "Gaming",
    "Art & Culture",
    "Development",
    "Policy",
    "Unsure",
];

const HEAR_ABOUT_OPTIONS = [
    "Social Media (Twitter/X, LinkedIn, Telegram, etc.)",
    "Word of Mouth",
    "Event",
    "Article, press release, or other news source",
    "Search engine",
];

const YES_NO_OPTIONS = ["Yes", "No"];

const COUNTRY_OPTIONS = [
    "United States", "United Kingdom", "Canada", "Germany", "France", "Italy", "Spain",
    "Netherlands", "Switzerland", "Sweden", "Norway", "Iran", "United Arab Emirates",
    "Turkey", "India", "Singapore", "Hong Kong", "Japan", "South Korea", "China",
    "Australia", "Brazil", "Mexico", "Argentina", "Nigeria", "South Africa", "Other",
];

// Shared input styles
const inputClass =
    "h-[58px] w-full rounded-xl bg-white px-5 text-black outline-none border border-transparent focus:border-fuchsia-500 text-[14px] font-medium";
const selectClass = inputClass + " appearance-none pe-11";
const labelClass = "text-white/80 text-[13px] mb-2 block";

// Multi-select chip group, used for "What are you most interested in learning about?"
// which allows picking more than one option on the live site.
function MultiSelectChips({
    values,
    onToggle,
    options,
}: {
    values: string[];
    onToggle: (opt: string) => void;
    options: string[];
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
                const active = values.includes(opt);
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onToggle(opt)}
                        aria-pressed={active}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors duration-200 ${active
                            ? "bg-[#9100D9] border-[#9100D9] text-white"
                            : "bg-white/5 border-white/20 text-white/80 hover:border-white/50"
                            }`}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}

// Custom select wrapper: gives the native <select> the site's pill look
// with a custom chevron instead of the browser's default arrow.
function StyledSelect({
    value,
    onChange,
    placeholder,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    options: string[];
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={selectClass}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <svg
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 end-4 w-4 h-4 text-black/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
}

export default function AvalancheCTA({ params, mainData }: AvalancheCTAProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<EmailListFormData>(initialFormData);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [stepError, setStepError] = useState<string | null>(null);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");

    const updateField = <K extends keyof EmailListFormData>(field: K, value: EmailListFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleInterest = (opt: string) => {
        setFormData((prev) => ({
            ...prev,
            interest: prev.interest.includes(opt)
                ? prev.interest.filter((i) => i !== opt)
                : [...prev.interest, opt],
        }));
    };

    const validateStep = (): boolean => {
        setStepError(null);
        if (step === 1) {
            if (!formData.firstName.trim() || !formData.email.trim()) {
                setStepError("لطفاً فیلدهای ستاره‌دار را پر کنید.");
                return false;
            }
        }
        if (step === 2) {
            if (!formData.location.trim()) {
                setStepError("لطفاً موقعیت خود را وارد کنید.");
                return false;
            }
        }
        if (step === 3) {
            if (!formData.interest.length) {
                setStepError("لطفاً حداقل یک گزینه را انتخاب کنید.");
                return false;
            }
        }
        if (step === 4) {
            if (!formData.isDeveloper) {
                setStepError("لطفاً پاسخ دهید که آیا توسعه‌دهنده هستید.");
                return false;
            }
        }
        if (step === 5) {
            if (!formData.hearAboutUs || !formData.agreePrivacy) {
                setStepError("لطفاً فیلدهای الزامی و پذیرش حریم خصوصی را تکمیل کنید.");
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        if (step < TOTAL_STEPS) {
            setDirection("forward");
            setStep((s) => s + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        setStepError(null);
        setDirection("backward");
        setStep((s) => Math.max(1, s - 1));
    };

    const handleSubmit = async () => {
        setStatus("submitting");
        try {
            // TODO: replace with the real API endpoint for the newsletter form
            await new Promise((resolve) => setTimeout(resolve, 900));
            setStatus("success");
        } catch (err) {
            setStatus("error");
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setStep(1);
        setStatus("idle");
        setStepError(null);
        setDirection("forward");
    };

    const progressPercent = (step / TOTAL_STEPS) * 100;

    return (
        <section className="w-full rounded-xl lg:rounded-[32px] bg-white dark:bg-[#1A1A18] p-6">
            <style>{`
                @keyframes flipForward {
                    0%   { transform: rotateY(90deg); opacity: 0; }
                    60%  { opacity: 1; }
                    100% { transform: rotateY(0deg); opacity: 1; }
                }
                @keyframes flipBackward {
                    0%   { transform: rotateY(-90deg); opacity: 0; }
                    60%  { opacity: 1; }
                    100% { transform: rotateY(0deg); opacity: 1; }
                }
                .page-flip {
                    transform-style: preserve-3d;
                    backface-visibility: hidden;
                    transform-origin: center;
                }
                .page-flip.flip-forward {
                    animation: flipForward 0.5s ease;
                }
                .page-flip.flip-backward {
                    animation: flipBackward 0.5s ease;
                }
                @media (prefers-reduced-motion: reduce) {
                    .page-flip.flip-forward,
                    .page-flip.flip-backward {
                        animation: none;
                    }
                }
            `}</style>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* LEFT CARD */}
                <div className="relative bg-[url(../../public/whitepaper/formbg.jpg)] overflow-hidden rounded-[18px] min-h-[360px]  p-5 2xl:px-10 2xl:py-12 flex flex-col justify-between bg-cover bg-center">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/45 z-0" />

                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-black/40 z-0" />

                    <div className="relative z-10">
                        <p className="text-white text-4xl lg:text-[52px] lg:leading-[1] font-semibold tracking-[-2px] max-w-[420px]">
                            {findByUniqueId(mainData, 1723)}
                        </p>

                        <p className="mt-6 text-white/75 text-base leading-6 max-w-[360px]">
                            {findByUniqueId(mainData, 1724)}
                        </p>
                    </div>

                    {/* Button */}
                    <div className="relative z-10">
                        <ClipButton clip={params.lang == "fa" ? "bl" : "br"}
                                            className="w-[230px]  h-[64px] group  cursor-pointer duration-300 text-white hover:text-[#9100D9]">
                                            <button
                                                type="button"
                                                aria-label="btn to next"
                                                className="bg-transparent flex items-center text-base !ring-0 !border-0 focus-visible:ring-0"
                                            >
                                                <span className="text-black font-medium  group-hover:text-white pe-3">{findByUniqueId(mainData, 1725)}</span>
                                                <svg className="rtl:rotate-180  "
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-hidden="true"
                                                >
                                                    <path className=" stroke-[#9100D9] group-hover:stroke-white"
                                                        d="M5 12H19"
                                                        
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <path className="  stroke-[#9100D9] group-hover:stroke-white"
                                                        d="M13 6L19 12L13 18"
                                                        
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>

                                            </button>
                                        </ClipButton>
                    </div>
                </div>

                {/* RIGHT CARD */}
                <div className="relative bg-[url(../../public/whitepaper/formbg.jpg)] overflow-hidden rounded-[18px] min-h-[360px] p-5 2xl:px-10 2xl:py-12 bg-cover bg-center">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-0" />

                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-black/40 z-0" />

                    <div className="relative z-10 h-full flex flex-col">
                        {/* Header */}
                        <div>
                            <h2 className="text-white text-4xl lg:text-[50px] lg:leading-[1] font-semibold tracking-[-2px]">
                                {findByUniqueId(mainData, 1726)}
                            </h2>

                            <p className="mt-5 text-white/75 text-base leading-6 max-w-[420px]">
                                {findByUniqueId(mainData, 1727)}
                            </p>
                        </div>

                        {/* ================= SUCCESS / ERROR STATE ================= */}
                        {status === "success" && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-10">
                                <div className="w-14 h-14 rounded-full bg-[#9100D9]/20 flex items-center justify-center">
                                    <svg className="w-7 h-7 text-[#9100D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-white text-xl font-semibold">Thank you for subscribing</p>
                            </div>
                        )}

                        {status === "error" && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-10">
                                <p className="text-white text-xl font-semibold">Something went wrong</p>
                                <button
                                    onClick={handleReset}
                                    className="text-white underline text-sm hover:text-fuchsia-300 transition-colors"
                                >
                                    Try again
                                </button>
                            </div>
                        )}

                        {/* ================= MULTI-STEP FORM ================= */}
                        {(status === "idle" || status === "submitting") && (
                            <>
                                <div className="mt-10" style={{ perspective: "1400px" }}>
                                    <div
                                        key={step}
                                        className={`grid md:grid-cols-2 gap-4 page-flip ${direction === "forward" ? "flip-forward" : "flip-backward"}`}
                                    >
                                        {/* STEP 1 */}
                                        {step === 1 && (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder={findByUniqueId(mainData, 79)}
                                                    value={formData.firstName}
                                                    onChange={(e) => updateField("firstName", e.target.value)}
                                                    className={inputClass}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder={findByUniqueId(mainData, 78)}
                                                    value={formData.lastName}
                                                    onChange={(e) => updateField("lastName", e.target.value)}
                                                    className={inputClass}
                                                />
                                                <input
                                                    type="email"
                                                    placeholder={findByUniqueId(mainData, 85)}
                                                    value={formData.email}
                                                    onChange={(e) => updateField("email", e.target.value)}
                                                    className={inputClass}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder={findByUniqueId(mainData, 1728)}
                                                    value={formData.twitter}
                                                    onChange={(e) => updateField("twitter", e.target.value)}
                                                    className={inputClass}
                                                />
                                            </>
                                        )}

                                        {/* STEP 2 */}
                                        {step === 2 && (
                                            <div className="md:col-span-2">
                                                <label className={labelClass}>Where are you based?*</label>
                                                <input
                                                    list="country-options"
                                                    type="text"
                                                    placeholder="Where are you based?"
                                                    value={formData.location}
                                                    onChange={(e) => updateField("location", e.target.value)}
                                                    className={inputClass}
                                                />
                                                <datalist id="country-options">
                                                    {COUNTRY_OPTIONS.map((c) => (
                                                        <option key={c} value={c} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        )}

                                        {/* STEP 3 */}
                                        {step === 3 && (
                                            <div className="md:col-span-2">
                                                <label className={labelClass}>
                                                    What are you most interested in learning about?*
                                                </label>
                                                <MultiSelectChips
                                                    values={formData.interest}
                                                    onToggle={toggleInterest}
                                                    options={INTEREST_OPTIONS}
                                                />
                                            </div>
                                        )}

                                        {/* STEP 4 */}
                                        {step === 4 && (
                                            <div className="md:col-span-2 flex flex-col gap-5">
                                                <div>
                                                    <label className={labelClass}>Are you a developer?*</label>
                                                    <StyledSelect
                                                        value={formData.isDeveloper}
                                                        onChange={(v) => updateField("isDeveloper", v)}
                                                        placeholder="Select an option"
                                                        options={YES_NO_OPTIONS}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        Do you have experience building in Web3?
                                                    </label>
                                                    <StyledSelect
                                                        value={formData.hasWeb3Experience}
                                                        onChange={(v) => updateField("hasWeb3Experience", v)}
                                                        placeholder="Select an option"
                                                        options={YES_NO_OPTIONS}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        Are you currently a university student?
                                                    </label>
                                                    <StyledSelect
                                                        value={formData.isStudent}
                                                        onChange={(v) => updateField("isStudent", v)}
                                                        placeholder="Select an option"
                                                        options={YES_NO_OPTIONS}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 5 */}
                                        {step === 5 && (
                                            <div className="md:col-span-2 flex flex-col gap-5">
                                                <div>
                                                    <label className={labelClass}>Where did you hear about Avalanche?</label>
                                                    <StyledSelect
                                                        value={formData.hearAboutUs}
                                                        onChange={(v) => updateField("hearAboutUs", v)}
                                                        placeholder="Select an option"
                                                        options={HEAR_ABOUT_OPTIONS}
                                                    />
                                                </div>

                                                <label className="flex items-start gap-2 text-white/75 text-[12px] leading-5">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.agreePrivacy}
                                                        onChange={(e) => updateField("agreePrivacy", e.target.checked)}
                                                        className="mt-1 accent-[#9100D9]"
                                                    />
                                                    <span>
                                                        I have read and agree to the{" "}
                                                        <a
                                                            href="https://www.avax.network/legal/privacy-policy"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="underline hover:text-white"
                                                        >
                                                            privacy policy
                                                        </a>
                                                        *
                                                    </span>
                                                </label>

                                                <label className="flex items-start gap-2 text-white/75 text-[12px] leading-5">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.agreeMarketing}
                                                        onChange={(e) => updateField("agreeMarketing", e.target.checked)}
                                                        className="mt-1 accent-[#9100D9]"
                                                    />
                                                    <span>I agree to receive marketing emails from the Avalanche Foundation.</span>
                                                </label>

                                                <label className="flex items-start gap-2 text-white/75 text-[12px] leading-5">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.agreeNewsletter}
                                                        onChange={(e) => updateField("agreeNewsletter", e.target.checked)}
                                                        className="mt-1 accent-[#9100D9]"
                                                    />
                                                    <span>
                                                        I&apos;d also like to subscribe to the Avalanche Foundation&apos;s monthly
                                                        newsletter, the Snow Report.
                                                    </span>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {stepError && (
                                    <p className="mt-3 text-red-400 text-[12px]">{stepError}</p>
                                )}

                                {/* Footer */}
                                <div className="flex flex-col gap-y-5 mt-5 md:flex-row items-center justify-between pt-8">
                                    <div className="flex items-center gap-5 w-full lg:w-auto">
                                        <span className="text-white text-[14px] w-max text-nowrap">
                                            {step} {findByUniqueId(mainData, 1730)} {TOTAL_STEPS}{" "}
                                            {findByUniqueId(mainData, 1729)}
                                        </span>

                                        <div className="w-full lg:w-[110px] h-[2px] bg-white/15 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white rounded-full transition-all duration-300"
                                                style={{ width: `${progressPercent}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 ms-auto">
                                        {step > 1 && (
                                            <button type="button"
                                                aria-label="btn back"
                                                className="text-[#9100D9] flex items-center gap-2 bg-transparent text-base !font-bold transition-colors px-4"
                                                onClick={handleBack}>

                                                <svg className="ltr:rotate-180"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M5 12H19"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M13 6L19 12L13 18"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <span className="font-bold"


                                                >
                                                    {params.lang == "fa" ? "برگشت" : "back"}

                                                </span>
                                            </button>
                                        )}


                                        <ClipButton clip={params.lang == "fa" ? "bl" : "br"}
                                            className="w-[230px]  h-[64px] group   cursor-pointer duration-300 text-white hover:text-[#9100D9]">
                                            <button
                                                type="button"
                                                aria-label="btn next"
                                                onClick={handleNext}
                                                disabled={status === "submitting"}
                                                className="bg-transparent flex items-center text-base !ring-0 !border-0 focus-visible:ring-0"
                                            >
                                                <span className="text-black font-medium  group-hover:text-white pe-3">{findByUniqueId(mainData, 1755)}</span>
                                                <svg className="rtl:rotate-180 stroke-white"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-hidden="true"
                                                >
                                                    <path  className="  stroke-[#9100D9] group-hover:stroke-white"
                                                        d="M5 12H19"
                                                        stroke="white"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <path  className="  stroke-[#9100D9] group-hover:stroke-white"
                                                        d="M13 6L19 12L13 18"
                                                        stroke="white"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>

                                            </button>
                                        </ClipButton>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}