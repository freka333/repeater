import { deleteTerm } from "@/app/actions";
import theme from "@/theme";
import { TermWithUserInfo } from "@/types/collectionTypes";
import { MoreHoriz, MoreVert } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { FC, useState } from "react";

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
      <Dialog open={openDeleteDialog} onClose={handleCloseDelete} maxWidth="sm">
        <DialogTitle>
          Delete{" "}
          <strong>
            {term.hungarian} - {term.english}
          </strong>{" "}
          term
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this term? You won&apos;t be able to
            revert this.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteItem}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
