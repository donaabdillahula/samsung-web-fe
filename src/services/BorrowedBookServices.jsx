import React from "react";
import { SERVICE } from "../shared/Constants";

export const BorrowedBookService = ({
  doPost,
  doGet,
  doPut,
  doDelete,
  doGetParams,
}) => {
  const createNewBorrowedBook = async (member, book) => {
    try {
      return await doPost({
        url: SERVICE.BORROWED_BOOKS,
        data: {
          member: member,
          book: book,
        },
      });
    } catch (error) {
      console.log("doPost error:", error);
      throw error;
    }
  };
  const getAllBorrowedBooks = async (page, size) => {
    try {
      return await doGetParams({
        url: SERVICE.BORROWED_BOOKS,
        params: {
          page: page,
          size: size,
        },
      });
    } catch (error) {
      console.log("doGetParams error:", error);
      throw error;
    }
  };

  const getBorrowedBookById = async (id) => {
    try {
      return await doGet({
        url: `${SERVICE.BORROWED_BOOKS}/${id}`,
      });
    } catch (error) {
      console.log("doGet error:", error);
      throw error;
    }
  };

  const updateBorrowedBookById = async (id, borrowedBook) => {
    try {
      return await doPut({
        url: `${SERVICE.BORROWED_BOOKS}/${id}`,
        data: borrowedBook,
      });
    } catch (error) {
      console.log("doPut error:", error);
      throw error;
    }
  };

  const deleteBorrowedBook = async (id) => {
    try {
      return await doDelete({
        url: `${SERVICE.BORROWED_BOOKS}/${id}`,
      });
    } catch (error) {
      console.log("doDelete error:", error);
      throw error;
    }
  };

  const returnBorrowedBookById = async (id) => {
    try {
      return await doPut({
        url: `${SERVICE.BORROWED_BOOKS}/return/${id}`,
      });
    } catch (error) {
      console.log("doPut error:", error);
      throw error;
    }
  };

  const searchBorrowedBooks = async (params) => {
    try {
      return await doGetParams({
        url: SERVICE.BORROWED_BOOKS + "/search",
        params,
      });
    } catch (error) {
      console.log("doGetParams error:", error);
      throw error;
    }
  };

  return {
    getAllBorrowedBooks,
    getBorrowedBookById,
    updateBorrowedBookById,
    deleteBorrowedBook,
    createNewBorrowedBook,
    returnBorrowedBookById,
    searchBorrowedBooks,
  };
};
