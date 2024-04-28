import { MoreHoriz } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { LearningTermStatus, TermMark } from "@prisma/client";
import { FC, useState } from "react";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import WhatshotIcon from "@mui/icons-material/Whatshot";

interface CustomButtonProps {
  status: "stillLearning" | "gotIt";
}

const defaultCustomButtonStyle = (status: "stillLearning" | "gotIt") => ({
  backgroundColor: status === "stillLearning" ? "#f7ecee" : "#ecf4f0",
  color: status === "stillLearning" ? "#5d1324" : "#15502e",
});

const CustomButton = styled(Button)<CustomButtonProps>(({ theme, status }) => ({
  flexGrow: 1,
  py: "1rem",
  fontSize: "1.2rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
  ...defaultCustomButtonStyle(status),
  border: "1px solid #c3cbcb",
  fontWeight: "bold",
  padding: "1rem",
  "&:hover": {
    backgroundColor: status === "stillLearning" ? "#eedde0" : "#dcf1e7",
  },
  "&:disabled": {
    ...defaultCustomButtonStyle(status),
  },
}));

interface LearningCardProps {
  term: string;
  termIndex: number;
  termCount: number;
  mark: TermMark | null;
  handleSetStatus: (status: LearningTermStatus) => Promise<void>;
  handleChangeLanguage: VoidFunction;
  handleChangeMark: (mark: TermMark | null) => void;
  disabledStatusButtons: boolean;
}

export const LearningCard: FC<LearningCardProps> = ({
  handleSetStatus,
  term,
  termIndex,
  termCount,
  handleChangeLanguage,
  mark,
  handleChangeMark,
  disabledStatusButtons,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "54rem",
      }}
    >
      <CardHeader
        title={`${termIndex + 1}/${termCount}`}
        titleTypographyProps={{ textAlign: "center", fontSize: "1.15rem" }}
        action={
          <IconButton
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            <MoreHoriz fontSize="large" />
          </IconButton>
        }
      />
      <OptionsMenu
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        mark={mark}
        handleMark={handleChangeMark}
      />
      <CardContent
        onClick={handleChangeLanguage}
        sx={{
          height: "24rem",
          textAlign: "center",
        }}
      >
        <Stack height="100%" justifyContent="center">
          <Typography variant="h3">{term}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <CustomButton
          status="stillLearning"
          disabled={disabledStatusButtons}
          disableRipple
          onClick={() => {
            handleSetStatus("StillLearning");
          }}
        >
          Still learning
        </CustomButton>
        <CustomButton
          status="gotIt"
          disabled={disabledStatusButtons}
          disableRipple
          onClick={() => {
            handleSetStatus("GotIt");
          }}
        >
          Got it!
        </CustomButton>
      </CardActions>
    </Card>
  );
};

interface OptionsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: VoidFunction;
  mark: TermMark | null;
  handleMark: (mark: TermMark | null) => void;
}

const OptionsMenu: FC<OptionsMenuProps> = ({
  onClose,
  anchorEl,
  mark,
  handleMark,
}) => {
  return (
    <Menu
      open={!!anchorEl}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      disableScrollLock
      sx={{ ".MuiList-root": { py: "0.5rem", gap: 1 } }}
    >
      {mark === "Known" ? (
        <MarkedMenuItem mark="Known" handleMark={handleMark} />
      ) : (
        <UnmarkedMenuItem mark="Known" handleMark={handleMark} />
      )}
      {mark === "Repeatable" ? (
        <MarkedMenuItem mark="Repeatable" handleMark={handleMark} />
      ) : (
        <UnmarkedMenuItem mark="Repeatable" handleMark={handleMark} />
      )}
    </Menu>
  );
};

interface MenuItemProps {
  mark: TermMark;
  handleMark: (mark: TermMark | null) => void;
}

const MarkedMenuItem: FC<MenuItemProps> = ({ mark, handleMark }) => {
  return (
    <MenuItem
      sx={{
        bgcolor: `${mark.toLowerCase()}Term.light`,
        mx: "0.5rem",
        borderRadius: "4px",
        "&:hover": {
          bgcolor: `${mark.toLowerCase()}Term.greyish`,
        },
      }}
      onClick={() => handleMark(null)}
    >
      <ListItemIcon>
        {mark === "Known" ? (
          <SpellcheckIcon sx={{ color: "knownTerm.main" }} />
        ) : (
          <WhatshotIcon sx={{ color: "repeatableTerm.main" }} />
        )}
      </ListItemIcon>
      <ListItemText>You marked it {mark}</ListItemText>
    </MenuItem>
  );
};

const UnmarkedMenuItem: FC<MenuItemProps> = ({ mark, handleMark }) => {
  return (
    <MenuItem
      sx={{ mx: "0.5rem", borderRadius: "10px" }}
      onClick={() => handleMark(mark)}
    >
      <ListItemIcon>
        {mark === "Known" ? <SpellcheckIcon /> : <WhatshotIcon />}
      </ListItemIcon>
      <ListItemText>Mark as {mark}</ListItemText>
    </MenuItem>
  );
};
