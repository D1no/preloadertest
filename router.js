/*
	Simple Router Application, mimicing typical router tasks for testing.
	Style: Blog incl. Accounts
	Testing: miro:preloader, loading external js libraries by router extension 'preload'
*/

// Global Router Set-Up
Router.configure({
	layoutTemplate : 'Layout',
	loadingTemplate: 'Loading',

/*
	miro:preloader preload router extension
*/
	preload: {
		styles : '/styles/article_show.css',
		async  : '/configure_async.js',
		sync   : '/configure_sync.js',
		onAsync: function ( error, result ) {
			if ( error ) {
				console.error( '[Preloader - Router onAsync Handler] ERROR Checking file "' + error.fileName + '" ...\n' );
			} else {
				showPreloadVars();
			}
		},
		onSync : function ( fileName ) {
			showPreloadVars();

			return preloadVars.configureSync;
		}
	}
});

// Login-Authorization
Iron.Router.plugins.authorize = function ( router, options ) {
	router.onBeforeAction( function () {
		if ( Meteor.loggingIn() ) {
			return;
		} else if ( !Meteor.user() ) {
			this.redirect( this.lookupOption( 'notAuthorizedRoute' ) );
		} else {
			this.next();
		}
	}, options );
};

// Router Plugin
Router.plugin( 'authorize', {
	only              : 'article.new',
	notAuthorizedRoute: 'home'
});

// Routes
Router.route( '/', {
	name   : 'home',
	preload: {
		styles : '/styles/home.css',
		async  : '/home.js',
		onAsync: function ( error, result ) {
			if ( error ) {
				console.error( '[Preloader - Route onAsync Handler] ERROR Checking file "' + error.fileName + '" ...\n' );
			} else {
				showPreloadVars();
			}
		}
	}
});

Router.route( '/blog/new', {
	name      : 'article.new',
	preload   : {
		styles : '/styles/new_article.css'
	}
});

Router.route( '/blog/:_id', {
	name: 'article.show'
});

// Server-Side Routes
Router.route( 'webhooks/stripe', {
	name : 'webhooks.stripe',
	where: 'server'
})
	//Methods that are called, when a get or a post request is made. Set inside the WebhooksStripeController
	.get( 'get' )
	.post( 'post' );
