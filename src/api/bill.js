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

export const updateBill = async ({ bills, data }) => {
    for (let i = 0; i < bills.length; i++) {
        const response = await axios({
            method: "PUT",
            url: API_URL + "/bills/" + bills[i]._id,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        });
    }

    return true;
};

export const deleteBill = async (bill_id = "") => {
    const response = await axios({
        method: "DELETE",
        url: API_URL + "/bills/" + bill_id,
    });
    return response.data;
};
