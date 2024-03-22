import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import theme from "@/theme";
import { AddNewTermDialog } from "./AddNewTermDialog";

export type displayedItems = {
  Unmarked: boolean;
  Known: boolean;
  Repeatable: boolean;
};

interface TermCollectionHeaderProps {
  title: string;
  userId: string;
  filter: ReactNode;
  collectionId: string;
}

export const TermCollectionHeader: FC<TermCollectionHeaderProps> = ({
  title,
  userId,
  filter,
  collectionId,
}) => {
  const [openAddTerminalDialog, setOpenAddTerminalDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenAddTerminalDialog(false);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      <Stack direction={isMobile ? "column" : "row"} gap={2}>
        <Typography variant="h6" textAlign={isMobile ? "center" : "left"}>
          {title}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenAddTerminalDialog(true);
          }}
        >
          Add new term
        </Button>
        <AddNewTermDialog
          open={openAddTerminalDialog}
          handleClose={handleCloseDialog}
          userId={userId}
          collectionId={collectionId}
        />
      </Stack>
      {filter}
    </Box>
  );
};
