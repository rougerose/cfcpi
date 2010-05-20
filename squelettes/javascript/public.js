
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
	

	// Page mot-clé index mots dans #navigation
	// présentation style "accordéon"
	$(".page_mot #navigation .index").each(function(){
		var $this = $(this);
		var $alphabet = $(".alphabet.contenu", $this);
		var $tag = $(".tag", $this);
		
		$tag.hide();
		$tag.filter(".etat-actif").show("slow");
		
		$alphabet.click(function(){
			if ($(this).hasClass("etat-actif")){
				$(this).removeClass("etat-actif").siblings().removeClass("etat-actif").slideUp("slow");
			} else {
				$("dt.alphabet").filter(".etat-actif").removeClass("etat-actif")
					.siblings().removeClass("etat-actif").slideUp("slow");
				$(this).addClass("etat-actif").siblings().addClass("etat-actif").slideDown("slow");
			}
		});
		$alphabet.append('<span class="drop"></span>');
	});
});
