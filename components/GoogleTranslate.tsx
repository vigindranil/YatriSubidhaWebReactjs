"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GoogleTranslate = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // 1. Define the callback function globally
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en", // The language your site is written in
            autoDisplay: false,
            // layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, // Optional: compact style
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  return (
    <>
      {/* 2. Container where the widget will be injected */}
      <div id="google_translate_element"></div>

      {/* 3. Load the script externally */}
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
        onError={(e) => console.error("Google Translate script failed to load", e)}
      />
    </>
  );
};

export default GoogleTranslate;