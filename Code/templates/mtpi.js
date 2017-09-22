function startView(){
    document.getElementById('mainView').innerHTML='startView';
    document.getElementById('headerView').innerHTML=
    '<img src="icon.svg" alt="Hopsberry" height="70px" style="vertical-align:-40%">Start';
    document.getElementById('infoView').innerHTML=
    'by Stephan Mertens<br> With special thanks to Clemens Weninger';
    }

function tubView(){
    document.getElementById('mainView').innerHTML=
    	'Sud Nr. 18 läuft seit 3h 22m. \
    	<script type="text/javascript" src="canvasjs.min.js"></script> \
		<script type="text/javascript" src="linechart.js"></script> \
		<div id="chartContainer">?</div>';
		
    document.getElementById('headerView').innerHTML=
    '<img src="icon.svg" alt="Hopsberry" height="70px" style="vertical-align:-40%">MashTub.Pi';
    document.getElementById('infoView').innerHTML=
    	'<h3>Manuelle Bedienung</h3> \
			Rührer: \
			<input type="range" min="0" max="5" value="0" step="0.5" onchange="showValue(this.value)" /> \
			<span id="range">0</span> U/min \
			<br/><br/>\
			Heizung: \
			<label class="switch"> \
			  <input type="checkbox"> \
			  <span class="slider round"></span> \
			</label><br/><br/> \
			Alarm / Fehler: \
			';
    }

function beerView(){
    document.getElementById('mainView').innerHTML=
    	'<input type="text" class="beerSearch" id="beerSeachInput" onkeyup="filterBeers()" placeholder="Search for a beer..." title="Search a beer"> \
    	\
    	<ul class="beerSearch" id="beerList"> \
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Münchner Hell</a></li> \
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Münchner Dunkel</a></li> \
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Imperial Stout</a></li> \
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Pils</a></li> \
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Dunkler Doppelbock</a></li> \
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Imperial IPA</a></li> \
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Maibock</a></li></ul>';
    document.getElementById('headerView').innerHTML=
    '<img src="icon.svg" alt="Hopsberry" height="70px" style="vertical-align:-40%">Beers';
    document.getElementById('infoView').innerHTML='<p>Beer infoView</p>';
    }

function exitView(){
    var txt;
    if (confirm("Do you really want to quit?") == true) {
        txt = "Bye!";
        }
    else {
        txt = "I knew it!";
        }
    alert(txt);
    }

function filterBeers() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("beerSeachInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("beerList");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

function beerDetail() {
	document.getElementById('infoView').innerHTML='<h3>Beer Name</h3><br/>Style: Beer style<br/>Last Used: Date<br/>ABV: ABV<br>';
}

function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}