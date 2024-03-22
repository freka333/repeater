import { Typography } from "@mui/material";
import { PagePaper } from "./PagePaper";

export const MainPage = ({ name }: { name: string }) => {
  return (
    <PagePaper>
      <Typography variant="h5">Welcome, {name}!</Typography>
    </PagePaper>
  );
};
