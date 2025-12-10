"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const LanguageSelectorSafe = () => {
  const [isOpen, setIsOpen] = useState(false);

  // list of languages (code: google language code, name: display)
  const LANGUAGES = [
    // { code: "auto", name: "Detect Language" },
    // { code: "af", name: "Afrikaans" },
    // { code: "sq", name: "Albanian" },
    // { code: "am", name: "Amharic" },
    // { code: "ar", name: "Arabic" },
    // { code: "hy", name: "Armenian" },
    // { code: "az", name: "Azerbaijani" },
    { code: "bn", name: "Bengali" },
    { code: "bho", name: "Bhojpuri" }, 
    // { code: "bs", name: "Bosnian" },
    // { code: "bg", name: "Bulgarian" },
    // { code: "ca", name: "Catalan" },
    // { code: "zh-CN", name: "Chinese (Simplified)" },
    // { code: "zh-TW", name: "Chinese (Traditional)" },
    // { code: "hr", name: "Croatian" },
    // { code: "cs", name: "Czech" },
    // { code: "da", name: "Danish" },
    // { code: "nl", name: "Dutch" },
    { code: "en", name: "English" },
    // { code: "et", name: "Estonian" },
    // { code: "fi", name: "Finnish" },
    // { code: "fr", name: "French" },
    // { code: "ka", name: "Georgian" },
    // { code: "de", name: "German" },
    // { code: "el", name: "Greek" },
    // { code: "gu", name: "Gujarati" },
    // { code: "ht", name: "Haitian Creole" },
    // { code: "he", name: "Hebrew" },
    { code: "hi", name: "Hindi" },
    

  ];

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element_hidden"
        );
      }
    };
  }, []);

      
  const setLanguage = (langCode) => {
    try {
      const setCookie = (value) => {
        document.cookie = `googtrans=${value}; path=/;`;
        const hostname = window.location.hostname;
        if (hostname && hostname.indexOf("localhost") === -1) {
          document.cookie = `googtrans=${value}; domain=.${hostname}; path=/;`;
        }
      };

      if (langCode === "auto" || langCode === "en") {
        setCookie("/en/en");
      } else {
        setCookie(`/en/${langCode}`);
      }

      window.location.reload();
    } catch (err) {
      console.error("Language switch failed:", err);
    }
  };

  return (
    <div className="relative inline-block text-left z-50">
      {/* White toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg shadow-sm focus:outline-none transition-all ${
          isOpen
            ? "bg-gray-100 text-gray-900 border-gray-300"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" x2="22" y1="12" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span>Language</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

   
      <div
        className={`absolute right-0 mt-2 w-[220px] p-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto transform transition-all duration-200 origin-top-right ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="text-xs text-gray-500 mb-2 px-1">Select Language:</div>
        <ul className="divide-y divide-gray-100">
          {LANGUAGES.map((l) => (
            <li
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className="cursor-pointer px-2 py-2 text-sm hover:bg-gray-100 rounded text-gray-700"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setLanguage(l.code);
              }}
            >
              {l.name}
            </li>
          ))}
        </ul>
      </div>
      <div id="google_translate_element_hidden" style={{ display: "none" }} />

  
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

     
      <style jsx global>{`
        .goog-te-combo,
        .goog-te-banner-frame,
        .goog-logo-link,
        .goog-te-gadget {
          display: none !important;
        }
        iframe.goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default LanguageSelectorSafe;