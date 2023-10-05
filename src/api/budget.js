import axios from "axios";

import { API_URL } from "./data";

export const fetchBudgets = async () => {
    const response = await axios.get(API_URL + "/budgets");
    return response.data;
};

export const createBudget = async (data) => {
    const response = await axios({
        method: "POST",
        url: API_URL + "/budgets",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });
    return response.data;
};
