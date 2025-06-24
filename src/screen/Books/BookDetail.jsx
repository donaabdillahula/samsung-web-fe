import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDependency } from "../../shared/hooks/UseDependency";
import { FormatDate } from "../../utils/TimeFormat";
import FormData from "form-data";
import BorrowPopup from "../../components/BorrowPopup/BorrowPopup";
import { APP_NAVIGATION } from "../../shared/Constants";

const BookDetail = () => {
  const { bookService, authorService, borrowedBookService } = UseDependency();
  const [authors, setAuthors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    description: "",
    category: "",
    publishingYear: 0,
    photoPath: null,
    author: { id: 0 },
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    publishingYear: 0,
    author: { id: 0 },
    status: "AVAILABLE",
    photo: null,
  });

  const [borrowPopup, setBorrowPopup] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await bookService.getBookById(id);

        setBook(response.data || {});
        setForm({
          title: response.data?.title || "",
          description: response.data?.description || "",
          category: response.data?.category || "",
          publishingYear: response.data?.publishingYear || 0,
          author: response.data?.author || { id: 0 },
          status: response.data?.status || "AVAILABLE",
          photo: null,
        });
      } catch (error) {
        console.error("Error fetching book:", error);
        setBook(null);
        setForm(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();

    if (editMode) {
      const fetchAuthors = async () => {
        try {
          const response = await authorService.getAllAuthors(-1, -1);
          setAuthors(response.data || []);
        } catch (err) {
          console.log("errors getAllAuthors: ", err);
          setAuthors([]);
        }
      };
      fetchAuthors();
    }
  }, [authorService, bookService, editMode, id, borrowPopup]);

  const handleEdit = () => setEditMode(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "author") {
      setForm((prev) => ({
        ...prev,
        author: authors.find((a) => a.id === Number(value)) || {
          id: Number(value),
        },
      }));
    } else if (name === "photo") {
      setForm((prev) => ({
        ...prev,
        photo: files && files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Create borrowedBook handler
  const handleCreateBorrowedBook = async () => {
    setLoading(true);
    try {
      await borrowedBookService.createNewBorrowedBook(
        { id: Number(selectedMemberId) },
        { id: Number(id) }
      );
      setBorrowPopup(false);
      setSelectedMemberId(0);
    } catch (err) {
      alert("Failed to create borrowed book, " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const bookFormData = new FormData();
    const bookData = {
      title: form.title,
      description: form.description,
      category: form.category,
      publishingYear: form.publishingYear,
      author: { id: form.author.id },
      status: form.status,
    };
    const bookBlob = new Blob([JSON.stringify(bookData)], {
      type: "application/json",
    });
    bookFormData.append("book", bookBlob);
    if (form.photo) {
      bookFormData.append("photo", form.photo);
    }

    setLoading(true);
    try {
      await bookService.updateBookById(id, bookFormData);
      setEditMode(false);
    } catch (err) {
      alert("Failed to create book, " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setLoading(true);
      try {
        // Ganti dengan API delete asli jika sudah ada
        await bookService.deleteBook(id);
        navigate(APP_NAVIGATION.BOOKS);
      } catch (error) {
        console.log("Failed to delete book: "+ error.errorMessage);
        alert("Cannot delete book: borrowed books data exist. Remove related records first.");
      } finally {
        setLoading(false);
        navigate(APP_NAVIGATION.BOOKS);
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="max-w-2xl mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row gap-6">
          <img
            src={book.photoPath}
            alt={book.title}
            className="w-40 h-60 object-cover rounded-md border"
          />
          <div className="flex-1">
            {editMode ? (
              <form onSubmit={handleSave} className="space-y-2">
                <input
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                />
                <textarea
                  className="w-full h-[100px] rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                {/* Dropdown Author */}
                <select
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="author"
                  value={form.author?.id || 0}
                  onChange={handleChange}
                  required
                >
                  <option value={0} disabled>
                    Choose Author's Name
                  </option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
                <input
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Category"
                />
                <input
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="publishingYear"
                  value={form.publishingYear}
                  onChange={handleChange}
                  placeholder="Year"
                />
                <input
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  disabled
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full font-semibold"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                <p className="mb-4">{book.description}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Author:</span>{" "}
                  {book.author.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {book.category}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Year:</span>{" "}
                  {book.publishingYear}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Created At:</span>{" "}
                  {FormatDate(book.createdAt)}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Updated At:</span>{" "}
                  {FormatDate(book.updatedAt)}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    book.status === "AVAILABLE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {book.status}
                </span>
                <div className="flex justify-between gap-2 mt-6">
                  <div>
                    {book && book?.status == "AVAILABLE" && (
                      <button
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                        onClick={() => setBorrowPopup(true)}
                      >
                        Borrow
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
        </div>
      )}
      {borrowPopup && (
        <BorrowPopup
          selectedMemberId={selectedMemberId}
          setSelectedMemberId={setSelectedMemberId}
          setBorrowPopup={setBorrowPopup}
          handleCreateBorrowedBook={handleCreateBorrowedBook}
        />
      )}
    </div>
  );
};

export default BookDetail;
