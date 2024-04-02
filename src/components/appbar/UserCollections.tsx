import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { paths } from "@/paths";
import AddIcon from "@mui/icons-material/Add";
import { TermCollection } from "@prisma/client";
import { CreateCollectionDialog } from "../collection/actions/CreateCollectionDialog";

const menuItems = [paths.allUserTerms];

export const UserCollections = ({
  collections,
  userId,
}: {
  collections: TermCollection[] | undefined;
  userId: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseCreateDialog = () => {
    setOpenDialog(false);
  };

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
        {collections?.map((collection, i) => (
          <MenuItem
            key={i}
            component={Link}
            href={paths.collection.path(collection.id)}
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            <Typography>{collection.name}</Typography>
          </MenuItem>
        ))}
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
        <MenuItem
          onClick={() => {
            setOpenDialog(true);
            setAnchorEl(null);
          }}
        >
          <AddIcon />
          <Typography>Create new collection</Typography>
        </MenuItem>
      </Menu>
      <CreateCollectionDialog
        open={openDialog}
        handleClose={handleCloseCreateDialog}
        userId={userId}
      />
    </>
  );
};
