// src/components/LogoutButton.tsx

import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect after logout
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleLogout}>
      Odhlásiť sa
    </Button>
  );
}
