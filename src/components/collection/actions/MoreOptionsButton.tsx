import { deleteTerm } from "@/app/actions";
import theme from "@/theme";
import { TermWithUserInfo } from "@/types/collectionTypes";
import { MoreHoriz, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { FC, useState } from "react";
import { EditTermDialog } from "./EditTermDialog";
import { DeleteDialog } from "./DeleteDialog";

interface MoreOptionsButtonProps {
  term: TermWithUserInfo;
  userId: string;
  sx?: SxProps;
}

export const MoreOptionsButton: FC<MoreOptionsButtonProps> = ({
  term,
  userId,
  sx,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDeleteTerm = async () => {
    await deleteTerm(userId, term.id);
  };

  const handleAnchor = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MoreButton isMobile={isMobile} sx={sx} handleAnchor={handleAnchor} />
      <OptionsMenu
        anchorEl={anchorEl}
        name={`${term.hungarian} - ${term.english} term`}
        handleCloseMenu={handleCloseMenu}
        handleDeleteItem={handleDeleteTerm}
        term={term}
        userId={userId}
      />
    </>
  );
};

const MoreButton = ({
  isMobile,
  sx,
  handleAnchor,
}: {
  isMobile: boolean;
  sx?: SxProps;
  handleAnchor: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  if (isMobile) {
    return (
      <IconButton
        sx={sx}
        onClick={(e) => {
          handleAnchor(e);
        }}
      >
        <MoreHoriz fontSize="large" />
      </IconButton>
    );
  }

  return (
    <Tooltip title="More options">
      <IconButton
        onClick={(e) => {
          handleAnchor(e);
        }}
      >
        <MoreVert />
      </IconButton>
    </Tooltip>
  );
};

interface OptionsMenuProps {
  name: string;
  anchorEl: HTMLElement | null;
  handleCloseMenu: VoidFunction;
  handleDeleteItem: () => Promise<void>;
  term: TermWithUserInfo;
  userId: string;
}

const OptionsMenu: FC<OptionsMenuProps> = ({
  name,
  anchorEl,
  handleCloseMenu,
  handleDeleteItem,
  term,
  userId,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
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
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock
      >
        <MenuItem
          onClick={() => {
            setOpenEditDialog(true);
            handleCloseMenu();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteDialog(true);
            handleCloseMenu();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <EditTermDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        defaultHungarian={term.hungarian}
        defaultEnglish={term.english}
        termId={term.id}
        userId={userId}
      />
      <DeleteDialog
        name={name}
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDeleteItem}
        type="term"
      />
    </>
  );
};
