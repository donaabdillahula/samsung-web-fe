import React, { useEffect, useState } from "react";
import { APP_NAVIGATION } from "../../shared/Constants";
import { UseDependency } from "../../shared/hooks/UseDependency";
import PopUpCreateBorrowedBook from "./PopUpCreateBorrowedBook";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const BorrowedBooks = () => {
  const { borrowedBookService } = UseDependency();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [searchKey, setSearchKey] = useState(null);

  // Popup state
  const [showCreate, setShowCreate] = useState(false);
  const [newBorrowedBook, setNewBorrowedBook] = useState({
    bookId: 0,
    memberId: 0,
  });

  useEffect(() => {
    if (searchValue) {
      // If search value is provided, filter borrowedBooks
      const fetchFilteredBorrowedBooks = async () => {
        let params = {
          page: page - 1,
          size: PAGE_SIZE,
          [searchKey]: searchValue,
        };
        setLoading(true);
        try {
          const response = await borrowedBookService.searchBorrowedBooks(
            params
          );
          setBorrowedBooks(response.data || []);
          setTotalPages(response.totalPage || 1);
        } catch (error) {
          console.error("Error fetching filtered borrowedBooks:", error);
          setBorrowedBooks([]);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      };
      fetchFilteredBorrowedBooks();
    } else {
      const fetchBorrowedBooks = async () => {
        setLoading(true);
        try {
          const response = await borrowedBookService.getAllBorrowedBooks(
            page - 1,
            PAGE_SIZE
          );
          setBorrowedBooks(response.data || []);
          setTotalPages(response.totalPage || 1);
        } catch (error) {
          console.error("Error fetching borrowedBooks:", error);
          setBorrowedBooks([]);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      };
      fetchBorrowedBooks();
    }
  }, [page, searchKey, searchValue, borrowedBookService]);

  // Create borrowedBook handler
  const handleCreateBorrowedBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await borrowedBookService.createNewBorrowedBook(
        { id: Number(newBorrowedBook.memberId) },
        { id: Number(newBorrowedBook.bookId) }
      );
      setShowCreate(false);
      setNewBorrowedBook({ bookId: 0, memberId: 0 });
      // Refresh author list
      const response = await borrowedBookService.getAllBorrowedBooks(
        page - 1,
        PAGE_SIZE
      );
      setBorrowedBooks(response.data || []);
      setTotalPages(response.totalPage || 1);
    } catch (err) {
      alert("Failed to create author, " + err.message);
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
            <h1 className="text-3xl font-bold">Borrowed Books</h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4 text-gray-600 dark:text-gray-400">
            <select
              className="w-full sm:w-auto rounded-full border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1"
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              required
            >
              <option value={""}>Choose search by</option>
              <option value={"borrowDate"}>Borrow Date</option>
              <option value={"bookTitle"}>Book Title</option>
              <option value={"memberName"}>Member Name</option>
            </select>
            <input
              type={searchKey == "borrowDate" ? "date" : "text"}
              placeholder={`Search value...`}
              className="w-full sm:w-auto rounded-full border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button
              className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-full"
              onClick={() => setShowCreate(true)}
            >
              + Add Borrow Book
            </button>
          </div>
        </div>

        {/* Body section */}
        <div>
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="place-items-center gap-10">
              <div className="w-full overflow-x-auto rounded-xl shadow-md">
                <table className="min-w-full bg-gray-200 dark:bg-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-left">No</th>
                      <th className="px-4 py-2 border-b text-left">
                        Borrowed Date
                      </th>
                      <th className="px-4 py-2 border-b text-left">
                        Book Title
                      </th>
                      <th className="px-4 py-2 border-b text-left">
                        Member Name
                      </th>
                      <th className="px-4 py-2 border-b text-left">
                        Returned Date
                      </th>
                      <th className="px-4 py-2 border-b text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowedBooks.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-6 text-gray-500"
                        >
                          No borrowed books found.
                        </td>
                      </tr>
                    ) : (
                      borrowedBooks.map((item, idx) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() =>
                            navigate(
                              `${APP_NAVIGATION.BORROWED_BOOKS}/${item.id}`
                            )
                          }
                        >
                          <td className="px-4 py-2 border-b">{idx + 1}</td>
                          <td className="px-4 py-2 border-b whitespace-nowrap max-w-[120px] sm:max-w-[180px] md:max-w-[240px]">
                            {item.borrowDate ? item.borrowDate : "-"}
                          </td>
                          <td className="px-4 py-2 border-b truncate max-w-[120px] sm:max-w-[180px] md:max-w-[240px]">
                            {item.book?.title || "-"}
                          </td>
                          <td className="px-4 py-2 border-b truncate max-w-[100px] sm:max-w-[160px] md:max-w-[200px]">
                            {item.member?.name || "-"}
                          </td>
                          <td className="px-4 py-2 border-b whitespace-nowrap max-w-[120px] sm:max-w-[180px] md:max-w-[240px]">
                            {item.returnDate ? item.returnDate : "-"}
                          </td>
                          <td className="px-4 py-2 border-b">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      item.returnDate
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                            >
                              {item.returnDate ? "RETURNED" : "BORROWED"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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

        {/* Create BorrowedBook Popup */}
        {showCreate && (
          <PopUpCreateBorrowedBook
            newBorrowedBook={newBorrowedBook}
            setNewBorrowedBook={setNewBorrowedBook}
            handleCreateBorrowedBook={handleCreateBorrowedBook}
            setLoading={setLoading}
            loading={loading}
            setShowCreate={setShowCreate}
            showCreate={showCreate}
          />
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
