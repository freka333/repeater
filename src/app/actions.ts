"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prismaClient";
import { paths } from "@/paths";
import { TermMark } from "@prisma/client";

export async function createCollection(name: string, userId: string) {
  const collection = await prisma.termCollection.create({
    data: { name: name, ownerId: userId },
  });
  revalidatePath("/", "layout");
  return collection.id;
}

export async function renameCollection(
  collectionId: string,
  userId: string,
  name: string
) {
  await prisma.termCollection.update({
    where: { id: collectionId, ownerId: userId },
    data: { name: name },
  });
  revalidatePath("/", "layout");
}

export async function deleteCollection(collectionId: string, userId: string) {
  await prisma.userTerms.deleteMany({
    where: { collectionId: collectionId, ownerId: userId },
  });
  await prisma.termCollection.delete({
    where: { id: collectionId, ownerId: userId },
  });
  revalidatePath("/", "layout");
}

export async function addTermToCollection(
  userId: string,
  hungarian: string,
  english: string,
  collectionId: string
) {
  await prisma.userTerms.create({
    data: {
      ownerId: userId,
      hungarian: hungarian,
      english: english,
      collectionId: collectionId,
    },
  });
  revalidatePath(paths.collection.path(collectionId));
}

export async function updateTerm(
  userId: string,
  termId: string,
  hungarian: string,
  english: string
) {
  await prisma.userTerms.update({
    where: { id: termId, ownerId: userId },
    data: { hungarian: hungarian, english: english },
  });
  revalidatePath(paths.collections.path);
}

export async function deleteTerm(userId: string, termId: string) {
  await prisma.userTerms.delete({ where: { ownerId: userId, id: termId } });
  revalidatePath(paths.collections.path);
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
