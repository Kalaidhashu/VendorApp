
import "./globals.css";
export const metadata = { title: 'Vendor Manager', description: 'Manage vendor records' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
