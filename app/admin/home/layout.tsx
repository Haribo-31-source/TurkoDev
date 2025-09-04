"use client";

import "../layout.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logout = async () => {
    await fetch("/api/v1/logout", {
      method: "GET",
    });
  };
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

      </head>
      <body>
        <header className="admin-header">
          
          <nav>
            <ul>
              <h2 className="font-geist-sans font-bold text-2xl ">Admin&apos;s Panel</h2>
              <li><Link href={"/admin/home"}>Home</Link></li>
              <li><Link href={"/admin/home/addBlog"}>Blogs</Link></li>
              <li><Link href={"/admin/home/latest"}>Chat</Link></li>
              <li><input type="button" value="Logout" onClick={() => logout()} /></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>

      </body>
    </html>
  );
}