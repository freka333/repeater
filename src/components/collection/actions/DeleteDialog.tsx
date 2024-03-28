import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

interface DeleteDialogProps {
  name: string;
  open: boolean;
  type: string;
  handleClose: VoidFunction;
  handleDelete: VoidFunction;
}

export const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleDelete,
  name,
  type,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete {name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {type}? You won&apos;t be able to
          revert this.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
