$(document).ready(function(){	
	rainbow();	
});

var spectrum = ["#80F31F", "#A5DE0B", "#C7C101", "#E39E03", "#F6780F", "#FE5326", "#FB3244", "#ED1868", 
			 	"#D5078E", "#B601B3", "#9106D3", "#6B16EC", "#472FFA", "#2850FE", "#1175F7", "#039BE5", 
				"#01BECA", "#0ADCA8", "#1DF283", "#3AFD5D", "#5CFD3A"]
var index = 0;

var rainbow = function() {
	$('body').css('background-color', spectrum[index]);
    index = ++index % spectrum.length;

	setTimeout(rainbow, 2000);
}