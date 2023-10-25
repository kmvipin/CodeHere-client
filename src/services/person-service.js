import { myAxios, privateAxios } from "./helper";

export const getProfileInfo=async ()=>{
    try {
        const res = await privateAxios.get(`/api/person/profile-info`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const updatePersonProfile = async (person) =>{
    try {
        const res = await privateAxios.post(`/api/person/update/person-info`, person);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const logOut=async ()=>{
    try {
        const res = await privateAxios.post('/api/person/logout');
        return res.data;
    } catch (err) {
        return err;
    }
};

export const sendUserOTP=async (email)=>{
    try {
        const res = await myAxios.post(`/api/public/send-otp?email=${email}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const verifyOTP=async (otp,email)=>{
    try {
        const res = await myAxios.get(`/api/public/verify-otp?otp=${otp}&email=${email}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const changePass=async (email,otp,pass,confirmPass)=>{
    try {
        const res = await myAxios.post(`/api/public/change-pass?email=${email}&otp=${otp}&newPass=${pass}&confirmPass=${confirmPass}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};
