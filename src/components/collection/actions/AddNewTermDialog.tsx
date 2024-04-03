import { addTermToCollection } from "@/app/actions";
import { Dialog } from "@mui/material";
import { FC, FormEvent, useRef, useState } from "react";
import { UserTermDialogInner } from "./UserTermDialogInner";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

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
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await addTermToCollection(
      userId,
      hungarian,
      english,
      collectionId
    );
    const message = result.success
      ? `The term ${hungarian} - ${english} has been successfully created.`
      : "Oops! Something went wrong. Please try again later.";
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      variant: result.success ? "success" : "error",
    });
    router.refresh();
    setHungarian("");
    setEnglish("");
    setIsLoading(false);
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
        isLoading={isLoading}
      />
    </Dialog>
  );
};
