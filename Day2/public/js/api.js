const API = {
  baseUrl: '',

  getToken() {
    return localStorage.getItem('token');
  },

  async request(method, url, data = null) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(this.baseUrl + url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: 'Gagal terhubung ke server' };
    }
  },

  get(url) {
    return this.request('GET', url);
  },

  post(url, data) {
    return this.request('POST', url, data);
  },

  put(url, data) {
    return this.request('PUT', url, data);
  },

  delete(url) {
    return this.request('DELETE', url);
  }
};
