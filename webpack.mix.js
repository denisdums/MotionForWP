let mix = require('laravel-mix');

mix
	.js('resources/js/app.js', 'dist/js')
	.js('resources/js/admin.js', 'dist/js')
	.setPublicPath('dist')
	.react();

mix
	.sass('resources/scss/app.scss', 'dist/css')
	.setPublicPath('dist')
