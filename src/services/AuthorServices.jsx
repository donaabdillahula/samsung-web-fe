import React from "react";
import { SERVICE } from "../shared/Constants";

export const AuthorService = ({ doPost, doGet, doPut, doDelete, doGetParams }) => {
  const createNewAuthor = async (name, description) => {
    try {      
      return await doPost({
        url: SERVICE.AUTHORS,
        data: {
          name,
          description
        },
      });
    } catch (error) {
      console.log("doPost error:", error);
      throw error;
    }
  };
  const getAllAuthors = async (page, size) => {
    try {
      return await doGetParams({
        url: SERVICE.AUTHORS,
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

  const getAuthorById = async (id) => {
    try {
      return await doGet({
        url: `${SERVICE.AUTHORS}/${id}`,
      });
    } catch (error) {
      console.log("doGet error:", error);
      throw error;
    }
  };

  const updateAuthorById = async (id, author) => {
    try {
      return await doPut({
        url: `${SERVICE.AUTHORS}/${id}`,
        data: author,
      });
    } catch (error) {
      console.log("doPut error:", error);
      throw error;
    }
  };

  const deleteAuthor = async (id) => {
    try {
      return await doDelete({
        url: `${SERVICE.AUTHORS}/${id}`,
      });
    } catch (error) {
      console.log("doDelete error:", error);
      throw error;
    }
  };

    const searchAuthorsByName = async (page, size, name) => {
    try {
      return await doGetParams({
        url: SERVICE.AUTHORS + "/search",
        params: {
          page: page,
          size: size,
          name: name,
        },
      });
    } catch (error) {
      console.log("doGetParams error:", error);
      throw error;
    }
  };

  return {
    getAllAuthors,
    getAuthorById,
    updateAuthorById,
    deleteAuthor,
    createNewAuthor,
    searchAuthorsByName,
  };
};
