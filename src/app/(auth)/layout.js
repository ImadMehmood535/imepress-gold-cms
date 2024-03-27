import { AuthProvider } from '@/store/AuthContext';
import '@/styles/globals.css';
import { Inconsolata } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

const inconsolata = Inconsolata({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function AuthLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inconsolata.className} bg-gray-100`}>
        <AuthProvider>
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
