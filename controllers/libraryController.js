
import libraryModel from "../models/libraryModel.js";

const {
    books,
    members,
    borrowRecords,
    getNextBookId,
    getNextMemberId,
    getNextBorrowId
} = libraryModel;

const addBook = (req, res) => {
    try {
        const { title, author, category, totalCopies } = req.body || {};

        if (
            !title?.trim() ||
            !author?.trim() ||
            !category?.trim() ||
            !Number.isInteger(totalCopies) ||
            totalCopies <= 0
        ) {
            return res.status(400).json({
                message: "All book fields are required"
            });
        }

        const book = {
            id: getNextBookId(),
            title: title.trim(),
            author: author.trim(),
            category: category.trim(),
            totalCopies,
            availableCopies: totalCopies
        };

        books.push(book);

        return res.status(201).json(book);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add book" });
    }
};

const addMember = (req, res) => {
    try {
        const { name, email, phone } = req.body || {};

        if (!name?.trim() || !email?.trim() || !phone?.trim()) {
            return res.status(400).json({
                message: "Name, email and phone are required"
            });
        }

        const member = {
            id: getNextMemberId(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim()
        };

        members.push(member);

        return res.status(201).json(member);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to register member" });
    }
};

const borrowBook = (req, res) => {
    try {
        const { bookId } = req.params;
        const { memberId, borrowDate, returnDate } = req.body || {};

        if (
            !/^[1-9]\d*$/.test(bookId) || !Number.isInteger(memberId) || memberId <= 0)
             {
            return res.status(400).json({
                message: "Invalid book ID or member ID"
            });
        }

        if (
            !borrowDate ||
            !returnDate ||
            typeof borrowDate !== "string" ||
            typeof returnDate !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(borrowDate) ||
            !/^\d{4}-\d{2}-\d{2}$/.test(returnDate) ||
            returnDate <= borrowDate
        ) {
            return res.status(400).json({
                message: "Valid dates are required and returnDate must be later than borrowDate"
            });
        }

        const book = books.find(
            (item) => item.id === Number(bookId)
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        const member = members.find(
            (item) => item.id === memberId
        );

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        if (book.availableCopies <= 0) {
            return res.status(409).json({
                message: "No copies available"
            });
        }

        const record = {
            id: getNextBorrowId(),
            bookId: book.id,
            memberId: member.id,
            borrowDate,
            returnDate,
            status: "borrowed"
        };

        borrowRecords.push(record);
        book.availableCopies--;

        return res.status(201).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to borrow book" });
    }
};

const returnBook = (req, res) => {
    try {
        const { borrowId } = req.params;

        if (!/^[1-9]\d*$/.test(borrowId)) {
            return res.status(400).json({
                message: "Invalid borrow ID"
            });
        }

        const record = borrowRecords.find(
            (item) => item.id === Number(borrowId)
        );

        if (!record) {
            return res.status(404).json({
                message: "Borrow record not found"
            });
        }

        if (record.status === "returned") {
            return res.status(409).json({
                message: "Book already returned"
            });
        }

        const book = books.find(
            (item) => item.id === record.bookId
        );

        if (!book) {
            return res.status(500).json({
                message: "Associated book not found"
            });
        }

        record.status = "returned";
        book.availableCopies++;

        return res.status(200).json(record);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to return book" });
    }
};

const getAllBooks = (req, res) => {
    try {
        return res.status(200).json(books);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to retrieve books" });
    }
};

const getAllMembers = (req, res) => {
    try {
        return res.status(200).json(members);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to retrieve members" });
    }
};

const getAllBorrowedBooks = (req, res) => {
    try {
        const records = borrowRecords.map((record) => {
            const book = books.find(
                (item) => item.id === record.bookId
            );

            const member = members.find(
                (item) => item.id === record.memberId
            );

            return {
                borrowId: record.id,
                bookTitle: book ? book.title : "Unknown book",
                memberName: member ? member.name : "Unknown member",
                borrowDate: record.borrowDate,
                returnDate: record.returnDate,
                returnStatus: record.status
            };
        });

        return res.status(200).json(records);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to retrieve borrowing records"
        });
    }
};

const libraryController = {
    addBook,
    addMember,
    borrowBook,
    returnBook,
    getAllBooks,
    getAllMembers,
    getAllBorrowedBooks
};

export default libraryController;
