"use server";

import { revalidatePath } from "next/cache";
import { TermMark } from "@prisma/client";
import { prisma } from "../prismaClient";

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
    await prisma.learningTerm.deleteMany({ where: { termId: termId } });
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
