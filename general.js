

document.getElementById('umwandelnButton').addEventListener('click', function () {
    const gruppenAnzahl = parseInt(document.getElementById('gruppenAnzahl').value);
    const kopieText1 = document.getElementById('tabellenKopie1').value.trim();
    const kopieText2 = document.getElementById('tabellenKopie2').value.trim();
    diff (gruppenAnzahl, kopieText1, kopieText2);
    
    const g = parseInt(document.getElementById('gruppenAnzahl').value);
    console.log(g);
    const zeilen1a = kopieText1.split('\n');
    const zeilen1b = kopieText1.split('\n');
    console.log(zeilen1a);
    const kopieText3 = document.getElementById('tabellenKopie3').value.trim();
    const zeilen3 = kopieText3.split('\n');
    console.log(zeilen3)
    const praefListe = createSublists (zeilen3);
    console.log(praefListe);
    let susListe = mergeLists (zeilen1a, praefListe);
    console.log (susListe)
    const finalpraef = praef (susListe,g);
    console.log(finalpraef);
    const finaldia = dia (susListe,g);
    console.log (finaldia);
    const praeffinal = prepPraefDia (finalpraef);
    console.log(praeffinal);
    const diafinal = prepPraefDia(finaldia);
    console.log(diafinal);
    const randomFinal = random (zeilen1b,g)
    console.log(randomFinal);
    
    const praefgruppenUl = document.getElementById('praefGruppen');
    praefgruppenUl.innerHTML = '';
    praeffinal.forEach((gruppe, index) => {
        const gruppenLi = document.createElement('li');
        gruppenLi.textContent = `Gruppe ${index + 1}: ${gruppe.join(', ')}`;
        praefgruppenUl.appendChild(gruppenLi);
                });

    const diagruppenUl = document.getElementById('diaGruppen');
    diagruppenUl.innerHTML = '';
    diafinal.forEach((gruppe, index) => {
        const gruppenLi = document.createElement('li');
        gruppenLi.textContent = `Gruppe ${index + 1}: ${gruppe.join(', ')}`;
        diagruppenUl.appendChild(gruppenLi);
                });

    const randomgruppenUl = document.getElementById('randomGruppen');
    randomgruppenUl.innerHTML = '';
    randomFinal.forEach((gruppe, index) => {
        const gruppenLi = document.createElement('li');
        gruppenLi.textContent = `Gruppe ${index + 1}: ${gruppe.join(', ')}`;
        randomgruppenUl.appendChild(gruppenLi);
                });

    
    
})


    