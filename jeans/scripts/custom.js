$(document).ready(function(){
	function routing() {
		window.location.href;
	}
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
		$("html, body").animate({ scrollTop: "0px" }); //scroll to top on slide change
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
		var denimOption =	'<div class="denim-option img-option '+(denims[i].popular ? 'popular ' : '')+(denims[i].soldOut ? 'sold-out' : '')+'" data-id="'+denims[i].id+'">'+
							'<div class="product-img" style="background-image:url('+denims[i].url+')">'+
							'</div>'+
							'<div class="description">'+
							'<h2>'+denims[i].title+'</h2>'+
							'<p>'+denims[i].description+'</p></div>'+
							(denims[i].soldOut ? '' : '<a href="javascript:void(0)" class="denim-link" data-denim="'+denims[i].title+'" data-id="'+denims[i].id+'"></a>')+
							'</div>';
		$(".denim-select").append(denimOption);
	}
	//denim selection
	$(".denim-link").click(function(){
		assign($(this),"denim");
		$("#svg-denim").attr("filter","url(#"+$(this).data("id")+")");
	});

	//thread swatches
	for (var i=0; i<threads.length;i++) {
		var threadOption =	'<div class="thread-option img-option '+(threads[i].popular ? 'popular ' : '')+(threads[i].soldOut ? 'sold-out' : '')+'" data-id="'+threads[i].id+'">'+
							'<div class="product-img" style="background-image:url('+threads[i].url+')">'+
							'</div>'+
							'<div class="description">'+
							'<h2>'+threads[i].title+'</h2>'+
							'<p>'+threads[i].description+'</p></div>'+
							(threads[i].soldOut ? '' : '<a href="javascript:void(0)" class="thread-link" data-thread="'+threads[i].title+'" data-id="'+threads[i].id+'"></a>')+
							'</div>';
		$(".thread-select").append(threadOption);
	}
	//thread selection
	$(".thread-link").click(function(){
		assign($(this),"thread");
		$("#svg-thread").attr("filter","url(#"+$(this).data("id")+")");
	});

	$(".img-option:not(.sold-out)").click(function(){
		$(".img-option").removeClass("selected");
		$(this).addClass("selected");
	});
	$(".advanced-sizing").click(function(){
		$(this).html("Hide Advanced Sizing");
		$(".advanced-sizing-container").slideDown();
	});

	//measurement span
	$("input[type='range']").on('input',function(){
		var $input = $(this);
		$input.next().html($input.val());
	});
	//waist transform jeans
	$("#waist").on('input',function(){
		var $input = $(this);
		var min=$input.attr("min");
		var max=$input.attr("max");
		var percent = ($input.val()-min)/(max-min)
		var xMax = 1.03;
		var xMin = 0.98;
		var xRange = xMax - xMin;
		var xScale = xMin + (xRange*percent);
		$("#jeans-preview").css("transform","scaleX("+xScale+")");
	});
	//waist change measurement defaults 
	$("#waist").on('input',function(){
		var thigh = getDefaultThigh($(this).val());
		$("#thigh").val(thigh).attr("value",thigh).attr("min",thigh-1).attr("max",thigh+1).trigger("input");
	});
	//lo change measurement defaults 
	$("#waist").on('input',function(){
		var lo = getDefaultLo($(this).val());
		$("#leg-opening").val(lo).attr("value",lo).attr("min",lo-1).attr("max",lo+1).trigger("input");
	});
	//inseam transform jeans
	$("#inseam").on('input',function(){
		var $input = $(this);
		var min=$input.attr("min");
		var max=$input.attr("max");
		var percent = ($input.val()-min)/(max-min)
		var xMax = 1.03;
		var xMin = 0.98;
		var xRange = xMax - xMin;
		var xScale = xMin + (xRange*percent);
		$("#jeans-preview").css("transform","scaleY("+xScale+")");
		var desc = inseam().filter(function(i){return $input.val() >= i.threshold});
		var desc = desc.slice(-1)[0].description;
		$input.siblings(".desc").html(desc);
	});
		//thigh descriptions
	$("#thigh").on('input',function(){
		var $input = $(this);
		var desc = thighDescriptions().filter(function(i){return $input.val() >= i.threshold});
		var desc = desc.slice(-1)[0].description;
		$input.siblings(".desc").html(desc);
	});
			//lo descriptions
	$("#leg-opening").on('input',function(){
		var $input = $(this);
		var desc = loDescriptions().filter(function(i){return $input.val() >= i.threshold});
		var desc = desc.slice(-1)[0].description;
		$input.siblings(".desc").html(desc);
	});
	var inseam = function() {
		return [
		{
			description:"Short",
			threshold:parseInt($("#inseam").attr("min"))
		},	
		{
			description:"Regular",
			threshold:32
		},
		{
			description:"Long",
			threshold:34
		}];
	}
	function getDefaultThigh(w) {
		var sizes = {
				"28":10.5,
				"29":10.5,
				"30":10.5,
				"31":10.5,
				"32":10.75,
				"33":11,
				"34":11.25,
				"35":11.5,
				"36":11.75,
				"37":12,
				"38":12,
				"39":12.5,
				"40":13,
				"41":13,
				"42":13
			}
		return sizes[w] || 11.75;
	}
	function getDefaultLo(w) {
		var sizes = {
				"28":6,
				"29":6,
				"30":6,
				"31":6,
				"32":6.25,
				"33":6.5,
				"34":6.75,
				"35":6.85,
				"36":7,
				"37":7.5,
				"38":7.5,
				"39":8,
				"40":8,
				"41":8,
				"42":8
		}
		return sizes[w] || 7;
	}
	var thighDescriptions = function() {
		return [
			{
				description:"Skinny",
				threshold:parseInt($("#thigh").attr("min"))
			},	
			{
				description:"Recommended",
				threshold:getDefaultThigh($("#waist").val())
			},
			{
				description:"Roomy",
				threshold:getDefaultThigh($("#waist").val()) + 0.25
			}
		];
	}
	var loDescriptions = function() {
		return [
			{
				description:"Narrow",
				threshold:parseInt($("#leg-opening").attr("min"))
			},	
			{
				description:"Recommended",
				threshold:getDefaultLo($("#waist").val())
			},
			{
				description:"Bootcut",
				threshold:getDefaultLo($("#waist").val()) + 0.5
			}
		];
	}

});

