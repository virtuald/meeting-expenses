
Meteor.methods({
	
	insertMeeting: function(data) {
		
		check(data, Schemas.Meetings);
		Schemas.Meetings.clean(data);
		
		if (Meetings.findOne({name: data.name}) != null)
			throw new Meteor.Error(401, "Cannot overwrite existing meeting");
		
		data.start = moment(data.start, TIME_FORMAT).toISOString();
		if (data.stop)
			data.stop = moment(data.stop, TIME_FORMAT).toISOString();
		
		Meetings.insert(data);
	},
	
	updateMeeting: function(i, data) {
		
		check(data, Schemas.Meetings);
		Schemas.Meetings.clean(data);
		
		var meeting = Meetings.findOne({name: data.$set.name});
		
		if (meeting.accessKey != data.$set.accessKey)
			throw new Meteor.Error(401, "Invalid access key specified");
		
		data.$set.name = meeting.name;
		Meetings.update(meeting._id, data);
	},
	
	deleteMeeting: function(id, accessKey) {
		var meeting = Meetings.findOne({_id: id});
		
		if (meeting.accessKey != accessKey)
			throw new Meteor.Error(401, "Invalid access key specified");
		
		Meetings.remove({_id: id});
	}
});

