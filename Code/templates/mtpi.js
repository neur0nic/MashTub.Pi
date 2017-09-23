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
    document.getElementById('mainView').innerHTML=`
    <form>
        <h1>Rezept</h1>
        <label for="beerName">Biername: <input type="text" class="field name" id="beerName" name="beerName" placeholder="Name"></label>
    
    
        <label>Style: 
        <input type="text" class="field name" name="beerStyles" list="beerStyles" placeholder="Style">
        <datalist id="beerStyles">
            <option>Dortmunder</option>
            <option>Münchner Hell</option>
            <option>Weißbier</option>
            <option>Pils</option>
            <option>Pale Lager</option>
            <option>Zwickl</option>
            <option>Kellerbier</option>
            <option>Landbier</option>
            <option>Festbier</option>
            <option>Märzen</option>
            <option>Münchner Dunkel</option>
            <option>Tmavý</option>
            <option>IPA</option>
            <option>Dunkles Weißbier</option>
            <option>American Pale Ale</option>
            <option>Světlý</option>
            <option>Belgian Strong Ale</option>
            <option>Heller Bock</option>
            <option>Maibock</option>
            <option>Dunkler Doppelbock</option>
            <option>Belgian Strong Ale</option>
            <option>Imperial Stout</option>
            <option>Rotbier</option>
            <option>Rauchbier</option>
            <option>Weizenbock</option>
            <option>Imperial IPA</option>
            <option>Schwarzbier</option>
            <option>Kölsch</option>
            <option>Belgian Ale</option>
            <option>Altbier</option>
            <option>Blond Ale</option>
            <option>Porter</option>
            <option>Kristallweizen</option>
            <option>ESB</option>
            <option>Saison</option>
            <option>Sour Ale</option>
            <option>Witbier</option>
            <option>Baltic Porter</option>
            <option>Dunkler Bock</option>
            <option>Stout</option>
            <option>Traditional Ale</option>
            <option>Abbey Double</option>
            <option>Abbey Triple</option>
            <option>Quadrupel</option>
            <option>Fruit Beer</option>
            <option>Irish Ale</option>
            <option>Amber Ale</option>
            <option>English Strong Ale</option>
            <option>Black IPA</option>
            <option>Brown Ale</option>
            <option>Session IPA</option>
            <option>Dry Stout</option>
            <option>Gose</option>
            <option>Gurken Gose</option>
            <option>Imperial Porter</option>
            <option>Leichte Weiße</option>
            <option>Sweet Stout</option>
            <option>Eisbock</option>
            <option>English Pale Ale</option>
            <option>Weizen Ale</option>
            <option>Barley Wine</option>
            <option>Malt Liquor</option>
            <option>Fruchtbier</option>
            <option>India Style Lager</option>
            <option>Bitter</option>
            <option>Old Lager</option>
            <option>Berliner Weiße</option>
            <option>Polotmavý</option>
            <option>Faro</option>
            <option>Gueuze</option>
            <option>Cream Ale</option>
            <option>Scotch Ale</option>
            <option>Gotlandsdricke</option>
            <option>Lambic</option>
                    
            <option><input type="text" placeholder="other beer style"/></option>
        </datalist>
        </label>
        
        
        <br/><br/>
        Schüttung:
        <button type="button" class="incrembtn" onclick="addMalt();">+</button>
        <button type="button" class="incrembtn" onclick="subMalt();">-</button>
        <br/><br/>
        <span id="schuettung" name="schuettung"><script>window.onload=schuettung();</script></span>
        
        Gesamtgewicht: ______ kg <br/><br/>
        
        
        Hopfung:
        <button type="button" class="incrembtn" onclick="addHops();">+</button>
        <button type="button" class="incrembtn" onclick="subHops();">-</button>
        <br/><br/>
        <span id="hopfung" name="hopfung"><script>window.onload=hopfung();</script></span>
        <br/>
        <div style="float: right;">
            <button type="button" class="bttns" onclick="startIBU();" style="height: 30px; width: auto; margin-right: 4px;">IBU Rechner</button>
        </div>
        
        
        
        <label>Hefe: 
        <input type="text" class="field name" name="hefe" list="hefe" placeholder="Hefe">
        <datalist id="hefe">
            <option>SafAle BE-134</option>
            <option>Saf-Ale S-04</option>
            <option>Saf-Ale US-05</option>
            <option>SafAle T-58</option>
            <option>SafAle S-33</option>
            <option>SafAle K-97</option>
            <option>SafAle WB-06</option>
            <option>SafAle BE-256</option>
            <option>SafAle F-2</option>
            <option>SafLager S-23</option>
            <option>SafLager S-189</option>
            <option>SafLager W-34/70</option>
            
            <option><input type="text" placeholder="other yeast"/></option>
        </datalist>
        </label>
            
    
        <br/><br/>
        Maischen:
        <button type="button" class="incrembtn" onclick="addRest();">+</button>
        <button type="button" class="incrembtn" onclick="subRest();">-</button>
        <br/><br/>
        <span id="rest" name="rest"><script>window.onload=rest();</script></span>
        <br/>
        
        
        Nachgüsse:
        <button type="button" class="incrembtn" onclick="addNachguss();">+</button>
        <button type="button" class="incrembtn" onclick="subNachguss();">-</button>
        <br/><br/>
        <span id="nachguss" name="nachguss"><script>window.onload=nachguss();</script></span>
        <br/>
        
        <div style="float: right;">
            <button type="button" class="bttns" onclick="window.alert('verworfen');" style="height: 30px; width: auto; margin-right: 4px;">Abbrechen</button>
            <button type="button" class="bttns" onclick="window.alert('PDF wurde erstellt');" style="height: 30px; width: auto; margin-right: 4px;">PDF erstellen</button>
            <button type="button" class="bttns" onclick="window.alert('gespeichert');" style="height: 30px; width: auto; margin-right: 4px;">Speichern</button>
        </div>
        
    </form>`;
}

function startIBU() {
    //window.alert("Test");
    document.getElementById('infoView').innerHTML=`
    <h2>IBU Rechner</h2>
    Menge: <input type="text" class="field nmbr" name="gHopfen" placeholder="0"> g <br/>
    Alpha-Säure: <input type="text" class="field nmbr" name="alpha" placeholder="0"> %alpha<br/>
    Kochdauer: <input type="text" class="field nmbr" name="kochDauer" placeholder="0"> min<br/>
    Stammwürze: <input type="text" class="field nmbr" name="stammW" placeholder="0"> °P<br/>
    <hr>
    IBU: _____ IBU`;
}
