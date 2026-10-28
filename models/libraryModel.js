const books = [
     {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        totalCopies: 5,
        availableCopies: 4
    },
    {
        id: 2,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        category: "Biography",
        totalCopies: 3,
        availableCopies: 3
    }
];

const members = [
     {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        phone: "9876543210"
    },
    {
        id: 2,
        name: "Priya",
        email: "priya@gmail.com",
        phone: "9876501234"
    }
];

const borrowRecords = [
     {
        id: 1,
        bookId: 1,
        memberId: 1,
        borrowDate: "2026-07-05",
        returnDate: "2026-07-12",
        status: "borrowed"
    },
    {
        id: 2,
        bookId: 2,
        memberId: 2,
        borrowDate: "2026-07-10",
        returnDate: "2026-07-17",
        status: "returned"
    }
];

let bookId = 3;
let memberId = 3;
let borrowId = 3;

const getNextBookId = () => bookId++;
const getNextMemberId = () => memberId++;
const getNextBorrowId = () => borrowId++;

const libraryModel = {
    books,
    members,
    borrowRecords,
    getNextBookId,
    getNextMemberId,
    getNextBorrowId
};

export default libraryModel;