const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

if ( process.env.MOTION_FOR_WP_BUILD_TARGET === 'assets' ) {
	const plugins = defaultConfig.plugins
		.filter(
			( plugin ) => plugin.constructor.name !== 'CleanWebpackPlugin'
		)
		.map( ( plugin ) => {
			if ( plugin.constructor.name !== 'MiniCssExtractPlugin' ) {
				return plugin;
			}

			return new MiniCssExtractPlugin( {
				filename: ( pathData ) =>
					pathData.chunk.name === 'js/app'
						? 'css/front.css'
						: '[name].css',
			} );
		} );

	module.exports = {
		...defaultConfig,
		entry: {
			'js/admin': path.resolve( process.cwd(), 'resources/js/admin.js' ),
			'js/app': path.resolve( process.cwd(), 'resources/js/app.js' ),
		},
		output: {
			...defaultConfig.output,
			path: path.resolve( process.cwd(), 'dist' ),
		},
		plugins,
	};
} else {
	module.exports = defaultConfig;
}
