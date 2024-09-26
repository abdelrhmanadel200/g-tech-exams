// src/app/layout.tsx


import './globals.css'; // Import your global styles
import Footer from '../components/Footer';



const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
