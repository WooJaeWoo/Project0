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
	extendScrollMove : function () {
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
	extendAnimateCSS : function () {
		$.fn.extend({
			animateCSS: function (animationName) {
				$(this).addClass('animated ' + animationName);
			},
			unanimateCSS: function(animationName) {
				$(this).removeClass('animated ' + animationName);
			}
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
	Project0.init();
});

$(window).on("load", function () {
	
});


var Project0 = {
	init: function() {
		Util.extendClickEvent();
		Util.extendAnimateCSS();
		
		if (!Util.backgroundClipCheck() || !Util.transitionendCheck()) {
			$("#browserRecommend").css("display", "block");
		}
		
		// Start!!!
		$("#startButton").on("touchClick", this.start.bind(this));
	},
	start: function() {
		// move index page up and remove itself for performance
		$("#index").addClass("up").one("transitionend", function() {
			$(this).remove();
		});
		
		Page.init();
	}
}


var Page =  {
	currentPage: 1,
	setCurrentPage: function(page) { this.currentPage = page; },
	logoColor: [ "#fff", "#a88174", "#fff", "#000", "#777", "#ddd", "#111", "#ccc" ],
	frameColor: [ "#897777", "#be8985", "#537187", "#000", "#777", "#ddd", "#111", "#ccc" ],
	init: function() {
		// first section
		this.setCurrentPage(1);
		
		// init sections
		SectionInit.init();
		
		// make first section as "out" state
		SectionOut.clean(SectionOut.section1);
		
		// nav로 페이지 이동
		$("#nav").on("touchClick", "li", function(event) {
			var page = $(event.currentTarget).find(".dot").data("page");
			if (page !== this.currentPage) {
				// section out
				SectionOut.clean(SectionOut["section" + this.currentPage]);
				
				// set new page
				this.setCurrentPage(page);
				// and go page!
				this.goPage(page);
			}
		}.bind(this));
		
		// next 버튼으로 페이지 이동		
		$("#nextButton").on("touchClick", function(event) {
			// section out
			SectionOut.clean(SectionOut["section" + this.currentPage]);
			
			if (this.currentPage === 8) {
				console.log("send answer!");
			} else {
				this.goNext();
			}
		}.bind(this));
		
		// page 변환하면 nav animation과 frame 색깔 수정하기
		$("#main").on("transitionend", function() {
			this.changeLogoColor();
			this.changeFrameColor();
			// run section in
			SectionIn.start(SectionIn["section" + this.currentPage]);
		}.bind(this));
		
		// open first section
		this.goPage(this.currentPage);
	},
	goNext: function() {
		if (this.currentPage < 8) {
			this.setCurrentPage(this.currentPage + 1);
			this.goPage(this.currentPage);
		}
	},
	goPage: function(page) {
		// page range check
		if (page < 1 || page > 8) return;
		
		this.dottingAnimation();

		// move main element and then render page contents
		var left = ((page - 1) * (-100)) + "%";
		$("#main").css("left", left);
	},
	changeLogoColor: function() {
		$("#logoSVG").find("path").attr("fill", this.logoColor[this.currentPage - 1]);
	},
	changeFrameColor: function() {
		$("#frame").css("borderColor", this.frameColor[this.currentPage - 1]);
	},
	dottingAnimation: function() {
		var dots = $("#nav").find("li");
		dots.find(".dot").removeClass("on");
		dots.eq(this.currentPage - 1).find(".dot").addClass("on");
	}
};

// 각 section에 이벤트 리스너를 붙이고 초기 상태를 세팅
var SectionInit = {
	init: function() {
		for (var i = 1; i <= 8; i++) {
			this["section" + i]();
		}
	},
	section1: function() {
		$("#section1").find(".aBox").on("touchClick", "img", function(event) {
			Answer.answerObj.a1 = $(event.currentTarget).data("value");
		});
	},
	section2: function() {
		
	},
	section3: function() {
		$("#section3").find(".aBox").on("touchClick", "button", function(event) {		
			var value = $(event.currentTarget).data("value");
			if (value === "yes") {
				$("#frame").css("borderColor", "#ffb5d1");
			} else {
				$("#frame").css("borderColor", "#537187");
			}
			$("#section3").removeClass().addClass(value);
			Answer.answerObj.a3 = value;
		});
	},
	section4: function() {
		
	},
	section5: function() {
		
	},
	section6: function() {
		
	},
	section7: function() {
		
	},
	section8: function() {
		
	}
};

// section 전환 시 새 페이지 효과
var SectionIn = {
	start: function(sectionCallBack) {
		var section = $("#section" + Page.currentPage);
		section.find(".qNum").animateCSS("fadeInUp");
		setTimeout(function() {
			section.find(".question").animateCSS("fadeInUp");
			sectionCallBack(section);
		}, 500);
	},
	section1: function(section) {
		section.find("#genderTagM").animateCSS("bounceInDown");
		setTimeout(function() {
			section.find("#genderTagF").animateCSS("bounceInDown");
		}, 300);		
	},
	section2: function(section) {
	},
	section3: function(section) {
		$("#marriageButton").animateCSS("fadeInUpBig");
	},
	section4: function(section) {
	},
	section5: function(section) {
	},
	section6: function(section) {
	},
	section7: function(section) {
	},
	section8: function(section) {
	}
};

// section 전환 시 헌 페이지 숨기기 (새 페이지 SectionIn이 가능하도록)
var SectionOut = {
	clean: function(sectionCallBack) {
		var section = $("#section" + Page.currentPage);
		setTimeout(function() {
			section.find(".qNum").unanimateCSS("fadeInUp");
			section.find(".question").unanimateCSS("fadeInUp");
			sectionCallBack(section);
		}, 1000);
	},
	section1: function(section) {
		section.find(".genderTag").unanimateCSS("bounceInDown");
	},
	section2: function(section) {
		
	},
	section3: function(section) {
		
	},
	section4: function(section) {
		
	},
	section5: function(section) {
		
	},
	section6: function(section) {
		
	},
	section7: function(section) {
		
	},
	section8: function(section) {
		
	}
};

var Answer = {
	answerObj: {
		a1: null,
		a2: null,
		a3: null,
		a4: null,
		a5: [],
		a6: null,
		a7: null,
		a8: []
	},
	submitAnswer: function() {
		$.ajax({
			url: "/result",
			type: "POST",
			data: Answer.answerObj,
			dataType: "html",
			success: function(res) {
				$("main").html(res);
			},
			error: function(res) {
				console.log("[error] Ajax Result");
				if (res) {
					console.log(res.responseText);
				}
			}
		});
	}
};

/*

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
