"use client";

import { Button, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useSession } from "next-auth/react";
import { completionOfLearning } from "@/app/requests/learningRequests";
import { NotFound } from "@/components/pageComponents/NotFound";
import { paths } from "@/paths";
import Link from "next/link";
import { PagePaper } from "@/components/pageComponents/PagePaper";
import { useRouter } from "next/navigation";

interface LearningRequestErrorProps {
  collectionId: string;
  learningCollectionId?: string;
}

export const LearningRequestError: FC<LearningRequestErrorProps> = ({
  collectionId,
  learningCollectionId,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function completeTheLearning() {
      if (session && learningCollectionId) {
        await completionOfLearning(learningCollectionId, session?.user.id);
      }
    }
    completeTheLearning();
  }, [learningCollectionId, session]);

  if (session) {
    return (
      <PagePaper>
        <Stack alignItems="center" gap={2}>
          <Typography variant="h6">
            You have not started a learning. Go back and start one!
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href={paths.collection.path(collectionId)}
          >
            Go back to collection
          </Button>
        </Stack>
      </PagePaper>
    );
  }

  return <NotFound />;
};
