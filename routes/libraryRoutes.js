import express from "express";
import libraryController from "../controllers/libraryController.js";

const router = express.Router();

const {
    addBook,
    addMember,
    borrowBook,
    returnBook,
    getAllBooks,
    getAllMembers,
    getAllBorrowedBooks
} = libraryController;

router.post("/books", addBook);
router.post("/members", addMember);
router.post("/borrow/:bookId", borrowBook);
router.put("/return/:borrowId", returnBook);
router.get("/books", getAllBooks);
router.get("/borrowed", getAllBorrowedBooks);
router.get("/members", getAllMembers);

export default router;