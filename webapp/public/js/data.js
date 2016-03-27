$(document).on("ready", function() {
	Data.init();
});



var Data = {
	init: function() {
		$("aside").on("click", "li", function(event) {
			var li = $(event.currentTarget);
			$("h1").text(li.text());
			this.getData(li.data("col"));
		}.bind(this));
	},
	getData: function(col) {
		$.ajax({
			url: "/data/" + col,
			method: "POST",
			dataType: "json",
			success: function(result) {
				console.log(result);
			},
			error: function(error) {
				console.log("Ajax Error");
				if (error) {
					console.log(error);
				}
			}
		});
	}
}