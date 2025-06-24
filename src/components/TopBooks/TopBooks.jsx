import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_NAVIGATION } from "../../shared/Constants";

const TopBooks = ({ topBooks }) => {
    const navigate = useNavigate();
  return (
    <>
      <span id="top-books"></span>
      <div className="py-10">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary ">
              Top Books
            </p>
            <h1 className="text-3xl font-bold">Most Borrowed Books</h1>
            <p className="text-xs text-gray-400">
              The most borrowed books in our library.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {topBooks.map((book) => (
              <div
                key={book.id}
                data-aos="zoom-in"
                className="rounded-2xl w-full max-w-[320px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[300px] h-[260px] sm:h-[250px] bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group flex flex-col"
              >
                <div className="h-[100px] flex-shrink-0 flex items-center justify-center">
                  <img
                    src={book.photoPath}
                    alt=""
                    className="max-w-[100px] sm:max-w-[130px] md:max-w-[100px] block mx-auto transform -translate-y-10 group-hover:scale-105 duration-300 shadow-md"
                  />
                </div>
                <div className="p-3 text-center flex-1 flex flex-col justify-between">
                    <h1 className="text-base sm:text-lg md:text-xl font-bold truncate">
                      {book.title}
                    </h1>
                    <p className="text-gray-500 group-hover:text-white duration-300 text-xs sm:text-sm truncate">
                      {book.description}
                    </p>
                  <div className="flex flex-col items-center justify-center">
                  <button
                    className="bg-primary max-w-[150px] hover:scale-105 duration-300 text-white py-1 px-4 mb-2 rounded-full group-hover:bg-white group-hover:text-primary"
                    onClick={() => navigate(`${APP_NAVIGATION.BOOKS}/${book.id}`)}
                  >
                    See more
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBooks;
