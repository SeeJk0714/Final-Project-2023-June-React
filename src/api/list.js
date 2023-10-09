import axios from "axios";

import { API_URL } from "./data";

export const fetchLists = async () => {
    const response = await axios.get(API_URL + "/lists");
    return response.data;
};

export const addList = async (data) => {
    const response = await axios({
        method: "POST",
        url: API_URL + "/lists",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });
    return response.data;
};

// export const updateList = async ({ lists, data }) => {
//     for (let i = 0; i < lists.length; i++) {
//         const response = await axios({
//             method: "PUT",
//             url: API_URL + "/lists/" + lists[i]._id,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             data: data,
//         });
//     }

//     return true;
// };

export const ClickList = async (list_id = "") => {
    const response = await axios({
        method: "PUT",
        url: API_URL + list_id + "/update",
        // purchased: true,
    });
    return response.data;
};

export const UnclickList = async (list_id = "") => {
    const response = await axios({
        method: "PUT",
        url: API_URL + list_id + "/unupdate",
        // purchased: false,
    });
    return response.data;
};

export const deleteList = async (list_id = "") => {
    const response = await axios({
        method: "DELETE",
        url: API_URL + "/lists/" + list_id,
    });
    return response.data;
};
