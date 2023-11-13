function diff (gruppenAnzahl, kopieText1, kopieText2) {

    let resultList = [];
    
    function createListWithEmptyLists(n) {
    for (let i = 0; i < n; i++) {
        resultList.push([]);
    }
    return resultList;
    }
    
    const zeilen1 = kopieText1.split('\n');
    console.log(zeilen1);
    const zeilen2 = kopieText2.split('\n');
    const spaltenArray = [];
    
    if (isNaN(gruppenAnzahl) || gruppenAnzahl < 1) {
        alert('Bitte geben Sie eine gültige Anzahl von Gruppen (ganze Zahl größer als 0) ein.');
        return; // Beenden Sie die Verarbeitung, wenn die Eingabe ungültig ist.
    }
    
    zeilen1.forEach((zeile, index) => {
        spaltenArray.push({ Spalte1: zeile.trim(), Spalte2: zeilen2[index] ? zeilen2[index].trim() : '' });
    });
    
    createListWithEmptyLists(gruppenAnzahl);
    
    let susListe = spaltenArray.slice();
        
    let gruppenListe = resultList.slice();
    
    // Heterogruppen:
    
    let heterogruppenListe = gruppenListe.slice();
    
    let anzahlGruppen = heterogruppenListe.length;
    
    let heterosusListe = susListe.slice();
    
    heterosusListe.sort((a, b) => a.Spalte2 - b.Spalte2);
    
    while (heterosusListe.length > 0) {
        for (let i = 0; i < anzahlGruppen; i++) {
            if (heterosusListe.length > 0){
                heterogruppenListe[i].push(heterosusListe[0]);
                heterosusListe.splice(0, 1);                   
                }  
        };
        heterosusListe.sort((a, b) => b.Spalte2 - a.Spalte2);
    };
    
    const heterogruppenUl = document.getElementById('heterogruppenListe');
    heterogruppenUl.innerHTML = '';
    
    heterogruppenListe.forEach((gruppe, index) => {
        const gruppenLi = document.createElement('li');
        gruppenLi.textContent = `Gruppe ${index + 1}: ${gruppe.map(item => item.Spalte1).join(', ')}`;
        heterogruppenUl.appendChild(gruppenLi);
    });
    
    // Homogruppen:
    
    let homosusListe = susListe.slice();
    
    let homogruppenListe = gruppenListe.slice();
    
    let mitgliederZahl = homosusListe.length / anzahlGruppen;
    
    homosusListe.sort((a, b) => b.Spalte2 - a.Spalte2);
    
    while (homosusListe.length > 0) {
        for (let i=0; i < anzahlGruppen; i++) {
            let restsus = Math.ceil(homosusListe.length / (anzahlGruppen - i));
            homogruppenListe[i] = homosusListe.slice(0, restsus);
            homosusListe.splice(0, restsus);
        };
    };
    console.log(homogruppenListe);
    const homogruppenUl = document.getElementById('homogruppenListe');
    homogruppenUl.innerHTML = '';
    
    homogruppenListe.forEach((gruppe, index) => {
        const gruppenLi = document.createElement('li');
        gruppenLi.textContent = `Gruppe ${index + 1}: ${gruppe.map(item => item.Spalte1).join(', ')}`;
        homogruppenUl.appendChild(gruppenLi);
                });
            };

function createSublists(inputList) {
    const result = [];

    inputList.forEach(item => {
        const parts = item.split('\t'); // Zerlege die Zeichenkette an den \t
        result.push(parts); // Füge die Teile als Unterliste hinzu
    });

    return result;
}

function mergeLists(list1, list2) {
    // Überprüfen, ob die Listen die gleiche Länge haben
    if (list1.length !== list2.length) {
        return "Die Listen haben unterschiedliche Längen.";
    }

    // Neue Liste erstellen, um das Ergebnis zu speichern
    const mergedList = [];

    // Schleife, um die Elemente von list1 in list2 einzufügen
    for (let i = 0; i < list1.length; i++) {
        const sublist = list2[i].slice(); // Kopie der Unterliste
        sublist.unshift(list1[i]); // Element von list1 hinzufügen
        mergedList.push(sublist); // Zur Ergebnisliste hinzufügen
    }

    return mergedList;
}