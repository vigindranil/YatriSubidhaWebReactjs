"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";

const LanguageSelectorSafe = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // list of languages
  const LANGUAGES = [
    { code: "bn", name: "Bangla" },
    //{ code: "bho", name: "Bhojpuri" },
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div
      ref={containerRef}
      className={`relative inline-block text-left z-50 ${className || ""}`}
    >

      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {children ? (
          children
        ) : (
          <button
            type="button"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg shadow-sm focus:outline-none transition-all ${isOpen
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
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* DROPDOWN MENU */}
      <div
        className={`absolute right-0 mt-2 w-[220px] p-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto transform transition-all duration-200 origin-top-right ${isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
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