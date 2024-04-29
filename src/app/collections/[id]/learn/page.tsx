import { prisma } from "@/app/prismaClient";
import { getLearningInProgress } from "@/app/requests/learningRequests";
import { LearningPage } from "@/components/collection/learning/LearningPage";
import { LearningRequestError } from "@/components/collection/learning/LearningRequestError";
import { NotFound } from "@/components/pageComponents/NotFound";
import authOptions from "@/lib/configs/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";

export default async function CollectionLearn({
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
    const result = await getLearningInProgress(params.id, session.user.id);
    if (result.learningCollection) {
      if (result.learningTerms.length !== 0) {
        const terms = await prisma.userTerms.findMany({
          where: {
            id: { in: result.learningTerms?.map((term) => term.termId) },
          },
        });

        const customLearningTerms = terms.map((term) => {
          const findTerm = result.learningTerms.find(
            (learningTerm) => learningTerm.termId === term.id
          );
          return {
            ...term,
            order: findTerm!.order,
            learningTermId: findTerm!.id,
            status: findTerm!.status,
          };
        });

        return (
          <LearningPage
            terms={customLearningTerms}
            collectionName={collection?.name || null}
            collectionId={params.id}
            userId={session.user.id}
            learningCollectionId={result.learningCollection.id}
            sourceLanguage={result.learningCollection.sourceLanguage}
          />
        );
      }
      return (
        <LearningRequestError
          collectionId={params.id}
          learningCollectionId={result.learningCollection.id}
        />
      );
    }
    return <LearningRequestError collectionId={params.id} />;
  }
  return <NotFound />;
}
