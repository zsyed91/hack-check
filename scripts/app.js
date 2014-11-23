var App = {
	init: function() {
		var $statusBtn = $("#submit");
		$statusBtn.click(this.checkStatus);

		this.compileTemplates();
		this.addHandlebarsHelpers();

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
		$listing.empty();

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

	addHandlebarsHelpers: function(){
		Handlebars.registerHelper('formatDate', this.helpers.formatDate);
	},

	helpers: {
		formatDate: function(date) {
			var date_pieces = date.split("-");
			var final_date = new Date();
			final_date.setFullYear(date_pieces[0]);
			final_date.setMonth(date_pieces[1] - 1);
			final_date.setDate(date_pieces[2]);

			return final_date.toLocaleFormat("%b. %d, %Y");
		}
	},

	templates: [],
	
	renderTemplate: function(template, context) {
		return this.templates[template](context);
	}
};

$(document).ready(function(){
	App.init();
});