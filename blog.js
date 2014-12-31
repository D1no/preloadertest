/*
	Simple Router Application, mimicing typical router tasks for testing.
	Style: Blog incl. Accounts
	Testing: miro:preloader
*/

Articles = new Meteor.Collection('articles');

if (Meteor.isServer) {

	// For publish to routes
	Meteor.publish("articles", function () {
		return Articles.find();
	});
	Meteor.publish("article", function (id) {
		return Articles.find({_id: id});
	});


	// Create Dummy Articles for dynamic routing.
	Meteor.startup(function() {
		Articles.remove({});
		for (var i = 0; i < 8; i++) {
			var count = i + 1;
			Articles.insert({
				title: "Blog Article " + count,
				body: "This is the text body for the article " + count + " I want to show.",
				createAt: new Date,
				author: "John Doe"
			});
		}
	})

}
