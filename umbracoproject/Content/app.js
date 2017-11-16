jQuery(document).ready(function () {

    /* Navigation */
    var menuClose = $(".cross");
    var menuMain = $(".top-navigation");
    var header = $("header");

	$("#toggle").click(function(e) {
		e.preventDefault();
        menuClose.toggleClass("open");
        menuMain.toggleClass("open");
        header.toggleClass("open");
	});

    $('.nav-link').click(function(e){
        menuClose.removeClass("open");
        menuMain.removeClass("open");
        header.removeClass("open");
    });

    /* ScrollTo */
	$('.scrollTo').on('click', function (e) {
	    e.preventDefault();

	    menuClose.removeClass("open");
	    menuMain.removeClass("open");
	    header.removeClass("open");

	    var href = $(this).attr("href");
	    var offsetTop = href === "#" ? 0 : $(href).offset().top - 90;

	    $("html, body").stop().animate({
	        scrollTop: offsetTop
	    });
	});

    /* Equalizer */
    // Making elements equal height
	var equalheight = function (container) {

	    var currentTallest = 0,
          currentRowStart = 0,
          rowDivs = [],
          $el,
          topPosition = 0;

	    $(container).find('.equal').each(function () {

	        $el = $(this);
	        $($el).height('auto');
	        topPostion = $el.position().top;

	        if (currentRowStart != topPostion) {
	            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	                rowDivs[currentDiv].height(currentTallest);
	            }
	            rowDivs.length = 0; // empty the array
	            currentRowStart = topPostion;
	            currentTallest = $el.height();
	            rowDivs.push($el);
	        } else {
	            rowDivs.push($el);
	            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	        }
	        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	            rowDivs[currentDiv].height(currentTallest);
	        }
	    });
	};

    // Check for window width before resizing
	function equalHeightChecker() {
	    if (window.innerWidth > 991 && !heightIsSet) {
	        $('.equalizer')
				.each(function () {
				    equalheight(this);
				    heightIsSet = true;
				});
	    }
	    else if (window.innerWidth < 992 && heightIsSet) {
	        $('.equalizer')
				.each(function () {
				    $(this).find('.equal').each(function () {
				        this.style.height = 'auto';
				    });
				    heightIsSet = false;
				});
	    }
	}

    // Initialize equal height script
	var heightIsSet;

    // On load
	$(window).load(function () {
	    equalHeightChecker();
	});

    // and on resize
	$(window).resize(function () {
	    equalHeightChecker();
	});

}());
/* Apply class on scroll */
var classOnScrollObject = function (selector, className, scrollDistance) {
    this .item = $(selector);
    this .itemClass = className;
    this .scrollDistance = scrollDistance;
    this .classApplied = false;
    this .scrollContainer = $(window);
    this .fromTop = this.scrollContainer.scrollTop();
}

; classOnScrollObject.prototype.applyClass = function () {
    this .fromTop = this.scrollContainer.scrollTop();
    if (this.fromTop > this.scrollDistance && this.classApplied === false)

{
    this .classApplied = true;
    this .item.addClass(this.itemClass);
}

else if (this.fromTop < this.scrollDistance && this.classApplied === true) {
    this .classApplied = false;
    this .item.removeClass(this.itemClass);
}

}

; function classOnScroll(selector, className, scrollDistance) {
    var newClassOnScroll = new classOnScrollObject(selector, className, scrollDistance);
    newClassOnScroll .applyClass();
    newClassOnScroll .scrollContainer.scroll(function () {
        newClassOnScroll.applyClass();
    });
}
