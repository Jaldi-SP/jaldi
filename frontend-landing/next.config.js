// next.config.js
module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:6464/:path*", // Proxy to Backend
            },
        ];
    },
};
