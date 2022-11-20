// Default url for requesting backend
let baseUrl = "";

switch (process.env.NODE_ENV) {
    case 'development':
        // This is local development requesting url
        baseUrl = "http://localhost:3000/"
        break
    case 'test':
        // This is local testing requesting url
        baseUrl = "http://localhost:3000/"
        break
    case 'production':
        // This is remote production requesting url
        // Change this into your server ip/domain:port
        baseUrl = "http://localhost:3000"
        break
}

export default baseUrl;