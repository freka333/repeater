"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createCollection(name: string, userId: string) {
  const collection = await prisma.termCollection.create({
    data: { name: name, ownerId: userId },
  });

  revalidatePath("/", "layout");
  return collection.id;
}
