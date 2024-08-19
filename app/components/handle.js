import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";

// Fetch flashcards for a specific collection
export const getFlashcards = async (userId) => {
  try {
    const cardsCollectionRef = collection(firestore, "flashcards", userId, "cards");
    const snapshot = await getDocs(cardsCollectionRef);
    const flashcardsList = [];
    snapshot.forEach((doc) => {
      flashcardsList.push({ id: doc.id, ...doc.data() });
    });
    return flashcardsList;
  } catch (error) {
    console.error("Error fetching flashcards: ", error);
    throw new Error("Failed to fetch flashcards");
  }
};

// Add a new flashcard or update an existing one by name
export const addOrUpdateFlashcard = async (collectionName, frontText, backText, flashcards) => {
  try {
    const trimmedFrontText = frontText.trim().toLowerCase();

    if (trimmedFrontText === "") {
      alert("Please enter the front text.");
      return;
    }

    const existingCard = flashcards.find(card => card.front.toLowerCase() === trimmedFrontText);

    if (existingCard) {
      const docRef = doc(firestore, "flashcards", collectionName, "cards", existingCard.id);
      await updateDoc(docRef, { back: backText });
    } else {
      await addDoc(collection(firestore, "flashcards", collectionName, "cards"), {
        front: trimmedFrontText,
        back: backText
      });
    }
  } catch (error) {
    console.error("Error adding or updating the flashcard: ", error);
    throw new Error("Failed to add or update flashcard");
  }
};

// Remove a flashcard by id
export const removeFlashcard = async (collectionName, id) => {
  try {
    const docRef = doc(firestore, "flashcards", collectionName, "cards", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error removing the flashcard: ", error);
    throw new Error("Failed to remove flashcard");
  }
};

// Update the back text of a flashcard by id
export const updateFlashcardText = async (collectionName, id, newBackText) => {
  try {
    const docRef = doc(firestore, "flashcards", collectionName, "cards", id);
    await updateDoc(docRef, { back: newBackText });
  } catch (error) {
    console.error("Error updating the flashcard text: ", error);
    throw new Error("Failed to update flashcard text");
  }
};

// Update the front text of a flashcard by id
export const updateFlashcardFront = async (collectionName, id, newFrontText) => {
  try {
    const trimmedFrontText = newFrontText.trim().toLowerCase();

    if (trimmedFrontText === "") {
      throw new Error("Flashcard front text cannot be empty.");
    }

    const docRef = doc(firestore, "flashcards", collectionName, "cards", id);
    await updateDoc(docRef, { front: trimmedFrontText });
  } catch (error) {
    console.error("Error updating the flashcard front text: ", error);
    throw new Error("Failed to update flashcard front text");
  }
};
