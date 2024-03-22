import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TermList } from "@/components/collection/TermList";
import { NotFound } from "@/components/pageComponents/NotFound";
import { getServerSession } from "next-auth/next";
import { TermWithUserInfo } from "@/types/collectionTypes";
import { ObjectId } from "mongodb";
import { prisma } from "@/app/prismaClient";

export default async function Collection({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const collection =
    session && ObjectId.isValid(params.id)
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
        userId={session.user.id}
        terms={userTerms}
        collectionId={params.id}
      />
    );
  }
  return <NotFound />;
}
