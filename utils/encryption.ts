import CryptoJS from "crypto-js";

const ENC_SECRET_KEY = process.env.NEXT_PUBLIC_ENC_SECRET_KEY || ""; // store in .env

export function encryptPayload(data: any) {
  const json = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(json, ENC_SECRET_KEY).toString();
  return encrypted;
}

export function decryptPayload(cipherText: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, ENC_SECRET_KEY);
    console.log("aksh", bytes);
    const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
    console.log("aksh", decryptedJson);

    if (!decryptedJson) {
      throw new Error("Data tempered or wrong key");
    }

    return JSON.parse(decryptedJson);
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
}

