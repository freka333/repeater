import { getServerSession } from "next-auth/next";
import { NotFound } from "@/components/pageComponents/NotFound";
import { IrregularVerbList } from "@/components/collection/IrregularVerbList";
import { IrregularVerbWithUserInfo } from "@/types/collectionTypes";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../prismaClient";

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
    return <IrregularVerbList verbs={userVerbs} userId={session.user.id} />;
  }
  return <NotFound />;
}
