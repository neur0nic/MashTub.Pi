/* mtpi.js is the JS file for the MashTub.Pi web interface.
www.mashtub-pi.de, github.com/neur0nic/MashTub.Pi
*/

// Variables
var maltLines = 1,
    hopsLines = 1,
    rests = 1,
    nachguesse = 1,
    code,
    screenHeight = screen.availHeight,
    IBUs = 0;

/* Functions to change the two divisions 'mainView' and 'infoView' */
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
			<button class="kachel" onclick="tubView()">Manuelle Bedienung</button>
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
		<div id="chartContainer"></div>`;
    theChart();    
		
    document.getElementById('headerView').innerHTML=
    '<img src="icon.svg" alt="Hopsberry" height="70px" style="vertical-align:-40%">MashTub.Pi';
    
    document.getElementById('infoView').innerHTML=
    	`<h3>Manuelle Bedienung</h3>
			Rührer: <span id="range">0</span> U/min <br/>
			<input type="range" min="0" max="5" value="0" step="0.5" onchange="showValue(this.value)" style="width: 100%"/>
			<br/><br/>
            
			Heizung: 78°C<br/>
			Aus <label class="switch">
			  <input type="checkbox">
			  <span class="slider round"></span>
			</label> An
            <br/><br/>
            
			Alarm / Fehler: <svg width="24px" height="24px">
			<circle r="11" cx="12" cy="12" stroke="#000000" stroke-width="1" fill="#FFFFFF">
			<animate attributeType="XML" attributeName="fill" values="#800;#f00;#800;#800"
			dur="0.8s" repeatCount="indefinite"/> </circle> </svg>`;
    }

function beerView(){
    document.getElementById('mainView').innerHTML=
    	`<input type="text" class="beerSearch" id="beerSeachInput" onkeyup="filterBeers()" placeholder="Search for a beer..." title="Search a beer">
    	
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
    document.getElementById('infoView').innerHTML=`
    <button type="button" onclick="createRecipe()" class="bttns">Rezept erstellen</button>`;
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


/* Functions called within the Views */

function filterBeers() {
    // Filter the list of beers in beerMainView
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
    // Show details of selected beer in beerInfoView
	document.getElementById('infoView').innerHTML='<h3>Beer Name</h3><br/>Style: Beer style<br/>Last Used: Date<br/>ABV: ABV<br>';
}

function showValue(newValue){
    // Shows current value of the slide bar in beerInfoView
	document.getElementById("range").innerHTML=newValue;
}

/* Funktions for the recipe form */
function addMalt() {
    // More malt button
    maltLines++;
    schuettung();
}

function subMalt() {
    // Less malt button
    maltLines--;
    schuettung();
}

function schuettung() {
    // Add lines of malt to form
    code = '';
    for (i = 1; i <= maltLines; i++) {
        code += `
        <input type="text" class="field name" list="malzsorten" placeholder="Malz"/>
            <datalist id="malzsorten">
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
            </datalist>
        
        
        <input type="number"  class="field nmbr" placeholder="0"/> kg<br/>`;    
    }
    document.getElementById('schuettung').innerHTML=code;
}

function addHops() {
    // More hops button
    hopsLines++;
    hopfung();
}

function subHops() {
    // Less hops button
    hopsLines--;
    hopfung();
}

