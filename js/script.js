// BURGER-MENU
$(document).ready(function () {
	$(".header__burger").click(function (event) {
		$(".header__burger,.header__menu").toggleClass("active-header");
		$("body").toggleClass("lock");
		$(".btn").toggleClass("covered");
		$(".title").toggleClass("covered");
	});
	// $(".header__list ").click(function (event) {
	// 	$(".header__burger,.header__menu").removeClass("active");
	// 	$("body").removeClass("lock");
	// });
	// if ($(".header__burger,.header__menu").hasClass("active-header")) {
	// 	console.log("hi");

	// 	// $(".btn").hide();
	// 	// $(".title").hide();
	// }
});

//FORMS
function forms() {
	//SELECT
	if ($("select").length > 0) {
		function selectscrolloptions() {
			var scs = 100;
			var mss = 50;
			if (isMobile.any()) {
				scs = 10;
				mss = 1;
			}
			var opt = {
				cursorcolor: "#2078e5",
				cursorwidth: "3px",
				background: "",
				autohidemode: false,
				bouncescroll: false,
				cursorborderradius: "0px",
				scrollspeed: scs,
				mousescrollstep: mss,
				directionlockdeadzone: 0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select() {
			$.each($("select"), function (index, val) {
				var ind = index;
				$(this).hide();
				if ($(this).parent(".select-block").length == 0) {
					$(this).wrap("<div class='select-block " + $(this).attr("class") + "-select-block'></div>");
				} else {
					$(this).parent(".select-block").find(".select").remove();
				}
				var milti = "";
				var check = "";
				var sblock = $(this).parent(".select-block");
				var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if ($(this).attr("multiple") == "multiple") {
					milti = "multiple";
					check = "check";
				}
				$.each($(this).find("option"), function (index, val) {
					if ($(this).attr("value") != "") {
						soptions = soptions + "<div data-value='" + $(this).attr("value") + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr("class") + " " + check + "'>" + $(this).html() + "</div>";
					} else if ($(this).parent().attr("data-label") == "on") {
						if (sblock.find(".select__label").length == 0) {
							sblock.prepend('<div class="select__label">' + $(this).html() + "</div>");
						}
					}
				});
				soptions = soptions + "</div></div></div>";
				if ($(this).attr("data-type") == "search") {
					sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr("class") + "__select " + milti + "'>" + "<div class='select-title'>" + "<div class='select-title__arrow ion-ios-arrow-down'></div>" + "<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" + "</div>" + soptions + "</div>");
					$(".select_" + ind)
						.find("input.select-title__value")
						.jcOnPageFilter({
							parentSectionClass: "select-options_" + ind,
							parentLookupClass: "select-options__value_" + ind,
							childBlockClass: "select-options__value_" + ind,
						});
				} else {
					sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr("class") + "__select " + milti + "'>" + "<div class='select-title'>" + "<div class='select-title__arrow ion-ios-arrow-down'></div>" + "<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" + "</div>" + soptions + "</div>");
				}
				if ($(this).find('option[selected="selected"]').val() != "") {
					sblock.find(".select").addClass("focus");
				}
				if ($(this).attr("data-req") == "on") {
					$(this).addClass("req");
				}
				$(".select_" + ind + " .select-options-scroll").niceScroll(".select-options-list", selectscrolloptions());
			});
		}
		select();

		$("body").on("keyup", "input.select-title__value", function () {
			$(".select").not($(this).parents(".select")).removeClass("active").find(".select-options").slideUp(50);
			$(this).parents(".select").addClass("active");
			$(this)
				.parents(".select")
				.find(".select-options")
				.slideDown(50, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});
			$(this).parents(".select-block").find("select").val("");
		});
		$("body").on("click", ".select", function () {
			if (!$(this).hasClass("disabled")) {
				$(".select").not(this).removeClass("active").find(".select-options").slideUp(50);
				$(this).toggleClass("active");
				$(this)
					.find(".select-options")
					.slideToggle(50, function () {
						$(this).find(".select-options-scroll").getNiceScroll().resize();
					});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if ($(this).attr("data-type") == "search") {
					if (!$(this).hasClass("active")) {
						searchselectreset();
					}
					$(this).find(".select-options__value").show();
				}
			}
		});
		$("body").on("click", ".select-options__value", function () {
			if ($(this).parents(".select").hasClass("multiple")) {
				if ($(this).hasClass("active")) {
					if ($(this).parents(".select").find(".select-title__value span").length > 0) {
						$(this)
							.parents(".select")
							.find(".select-title__value")
							.append('<span data-value="' + $(this).data("value") + '">, ' + $(this).html() + "</span>");
					} else {
						$(this).parents(".select").find(".select-title__value").data("label", $(this).parents(".select").find(".select-title__value").html());
						$(this)
							.parents(".select")
							.find(".select-title__value")
							.html('<span data-value="' + $(this).data("value") + '">' + $(this).html() + "</span>");
					}
					$(this)
						.parents(".select-block")
						.find("select")
						.find("option")
						.eq($(this).index() + 1)
						.prop("selected", true);
					$(this).parents(".select").addClass("focus");
				} else {
					$(this)
						.parents(".select")
						.find(".select-title__value")
						.find('span[data-value="' + $(this).data("value") + '"]')
						.remove();
					if ($(this).parents(".select").find(".select-title__value span").length == 0) {
						$(this).parents(".select").find(".select-title__value").html($(this).parents(".select").find(".select-title__value").data("label"));
						$(this).parents(".select").removeClass("focus");
					}
					$(this)
						.parents(".select-block")
						.find("select")
						.find("option")
						.eq($(this).index() + 1)
						.prop("selected", false);
				}
				return false;
			}

			if ($(this).parents(".select").attr("data-type") == "search") {
				$(this).parents(".select").find(".select-title__value").val($(this).html());
				$(this).parents(".select").find(".select-title__value").attr("data-value", $(this).html());
			} else {
				$(this)
					.parents(".select")
					.find(".select-title__value")
					.attr("class", "select-title__value value_" + $(this).data("value"));
				$(this).parents(".select").find(".select-title__value").html($(this).html());
			}

			$(this).parents(".select-block").find("select").find("option").removeAttr("selected");
			if ($.trim($(this).data("value")) != "") {
				$(this).parents(".select-block").find("select").val($(this).data("value"));
				$(this)
					.parents(".select-block")
					.find("select")
					.find('option[value="' + $(this).data("value") + '"]')
					.attr("selected", "selected");
			} else {
				$(this).parents(".select-block").find("select").val($(this).html());
				$(this)
					.parents(".select-block")
					.find("select")
					.find('option[value="' + $(this).html() + '"]')
					.attr("selected", "selected");
			}

			if ($(this).parents(".select-block").find("select").val() != "") {
				$(this).parents(".select-block").find(".select").addClass("focus");
			} else {
				$(this).parents(".select-block").find(".select").removeClass("focus");

				$(this).parents(".select-block").find(".select").removeClass("err");
				$(this).parents(".select-block").parent().removeClass("err");
				$(this).parents(".select-block").removeClass("err").find(".form__error").remove();
			}
			if (!$(this).parents(".select").data("tags") != "") {
				if (
					$(this)
						.parents(".form-tags")
						.find('.form-tags__item[data-value="' + $(this).data("value") + '"]').length == 0
				) {
					$(this)
						.parents(".form-tags")
						.find(".form-tags-items")
						.append('<a data-value="' + $(this).data("value") + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents(".select-block").find("select").change();

			if ($(this).parents(".select-block").find("select").data("update") == "on") {
				select();
			}
		});
		$(document).on("click touchstart", function (e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$(".select").removeClass("active");
				$(".select-options").slideUp(50, function () {});
				searchselectreset();
			}
		});
		$(document).on("keydown", function (e) {
			if (e.which == 27) {
				$(".select").removeClass("active");
				$(".select-options").slideUp(50, function () {});
				searchselectreset();
			}
		});
	}
	//FIELDS
	$("input,textarea").focus(function () {
		if ($(this).val() == $(this).attr("data-value")) {
			$(this).addClass("focus");
			$(this).parent().addClass("focus");
			if ($(this).attr("data-type") == "pass") {
				$(this).attr("type", "password");
			}
			$(this).val("");
		}
		removeError($(this));
	});
	$("input[data-value], textarea[data-value]").each(function () {
		if (this.value == "" || this.value == $(this).attr("data-value")) {
			this.value = $(this).attr("data-value");
			if ($(this).hasClass("l") && $(this).parent().find(".form__label").length == 0) {
				$(this)
					.parent()
					.append('<div class="form__label">' + $(this).attr("data-value") + "</div>");
			}
		}
		if (this.value != $(this).attr("data-value") && this.value != "") {
			$(this).addClass("focus");
			$(this).parent().addClass("focus");
			if ($(this).hasClass("l") && $(this).parent().find(".form__label").length == 0) {
				$(this)
					.parent()
					.append('<div class="form__label">' + $(this).attr("data-value") + "</div>");
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr("data-value")) {
				if ($(this).attr("data-type") == "pass") {
					$(this).attr("type", "password");
				}
				this.value = "";
			}
		});
		$(this).blur(function () {
			if (this.value == "") {
				this.value = $(this).attr("data-value");
				$(this).removeClass("focus");
				$(this).parent().removeClass("focus");
				if ($(this).attr("data-type") == "pass") {
					$(this).attr("type", "text");
				}
			}
		});
	});
	$(".form-input__viewpass").click(function (event) {
		if ($(this).hasClass("active")) {
			$(this).parent().find("input").attr("type", "password");
		} else {
			$(this).parent().find("input").attr("type", "text");
		}
		$(this).toggleClass("active");
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});

	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($("input.phone"), function (index, val) {
		$(this).attr("type", "tel");
		$(this).focus(function () {
			$(this).inputmask("+38(999) 999 9999", {
				clearIncomplete: true,
				clearMaskOnLostFocus: true,
				onincomplete: function () {
					maskclear($(this));
				},
			});
			$(this).addClass("focus");
			$(this).parent().addClass("focus");
			$(this).parent().removeClass("err");
			$(this).removeClass("err");
		});
	});
	$("input.phone").focusout(function (event) {
		maskclear($(this));
	});
	$.each($("input.num"), function (index, val) {
		$(this).focus(function () {
			$(this).inputmask("9{1,1000}", {
				clearIncomplete: true,
				placeholder: "",
				clearMaskOnLostFocus: true,
				onincomplete: function () {
					maskclear($(this));
				},
			});
			$(this).addClass("focus");
			$(this).parent().addClass("focus");
			$(this).parent().removeClass("err");
			$(this).removeClass("err");
		});
	});
	$("input.num").focusout(function (event) {
		maskclear($(this));
	});
	//CHECK
	$.each($(".check"), function (index, val) {
		if ($(this).find("input").prop("checked") == true) {
			$(this).addClass("active");
		}
	});
	$("body").off("click", ".check", function (event) {});
	$("body").on("click", ".check", function (event) {
		if (!$(this).hasClass("disable")) {
			var target = $(event.target);
			if (!target.is("a")) {
				$(this).toggleClass("active");
				if ($(this).hasClass("active")) {
					$(this).find("input").prop("checked", true);
				} else {
					$(this).find("input").prop("checked", false);
				}
			}
		}
	});

	//OPTION
	$.each($(".option.active"), function (index, val) {
		$(this).find("input").prop("checked", true);
	});
	$(".option").click(function (event) {
		if (!$(this).hasClass("disable")) {
			if ($(this).hasClass("active") && $(this).hasClass("order")) {
				$(this).toggleClass("orderactive");
			}
			$(this).parents(".options").find(".option").removeClass("active");
			$(this).toggleClass("active");
			$(this).children("input").prop("checked", true);
		}
	});
	//RATING
	$(".rating.edit .star").hover(
		function () {
			var block = $(this).parents(".rating");
			block.find(".rating__activeline").css({ width: "0%" });
			var ind = $(this).index() + 1;
			var linew = (ind / block.find(".star").length) * 100;
			setrating(block, linew);
		},
		function () {
			var block = $(this).parents(".rating");
			block.find(".star").removeClass("active");
			var ind = block.find("input").val();
			var linew = (ind / block.find(".star").length) * 100;
			setrating(block, linew);
		}
	);
	$(".rating.edit .star").click(function (event) {
		var block = $(this).parents(".rating");
		var re = $(this).index() + 1;
		block.find("input").val(re);
		var linew = (re / block.find(".star").length) * 100;
		setrating(block, linew);
	});
	$.each($(".rating"), function (index, val) {
		var ind = $(this).find("input").val();
		var linew = (ind / $(this).parent().find(".star").length) * 100;
		setrating($(this), linew);
	});
	function setrating(th, val) {
		th.find(".rating__activeline").css({ width: val + "%" });
	}
	//QUANTITY
	$(".quantity__btn").click(function (event) {
		var n = parseInt($(this).parent().find(".quantity__input").val());
		if ($(this).hasClass("dwn")) {
			n = n - 1;
			if (n < 1) {
				n = 1;
			}
		} else {
			n = n + 1;
		}
		$(this).parent().find(".quantity__input").val(n);
		return false;
	});
	//RANGE
	if ($("#range").length > 0) {
		$("#range").slider({
			range: true,
			min: 0,
			max: 5000,
			values: [0, 5000],
			slide: function (event, ui) {
				$("#rangefrom").val(ui.values[0]);
				$("#rangeto").val(ui.values[1]);
				$(this)
					.find(".ui-slider-handle")
					.eq(0)
					.html("<span>" + ui.values[0] + "</span>");
				$(this)
					.find(".ui-slider-handle")
					.eq(1)
					.html("<span>" + ui.values[1] + "</span>");
			},
			change: function (event, ui) {
				if (ui.values[0] != $("#range").slider("option", "min") || ui.values[1] != $("#range").slider("option", "max")) {
					$("#range").addClass("act");
				} else {
					$("#range").removeClass("act");
				}
			},
		});
		$("#rangefrom").val($("#range").slider("values", 0));
		$("#rangeto").val($("#range").slider("values", 1));

		$("#range")
			.find(".ui-slider-handle")
			.eq(0)
			.html("<span>" + $("#range").slider("option", "min") + "</span>");
		$("#range")
			.find(".ui-slider-handle")
			.eq(1)
			.html("<span>" + $("#range").slider("option", "max") + "</span>");

		$("#rangefrom").bind("change", function () {
			if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
				$(this).val($("#range").slider("option", "max"));
			}
			if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
				$(this).val($("#range").slider("option", "min"));
			}
			$("#range").slider("values", 0, $(this).val());
		});
		$("#rangeto").bind("change", function () {
			if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
				$(this).val($("#range").slider("option", "max"));
			}
			if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
				$(this).val($("#range").slider("option", "min"));
			}
			$("#range").slider("values", 1, $(this).val());
		});
		$("#range").find(".ui-slider-handle").eq(0).addClass("left");
		$("#range").find(".ui-slider-handle").eq(1).addClass("right");
	}
	//ADDFILES
	$(".form-addfile__input").change(function (e) {
		if ($(this).val() != "") {
			var ts = $(this);
			ts.parents(".form-addfile").find("ul.form-addfile-list").html("");
			$.each(e.target.files, function (index, val) {
				if (ts.parents(".form-addfile").find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
					ts.parents(".form-addfile")
						.find("ul.form-addfile-list")
						.append("<li>" + e.target.files[index].name + "</li>");
				}
			});
		}
	});
}
forms();

