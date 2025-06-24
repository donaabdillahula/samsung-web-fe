import React from "react";
import { SERVICE } from "../shared/Constants";

export const MemberService = ({
  doPost,
  doGet,
  doPut,
  doDelete,
  doGetParams,
}) => {
  const createNewMember = async (name, email, phone) => {
    try {
      return await doPost({
        url: SERVICE.MEMBERS,
        data: {
          name: name,
          email: email,
          phone: phone,
        },
      });
    } catch (error) {
      console.log("doPost error:", error);
      throw error;
    }
  };
  const getAllMembers = async (page, size) => {
    try {
      return await doGetParams({
        url: SERVICE.MEMBERS,
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

  const getMemberById = async (id) => {
    try {
      return await doGet({
        url: `${SERVICE.MEMBERS}/${id}`,
      });
    } catch (error) {
      console.log("doGet error:", error);
      throw error;
    }
  };

  const updateMemberById = async (id, member) => {
    try {
      member.updatedAt = null;
      return await doPut({
        url: `${SERVICE.MEMBERS}/${id}`,
        data: member,
      });
    } catch (error) {
      console.log("doPut error:", error);
      throw error;
    }
  };

  const deleteMember = async (id) => {
    try {
      return await doDelete({
        url: `${SERVICE.MEMBERS}/${id}`,
      });
    } catch (error) {
      console.log("doDelete error:", error);
      throw error;
    }
  };

  const searchMembersByName = async (page, size, name) => {
    try {
      return await doGetParams({
        url: SERVICE.MEMBERS + "/search",
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

    const getTopMembers = async (topN) => {
    try {
      return await doGetParams({
        url: SERVICE.MEMBERS + "/top-borrowed",
        params: {
          topN,
        },
      });
    } catch (error) {
      console.log("doGetParams error:", error);
      throw error;
    }
  };

  return {
    getAllMembers,
    getMemberById,
    updateMemberById,
    deleteMember,
    createNewMember,
    searchMembersByName,
    getTopMembers
  };
};
