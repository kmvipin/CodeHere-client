export const doLogin=(props)=>{
    const {token,next} = props;
    localStorage.setItem('auth_token',token);
};

export const isLogin=()=>{
    const token = localStorage.getItem('auth_token');
    return token !== null ? true : false;
};

export const doLogout=()=>{
    localStorage.removeItem('auth_token');
    localStorage.removeItem("user");
};

export const getToken = ()=>{
    return localStorage.getItem('auth_token');
};

export const saveUser = (userData)=>{
    localStorage.setItem("user",JSON.stringify(userData));
};

export const getUser=()=>{
    if(isLogin){
        return JSON.parse(localStorage.getItem("user"));
    }else{
        return null;
    }
}