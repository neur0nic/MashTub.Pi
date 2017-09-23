function startView(){
    document.getElementById('mainView').innerHTML=`
    <div class="row">
		<div class="column tile">
			<button class="kachel" onclick="beerView()">Rezept laden</button>
		</div>
		<div class="column tile">
			<button class="kachel" onclick="createRecipe()">Rezept erstellen</button>
		</div>
		<div class="column tile">
			<button class="kachel">Manuelle Bedienung</button>
		</div>
		<div class="column tile">
			<button class="kachel" onclick="exitView()">Exit</button>
		</div>
	</div>`;
    document.getElementById('headerView').innerHTML=
    '<img src="icon.svg" alt="Hopsberry" height="70px" style="vertical-align:-40%">Start';
    document.getElementById('infoView').innerHTML=
    'by Stephan Mertens<br> With special thanks to Clemens Weninger';
    }

function tubView(){
    document.getElementById('mainView').innerHTML=
    	`Sud Nr. 18 läuft seit 3h 22m.
    	<script type="text/javascript" src="canvasjs.min.js"></script>
		<script type="text/javascript" src="linechart.js"></script>
		<div id="chartContainer">?</div>`;
		
    document.getElementById('headerView').innerHTML=
    '<img src="icon.svg" alt="Hopsberry" height="70px" style="vertical-align:-40%">MashTub.Pi';
    document.getElementById('infoView').innerHTML=
    	`<h3>Manuelle Bedienung</h3>
			Rührer:
			<input type="range" min="0" max="5" value="0" step="0.5" onchange="showValue(this.value)" />
			<span id="range">0</span> U/min
			<br/><br/>\
			Heizung:
			<label class="switch">
			  <input type="checkbox">
			  <span class="slider round"></span>
			</label><br/><br/>
			Alarm / Fehler: <svg width="24px" height="24px">
			<circle r="11" cx="12" cy="12" stroke="#000000" stroke-width="1" fill="#FFFFFF">
			<animate attributeType="XML" attributeName="fill" values="#800;#f00;#800;#800"
			dur="0.8s" repeatCount="indefinite"/> </circle> </svg>`;
    }

function beerView(){
    document.getElementById('mainView').innerHTML=
    	`<input type="text" class="beerSearch" id="beerSeachInput" onkeyup="filterBeers()" placeholder="Search for a beer..." title="Search a beer">
    	\
    	<ul class="beerSearch" id="beerList">
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Münchner Hell</a></li>
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Münchner Dunkel</a></li>
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Imperial Stout</a></li>
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Pils</a></li>
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Dunkler Doppelbock</a></li>
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Imperial IPA</a></li>
    		<li class="beerSearch"><a href="#" onclick="beerDetail()">Maibock</a></li></ul>`;
    document.getElementById('headerView').innerHTML=
    '<img src="icon.svg" alt="Hopsberry" height="70px" style="vertical-align:-40%">Beers';
    document.getElementById('infoView').innerHTML='<p>Beer infoView</p>';
    }

function exitView(){
    var txt;
    if (confirm("Do you really want to quit?") === true) {
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

var maltLines = 1,
    hopsLines = 1,
    rests = 1,
    nachguesse = 1,
    code;

function addMalt() {
    maltLines++;
    schuettung();
}

function subMalt() {
    maltLines--;
    schuettung();
}

function schuettung() {
    code = '';
    for (i = 1; i <= maltLines; i++) {
        code += '<input type="text" class="field name" placeholder="Malz"/> <input type="text"  class="field nmbr" placeholder="Menge"/> kg<br/>';    
    }
    document.getElementById('schuettung').innerHTML=code;
}

/*
 		<option>Pilsener Malz extra hell</option>
		<option>Pilsener Malz</option>
		<option>Pale Ale Malz</option>
		<option>Wiener Malz</option>
		<option>Münchner Malz</option>
		<option>Weizenmalz hell</option>
		<option>Weizenmalz dunkel</option>
		<option>Weizen Caramelmalz</option>
		<option>Barke Pilsener Malz</option>
		<option>Barke Wiener Malz</option>
		<option>Barke Münchner Malz</option>
		<option>Abbey Malt</option>
		<option>Special W</option>
		<option>Roggenmalz Hell</option>
		<option>Dinkelmalz</option>
		<option>Carapils</option>
		<option>Carahell</option>
		<option>Carared</option>
		<option>Caraamber</option>
		<option>Caramünch</option>
		<option>Caraaroma</option>
		<option>Carabelge</option>
		<option>Carabohemian</option>
		<option>Carawheat</option>
		<option>Cararye</option>
		<option>Carafa</option>
		<option>Carafa Spezial</option>
		<option>Weizenröstmalz</option>
		<option>Roggenröstmalz</option>
		<option>Dinkelröstmalz</option>
		<option>Röstroggen</option>
		<option>Röstgerste</option>
		<option>Buchenrauch-Gerstenmalz</option>
		<option>Eichenrauch-Weizenmalz</option>
		<option>Sauermalz</option>
		<option>Melanoidinmalz</option>
		<option>Weizenröstmalz</option>
		<option>Gerstendiastasemalz</option>
		<option>Weizendiastasemalz</option>
 */

function addHops() {
    hopsLines++;
    hopfung();
}

function subHops() {
    hopsLines--;
    hopfung();
}

function hopfung(){
    code = '';
    for (i = 1; i <= hopsLines; i++) {
         code += '<input type="text" class="field name" placeholder="Hopfen"/> <input type="text" class="field nmbr" placeholder="Menge"/> g<br/>';    
    }
    document.getElementById('hopfung').innerHTML=code;
}

function addRest() {
    rests++;
    rest();
}

function subRest() {
    rests--;
    rest();
}

function rest() {
    code = '';
    for (i = 1; i <= rests; i++) {
        code += i + '. Rast: <input type="text" class="field nmbr" placeholder="Temp."/>°C für <input type="text" class="field nmbr" placeholder="Zeit"/> min<br/>';    
    }
    document.getElementById('rest').innerHTML=code;
}

function addNachguss() {
    nachguesse++;
    nachguss();
}

function subNachguss() {
    nachguesse--;
    nachguss();
}

function nachguss() {
    code = '';
    for (i = 1; i <= nachguesse; i++) {
        code += i + '. Nachguss: <input type="text" class="field nmbr" placeholder="Menge"/> L<br/>';    
    }
    document.getElementById('nachguss').innerHTML=code;
}

function createRecipe() {
    document.getElementById('mainView').innerHTML='<iframe src="form.html" class="frameless"></iframe>';
}
