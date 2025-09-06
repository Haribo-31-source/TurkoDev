import prisma from "./prisma";
import axios from "axios";

export function getChat() {
  return prisma.chat.findMany();
}

export async function getApiChat() {
  return await axios.get("/api/v2/getChat");
}

