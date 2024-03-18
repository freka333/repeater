"use client";

import { TermMark } from "@prisma/client";
import { IrregularVerbWithUserInfo } from "@/types/collectionTypes";
import { FC, useState } from "react";
import { useMediaQuery } from "@mui/material";
import theme from "@/theme";
import { TermFilter } from "./TermFilter";
import { paths } from "@/paths";
import { MobileCollection } from "./MobileCollection";
import { TableCollection } from "./TableCollection";

interface IrregularVerbListProps {
  verbs: IrregularVerbWithUserInfo[];
  userId: string;
  handleMarkVerb: (
    verbId: string,
    userId: string,
    mark: TermMark
  ) => Promise<void>;
  handleRemoveMarkVerb: (verbId: string, userId: string) => Promise<void>;
}

export const IrregularVerbList: FC<IrregularVerbListProps> = ({
  verbs,
  userId,
  handleMarkVerb,
  handleRemoveMarkVerb,
}) => {
  const [checkedItems, setCheckedItems] = useState({
    Unmarked: true,
    Known: true,
    Repeatable: true,
  });
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredVerbs = verbs.filter(
    (item) =>
      checkedItems[item.manualState] &&
      [item.enV1, item.enV2, item.enV3, item.hungarian].some((value) =>
        value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
  );

  const filter = (
    <TermFilter
      title={paths.irregularVerbs.name}
      checkedItems={checkedItems}
      searchValue={searchValue}
      setCheckedItems={setCheckedItems}
      setSearchValue={setSearchValue}
    />
  );
  if (isMobile) {
    return (
      <MobileCollection
        terms={filteredVerbs}
        userId={userId}
        filter={filter}
        handleMarkTerm={handleMarkVerb}
        handleRemoveMarkTerm={handleRemoveMarkVerb}
      />
    );
  }
  return (
    <TableCollection
      terms={filteredVerbs}
      userId={userId}
      filter={filter}
      handleMarkTerm={handleMarkVerb}
      handleRemoveMarkTerm={handleRemoveMarkVerb}
    />
  );
};
