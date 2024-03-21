import { PrismaClient, TermMark } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { NotFound } from "@/components/pageComponents/NotFound";
import { IrregularVerbList } from "@/components/collection/IrregularVerbList";
import { IrregularVerbWithUserInfo } from "@/types/collectionTypes";
import { authOptions } from "../api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

async function handleMarkVerb(verbId: string, userId: string, mark: TermMark) {
  "use server";
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

async function handleRemoveMarkVerb(verbId: string, userId: string) {
  "use server";
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

export default async function IrregularVerbs() {
  const session = await getServerSession(authOptions);
  const verbs = await prisma.irregularVerbs.findMany({
    include: { userIrregularVerbs: { where: { ownerId: session?.user.id } } },
  });

  const userVerbs: IrregularVerbWithUserInfo[] = verbs.map((verb) => {
    return {
      ...verb,
      manualState: verb.userIrregularVerbs[0]?.mark || "Unmarked",
      type: "IrregularVerb",
    };
  });

  if (session?.user) {
    return (
      <IrregularVerbList
        verbs={userVerbs}
        userId={session?.user.id}
        handleMarkVerb={handleMarkVerb}
        handleRemoveMarkVerb={handleRemoveMarkVerb}
      />
    );
  }
  return <NotFound />;
}
