/*
let susListe = {
  "Alice": ["Bob", "Charlie", "David", "Eve", "Frank"],
  "Bob": ["Charlie", "David", "Eve", "Frank"],
  "Charlie": ["Alice", "David", "Eve"],
  "David": ["Eve", "Frank", "Grace", "Hannah", "Isabel"],
  "Eve": ["Alice", "Bob", "Charlie"],
  "Frank": ["Hannah", "Isabel", "Jack"],
  "Grace": ["Frank", "Hannah", "Isabel"],
  "Hannah": ["Frank", "Grace"],
  "Isabel": ["Frank", "Jack"],
  "Jack": ["Frank", "Hannah", "Isabel", "Kevin"],
  "Kevin": ["Lily", "Mia", "Nathan", "Olivia"],
  "Lily": ["Kevin", "Mia", "Nathan"],
  "Mia": ["Kevin", "Lily", "Nathan", "Olivia"],
  "Nathan": ["Kevin", "Lily", "Mia"],
  "Olivia": ["Kevin", "Lily", "Mia", "Nathan"],
  "Paul": ["Rachel", "Sophia", "Thomas", "Victoria"],
  "Rachel": ["Paul", "Sophia", "Thomas", "Victoria"],
  "Sophia": ["Paul", "Rachel", "Thomas", "Victoria"],
  "Thomas": ["Paul", "Rachel", "Sophia", "Victoria"],
  "Victoria": ["Paul", "Rachel", "Sophia", "Thomas"],
  "William": ["Xander", "Yasmine", "Zachary"],
  "Xander": ["William", "Yasmine", "Zachary"],
  "Yasmine": ["William", "Xander", "Zachary"],
  "Zachary": ["William", "Xander", "Yasmine"],
  "Herbert": ["William"]
}
*/

//              Funktion zum Mischen
function shuffleArraydia(array) {
  const shuffledArray = [...array]; // Eine Kopie des ursprünglichen Arrays erstellen
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Zufällige Indexposition wählen
    // Die Werte an den ausgewählten Positionen tauschen
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

//           Funktion für erste Reihe:
function removeNonMatchingElementsdia(sublists) {
  const nonMatchingElementsToRemove = [];

  for (let i = 0; i < sublists.length; i++) {
    const sublist = sublists[i];
    let isMatching = false;

    for (const existingSublist of nonMatchingElementsToRemove) {
      if (
        sublist[0] !== existingSublist.find((item, j) => j !== 0 && item === sublist[0]) &&
        existingSublist[0] !== sublist.find((item, j) => j !== 0 && item === existingSublist[0])
      ) {
        isMatching = true;
        break;
      }
    }

    if (!isMatching) {
      nonMatchingElementsToRemove.push(sublist);
    }
  }

  // Entferne die nonMatchingElements aus sublists
  for (const elementToRemove of nonMatchingElementsToRemove) {
    const index = sublists.indexOf(elementToRemove);
    if (index !== -1) {
      sublists.splice(index, 1);
    }
  }

  return nonMatchingElementsToRemove;
}

// Falls die erste Reihe größer als g
function processAndMoveMatchingElementsdia(list1, list2, g) {
  if (list1.length > g) {
    const matchCounts = {}; // Ein Objekt zur Verfolgung der Anzahl der Matches für jedes Element in list1

    // Iteriere durch die Elemente in list1 und zähle die Matches mit Elementen aus list2
    for (const element1 of list1) {
      let matchCount = 0;

      for (const element2 of list2) {
        if (
          element1[0] !== element2.find((item, i) => i !== 0 && item === element1[0]) &&
          element2[0] !== element1.find((item, i) => i !== 0 && item === element2[0])
        ) {
          matchCount++;
        }
      }

      matchCounts[element1] = matchCount;
    }

    // Sortiere list1 absteigend basierend auf der Anzahl der Matches
    list1.sort((a, b) => matchCounts[b] - matchCounts[a]);
  
    //Behalte nur die ersten g Elemente in list1
    const elementsToKeep = list1.splice(g);

    // Entferne die ersten g Elemente aus list1
    //list1.splice(0, g);

    // Füge die entfernten Elemente zu list2 hinzu
    list2.push(...elementsToKeep);
  }
}

// Falls erste Reihe kleiner als g - Matches hinzufügen

function findMostFrequentMatchingElementdia(list1, list2, g) {
  let mostFrequentElement = null;
  let maxFrequency = 0;

  while (list1.length < g && list2.length > 0) {
    mostFrequentElement = null;
    maxFrequency = 0;

    for (let i = 0; i < list2.length; i++) {
      const element1 = list2[i];
      let frequency = 0;

      for (const element2 of list2) {
        if (
          element1[0] !== element2.find((item, j) => j !== 0 && item === element1[0]) &&
          element2[0] !== element1.find((item, j) => j !== 0 && item === element2[0])
        ) {
          frequency++;
        }
      }

      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        mostFrequentElement = element1;
      }
    }

    if (mostFrequentElement !== null) {
      // Entferne das Element aus list2 und füge es zu list1 hinzu
      const indexToRemove = list2.indexOf(mostFrequentElement);
      if (indexToRemove !== -1) {
        list2.splice(indexToRemove, 1);
        list1.push(mostFrequentElement);
      } else {
        break; // Beende die Schleife, wenn das Element nicht in list2 gefunden wurde
      }
    } else {
      break; // Beende die Schleife, wenn kein passendes Element gefunden wurde
    }
  }

  return mostFrequentElement;
}

