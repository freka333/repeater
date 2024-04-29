import { addTermToCollection } from "@/app/requests/termRequests";
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
  const [termInfo, setTermInfo] = useState({
    hungarian: "",
    english: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await addTermToCollection(
      userId,
      termInfo.hungarian,
      termInfo.english,
      collectionId
    );
    const message = result.success
      ? `The term ${termInfo.hungarian} - ${termInfo.english} has been successfully created.`
      : "Oops! Something went wrong. Please try again later.";
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      variant: result.success ? "success" : "error",
    });
    router.refresh();
    setTermInfo({ hungarian: "", english: "" });
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
        handleClose={handleClose}
        inputRef={inputRef}
        title="Add new term"
        saveButtonText="Save and add next"
        isLoading={isLoading}
        termInfo={termInfo}
        setTermInfo={setTermInfo}
      />
    </Dialog>
  );
};
