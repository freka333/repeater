"use server";

import { TermMark } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "../prismaClient";

export async function handleMarkTerm(
  termId: string,
  userId: string,
  mark: TermMark
) {
  "use server";
  await prisma.userTerms.update({
    where: {
      id: termId,
      ownerId: userId,
    },
    data: {
      mark: mark,
    },
  });
  revalidatePath("/");
}

export async function handleRemoveMarkTerm(termId: string, userId: string) {
  "use server";
  await prisma.userTerms.update({
    where: {
      id: termId,
      ownerId: userId,
    },
    data: {
      mark: null,
    },
  });
  revalidatePath("/");
}
