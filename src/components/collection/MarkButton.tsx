import theme from "@/theme";
import { Button, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { MarkButtonProps } from "@/types/collectionTypes";
import { FC } from "react";

export const MarkButton: FC<MarkButtonProps> = ({
  mark,
  isMarked,
  onClick,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const displayedText = isMarked ? `You marked it ${mark}` : `Mark as ${mark}`;

  if (isMobile) {
    const buttonVariant = (() => {
      if (isMarked) {
        return mark === "Known" ? "markedAsKnown" : "markedAsRepeatable";
      } else {
        return "notMarked";
      }
    })();
    return (
      <Button
        variant={buttonVariant}
        sx={{ py: 1.5, fontWeight: isMarked ? "bold" : "400" }}
        startIcon={mark === "Known" ? <SpellcheckIcon /> : <WhatshotIcon />}
        onClick={onClick}
      >
        {displayedText}
      </Button>
    );
  }
  return (
    <Tooltip title={displayedText}>
      <IconButton onClick={onClick}>
        {mark === "Known" ? (
          <SpellcheckIcon
            sx={{ color: isMarked ? "knownTerm.main" : "greyColor.main" }}
          />
        ) : (
          <WhatshotIcon
            sx={{ color: isMarked ? "repeatableTerm.main" : "greyColor.main" }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};
