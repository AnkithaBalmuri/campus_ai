import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#303447", muted: "#74788A", blush: "#F4B8D0", paper: "#FFF9FC", line: "#F0E6ED", sky: "#DCEBFA", lavender: "#EAE3FA", mint: "#DDF3E7" }, boxShadow: { card: "0 12px 35px rgba(48,52,71,.08)" } } }, plugins: [] } satisfies Config;
