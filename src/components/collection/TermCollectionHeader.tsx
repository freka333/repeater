import { Box, Button, Stack, Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { AddNewTermDialog } from "./AddNewTermDialog";
import { AddCircle } from "@mui/icons-material";
import { CollectionOptions } from "./actions/CollectionOptions";

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

  const handleCloseAddDialog = () => {
    setOpenAddTerminalDialog(false);
  };

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
      <Stack direction={{ xs: "column", md: "row" }} gap={2}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" textAlign={{ xs: "center", sm: "left" }}>
            {title}
          </Typography>
          <CollectionOptions
            collectionId={collectionId}
            userId={userId}
            name={title}
          />
        </Stack>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenAddTerminalDialog(true);
          }}
          startIcon={<AddCircle />}
        >
          Add new term
        </Button>
      </Stack>
      {filter}
      <AddNewTermDialog
        open={openAddTerminalDialog}
        handleClose={handleCloseAddDialog}
        userId={userId}
        collectionId={collectionId}
      />
    </Box>
  );
};
