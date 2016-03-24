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
		};
	},
	extendBgClip : function () {
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
				return b.style.webkitBackgroundClip !== undefined;
			}

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
				return this;
			},
			unanimateCSS: function(animationName) {
				$(this).removeClass('animated ' + animationName);
				return this;
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
	limitPage: 9,  // TODO: 개발 후에는 1로 초기화 할 것
	setCurrentPage: function(page) { this.currentPage = page; },
	logoColor: [ "#fff", "#a88174", "#fff", "#fff", "#9ffff9", "#cce7bd", "#aa9981", "#ffd3ba", "#166152" ],
	frameColor: [ "#897777", "#be8985", "#537187", "#2e4f6c", "#426361", "#1c3130", "#5f494b", "#f1b9c3", "#166152" ],
	nextButtonColor: [ "#536866", "#8e5955", "#595657", "#946e00", "#234f47", "#15a65a", "#aa7b3a", "#793247" ],
	q7_holeColor: {
		default: ["#4C4142", "#514546", "#625354"],
		red: ["#E86767", "#ED7474", "#F48282"],
		cyan: ["#66AA9D", "#6DB8AA", "#7AC1B3"],
		yellow: ["#EACD1F","#F4D862", "#FCE781"],
		purple: ["#8F6799", "#9770A0", "#A17DAA"],
		green: ["#6BAF6B", "#76B776", "#87C687"]
	},
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
			
			if (page > this.limitPage) { return; }
			
			if (page !== this.currentPage) {
				// section out
				SectionOut.clean(SectionOut["section" + this.currentPage]);
				
				// and go page!
				this.goPage(page);
			}
		}.bind(this));
		
		// next 버튼으로 페이지 이동		
		$("#nextButton").on("touchClick", function(event) {
			// section out
			SectionOut.clean(SectionOut["section" + this.currentPage]);
			
			if (this.currentPage === $("main").children().length - 1) {
				Answer.submitAnswer();
			} else {
				if (this.currentPage === this.limitPage) {
					this.limitPage++;
				}
			}
			this.goNext();
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
		if (this.currentPage < $("#main").children().length) {
			this.goPage(this.currentPage + 1);
		}
	},
	goPage: function(page) {
		// page range check
		if (page < 1 || page > $("#main").children().length) return;
		
		// set new page
		this.setCurrentPage(page);
		
		this.navAnimation();
		
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
	showNextButton: function() {
		var button = $("#nextButton");
		button.html("Next Question <span>→</span>");
		if (this.currentPage === 8) {
			button.text("Finish");
		}
		
		button.addClass("on");
	},
	hideNextButton: function() {
		$("#nextButton").removeClass("on");
	},
	navAnimation: function() {
		
		if (this.currentPage === $("#main").children().length) return;
		
		$("#nav").find("li").eq(this.currentPage - 1).find(".dot").addClass("on");
		var progressWidth = (this.currentPage - 1) * 30 + 24;
		$("#navProgress").css("width", progressWidth + "px");
	}
};

// 각 section에 이벤트 리스너를 붙이고 초기 상태를 세팅
var SectionInit = {
	init: function() {
		for (var i = 1; i <= 9; i++) {
			this["section" + i]();
		}
	},
	section1: function() {
		$("#section1").find(".aBox").on("touchClick", ".tag", function(event) {
			var tag = $(event.currentTarget);
			$(event.delegateTarget).find(".tag").unanimateCSS("swing");
			tag.animateCSS("swing");
			Answer.answerObj.a1 = tag.data("value");
			
			Page.showNextButton();
		});
	},
	section2: function() {
		$("#section2").find(".aBox").on("touchClick", ".age", function(event) {
			var age = $(event.currentTarget)
			$("#section2").find(".age").removeClass("on");
			age.addClass("on");
			
			var value = age.data("value");
			Answer.answerObj.a2 = value;
			var angle = (value / 10 - 1) * 60;
			$("#section2 #clockNeedle1").css("transform", "rotate(" + angle + "deg)");
			
			Page.showNextButton();
		});
	},
	section3: function() {
		$("#section3").find(".aBox").on("touchClick", "button", function(event) {		
			var value = $(event.currentTarget).data("value");
			var btnImg = $("#marriageButtonImg");
			if (value === "yes") {
				$("#frame").css("borderColor", "#ffb5d1");
			} else {
				$("#frame").css("borderColor", "#537187");
			}
			$("#section3").removeClass().addClass(value);
			Answer.answerObj.a3 = value;
			
			Page.showNextButton();
		});
	},
	section4: function() {
		Answer.answerObj.a4 = "C";
		
		var Handle = function() {
			this.element = document.getElementById("handle");
			this.start;
			this.halfHeight = $(this.element).height() / 2;
			this.section = $("#section4");
			
			var mc = new Hammer(this.element);
			mc.on("panstart panmove panend", function(event) {
				event.preventDefault();
				var target = $(event.target);
				
				if (event.type === "panstart") {
					this.start = parseInt(target.css("top"));
					Page.hideNextButton();
				} else if (event.type === "panmove") {
					target.css("top", (this.start + event.deltaY) + "px");
					var borderHeight = parseInt(target.css("top")) + this.halfHeight;
					this.section.find(".outside").css("height", borderHeight + "px");
					this.section.find(".inside").find(".gauge").css("height", ($(window).height() - borderHeight) + "px");
					
					var outHour = parseInt(borderHeight / $(window).height() * 24);
					var inHour = 24 - outHour;
					this.section.find("#inHour").text(inHour).data("value", inHour);
					this.section.find("#outHour").text(outHour).data("value", outHour);

				} else if (event.type === "panend") {
					var value = this.section.find("#inHour").data("value");
					var atHome = "C";
					if (value > 8 && value <= 16 ) {
						atHome = "B";
					} else if (value > 16) {
						atHome = "A";
					}
					
					Answer.answerObj.a4 = atHome;
					Page.showNextButton();
				}
			}.bind(this));
		}
		
		new Handle();
		
	},
	section5: function() {
		$("#section5").find(".aBox").on("touchClick", "li", function(event) {
			var li = $(event.currentTarget);			
			var value = li.data("value");
			var a5 = Answer.answerObj.a5;
			
			if (a5.indexOf(value) >= 0) {
				li.removeClass("on");
				Answer.answerObj.a5.splice(a5.indexOf(value), 1);
				Page.hideNextButton();
				return;
			}
			
			if (a5.length >= 2) {
				$("#section5").find("#" + a5[0]).removeClass("on");
				Answer.answerObj.a5.shift();
			}
			Answer.answerObj.a5.push(value);
			
			li.addClass("on");
			
			if (Answer.answerObj.a5.length >= 2) {
				Page.showNextButton();
			}
		});
	},
	section6: function() {
		Answer.answerObj.a6 = "C";
		
		var Line = function() {
			this.element = document.getElementById("tapelineLine");
			this.start;
			this.section = $("#section6");
            this.width = $(this.element).width();

			var mc = new Hammer(this.element);
			mc.on("panstart panmove panend", function(event) {
				event.preventDefault();
				var target = $(event.target);

				if (event.type === "panstart") {
					this.start = parseInt(target.css("left"));
					Page.hideNextButton();
				} else if (event.type === "panmove") {
                    var left = this.start + event.deltaX;
                    if (left >= 0 && left < this.width - 20) {
                        if (left < parseInt(this.width / 3)) {
							target.data("value", "A");
                        } else if ( left > parseInt(this.width * 2 / 3)) {
							target.data("value", "C");
                        } else {
							target.data("value", "B");
                        }
                        
                        target.css("left", left + "px");
                    }
					
				} else if (event.type === "panend") {
					Answer.answerObj.a6 = target.data("value");
					Page.showNextButton();
				}
			}.bind(this));
		}

		new Line();
	},
	section7: function() {
		colors.red = new ColorPan("red");
		colors.yellow = new ColorPan("yellow");
		colors.green = new ColorPan("green");
		colors.cyan = new ColorPan("cyan");
		colors.purple = new ColorPan("purple");
	},
	section8: function() {
		$("#section8").find(".aBox").on("touchClick", ".stuff", function(event) {
			var stuff = $(event.currentTarget);
			var value = stuff.data("value");
			var a8 = Answer.answerObj.a8;
			
			if (a8.indexOf(value) >= 0) {
				stuff.removeClass("on");
				Answer.answerObj.a8.splice(a8.indexOf(value), 1);
				Page.hideNextButton();
				return;
			}
			
			if (a8.length >= 2) {
				$("#section8").find("#" + a8[0]).removeClass("on");
				Answer.answerObj.a8.shift();
			}
			Answer.answerObj.a8.push(value);
			
			stuff.addClass("on");
			
			if (Answer.answerObj.a8.length >= 2) {
				Page.showNextButton();
			}
		});
	},
	section9: function() {
		
	}
};


// section 전환 시 새 페이지 효과
var SectionIn = {
	start: function(sectionCallBack) {
		var section = $("#section" + Page.currentPage);
		
		setTimeout(function() {
			section.find(".qNum").animateCSS("fadeInUp");
		}, 100);
		setTimeout(function() {
			section.find(".question").animateCSS("fadeInUp");
			sectionCallBack(section);
		}, 600);
		setTimeout(function() {
			section.find(".qDesc").animateCSS("fadeInUp");
		}, 1000);
		
		$("#nextButton").css("backgroundColor", Page.nextButtonColor[Page.currentPage - 1]);		
	},
	section1: function(section) {
		section.find("#genderTagM").animateCSS("bounceInDown");
		setTimeout(function() {
			section.find("#genderTagF").animateCSS("bounceInDown");
		}, 300);
		
		if (Answer.answerObj.a1) { Page.showNextButton(); }
	},
	section2: function(section) {
		section.find(".clock").animateCSS("rotateIn");
		
		if (Answer.answerObj.a2) { Page.showNextButton(); }
	},
	section3: function(section) {
		if (Answer.answerObj.a3 === "yes") {
			$("#frame").css("borderColor", "#ffb5d1");
		} else if (Answer.answerObj.a3 == "no") {
			$("#frame").css("borderColor", "#537187");
		}
		section.find("#marriageButton").animateCSS("fadeInUpBig");
		
		if (Answer.answerObj.a3 === "yes" || Answer.answerObj.a3 === "no") { Page.showNextButton(); }
	},
	section4: function(section) {
		section.find(".gaugeText").fadeIn(1500);
		section.find("#handle").animateCSS("fadeInRightBig");
		
		if (Answer.answerObj.a4) { Page.showNextButton(); }
	},
	section5: function(section) {
		section.find("img").animateCSS("flipInY");
		
		if (Answer.answerObj.a5.length >= 2) { Page.showNextButton(); }
	},
	section6: function(section) {
		section.find(".tapeline").animateCSS("rollIn");
		
		if (Answer.answerObj.a6) { Page.showNextButton(); }
	},
	section7: function(section) {
		var hole = $("#section7").find(".hole");
		var offset = hole.offset();
		var width = hole.width();
		var height = hole.height();
		holeCenter.x = offset.left + width / 2;
		holeCenter.y = offset.top + height / 2;
		
		section.find(".colors").animateCSS("fadeInDownBig");
		section.find(".color").animateCSS("pulse");
		
		if (Answer.answerObj.a7) { Page.showNextButton(); }
	},
	section8: function(section) {
		section.find(".aBox").animateCSS("zoomIn");
		
		if (Answer.answerObj.a8.length >= 2) { Page.showNextButton(); }
	},
	section9: function(section) {
		$("#nav").animateCSS("bounceOutDown");
		section.find(".barProgress").addClass("isLoading");
		
		setInterval(function() {
			var loadingText = section.find(".loadingText");
			loadingText.html("결과 분석 중");
			setTimeout(function() {
				loadingText.html("&middot;&nbsp;&nbsp;결과 분석 중&nbsp;&nbsp;&middot;");
			}, 300);
			setTimeout(function() {
				loadingText.html("&middot;&nbsp;&nbsp;&middot;&nbsp;&nbsp;결과 분석 중&nbsp;&nbsp;&middot;&nbsp;&nbsp;&middot;");
			}, 600);
			setTimeout(function() {
				loadingText.html("&middot;&nbsp;&nbsp;&middot;&nbsp;&nbsp;&middot;&nbsp;&nbsp;결과 분석 중&nbsp;&nbsp;&middot;&nbsp;&nbsp;&middot;&nbsp;&nbsp;&middot;");
			}, 900);
		}, 1400);
	}
};



// section 전환 시 헌 페이지 숨기기 (새 페이지 SectionIn이 가능하도록)
var SectionOut = {
	clean: function(sectionCallBack) {
		var section = $("#section" + Page.currentPage);
		setTimeout(function() {
			section.find(".qNum").unanimateCSS("fadeInUp");
			section.find(".question").unanimateCSS("fadeInUp");
			section.find(".qDesc").unanimateCSS("fadeInUp");
			sectionCallBack(section);
		}, 800);
		
		Page.hideNextButton();
	},
	section1: function(section) {
		section.find(".genderTag").unanimateCSS("bounceInDown");
	},
	section2: function(section) {
		section.find(".clock").unanimateCSS("rotateIn");
	},
	section3: function(section) {
		section.find("#marriageButton").unanimateCSS("fadeInUpBig");
	},
	section4: function(section) {
		section.find(".gaugeText").fadeOut(200);
		section.find("#handle").unanimateCSS("fadeInRightBig");
	},
	section5: function(section) {
		section.find("img").unanimateCSS("flipInY");
	},
	section6: function(section) {
		section.find(".tapeline").unanimateCSS("rollIn");
	},
	section7: function(section) {
		section.find(".colors").unanimateCSS("fadeInDownBig");
	},
	section8: function(section) {
		section.find(".aBox").unanimateCSS("zoomIn");
	},
	section9: function(section) {
		
	}
};

// Question 7 color picking script
var colors = {};
var holeCenter = {};

var ColorPan = function(elementId) {
	this.element = document.getElementById(elementId);
	this.size = { width: this.element.offsetWidth, height: this.element.offsetHeight };
	
	this.origin = null;
	this.start = { top: null, left: null };
	
	this.holeIn = false;
	
	this.init();
	
	return this;
};

ColorPan.prototype = {
	init: function() {
		this.origin = { top: $(this.element).css("top"), left: $(this.element).css("left") }
		
		var mc = new Hammer(this.element);
		mc.on("panstart panmove panend", function(event) {
			event.preventDefault();
			var target = $(event.target);
			
			if (event.type === "panstart") {
				this.onPanStart(target);
			} else if (event.type === "panmove") {
				this.onPanMove(target, event);
			} else if (event.type === "panend") {
				this.onPanEnd(target);
			}
		}.bind(this));
	},
	onPanStart: function(target) {
		this.start.top = parseInt(target.css("top"));
		this.start.left = parseInt(target.css("left"));
	},
	onPanMove: function(target, event) {
		target.css("top", (this.start.top + event.deltaY) + "px")
			.css("left", (this.start.left + event.deltaX) + "px");
		
		this.checkHoleIn(event.center);
		
		if (this.holeIn) {
			this.changeHoleColor(target);
		} else {
			this.changeHoleColor();
		}
	},
	onPanEnd: function(target) {
		target.animateCSS("jello");
		setTimeout(function() {
			target.removeClass("jello");
		}, 500);
		
		if (this.holeIn) {
			if (Answer.answerObj.a7) {
				var oldAnswer = colors[Answer.answerObj.a7];
				oldAnswer.returnToOrigin();
				$(oldAnswer.element).css("display", "block");
			} else {
				Page.showNextButton();
			}
			
			Answer.answerObj.a7 = target.data("value");
			target.css("display", "none");
		}
	},
	checkHoleIn: function(center) {
		var d = Math.sqrt( (center.x-=holeCenter.x)*center.x + (center.y-=holeCenter.y)*center.y );
		
		if (d <= 160) {
			this.holeIn = true;
		} else {
			this.holeIn = false;
		}
	},
	changeHoleColor: function(target) {
		if (target) {
			var color = target.data("value");
			$("#section7").find("#holePath").find("path").each(function(i) {
				$(this).attr("fill", Page.q7_holeColor[color][i]);
			});
		} else if (!target) {
			if (Answer.answerObj.a7) {
				$("#section7").find("#holePath").find("path").each(function(i) {
					$(this).attr("fill", Page.q7_holeColor[Answer.answerObj.a7][i]);
				});
			} else {
				$("#section7").find("#holePath").find("path").each(function(i) {
					$(this).attr("fill", Page.q7_holeColor.default[i]);
				});
			}
		}
	},
	returnToOrigin: function() {
		$(this.element).css("top", this.origin.top)
			.css("left", this.origin.left);
		return this;
	}
};


var Answer = {
	// TODO: fake answer
	/*answerObj: {
		a1: "M",
		a2: 10,
		a3: "yes",
		a4: "A",
		a5: ["chair", "bag"],
		a6: "B",
		a7: "red",
		a8: ["DIY", "travel"]
	},*/
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
			url: "/score",
			type: "POST",
			data: Answer.answerObj,
			dataType: "json",
			success: function(res) {
				setTimeout(function() {
					location.href = res.url;
				}, 7500);
				
				//$("main").html(res);
			},
			error: function(res) {
				console.log("[error] Ajax Result");
				if (res) {
					console.log(res.responseText);
				}
				if (res.status == "400") {
					$("#section9").find(".loading").html("비정상적인 답변이 제출되었습니다.\n 첫 페이지로 이동합니다.");
					setTimeout(function() {
						location.reload();
					}, 5000);
				}
			}
		});
	}
};