// Falls immer noch kleiner als g - Halbmatches hinzufügen

function findMostFrequentHalbMatchingElementdia(list1, list2, g) {
  let mostFrequentElement = null;
  let maxFrequency = 0;

  while (list1.length < g && list2.length > 0) {
    mostFrequentElement = null;
    maxFrequency = 0;

    for (let i = 0; i < list2.length; i++) {
      const element1 = list2[i];
      let frequency = 0;

      for (const element2 of list2) {
        if (
          element1[0] !== element2.find((item, j) => j !== 0 && item === element1[0]) ||
          element2[0] !== element1.find((item, j) => j !== 0 && item === element2[0])
        ) {
          frequency++;
        }
      }

      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        mostFrequentElement = element1;
      }
    }

    if (mostFrequentElement !== null) {
      // Entferne das Element aus list2 und füge es zu list1 hinzu
      const indexToRemove = list2.indexOf(mostFrequentElement);
      if (indexToRemove !== -1) {
        list2.splice(indexToRemove, 1);
        list1.push(mostFrequentElement);
      } else {
        break; // Beende die Schleife, wenn das Element nicht in list2 gefunden wurde
      }
    } else {
      break; // Beende die Schleife, wenn kein passendes Element gefunden wurde
    }
  }

  return mostFrequentElement;
}

// Falls immer noch kleiner als g - irgendwelche Elemente hinzufügen

function addElementsToListdia(list1, list2, g) {
  while (list1.length < g && list2.length > 0) {
    const elementToAdd = list2.pop(); // Entnehme das letzte Element aus list2
    list1.push(elementToAdd); // Füge es zu list1 hinzu
  }
}


// Liste von unterlisten erstellen

function elementsToListOfListsdia(elements) {
  const listOfLists = elements.map((element) => [element]);
  return listOfLists;
}

//   Objekt mit maximaler Gruppengroesse erstellen

function groupSizesdia (susListe, g) {
    const gruppenGroe = [];
    let divident = susListe.length;
    for (let i = g; i > 0; i-- ) {
      let toPush = (Math.ceil(divident / i));
      gruppenGroe.push(toPush);
      divident = divident - (toPush);
    }
    
    let maxValue = gruppenGroe[0]; // Annahme: Das erste Element ist das größte.
    let count = 1; // Zähler für das erste Vorkommen des größten Elements.

    for (let i = 1; i < gruppenGroe.length; i++) {
      if (gruppenGroe[i] > maxValue) {
        // Wenn ein größeres Element gefunden wird, aktualisiere maxValue.
        maxValue = gruppenGroe[i];
        count = 1; // Setze den Zähler zurück, da ein neues Maximum gefunden wurde.
      } else if (gruppenGroe[i] === maxValue) {
        // Wenn das gleiche Maximum erneut gefunden wird, erhöhe den Zähler.
        count++;}
      } return { maxValue, count };}

