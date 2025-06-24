import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { UseDependency } from "../../shared/hooks/UseDependency";
import { ImageNamingFormat } from "../../utils/ImageNamingFormat";

const PAGE_SIZE = 10;

const PopUpCreateBorrowedBook = ({
  newBorrowedBook,
  setNewBorrowedBook,
  handleCreateBorrowedBook,
  setLoading,
  loading,
  setShowCreate,
  showCreate,
}) => {
  const { bookService, memberService } = UseDependency();
  const [availableBooks, setAvailableBooks] = useState([]);
  const [members, setMembers] = useState([]);

  // Fetch books for dropdown
  useEffect(() => {
    setLoading(true);
    const fetchAvailableBooks = async () => {
      try {
        const response = await bookService.getAllBooks(-1, -1);
        const available = (response.data || []).filter(
          (book) => book.status === "AVAILABLE"
        );
        setAvailableBooks(available);
      } catch (err) {
        console.log("errors getAllBooks: ", err);
        setAvailableBooks([]);
      }
    };
    const fetchMembers = async () => {
      try {
        const response = await memberService.getAllMembers(-1, -1);
        setMembers(response.data || []);
      } catch (err) {
        console.log("errors getAllMembers: ", err);
        setMembers([]);
      }
    };
    fetchAvailableBooks();
    fetchMembers();
    setLoading(false);
  }, [showCreate, bookService, memberService, setLoading]);

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1>Add Borrow Book</h1>
            </div>
            <div>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => setShowCreate(false)}
              />
            </div>
          </div>
          {/* Body */}
          <form className="mt-4" onSubmit={handleCreateBorrowedBook}>
            {/* Dropdown Book */}
            <select
              className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-3"
              onChange={(e) =>
                setNewBorrowedBook({
                  ...newBorrowedBook,
                  bookId: e.target.value,
                })
              }
              required
            >
              <option value="">Choose Available Book</option>
              {availableBooks.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
            {/* Dropdown Member */}
            <select
              className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-3"
              onChange={(e) =>
                setNewBorrowedBook({
                  ...newBorrowedBook,
                  memberId: e.target.value,
                })
              }
              required
            >
              <option value="">Choose Member's Name</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add"}
            </button>
          </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PopUpCreateBorrowedBook;
