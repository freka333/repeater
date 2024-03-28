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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteItem = async () => {
    await deleteTerm(userId, term.id);
  };

  const handleAnchor = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <MoreButton isMobile={isMobile} sx={sx} handleAnchor={handleAnchor} />
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock
      >
        <MenuItem
          onClick={() => {
            setOpenDeleteDialog(true);
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <DeleteDialog
        open={openDeleteDialog}
        handleClose={handleCloseDelete}
        name={`${term.hungarian} - ${term.english} term`}
        type="term"
        handleDelete={handleDeleteItem}
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
