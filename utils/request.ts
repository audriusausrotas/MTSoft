// import { useRequestHeaders } from "#app";

// const fetchData = async (
//   path: string,
//   method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
//   body: any = null,
//   withCredentials: boolean = true
// ) => {
//   const options: any = {
//     method,
//     credentials: withCredentials ? "include" : "same-origin",
//   };

//   if (body !== null) {
//     options.body = JSON.stringify(body);
//     options.headers = {
//       ...options.headers,
//       "Content-Type": "application/json",
//     };
//   }

//   if (import.meta.server && withCredentials) {
//     const headers = useRequestHeaders(["cookie"]);
//     options.headers = {
//       ...headers,
//       ...options.headers,
//     };
//   }

//   try {
//     const url =
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3001/api"
//         : import.meta.server
//         ? "http://localhost:3001/api"
//         : "https://mtsoft.lt/api";

//     console.log(`${url}/${path}`, options);

//     const data: any = await $fetch(`${url}/${path}`, options);

//     return data;
//   } catch (error) {
//     console.error(`Error during ${method} request to ${path}:`, error);
//     throw error;
//   }
// };

// export default {
//   get: (path: string, withCredentials: boolean = true) =>
//     fetchData(path, "GET", null, withCredentials),
//   post: (path: string, body: any = null, withCredentials: boolean = true) =>
//     fetchData(path, "POST", body, withCredentials),
//   patch: (path: string, body: any = null, withCredentials: boolean = true) =>
//     fetchData(path, "PATCH", body, withCredentials),
//   delete: (path: string, body: any = null, withCredentials: boolean = true) =>
//     fetchData(path, "DELETE", body, withCredentials),

//   getNoCredentials: (path: string) => fetchData(path, "GET", null, false),
//   postNoCredentials: (path: string, body: any = null) => fetchData(path, "POST", body, false),
//   patchNoCredentials: (path: string, body: any = null) => fetchData(path, "PATCH", body, false),
//   deleteNoCredentials: (path: string, body: any = null) => fetchData(path, "DELETE", body, false),
// };

import { useRequestHeaders } from "#app";

const getApiUrl = (path: string) => {
  if (process.env.NODE_ENV === "development" || import.meta.server) {
    return `http://localhost:3001/api/${path}`;
  }
  return `https://mtsoft.lt/api/${path}`;
};

export default {
  get: async (path: string) => {
    const options: any = {
      method: "GET",
      credentials: "include",
    };

    if (import.meta.server) {
      options.headers = useRequestHeaders(["cookie"]);
    }
    console.log(getApiUrl(path), options);
    return await $fetch(getApiUrl(path), options);
  },

  post: async (path: string, body: any = {}) => {
    const options: any = {
      method: "POST",
      body,
      credentials: "include",
    };

    if (import.meta.server) {
      options.headers = useRequestHeaders(["cookie"]);
    }

    return await $fetch(getApiUrl(path), options);
  },

  patch: async (path: string, body: any = {}) => {
    const options: any = {
      method: "PATCH",
      body,
      credentials: "include",
    };

    if (import.meta.server) {
      options.headers = useRequestHeaders(["cookie"]);
    }

    return await $fetch(getApiUrl(path), options);
  },

  delete: async (path: string, body: any = {}) => {
    const options: any = {
      method: "DELETE",
      body,
      credentials: "include",
    };

    if (import.meta.server) {
      options.headers = useRequestHeaders(["cookie"]);
    }

    return await $fetch(getApiUrl(path), options);
  },

  getNoParams: async (path: string) => {
    const options: any = {
      method: "GET",
    };

    return await $fetch(getApiUrl(path), options);
  },

  postNoParams: async (path: string, body: any = {}) => {
    const options: any = {
      method: "POST",
      body,
    };

    return await $fetch(getApiUrl(path), options);
  },

  patchNoParams: async (path: string, body: any = {}) => {
    const options: any = {
      method: "PATCH",
      body,
    };

    return await $fetch(getApiUrl(path), options);
  },

  deleteNoParams: async (path: string, body: any = {}) => {
    const options: any = {
      method: "DELETE",
      body,
    };

    return await $fetch(getApiUrl(path), options);
  },
};