// Funktion zum Ausgeben der maximalen Gruppengroesse

function groupCountdia (liste, groupSize) {
        let maxObject = groupSize;
        let { maxValue: maxSize, count: maxGroupCount } = maxObject;
        let maxGroups = 0;
  
        for (const group of liste) {
          if (group.length === maxSize){
            maxGroups++;
          }
          if (maxGroups === maxGroupCount) {
            maxSize--;
            return maxSize;
          } 
        } return maxSize;
      }

// Matches finden

function countMatchesdia(liste1, liste2, maxSize) {
  const matchesByOuterList = {};
  let maxGroesse = maxSize;
  for (let i = 0; i < liste1.length; i++) {
    const outerList1 = liste1[i];

      if (outerList1.length < maxGroesse) {
        // Erstelle ein Objekt für die aktuelle outerList1
        const matchesInOuterList = {};

        for (let j = 0; j < outerList1.length; j++) {
          const subList1 = outerList1[j];
          const element1 = subList1[0];

          for (const subList2 of liste2) {
            const element2 = subList2[0];

            // Bedingung 1 prüfen
            if (element1 !== subList2.find((item, index) => index !== 0 && item === element1)) {
              // Bedingung 2 prüfen
              if (element2 !== subList1.find((item, index) => index !== 0 && item === element2)) {
                // Erhöhe die Zählung für element2 in matchesInOuterList
                if (matchesInOuterList[element2]) {
                  matchesInOuterList[element2]++;
                } else {
                  matchesInOuterList[element2] = 1;
                }
              }
            }
          }
        }

        // Füge matchesInOuterList mit dem Index als Schlüssel hinzu
        matchesByOuterList[i] = matchesInOuterList;
      }
    }
  return matchesByOuterList;
}

//Matches zählen

function findOuterListWithMaxMatchesdia(matchesByOuterList) {
  let bestOuterList = null;
  let bestHighscore = -1;
  let bestMatchesCount = Infinity;
  let bestHighscoreKey = null;

  for (const key in matchesByOuterList) {
    if (matchesByOuterList.hasOwnProperty(key)) {
      const outerListMatches = matchesByOuterList[key];

      // Finden Sie den Highscore und die zugehörige Key-Wert für diese outerList1
      let highscore = -1;
      let highscoreKey = null;
      let matchesCount = 0;

      for (const outerListKey in outerListMatches) {
        if (outerListMatches.hasOwnProperty(outerListKey)) {
          const matches = outerListMatches[outerListKey];
          matchesCount += matches;
          if (matches > highscore) {
            highscore = matches;
            highscoreKey = outerListKey;
          }
        }
      }

      // Überprüfen, ob dies die beste outerList1 ist
      if (
        highscore > bestHighscore ||
        (highscore === bestHighscore && matchesCount < bestMatchesCount)
      ) {
        bestOuterList = key;
        bestHighscore = highscore;
        bestMatchesCount = matchesCount;
        bestHighscoreKey = highscoreKey;
      }
    }
  }
  return { [bestOuterList]: bestHighscoreKey };
}

// Instruktion vorbereiten
function extractSublistByKeydia(listOfLists, keyValue) {
  const [key, value] = Object.entries(keyValue)[0]; // Extrahiere den Key und den Value

  // Suche nach der Unterliste, deren Indexposition 0 dem Value-Wert entspricht
  const sublist = listOfLists.find((sublist) => sublist[0] === value);

  // Rückgabe des Key-Value-Paares mit unverändertem Key und gefundenem Value
  return { [key]: sublist };
}

//Instruktion ausführen