function hopfung(){
    // Add lines of hops to form (copied from ushops.org)
    code = '';
    for (i = 1; i <= hopsLines; i++) {
         code += `<input type="text" class="field name" list="hops" placeholder="Hopfen"/>
            <datalist id="hops">
                <option>Ahtanum</option>
                <option>AlphAroma</option>
                <option>Amarillo</option>
                <option>Apollo</option>
                <option>Azacca</option>
                <option>Bitter Gold</option>
                <option>Bravo</option>
                <option>Brewers Gold</option>
                <option>Bullion</option>
                <option>CTZ</option>
                <option>Calypso</option>
                <option>Cashmere</option>
                <option>Centennial</option>
                <option>Chelan</option>
                <option>Chinook</option>
                <option>Citra</option>
                <option>Cluster</option>
                <option>Columbia</option>
                <option>Columbus</option>
                <option>Comet</option>
                <option>Crystal</option>
                <option>Delta</option>
                <option>Denali</option>
                <option>Ekuanot Brand</option>
                <option>El Dorado</option>
                <option>Eroica</option>
                <option>Eureka!</option>
                <option>First Gold</option>
                <option>Fuggle</option>
                <option>Galena</option>
                <option>Glacier</option>
                <option>Golding</option>
                <option>Hallertauer</option>
                <option>Horizon</option>
                <option>Idaho 7</option>
                <option>Jarrylo</option>
                <option>Lemondrop</option>
                <option>Liberty</option>
                <option>Magnum</option>
                <option>Meridian</option>
                <option>Millennium</option>
                <option>Maosaic</option>
                <option>Mt. Hood</option>
                <option>Mt. Rainier</option>
                <option>Newport</option>
                <option>Northern Brewer</option>
                <option>Nugget</option>
                <option>Olympic</option>
                <option>Palisade</option>
                <option>Pekko</option>
                <option>Perle</option>
                <option>Saaz</option>
                <option>Santiam</option>
                <option>Serebrianka</option>
                <option>Simcoe</option>
                <option>Sorachi Ace</option>
                <option>Spalter</option>
                <option>Sterling</option>
                <option>Strissel Spalt</option>
                <option>Summit</option>
                <option>Super Galena</option>
                <option>Tahoma</option>
                <option>Talisman</option>
                <option>Teamaker</option>
                <option>Tettnanger</option>
                <option>Tillicum</option>
                <option>Tomahawk</option>
                <option>Topaz</option>
                <option>Triple Pearl</option>
                <option>Ultra</option>
                <option>Vanguard</option>
                <option>Warrior</option>
                <option>Willamette</option>
                <option>Yakima Gold</option>
                <option>Zeus</option>
            </datalist>
         <input type="number" class="field nmbr" placeholder="0"/> g<br/>`;    
    }
    document.getElementById('hopfung').innerHTML=code;
}

function addRest() {
    // More rests button
    rests++;
    rest();
}

function subRest() {
    // Less rests button
    rests--;
    rest();
}

function rest() {
    // Add lines of rests to form
    code = '';
    for (i = 1; i <= rests; i++) {
        code += i + '. Rast: <input type="number" class="field nmbr" placeholder="Temp."/>°C für <input type="number" class="field nmbr" placeholder="Zeit"/> min<br/>';    
    }
    document.getElementById('rest').innerHTML=code;
}

function addNachguss() {
    // More nachguss button
    nachguesse++;
    nachguss();
}

function subNachguss() {
    // less nachguss button
    nachguesse--;
    nachguss();
}

function nachguss() {
    // Add lines of nachguss to form
    code = '';
    for (i = 1; i <= nachguesse; i++) {
        code += i + '. Nachguss: <input type="number" class="field nmbr" placeholder="0"/> L<br/>';    
    }
    document.getElementById('nachguss').innerHTML=code;
}

function createRecipe() {
    // Recipe creation tool
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
    // IBU calculator
    document.getElementById('infoView').innerHTML=`
    <h2 title="Berechnet die Bittere (Iso-Alphasäure), die ein Hopfen an die Würze abgibt.">IBU Rechner</h2>
    <span title="Der Gewicht des Hopfens in Gram.">Menge: </span><input type="number" class="field nmbr" name="gHopfen" id="gHopfen" placeholder="0"> g <br/>
    <span title="Die Konzentration von Alphasäure im Hopfen in Prozent.">Alpha-Säure: </span><input type="number" class="field nmbr" name="alpha" id="alpha" placeholder="0"> %mass<br/>
    <span title="Die Dauer, in der der Hopfen mitgekocht wird.">Kochdauer: </span><input type="number" class="field nmbr" name="kochDauer" id="kochDauer" placeholder="0"> min<br/>
    <span title="Die Stammwürze, die in der Anstellwürze (zum Ende des Kochens) zu erwarten ist.">Stammwürze: </span><input type="number" class="field nmbr" name="stammW" id="stammW" placeholder="0"> °P<br/>
    <span title="">Volumen: </span><input type="number" class="field nmbr" name="volWurze" id="volWurze" placeholder="0"> L <br/>
    <hr>
    <span title="Die Bittere des Bieres in IBU (International Bitter Units)">IBU: </span>_</span> IBU <span id="valueIBU">`;
    window.onload=window.setInterval(calcIBU(),5000);
}

