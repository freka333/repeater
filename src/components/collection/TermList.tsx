"use client";

import { TermFilter } from "./TermFilter";
import { FC, useState } from "react";
import { useMediaQuery } from "@mui/material";
import theme from "@/theme";
import { TermMark } from "@prisma/client";
import { TermWithUserInfo } from "@/types/collectionTypes";
import { TableCollection } from "./TableCollection";
import { MobileCollection } from "./MobileCollection";

interface TermListProps {
  title: string;
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
  title,
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
      title={title}
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
