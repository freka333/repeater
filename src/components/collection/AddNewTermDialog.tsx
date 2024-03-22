import { addTermToCollection } from "@/app/actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  Dispatch,
  FC,
  FormEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
      <AddNewTermsDialogInner
        hungarian={hungarian}
        english={english}
        setHungarian={setHungarian}
        setEnglish={setEnglish}
        handleClose={handleClose}
        inputRef={inputRef}
      />
    </Dialog>
  );
};

interface AddNewTermsDialogInner {
  hungarian: string;
  english: string;
  setHungarian: Dispatch<SetStateAction<string>>;
  setEnglish: Dispatch<SetStateAction<string>>;
  handleClose: VoidFunction;
  inputRef: RefObject<HTMLInputElement>;
}

const AddNewTermsDialogInner: FC<AddNewTermsDialogInner> = ({
  hungarian,
  english,
  setHungarian,
  setEnglish,
  handleClose,
  inputRef,
}) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
  return (
    <>
      <DialogTitle>Add new term</DialogTitle>
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
        <Button type="submit">Save and add next</Button>
      </DialogActions>
    </>
  );
};
