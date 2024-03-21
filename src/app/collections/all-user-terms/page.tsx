import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NotFound } from "@/components/pageComponents/NotFound";
import { TermList } from "@/components/collection/TermList";
import { TermWithUserInfo } from "@/types/collectionTypes";
import { handleMarkTerm, handleRemoveMarkTerm } from "../handleMark";
import { paths } from "@/paths";

const prisma = new PrismaClient();

export default async function AllUserTerms() {
  const session = await getServerSession(authOptions);
  const terms = await prisma.userTerms.findMany({
    where: { ownerId: session?.user.id },
  });

  const userTerms: TermWithUserInfo[] = terms.map((term) => {
    return {
      ...term,
      manualState: term.mark || "Unmarked",
      type: "Term",
    };
  });

  if (session?.user) {
    return (
      <TermList
        title={paths.allUserTerms.name}
        terms={userTerms}
        userId={session?.user.id}
        handleMarkTerm={handleMarkTerm}
        handleRemoveMarkTerm={handleRemoveMarkTerm}
      />
    );
  }
  return <NotFound />;
}
