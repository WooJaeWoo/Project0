$(document).on("ready", function () {
	console.log("Welcome to Project0!");
	Page.init();
	Question.init();
	//scroll = new Scroll();
	//swipe = new Swipe();
	$("#getResultBtn").on("click", getResult);
});

$(window).on("load", function () {
	
});

var Answer = { //dummy
	a1: null,
	a2: null,
	a3: null,
	a4: null,
	a5: [],
	a6: null,
	a7: null,
	a8: []
};

var Question = {
	init: function() {
		$(".q1").on("click", "button", function(event) {
			$(".q1 button").removeClass("on");
			$(event.currentTarget).addClass("on");
			Answer.a1 = $(event.currentTarget).val();
		});
		$(".q2").on("change", "select", function(event) {
			Answer.a2 = $(event.currentTarget).val();
		});
		$(".q3").on("click", "button", function(event) {
			if ($(event.currentTarget).val() == "false") {
				$(event.currentTarget).val("true").text("married");
			} else {
				$(event.currentTarget).val("false").text("Not married");
			}
			Answer.a3 = $(event.currentTarget).val();
			$(event.currentTarget).toggleClass("on");
		});
		$(".q4").on("change", "input", function(event) {
			Answer.a4 = $(event.currentTarget).val();
		});
		$(".q5").on("click", "button", function(event) {
			if ($(event.currentTarget).hasClass("on")) {
				$(event.currentTarget).removeClass("on");
				var i = Answer.a5.indexOf($(event.currentTarget).val());
				Answer.a5.splice(i, 1);
				return;
			}
			
			var buttons = $(".q5 button");
			var cnt = 0;
			for (var i = 0; i < buttons.length; i++) {
				if ($(buttons[i]).hasClass("on")) {
					cnt++;
				}
			}
			if (cnt < 2) {
				$(event.currentTarget).addClass("on");
				Answer.a5.push($(event.currentTarget).val());
			}
		});
		$(".q6").on("change", "input", function(event) {
			Answer.a6 = $(event.currentTarget).val();
		});
		$(".q7").on("click", "button", function(event) {
			$(".q7 button").removeClass("on");
			$(event.currentTarget).addClass("on");
			Answer.a7 = $(event.currentTarget).val();
		});
		$(".q8").on("click", "button", function(event) {
			if ($(event.currentTarget).hasClass("on")) {
				$(event.currentTarget).removeClass("on");
				var i = Answer.a8.indexOf($(event.currentTarget).val());
				Answer.a8.splice(i, 1);
				return;
			}
			
			var buttons = $(".q8 button");
			var cnt = 0;
			for (var i = 0; i < buttons.length; i++) {
				if ($(buttons[i]).hasClass("on")) {
					cnt++;
				}
			}
			if (cnt < 2) {
				$(event.currentTarget).addClass("on");
				Answer.a8.push($(event.currentTarget).val());
			}
		});
	}
}

var Page =  {
	currentPage: null,
	//pageInfo: [ "hello", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "result" ],
	init: function() {
		this.currentPage = 0;
		this.fillContents();
	},
	goPrev: function() {
		if (this.currentPage > 0) {
			this.currentPage--;
			this.fillContents();
		}
	},
	goNext: function() {
		if (this.currentPage < this.pageInfo.length) {
			this.currentPage++;
			this.fillContents();
		}
	},
	fillContents: function() {
		//$("main").find("h1").text(this.pageInfo[this.currentPage]);
	}
};

function getResult() {
	$.ajax({
		url: "/result",
		type: "POST",
		data: Answer,
		dataType: "html",
		success: function(res) {
			$("main").html(res);
		},
		error: function() {
			console.log("[error] get result ajax!!!");
		}
	});
}

/*
var Scroll = function () {};
Scroll.prototype = {
	init: function () {
		$(window).one("mousewheel", this.scrollHandler.bind(this));
	},
	scrollHandler: function (event) {
		if (event.originalEvent.wheelDelta > 0) {
			console.log('Scroll up');
			Page.goPrev();
		}
		else {
			console.log('Scroll down');
			Page.goNext();
		}
	}
};

var Swipe = function () {};
Swipe.prototype = {
	init: function () {
		var main = document.getElementById("main");
		var mc = new Hammer(main);
		
		mc.on("tap panup pandown", function(event) {
			if (event.type === "panup") {
				this.panUpHandler();
			} else if (event.type === "pandown") {
				this.panDownHandler();
			}
		}.bind(this));
	},
	panUpHandler: function() {
		Page.goNext();
	},
	panDownHandler: function() {
		Page.goPrev();
	}
};
*/