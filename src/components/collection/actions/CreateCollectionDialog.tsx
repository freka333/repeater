import { createCollection } from "@/app/actions";
import { paths } from "@/paths";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface CreateCollectionDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  userId: string;
}

export const CreateCollectionDialog: FC<CreateCollectionDialogProps> = ({
  open,
  handleClose,
  userId,
}) => {
  const [collectionName, setCollectionName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const collectionId = await createCollection(collectionName, userId);
    setCollectionName("");
    handleClose();
    router.push(paths.collection.path(collectionId));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(event),
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogInner
        collectionName={collectionName}
        inputRef={inputRef}
        setCollectionName={setCollectionName}
        handleClose={handleClose}
      />
    </Dialog>
  );
};

interface DialogInnerProps {
  collectionName: string;
  setCollectionName: Dispatch<SetStateAction<string>>;
  handleClose: VoidFunction;
  inputRef: RefObject<HTMLInputElement>;
}
const DialogInner: FC<DialogInnerProps> = ({
  collectionName,
  setCollectionName,
  handleClose,
  inputRef,
}) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <>
      <DialogTitle>Create new collection</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose a name for a new collection!
        </DialogContentText>
        <TextField
          value={collectionName}
          onChange={(e) => {
            setCollectionName(e.target.value);
          }}
          autoFocus
          required
          type="text"
          fullWidth
          inputRef={inputRef}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};