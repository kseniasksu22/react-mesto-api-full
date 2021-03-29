

export class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _responseServer(proms) {
    return proms.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  
  }

  getUserInfo(token) {
    const respon = fetch(`${this._url}users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return this._responseServer(respon);
  }

  setUserInfo(data, token) {
    const respon = fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });

    return this._responseServer(respon);
  }

  getAllCards(token) {
    const respon = fetch(`${this._url}cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return this._responseServer(respon);
  }

  postNewCard(data, token) {
    const respon = fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: data.link,
        name: data.name,
      }),
    });
    return this._responseServer(respon);
  }

  deleteCard(id, token) {
    const respon = fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return this._responseServer(respon);
  }

  putLike(id, token) {
    const respon = fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return this._responseServer(respon);
  }

  deleteLike(id, token) {
    const respon = fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return this._responseServer(respon);
  }

  getAvatarInfo(pic, token) {
    const respon = fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: pic.avatar,
      }),
    });

    return this._responseServer(respon);
  }
}

const api = new Api({
  baseUrl: "https://api.express-mesto-apik.nomoredomains.icu/",
 
});

export default api;
