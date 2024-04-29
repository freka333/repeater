import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { FC } from "react";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Languages } from "@prisma/client";

interface StartLearningDialogProps {
  open: boolean;
  handleStartLearning: (event: React.FormEvent<HTMLFormElement>) => void;
  checkedItems: {
    Unmarked: boolean;
    Known: boolean;
    Repeatable: boolean;
    Shuffle: boolean;
  };
  handleChangeCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: VoidFunction;
  startLearnButtonDisabled: {
    noTerm: boolean;
    saving: boolean;
  };
  sourceLanguage: Languages;
  handleChangeSourceLanguage: (event: SelectChangeEvent<Languages>) => void;
}

export const StartLearningDialog: FC<StartLearningDialogProps> = ({
  open,
  handleStartLearning,
  checkedItems,
  handleChangeCheck,
  handleClose,
  startLearnButtonDisabled,
  sourceLanguage,
  handleChangeSourceLanguage,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            maxWidth: "350px",
          },
        },
      }}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
          handleStartLearning(event),
      }}
    >
      <DialogTitle>Start Learning</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <FormControl component="fieldset" sx={{ gap: "0.5rem" }}>
          <FormLabel>Choose what you want to learn!</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={checkedItems.Unmarked}
                  onChange={handleChangeCheck}
                  name="Unmarked"
                />
              }
              label={
                <Stack direction="row" gap={1}>
                  <QuestionMarkIcon
                    fontSize="small"
                    sx={{ color: "#8b8b8b" }}
                  />
                  <Typography>Unmarked</Typography>
                </Stack>
              }
              labelPlacement="start"
              sx={{ justifyContent: "space-between" }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={checkedItems.Known}
                  onChange={handleChangeCheck}
                  name="Known"
                />
              }
              label={
                <Stack direction="row" gap={1}>
                  <SpellcheckIcon fontSize="small" sx={{ color: "#33a314" }} />
                  <Typography>Known</Typography>
                </Stack>
              }
              labelPlacement="start"
              sx={{ justifyContent: "space-between" }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={checkedItems.Repeatable}
                  onChange={handleChangeCheck}
                  name="Repeatable"
                />
              }
              label={
                <Stack direction="row" gap={1}>
                  <WhatshotIcon fontSize="small" sx={{ color: "#eb3434" }} />
                  <Typography>Repeatable</Typography>
                </Stack>
              }
              labelPlacement="start"
              sx={{ justifyContent: "space-between" }}
            />
            <Divider sx={{ my: 1 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={checkedItems.Shuffle}
                  onChange={handleChangeCheck}
                  name="Shuffle"
                />
              }
              label="Shuffle terms"
              labelPlacement="start"
              sx={{ justifyContent: "space-between" }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Source language</InputLabel>
              <Select
                value={sourceLanguage}
                onChange={(event) => {
                  handleChangeSourceLanguage(event);
                }}
                label="Source language"
                displayEmpty
              >
                <MenuItem value="hungarian">Hungarian</MenuItem>
                <MenuItem value="english">English</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </FormControl>
        <Box sx={(theme) => ({ height: theme.typography.subtitle1.fontSize })}>
          <Typography variant="subtitle1" color="red">
            {startLearnButtonDisabled.noTerm && "No term found for filtering."}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={Object.values(startLearnButtonDisabled).some(Boolean)}
        >
          Start Learn
        </Button>
      </DialogActions>
    </Dialog>
  );
};
