import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { paths } from "@/paths";

const menuItems = [paths.irregularVerbs, paths.allUserTerms];

export const UserCollections = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "white" }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        Collections
      </Button>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        disableScrollLock
      >
        {menuItems.map((item, i) => (
          <MenuItem
            key={i}
            component={Link}
            href={item.path}
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            <Typography>{item.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
