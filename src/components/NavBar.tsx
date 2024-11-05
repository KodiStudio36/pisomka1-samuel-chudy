// src/components/NavBar.tsx

"use client";

import * as React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

export default function SidebarMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false); // Close the drawer after navigation
  };

  const handleAuthAction = () => {
    if (!session) {
      router.push('/auth/prihlasenie');
    } else {
      signOut({ callbackUrl: '/' });
    }
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Menu Button */}
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleToggleDrawer}
        sx={{ marginLeft: 2, marginTop: 2 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer/Sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={handleToggleDrawer}
      >
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => handleNavigation('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Domov" />
          </ListItem>

          <ListItem button onClick={() => handleNavigation('/pridat')}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Pridať" />
          </ListItem>

          {/* Conditional Menu Items based on Session */}
          {!session ? (
            <>
              <ListItem button onClick={() => handleNavigation('/auth/registracia')}>
                <ListItemIcon>
                  <AppRegistrationIcon />
                </ListItemIcon>
                <ListItemText primary="Registrovať" />
              </ListItem>

              <ListItem button onClick={handleAuthAction}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Prihlásiť sa" />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={handleAuthAction}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Odhlásiť sa" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