function insertValueIntoSublistAndRemovedia(list, keyValue, otherList) {
  const [key, value] = Object.entries(keyValue)[0]; // Extrahiere den Key und den Value

  if (Array.isArray(list[key])) {
    // Füge den Value-Wert am Ende der Unterliste hinzu
    list[key].push(value);
  }

  if (Array.isArray(otherList)) {
    // Entferne den Value-Wert aus der anderen Liste, falls vorhanden
    const indexToRemove = otherList.indexOf(value);
    if (indexToRemove !== -1) {
      otherList.splice(indexToRemove, 1);
    }
  }

  return list;
}

//Halbmatches suchen

function countHalbMatchesdia(liste1, liste2, maxSize) {
  const matchesByOuterList = {};
  let maxGroesse = maxSize;
  for (let i = 0; i < liste1.length; i++) {
    const outerList1 = liste1[i];
    
      if (outerList1.length < maxGroesse) {
        // Erstelle ein Objekt für die aktuelle outerList1
        const matchesInOuterList = {};

        for (let j = 0; j < outerList1.length; j++) {
          const subList1 = outerList1[j];
          const element1 = subList1[0];

          for (const subList2 of liste2) {
            const element2 = subList2[0];

            // Bedingung 1 prüfen (Bedingung 2 wird entfernt)
            if (element1 !== subList2.find((item, index) => index !== 0 && item === element1)) {
              // Erhöhe die Zählung für element2 in matchesInOuterList
              if (matchesInOuterList[element2]) {
                matchesInOuterList[element2]++;
              } else {
                matchesInOuterList[element2] = 1;
              }
            }
          }
        }

        // Füge matchesInOuterList mit dem Index als Schlüssel hinzu
        matchesByOuterList[i] = matchesInOuterList;
      }
    }
  return matchesByOuterList;
}

//Viertelmatches finden

function countViertelMatchesdia(liste1, liste2, maxSize) {
  const matchesByOuterList = {};
  let maxGroesse = maxSize;
  for (let i = 0; i < liste1.length; i++) {
    const outerList1 = liste1[i];
    
      if (outerList1.length < maxGroesse) {
        // Erstelle ein Objekt für die aktuelle outerList1
        const matchesInOuterList = {};

        for (let j = 0; j < outerList1.length; j++) {
          const subList1 = outerList1[j];
          const element2 = subList1[0]; // Nur element2 verwenden

          for (const subList2 of liste2) {
            const element1 = subList2[0]; // Nur element1 verwenden

            // Bedingung 2 prüfen
            if (element2 !== subList2.find((item, index) => index !== 0 && item === element2)) {
              // Erhöhe die Zählung für element1 in matchesInOuterList
              if (matchesInOuterList[element1]) {
                matchesInOuterList[element1]++;
              } else {
                matchesInOuterList[element1] = 1;
              }
            }
          }
        }

        // Füge matchesInOuterList mit dem Index als Schlüssel hinzu
        matchesByOuterList[i] = matchesInOuterList;
      }
    }
  return matchesByOuterList;
}

// letzte Elemente mit Matches ausgeben

function findElementWithMostMatchesdia(liste) {
  let elementWithMostMatches = null;
  let mostMatches = -Infinity; // Anfangswert auf -Infinity setzen

  for (const element of liste) {
    const matchesCount = countMatchesForElement(element, liste);

    if (matchesCount !== null && matchesCount > mostMatches) { // Vergleich auf "größer" ändern und prüfen, ob matchesCount nicht null ist
      mostMatches = matchesCount;
      elementWithMostMatches = element;
    }
  }
  return elementWithMostMatches;
}

function countMatchesForElementdia(element, liste) {
  let matchesCount = 0;

  for (const otherElement of liste) {
    if (
        element[0] !== otherElement.find((item, index) => index !== 0 && item === element[0]) &&
        otherElement[0] !== element.find((item, index) => index !== 0 && item === otherElement[0])
      ) {
      matchesCount++;
    }
  }
  return matchesCount !== 0 ? matchesCount : null; // Wenn keine Übereinstimmungen gefunden wurden, gibt null zurück
}

