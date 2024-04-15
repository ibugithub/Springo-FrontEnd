import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/Navbar/navbar";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Springo",
  description: "Created for the Story teller",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="bg-slate-400">
          <Navbar />
          <ToastContainer />
          <div style={{ marginTop: "64px" }}>{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}
