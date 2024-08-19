import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
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
          <Link href="/sign-in" passHref style={{ textDecoration: 'none' }}>
            <Button sx={{ color: '#FFFFFF', textTransform: 'none' }}>
              LOGIN
            </Button>
          </Link>
          <Link href="/sign-up" passHref style={{ textDecoration: 'none' }}>
            <Button sx={{ color: '#FFFFFF', textTransform: 'none' }}>
              SIGN UP
            </Button>
          </Link>
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
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
