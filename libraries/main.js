$(".about").click(function() {
	$("#home-container").fadeOut('fast', function() {
        $("#about-container").fadeIn('slow');
    });
});
$(".home").click(function() {
	$("#about-container").fadeOut('fast', function() {
        $("#home-container").fadeIn('slow');
    });
});
$(".home").click();