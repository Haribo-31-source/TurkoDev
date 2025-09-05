import prisma from "./prisma";
import axios from "axios";

export function getBlog() {
  return prisma.blogs.findMany();
}

export async function getApi() {
  return await axios.get("/api/v2/getBlog");
}

