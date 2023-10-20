const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix
	.js('resources/js/app.js', 'dist/js')
	.js('resources/js/admin.js', 'dist/js')
	.setPublicPath('dist')
	.react();

mix
	.sass('resources/scss/front.scss', 'dist/css')
	.sass('resources/scss/admin.scss', 'dist/css')
	.setPublicPath('dist')

mix
	.options({
		processCssUrls: false,
		postCss: [tailwindcss('./tailwind.config.js')],
	});

