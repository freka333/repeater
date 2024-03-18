"use client";

import { paths } from "@/paths";
import { TermFilter } from "./TermFilter";
import { FC, useState } from "react";
import { useMediaQuery } from "@mui/material";
import theme from "@/theme";
import { TermMark, UserTerms } from "@prisma/client";
import { ManualState, TermWithUserInfo } from "@/types/collectionTypes";
import { TableCollection } from "./TableCollection";
import { MobileCollection } from "./MobileCollection";

interface TermListProps {
  terms: TermWithUserInfo[];
  userId: string;
  handleMarkTerm: (
    termId: string,
    userId: string,
    mark: TermMark
  ) => Promise<void>;
  handleRemoveMarkTerm: (termId: string, userId: string) => Promise<void>;
}

export const TermList: FC<TermListProps> = ({
  terms,
  userId,
  handleMarkTerm,
  handleRemoveMarkTerm,
}) => {
  const [checkedItems, setCheckedItems] = useState({
    Unmarked: true,
    Known: true,
    Repeatable: true,
  });
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredTerms = terms.filter(
    (item) =>
      checkedItems[item.manualState] &&
      [item.hungarian, item.english].some((value) =>
        value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
  );

  const filter = (
    <TermFilter
      title={paths.allUserTerms.name}
      checkedItems={checkedItems}
      searchValue={searchValue}
      setCheckedItems={setCheckedItems}
      setSearchValue={setSearchValue}
    />
  );

  if (isMobile) {
    return (
      <MobileCollection
        terms={filteredTerms}
        userId={userId}
        filter={filter}
        handleMarkTerm={handleMarkTerm}
        handleRemoveMarkTerm={handleRemoveMarkTerm}
      />
    );
  }
  return (
    <TableCollection
      terms={filteredTerms}
      userId={userId}
      filter={filter}
      handleMarkTerm={handleMarkTerm}
      handleRemoveMarkTerm={handleRemoveMarkTerm}
    />
  );
};
