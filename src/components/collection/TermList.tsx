"use client";

import { TermCollectionHeader } from "./TermCollectionHeader";
import { FC, useState } from "react";
import { useMediaQuery } from "@mui/material";
import theme from "@/theme";
import { TermWithUserInfo } from "@/types/collectionTypes";
import { TableCollection } from "./TableCollection";
import { MobileCollection } from "./MobileCollection";
import { TermFilter } from "./TermFilter";
import { BasicHeaderForTerms } from "./BasicHeaderForTerms";
import {
  handleMarkTerm,
  handleRemoveMarkTerm,
} from "@/app/collections/handleMark";

interface TermListProps {
  title: string;
  userId: string;
  terms: TermWithUserInfo[];
  collectionId: string | null;
}

export const TermList: FC<TermListProps> = ({
  title,
  userId,
  terms,
  collectionId,
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
      checkedItems={checkedItems}
      searchValue={searchValue}
      setCheckedItems={setCheckedItems}
      setSearchValue={setSearchValue}
      isMobile={isMobile}
    />
  );

  const header = collectionId ? (
    <TermCollectionHeader
      title={title}
      userId={userId}
      filter={filter}
      collectionId={collectionId}
    />
  ) : (
    <BasicHeaderForTerms title={title} filter={filter} />
  );

  if (isMobile) {
    return (
      <MobileCollection
        userId={userId}
        header={header}
        terms={filteredTerms}
        handleMarkTerm={handleMarkTerm}
        handleRemoveMarkTerm={handleRemoveMarkTerm}
      />
    );
  }
  return (
    <TableCollection
      userId={userId}
      header={header}
      terms={filteredTerms}
      handleMarkTerm={handleMarkTerm}
      handleRemoveMarkTerm={handleRemoveMarkTerm}
    />
  );
};
