import { privateAxios, myAxios } from "./helper";

export const userLogin = async (authCredential)=>{
    const response = await myAxios.post(
        `/api/public/user_login`, authCredential
    );
    return response.data;
}

export const userSignup = async (person,otp) =>{
    const response = await myAxios.post(
        `/api/public/save/user?otp=${otp}`, person
    );
    return response.data;
}

export const uploadPostImage = async (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  const response = await privateAxios
        .post(`/post/image/upload/${postId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    return response.data;
};

export const saveMessage=async (message)=>{
    try {
        const res = await myAxios.post(`/api/public/save/contact`, message);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const getPublicProfileInfo=async (userName)=>{
    try {
        const res = await myAxios.get(`/api/public/user-profile/info/${userName}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const getEmailOrUsernameStatus=async (email,username)=>{
    try {
        const res = await myAxios.get(`/api/public/verify/user-status?username=${username}&&email=${email}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}