
var subs = new SubsManager({
  // will be cached only 20 recently used subscriptions
  cacheLimit: 20,
  // any subscription will be expired after 5 minutes of inactivity
  expireIn: 5
});


Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function () {
	this.route('index', {
		path: '/meetings'
	});
	
	this.route('new-meeting', {
		path: '/meeting/new'
	});
	
	this.route('meeting', {
		path: '/meeting/:_id',
		waitOn: function() {
			return subs.subscribe('Meetings', this.params._id);
		},
		data: function() {
			var d = Meetings.findOne({_id: this.params._id});
			d.editable = true;
			return d;
		}
	});
	
	this.route('edit_meeting', {
		path: '/meeting/:_id/edit',
		waitOn: function() {
			return subs.subscribe('Meetings', this.params._id);
		},
		data: function() {
			return Meetings.findOne({_id: this.params._id});
		}
	});
});

