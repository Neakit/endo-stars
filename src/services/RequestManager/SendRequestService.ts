import axios from "axios";
import LocalStorageWorker from "@services/LocalStorageManager";
import { AUTH_TOKEN } from "@enum/index";

enum REQUEST_AUTH_TYPES {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

enum METHOD_TYPES {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

// const HOST_SCHEMA = {
//   HTTP: process.env.HTTP,
//   HTTPS: process.env.HTTPS,
//   API: process.env.API,
// };
const HOST_SCHEMA = {
  HTTP: "https://tranquil-bayou-55359.herokuapp.com/",
  HTTPS: "https://tranquil-bayou-55359.herokuapp.com/",
  API: "https://tranquil-bayou-55359.herokuapp.com/",
};

type RequestData = {
  params?: any;
  data?: any;
};

console.log("HOST_SCHEMA", HOST_SCHEMA);

const handleError = async (error: any, originalRequest: any) => {
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    LocalStorageWorker.remove(AUTH_TOKEN.ACCESS_TOKEN);
    // const authToken = LocalStorageWorker.get(AUTH_TOKEN.ACCESS_TOKEN);
    // const bodyFormData = new FormData();
    // bodyFormData.append('refreshToken', authToken);
    // try {
    // const res = await axios({
    //   method: 'post',
    //   url: `${HOST_SCHEMA.API}auth/login`,
    //   data: bodyFormData,
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    // setCookie(AUTH_TOKEN_KEYS.MAIN_TOKEN, res.data.accessToken);
    // setCookie(AUTH_TOKEN_KEYS.REFRESH_TOKEN, res.data.refreshToken);
    // axiosApiInstance.defaults.headers.Authorization = res.data.accessToken;
    // axiosApiInstance.defaults.headers.common.Authorization = res.data.accessToken;
    // return axiosApiInstance(originalRequest);
    // } catch (e) {
    //
    // return axiosApiInstance(originalRequest);
    // }
    return axiosApiInstance(originalRequest);
  } else {
    showError(error);
  }
};

const showError = (error: any) => {
  console.log("ERROR:", error);
  //   if (!ignoredErrors.map(e => e.code).includes(parseFloat(error.response.status))) {
  //     console.log('[ERROR HANDLER] :', { error });
  //     if (error?.response?.data?.errorMessages) {
  //       error.response.data.errorMessages.forEach(errorMessage => {
  //         addNotification({ text: `[Error] ${errorMessage}`, config: { color: 'error', timeout: 10000 } });
  //       });
  //     } else if (error?.response?.data?.message) {
  //       addNotification({ text: `[Error] ${error.response.data.message}`, config: { color: 'error', timeout: 10000 } });
  //     } else if (error?.message) {
  //       addNotification({ text: `[Error] ${error?.message}`, config: { color: 'error', timeout: 10000 } });
  //     } else if (error.response?.status === 501) {
  //       const errorMessage = window.$nuxt.$t('notification.networkError');
  //       addNotification({ text: `[Error] ${errorMessage}`, config: { color: 'error', timeout: 10000 } });
  //     } else {
  //       const errorMessage = 'No Error message provided';
  //       addNotification({ text: `[Error] ${errorMessage}`, config: { color: 'error', timeout: 10000 } });
  //     }
  //   }
};

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/json;charset=utf-8",
    };

    const authToken = LocalStorageWorker.get(AUTH_TOKEN.ACCESS_TOKEN);
    if ((<any>config).requestAuthType === REQUEST_AUTH_TYPES.PRIVATE) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    // else if ((<any>config).requestAuthType === REQUEST_AUTH_TYPES.PUBLIC) {
    //   // TODO: do something if necessary
    // }

    delete (<any>config).REQUEST_AUTH_TYPE;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    // @ts-ignore
    if (response.config.responsePrepare) {
      // @ts-ignore
      response.data = response.config.responsePrepare(response.data);
      // @ts-ignore
      delete response.config.responsePrepare;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.error("[REQUEST MANAGER] REQUEST ERROR", { error, originalRequest });
    handleError(error, originalRequest);
    throw error;
  },
);

const prepareUrl = (requestUrl: string) => {
  const requestUrlArray = requestUrl.split("://");
  if (requestUrlArray.length > 2) {
    console.warn("[REQUEST MANAGER] prepareUrl not correct requestUrl", requestUrl);
  } else if (requestUrlArray.length === 2) {
    const host = requestUrlArray[0].toUpperCase();
    // @ts-ignore
    if (HOST_SCHEMA[host]) {
      // requestUrl = HOST_SCHEMA[host as keyof typeof HOST_SCHEMA] + requestUrlArray[1];
      // @ts-ignore
      requestUrl = HOST_SCHEMA[host] + requestUrlArray[1];
    } else {
      console.warn("[REQUEST MANAGER] prepareUrl not correct hostSchema", requestUrl);
    }
  }
  return requestUrl;
};

const prepareRequestMethod = (requestMethod: string) => {
  const requestMethodMatch = /[a-zA-Z]+:[a-zA-Z]+/.test(requestMethod);
  const [methodType, authType]: Array<string> = requestMethod.split(":");
  if (requestMethodMatch && methodType in METHOD_TYPES && authType in REQUEST_AUTH_TYPES) {
    return {
      _requestNativeMethod: METHOD_TYPES[methodType as keyof typeof METHOD_TYPES],
      _requestAuthType: REQUEST_AUTH_TYPES[authType as keyof typeof REQUEST_AUTH_TYPES],
    };
  } else {
    throw new Error(
      `[REQUEST MANAGER] requestAuthType ${authType} is not correct type. The PRIVATE type will be set by default`,
    );
  }
};

const prepareData = (requestData: RequestData) => {
  return {
    _requestParams: requestData.params ? requestData.params : {},
    _requestData: requestData.data ? requestData.data : {},
  };
};

const SendRequest = (requestMethod: string, requestUrl: string, requestData: RequestData, responsePrepare: any) => {
  const { _requestNativeMethod, _requestAuthType } = prepareRequestMethod(requestMethod);

  const _requestUrl = prepareUrl(requestUrl);

  const { _requestParams, _requestData } = prepareData(requestData);

  const axiosObject = {
    baseURL: "",
    method: _requestNativeMethod,
    url: _requestUrl,
    params: _requestParams,
    data: _requestData,
    requestAuthType: _requestAuthType,
    responsePrepare: responsePrepare,
  };

  return axiosApiInstance(axiosObject).then(function (response) {
    if (!response) {
      return Promise.reject(new Error("REQUEST_ERROR"));
    }
    return response.data;
  });
};

export default SendRequest;
