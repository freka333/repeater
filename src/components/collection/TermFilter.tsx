import { Clear } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { displayedItems } from "./TermCollectionHeader";

interface TermFilterProps {
  checkedItems: displayedItems;
  searchValue: string;
  setCheckedItems: Dispatch<SetStateAction<displayedItems>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  isMobile: boolean;
}

export const TermFilter: FC<TermFilterProps> = ({
  checkedItems,
  setCheckedItems,
  searchValue,
  setSearchValue,
  isMobile,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const filteredElementsCount = Object.values(checkedItems).filter(
    (item) => item
  ).length;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Badge
        color="secondary"
        badgeContent={filteredElementsCount}
        showZero
        invisible={filteredElementsCount === 3}
      >
        {isMobile ? (
          <IconButton
            sx={{ color: "greyColor.dark" }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            <FilterListIcon fontSize="large" />
          </IconButton>
        ) : (
          <Button
            startIcon={
              <FilterListIcon
                color={filteredElementsCount < 3 ? "secondary" : "inherit"}
              />
            }
            sx={{ color: "greyColor.dark" }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            Filter
          </Button>
        )}
      </Badge>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        disableScrollLock
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <FormGroup sx={{ p: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Unmarked}
                onChange={(e) => {
                  setCheckedItems((checkedItems) => ({
                    ...checkedItems,
                    Unmarked: e.target.checked,
                  }));
                }}
              />
            }
            label="Unmarked"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Known}
                onChange={(e) => {
                  setCheckedItems((checkedItems) => ({
                    ...checkedItems,
                    Known: e.target.checked,
                  }));
                }}
              />
            }
            label="Known"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.Repeatable}
                onChange={(e) => {
                  setCheckedItems((checkedItems) => ({
                    ...checkedItems,
                    Repeatable: e.target.checked,
                  }));
                }}
              />
            }
            label="Repeatable"
          />
        </FormGroup>
      </Popover>
      <FormControl sx={{ flex: 1 }}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          value={searchValue}
          sx={{
            "& .MuiInputBase-input": {
              padding: { xs: "0.75rem", sm: "0.5rem" },
              fontSize: { xs: "large" },
            },
          }}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={[
                  !searchValue && { visibility: "hidden" },
                  { cursor: "pointer" },
                ]}
              >
                <Clear
                  onClick={() => {
                    setSearchValue("");
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
};
