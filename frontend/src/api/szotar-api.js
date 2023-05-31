import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

export default {
	getTemak() {
        return httpClient.get('/temas');
    },

    getSzavak() {
        return httpClient.get('/szavaks');
    },

    ujTemak() {
        return httpClient.post('/new-tema');
    },
}