import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient, TermMark } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NotFound } from "@/components/pageComponents/NotFound";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";
import { TermList } from "@/components/collection/TermList";
import { TermWithUserInfo } from "@/types/collectionTypes";

const prisma = new PrismaClient();

async function handleMarkTerm(termId: string, userId: string, mark: TermMark) {
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
  revalidatePath(paths.allUserTerms.path);
}

async function handleRemoveMarkTerm(termId: string, userId: string) {
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
  revalidatePath(paths.allUserTerms.path);
}

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
        terms={userTerms}
        userId={session?.user.id}
        handleMarkTerm={handleMarkTerm}
        handleRemoveMarkTerm={handleRemoveMarkTerm}
      />
    );
  }
  return <NotFound />;
}
