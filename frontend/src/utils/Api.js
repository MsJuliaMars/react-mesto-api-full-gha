class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this._token = null;
    }

    // Функция устанавливает новое значение токена
    setToken(token) {
        this._token = token;
        this._headers = {
            ...this._headers,
            'authorization': `Bearer ${token}`
        }
    }

    // ПР 11 получение информации о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            // credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Отправка данных о пользователе
    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            // credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }

    // Редактирование аватара
    setUserAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            // credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(link),
        }).then(this._checkResponse);
    }

    // Загрузка карточек с сервера
    downloadingCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Удаление карточки пользователя
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Добавление карточки
    setCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._checkResponse);
    }

    // Работа с лайком (постановка/удаление)
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Сообщение об ошибке
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Возникла ошибка моя: ${res.message}`);
    }
}

// Создаем один экземпляр класса на все приложение
const api = new Api({
    url: "https://api.mesto.kozhevnikova.nomoredomains.monster",//"http://localhost:3001", //"https://mesto.nomoreparties.co/v1/cohort-45",
    headers: {
        authorization: localStorage.getItem('token'),//`Bearer ${token}`,//"715ee43e-9fed-4d9c-98b6-32ed8625bba1",
        "Content-Type": "application/json",
    },
});

export default api;
