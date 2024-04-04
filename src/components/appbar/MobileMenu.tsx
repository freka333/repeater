import { paths } from "@/paths";
import { Add, Menu } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TermCollection } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { CreateCollectionDialog } from "../collection/actions/CreateCollectionDialog";

export const MobileMenu = ({
  collections,
  userId,
}: {
  collections: TermCollection[] | undefined;
  userId: string;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };
  return (
    <>
      <IconButton color="inherit" onClick={handleOpenMenu}>
        <Menu />
      </IconButton>
      <Drawer open={openMenu} onClose={handleCloseMenu}>
        <List>
          <ListItem>
            <ListItemButton
              component={Link}
              href={paths.irregularVerbs.path}
              sx={{ padding: 0 }}
            >
              <ListItemText>{paths.irregularVerbs.name}</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          {collections?.map((collection, i) => (
            <ListItem key={i}>
              <ListItemButton
                component={Link}
                href={paths.collection.path(collection.id)}
                sx={{ padding: 0 }}
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <ListItemText>{collection.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem>
            <ListItemButton
              sx={{ padding: 0 }}
              onClick={() => {
                setOpenMenu(false);
                setOpenCreateDialog(true);
              }}
            >
              <ListItemIcon sx={{ minWidth: "2rem" }}>
                <Add />
              </ListItemIcon>
              <ListItemText>Create new collection</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <CreateCollectionDialog
        open={openCreateDialog}
        handleClose={handleCloseCreateDialog}
        userId={userId}
      />
    </>
  );
};
