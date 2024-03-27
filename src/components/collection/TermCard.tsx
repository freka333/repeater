"use client";

import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  styled,
} from "@mui/material";
import { TermMark } from "@prisma/client";
import { FC } from "react";
import {
  IrregularVerbWithUserInfo,
  ManualState,
  Row,
  TermWithUserInfo,
} from "@/types/collectionTypes";
import { MarkButton } from "./actions/MarkButton";
import { MoreOptionsButton } from "./actions/MoreOptionsButton";

const StyledTableHead = styled(TableCell)(() => ({
  whiteSpace: "nowrap",
  width: "auto",
  color: "gray",
  border: "none",
}));

const StyledTableCell = styled(TableCell)(() => ({
  width: "100%",
  fontWeight: 500,
  fontSize: 20,
  border: "none",
}));

interface TermCardProps {
  term: TermWithUserInfo | IrregularVerbWithUserInfo;
  userId: string;
  mark: ManualState;
  rows: Row[];
  handleMarkTerm: (
    termId: string,
    userId: string,
    mark: TermMark
  ) => Promise<void>;
  handleRemoveMarkTerm: (termId: string, userId: string) => Promise<void>;
}

export const TermCard: FC<TermCardProps> = ({
  term,
  userId,
  mark,
  rows,
  handleMarkTerm,
  handleRemoveMarkTerm,
}) => {
  return (
    <Paper
      sx={(theme) => ({
        m: 2,
        width: "auto",
        boxShadow: `0 0 2px ${theme.palette.greyColor.main}`,
        position: "relative",
        pt: 2,
      })}
    >
      {term?.type === "Term" && (
        <MoreOptionsButton
          userId={userId}
          term={term}
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        />
      )}

      <Table>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <StyledTableHead>{row.header}</StyledTableHead>
              <StyledTableCell>{row.value}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack sx={{ p: 2, gap: 1 }}>
        <MarkButton
          mark="Known"
          isMarked={mark === "Known"}
          onClick={async () => {
            if (mark === "Known") {
              await handleRemoveMarkTerm(term.id, userId);
            } else {
              await handleMarkTerm(term.id, userId, "Known");
            }
          }}
        />
        <MarkButton
          mark="Repeatable"
          isMarked={mark === "Repeatable"}
          onClick={async () => {
            if (mark === "Repeatable") {
              await handleRemoveMarkTerm(term.id, userId);
            } else {
              await handleMarkTerm(term.id, userId, "Repeatable");
            }
          }}
        />
      </Stack>
    </Paper>
  );
};
