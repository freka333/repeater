import { IrregularVerbs, TermMark, UserTerms } from "@prisma/client";

export interface MarkButtonProps {
  mark: TermMark;
  isMarked: boolean;
  onClick: () => void;
}

export type ManualState = TermMark | "Unmarked";

export type IrregularVerbWithUserInfo = IrregularVerbs & {
  manualState: ManualState;
  type: "IrregularVerb";
};

export type Row = {
  header: string;
  value: string;
};

export type TermWithUserInfo = UserTerms & {
  manualState: ManualState;
  type: "Term";
};
