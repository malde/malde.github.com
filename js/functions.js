$(document).ready(function(){
    var datum = new Date();
    var zeit = datum.getHours();
    
    if(zeit > 18 || zeit < 7) {
        $('html').addClass('night');
        $('body').addClass('night');
    }
});