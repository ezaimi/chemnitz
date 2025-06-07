import "./global.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          {/* Maybe add nav or logo here, but no login message */}
        </header>
        {children}
      </body>
    </html>
  );
}
