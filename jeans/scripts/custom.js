$(document).ready(function(){
	function assign($element, property) {
		$("#product-form input[name="+property+"]").val($element.attr("data-"+property));
	}
	function goToSlide(slide) {
		if (slide=="next") slide = $(".design-screen.active").next().index()+1;
		if (slide=="prev") slide = $(".design-screen.active").prev().index()+1;
		if (typeof slide == "number" && slide >0) {
			$(".design-screen.active").removeClass("active");
			$(".design-screen:nth-child("+slide+")").addClass("active");
			$(".design-screen").each(function(){
				$(this).css({"left":100*($(this).index()-$(".design-screen.active").index())+"%"
			});
			});
		}
	}
	$(".cut-wrapper li a").click(function(){
		assign($(this),"cut");
		$(".design-1 > div").fadeTo(200,0);
		$(".design-2").delay(500).fadeIn(300);
		$(".design-1").delay(500).fadeOut(300);
	});
	$(".next-btn a").click(function(){
		goToSlide("next");
	});
	$(".prev-btn a").click(function(){
		goToSlide("prev");
	});
	goToSlide(1);
	//slider fill with color on change
	$("input[type='range']").each(function(){
		function paintRange(){
			var value = (this.value - this.min)/(this.max - this.min);
			this.style.backgroundImage = [
			'-webkit-gradient(',
			'linear, ',
			'left top, ',
			'right top, ',
			'color-stop(' + value + ', #00af2c), ',
			'color-stop(' + value + ', #dddddd)',
			')'
			].join('');
		}
		this.oninput = paintRange;
		paintRange.call(this);
	});
	//denim swatches
	for (var i=0; i<denims.length;i++) {
		var denimOption =	'<div class="denim-option '+(denims[i].popular ? 'popular ' : '')+(denims[i].soldOut ? 'sold-out' : '')+'">'+
							'<div class="denim-img" style="background-image:url('+denims[i].url+')">'+
							'</div>'+
							'<div class="description">'+
							'<h2>'+denims[i].title+'</h2>'+
							'<p>'+denims[i].description+'</p></div>'+
							(denims[i].soldOut ? '' : '<a href="javascript:void(0)" class="denim-link" data-denim="'+denims[i].title+'"></a>')+
							'</div>';
		$(".denim-select").append(denimOption);
	}
	//denim selection
	$(".denim-link").click(function(){
		assign($(this),"denim");
	});
});

