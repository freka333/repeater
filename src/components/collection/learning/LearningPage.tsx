"use client";

import { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { LearningCard } from "./LearningCard";
import { LearningTermStatus, TermMark } from "@prisma/client";
import {
  completionOfLearning,
  updateLearningTermStatus,
} from "@/app/requests/learningRequests";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import {
  handleMarkTerm,
  handleRemoveMarkTerm,
} from "@/app/collections/handleMark";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

interface CustomLearningTerm {
  order: number;
  learningTermId: string | null;
  status: LearningTermStatus | null;
  id: string;
  hungarian: string;
  english: string;
  mark: TermMark | null;
  ownerId: string;
  collectionId: string;
}

interface LearningPageProps {
  terms: CustomLearningTerm[];
  collectionId: string;
  learningCollectionId: string;
  userId: string;
  collectionName: string | null;
}

export const LearningPage: FC<LearningPageProps> = ({
  terms,
  collectionId,
  learningCollectionId,
  userId,
  collectionName,
}) => {
  const [orderedTerms, setOrderedTerms] = useState(
    terms
      .filter((term) => term.status !== "GotIt")
      .sort((a, b) => a.order - b.order)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState<"hungarian" | "english">(
    "hungarian"
  );
  const [isStatusButtonsDisabled, setIsStatusButtonsDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      router.refresh();
    };
  }, [router]);

  const handleChangeLanguage = () => {
    setLanguage(language === "hungarian" ? "english" : "hungarian");
  };

  const handleChangeMark = async (mark: TermMark | null) => {
    if (mark) {
      await handleMarkTerm(orderedTerms[currentIndex].id, userId, mark);
    } else {
      await handleRemoveMarkTerm(orderedTerms[currentIndex].id, userId);
    }
    const currentTerm = { ...orderedTerms[currentIndex] };
    currentTerm.mark = mark;
    const updatedTerms = [...orderedTerms];
    updatedTerms[currentIndex] = currentTerm;
    setOrderedTerms(updatedTerms);
  };

  const handleCardSetStatus = async (status: LearningTermStatus) => {
    if (!isStatusButtonsDisabled) {
      setIsStatusButtonsDisabled(true);
      const currentTermId = orderedTerms[currentIndex].learningTermId;
      if (currentTermId) {
        await updateLearningTermStatus(currentTermId, status);
      }
      if (status === "StillLearning") {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex < orderedTerms.length ? nextIndex : 0);
      } else if (orderedTerms.length === 1) {
        await completionOfLearning(learningCollectionId, userId);
        setOrderedTerms([]);
      } else {
        setOrderedTerms(
          orderedTerms.filter((term, index) => index !== currentIndex)
        );
        if (currentIndex === orderedTerms.length - 1) {
          setCurrentIndex(0);
        }
      }
      setLanguage("hungarian");
      setIsStatusButtonsDisabled(false);
    }
  };

  const handleClickGoBack = () => {
    router.push(paths.collection.path(collectionId));
  };

  return (
    <Stack p={2} alignItems="center">
      {orderedTerms.length ? (
        <>
          <Stack alignItems="center" direction="row" gap={1} mb={2}>
            <LocalLibraryIcon />
            <Typography variant="h6">{collectionName}</Typography>
          </Stack>
          <LearningCard
            term={orderedTerms[currentIndex][language]}
            termIndex={currentIndex}
            termCount={orderedTerms.length}
            mark={orderedTerms[currentIndex].mark}
            handleSetStatus={handleCardSetStatus}
            handleChangeLanguage={handleChangeLanguage}
            handleChangeMark={handleChangeMark}
          />
        </>
      ) : (
        <FinishedLearning
          collectionName={collectionName}
          handleClickGoBack={handleClickGoBack}
        />
      )}
    </Stack>
  );
};

const FinishedLearning = ({
  collectionName,
  handleClickGoBack,
}: {
  collectionName: string | null;
  handleClickGoBack: VoidFunction;
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "sm",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography variant="h5">{`You've finished learning ${collectionName}.`}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleClickGoBack}>
          Go to the collection
        </Button>
      </CardActions>
    </Card>
  );
};
