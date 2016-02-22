$(document).on("ready", function () {
	console.log("Welcome to Project0!");
	Page.init();
	//scroll = new Scroll();
	//swipe = new Swipe();
	$("#getResultBtn").on("click", getResult);
});

$(window).on("load", function () {
	
});
var Answer = {
	a1: "M",
	a2: 10,
	a3: true,
	a4: 5,
	a5: ["money", "bag"],
	a6: 20,
	a7: "red",
	a8: ["DIY", "cook", "travel"]
};

var Page =  {
	currentPage: null,
	pageInfo: [ "hello", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "result" ],
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
		$("main").find("h1").text(this.pageInfo[this.currentPage]);
	}
};

function getResult() {
	$.ajax({
		url: "/result",
		type: "POST",
		data: Answer,
		dataType: "html",
		success: function(res) {
			console.log(res);
		},
		error: function() {
			console.log("great!!!");
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