// Letztes Element mit Halbmatches ausgeben

function findElementWithMostHalbMatchesdia(liste) {
  let elementWithMostMatches = null;
  let mostMatches = -Infinity; // Anfangswert auf -Infinity setzen

  for (const element of liste) {
    const matchesCount = countHalbMatchesForElement(element, liste);

    if (matchesCount > mostMatches) { // Vergleich auf "größer" ändern
      mostMatches = matchesCount;
      elementWithMostMatches = element;
    }
  }
  return elementWithMostMatches;
}

function countHalbMatchesForElementdia(element, liste) {
  let matchesCount = 0;

  for (const otherElement of liste) {
    if (
        element[0] !== otherElement.find((item, index) => index !== 0 && item === element[0])     
      ) {
      matchesCount++;
    }
  }
  return matchesCount;
}

// Letzte Elemente einsetzen

function insertElementIntoSmallestSublistAndRemovedia(element, listOfLists, anotherList) {
  let smallestSublist = listOfLists[0];
  let smallestSize = smallestSublist.length;

  for (let i = 1; i < listOfLists.length; i++) {
    const currentSublist = listOfLists[i];
    const currentSize = currentSublist.length;

    if (currentSize < smallestSize) {
      smallestSublist = currentSublist;
      smallestSize = currentSize;
    }
  }

  smallestSublist.push(element);

  // Entferne das Element aus der anderen Liste
  const indexInAnotherList = anotherList.indexOf(element);
  if (indexInAnotherList !== -1) {
    anotherList.splice(indexInAnotherList, 1);
  }
}

// Final Aufteilungen bewerten

function lastTotalCountdia(pushList) {
    let halbMatchcount = 0;
    for (const sublist of pushList) {
        
        for (let i = 0; i < sublist.length; i++) {
            const element1 = sublist[i];
            
            for (let j = 0; j < sublist.length; j++) {
                
                if (i !== j) {
                    const element2 = sublist[j];
                    
                    if (element2[0] !== element1.find((item, index) => index !== 0 && item === element2[0])) {
                        halbMatchcount++;
                        
                    }
                }
            }
        }
    }
    return halbMatchcount;
}

// Programmablauf

