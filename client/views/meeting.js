
function calculateCost()
{
	var data = Router.getData();
	
	var start = new Date(data.start);
	var now = new Date();
	
	if (now < start)
		return 0;
	
	if (now > data.stop)
		now = data.stop;
	
	return (((data.smallParticipants || 0) * (data.smallParticipantsCost || 0)) + 
		   ((data.mediumParticipants || 0) * (data.mediumParticipantsCost || 0)) + 
		   ((data.largeParticipants || 0) * (data.largeParticipantsCost || 0))) *
		   ((now - start) / (3600.0 * 1000));
}

Template.meeting.localStart = function()
{
	if (!this.start)
		return;
	
	return moment(new Date(this.start)).format("LLL");
};

Template.meeting.hasStarted = function()
{
	var data = Router.getData();
	
	if (!data)
		return false;
	
	var now = new Date();
	
	return now >= new Date(data.start);
};

Template.meeting.rendered = function()
{
	var od = new Odometer({
		el: document.getElementById('odometer'),
		format: '(,ddd).dd',
		value: 0
	});
			
	this.tid = Meteor.setInterval(function(){
		od.update(calculateCost());
	}, 1000);
};

Template.meeting.destroyed = function()
{
	if (this.tid) Meteor.clearInterval(this.tid);
};

AutoForm.hooks({
	addMeeting: {
		onSuccess: function()
		{
			Router.go('index');
		},
		onError: function(op, err)
		{
			//alert(err);
		}
	},
	
	editMeeting: {
		onSuccess: function()
		{
			Router.go('meeting', {_id: Router.getData()._id });
		},
		onError: function(op, err)
		{
			alert(err);
		}
	}
});


Template.edit_meeting.currentMeeting = function()
{
	return Router.getData();
};

Template.edit_meeting.events({
	'click #delete-meeting': function(evt) {
		Meteor.call('deleteMeeting',
				Router.getData()._id,
				AutoForm.getFieldValue('editMeeting', 'accessKey'),
				function(err, result) {
			if (err)
				alert(err);
			else
				Router.go('index');
		});
	}
});

