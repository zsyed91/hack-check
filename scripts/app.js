var App = {
	init: function() {
		var $statusBtn = $("#submit");
		$statusBtn.click(this.checkStatus);

		this.compileTemplates();

	},
	api_path: "https://community-haveibeenpwned.p.mashape.com/breachedaccount/",
	api_token: "7zUVdPs4sfmsh5oFFQcRwMX62HKdp1BNVl6jsn62VZyLZ47Rb7",
	checkStatus: function(event){
		event.preventDefault();
		var email = $("#email").val();

		email = encodeURIComponent(email);

		$.ajax({
			type: 'GET',
			url: App.api_path + email,
			success: App.renderResponse,
			beforeSend: function(request) {
				request.setRequestHeader("X-Mashape-Key", App.api_token);
			}

		});
	},
	renderResponse: function(data) {
		var site;
		var $listing = $("#result");
		var ul;
		var listings = [];

		for (var index in data) {
			site = data[index];

			var listing = App.renderTemplate("listing", site);
			listings.push(listing);
		}
		ul = App.renderTemplate("breach-results", {listings: listings});
		$listing.append(ul);
	},

	compileTemplates: function() {
		$("script[type='text/x-handlebars-template']").each(function(index, template){
			var templateName = template.id;
			var source = $("#" + templateName).html();
			App.templates[templateName] = Handlebars.compile(source);
		});
	},
	templates: [],
	renderTemplate: function(template, context) {
		return this.templates[template](context);
	}
};

$(document).ready(function(){
	App.init();
});