import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ⚠️ Replit-specific dev plugins removed in production
// They break Vercel and aren't needed locally unless you're running inside Replit

export default defineConfig({
    plugins: [
        react(),
        // Only load Replit runtime overlay if in Replit dev environment
        ...(process.env.REPL_ID ? [require("@replit/vite-plugin-runtime-error-modal").default()] : []),
    ],

    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src"),
            "@shared": path.resolve(import.meta.dirname, "src/types"),
            "@assets": path.resolve(import.meta.dirname, "attached_assets"),
        },
    },

    // Keep as root (safe)
    root: path.resolve(import.meta.dirname),

    build: {
        // ✔️ Correct output for Vercel
        outDir: "dist",
        emptyOutDir: true,
    },

    server: {
        fs: {
            strict: true,
            deny: ["**/.*"],
        },
        allowedHosts: [
            "71eb8564-b79f-4920-af09-9cd6317e6a88-00-1cgns8l1wsjzo.picard.replit.dev",
        ],
    },
});
