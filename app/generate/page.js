'use client'
import { AppBar, Toolbar, Container, Box, Typography, Button, TextField, Paper, Grid, CardContent, CardActionArea, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase';
import { doc, collection, setDoc, getDoc, writeBatch } from 'firebase/firestore';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head';


export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await fetch('api/generate', {
                method: 'POST',
                body: text,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setFlashcards(data);
        } catch (error) {
            console.error('Error fetching flashcards:', error);
            alert('Failed to fetch flashcards. Please try again later.');
        }
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name!');
            return;
        }
        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find((f) => f.name === name)) {
                alert("Flashcard collection with the same name already exists.");
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards');
    };

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

          <Button
                    variant="contained"
                    color="primary"
                    href="/"
                    sx={{
                        right: 20,
                        bgcolor: '#FFFFFF',
                        color: '#000000',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        '&:hover': { bgcolor: '#grey' }
                    }}
                >
                    Home
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
            <Container maxWidth="md" sx={{ bgcolor: '#121212', color: '#FFFFFF', minHeight: '100vh', padding: 0 }}>
                <Box sx={{ mt: 6, mb: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 'bold' }}>Generate Flashcards</Typography>
                    <Paper sx={{ p: 4, width: "100%", bgcolor: '#1A1A1A', borderRadius: '12px' }}>
                        <Box sx={{ display: "flex", flexDirection: 'column', gap: 3 }}>
                            <TextField
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                label="Enter text"
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    bgcolor: '#2E2E2E',
                                    borderRadius: '8px',
                                    '& .MuiInputBase-root': { color: '#FFFFFF' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                                    '& .MuiInputLabel-root': { color: '#AAAAAA' }
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{
                                    alignSelf: "flex-start",
                                    padding: "10px 30px",
                                    fontWeight: 'bold',
                                    bgcolor: '#6200ea',
                                    '&:hover': { bgcolor: '#3700b3' }
                                }}
                            >
                                Generate
                            </Button>
                        </Box>
                    </Paper>
                </Box>

                {flashcards.length > 0 && (
                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: '#FFFFFF', marginBottom: 4 }}>Flashcards Preview</Typography>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    perspective: "1000px",
                                                    '& > div': {
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '200px',
                                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                                        transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                        borderRadius: "12px"
                                                    },
                                                    '& > div > div': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: "hidden",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        padding: 2,
                                                        boxSizing: "border-box",
                                                        borderRadius: "12px",
                                                        overflow: 'auto'
                                                    },
                                                    '& > div > div:nth-of-type(1)': { backgroundColor: "#9BEDFF" },
                                                    '& > div > div:nth-of-type(2)': { transform: 'rotateY(180deg)', backgroundColor: "#bcf5bc" }
                                                }}
                                            >
                                                <div>
                                                    <div>
                                                        <Typography
                                                            variant="h6"
                                                            component="div"
                                                            sx={{
                                                                maxHeight: "100%",
                                                                overflow: "auto",
                                                                wordBreak: "break-word",
                                                                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                                                                fontSize: "1.2rem",
                                                                lineHeight: 1.5,
                                                                color: "#000",
                                                                fontWeight: "bold",
                                                                padding: "10px"
                                                            }}
                                                        >
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography
                                                            variant="h6"
                                                            component="div"
                                                            sx={{
                                                                maxHeight: "100%",
                                                                overflow: "auto",
                                                                wordBreak: "break-word",
                                                                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                                                                fontSize: "1.2rem",
                                                                lineHeight: 1.5,
                                                                color: "#000",
                                                                padding: "10px"
                                                            }}
                                                        >
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ mt: 4, display: "flex", justifyContent: 'center', marginBottom: "30px" }}>
                            <Button
                                variant="contained"
                                onClick={handleOpen}
                                sx={{
                                    bgcolor: '#6200ea',
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    padding: '10px 30px'
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                )}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{ color: '#FFFFFF', bgcolor: '#1A1A1A' }}>Save Flashcards</DialogTitle>
                    <DialogContent sx={{ bgcolor: '#1A1A1A' }}>
                        <DialogContentText sx={{ color: '#B0B0B0' }}>
                            Please enter a name for your flashcards collection
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Collection Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                '& .MuiInputBase-root': { color: '#FFFFFF' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                                '& .MuiInputLabel-root': { color: '#AAAAAA' },
                                bgcolor: '#2E2E2E',
                                borderRadius: '8px',
                                mt: 2
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ bgcolor: '#1A1A1A' }}>
                        <Button onClick={handleClose} sx={{ color: '#B0B0B0' }}>Cancel</Button>
                        <Button onClick={saveFlashcards} sx={{ color: '#6200ea' }}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
            </Container>

    );
}