function calcIBU() {
    IBUs = document.getElementById("gHopfen").value + document.getElementById("alpha").value + document.getElementById("kochDauer").value + document.getElementById("stammW").value + document.getElementById("volWurze").value;
    window.alert("1");
    document.getElementById("valueIBU").innerHTML=IBUs;
}

function keepCalc() {
    window.alert("1");
    window.setInterval(calcIBU, 500);    
}

function theChart(){
    // Line Chart for the mashing process
	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
        backgroundColor: null,
        
		axisX: {
			title: 'Zeit / Minuten',titleFontColor: 'black',
			titleFontSize: 16,
			titleFontFamily: "Courier New",
			minimum: 0,
			//gridDashType: 'longDash',
			labelFontColor: 'black',
			labelFontSize: 14,
			labelFontFamily: "Courier New",
			gridColor: 'grey',
			gridThickness: 1,
			tickColor: 'black',
            interval: 10,
            lineColor: 'black'
		},
		axisY: {
			title: 'Temperatur / °C',
			titleFontColor: 'black',
			titleFontSize: 16,
			titleFontFamily: "Courier New",
			minimum: 20,
			maximum: 90,
			gridDashType: 'longDash',
			gridColor: 'grey',
			gridThickness: 1,
			labelFontColor: 'black',
			labelFontSize: 14,
			labelFontFamily: "Courier New",
			tickColor: 'black',
            interval: 5,
            lineColor: 'black' 
		},
		
		toolTip:{
	        enabled: true,       
	        animationEnabled: true
	  	},
		data: [
		{
			type: "line",
			showInLegend: true,
			lineThickness: 2,
			name: "Soll",
			markerType: "none",
			color: "#FF0000",
			dataPoints: [
			{x: 0, y: 20},
                        {x: 44, y: 64},
                        {x: 84, y: 64},
                        {x: 90, y: 72},
                        {x: 150, y: 72},
                        {x: 156, y: 78},
                        {x: 166, y: 78}
			]
		},
		{
			type: "line",
			showInLegend: true,
			lineThickness: 2,
			name: "Ist",
			markerType: "none",
			color: "#00FF00",
			dataPoints: [
			{x: 0, y: 23},
			{x: 5, y: 25},
			{x: 10, y: 35},
			{x: 15, y: 41},
			{x: 20, y: 43},
			{x: 25, y: 50},
			{x: 30, y: 55},
			{x: 35, y: 62},
			{x: 40, y: 58},
			{x: 45, y: 64},
			{x: 50, y: 64},
			{x: 55, y: 64},
			{x: 60, y: 62},
			{x: 65, y: 61},
			{x: 70, y: 65},
			{x: 75, y: 66},
			{x: 80, y: 63},
			{x: 85, y: 63},
			{x: 90, y: 68},
			{x: 95, y: 73},
			{x: 100, y: 71},
			{x: 105, y: 70},
			{x: 110, y: 72},
			{x: 115, y: 72},
			{x: 120, y: 71},
			{x: 125, y: 71},
			{x: 130, y: 73},
			{x: 135, y: 72},
			{x: 140, y: 72},
			{x: 150, y: 71},
			{x: 155, y: 71},
			{x: 160, y: 78},
			{x: 165, y: 79},
			{x: 170, y: 78}
			]
		}
                ],
		legend: {
			verticalAlign: "center",
        	horizontalAlign: "right",
			cursor: "pointer",
			itemclick: function (e) {
					if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
					}
					else {
							e.dataSeries.visible = true;
					}
			chart.render();
			}
		}
	});
	chart.render();
}
