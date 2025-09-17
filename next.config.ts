import type { NextConfig } from "next";

const nextConfig ={
images: {
  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // your image host
        port: '',
        pathname: '/**',
      },
    ]
}

};

export default nextConfig;
