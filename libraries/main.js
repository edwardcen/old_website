$(".about").click(function() {
	$("#home-container").fadeOut('fast', function() {
        $("#about-container").fadeIn('slow');
    });
});
$(".projects").click(function() {
	$("#home-container").fadeOut('fast', function() {
        $("#project-container").fadeIn('slow');
    });
});
$(".home1").click(function() {
	$("#project-container").fadeOut('fast', function() {
        $("#home-container").fadeIn('slow');
    });
});
$(".home").click(function() {
	$("#about-container").fadeOut('fast', function() {
        $("#home-container").fadeIn('slow');
    });
});
$(".home").click();