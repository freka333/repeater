import { renameCollection } from "@/app/actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
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

interface RenameCollectionDialogProps {
  name: string;
  open: boolean;
  handleClose: VoidFunction;
  collectionId: string;
  userId: string;
}

export const RenameCollectionDialog: FC<RenameCollectionDialogProps> = ({
  name,
  open,
  handleClose,
  collectionId,
  userId,
}) => {
  const [collectionName, setCollectionName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleRename = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await renameCollection(collectionId, userId, collectionName);
    const message = result.success
      ? "Successful renaming."
      : "Oops! Something went wrong. Please try again later.";
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      variant: result.success ? "success" : "error",
    });
    handleClose();
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          handleRename(event);
        },
      }}
    >
      <DialogInner
        collectionName={collectionName}
        handleClose={handleClose}
        setCollectionName={setCollectionName}
        inputRef={inputRef}
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
      <DialogTitle>Rename</DialogTitle>
      <DialogContent>
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
          <Button type="submit">Save</Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};
