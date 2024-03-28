import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { deleteCollection } from "@/app/actions";
import { useRouter } from "next/navigation";
import { DeleteDialog } from "./DeleteDialog";

interface CollectionOptionsProps {
  collectionId: string;
  userId: string;
  name: string;
}

export const CollectionOptions: FC<CollectionOptionsProps> = ({
  collectionId,
  userId,
  name,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openDeleteCollectionDialog, setOpenDeleteCollectionDialog] =
    useState(false);
  const router = useRouter();

  const handleCloseDelete = () => {
    setOpenDeleteCollectionDialog(false);
  };

  const handleDeleteCollection = async () => {
    await deleteCollection(collectionId, userId);
    router.push("/");
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setOpenDeleteCollectionDialog(true);
          }}
        >
          Delete collection
        </MenuItem>
      </Menu>
      <DeleteDialog
        name={name}
        open={openDeleteCollectionDialog}
        handleClose={handleCloseDelete}
        handleDelete={handleDeleteCollection}
        type="collection"
      />
    </>
  );
};
