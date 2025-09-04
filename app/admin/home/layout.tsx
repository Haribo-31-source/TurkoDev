import "../layout.css";
import Header from "@/lib/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

      </head>
      <body>
        <Header />
        <main>{children}</main>

      </body>
    </html>
  );
}