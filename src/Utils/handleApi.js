import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constant/config";
import { getAccessToken,getType } from "./common-utils";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
})

axiosInstance.interceptors.request.use(
  function (config) {
    if(config.TYPE.params){
      config.params = config.TYPE.params;
    }else if(config.TYPE.query){
      config.url = config.url + '/' +config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);     //stop global loader here
  },
  function (error) {
    return Promise.reject(processError(error));    //stop global loader here
  }
)

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response?.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    }
  }
}

const processError = (error) => {
  if (error.response) {
    // Request made and server responded with a status code, thst falls out of the range 2.x.x
    console.log("ERROR IN RESPONSE:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    }
  } else if (error.request) {
    //request made but no response was received
    console.log("ERROR IN REQUEST:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    }
  } else {
    //something happened in setting up request that triggers an error
    console.log("ERROR IN NETWORK:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    }
  }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => 
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      headers:{
        authorization:getAccessToken(),
      },
      TYPE:getType(value,body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          showDownloadProgress(percentageCompleted);
        }
      }
    })
  }

export { API };
