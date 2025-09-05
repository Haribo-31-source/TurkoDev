"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../app/admin/layout.css";

export default function Header() {


    const logout = async () => {
        await fetch("/api/v1/logout", {
            method: "GET",
        });
        setRefresh(true);
    };

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    const admin = async () => {
        const res = await axios.get("/api/v1/check", {
            withCredentials: true,
        });
        if (res.data.ok) {
            setLoading(false);
        } else {
            router.push("/admin/login");
            setLoading(true);
        }
    }

    useEffect(() => {
        if (refresh) {
            admin();
            setRefresh(false);
        }
    }, [refresh]);

    if (loading) {
        return
    }

    return (
        <>
            <header className="admin-header">
                <nav>
                    <ul>
                        <h2 className="font-geist-sans font-bold text-2xl ">Admin&apos;s Panel</h2>
                        <li><Link href={"/admin/home"}>Home</Link></li>
                        <li><Link href={"/admin/home/addBlog"}>Blogs</Link></li>
                        <li><Link href={"/admin/home/latest"}>Chat</Link></li>
                        <li><input type="button" value="Logout" onClick={() => logout()} className="logout"/></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};