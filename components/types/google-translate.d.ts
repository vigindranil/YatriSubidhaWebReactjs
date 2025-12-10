// types/google-translate.d.ts
export {};

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}