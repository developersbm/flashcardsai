'use client';
import { useState, useEffect } from 'react';
import { IconButton, AppBar, Container, Typography, Paper, Box, Grid, Toolbar, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { getFlashcards, removeFlashcard } from '../components/handle';

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const userId = 'user_2ktbuFRJxJ7wZHwftlwtfuR2Iwd'; // Hardcoded user ID for demo
        const cards = await getFlashcards(userId);
        setFlashcards(cards);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleFlip = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    try {
      const userId = 'user_2ktbuFRJxJ7wZHwftlwtfuR2Iwd'; // Hardcoded user ID for demo
      await removeFlashcard(userId, id); // Delete flashcard from Firestore
      setFlashcards((prev) => prev.filter((card) => card.id !== id)); // Remove from local state
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

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
              '&:hover': { bgcolor: '#grey' },
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
              '&:hover': { bgcolor: '#grey' },
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
      <Typography variant="h4" sx={{ mt: 4, mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        Your Flashcards
      </Typography>

      <Grid container spacing={4}>
        {flashcards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Box
              sx={{
                perspective: '1000px',
                position: 'relative',
              }}
            >
              <Paper
                onClick={() => handleFlip(card.id)}
                sx={{
                  width: '100%',
                  height: '200px',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transform: flipped[card.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s',
                  cursor: 'pointer',
                }}
              >
                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent flip on delete click
                    handleDelete(card.id);
                  }}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: '#FFFFFF',
                    color: '#ff0000',
                    zIndex: 1,
                    '&:hover': {
                      bgcolor: '#ffcccc',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'white',
                    borderRadius: '12px',
                  }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    {card.front}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'lightgray',
                    borderRadius: '12px',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    {card.back}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
      <IconButton
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: '#FFFFFF',
          color: '#000000',
          width: 100,
          height: 100,
          fontSize: 50,
          '&:hover': { bgcolor: '#f0f0f0' },
        }}
        href="/generate"
      >
        +
      </IconButton>
    </Container>
  );
}
