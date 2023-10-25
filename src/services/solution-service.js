import { privateAxios } from "./helper"

export const runSolution=async (data)=>{
    try {
        const res = await privateAxios.post(`/api/solution/run/${data.questionName}`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const submitSolution=async (data)=>{
    try {
        const res = await privateAxios.post(`/api/solution/submit/${data.questionName}`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getUserSolution=async (questionName, language)=>{
    try {
        const res = await privateAxios.get(`/api/solution/get/user_solution/${questionName}?language=${language}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}