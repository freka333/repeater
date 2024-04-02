"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prismaClient";
import { TermMark } from "@prisma/client";

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

export async function addTermToCollection(
  userId: string,
  hungarian: string,
  english: string,
  collectionId: string
) {
  try {
    await prisma.userTerms.create({
      data: {
        ownerId: userId,
        hungarian: hungarian,
        english: english,
        collectionId: collectionId,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function updateTerm(
  userId: string,
  termId: string,
  hungarian: string,
  english: string
) {
  try {
    await prisma.userTerms.update({
      where: { id: termId, ownerId: userId },
      data: { hungarian: hungarian, english: english },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteTerm(userId: string, termId: string) {
  try {
    await prisma.userTerms.delete({ where: { ownerId: userId, id: termId } });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function handleMarkVerb(
  verbId: string,
  userId: string,
  mark: TermMark
) {
  await prisma.userIrregularVerbs.upsert({
    where: {
      irregularVerbId_ownerId: {
        irregularVerbId: verbId,
        ownerId: userId,
      },
    },
    update: { mark: mark },
    create: { irregularVerbId: verbId, ownerId: userId, mark: mark },
  });
  revalidatePath("/");
}

export async function handleRemoveMarkVerb(verbId: string, userId: string) {
  await prisma.userIrregularVerbs.delete({
    where: {
      irregularVerbId_ownerId: {
        irregularVerbId: verbId,
        ownerId: userId,
      },
    },
  });
  revalidatePath("/");
}
