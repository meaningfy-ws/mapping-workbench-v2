const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    // other headers omitted for brevity...
                    {key: "Cross-Origin-Opener-Policy", value: "same-origin"},
                    {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"}
                ]
            }
        ]
    }
}

module.exports = nextConfig