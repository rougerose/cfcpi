/* ------------------------------------ */
/*  Site : CFCPI                        */
/*  URL : www.cfcpi.fr                  */
/*  Auteur : christophe le drean        */
/*  Date :                              */
/*  Version : 2                         */
/* ------------------------------------ */

/* ------------------------------------ */
/*  Table des matières                  */
/* ------------------------------------ */
/*	
	** Paramètres JQuery **
	grille de mise en page
	navigation : menus "drop-down"
	UI-tabs
	ajustement des hauteurs d'image rubrique Qui sommes-nous ?
	activation plugin Carousel
	index des mots-clés (pour #navigation)
	
	** Plugin JQuery :
	Plugin carousel
*/
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
				$(this).parent().removeClass("etat-actif");
				$(this).removeClass("etat-actif").siblings().removeClass("etat-actif").slideUp("slow");
			} else {
				$("dl.index").filter(".etat-actif").removeClass("etat-actif");
				$("dt.alphabet").filter(".etat-actif").removeClass("etat-actif")
					.siblings().removeClass("etat-actif").slideUp("slow");
				$(this).parent().addClass("etat-actif");
				$(this).addClass("etat-actif").siblings().addClass("etat-actif").slideDown("slow");
			}
		});
		$alphabet.append('<span class="drop"></span>');
	});
	
	// activation plugin Caroussel
	/* éléments de navigation */
	$(".caroussel").jQcaroussel();
	
});

// Plugin Caroussel
// http://jqueryfordesigners.com/jquery-infinite-carousel/
$.fn.jQcaroussel = function () {
	function repeat(str, num) {
		return new Array( num + 1 ).join( str );
	}
	
	return this.each(function () {
		var $wrapper = $('> div', this).css('overflow', 'hidden'),
		$slider = $wrapper.find('> ul'),
		$items = $slider.find('> li'),
		$single = $items.filter(':first'),
		

		singleWidth = $single.outerWidth(), 
		visible = Math.floor($wrapper.innerWidth() / singleWidth), // note: doesn't include padding or border
		currentPage = 1,
		pages = Math.ceil($items.length / visible);
		
		

		// 1. Pad so that 'visible' number will always be seen, otherwise create empty items
		if (($items.length % visible) != 0) {
			$slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
			$items = $slider.find('> li');
		}

		// 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
		$items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
		$items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
		$items = $slider.find('> li'); // reselect

		// 3. Set the left position to the first 'real' item
		$wrapper.scrollLeft(singleWidth * visible);
		
		// 4. paging function
		function gotoPage(page) {
			var dir = page < currentPage ? -1 : 1,
			n = Math.abs(currentPage - page),
			left = singleWidth * dir * visible * n;
		
			$wrapper.filter(':not(:animated)').animate({
				scrollLeft : '+=' + left
			}, 500, function () {	
				if (page == 0) {
					$wrapper.scrollLeft(singleWidth * visible * pages);
					page = pages;
				} else if (page > pages) {
					$wrapper.scrollLeft(singleWidth * visible);
					// reset back to start position
					page = 1;
				}
				
				currentPage = page;
			});                
			return false;
		}
		
		$wrapper.after('<p class="fleches"><a class="precedent">&lt;</a><a class="suivant">&gt;</a></p>');
		
		
		
		// liens directs (ajout cld)		
		var offsetDepart = singleWidth * visible;
		$("a.precedent",this).after(repeat('<a class="direct" />',pages));
		$("p.fleches a:nth-child(2)").addClass("select");
		
		$("a.direct",this).each(function(count){
			$(this).click(function(){
				$(this).siblings("a.select").removeClass("select");
				$(this).addClass("select");
				var offsetArrivee = (count + 1) * offsetDepart;
				$wrapper.stop().scrollTo(offsetArrivee,500);
				});
		});

		// 5. Bind to the forward and back buttons
		$('a.precedent', this).click(function () {
			// ajout pour les liens directs
			var $select = $(this).siblings("a.select"),
				$previous = $select.prev();
			$select.removeClass("select");
			if ($previous.hasClass("precedent")) {
				$(this).siblings("a.suivant").prev().addClass("select");
			} else $previous.addClass("select");
			
			// contrôle de l'offset du conteneur : si on utilise les liens directs, 
			// puis le lien back, le conteneur se positionne sur la dernière page, 
			// Il faudrait modifier la fonction gotoPage...
			// Mais le contrôle ci-dessous peut faire également l'affaire.
			var offsetActuel = $wrapper.scrollLeft();
			var offsetArrivee = offsetActuel - offsetDepart;
			if(offsetActuel > offsetDepart){
				currentPage = offsetActuel / offsetDepart;
			}
			return gotoPage(currentPage - 1);
		});
		
		

		$('a.suivant', this).click(function () {
			// ajout pour les liens directs
			var $select = $(this).siblings("a.select"),
				$next = $select.next();
			$select.removeClass("select");
			if ($next.hasClass("suivant")) {
				$(this).siblings("a.precedent").next().addClass("select");
			} else $next.addClass("select");
			
			// contrôle de l'offset du conteneur : si on utilise les liens directs, 
			// puis le lien forward, quand le conteneur est sur la dernière page, 
			// alors il ne revient pas sur la première page.
			// Il faudrait modifier la fonction gotoPage... 
			// Mais le contrôle ci-dessous peut faire également l'affaire.
			var offsetActuel = $wrapper.scrollLeft();
			var offsetArrivee = offsetActuel + offsetDepart;
			if ((offsetArrivee/offsetDepart) > pages) {
				 currentPage = offsetActuel / offsetDepart;
			}
			return gotoPage(currentPage + 1);
		});

		// create a public interface to move to a specific page
		$(this).bind('goto', function (event, page) {
			gotoPage(page);
		})
	});  
};
