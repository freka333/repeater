"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prismaClient";
import { deleteAllLearningFromCollection } from "./learningRequests";

export async function createCollection(name: string, userId: string) {
  try {
    const collection = await prisma.termCollection.create({
      data: { name: name, ownerId: userId },
    });
    revalidatePath("/", "layout");
    return { success: true, collectionId: collection.id };
  } catch (error) {
    return { success: false, error };
  }
}

export async function renameCollection(
  collectionId: string,
  userId: string,
  name: string
) {
  try {
    await prisma.termCollection.update({
      where: { id: collectionId, ownerId: userId },
      data: { name: name },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteCollection(collectionId: string, userId: string) {
  try {
    await deleteAllLearningFromCollection(collectionId, userId);
    await prisma.userTerms.deleteMany({
      where: { collectionId: collectionId, ownerId: userId },
    });
    await prisma.termCollection.delete({
      where: { id: collectionId, ownerId: userId },
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
