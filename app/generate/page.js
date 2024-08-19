'use client';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Paper
} from '@mui/material';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head';
import { addOrUpdateFlashcard } from '../components/handle';

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleGenerate = async () => {
    if (!frontText.trim() || !backText.trim()) {
      alert('Please fill in both the front and back text.');
      return;
    }

    try {
      // Save the new flashcard
      await addOrUpdateFlashcard(user.id, frontText, backText, flashcards);

      // Add the new flashcard to local state to update the view
      setFlashcards([...flashcards, { front: frontText, back: backText }]);
      setFrontText('');
      setBackText('');
      alert('Flashcard generated successfully!');
    } catch (error) {
      console.error('Error generating flashcard:', error);
      alert('Failed to generate flashcard. Please try again.');
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ bgcolor: '#000000', color: '#FFFFFF', minHeight: '100vh', padding: 0 }}
    >
      <Head>
        <title>Generate Flashcards</title>
        <meta name="description" content="Generate new flashcards." />
      </Head>

      <AppBar position="static" sx={{ bgcolor: '#1A1A1A' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
            StudyCards AI
          </Typography>
          <Button
                    variant="contained"
                    color="primary"
                    href="/"
                    sx={{
                        right: 40,
                        bgcolor: '#FFFFFF',
                        color: '#000000',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        '&:hover': { bgcolor: '#grey' }
                    }}
                >
                    Home
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    href="/flashcards"
                    sx={{
                        right: 20,
                        bgcolor: '#FFFFFF',
                        color: '#000000',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        '&:hover': { bgcolor: '#grey' }
                    }}
                >
                    Your Flashcards
                </Button>
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

      <Container
        maxWidth="md"
        sx={{ bgcolor: '#121212', color: '#FFFFFF', padding: 4, minHeight: '100vh' }}
      >
        <Box sx={{ mt: 6, mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 'bold' }}>
            Generate a New Flashcard
          </Typography>
          <Paper sx={{ p: 4, width: '100%', bgcolor: '#1A1A1A', borderRadius: '12px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                value={frontText}
                onChange={(e) => setFrontText(e.target.value)}
                label="Front Text"
                variant="outlined"
                sx={{
                  width: '100%',
                  bgcolor: '#2E2E2E',
                  borderRadius: '8px',
                  '& .MuiInputBase-root': { color: '#FFFFFF' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '& .MuiInputLabel-root': { color: '#AAAAAA' },
                }}
              />
              <TextField
                value={backText}
                onChange={(e) => setBackText(e.target.value)}
                label="Back Text"
                variant="outlined"
                sx={{
                  width: '100%',
                  bgcolor: '#2E2E2E',
                  borderRadius: '8px',
                  '& .MuiInputBase-root': { color: '#FFFFFF' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '& .MuiInputLabel-root': { color: '#AAAAAA' },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerate}
                sx={{
                  alignSelf: 'flex-start',
                  padding: '10px 30px',
                  fontWeight: 'bold',
                  bgcolor: '#6200ea',
                  '&:hover': { bgcolor: '#3700b3' },
                }}
              >
                Generate
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Container>
  );
}
