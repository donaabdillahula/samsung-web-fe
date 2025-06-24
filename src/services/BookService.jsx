import React from "react";
import { SERVICE } from "../shared/Constants";

export const BookService = ({
  doGet,
  doPut,
  doDelete,
  doPostFormData,
  doGetParams,
}) => {
  const createNewBook = async (data) => {
    try {

      return await doPostFormData({
        url: SERVICE.BOOKS,
        data: data,
      });
    } catch (error) {
      console.log("doPostFormData error:", error);
      throw error;
    }
  };
  const getAllBooks = async (page, size) => {
    try {
      return await doGetParams({
        url: SERVICE.BOOKS,
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

  const getBookById = async (id) => {
    try {
      return await doGet({
        url: `${SERVICE.BOOKS}/${id}`,
      });
    } catch (error) {
      console.log("doGet error:", error);
      throw error;
    }
  };

  const updateBookById = async (id, book) => {
    try {
      return await doPut({
        url: `${SERVICE.BOOKS}/${id}`,
        data: book,
      });
    } catch (error) {
      console.log("doPut error:", error);
      throw error;
    }
  };

  const deleteBook = async (id) => {
    try {
      return await doDelete({
        url: `${SERVICE.BOOKS}/${id}`,
      });
    } catch (error) {
      console.log("doDelete error:", error);
      throw error;
    }
  };

  const searchBooksByTitle = async (page, size, title) => {
    try {
      return await doGetParams({
        url: SERVICE.BOOKS + "/search-by-title",
        params: {
          page: page,
          size: size,
          title: title,
        },
      });
    } catch (error) {
      console.log("doGetParams error:", error);
      throw error;
    }
  };

  const getTopBooks = async (topN) => {
    try {
      return await doGetParams({
        url: SERVICE.BOOKS + "/top-borrowed",
        params: {
          topN,
        },
      });
    } catch (error) {
      console.log("doGetParams error:", error);
      throw error;
    }
  };

  // Get top newest books with status AVAILABLE API
  const getNewestBooks = async (page, size, status) => {
    try {
      return await doGetParams({
        url: SERVICE.BOOKS + "/newest",
        params: {
          page,
          size,
          status
        },
      });
    } catch (error) {
      console.log("doGetParams error:", error);
      throw error;
    }
  };

  return {
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBook,
    createNewBook,
    searchBooksByTitle,
    getTopBooks,
    getNewestBooks
  };
};
