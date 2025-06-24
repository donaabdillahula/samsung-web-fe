import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDependency } from "../../shared/hooks/UseDependency";
import { FormatDate } from "../../utils/TimeFormat";
import { APP_NAVIGATION } from "../../shared/Constants";

const BorrowedBookDetail = () => {
  const { borrowedBookService, bookService, memberService } = UseDependency();
  const navigate = useNavigate();
  const { id } = useParams();
  const [borrowedBook, setBorrowedBook] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [availableBooks, setAvailableBooks] = useState([]);
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState(null);

  // Return book popup state
  const [showReturnPopup, setShowReturnPopup] = useState(false);

  useEffect(() => {
    const fetchBorrowedBook = async () => {
      setLoading(true);
      try {
        const response = await borrowedBookService.getBorrowedBookById(id);
        setBorrowedBook(response.data || {});
        setForm(response.data || {});
      } catch (error) {
        console.error("Error fetching borrowedBook:", error);
        setBorrowedBook(null);
        setForm(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBorrowedBook();
  }, [id, editMode, borrowedBookService]);

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
  }, [editMode, bookService, memberService]);

  const handleEdit = () => setEditMode(true);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await borrowedBookService.updateBorrowedBookById(id, form);
      setBorrowedBook(form);
      setEditMode(false);
    } catch (error) {
      alert("Failed to update borrowedBook: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this borrowedBook?")) {
      setLoading(true);
      try {
        await borrowedBookService.deleteBorrowedBook(id);
        navigate(APP_NAVIGATION.BORROWED_BOOKS);
      } catch (error) {
        console.log("Failed to delete borrowed book: "+ error.errorMessage);
        alert("Failed to delete borrowed book");
      } finally {
        setLoading(false);
        navigate(APP_NAVIGATION.BORROWED_BOOKS);
      }
    }
  };

  // Handle return book
  const handleReturnBook = async () => {
    if (!borrowedBook) return;
    setLoading(true);
    try {
      await borrowedBookService.returnBorrowedBookById(borrowedBook.id);
      setShowReturnPopup(false);

      // Refresh
      const response = await borrowedBookService.getBorrowedBookById(id);
      setBorrowedBook(response.data || {});
      setForm(response.data || {});
    } catch (err) {
      alert("Failed to return book, " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-10">
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="w-full max-w-xl bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-2xl p-8">
          <div>
            {editMode ? (
              <form className="mt-4" onSubmit={handleSave}>
                {/* Dropdown Book */}
                <select
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-3"
                  name="book"
                  value={form.book.id || 0}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      book: { id: Number(e.target.value) },
                    })
                  }
                  required
                  disabled={borrowedBook?.returnDate ? true: false}
                >
                  <option value={0} disabled>
                    Choose Available Book
                  </option>
                  {availableBooks.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
                {/* Dropdown Member */}
                <select
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-3"
                  name="member"
                  value={form.member.id || 0}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      member: { id: Number(e.target.value) },
                    })
                  }
                  required
                >
                  <option value={0}>Choose Member's Name</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4 text-center">
                  Borrowed Book Details
                </h2>
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Borrow Date:</span>{" "}
                    {borrowedBook?.borrowDate}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Book Title:</span>{" "}
                    {borrowedBook?.book.title}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Member Name:</span>{" "}
                    {borrowedBook?.member.name}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Return Date:</span>{" "}
                    {borrowedBook?.returnDate || "-"}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Created At:</span>{" "}
                    {FormatDate(borrowedBook?.createdAt)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Updated At:</span>{" "}
                    {FormatDate(borrowedBook?.updatedAt)}
                  </p>
                </div>
                <div className="flex justify-between gap-2 mt-6">
                  <div>
                    {borrowedBook && !borrowedBook?.returnDate && (
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-400 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                        onClick={handleReturnBook}
                      >
                        Return
                      </button>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Return Book Popup */}
          {showReturnPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-[90vw] max-w-sm">
                <h2 className="text-lg font-bold mb-4">Return this book?</h2>
                <p className="mb-2">
                  <span className="font-semibold">Book:</span>{" "}
                  {borrowedBook?.book.title}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Member:</span>{" "}
                  {borrowedBook?.member.name}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                    onClick={() => {
                      if (!borrowedBook.returnDate) {
                        setShowReturnPopup(true);
                      }
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-primary text-white"
                    onClick={handleReturnBook}
                    disabled={loading}
                  >
                    {loading ? "Returning..." : "Return"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BorrowedBookDetail;
