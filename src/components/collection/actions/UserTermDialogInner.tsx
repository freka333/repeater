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
  hungarian: string;
  english: string;
  setHungarian: Dispatch<SetStateAction<string>>;
  setEnglish: Dispatch<SetStateAction<string>>;
  handleClose: VoidFunction;
  inputRef: RefObject<HTMLInputElement>;
  title: string;
  saveButtonText: string;
}

export const UserTermDialogInner: FC<UserTermDialogInnerProps> = ({
  hungarian,
  english,
  setHungarian,
  setEnglish,
  handleClose,
  inputRef,
  title,
  saveButtonText,
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
          value={hungarian}
          onChange={(e) => {
            setHungarian(e.target.value);
          }}
          required
          type="text"
          name="hungarian"
          inputRef={inputRef}
        />
        <DialogContentText>English</DialogContentText>
        <TextField
          fullWidth
          value={english}
          onChange={(e) => {
            setEnglish(e.target.value);
          }}
          required
          type="text"
          name="english"
        />
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">{saveButtonText}</Button>
      </DialogActions>
    </>
  );
};
