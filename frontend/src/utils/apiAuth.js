// export const BASE_URL = " https://auth.nomoreparties.co";
 //export const BASE_URL = "http://localhost:3001";
export const BASE_URL = "https://api.mesto.kozhevnikova.nomoredomains.monster"; //
const getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка моя: ${res.status}`);
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    }).then(getResponse);
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    }).then(getResponse);
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(getResponse);
};
