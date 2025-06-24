import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { UseDependency } from "../../shared/hooks/UseDependency";
import { ImageNamingFormat } from "../../utils/ImageNamingFormat";

const PAGE_SIZE = 10;

const PopUpCreateBook = ({
  newBook,
  setNewBook,
  handleCreateBook,
  loading,
  setShowCreate,
  showCreate,
}) => {
  const { authorService } = UseDependency();
  const [authors, setAuthors] = useState([]);

  // Fetch authors for dropdown
  useEffect(() => {
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
  }, [showCreate, authorService]);

  const handleSelectedImage = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    setNewBook({
      ...newBook,
      photo: selectedFile,
    });
  };
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1>Add Book</h1>
          </div>
          <div>
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => setShowCreate(false)}
            />
          </div>
        </div>
        {/* Body */}
        <form className="mt-4" onSubmit={handleCreateBook}>
          <input
            type="text"
            placeholder="Title"
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
            onChange={(e) =>
              setNewBook({
                ...newBook,
                book: { ...newBook.book, title: e.target.value },
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
            onChange={(e) =>
              setNewBook({
                ...newBook,
                book: { ...newBook.book, description: e.target.value },
              })
            }
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
            onChange={(e) =>
              setNewBook({
                ...newBook,
                book: { ...newBook.book, category: e.target.value },
              })
            }
            required
          />
          <input
            type="number"
            placeholder="Publishing Year"
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
            onChange={(e) =>
              setNewBook({
                ...newBook,
                book: { ...newBook.book, publishingYear: e.target.value },
              })
            }
            required
          />
          {/* Dropdown Author */}
          <select
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-3"
            onChange={(e) =>
              setNewBook({
                ...newBook,
                book: {
                  ...newBook.book,
                  author: { id: Number(e.target.value) },
                },
              })
            }
            required
          >
            <option value="">Choose Author's Name</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {/* Upload Photo */}
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
            onChange={(e) => handleSelectedImage(e)}
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpCreateBook;
