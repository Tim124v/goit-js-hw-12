import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '49429251-c344791abe1bae313073c39aa';

  constructor() {
    this.page = 1;
    this.query = '';
    this.per_page = 15;
  }

  async fetchImages() {
    try {
      const params = {
        key: this.#API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.per_page,
      };

      const response = await axios.get(this.#BASE_URL, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
