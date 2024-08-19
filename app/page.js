import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ bgcolor: '#000000', color: '#FFFFFF', minHeight: '130vh', padding: 0 }}
    >
      <Head>
        <title>Flashcard Set</title>
        <meta name="description" content="Create flashcards from your text." />
      </Head>

      <AppBar position="static" sx={{ bgcolor: '#1A1A1A' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
            StudyCards AI
          </Typography>
          <SignedOut>
            <Button sx={{ color: '#FFFFFF' }} href="/sign-in">
              Login
            </Button>
            <Button sx={{ color: '#FFFFFF' }} href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#FFFFFF' }}>
          Welcome to StudyCards AI!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#B0B0B0' }}>
          The most efficient way of studying.
        </Typography>
        <Button variant="contained" sx={{ mt: 2, mr: 2, bgcolor: '#FFFFFF', color: '#000000' }} href="/generate">
          Generate
        </Button>
        <Button variant="outlined" sx={{ mt: 2, color: '#FFFFFF', borderColor: '#FFFFFF' }}>
          Learn More
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#FFFFFF' }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#2E2E2E',
                borderRadius: 2,
                bgcolor: '#1A1A1A',
                color: '#FFFFFF',
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Easy Text Input</Typography>
              <Typography sx={{ color: '#B0B0B0' }}>
                Hello! Simply input your text and let our Generative AI software do the rest. Creating flashcards for
                studying has never been easier. Save time all while increasing your efficiency!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#2E2E2E',
                borderRadius: 2,
                bgcolor: '#1A1A1A',
                color: '#FFFFFF',
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Smart Flashcards</Typography>
              <Typography sx={{ color: '#B0B0B0' }}>
                Our intelligent Generative AI software breaks down your prompts into concise flashcards, making it a
                perfect tool for efficient studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#2E2E2E',
                borderRadius: 2,
                bgcolor: '#1A1A1A',
                color: '#FFFFFF',
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Easily Accessible</Typography>
              <Typography sx={{ color: '#B0B0B0' }}>
                Access your flashcards from any device, at any time. Study on the go stress-free with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#FFFFFF' }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#2E2E2E',
                borderRadius: 2,
                bgcolor: '#1A1A1A',
                color: '#FFFFFF',
              }}
            >
              <Typography variant="h5" sx={{ color: '#FFFFFF' }}>Basic</Typography>
              <Typography variant="h6" sx={{ color: '#B0B0B0' }}>$5 / Month</Typography>
              <Typography sx={{ color: '#B0B0B0' }}>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" sx={{ mt: 2, bgcolor: '#FFFFFF', color: '#000000' }}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#2E2E2E',
                borderRadius: 2,
                bgcolor: '#1A1A1A',
                color: '#FFFFFF',
              }}
            >
              <Typography variant="h5" sx={{ color: '#FFFFFF' }}>Pro</Typography>
              <Typography variant="h6" sx={{ color: '#B0B0B0' }}>$10 / Month</Typography>
              <Typography sx={{ color: '#B0B0B0' }}>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" sx={{ mt: 2, bgcolor: '#FFFFFF', color: '#000000' }}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}