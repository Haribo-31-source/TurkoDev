"use client";

import { Check, useMessage } from "@/lib/check";

export default function Latest() {
  Check();
  const message = useMessage();
  const loading = Check();
  if (loading) {
    return <p>Yükleniyor...</p>;
  }
  return (
    <h1>Latest</h1>
  );
}