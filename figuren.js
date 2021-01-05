var x = 0;
var y = 0;
var x2 = 560;
var y2 = 440;
var zielx = Math.floor(Math.random()*10)*40+40;			// X Koordinate von dem Bild wird berechnet
var ziely = Math.floor(Math.random()*10)*40+40;			// Y Koordinate von dem Bild wird berechnet
var ziel2x = Math.floor(Math.random()*5)*40+40;			// X Koordinate von dem Bild wird berechnet
var ziel2y = Math.floor(Math.random()*5)*40+40;			// Y Koordinate von dem Bild wird berechnet
var punktestand1 = 0;	// Start bei 0 Spieler 1
var punktestand2 = 0;	// Start bei 0 Spieler 2
var spielzeit = 45;	// Angabe in Sekunden - 45 Sekunden geht das Spiel
var restzeit = 0; 
var startzeit = new Date();
var gegnerpositionen = [0, 300, 200, 100, 560, 400, 0, 350];		//Gegeneranzahl durch Anzahl der Postionen im Array, Startpostion durch Zahl von links
var gegnerbewegung = [6, 6, 6, 4, 6, 6, 5, 6];						//Geschwindigkeit max. 6 da sonst die Kollision nicht immer funktioniert

$(document).ready(function() {
	takt = window.setInterval(taktung, 100);
	var spielbrett = document.getElementById('leinwand');			//Erstellt Leinwand aus spiel.html
	spielfeld = spielbrett.getContext('2d');
	
	var spielfigur = new Image();									//Spielfigur erstellen
	spielfigur.src = 'bilder/spielfigur.png';
	spielfigur.onload = function() {
		spielfeld.drawImage(spielfigur,x,y);
	
	}

	var spielfigur2 = new Image();									//Zweite Spielfigur erstellen
	spielfigur2.src = 'bilder/spielfigur2.png';
	spielfigur2.onload = function() {
		spielfeld.drawImage(spielfigur2,x2,y2);
	}
	
	function zeichneZielfeld() {									//Zielfeld erstellen
		var zielfeld = new Image();
		zielfeld.src='bilder/zielbereich.png';
		zielfeld.onload=function() {
			spielfeld.drawImage(zielfeld, zielx, ziely);
		}
	}
	zeichneZielfeld();	//Ausgabe

	function zeichneZielfeld2() {									//Zielfeld2 erstellen doppelt Punkte	
		var zielfeld2 = new Image();
		zielfeld2.src='bilder/doppelpunkte.png';
		zielfeld2.onload=function() {
			spielfeld.drawImage(zielfeld2, ziel2x, ziel2y);
		}
	}
	zeichneZielfeld2();	//Ausgabe

	function zielfelderreicht() {
		console.log("x: "+x+ "|Ziel x:"+ zielx);
		console.log("y: "+y+ "|Ziel y:"+ ziely);

		//Spieler 1
		if(x==zielx && y==ziely) {
			// Ziel erreicht!
			console.log("Ziel erreicht!");

			// neues Ziel erzeugen
			if (ziely==460) {
				ziely = 0;
			}
			else {
				ziely=460;
			}
			zielx = Math.floor(Math.random()*10)*40+40;
			ziely = Math.floor(Math.random()*10)*40+40;

			punktestand1 = punktestand1 + 100;
			$('#punktestand1').html('<b>SPIELER 1: </b>'+punktestand1);
		}
		//Spieler 2
		if(x2==zielx && y2==ziely) {
			// Ziel erreicht!
			console.log("Ziel erreicht!");

			// neues Ziel erzeugen
			if (ziely==460) {
				ziely = 0;
			}
			else {
				ziely=460;
			}
			zielx = Math.floor(Math.random()*10)*40+40;
			ziely = Math.floor(Math.random()*10)*40+40;

			punktestand2 = punktestand2 + 100;
			$('#punktestand2').html('<b>SPIELER 2: </b>'+punktestand2);
		}
	}

	//Doppelte Punkte Muffin
	function zielfelderreicht2() {
		console.log("x: "+x+ "|Ziel x:"+ zielx);
		console.log("y: "+y+ "|Ziel y:"+ ziely);

		// Spieler 1
		if(x==ziel2x && y==ziel2y) {
			// Ziel erreicht!
			console.log("Ziel erreicht!");

			// neues Ziel erzeugen
			if (ziel2y==460) {
				ziel2y = 0;
			}
			else {
				ziel2y=460;
			}
			ziel2x = Math.floor(Math.random()*10)*40+40;
			ziel2y = Math.floor(Math.random()*10)*40+40;

			punktestand1 = punktestand1 + 200;
			$('#punktestand1').html('<b>SPIELER 1: </b>'+punktestand1);
		}

		// Spieler 2
		if(x2==ziel2x && y2==ziel2y) {
			// Ziel erreicht!
			console.log("Ziel erreicht!");

			// neues Ziel erzeugen
			if (ziel2y==460) {
				ziel2y = 0;
			}
			else {
				ziel2y=460;
			}
			ziel2x = Math.floor(Math.random()*10)*40+40;
			ziel2y = Math.floor(Math.random()*10)*40+40;

			punktestand2 = punktestand2 + 200;
			$('#punktestand2').html('<b>SPIELER 2: </b>'+punktestand2);
		}
	}

    function taktung() {
		spielfeld.clearRect(0, 0, 600, 480);
		zeichneZielfeld();
		zeichneZielfeld2();
		spielfeld.drawImage(spielfigur,x,y);
		spielfeld.drawImage(spielfigur2,x2,y2);
		zielfelderreicht();
		zielfelderreicht2();
        kollisionspruefungGegner();
        setzeGegner();
		
		var aktuellezeit = new Date();
		restzeit = spielzeit - Math.floor((aktuellezeit.getTime()-startzeit.getTime()) / 1000);	//Umrechnung auf Sekunden der aktuellenen gemessenen Zeit
		$('#spielzeit').html('PLAYINGTIME: ' + restzeit);
		if (restzeit <= 0) {
			spielende();
		}
    }
    
    function setzeGegner() {
        for (i = 0; i < gegnerpositionen.length; i++) {
            gegnerpositionen[i] += gegnerbewegung[i] * 5;				//Umso größer die multiplizierte Zahl desto höher die Geschwindigkeit
            if (gegnerpositionen[i] > 560 || gegnerpositionen[i] < 0) {	//560 ende des Divs und 0 Anfang --> Begrenzung damit Gegner von Wand abprallen
                gegnerbewegung[i] *= -1;
            }
            erzeugeGegner(gegnerpositionen[i], 360-(i*40));
        }
    }
    
    function erzeugeGegner(gx, gy) {
        var gegner = new Image();
        gegner.src = 'bilder/gegnerfigur.png';
        gegner.onload = function() {
            spielfeld.drawImage(gegner, gx, gy);
        }
    } 

    function kollisionspruefungGegner() {
		// Figur 1
		for (i = 0; i < gegnerpositionen.length; i++) {
            var ygeg = 360-(i*40);
            if ( Math.abs(x - gegnerpositionen[i]) < 20 && y == ygeg ) {
                // Zusammenstoß
                kollisionGegner();
            }
		}
		// Figur 2
		for (i = 0; i < gegnerpositionen.length; i++) {
            var ygeg = 360-(i*40);
            if ( Math.abs(x2 - gegnerpositionen[i]) < 20 && y2 == ygeg ) {
                // Zusammenstoß
                kollisionGegner2();
            }
        }
	}
	
    function kollisionGegner() {
        clearInterval(takt);
        $('#gameover1').show();
	}
	
	function kollisionGegner2() {
        clearInterval(takt);
        $('#gameover2').show();
    }

    function spielende() {
		if (punktestand1 > punktestand2) {
			clearInterval(takt);
			$('#spielendespieler1').show();
		}
		else if (punktestand2 > punktestand1) {
			clearInterval(takt);
			$('#spielendespieler2').show();
		}
		else {
			clearInterval(takt);
			$('#spielende').show();
		}
		
	}
	
	// function highScore(punktestand1) {
   	// 	var saved = 0;
   	// 	try { saved = parseFloat(localStorage.highScore); } catch (e) { saved = 0; }
   	// 	if (!(typeof punktestand1 === 'undefined')) {
    //   		try { score = parseFloat(punktestand1); } catch (e) { score = 0; }
    //   			if (punktestand1>saved) {
    //     			saved = punktestand1;
    //     			localStorage.highScore = '' + punktestand1;
    //   			}
   	// 	}
   	// 	if (isNaN(saved)) {
    //   		saved = 0;
    //   		localStorage.highScore = '0';
	// 		alert('New Highscore is ' + highScore());
   	// 	}
   	// 	return saved;
	// }
    
	$(document).bind('keydown', function (evt) {
		// console.log(evt.keyCode);
		switch (evt.keyCode) {
			// Pfeiltaste nach unten
			case 40:		//Taste auf Tastatur codiert
				y2 += 40;	// Verschiebt Bild um 40 Pixel nach unten
				if (y2 >= 480) {
					y2 = 0;
				}
				return false;
				break;
			// Pfeiltaste nach oben
			case 38:
				y2 -= 40;
				if (y2 <= 0) {
					y2 = 440;
				}
				return false;
				break;
			// Pfeiltaste nach links
			case 37:
				x2 -= 40;
				if (x2 <= 0) {
					x2 = 560;
				}
				return false;
				break;
			// Pfeiltaste nach rechts
			case 39:
				x2 += 40;
				if (x2 >= 600) {
					x2 = 0;
				}
	 			return false;
	 			break;
			
			// S
			case 83:
				y += 40;	// Verschiebt Bild um 40 Pixel nach unten
				if (y >= 480) {
					y = 0;
				}
			return false;
			break;
			// W
			case 87:
				y -= 40;
				if (y <= 0) {
					y = 440;
				}
				return false;
				break;
			// A
			case 65:
				x -= 40;
				if (x <= 0) {
					x = 560;
				}
				return false;
				break;
			// D
			case 68:
				x += 40;
				if (x >= 600) {
					x = 0;
				}
				return false;
				break;

			
		}	
	});
});