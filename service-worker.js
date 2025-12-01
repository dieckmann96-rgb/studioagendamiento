// Nome do cache para a versão atual.
const CACHE_NAME = 'studio-loyalty-v1';

// Recursos que serão armazenados em cache durante a instalação.
// Isto deve incluir o seu HTML, o link do Tailwind e os links do Firebase.
const urlsToCache = [
    '/loyalty_app.html', // O seu arquivo principal
    '/manifest.json', // O manifest
    'https://cdn.tailwindcss.com', // Tailwind CSS
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js', // Firebase App
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js', // Firebase Auth
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js' // Firebase Firestore
];

// Evento de Instalação: Armazena os arquivos no cache.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto com sucesso!');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de Fetch: Intercepta requisições e serve recursos do cache, se disponíveis.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna a resposta do cache, se existir
                if (response) {
                    return response;
                }
                // Caso contrário, faz a requisição normal
                return fetch(event.request);
            })
    );
});

// Evento de Ativação: Limpa caches antigos.
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

