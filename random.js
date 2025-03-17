// Functions to stack students randomly



// function to get groups sizes
export function groupSizesRandom (susRandom, groupNo) {
    const gruppenGroe = [];
    let divident = susRandom.length;
    for (let i = groupNo; i > 0; i-- ) {
      let toPush = (Math.ceil(divident / i));
      gruppenGroe.push(toPush);
      divident = divident - (toPush);
    }
    
    return gruppenGroe
    }

// function to fill the groups with students randomly
export function stackRandomStudents (susRandom, groupGroe) {
    let localSusRandom = [...susRandom];
    let finalrandom = []
    for (let i = 0 ; i < groupGroe.length; i++){
        finalrandom.push([])
        while (finalrandom[i].length < groupGroe[i]) {
            finalrandom[i].push(localSusRandom.shift());
          }
    } 
        if (finalrandom) {
            finalrandom = finalrandom.map(group =>
              group.map(sublist =>
                (Array.isArray(sublist) && sublist.length > 0) ? sublist[0] : sublist
              )
            );
          }
    return finalrandom
}