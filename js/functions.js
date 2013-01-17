$(document).ready(function(){	
	rainbow();	
});

// Red (web color) (Hex: #FF0000) (RGB: 255, 0, 0)
// Orange (color wheel Orange) (Hex: #FF7F00) (RGB: 255, 127, 0)
// Yellow (web color) (Hex: #FFFF00) (RGB: 255, 255, 0)
// Green (X11) (Electric Green) (HTML/CSS “Lime”) (Color wheel green) (Hex: #00FF00) (RGB: 0, 255, 0)
// Blue (web color) (Hex: #0000FF) (RGB: 0, 0, 255)
// Indigo (Electric Indigo) (Hex: #6600FF) (RGB: 111, 0, 255)
// Violet (Electric Violet) (Hex: #8B00FF) (RGB: 143, 0, 255)
var spectrum = [ "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#6600FF", "#8B00FF" ];
var index = 0;

var rainbow = function() {
	$('body').css('background', spectrum[index]);
    index = ++index % spectrum.length;

	setTimeout(rainbow, 2000);
}