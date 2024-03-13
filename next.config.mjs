/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.resolve.fallback = { fs: false };
        config.module.rules.push({
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                },
            }
        },
        )
        return config
    },
}

export default nextConfig;
