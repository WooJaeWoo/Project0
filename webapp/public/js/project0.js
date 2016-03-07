var Util = {
    rand : function (limit) {
        return Math.floor(Math.random() * limit);
    },
	extendClickEvent : function () {
		$.event.special.touchClick = {
			bindType: (function () {
				if (this.isMobile()) {
					return "touchstart";
				}
				return "click";
			}.bind(this))(),
			delegateType: (function () {
				if (this.isMobile()) {
					return "touchstart";
				}
				return "click";
			}.bind(this))()
		};
	},
	extendScrollMove : function() {
		$.fn.scrollMove = function () {
			return this.each(function () {
				$("html, body").animate({
					scrollTop: $(this).offset().top
				}, 1000);
			});
		}
	},
	extendBgClip : function() {
		/**
			-webkit-background-clip: text Polyfill

			# What? #
			A polyfill which replaces the specified element with a SVG
			in browser where "-webkit-background-clip: text" 
			is not available.
		**/

		Element.prototype.backgroundClipPolyfill = function () {
			var a = arguments[0],
				d = document,
				b = d.body,
				el = this;

			function hasBackgroundClip() {
				return b.style.webkitBackgroundClip != undefined;
			};

			function addAttributes(el, attributes) {
				for (var key in attributes) {
					el.setAttribute(key, attributes[key]);
				}
			}

			function createSvgElement(tagname) {
				return d.createElementNS('http://www.w3.org/2000/svg', tagname);
			}

			function createSVG() {
				var a = arguments[0],
					svg = createSvgElement('svg'),
					pattern = createSvgElement('pattern'),
					image = createSvgElement('image'),
					text = createSvgElement('text');

				// Add attributes to elements
				addAttributes(pattern, {
					'id' : a.id,
					'patternUnits' : 'userSpaceOnUse',
					'width' : a.width,
					'height' : a.height
				});

				addAttributes(image, {
					'width' : a.width,
					'height' : a.height
				});
				image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a.url);

				addAttributes(text, {
					'x' : 0,
					'y' : 200,
					'class' : a['class'],
					'style' : 'fill:url(#' + a.id + ');'
				});

				// Set text
				text.textContent = a.text;

				// Add elements to pattern
				pattern.appendChild(image);

				// Add elements to SVG
				svg.appendChild(pattern);
				svg.appendChild(text);

				return svg;
			};

		  /*
		   * Replace the element if background-clip
		   * is not available.
		   */
			if (!Util.backgroundClipCheck()) {
				var img = new Image();
				img.onload = function() {
					var svg = createSVG({
						'id' : a.patternID,
						'url' : a.patternURL,
						'class' : a['class'],
						'width' : this.width,
						'height' : this.height,
						'text' : el.textContent
					});

					el.parentNode.replaceChild(svg, el);
				}
				img.src = a.patternURL;
			}
		};

		var element = document.getElementById("spotlight");
		element.backgroundClipPolyfill({
			'patternID' : 'stripePattern',
			'patternURL' : '../img/stripe.jpg',
			'class' : 'spotlight'
		});
	},
	backgroundClipCheck : function () {
		return document.body.style.webkitBackgroundClip != undefined;
	},
	transitionendCheck : function () {
		var transitions = {
			'transition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'otransitionend'
		};
		var elem = document.createElement("div");

		for (var t in transitions) {
			if (typeof elem.style[t] !== 'undefined'){
				return true;
			} else {
				return false;
			}
		}
	},
    isMobile : function () {
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
			return true;
        } else {
			return false;
		}
    }
};

$(document).on("ready", function () {
	console.log("Welcome to Project0!");
	//Page.init();
	//Question.init();
	//scroll = new Scroll();
	//swipe = new Swipe();
	//$("#getResultBtn").on("click", getResult);
	Project0.init();
});

$(window).on("load", function () {
	
});


var Project0 = {
	currentPage: null,
	init: function() {
		Util.extendClickEvent();
		//Util.extendBgClip();
		
		this.currentPage = 0;
		
		$("#startButton").on("touchClick", function() {
			console.log("start!!!");
		});
	}
}




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
