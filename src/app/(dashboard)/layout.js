import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/general/Sidebar";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/store/AuthContext";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// export const metadata = {
//   title: 'Internative Traders',
//   description: 'Created by Internative Labs',
// };

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-100 flex`}>
        <AuthProvider>
          <Sidebar />
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
