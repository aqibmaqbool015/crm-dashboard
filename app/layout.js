import "./globals.css";

export const metadata = {
  title: "CRMS - Customer Relationship Management",
  description:
    "CRM System for managing contacts, companies, deals and projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
