import axios, { AxiosInstance }  from "axios";
import { getAccessToken } from "./session-helper";

/**
 * Interceptor for all api requests
 * @param apiInstance
 * @param headers
 */
const apiRequestInterceptor = async (apiInstance, headers?) => {
    await apiInstance.interceptors.request.use(async config => {

        if(headers && headers["Content-Type"] === "EXCLUDE") {
          delete config.headers["Content-Type"];
        } else if(headers && headers["Content-Type"]) {
          config.headers["Content-Type"] = headers["Content-Type"];
        } else {
          config.headers["Content-Type"] = "application/json"
        }

        if(headers && headers["Authorization"] === "EXCLUDE") {
          delete config.headers["Authorization"];
        } else if(headers && headers["Authorization"]) {
          config.headers["Authorization"] = headers["Authorization"];
        } else {
          const accessToken = await getAccessToken();
          accessToken ? config.headers["Authorization"] = `Bearer ${accessToken}` : "";
        }

        return config;
    })
}

/**
 * PUT request
 * @param url
 * @param data
 * @param config
 * @param headers
 */
export const put = async (url: string, data: object, config?: object, headers? ) => {
  const baseInstance: AxiosInstance = axios.create({
      baseURL: `${process.env.api}`
  });

  await apiRequestInterceptor(baseInstance, headers);

  return await baseInstance.put(url, data, config);
}

/**
 * POST request
 * @param url
 * @param data
 * @param config
 * @param headers
 */
export const post = async (url: string, data: object, config?: object, headers? ) => {
    const baseInstance: AxiosInstance = axios.create({
        baseURL: `${process.env.api}`
    });

    await apiRequestInterceptor(baseInstance, headers);

    return await baseInstance.post(url, data, config);
}

/**
 * GET request
 * @param url
 * @param config
 * @param headers
 */
export const get = async (url: string, config?: object, headers? ) => {
  const baseInstance: AxiosInstance = axios.create({
      baseURL: `${process.env.api}`
  });

  await apiRequestInterceptor(baseInstance, headers);

  return await baseInstance.get(url, config);
}

/**
 * Delete request
 * @param url
 * @param data
 * @param headers
 */
export const delt = async (url: string, data: object, headers? ) => {
  const baseInstance: AxiosInstance = axios.create({
      baseURL: `${process.env.api}`
  });

  await apiRequestInterceptor(baseInstance, headers);

  return await baseInstance.delete(url, { headers, data });
}

