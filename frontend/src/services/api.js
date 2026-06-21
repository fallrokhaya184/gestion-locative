import axios from 'axios';

// Avec le proxy, on n'a plus besoin de mettre l'URL complète
const api = axios.create({
    baseURL: '/api',  // ← Plus besoin de http://localhost:8080
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Intercepteur pour logger les requêtes
api.interceptors.request.use(
    (config) => {
        console.log('📤 Requête :', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('❌ Erreur requête :', error);
        return Promise.reject(error);
    }
);

// Intercepteur pour logger les réponses
api.interceptors.response.use(
    (response) => {
        console.log('✅ Réponse :', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ Erreur réponse :', error.message);
        if (error.response) {
            console.error('❌ Statut :', error.response.status);
        }
        return Promise.reject(error);
    }
);

export default api;