import { useRequestHeaders } from "#app";

const fetchData = async (
  path: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  body: any = null,
  withCredentials: boolean = true
) => {
  const options: any = {
    method,
    credentials: withCredentials ? "include" : "same-origin",
    body: body || undefined,
  };

  if (import.meta.server && withCredentials) {
    const headers = useRequestHeaders(["cookie"]);
    options.headers = {
      ...headers,
    };
  }

  try {
    const data: any = await $fetch(`http://localhost:3001/${path}`, options);

    return data;
  } catch (error) {
    console.error(`Error during ${method} request to ${path}:`, error);
    throw error;
  }
};

export default {
  get: (path: string, withCredentials: boolean = true) =>
    fetchData(path, "GET", null, withCredentials),
  post: (path: string, body: any, withCredentials: boolean = true) =>
    fetchData(path, "POST", body, withCredentials),
  patch: (path: string, body: any, withCredentials: boolean = true) =>
    fetchData(path, "PATCH", body, withCredentials),
  delete: (path: string, withCredentials: boolean = true) =>
    fetchData(path, "DELETE", null, withCredentials),

  getNoCredentials: (path: string) => fetchData(path, "GET", null, false),
  postNoCredentials: (path: string, body: any) => fetchData(path, "POST", body, false),
  patchNoCredentials: (path: string, body: any) => fetchData(path, "PATCH", body, false),
  deleteNoCredentials: (path: string) => fetchData(path, "DELETE", null, false),
};
