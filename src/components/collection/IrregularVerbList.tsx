"use client";

import { IrregularVerbWithUserInfo } from "@/types/collectionTypes";
import { FC, useState } from "react";
import { useMediaQuery } from "@mui/material";
import theme from "@/theme";
import { paths } from "@/paths";
import { MobileCollection } from "./MobileCollection";
import { TableCollection } from "./TableCollection";
import { TermFilter } from "./TermFilter";
import { BasicHeaderForTerms } from "./BasicHeaderForTerms";
import {
  handleMarkVerb,
  handleRemoveMarkVerb,
} from "@/app/requests/termRequests";

interface IrregularVerbListProps {
  verbs: IrregularVerbWithUserInfo[];
  userId: string;
}

export const IrregularVerbList: FC<IrregularVerbListProps> = ({
  verbs,
  userId,
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

  const header = (
    <BasicHeaderForTerms
      title={paths.irregularVerbs.name}
      filter={
        <TermFilter
          checkedItems={checkedItems}
          searchValue={searchValue}
          setCheckedItems={setCheckedItems}
          setSearchValue={setSearchValue}
          isMobile={isMobile}
        />
      }
    />
  );
  if (isMobile) {
    return (
      <MobileCollection
        terms={filteredVerbs}
        userId={userId}
        header={header}
        handleMarkTerm={handleMarkVerb}
        handleRemoveMarkTerm={handleRemoveMarkVerb}
      />
    );
  }
  return (
    <TableCollection
      terms={filteredVerbs}
      userId={userId}
      header={header}
      handleMarkTerm={handleMarkVerb}
      handleRemoveMarkTerm={handleRemoveMarkVerb}
    />
  );
};
