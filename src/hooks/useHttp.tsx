// export const useHttp = () => {
//     const request = async (
//         url: string,
//         method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
//         body: any = null,
//         headers: any = { "Content-Type": "application/json" }
//     ) => {
//         try {
//             const response = await fetch(url, { method, body, headers });
//             if (!response.ok) {
//                 throw new Error(
//                     `Could not fetch ${url}, status: ${response.status}`
//                 );
//             }
//             const contentType = response.headers.get('content-type');
//             if (!contentType || !contentType.includes('application/json')) {
//                 return {};
//             }
//             const data = await response.json();
//             return data;
//         } catch (e) {
//             throw e;
//         }
//     };

//     return { request };
// };


import { instance, fileInstance } from 'services/API';

export const useHttp = () => {


    const request = async (
        url: string,
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
        data: any = null,
        config: any = {},
        isFile: boolean = false
    ) => {
        try {
            let response;
            if (isFile) {
                response = await fileInstance({
                    url,
                    method,
                    data,
                    ...config,
                });
            } else {
                response = await instance({
                    url,
                    method,
                    data,
                    ...config,
                });
            }

            if (response.status >= 400) {
                throw new Error(
                    `Could not fetch ${url}, status: ${response.status}`
                );
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return { request };
};

