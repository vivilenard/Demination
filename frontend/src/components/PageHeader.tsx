import { Typography } from "@mui/material";
export default function PageHeader({ children }: { children: React.ReactNode }) {
    return (
      <Typography
        variant="h3"
        sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}
      >
        {children}
      </Typography>
    );
  }

