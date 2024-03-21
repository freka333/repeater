import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TermList } from "@/components/collection/TermList";
import { NotFound } from "@/components/pageComponents/NotFound";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { handleMarkTerm, handleRemoveMarkTerm } from "../handleMark";
import { TermWithUserInfo } from "@/types/collectionTypes";

const prisma = new PrismaClient();

export default async function Collection({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const collection = session
    ? await prisma.termCollection.findFirst({
        where: { id: params.id, ownerId: session.user.id },
      })
    : undefined;

  if (collection && session) {
    const terms = await prisma.userTerms.findMany({
      where: { collectionId: params.id },
    });

    const userTerms: TermWithUserInfo[] = terms.map((term) => {
      return {
        ...term,
        manualState: term.mark || "Unmarked",
        type: "Term",
      };
    });

    return (
      <TermList
        title={collection.name}
        terms={userTerms}
        userId={session.user.id}
        handleMarkTerm={handleMarkTerm}
        handleRemoveMarkTerm={handleRemoveMarkTerm}
      />
    );
  }
  return <NotFound />;
}
