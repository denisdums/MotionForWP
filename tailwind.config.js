/** @type {import('tailwindcss').Config} */
module.exports = {
    important: '#motion-for-wp-wrapper',
    content: [
        "./resources/**/*.js",
        "./templates/**/*.php",
        "./classes/**/*.php"
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                'primary': {
                    DEFAULT: '#246DF6',
                },
                'secondary': {
                    'tone': '#FFDD00',
                    DEFAULT: '#FFEB00',
                },
            }
        },
    },
}