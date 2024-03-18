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
import { ManualState, Row } from "@/types/collectionTypes";
import { MarkButton } from "./MarkButton";

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
  termId: string;
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
  termId,
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
      })}
    >
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
              await handleRemoveMarkTerm(termId, userId);
            } else {
              await handleMarkTerm(termId, userId, "Known");
            }
          }}
        />
        <MarkButton
          mark="Repeatable"
          isMarked={mark === "Repeatable"}
          onClick={async () => {
            if (mark === "Repeatable") {
              await handleRemoveMarkTerm(termId, userId);
            } else {
              await handleMarkTerm(termId, userId, "Repeatable");
            }
          }}
        />
      </Stack>
    </Paper>
  );
};
