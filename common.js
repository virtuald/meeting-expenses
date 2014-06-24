
TIME_FORMAT = "YYYY-MM-DD HH:mm";

Schemas = {};
Schemas.Meetings = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    accessKey: {
        type: String,
        label: "Access Key",
        min: 8
    },
    start: {
        type: String,
        label: "Start",
        custom: function()
        {
        	if (!moment(this.value, TIME_FORMAT).isValid()) return "Invalid start date, must be " + TIME_FORMAT;
        }
    },
    stop: {
        type: String,
        label: "Stop",
        optional: true,
        custom: function()
        {
        	if (this.isSet && !moment(this.value, TIME_FORMAT).isValid()) return "Invalid stop date, must be " + TIME_FORMAT;
        }
    },
    smallParticipants: {
        type: Number,
        label: "Small Participants",
        min: 0,
        defaultValue: 0,
        optional: true
    },
    smallParticipantsCost: {
        type: Number,
        label: "Small Cost",
        min: 0,
        defaultValue: 150,
        optional: true
    },
    mediumParticipants: {
        type: Number,
        label: "Medium Participants",
        min: 0,
        defaultValue: 0,
        optional: true
    },
    mediumParticipantsCost: {
        type: Number,
        label: "Medium Cost",
        min: 0,
        defaultValue: 200,
        optional: true
    },
    largeParticipants: {
        type: Number,
        label: "Large Participants",
        min: 0,
        defaultValue: 0,
        optional: true
    },
    largeParticipantsCost: {
        type: Number,
        label: "Large Cost",
        min: 0,
        defaultValue: 300,
        optional: true
    }
}
);


Meetings = new Meteor.Collection('Meetings');
Meetings.attachSchema(Schemas.Meetings);

var meetingsPager = new Meteor.Pagination(Meetings,{
    router: 'iron-router',
    routerTemplate: 'index',
    route: '/meetings/',
    itemTemplate: 'meeting_link',
    fields: {accessKey: false}
});





