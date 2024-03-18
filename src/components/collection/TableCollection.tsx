import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TermMark } from "@prisma/client";
import { FC, ReactNode } from "react";
import { MarkButton } from "./MarkButton";
import {
  IrregularVerbWithUserInfo,
  TermWithUserInfo,
} from "@/types/collectionTypes";

interface TableCollectionProps {
  terms: TermWithUserInfo[] | IrregularVerbWithUserInfo[];
  userId: string;
  filter: ReactNode;
  handleMarkTerm: (
    termId: string,
    userId: string,
    mark: TermMark
  ) => Promise<void>;
  handleRemoveMarkTerm: (termId: string, userId: string) => Promise<void>;
}

export const TableCollection: FC<TableCollectionProps> = ({
  terms,
  userId,
  filter,
  handleMarkTerm,
  handleRemoveMarkTerm,
}) => {
  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "lg",
        mx: "auto",
      }}
    >
      {filter}
      {terms.length === 0 ? (
        <Typography>No items</Typography>
      ) : (
        <TableContainer>
          <Table stickyHeader sx={{ borderCollapse: "collapse" }}>
            <TableHead>
              {terms[0].type === "IrregularVerb" ? (
                <TableRow>
                  <TableCell>Magyar jelentés</TableCell>
                  <TableCell>Infinitive</TableCell>
                  <TableCell>Past Simple (V2)</TableCell>
                  <TableCell>Past Participle (V3)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>Magyar jelentés</TableCell>
                  <TableCell>English</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {terms.map((term) => {
                const isKnown = term.manualState === "Known";
                const isRepeatable = term.manualState === "Repeatable";
                return (
                  <TableRow key={term.id}>
                    <TableCell>{term.hungarian}</TableCell>
                    {term.type === "IrregularVerb" ? (
                      <>
                        <TableCell>{term.enV1}</TableCell>
                        <TableCell>{term.enV2}</TableCell>
                        <TableCell>{term.enV3}</TableCell>
                      </>
                    ) : (
                      <TableCell>{term.english}</TableCell>
                    )}
                    <TableCell>
                      <MarkButton
                        mark="Known"
                        isMarked={isKnown}
                        onClick={async () => {
                          if (isKnown) {
                            await handleRemoveMarkTerm(term.id, userId);
                          } else {
                            await handleMarkTerm(term.id, userId, "Known");
                          }
                        }}
                      />
                      <MarkButton
                        mark="Repeatable"
                        isMarked={isRepeatable}
                        onClick={async () => {
                          if (isRepeatable) {
                            await handleRemoveMarkTerm(term.id, userId);
                          } else {
                            await handleMarkTerm(term.id, userId, "Repeatable");
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};
