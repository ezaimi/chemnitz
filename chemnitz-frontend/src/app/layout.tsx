import "./global.css";
import { UserProvider } from "@/components/AuthPage";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
        </header>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
