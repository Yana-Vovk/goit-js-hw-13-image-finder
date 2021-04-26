const API_KEY = '21320653-fe4a570a23bb891fd74acd9f9';
const BASE_URL = 'https://pixabay.com/api'

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
   
    async fetchImg() {
        try {const response = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
        const newResponse = await response.json();
            return newResponse.hits;
        } catch (err) {
            throw err;
        }
        
    }
    
    incrementPage(){
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
            return this.searchQuery;
    }
    set query(newQuery) {
            this.searchQuery = newQuery;
    }
}