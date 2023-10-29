import { privateAxios } from "../helper"

export const saveQuestionInfo=async (question)=>{
    try {
        const res = await privateAxios.post(`/api/admin/question/save`, question);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const addTestCases=async (question_name, testCases)=>{
    try {
        const res = await privateAxios.post(`/api/admin/question/testcase/save/${question_name}`, 
        testCases);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteQuestion=async (questionName)=>{
    try {
        const res = await privateAxios.delete(`/api/admin/delete/question?questionName=${questionName}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const updateQuestion=async (question_id,question)=>{
    try {
        const res = await privateAxios.post(`/api/admin/update/question?id=${question_id}`, question);
        return res.data;
    } catch (err) {
        throw err;
    }
};