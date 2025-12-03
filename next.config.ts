
const nextConfig ={
images: {
  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // your image host
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
},
output: 'export',
 trailingSlash: true,   

};

export default nextConfig;


