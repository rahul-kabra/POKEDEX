const primaryColors = {
	fire: '#FC6C6D',
	grass: '#28DBB3',
	electric: '#FFCF4A',
	water: '#57ADF6',
	ground: '#9e81aa',
	rock: '#fa9748',
	fairy: '#ff4a74',
	poison: '#6cef87',
	bug: '#ffba57',
	dragon: '#b00208',
	psychic: '#7b1a3a',
	flying: '#ea9fd3',
	fighting: '#a8764e',
	normal: '#d5ff4d',
	dark: '#6D6875',
	ice: '#F3FFBD',
	ghost: '#264653',
	steel: '#B5838D'
};

const secondaryColors = {
	grass: '#0b9476',
	fire: '#e63839',
	water: '#4169e1',
	bug: '#d2691e',
	poison: '#006400',
	flying: '#8b008b',
	normal: '#808000',
	electric: '#b8860b',
	ground: '#9932cc',
	fairy: '#d0133b',
	fighting: '#deb887',
	psychic: '#ca607e',
	rock: '#a52a2a',
	dragon: '#8b0000',
	dark: '#a59db1',
	ice: '#b6c184',
	ghost: '#7c989e',
	steel: '#6b5358'
};

$(document).ready(function () {
	var pokemon = data,
		currentPokemonNumber = 0;
	/*MAIN SCREEN ELEMENTS*/
	var $prevPokemonLink = $(".left-link"),
		$nextPokemonLink = $(".right-link"),
		$pokemonNumber = $("#pokemon-number-container"),
		$pokemonName = $("#pokemon-name-label"),
		$pokemonDescription = $("#pokemon-desc-container>label"),
		$pokemonImage = $("#pokemon-image"),
		$pokemonCategory = $("#pokemon-category"),
		$pokemonWeight = $("#pokemon-weight-container"),
		$pokemonHeight = $("#pokemon-height-container"),
		$pokemonImage = $("#pokemon-image-container>img"),
		$pokemonType = $("#pokemon-type-container"),
		$pokemonAbilities = $("#abilities-container"),
		$pokemonHpStats = $("#hp-stats"),
		$pokemonAttackStats = $("#attack-stats"),
		$pokemonSpAttackStats = $("#sp-attack-stats"),
		$pokemonDefenseStats = $("#defense-stats"),
		$pokemonSpDefenseStats = $("#sp-defense-stats"),
		$pokemonSpeedStats = $("#speed-stats");
	/*PAGE LOADER ELEMENT*/
	var $loader = $(".page-transition-loader");
	/*LINK ELEMENTS*/
	var $aboutContainer = $("#about-container p"),
		$githubLinkContainer = $("#github-link-container a");
	/*ANIMATION ELEMENTS*/
	var $moreInfoOverlay = $("#overlay-more-info"),
		$statsOverlay = $("div.overLyingDiv"),
		$section = $(".section"),
		$evolutionButton = $(".openEvolutionCard"),
		$item = $(".move-item");

	function setUpPokemonData() {
		var pokemonType = pokemon[currentPokemonNumber].type;
		var primaryColor = primaryColors[pokemonType[0]];
		var secondaryColor = secondaryColors[pokemonType[0]];
		$("body").css("background", "linear-gradient(" + primaryColor + ", " + primaryColor + ")");
		var pokemonName = pokemon[currentPokemonNumber].name;
		pokemonNameEffect(pokemonName);
		pokemonDescriptionEffect(pokemon[currentPokemonNumber].description);
		$pokemonCategory.text(pokemon[currentPokemonNumber].category);
		$pokemonNumber.text("#" + (pokemon[currentPokemonNumber].id.toString().padStart(3, '0')));
		$pokemonHeight.text(pokemon[currentPokemonNumber].height);
		$pokemonWeight.text(pokemon[currentPokemonNumber].weight);
		var gender = pokemon[currentPokemonNumber].gender;
		if (gender.includes("male")) {
			$("#pokemon-gender-male-container").css("visibility", "visible");
		}
		else {
			$("#pokemon-gender-male-container").css("visibility", "hidden");
		}
		if (gender.includes("female")) {
			$("#pokemon-gender-female-container").css("visibility", "visible");
		}
		else {
			$("#pokemon-gender-female-container").css("visibility", "hidden");
		}
		for (let i = 0; i < pokemonType.length; i++) {
			$("<span/>", {

			}).append($("<img/>", {
				"src": "image/types/" + pokemonType[i] + ".png"
			}))
			.appendTo($pokemonType);
		}
		$pokemonImage.attr("src", "image/pokemons/" + pokemonName + ".png");
		var pokemonAbilities = pokemon[currentPokemonNumber].abilities;
		for (let i = 0; i < pokemonAbilities.length; i++) {
			$("<span/>", {
				"style": "border: 2px solid black; border-radius: 50px; padding:2px 3px; margin-right: 3px;"
			}).text(pokemonAbilities[i]).appendTo($pokemonAbilities);
		}
		if (currentPokemonNumber <= 0)
			$prevPokemonLink.css("visibility", "hidden");
		else
			$prevPokemonLink.css("visibility", "visible");
		if (currentPokemonNumber >= 49)
			$nextPokemonLink.css("visibility", "hidden");
		else
			$nextPokemonLink.css("visibility", "visible");
		var stats = pokemon[currentPokemonNumber].stats;
		$pokemonHpStats.text(stats.hp);
		$pokemonAttackStats.text(stats.attack);
		$pokemonSpAttackStats.text(stats.spAttack);
		$pokemonDefenseStats.text(stats.defense);
		$pokemonSpDefenseStats.text(stats.spDefense);
		$pokemonSpeedStats.text(stats.speed);
		$("#current-pokemon").text(pokemonName);
		$("#current-pokemon-move").text(pokemonName);
		var evolution = pokemon[currentPokemonNumber].evolution;
		$("#evolution-first-stage-pokemon-number").text(evolution.firstStage.split("~")[0]);
		$("#evolution-first-stage-pokemon-name").text(evolution.firstStage.split("~")[1]);
		$("#evolution-first-stage-pokemon-image img").attr("src", "image/pokemons/" + evolution.firstStage.split("~")[1] + ".png");
		$("#evolution-second-stage-pokemon-number").text(evolution.secondStage.split("~")[0]);
		$("#evolution-second-stage-pokemon-name").text(evolution.secondStage.split("~")[1]);
		$("#evolution-second-stage-pokemon-image img").attr("src", "image/pokemons/" + evolution.secondStage.split("~")[1] + ".png");
		if (evolution.thirdStage) {
			$("#evolution-third-stage-pokemon-number").text(evolution.thirdStage.split("~")[0]);
			$("#evolution-third-stage-pokemon-name").text(evolution.thirdStage.split("~")[1]);
			$("#evolution-third-stage-pokemon-image").children().css("visibility", "visible");
			$("#evolution-third-stage-pokemon-image img").attr("src", "image/pokemons/" + evolution.thirdStage.split("~")[1] + ".png");
		}
		else {
			$("#evolution-third-stage-pokemon-number").text("");
			$("#evolution-third-stage-pokemon-name").text("");
			$("#evolution-third-stage-pokemon-image").children().css("visibility", "hidden");
		}
		var pokemonMoves = pokemon[currentPokemonNumber].moves;
		for (let i = 0; i < pokemonMoves.length; i++) {
			$("#move-" + (i + 1)).text(pokemonMoves[i]);
		}

		/*CHANGING COLORS*/
		$(".pokemon-badge").css("color", secondaryColor);
		$pokemonWeight.css("color", secondaryColor);
		$pokemonHeight.css("color", secondaryColor);
		$aboutContainer.css("color", secondaryColor);
		$pokemonNumber.css("color", secondaryColor);
		$("#pokemon-name-label span:nth-of-type(even)").css("color", secondaryColor);
		$statsOverlay.css("color", primaryColor);
		$moreInfoOverlay.css("color", secondaryColor);
		$section.css("background", primaryColor);
		$item.css("background", secondaryColor);
		$evolutionButton.css("background", secondaryColor);
		$githubLinkContainer.css("color", secondaryColor);

		/*CHANGING TITLE*/
		$("title").text("POKEDEX | " + pokemon[currentPokemonNumber].name)
	}

	setUpPokemonData();

	$prevPokemonLink.on('click', function (event) {
		event.preventDefault();
		if (currentPokemonNumber > 0) {
			currentPokemonNumber = currentPokemonNumber - 1;
		}
		$loader.addClass("page-transition-loader-active");
		setTimeout(function () {
			$loader.removeClass('page-transition-loader-active');
			$pokemonName.text("");
			$pokemonDescription.text("");
			$pokemonAbilities.text("");
			$pokemonType.text("");
			setUpPokemonData();
			$(".closeEvolutionCard").click();
			$(".reveal").removeClass("is-sliding");
		}, 5000);
	});

	$nextPokemonLink.on('click', function (event) {
		event.preventDefault();
		if (currentPokemonNumber < 49) {
			currentPokemonNumber = currentPokemonNumber + 1;
		}
		$loader.addClass("page-transition-loader-active");
		setTimeout(function () {
			$loader.removeClass('page-transition-loader-active');
			$pokemonName.text("");
			$pokemonDescription.text("");
			$pokemonAbilities.text("");
			$pokemonType.text("");
			setUpPokemonData();
			$(".closeEvolutionCard").click();
			$(".reveal").removeClass("is-sliding");
		}, 5000);
	});

	function pokemonNameEffect(content) {
		var element = "<span>" + content.split("").join("</span><span>") + "</span>";
		$(element).appendTo($pokemonName);
	}
	function pokemonDescriptionEffect(content) {
		var element = "<span>" + content.split("").join("</span><span>") + "</span>";
		$(element).appendTo($pokemonDescription).each(function (i) {
			$(this).delay(25 * i).css({
				opacity: 0
			}).animate({
				opacity: 1
			}, 100);
		});
	}

	$(".toggle").on("click", function () {
		$(".reveal").toggleClass("is-sliding");
	});

	$(".toggle-more-info").click(function () {
		$(this).toggleClass("active");
		$('#overlay-more-info').toggleClass("open");
	});

	$('.md-trigger').on('click', function () {
		$('.md-modal').addClass('md-show');
	});

	$('.md-close').on('click', function () {
		$('.md-modal').removeClass('md-show');
	});

	$(".openEvolutionCard").click(function () {
		$(".first").addClass("open-evolution");
		setTimeout(function () {
			$(".third").addClass("open-evolution");
		}, 250);
		setTimeout(function () {
			$(".back").addClass("open-evolution");
		}, 350);
		$(".closeEvolutionCard").delay(1000).fadeIn();
	});

	$(".closeEvolutionCard").click(function () {
		setTimeout(function () {
			$(".first").removeClass("open-evolution");
		}, 250);
		$(".third").removeClass("open-evolution");
		setTimeout(function () {
			$(".back").removeClass("open-evolution");
		}, 600);
		$(".closeEvolutionCard").fadeOut();
	});

});
