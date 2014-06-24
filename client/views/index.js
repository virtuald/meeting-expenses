
Template.meeting_link.localStart = function()
{
	if (!this.start)
		return;
	
	return moment(new Date(this.start)).format("LLL");
};
