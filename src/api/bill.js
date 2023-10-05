import axios from "axios";

import { API_URL } from "./data";

export const fetchBills = async () => {
    const response = await axios.get(API_URL + "/bills");
    return response.data;
};

export const getBill = async (id) => {
    const response = await axios.get(API_URL + "/bills/" + id);
    return response.data;
};

export const addBill = async (data) => {
    const response = await axios({
        method: "POST",
        url: API_URL + "/bills",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });
    return response.data;
};

export const updateBill = async ({ id, data }) => {
    console.log(id);
    const response = await axios({
        method: "PUT",
        url: API_URL + "/bills/" + id,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });
    return response.data;
};

export const deleteBill = async (product_id = "") => {
    const response = await axios({
        method: "DELETE",
        url: API_URL + "/bills/" + product_id,
    });
    return response.data;
};