function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}

//VALIDATE FORMS
$("form button[type=submit]").click(function () {
	var er = 0;
	var form = $(this).parents("form");
	var ms = form.data("ms");
	$.each(form.find(".req"), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);
		/*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

		//ОПТРАВКА ФОРМЫ
		/*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/

		if (ms != null && ms != "") {
			showMessageByClass(ms);
			return false;
		}
	} else {
		return false;
	}
});
function formValidate(input) {
	var er = 0;
	var form = input.parents("form");
	if (input.attr("name") == "email" || input.hasClass("email")) {
		if (input.val() != input.attr("data-value")) {
			var em = input.val().replace(" ", "");
			input.val(em);
		}
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val()) || input.val() == input.attr("data-value")) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == "" || input.val() == input.attr("data-value")) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if (input.attr("type") == "checkbox") {
		if (input.prop("checked") == true) {
			input.removeClass("err").parent().removeClass("err");
		} else {
			er++;
			input.addClass("err").parent().addClass("err");
		}
	}
	if (input.hasClass("name")) {
		if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass("pass-2")) {
		if (form.find(".pass-1").val() != form.find(".pass-2").val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}
	return er;
}
// function formLoad() {
// 	$(".popup").hide();
// 	$(".popup-message-body").hide();
// 	$(".popup-message .popup-body").append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
// 	$(".popup-message").addClass("active").fadeIn(300);
// }
function showMessageByClass(ms) {
	$(".popup").hide();
	popupOpen("message." + ms, "");
}
function showMessage(html) {
	$(".popup-loading").remove();
	$(".popup-message-body").show().html(html);
}
function clearForm(form) {
	$.each(form.find(".input"), function (index, val) {
		$(this).removeClass("focus").val($(this).data("value"));
		$(this).parent().removeClass("focus");
		if ($(this).hasClass("phone")) {
			maskclear($(this));
		}
	});
}
function addError(input) {
	input.addClass("err");
	input.parent().addClass("err");
	input.parent().find(".form__error").remove();
	if (input.hasClass("email")) {
		var error = "";
		if (input.val() == "" || input.val() == input.attr("data-value")) {
			error = input.data("error");
		} else {
			error = input.data("error");
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + "</div>");
		}
	} else {
		if (input.data("error") != null && input.parent().find(".form__error").length == 0) {
			input.parent().append('<div class="form__error">' + input.data("error") + "</div>");
		}
	}
	if (input.parents(".select-block").length > 0) {
		input.parents(".select-block").parent().addClass("err");
		input.parents(".select-block").find(".select").addClass("err");
	}
}
function addErrorByName(form, input__name, error_text) {
	var input = form.find('[name="' + input__name + '"]');
	input.attr("data-error", error_text);
	addError(input);
}
function addFormError(form, error_text) {
	form.find(".form__generalerror").show().html(error_text);
}
function removeFormError(form) {
	form.find(".form__generalerror").hide().html("");
}
function removeError(input) {
	input.removeClass("err");
	input.parent().removeClass("err");
	input.parent().find(".form__error").remove();

	if (input.parents(".select-block").length > 0) {
		input.parents(".select-block").parent().removeClass("err");
		input.parents(".select-block").find(".select").removeClass("err").removeClass("active");
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form) {
	form.find(".err").removeClass("err");
	form.find(".form__error").remove();
}
function maskclear(n) {
	if (n.val() == "") {
		n.inputmask("remove");
		n.val(n.attr("data-value"));
		n.removeClass("focus");
		n.parent().removeClass("focus");
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function (index, val) {
		var block = $(this).parent();
		var select = $(this).parent().find("select");
		if ($(this).find(".select-options__value:visible").length == 1) {
			$(this).addClass("focus");
			$(this).parents(".select-block").find("select").val($(".select-options__value:visible").data("value"));
			$(this).find(".select-title__value").val($(".select-options__value:visible").html());
			$(this).find(".select-title__value").attr("data-value", $(".select-options__value:visible").html());
		} else if (select.val() == "") {
			$(this).removeClass("focus");
			block.find("input.select-title__value").val(select.find('option[selected="selected"]').html());
			block.find("input.select-title__value").attr("data-value", select.find('option[selected="selected"]').html());
		}
	});
}

//------------------------------------------
$(".filter__item").click(function (event) {
	var i = $(this).data("filter");
	if (i == 1) {
		$(".portfolio__column").show();
	} else {
		$(".portfolio__column").hide();
		$(".portfolio__column.f--" + i).show();
	}
	$(".filter__item").removeClass("active");
	$(this).addClass("active");

	return false;
});
//------------------------------------------

/*!
 * baguetteBox.js
 * @author  feimosi
 * @version %%INJECT_VERSION%%
 * @url https://github.com/feimosi/baguetteBox.js
 */

/* global define, module */

(function (root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		module.exports = factory();
	} else {
		root.baguetteBox = factory();
	}
})(this, function () {
	"use strict";

	// SVG shapes used on the buttons
	var leftArrow = '<svg width="44" height="60">' + '<polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"' + 'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>' + "</svg>",
		rightArrow = '<svg width="44" height="60">' + '<polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"' + 'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>' + "</svg>",
		closeX = '<svg width="30" height="30">' + '<g stroke="rgb(160,160,160)" stroke-width="4">' + '<line x1="5" y1="5" x2="25" y2="25"/>' + '<line x1="5" y1="25" x2="25" y2="5"/>' + "</g></svg>";
	// Global options and their defaults
	var options = {},
		defaults = {
			captions: true,
			buttons: "auto",
			fullScreen: false,
			noScrollbars: false,
			bodyClass: "baguetteBox-open",
			titleTag: false,
			async: false,
			preload: 2,
			animation: "slideIn",
			afterShow: null,
			afterHide: null,
			onChange: null,
			overlayBackgroundColor: "rgba(0,0,0,.8)",
		};
	// Object containing information about features compatibility
	var supports = {};
	// DOM Elements references
	var overlay, slider, previousButton, nextButton, closeButton;
	// An array with all images in the current gallery
	var currentGallery = [];
	// Current image index inside the slider
	var currentIndex = 0;
	// Visibility of the overlay
	var isOverlayVisible = false;
	// Touch event start position (for slide gesture)
	var touch = {};
	// If set to true ignore touch events because animation was already fired
	var touchFlag = false;
	// Regex pattern to match image files
	var regex = /.+\.(gif|jpe?g|png|webp)/i;
	// Object of all used galleries
	var data = {};
	// Array containing temporary images DOM elements
	var imagesElements = [];
	// The last focused element before opening the overlay
	var documentLastFocus = null;
	var overlayClickHandler = function (event) {
		// Close the overlay when user clicks directly on the background
		if (event.target.id.indexOf("baguette-img") !== -1) {
			hideOverlay();
		}
	};
	var previousButtonClickHandler = function (event) {
		event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); // eslint-disable-line no-unused-expressions
		showPreviousImage();
	};
	var nextButtonClickHandler = function (event) {
		event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); // eslint-disable-line no-unused-expressions
		showNextImage();
	};
	var closeButtonClickHandler = function (event) {
		event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); // eslint-disable-line no-unused-expressions
		hideOverlay();
	};
	var touchstartHandler = function (event) {
		touch.count++;
		if (touch.count > 1) {
			touch.multitouch = true;
		}
		// Save x and y axis position
		touch.startX = event.changedTouches[0].pageX;
		touch.startY = event.changedTouches[0].pageY;
	};
	var touchmoveHandler = function (event) {
		// If action was already triggered or multitouch return
		if (touchFlag || touch.multitouch) {
			return;
		}
		event.preventDefault ? event.preventDefault() : (event.returnValue = false); // eslint-disable-line no-unused-expressions
		var touchEvent = event.touches[0] || event.changedTouches[0];
		// Move at least 40 pixels to trigger the action
		if (touchEvent.pageX - touch.startX > 40) {
			touchFlag = true;
			showPreviousImage();
		} else if (touchEvent.pageX - touch.startX < -40) {
			touchFlag = true;
			showNextImage();
			// Move 100 pixels up to close the overlay
		} else if (touch.startY - touchEvent.pageY > 100) {
			hideOverlay();
		}
	};
	var touchendHandler = function () {
		touch.count--;
		if (touch.count <= 0) {
			touch.multitouch = false;
		}
		touchFlag = false;
	};
	var contextmenuHandler = function () {
		touchendHandler();
	};

	var trapFocusInsideOverlay = function (event) {
		if (overlay.style.display === "block" && overlay.contains && !overlay.contains(event.target)) {
			event.stopPropagation();
			initFocus();
		}
	};

	// forEach polyfill for IE8
	// http://stackoverflow.com/a/14827443/1077846
	/* eslint-disable */
	if (![].forEach) {
		Array.prototype.forEach = function (callback, thisArg) {
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	// filter polyfill for IE8
	// https://gist.github.com/eliperelman/1031656
	if (![].filter) {
		Array.prototype.filter = function (a, b, c, d, e) {
			c = this;
			d = [];
			for (e = 0; e < c.length; e++) a.call(b, c[e], e, c) && d.push(c[e]);
			return d;
		};
	}
	/* eslint-enable */

	// Script entry point
	function run(selector, userOptions) {
		// Fill supports object
		supports.transforms = testTransformsSupport();
		supports.svg = testSvgSupport();
		supports.passiveEvents = testPassiveEventsSupport();

		buildOverlay();
		removeFromCache(selector);
		return bindImageClickListeners(selector, userOptions);
	}

	function bindImageClickListeners(selector, userOptions) {
		// For each gallery bind a click event to every image inside it
		var galleryNodeList = document.querySelectorAll(selector);
		var selectorData = {
			galleries: [],
			nodeList: galleryNodeList,
		};
		data[selector] = selectorData;

		[].forEach.call(galleryNodeList, function (galleryElement) {
			if (userOptions && userOptions.filter) {
				regex = userOptions.filter;
			}

			// Get nodes from gallery elements or single-element galleries
			var tagsNodeList = [];
			if (galleryElement.tagName === "A") {
				tagsNodeList = [galleryElement];
			} else {
				tagsNodeList = galleryElement.getElementsByTagName("a");
			}

			// Filter 'a' elements from those not linking to images
			tagsNodeList = [].filter.call(tagsNodeList, function (element) {
				if (element.className.indexOf(userOptions && userOptions.ignoreClass) === -1) {
					return regex.test(element.href);
				}
			});
			if (tagsNodeList.length === 0) {
				return;
			}

			var gallery = [];
			[].forEach.call(tagsNodeList, function (imageElement, imageIndex) {
				var imageElementClickHandler = function (event) {
					event.preventDefault ? event.preventDefault() : (event.returnValue = false); // eslint-disable-line no-unused-expressions
					prepareOverlay(gallery, userOptions);
					showOverlay(imageIndex);
				};
				var imageItem = {
					eventHandler: imageElementClickHandler,
					imageElement: imageElement,
				};
				bind(imageElement, "click", imageElementClickHandler);
				gallery.push(imageItem);
			});
			selectorData.galleries.push(gallery);
		});

		return selectorData.galleries;
	}

	function clearCachedData() {
		for (var selector in data) {
			if (data.hasOwnProperty(selector)) {
				removeFromCache(selector);
			}
		}
	}

	function removeFromCache(selector) {
		if (!data.hasOwnProperty(selector)) {
			return;
		}
		var galleries = data[selector].galleries;
		[].forEach.call(galleries, function (gallery) {
			[].forEach.call(gallery, function (imageItem) {
				unbind(imageItem.imageElement, "click", imageItem.eventHandler);
			});

			if (currentGallery === gallery) {
				currentGallery = [];
			}
		});

		delete data[selector];
	}

	function buildOverlay() {
		overlay = getByID("baguetteBox-overlay");
		// Check if the overlay already exists
		if (overlay) {
			slider = getByID("baguetteBox-slider");
			previousButton = getByID("previous-button");
			nextButton = getByID("next-button");
			closeButton = getByID("close-button");
			return;
		}
		// Create overlay element
		overlay = create("div");
		overlay.setAttribute("role", "dialog");
		overlay.id = "baguetteBox-overlay";
		document.getElementsByTagName("body")[0].appendChild(overlay);
		// Create gallery slider element
		slider = create("div");
		slider.id = "baguetteBox-slider";
		overlay.appendChild(slider);
		// Create all necessary buttons
		previousButton = create("button");
		previousButton.setAttribute("type", "button");
		previousButton.id = "previous-button";
		previousButton.setAttribute("aria-label", "Previous");
		previousButton.innerHTML = supports.svg ? leftArrow : "&lt;";
		overlay.appendChild(previousButton);

		nextButton = create("button");
		nextButton.setAttribute("type", "button");
		nextButton.id = "next-button";
		nextButton.setAttribute("aria-label", "Next");
		nextButton.innerHTML = supports.svg ? rightArrow : "&gt;";
		overlay.appendChild(nextButton);

		closeButton = create("button");
		closeButton.setAttribute("type", "button");
		closeButton.id = "close-button";
		closeButton.setAttribute("aria-label", "Close");
		closeButton.innerHTML = supports.svg ? closeX : "&times;";
		overlay.appendChild(closeButton);

		previousButton.className = nextButton.className = closeButton.className = "baguetteBox-button";

		bindEvents();
	}

	function keyDownHandler(event) {
		switch (event.keyCode) {
			case 37: // Left arrow
				showPreviousImage();
				break;
			case 39: // Right arrow
				showNextImage();
				break;
			case 27: // Esc
				hideOverlay();
				break;
			case 36: // Home
				showFirstImage(event);
				break;
			case 35: // End
				showLastImage(event);
				break;
		}
	}

	function bindEvents() {
		var options = supports.passiveEvents ? { passive: true } : null;
		bind(overlay, "click", overlayClickHandler);
		bind(previousButton, "click", previousButtonClickHandler);
		bind(nextButton, "click", nextButtonClickHandler);
		bind(closeButton, "click", closeButtonClickHandler);
		bind(slider, "contextmenu", contextmenuHandler);
		bind(overlay, "touchstart", touchstartHandler, options);
		bind(overlay, "touchmove", touchmoveHandler, options);
		bind(overlay, "touchend", touchendHandler);
		bind(document, "focus", trapFocusInsideOverlay, true);
	}

	function unbindEvents() {
		var options = supports.passiveEvents ? { passive: true } : null;
		unbind(overlay, "click", overlayClickHandler);
		unbind(previousButton, "click", previousButtonClickHandler);
		unbind(nextButton, "click", nextButtonClickHandler);
		unbind(closeButton, "click", closeButtonClickHandler);
		unbind(slider, "contextmenu", contextmenuHandler);
		unbind(overlay, "touchstart", touchstartHandler, options);
		unbind(overlay, "touchmove", touchmoveHandler, options);
		unbind(overlay, "touchend", touchendHandler);
		unbind(document, "focus", trapFocusInsideOverlay, true);
	}

	function prepareOverlay(gallery, userOptions) {
		// If the same gallery is being opened prevent from loading it once again
		if (currentGallery === gallery) {
			return;
		}
		currentGallery = gallery;
		// Update gallery specific options
		setOptions(userOptions);
		// Empty slider of previous contents (more effective than .innerHTML = "")
		while (slider.firstChild) {
			slider.removeChild(slider.firstChild);
		}
		imagesElements.length = 0;

		var imagesFiguresIds = [];
		var imagesCaptionsIds = [];
		// Prepare and append images containers and populate figure and captions IDs arrays
		for (var i = 0, fullImage; i < gallery.length; i++) {
			fullImage = create("div");
			fullImage.className = "full-image";
			fullImage.id = "baguette-img-" + i;
			imagesElements.push(fullImage);

			imagesFiguresIds.push("baguetteBox-figure-" + i);
			imagesCaptionsIds.push("baguetteBox-figcaption-" + i);
			slider.appendChild(imagesElements[i]);
		}
		overlay.setAttribute("aria-labelledby", imagesFiguresIds.join(" "));
		overlay.setAttribute("aria-describedby", imagesCaptionsIds.join(" "));
	}

	function setOptions(newOptions) {
		if (!newOptions) {
			newOptions = {};
		}
		// Fill options object
		for (var item in defaults) {
			options[item] = defaults[item];
			if (typeof newOptions[item] !== "undefined") {
				options[item] = newOptions[item];
			}
		}
		/* Apply new options */
		// Change transition for proper animation
		slider.style.transition = slider.style.webkitTransition = options.animation === "fadeIn" ? "opacity .4s ease" : options.animation === "slideIn" ? "" : "none";
		// Hide buttons if necessary
		if (options.buttons === "auto" && ("ontouchstart" in window || currentGallery.length === 1)) {
			options.buttons = false;
		}
		// Set buttons style to hide or display them
		previousButton.style.display = nextButton.style.display = options.buttons ? "" : "none";
		// Set overlay color
		try {
			overlay.style.backgroundColor = options.overlayBackgroundColor;
		} catch (e) {
			// Silence the error and continue
		}
	}

	function showOverlay(chosenImageIndex) {
		if (options.noScrollbars) {
			document.documentElement.style.overflowY = "hidden";
			document.body.style.overflowY = "scroll";
		}
		if (overlay.style.display === "block") {
			return;
		}

		bind(document, "keydown", keyDownHandler);
		currentIndex = chosenImageIndex;
		touch = {
			count: 0,
			startX: null,
			startY: null,
		};
		loadImage(currentIndex, function () {
			preloadNext(currentIndex);
			preloadPrev(currentIndex);
		});

		updateOffset();
		overlay.style.display = "block";
		if (options.fullScreen) {
			enterFullScreen();
		}
		// Fade in overlay
		setTimeout(function () {
			overlay.className = "visible";
			if (options.bodyClass && document.body.classList) {
				document.body.classList.add(options.bodyClass);
			}
			if (options.afterShow) {
				options.afterShow();
			}
		}, 50);
		if (options.onChange) {
			options.onChange(currentIndex, imagesElements.length);
		}
		documentLastFocus = document.activeElement;
		initFocus();
		isOverlayVisible = true;
	}

	function initFocus() {
		if (options.buttons) {
			previousButton.focus();
		} else {
			closeButton.focus();
		}
	}

	function enterFullScreen() {
		if (overlay.requestFullscreen) {
			overlay.requestFullscreen();
		} else if (overlay.webkitRequestFullscreen) {
			overlay.webkitRequestFullscreen();
		} else if (overlay.mozRequestFullScreen) {
			overlay.mozRequestFullScreen();
		}
	}

	function exitFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}

	function hideOverlay() {
		if (options.noScrollbars) {
			document.documentElement.style.overflowY = "auto";
			document.body.style.overflowY = "auto";
		}
		if (overlay.style.display === "none") {
			return;
		}

		unbind(document, "keydown", keyDownHandler);
		// Fade out and hide the overlay
		overlay.className = "";
		setTimeout(function () {
			overlay.style.display = "none";
			if (document.fullscreen) {
				exitFullscreen();
			}
			if (options.bodyClass && document.body.classList) {
				document.body.classList.remove(options.bodyClass);
			}
			if (options.afterHide) {
				options.afterHide();
			}
			documentLastFocus && documentLastFocus.focus();
			isOverlayVisible = false;
		}, 500);
	}

	function loadImage(index, callback) {
		var imageContainer = imagesElements[index];
		var galleryItem = currentGallery[index];

		// Return if the index exceeds prepared images in the overlay
		// or if the current gallery has been changed / closed
		if (typeof imageContainer === "undefined" || typeof galleryItem === "undefined") {
			return;
		}

		// If image is already loaded run callback and return
		if (imageContainer.getElementsByTagName("img")[0]) {
			if (callback) {
				callback();
			}
			return;
		}

		// Get element reference, optional caption and source path
		var imageElement = galleryItem.imageElement;
		var thumbnailElement = imageElement.getElementsByTagName("img")[0];
		var imageCaption = typeof options.captions === "function" ? options.captions.call(currentGallery, imageElement) : imageElement.getAttribute("data-caption") || imageElement.title;
		var imageSrc = getImageSrc(imageElement);

		// Prepare figure element
		var figure = create("figure");
		figure.id = "baguetteBox-figure-" + index;
		figure.innerHTML = '<div class="baguetteBox-spinner">' + '<div class="baguetteBox-double-bounce1"></div>' + '<div class="baguetteBox-double-bounce2"></div>' + "</div>";
		// Insert caption if available
		if (options.captions && imageCaption) {
			var figcaption = create("figcaption");
			figcaption.id = "baguetteBox-figcaption-" + index;
			figcaption.innerHTML = imageCaption;
			figure.appendChild(figcaption);
		}
		imageContainer.appendChild(figure);

		// Prepare gallery img element
		var image = create("img");
		image.onload = function () {
			// Remove loader element
			var spinner = document.querySelector("#baguette-img-" + index + " .baguetteBox-spinner");
			figure.removeChild(spinner);
			if (!options.async && callback) {
				callback();
			}
		};
		image.setAttribute("src", imageSrc);
		image.alt = thumbnailElement ? thumbnailElement.alt || "" : "";
		if (options.titleTag && imageCaption) {
			image.title = imageCaption;
		}
		figure.appendChild(image);

		// Run callback
		if (options.async && callback) {
			callback();
		}
	}

	// Get image source location, mostly used for responsive images
	function getImageSrc(image) {
		// Set default image path from href
		var result = image.href;
		// If dataset is supported find the most suitable image
		if (image.dataset) {
			var srcs = [];
			// Get all possible image versions depending on the resolution
			for (var item in image.dataset) {
				if (item.substring(0, 3) === "at-" && !isNaN(item.substring(3))) {
					srcs[item.replace("at-", "")] = image.dataset[item];
				}
			}
			// Sort resolutions ascending
			var keys = Object.keys(srcs).sort(function (a, b) {
				return parseInt(a, 10) < parseInt(b, 10) ? -1 : 1;
			});
			// Get real screen resolution
			var width = window.innerWidth * window.devicePixelRatio;
			// Find the first image bigger than or equal to the current width
			var i = 0;
			while (i < keys.length - 1 && keys[i] < width) {
				i++;
			}
			result = srcs[keys[i]] || result;
		}
		return result;
	}

	// Return false at the right end of the gallery
	function showNextImage() {
		return show(currentIndex + 1);
	}

	// Return false at the left end of the gallery
	function showPreviousImage() {
		return show(currentIndex - 1);
	}

	// Return false at the left end of the gallery
	function showFirstImage(event) {
		if (event) {
			event.preventDefault();
		}
		return show(0);
	}

	// Return false at the right end of the gallery
	function showLastImage(event) {
		if (event) {
			event.preventDefault();
		}
		return show(currentGallery.length - 1);
	}

	/**
	 * Move the gallery to a specific index
	 * @param `index` {number} - the position of the image
	 * @param `gallery` {array} - gallery which should be opened, if omitted assumes the currently opened one
	 * @return {boolean} - true on success or false if the index is invalid
	 */
	function show(index, gallery) {
		if (!isOverlayVisible && index >= 0 && index < gallery.length) {
			prepareOverlay(gallery, options);
			showOverlay(index);
			return true;
		}
		if (index < 0) {
			if (options.animation) {
				bounceAnimation("left");
			}
			return false;
		}
		if (index >= imagesElements.length) {
			if (options.animation) {
				bounceAnimation("right");
			}
			return false;
		}

		currentIndex = index;
		loadImage(currentIndex, function () {
			preloadNext(currentIndex);
			preloadPrev(currentIndex);
		});
		updateOffset();

		if (options.onChange) {
			options.onChange(currentIndex, imagesElements.length);
		}

		return true;
	}

	/**
	 * Triggers the bounce animation
	 * @param {('left'|'right')} direction - Direction of the movement
	 */
	function bounceAnimation(direction) {
		slider.className = "bounce-from-" + direction;
		setTimeout(function () {
			slider.className = "";
		}, 400);
	}

	function updateOffset() {
		var offset = -currentIndex * 100 + "%";
		if (options.animation === "fadeIn") {
			slider.style.opacity = 0;
			setTimeout(function () {
				supports.transforms ? (slider.style.transform = slider.style.webkitTransform = "translate3d(" + offset + ",0,0)") : (slider.style.left = offset);
				slider.style.opacity = 1;
			}, 400);
		} else {
			supports.transforms ? (slider.style.transform = slider.style.webkitTransform = "translate3d(" + offset + ",0,0)") : (slider.style.left = offset);
		}
	}

	// CSS 3D Transforms test
	function testTransformsSupport() {
		var div = create("div");
		return typeof div.style.perspective !== "undefined" || typeof div.style.webkitPerspective !== "undefined";
	}

	// Inline SVG test
	function testSvgSupport() {
		var div = create("div");
		div.innerHTML = "<svg/>";
		return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
	}

	// Borrowed from https://github.com/seiyria/bootstrap-slider/pull/680/files
	/* eslint-disable getter-return */
	function testPassiveEventsSupport() {
		var passiveEvents = false;
		try {
			var opts = Object.defineProperty({}, "passive", {
				get: function () {
					passiveEvents = true;
				},
			});
			window.addEventListener("test", null, opts);
		} catch (e) {
			/* Silence the error and continue */
		}

		return passiveEvents;
	}
	/* eslint-enable getter-return */

	function preloadNext(index) {
		if (index - currentIndex >= options.preload) {
			return;
		}
		loadImage(index + 1, function () {
			preloadNext(index + 1);
		});
	}

	function preloadPrev(index) {
		if (currentIndex - index >= options.preload) {
			return;
		}
		loadImage(index - 1, function () {
			preloadPrev(index - 1);
		});
	}

	function bind(element, event, callback, options) {
		if (element.addEventListener) {
			element.addEventListener(event, callback, options);
		} else {
			// IE8 fallback
			element.attachEvent("on" + event, function (event) {
				// `event` and `event.target` are not provided in IE8
				event = event || window.event;
				event.target = event.target || event.srcElement;
				callback(event);
			});
		}
	}

	function unbind(element, event, callback, options) {
		if (element.removeEventListener) {
			element.removeEventListener(event, callback, options);
		} else {
			// IE8 fallback
			element.detachEvent("on" + event, callback);
		}
	}

	function getByID(id) {
		return document.getElementById(id);
	}

	function create(element) {
		return document.createElement(element);
	}

	function destroyPlugin() {
		unbindEvents();
		clearCachedData();
		unbind(document, "keydown", keyDownHandler);
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("baguetteBox-overlay"));
		data = {};
		currentGallery = [];
		currentIndex = 0;
	}

	return {
		run: run,
		show: show,
		showNext: showNextImage,
		showPrevious: showPreviousImage,
		hide: hideOverlay,
		destroy: destroyPlugin,
	};
});

//ZOOM
if ($(".gallery").length > 0) {
	baguetteBox.run(".gallery", {
		// Custom options
	});
}
