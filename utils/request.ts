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

const isServer = import.meta.server;

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development" || isServer) {
    return "http://localhost:3001/api";
  }
  return "https://mtsoft.lt/api";
};

export default {
  get: async (path: string, params: any = null) => {
    const url = new URL(`${getBaseUrl()}/${path}`);

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
    }

    const options: any = {
      method: "GET",
      credentials: "include",
    };

    if (isServer) {
      const headers = useRequestHeaders(["cookie"]);
      options.headers = {
        ...headers,
      };
    }

    return await $fetch(url.toString(), options);
  },

  post: async (path: string, body: any = null) => {
    const options: any = {
      method: "POST",
      body,
      credentials: "include",
    };

    if (isServer) {
      const headers = useRequestHeaders(["cookie"]);
      options.headers = {
        ...headers,
      };
    }

    return await $fetch(`${getBaseUrl()}/${path}`, options);
  },

  patch: async (path: string, body: any = null) => {
    const options: any = {
      method: "PATCH",
      body,
      credentials: "include",
    };

    if (isServer) {
      const headers = useRequestHeaders(["cookie"]);
      options.headers = {
        ...headers,
      };
    }

    return await $fetch(`${getBaseUrl()}/${path}`, options);
  },

  delete: async (path: string, params: any = null) => {
    const url = new URL(`${getBaseUrl()}/${path}`);

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
    }

    const options: any = {
      method: "DELETE",
      credentials: "include",
    };

    if (isServer) {
      const headers = useRequestHeaders(["cookie"]);
      options.headers = {
        ...headers,
      };
    }

    return await $fetch(url.toString(), options);
  },

  getNoCredentials: async (path: string, params: any = null) => {
    const url = new URL(`${getBaseUrl()}/${path}`);

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
    }

    const options: any = {
      method: "GET",
    };

    return await $fetch(url.toString(), options);
  },

  postNoCredentials: async (path: string, body: any = null) => {
    const options: any = {
      method: "POST",
      body,
    };

    return await $fetch(`${getBaseUrl()}/${path}`, options);
  },

  patchNoCredentials: async (path: string, body: any = null) => {
    const options: any = {
      method: "PATCH",
      body,
    };

    return await $fetch(`${getBaseUrl()}/${path}`, options);
  },

  deleteNoCredentials: async (path: string, params: any = null) => {
    const url = new URL(`${getBaseUrl()}/${path}`);

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
    }

    const options: any = {
      method: "DELETE",
    };

    return await $fetch(url.toString(), options);
  },
};
