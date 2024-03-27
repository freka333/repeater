import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { TermMark } from "@prisma/client";
import { FC, ReactNode } from "react";
import { MarkButton } from "./actions/MarkButton";
import {
  IrregularVerbWithUserInfo,
  TermWithUserInfo,
} from "@/types/collectionTypes";
import { MoreOptionsButton } from "./actions/MoreOptionsButton";

const ActionsColumn = styled(TableCell)(() => ({
  whiteSpace: "nowrap",
  width: "auto",
}));

interface TableCollectionProps {
  terms: TermWithUserInfo[] | IrregularVerbWithUserInfo[];
  userId: string;
  handleMarkTerm: (
    termId: string,
    userId: string,
    mark: TermMark
  ) => Promise<void>;
  handleRemoveMarkTerm: (termId: string, userId: string) => Promise<void>;
  header: ReactNode;
}

export const TableCollection: FC<TableCollectionProps> = ({
  terms,
  userId,
  handleMarkTerm,
  handleRemoveMarkTerm,
  header,
}) => {
  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "lg",
        mx: "auto",
      }}
    >
      {header}
      {terms.length === 0 ? (
        <Box sx={{ p: "2rem" }}>
          <Typography>No terms</Typography>
          {}{" "}
        </Box>
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
                  <ActionsColumn>Actions</ActionsColumn>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell width="50%">Magyar jelentés</TableCell>
                  <TableCell width="50%">English</TableCell>
                  <ActionsColumn>Actions</ActionsColumn>
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
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
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
                      {term.type === "Term" && (
                        <MoreOptionsButton term={term} userId={userId} />
                      )}
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
