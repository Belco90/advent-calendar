/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '**.supabase.co' },
			{ protocol: 'https', hostname: 'picsum.photos' },
		],
		unoptimized: true,
	},
}

module.exports = nextConfig
