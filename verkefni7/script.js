/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.');

  do {
    play();
  } while (confirm('Spila annan leik?'));

  alert(getResults());
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
  let a = new Date();
  ask();
  let b = new Date();
  alert('Tíminn sem tók fyrir þig að svara öllum 10 dæmunum: '+(b-a);
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
  let attempts = 0;
  let rand1 = randomNumber(1, 100);
  let rand2 = randomNumber(1,100);

  do {
    const input = prompt('Hvað er '+rand1.toString()+'+'+rand2.toString()+'?');
    if (input === null) {
      break;
    }
    const parsedInput = parseGuess(input);
    correct = parsedInput === addProblem(rand1,rand2);
    alert(getResponse(parsedInput, addProblem(rand1,rand2)));
    attempts++;
  } while (attempts != 10);

  return true;
}

function addProblem(randomNum1, randomNum2) {
  return (randomNum1+randomNum2);
}
function minusProblem(randomNum1, randomNum2) {
  return (randomNum1-randomNum2);
}
function multiplyProblem(randomNum1, randomNum2) {
  return (randomNum1*randomNum2);
}
function divideProblem(randomNum1, randomNum2) {
  return (randomNum1/randomNum2);
}

/**
 * Skilar niðurstöðum um spilaða leiki sem streng.
 * Fjölda leikja er skilað ásamt meðalfjölda giska, t.d.:
 *   "Þú spilaðir 10 leikir
 *    Meðalfjöldi ágiskana var 6"
 * Ath að meðalfjöldi kemur í nýrri línu.
 * Ef enginn leikur var spilaður er "Þú spilaðir engan leik" skilað.
 */
function getResults() {
  const played = GAMES.length;
  const average = calculateAverage();

  const result = `Þú spilaðir ${played} leikir
Meðalfjöldi ágiskana var ${average.toFixed(2)}`;

  return result;
}


/**
 * Tekur inn input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er null skilað.
 */
function parseGuess(input) {
  const parsed = parseInt(input, 10);

  if (isNaN(parsed)) {
    return null;
  }

  return parsed;
}

function getResponse(guess, correct) {
  if (guess === correct) {
    return 'Rétt!';
  } else if (guess !== correct) {
    return 'Ekki rétt :(';
  }
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();