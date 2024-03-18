"use client";

import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { TermMark } from "@prisma/client";
import { TermCard } from "./TermCard";
import {
  IrregularVerbWithUserInfo,
  Row,
  TermWithUserInfo,
} from "@/types/collectionTypes";

interface MobileCollectionProps {
  terms: IrregularVerbWithUserInfo[] | TermWithUserInfo[];
  userId: string;
  filter: ReactNode;
  handleMarkTerm: (
    termId: string,
    userId: string,
    mark: TermMark
  ) => Promise<void>;
  handleRemoveMarkTerm: (termId: string, userId: string) => Promise<void>;
}

export const MobileCollection: FC<MobileCollectionProps> = ({
  terms,
  userId,
  filter,
  handleMarkTerm,
  handleRemoveMarkTerm,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {filter}
      {terms.map((term, i) => {
        const rows: Row[] =
          term.type === "IrregularVerb"
            ? [
                { header: "hungarian", value: term.hungarian },
                { header: "enV1", value: term.enV1 },
                { header: "enV2", value: term.enV2 },
                { header: "enV3", value: term.enV3 },
              ]
            : [
                { header: "hungarian", value: term.hungarian },
                { header: "english", value: term.english },
              ];
        return (
          <TermCard
            key={i}
            rows={rows}
            termId={term.id}
            userId={userId}
            mark={term.manualState}
            handleMarkTerm={handleMarkTerm}
            handleRemoveMarkTerm={handleRemoveMarkTerm}
          />
        );
      })}
    </Box>
  );
};
