import { Dialog } from "@mui/material";
import { FC, FormEvent, useRef, useState } from "react";
import { updateTerm } from "@/app/actions";
import { UserTermDialogInner } from "./UserTermDialogInner";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

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
  const [termInfo, setTermInfo] = useState({
    hungarian: defaultHungarian,
    english: defaultEnglish,
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await updateTerm(
      userId,
      termId,
      termInfo.hungarian,
      termInfo.english
    );
    const message = result.success
      ? "The term has been successfully modified."
      : "Oops! Something went wrong. Please try again later.";
    enqueueSnackbar(message, {
      autoHideDuration: 3000,
      variant: result.success ? "success" : "error",
    });
    handleClose();
    setIsLoading(false);
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
        onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(event),
      }}
    >
      <UserTermDialogInner
        title="Edit term"
        handleClose={handleClose}
        inputRef={inputRef}
        saveButtonText="Save changes"
        isLoading={isLoading}
        termInfo={termInfo}
        setTermInfo={setTermInfo}
      />
    </Dialog>
  );
};
