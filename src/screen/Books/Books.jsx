import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_NAVIGATION } from "../../shared/Constants";
import { UseDependency } from "../../shared/hooks/UseDependency";
import PopUpCreateBook from "./PopUpCreateBook";
import FormData from "form-data";

const PAGE_SIZE = 10;

const Books = () => {
  const { bookService } = UseDependency();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Popup state
  const [showCreate, setShowCreate] = useState(false);
  const [newBook, setNewBook] = useState({
    book: {
      title: "",
      description: "",
      category: "",
      publishingYear: 0,
      author: { id: 0 },
    },
    photo: null,
  });

  useEffect(() => {
    if (searchValue) {
      // If search value is provided, filter books
      const fetchFilteredBooks = async () => {
        setLoading(true);
        try {
          const response = await bookService.searchBooksByTitle(
            page - 1,
            PAGE_SIZE,
            searchValue
          );
          setBooks(response.data || []);
          setTotalPages(response.totalPage || 1);
        } catch (error) {
          console.error("Error fetching filtered books:", error);
          setBooks([]);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      };
      fetchFilteredBooks();
    } else {
      const fetchBooks = async () => {
        setLoading(true);
        try {
          const response = await bookService.getAllBooks(page - 1, PAGE_SIZE);
          setBooks(response.data || []);
          setTotalPages(response.totalPage || 1);
        } catch (error) {
          console.error("Error fetching books:", error);
          setBooks([]);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
  }, [page, searchValue, bookService]);

  // Create book handler
  const handleCreateBook = async (e) => {
    e.preventDefault();
    const bookFormData = new FormData();

    const bookBlob = new Blob([JSON.stringify(newBook.book)], {
      type: "application/json",
    });
    bookFormData.append("book", bookBlob);
    if (newBook.photo) {
      bookFormData.append("photo", newBook.photo);
    }

    setLoading(true);
    try {
      await bookService.createNewBook(bookFormData);
      setShowCreate(false);
      setNewBook({
        book: {
          title: "",
          description: "",
          category: "",
          publishingYear: 0,
          author: { id: 0 },
        },
        photo: null,
      });
      // Refresh book list
      const response = await bookService.getAllBooks(page - 1, PAGE_SIZE);
      setBooks(response.data || []);
      setTotalPages(response.totalPage || 1);
    } catch (err) {
      alert("Failed to create book, " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* header */}
        <div className="w-full mb-10">
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 className="text-3xl font-bold">Books</h1>
          </div>
          <div className="flex justify-end gap-4 text-gray-600 dark:text-gray-400">
            <input
              type="text"
              placeholder="Search by title"
              className="rounded-full border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 bg-primary text-white rounded-full"
              onClick={() => setShowCreate(true)}
            >
              + Add Book
            </button>
          </div>
        </div>

        {/* Body section */}
        <div>
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-10">
              {books.map((item) => (
                <div
                  key={item.id}
                  className="h-[330px] w-[170px] flex flex-col justify-center space-y-3 border p-4 rounded-md shadow-md rounded-2xl bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group"
                  onClick={() => navigate(`${APP_NAVIGATION.BOOKS}/${item.id}`)}
                >
                  <img
                    src={item.photoPath}
                    alt=""
                    className="h-[200px] w-[150px] object-cover rounded-md border-none"
                  />
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className="text-sm truncate">{item.author.name}</p>
                  <div className="flex justify-end">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          item.status === "AVAILABLE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                        `}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded ${
                    page === idx + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Create Book Popup */}
        {showCreate && (
          <PopUpCreateBook
            newBook={newBook}
            setNewBook={setNewBook}
            handleCreateBook={handleCreateBook}
            loading={loading}
            setShowCreate={setShowCreate}
            showCreate={showCreate}
          />
        )}
      </div>
    </div>
  );
};

export default Books;
