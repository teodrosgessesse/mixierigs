/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify adapter handles deployment
  output: undefined,
  images: {
    unoptimized: false,
  },
  // Allow Babylon.js canvas
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }]
    return config
  },
}

export default nextConfig
