
$(document).ready(function() {
	// grille de mise en page
	$("body").addGrid(12, {img_path: 'plugins/960grid/img/', z_index:'99', left:'70px'});

	// navigation : menus "drop-down"
	$("#nav > div > ul > li:has(ul)").each(function(){
		$(this).append('<span class="dropdown"></span>');
		$("span.dropdown",this).mouseover(function(){
			$(this).addClass("over").closest("li").addClass("over");
			$(this).siblings("ul:hidden").addClass("dd ombre005").slideDown({duration:500,easing:"easeOutBounce"});
		});
		$(this).hover(
			function(){}
			,
			function(){
				$("ul.dd",this).slideUp({
					duration:100,
					easing:"jswing",
					complete: function(){$("span").removeClass("over").closest("li").removeClass("over");}
				});
			}
		);
	});

	// UI-tabs
	$("#tabs").tabs();
	
	
});
