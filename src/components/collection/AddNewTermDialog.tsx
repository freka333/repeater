import { addTermToCollection } from "@/app/actions";
import { Dialog } from "@mui/material";
import { FC, FormEvent, useRef, useState } from "react";
import { UserTermDialogInner } from "./actions/UserTermDialogInner";

interface AddNewTermDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  userId: string;
  collectionId: string;
}
export const AddNewTermDialog: FC<AddNewTermDialogProps> = ({
  open,
  handleClose,
  userId,
  collectionId,
}) => {
  const [hungarian, setHungarian] = useState("");
  const [english, setEnglish] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addTermToCollection(userId, hungarian, english, collectionId);
    setHungarian("");
    setEnglish("");
    inputRef.current?.focus();
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
        handleClose={handleClose}
        inputRef={inputRef}
        title="Add new term"
        saveButtonText="Save and add next"
      />
    </Dialog>
  );
};
