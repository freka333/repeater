import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NotFound } from "@/components/pageComponents/NotFound";
import { TermList } from "@/components/collection/TermList";
import { TermWithUserInfo } from "@/types/collectionTypes";
import { paths } from "@/paths";
import { prisma } from "@/app/prismaClient";

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
        userId={session?.user.id}
        terms={userTerms}
        collectionId={null}
      />
    );
  }
  return <NotFound />;
}
