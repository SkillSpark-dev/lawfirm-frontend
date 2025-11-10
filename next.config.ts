
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

};

export default nextConfig;


