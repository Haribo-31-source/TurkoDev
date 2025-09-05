import axios from "axios";
import prisma from "./prisma";

export async function deleteBlog(id: string) {
  await prisma.blogs.delete({
    where: {
      id: id,
    },
  });
}

export async function deleteApi(id: string) {
  await axios.delete("/api/v1/deleteBlog", {
    data: {
      id: id,
    },
    withCredentials: true,
  });
}