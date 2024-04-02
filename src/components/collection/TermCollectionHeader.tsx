import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { AddNewTermDialog } from "./AddNewTermDialog";
import { AddCircle, Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { deleteCollection } from "@/app/actions";
import { DeleteDialog } from "./actions/DeleteDialog";
import { RenameCollectionDialog } from "./actions/RenameCollectionDialog";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export type displayedItems = {
  Unmarked: boolean;
  Known: boolean;
  Repeatable: boolean;
};

interface TermCollectionHeaderProps {
  title: string;
  userId: string;
  filter: ReactNode;
  collectionId: string;
}

export const TermCollectionHeader: FC<TermCollectionHeaderProps> = ({
  title,
  userId,
  filter,
  collectionId,
}) => {
  const [openAddTerminalDialog, setOpenAddTerminalDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleCloseAddDialog = () => {
    setOpenAddTerminalDialog(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteCollection = async () => {
    const result = await deleteCollection(collectionId, userId);
    const message = result.success
      ? `${title} has been successfully deleted.`
      : "Oops! Something went wrong. Please try again later.";
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      variant: result.success ? "success" : "error",
    });
    router.push("/");
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} gap={2}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="h6" textAlign={{ xs: "center", sm: "left" }}>
            {title}
          </Typography>
          <IconButton
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            <MoreHoriz />
          </IconButton>
          <OptionsMenu
            anchorEl={anchorEl}
            name={title}
            handleCloseMenu={handleCloseMenu}
            handleDeleteItem={handleDeleteCollection}
            collectionId={collectionId}
            userId={userId}
          />
        </Stack>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenAddTerminalDialog(true);
          }}
          startIcon={<AddCircle />}
        >
          Add new term
        </Button>
      </Stack>
      {filter}
      <AddNewTermDialog
        open={openAddTerminalDialog}
        handleClose={handleCloseAddDialog}
        userId={userId}
        collectionId={collectionId}
      />
    </Box>
  );
};

interface OptionsMenuProps {
  name: string;
  anchorEl: HTMLElement | null;
  handleCloseMenu: VoidFunction;
  handleDeleteItem: () => Promise<void>;
  collectionId: string;
  userId: string;
}

const OptionsMenu: FC<OptionsMenuProps> = ({
  name,
  anchorEl,
  handleCloseMenu,
  handleDeleteItem,
  collectionId,
  userId,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);

  const handleCloseRenameDialog = () => {
    setOpenRenameDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        disableScrollLock
      >
        <MenuItem
          onClick={() => {
            setOpenRenameDialog(true);
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteDialog(true);
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete collection</ListItemText>
        </MenuItem>
      </Menu>
      <RenameCollectionDialog
        name={name}
        open={openRenameDialog}
        handleClose={handleCloseRenameDialog}
        collectionId={collectionId}
        userId={userId}
      />
      <DeleteDialog
        name={name}
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDeleteItem}
        type="collection"
      />
    </>
  );
};
