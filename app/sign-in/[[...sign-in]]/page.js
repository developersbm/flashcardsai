import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ bgcolor: '#000000', color: '#FFFFFF', minHeight: '100vh', padding: 0 }}
    >
      <AppBar position="static" sx={{ bgcolor: '#1A1A1A' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
            StudyCards AI
          </Typography>
          <Button sx={{ color: '#FFFFFF', textTransform: 'none' }}>
            <Link href="/sign-in" passHref style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              LOGIN
            </Link>
          </Button>
          <Button sx={{ color: '#FFFFFF', textTransform: 'none' }}>
            <Link href="/sign-up" passHref style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              SIGN UP
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center', my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#FFFFFF' }}>
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
}

