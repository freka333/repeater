"use server";

import { prisma } from "@/app/prismaClient";
import { filterKeys } from "@/components/collection/TermCollectionHeader";
import { getMarkForLearning } from "@/functions";
import { paths } from "@/paths";
import { LearningTermStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CollectionLearningParams {
  collectionId: string;
  userId: string;
  filter: filterKeys;
}

export async function getLearningTerms(collectionId: string) {
  const terms = await prisma.learningTerm.findMany({
    where: { learningCollectionId: collectionId },
  });
  return terms;
}

export async function updateLearningTermStatus(
  termId: string,
  status: LearningTermStatus
) {
  await prisma.learningTerm.update({
    where: { id: termId },
    data: { status: status },
  });
}

export async function getLearningInProgress(
  collectionId: string,
  userId: string
) {
  try {
    const learningCollection = await prisma.learningCollection.findFirst({
      where: { collectionId: collectionId, ownerId: userId, inProgress: true },
    });
    if (!learningCollection) {
      return { learningCollection, learningTerms: null };
    }
    const learningTerms = await prisma.learningTerm.findMany({
      where: {
        learningCollectionId: learningCollection.id,
        OR: [{ status: { isSet: false } }, { status: "StillLearning" }],
      },
    });
    return {
      learningCollection,
      learningTerms,
    };
  } catch (error) {
    return { error };
  }
}

export async function createLearningCollection({
  collectionId,
  userId,
  filter,
}: CollectionLearningParams) {
  try {
    const mark = getMarkForLearning({
      unmarked: filter.Unmarked,
      known: filter.Known,
      repeatable: filter.Repeatable,
    });
    const terms = await prisma.userTerms.findMany({
      where: {
        collectionId: collectionId,
        ownerId: userId,
        ...mark,
      },
    });
    if (filter.Shuffle) {
      terms.sort(() => Math.random() - 0.5);
    }
    const termsLearning = terms.map((term, i) => ({
      order: i,
      termId: term.id,
    }));
    await prisma.learningCollection.create({
      data: {
        collectionId: collectionId,
        ownerId: userId,
        terms: { createMany: { data: termsLearning } },
      },
    });
    revalidatePath(paths.learningCollection.path(collectionId));
  } catch (error) {
    return error;
  }
}

export async function completionOfLearning(
  learningCollectionId: string,
  userId: string
) {
  await prisma.learningCollection.update({
    where: { id: learningCollectionId, ownerId: userId },
    data: { inProgress: false },
  });
}

export async function deleteAllLearningFromCollection(
  collectionId: string,
  userId: string
) {
  const learningCollections = await prisma.learningCollection.findMany({
    where: { collectionId: collectionId, ownerId: userId },
  });
  const learningCollectionIds = learningCollections.map(
    (collection) => collection.id
  );
  await prisma.learningTerm.deleteMany({
    where: { learningCollectionId: { in: learningCollectionIds } },
  });
  await prisma.learningCollection.deleteMany({
    where: { collectionId: collectionId, ownerId: userId },
  });
}

export async function deleteAllLearnings() {
  await prisma.learningTerm.deleteMany();
  await prisma.learningCollection.deleteMany();
}
