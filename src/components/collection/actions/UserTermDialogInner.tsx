import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Dispatch, FC, RefObject, SetStateAction, useEffect } from "react";

interface UserTermDialogInnerProps {
  handleClose: VoidFunction;
  inputRef: RefObject<HTMLInputElement>;
  title: string;
  saveButtonText: string;
  isLoading: boolean;
  termInfo: {
    hungarian: string;
    english: string;
  };
  setTermInfo: Dispatch<
    SetStateAction<{
      hungarian: string;
      english: string;
    }>
  >;
}

export const UserTermDialogInner: FC<UserTermDialogInnerProps> = ({
  handleClose,
  inputRef,
  title,
  saveButtonText,
  isLoading,
  termInfo,
  setTermInfo,
}) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Hungarian</DialogContentText>
        <TextField
          fullWidth
          value={termInfo.hungarian}
          onChange={(e) => {
            setTermInfo({ ...termInfo, hungarian: e.target.value });
          }}
          required
          type="text"
          name="hungarian"
          inputRef={inputRef}
        />
        <DialogContentText sx={{ mt: 2 }}>English</DialogContentText>
        <TextField
          fullWidth
          value={termInfo.english}
          onChange={(e) => {
            setTermInfo({ ...termInfo, english: e.target.value });
          }}
          required
          type="text"
          name="english"
        />
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {saveButtonText}
        </Button>
      </DialogActions>
    </>
  );
};
