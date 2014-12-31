/*
	Simple Router Application, mimicing typical router tasks for testing.
	Style: Blog incl. Accounts
	Testing: miro:preloader, loading external js libraries by router extension 'preload'
*/

// Global Router Set-Up
Router.configure({
	layoutTemplate: 'Layout', 
	loadingTemplate: "Loading",
/*
	miro:preloader preload router extension
*/
	preload: {
		'sync': {
			'default': {
				'js'     : 'externaljs.js'
			}
		}
	}
});

// Login-Authorisation
Iron.Router.plugins.authorize = function (router, options) {
	router.onBeforeAction(function (){
		if (Meteor.loggingIn())
			return;
		else if (!Meteor.user())
			this.redirect(this.lookupOption('notAuthorizedRoute'));
		else
			this.next();
	}, options);
};

// Router Plugin
Router.plugin('authorize', {
	only: ["article.new"],
	notAuthorizedRoute: "home"
});

// Routes
Router.route('/',{name: "home"});
Router.route("/blog/new",{name: "article.new"});
Router.route('/blog/:_id',{name: "article.show"});

// Server-Side Routes
Router.route("webhooks/stripe", {name: "webhooks.stripe", where: "server"})
	//Methods that are called, when a get or a post request is made. Set inside the WebhooksStripeController
	.get('get')
	.post('post');