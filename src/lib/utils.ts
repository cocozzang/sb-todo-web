import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translatio from "./zod.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initializeI18n = () => {
  i18next.init({
    lng: "ko",
    resources: {
      ko: { zod: translatio },
    },
  });

  z.setErrorMap(zodI18nMap);
};
