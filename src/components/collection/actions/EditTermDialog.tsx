import { Dialog } from "@mui/material";
import { FC, FormEvent, useRef, useState } from "react";
import { updateTerm } from "@/app/actions";
import { UserTermDialogInner } from "./UserTermDialogInner";

interface EditTermDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  defaultHungarian: string;
  defaultEnglish: string;
  termId: string;
  userId: string;
}

export const EditTermDialog: FC<EditTermDialogProps> = ({
  open,
  handleClose,
  defaultHungarian,
  defaultEnglish,
  termId,
  userId,
}) => {
  const [hungarian, setHungarian] = useState(defaultHungarian);
  const [english, setEnglish] = useState(defaultEnglish);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTerm(userId, termId, hungarian, english);
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(event),
      }}
    >
      <UserTermDialogInner
        hungarian={hungarian}
        english={english}
        setHungarian={setHungarian}
        setEnglish={setEnglish}
        title="Edit term"
        handleClose={handleClose}
        inputRef={inputRef}
        saveButtonText="Save changes"
      />
    </Dialog>
  );
};
