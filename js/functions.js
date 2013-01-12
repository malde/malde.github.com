$(document).ready(function(){
	var datum = new Date();
    var zeit = datum.getHours();
    
    if(zeit > 18 || zeit < 7) {
 		nightfall();
    }
});

var nightfall = function() {
	$('body').addClass('night');
}