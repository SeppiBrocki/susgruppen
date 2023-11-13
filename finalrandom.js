function shuffleList(inputList) {
    // Kopie der Eingabearray erstellen, um das Original nicht zu verändern
    let shuffledList = [...inputList];
  
    // Fisher-Yates (Knuth) Algorithmus für das Mischen der Liste
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
  
    return shuffledList;
  }
      
  function createListWithEmptyLists(n) {
  let resultList = [];
      for (let i = 0; i < n; i++) {
      resultList.push([]);
  }
  return resultList;
  }
  
  
  
  
  function pushRandomList (randomList, list, g) {
  let max = Math.floor (randomList.length / g);
  let copyRandomList = [...randomList];
      for (let i=0; i<copyRandomList.length; i++) {
          for (let j=0; j<list.length; j++){
              if (list[j].length < max){
                  list[j].push(copyRandomList[i])
                  copyRandomList.splice(i, 1);
                  i--;
                  break;
              }
          }
      }
      while (copyRandomList.length>0){
          for (let k=0; k<copyRandomList.length; k++){
              for (let l=0; l<list.length; l++){
                  if (list[l].length<max+1){
                      list[l].push(copyRandomList[k]);
                      copyRandomList.splice(k);
                      k--;
                      break;
                  }
              }
          }
      }
      return list;
  }
  
  function random (susListe,g) {
  
  const randomList = shuffleList(susListe);
  
  console.log(randomList);
  
  const list = createListWithEmptyLists(g);
  
  console.log(list);
  
  const finalRandomList = pushRandomList (randomList, list, g);
  
  return finalRandomList;
  }