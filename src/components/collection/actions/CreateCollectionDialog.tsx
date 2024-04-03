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
import { useSnackbar } from "notistack";
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
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await createCollection(collectionName, userId);
    const message = result.success
      ? `${collectionName} successfully created.`
      : "Oops! Something went wrong. Please try again later.";
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      variant: result.success ? "success" : "error",
    });
    setCollectionName("");
    handleClose();
    setIsLoading(false);
    if (result.success) {
      router.push(paths.collection.path(result.collectionId!));
    }
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
        isLoading={isLoading}
      />
    </Dialog>
  );
};

interface DialogInnerProps {
  collectionName: string;
  setCollectionName: Dispatch<SetStateAction<string>>;
  handleClose: VoidFunction;
  inputRef: RefObject<HTMLInputElement>;
  isLoading: boolean;
}
const DialogInner: FC<DialogInnerProps> = ({
  collectionName,
  setCollectionName,
  handleClose,
  inputRef,
  isLoading,
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
          margin="dense"
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};
