/**
 * Created by AProDino on 26.12.14.
 * Modified by MiroHibler on 12.01.15.
 */

if ( Meteor.isClient ) {

	// HomeController = RouteController.extend({
	HomeController = PreloadController.extend({
		waitOn: function () {
			return [Meteor.subscribe( 'articles' )];
		},

		data: function () {
			return {
				articles: Articles.find()
			};
		},

		preload: {
			sync  : '/preload_controller.js',
			onSync: function ( fileName ) {
				showPreloadVars();

				return preloadVars.controller;
			}
		}
	});

	// ArticleShowController = RouteController.extend({
	ArticleShowController = PreloadController.extend({
		subscriptions: function () {
			Meteor.subscribe( 'article', this.params._id );
		},

		data: function () {
			return Articles.findOne({ _id: this.params._id });
		},

		preload: {
			styles: '/styles/article_show.css'
		}
	});

	// ArticleNewController = RouteController.extend({
	ArticleNewController = PreloadController.extend({
		action: function () {
			this.render();
		},

		sayHello: function () {
			return 'Hello World';
		}
	});

	ArticleNewController.events({
		'submit form#new-article': function ( event, template ) {
			event.preventDefault();

			var title = template.find( 'input[name=title]' ).value,
				body = template.find( 'textarea[name=body]' ).value;

			Articles.insert({
				title   : title,
				body    : body,
				createAt: new Date,
				author  : 'John Doe'
			}, function ( err, res ) {
				if ( !err ) {
					Router.go( 'home', {}, {
						query: 'q=s',
						hash : 'hashfrag'
					});
				}
			});
		}
	});
}

if ( Meteor.isServer ) {

	WebhooksStripeController = RouteController.extend({
		get: function () {
			this.response.end( 'GET hello world\n' );
		},

		post: function () {
			var json = this.request.body;

			this.response.end( 'You posted: ' + JSON.stringify( json ) + '\n' );
		}
	});

}
