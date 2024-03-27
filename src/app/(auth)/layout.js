import { AuthProvider } from "@/store/AuthContext";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={`  bg-gray-100`}>
        <AuthProvider>
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