function dia (susListe,g) {

    let finalTotalScore = 0;
    let finalPush;

for (let i = 1; i < 5000; i++){


const shuffledList = shuffleArraydia(susListe);

const gruppenGroessen = groupSizesdia(shuffledList, g);  //   Objekt mit maximaler Gruppengroesse erstellen 

const nonMatchingElements = removeNonMatchingElementsdia(shuffledList);  // Elemente fürn die erste Reihe

processAndMoveMatchingElementsdia(nonMatchingElements, shuffledList, g); // falls erste Reihe größer als g

findMostFrequentMatchingElementdia(nonMatchingElements, shuffledList, g); // falls g kleiner

findMostFrequentHalbMatchingElementdia(nonMatchingElements, shuffledList, g);

addElementsToListdia(nonMatchingElements, shuffledList,g)

const firstrow = elementsToListOfListsdia(nonMatchingElements); // Erste Reihe von Elementen einsetzen

let push;

while (true) {
let maxGruppe = groupCountdia (firstrow, gruppenGroessen);
let counts = countMatchesdia(firstrow, shuffledList, maxGruppe);

let isEmpty = Object.keys(counts).every(key => Object.keys(counts[key]).length === 0);

if (isEmpty) {
    maxGruppe = groupCountdia (firstrow, gruppenGroessen);
    counts = countHalbMatchesdia (firstrow, shuffledList, maxGruppe);
    isEmpty = Object.keys(counts).every(key => Object.keys(counts[key]).length === 0);
  }

if (isEmpty) {
    maxGruppe = groupCountdia (firstrow, gruppenGroessen);
    counts = countViertelMatchesdia (firstrow, shuffledList);
    isEmpty = Object.keys(counts).every(key => Object.keys(counts[key]).length === 0);
  }

if (isEmpty) {
    break;
}

const bestGroup = findOuterListWithMaxMatchesdia(counts);

const instruction = extractSublistByKeydia(shuffledList, bestGroup);

push = insertValueIntoSublistAndRemovedia(firstrow, instruction, shuffledList);
}

while (shuffledList.length > 0) {

let lastElement = findElementWithMostMatchesdia (shuffledList);

if (lastElement != null){
  insertElementIntoSmallestSublistAndRemovedia (lastElement, firstrow, shuffledList);
  
  }
else {
  lastElement = findElementWithMostHalbMatchesdia(shuffledList);
  insertElementIntoSmallestSublistAndRemovedia (lastElement, firstrow, shuffledList);
}
}

let finalTotalCount = lastTotalCountdia(push);

if (finalTotalCount > finalTotalScore) {
        
        finalTotalScore = finalTotalCount;
        finalPush = push
    }
}

return finalPush;
}
/*
let susListe = {
    "Dominique Adolphs": ["Sebastian Kreutzer", "Leonid Brehm", "Lukas Kubanke", "Henrik Werner"],
    "Leonid Brehm": ["Lukas Kubanke", "Dominique Adolphs", "Sebastian Kreutzer", "Tom Rohloff"],
    "Philip Bressin": ["Sebastian Kreutzer", "Celine Scharniel", "Tom Görner", "Florian Weinel"],
    "Tom Görner": ["Sebastian Kreutzer", "Philip Bressin", "Leonid Brehm", "Celine Scharniel"],
    "Konstantin Kelle": ["Luca Parisic", "Moritz Röhmild", "Leonid Brehm", "Tom Rohloff"],
    "Colin Kirmse": ["Marvin Zehentner", "Tom Görner", "Philip Bressin", "Wotan Wreden"],
    "Linus Kramer": ["Luka Scnell", "Isabelle Rothe", "Tom Görner", "Leonid Brehm"],
    "Sebastian Kreutzer": ["Dominique Adolphs", "Leonid Brehm", "Philip Bressin", "Tom Görner"],
    "Luca Parisic": ["Konstantin Kelle", "Moritz Röhmild", "Leonid Brehm", "Tom Rohloff"],
    "Tom Rohloff": ["Henrik Werner", "Leonid Brehm", "Moritz Röhmild", "Dominique Adolphs"],
    "Ferdinand Rohmer": ["Marvin Zehentner", "Maximilian Zaske", "Tom Görner", "Celine Scharniel"],
    "Moritz Röhmild": ["Sebastian Kreutzer", "Celine Scharniel", "Leonid Brehm", "Luka scnell"],
    "Isabelle Rothe": ["Colin Kirmse", "Tom Görner", "Ferdinand Rohmer", "Celine Scharniel"],
    "Celine Scharniel": ["Maximilian Zaske", "Philip Bressin", "Leonid Brehm", "Tom Görner"],
    "Luka Scnell": ["Linus Kramer", "Tom Görner", "Sebastian Kreutzer", "Leonid Brehm"],
    "Florian Weinel": ["Tom Görner", "Philip Bressin", "Sebastian Kreutzer", "Leonid Brehm"],
    "Henrik Werner": ["Sebastian Kreutzer", "Dominique Adolphs", "Leonid Brehm", "Tom Rohloff"],
    "Wotan Wreden": ["Florian Weinel", "Marvin Zehentner", "Tom Görner", "Colin Kirmse"],
    "Maximilian Zaske": ["Celine Scharniel", "Ferdinand Rohmer", "Tom Rohloff", "Sebastian Kreutzer"],
    "Marvin Zehentner": ["Colin Kirmse", "Philip Bressin", "Florian Weinel", "Ferdinand Rohmer"],
    "Lukas Kubanke": ["Leonid Brehm", "Dominique Adolphs", "Henrik Werner", "Tom Rohloff"]
  }
  
  const g = 6; // Anzahl der auszuwählenden Elemente - wird vom Benutzer bestimmt

susListe = Object.entries(susListe).map(([key, value]) => [key, ...value]);
*/





