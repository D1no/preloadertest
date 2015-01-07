/**
 * Created by AProDino on 26.12.14.
 */

if ( Meteor.isClient ) {
	// HomeController = RouteController.extend({
	HomeController = PreloadController.extend({
		waitOn: function () {
			return [Meteor.subscribe("articles")];
		},
		data: function () {
			return  {
				articles: Articles.find()
			};
		},
		preload: {
			'sync': {
				'default': {
					'js'     : '/externaljs.js'
				}
			}
		}
	});
}

ArticleShowController = RouteController.extend({
	subscriptions: function () {
		Meteor.subscribe("article", this.params._id);
	},
	data: function () {
		return Articles.findOne({_id: this.params._id});
	}
});

ArticleNewController = RouteController.extend({
	action: function () {
		this.render();
	},
	sayHello: function	(){
		return "Hello World";
	}
});

ArticleNewController.events({
	'submit form#new-article': function (e, tmpl) {
		e.preventDefault();

		var form = tmpl.find('form');
		var title = tmpl.find('input[name=title]').value;
		var body = tmpl.find('textarea[name=body]').value;

		Articles.insert({
			title: title,
			body: body
		}, function (err, res) {
			if (!err) {
				Router.go('home', {}, {query: "q=s", hash: "hashfrag"});
			}
		})
	}
});

if(Meteor.isServer) {

WebhooksStripeController = RouteController.extend({
	get: function () {
		this.response.end("GET hello world\n");
	},

	post: function () {
		var json = this.request.body;
		this.response.end("You posted: " + JSON.stringify(json) + "\n");
	}
});

}
