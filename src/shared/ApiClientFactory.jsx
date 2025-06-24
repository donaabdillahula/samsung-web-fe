import React from "react";

export const ApiClientFactory = (client) => {
  const doPost = async ({ url = "", data = null, headers = {} }) => {
    try {
      const response = await client.post(url, data, { headers });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("Error Response message:", error.response.data.message);
        console.log("Error Response Status:", error.response.status);
        const errorSend = {
          errorMessage: error.response.data.message.includes(":")
            ? error.response.data.message.split(":")[1].trim()
            : error.response.data.message,
          errorStatus: error.response.status,
        };
        throw errorSend;
      } else if (error.request) {
        console.log("No Response Received:", error.request);
        throw new Error("No response received from server.");
      } else {
        console.log("Error Setting Up Request:", error.message);
        throw new Error(`Request setup failed: ${error.message}`);
      }
    }
  };

  const doGet = async ({ url = "", params = {}, responseType = "json" }) => {
    try {
      const response = await client.get(url, { params, responseType }); // Pass `params` correctly
      return response.data; // Return the data directly
    } catch (error) {
      // Handle errors
      if (error.response) {
        console.log("Error Response message:", error.response.data.message);
        console.log("Error Response Status:", error.response.status);
        const errorSend = {
          errorMessage: error.response.data.message.includes(":")
            ? error.response.data.message.split(":")[1].trim()
            : error.response.data.message,
          errorStatus: error.response.status,
        };
        throw errorSend;
      } else if (error.request) {
        console.log("No Response Received:", error.request);
        throw new Error("No response received from server.");
      } else {
        console.log("Error Setting Up Request:", error.message);
        throw new Error(`Request setup failed: ${error.message}`);
      }
    }
  };

  const doPut = async ({ url = "", data = null }) => {
    try {      
      const response = await client.put(url, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("Error Response message:", error.response.data.message);
        console.log("Error Response Status:", error.response.status);
        const errorSend = {
          errorMessage: error.response.data.message.includes(":")
            ? error.response.data.message.split(":")[1].trim()
            : error.response.data.message,
          errorStatus: error.response.status,
        };
        throw errorSend;
      } else if (error.request) {
        console.log("No Response Received:", error.request);
        throw new Error("No response received from server.");
      } else {
        console.log("Error Setting Up Request:", error.message);
        throw new Error(`Request setup failed: ${error.message}`);
      }
    }
  };

  const doDelete = async ({ url = "", data = null }) => {
    try {
      const response = await client.delete(url, {
        data: data,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("Error Response message:", error.response.data.message);
        console.log("Error Response Status:", error.response.status);
        const errorSend = {
          errorMessage: error.response.data.message.includes(":")
            ? error.response.data.message.split(":")[1].trim()
            : error.response.data.message,
          errorStatus: error.response.status,
        };
        throw errorSend;
      } else if (error.request) {
        console.log("No Response Received:", error.request);
        throw new Error("No response received from server.");
      } else {
        console.log("Error Setting Up Request:", error.message);
        throw new Error(`Request setup failed: ${error.message}`);
      }
    }
  };

  const doPostFormData = async ({ url = "", data = null }) => {
    try {
      
      const response = await client.post(url, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("Error Response message:", error.response.data.message);
        console.log("Error Response Status:", error.response.status);
        const errorSend = {
          errorMessage: error.response.data.message.includes(":")
            ? error.response.data.message.split(":")[1].trim()
            : error.response.data.message,
          errorStatus: error.response.status,
        };
        throw errorSend;
      } else if (error.request) {
        console.log("No Response Received:", error.request);
        throw new Error("No response received from server.");
      } else {
        console.log("Error Setting Up Request:", error.message);
        throw new Error(`Request setup failed: ${error.message}`);
      }
    }
  };

  const doGetParams = async ({ url = "", params = {} }) => {
    try {
      const response = await client.get(url, { params: params });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("Error Response message:", error.response.data.message);
        console.log("Error Response Status:", error.response.status);
        throw new Error(
          `Request failed with status ${
            error.response.status
          }: ${JSON.stringify(error.response.data)}`
        );
      } else if (error.request) {
        console.log("No Response Received:", error.request);
        throw new Error("No response received from server.");
      } else {
        console.log("Error Setting Up Request:", error.message);
        throw new Error(`Request setup failed: ${error.message}`);
      }
    }
  };

  return {
    doPost,
    doGet,
    doPut,
    doDelete,
    doPostFormData,
    doGetParams,
  };
};
