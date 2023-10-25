import { isLogin } from "../auth";
import { myAxios, privateAxios } from "./helper"

export const getQuestionByName=async (name)=>{
    let url;
    if(isLogin()){
        url = `/api/question/get/${name}`;
    }
    else{
        url = `/api/public/get/question/${name}`;
    }
    try {
        const response = await privateAxios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getQuestionListByDifficulty = async (page_num,quantity,difficulty) => {
    try{
        const res = await privateAxios
        .post(`/api/public/questions/get-name?page_num=${page_num}&quantity=${quantity}`,
        difficulty);
        return res.data;
    }
    catch(err){
        throw err;
    }
};

export const postQuestionComment=async (questionComment)=>{
    try {
        const res = await privateAxios.post(`/api/question/comments/save`, questionComment);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getQuestionComments=async (questionName,page_num,limit)=>{
    try {
        const res = await myAxios.get(`/api/public/get/questionComments?questionName=${questionName}&page_num=${page_num}&limit=${limit}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getQuestionInfo=async (questionName)=>{
    try {
        const res = await myAxios.get(`/api/public/get/question-comment-info?questionName=${questionName}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const delQuestionComment=(commentId)=>{
    return privateAxios.post(`/api/question/comments/delete?comment_id=${commentId}`)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        throw err;
    });
};

export const getQuestionListInfo=()=>{
    return myAxios.get(`/api/public/get/question-list-info`)
    .then((res)=>res.data)
    .catch((err)=>{
        throw err;
    });
};