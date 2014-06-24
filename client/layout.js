
Template.layout.events({
	'click #navbar-index': function(evt) {
		Router.go('index');
	}
});

Template.layout.events({
	'click #navbar-edit-meeting': function(evt) {
		Router.go('edit_meeting', {_id: Router.getData()._id });
	}
});
