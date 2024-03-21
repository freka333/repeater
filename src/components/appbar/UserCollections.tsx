import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { paths } from "@/paths";
import AddIcon from "@mui/icons-material/Add";
import { TermCollection } from "@prisma/client";
import { createCollection } from "@/app/actions";
import { useRouter } from "next/navigation";

const menuItems = [paths.allUserTerms];

export const UserCollections = ({
  collections,
  userId,
}: {
  collections: TermCollection[] | undefined;
  userId: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const collectionId = await createCollection(newCollectionName, userId);
    setNewCollectionName("");
    setOpenDialog(false);
    router.push(paths.collection.path(collectionId));
  };

  return (
    <>
      <Button
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "white" }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        Collections
      </Button>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        disableScrollLock
      >
        {collections?.map((collection, i) => (
          <MenuItem
            key={i}
            component={Link}
            href={paths.collection.path(collection.id)}
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            <Typography>{collection.name}</Typography>
          </MenuItem>
        ))}
        {menuItems.map((item, i) => (
          <MenuItem
            key={i}
            component={Link}
            href={item.path}
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            <Typography>{item.name}</Typography>
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            setOpenDialog(true);
            setAnchorEl(null);
          }}
        >
          <AddIcon />
          <Typography>Create new collection </Typography>
        </MenuItem>
      </Menu>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
            handleSubmit(event),
        }}
      >
        <DialogTitle>Create new collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a name for a new collection!
          </DialogContentText>
          <TextField
            value={newCollectionName}
            onChange={(e) => {
              setNewCollectionName(e.target.value);
            }}
            autoFocus
            required
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
