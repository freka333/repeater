import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react";
import { AddNewTermDialog } from "./actions/AddNewTermDialog";
import { AddCircle, Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { deleteCollection } from "@/app/requests/collectionRequests";
import { DeleteDialog } from "./actions/DeleteDialog";
import { RenameCollectionDialog } from "./actions/RenameCollectionDialog";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { StartLearningDialog } from "./learning/StartLearningDialog";
import {
  completionOfLearning,
  createLearningCollection,
  getLearningInProgress,
} from "@/app/requests/learningRequests";
import { paths } from "@/paths";
import { TermWithUserInfo } from "@/types/collectionTypes";
import { Languages } from "@prisma/client";

export type displayedItems = {
  Unmarked: boolean;
  Known: boolean;
  Repeatable: boolean;
};

export interface filterKeys extends displayedItems {
  Shuffle: boolean;
}

interface TermCollectionHeaderProps {
  title: string;
  userId: string;
  filter: ReactNode;
  collectionId: string;
  learningPath: string;
  hasTerm: boolean;
  terms: TermWithUserInfo[];
}

export const TermCollectionHeader: FC<TermCollectionHeaderProps> = ({
  title,
  userId,
  filter,
  collectionId,
  learningPath,
  hasTerm,
  terms,
}) => {
  const [openAddTerminalDialog, setOpenAddTerminalDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openStartLearningDialog, isOpenStartLearningDialog] = useState(false);
  const [openEmptyLearningDialog, setOpenEmptyLearningDialog] = useState(false);
  const [checkedItems, setCheckedItems] = useState<filterKeys>({
    Unmarked: true,
    Known: true,
    Repeatable: true,
    Shuffle: true,
  });
  const [sourceLanguage, setSourceLanguage] = useState<Languages>("hungarian");
  const router = useRouter();
  const [startLearnButtonDisabled, setStartLearnButtonDisabled] = useState({
    noTerm: false,
    saving: false,
  });

  useEffect(() => {
    setCheckedItems({
      Unmarked: true,
      Known: true,
      Repeatable: true,
      Shuffle: true,
    });
    setStartLearnButtonDisabled({ noTerm: false, saving: false });
  }, [terms]);

  const handleCloseAddDialog = () => {
    setOpenAddTerminalDialog(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLearningClick = async () => {
    if (hasTerm) {
      const result = await getLearningInProgress(collectionId, userId);
      if (!result.learningCollection) {
        isOpenStartLearningDialog(true);
      } else if (result.learningTerms?.length === 0) {
        await completionOfLearning(result.learningCollection.id, userId);
        isOpenStartLearningDialog(true);
      } else {
        router.push(learningPath);
      }
    } else {
      setOpenEmptyLearningDialog(true);
    }
  };

  const handleStartLearning = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setStartLearnButtonDisabled({ ...startLearnButtonDisabled, saving: true });
    await createLearningCollection({
      collectionId,
      userId,
      filter: checkedItems,
      sourceLanguage,
    });
    router.push(paths.learningCollection.path(collectionId));
  };

  const handleCloseLearningDialog = () => {
    isOpenStartLearningDialog(false);
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const items = {
      ...checkedItems,
      [event.target.name]: event.target.checked,
    };
    const filteredKeys = Object.keys(items).filter(
      (key) => items[key as keyof filterKeys]
    );
    const filteredTerms = terms.filter((item) =>
      filteredKeys.includes(item.manualState)
    );
    if (
      filteredTerms.length === 0 ||
      (!items.Known && !items.Repeatable && !items.Unmarked)
    ) {
      setStartLearnButtonDisabled({
        ...startLearnButtonDisabled,
        noTerm: true,
      });
    } else {
      setStartLearnButtonDisabled({
        ...startLearnButtonDisabled,
        noTerm: false,
      });
    }
    setCheckedItems(items);
  };

  const handleChangeSourceLanguage = (event: SelectChangeEvent<Languages>) => {
    setSourceLanguage(event.target.value as Languages);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      p={2}
      sx={{
        bgcolor: "white",
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
            collectionId={collectionId}
            userId={userId}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            onClick={handleLearningClick}
            startIcon={<LocalLibraryIcon />}
          >
            Learn
          </Button>
          <StartLearningDialog
            open={openStartLearningDialog}
            handleClose={handleCloseLearningDialog}
            checkedItems={checkedItems}
            handleChangeCheck={handleChangeCheck}
            handleStartLearning={handleStartLearning}
            startLearnButtonDisabled={startLearnButtonDisabled}
            sourceLanguage={sourceLanguage}
            handleChangeSourceLanguage={handleChangeSourceLanguage}
          />
          <Dialog
            open={openEmptyLearningDialog}
            onClose={() => {
              setOpenEmptyLearningDialog(false);
            }}
          >
            <DialogTitle>No term yet in this collection.</DialogTitle>
            <DialogContent>
              <Typography>Create terms before learning!</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenEmptyLearningDialog(false);
                }}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
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
      </Stack>
      {filter}
      <AddNewTermDialog
        open={openAddTerminalDialog}
        handleClose={handleCloseAddDialog}
        userId={userId}
        collectionId={collectionId}
      />
    </Stack>
  );
};

interface OptionsMenuProps {
  name: string;
  anchorEl: HTMLElement | null;
  handleCloseMenu: VoidFunction;
  collectionId: string;
  userId: string;
}

const OptionsMenu: FC<OptionsMenuProps> = ({
  name,
  anchorEl,
  handleCloseMenu,
  collectionId,
  userId,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleCloseRenameDialog = () => {
    setOpenRenameDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteCollection = async () => {
    setIsLoading(true);
    const result = await deleteCollection(collectionId, userId);
    const message = result.success
      ? `${name} has been successfully deleted.`
      : "Oops! Something went wrong. Please try again later.";
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      variant: result.success ? "success" : "error",
    });
    handleCloseDeleteDialog();
    setIsLoading(false);
    router.push("/");
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
        handleDelete={handleDeleteCollection}
        type="collection"
        isLoading={isLoading}
      />
    </>
  );
};
