// Functions to stack students opposing to their preferences



// Function to check matching elements.
export function isMutualMatch(list1, list2) {
  const first1 = list1[0]; // first element in list1
  const first2 = list2[0]; // first element in list2

  // Check if first1 appears in list2 (but NOT at position 0)
  let matchInList2 = list2.some((item, index) => index !== 0 && item === first1);

  // Check if first2 appears in list1 (but NOT at position 0)
  let matchInList1 = list1.some((item, index) => index !== 0 && item === first2);

  return matchInList2 && matchInList1;
}

// Function to find an array with matching students.
export function firstMatchingElements(susRandom, isMutualMatch) {
  let firstRow = [susRandom[0]]; // Start with the first element

  for (let i = 1; i < susRandom.length; i++) {
    let isMatching = true; // Initially assume that the element matches

    // Check the current element against all elements in firstRow.
    for (const element of firstRow) {
      if (!isMutualMatch(element, susRandom[i])) {
        isMatching = false; // If one comparison returns false, the element does not match.
        break; // Break immediately since one false is enough.
      }
    }

    // If the element matches with ALL, add it to the list.
    if (isMatching) {
      firstRow.push(susRandom[i]);
    }
  }

  return firstRow;
}

// Function to find students to remove if the first row is too big.
export function getTopMatchesRowBig(groupNo, firstRow) {
  let d = groupNo - firstRow.length;
  let matchCounts = []; // Stores the number of matches for each element.

  for (let i = 0; i < firstRow.length; i++) {
    let element1 = firstRow[i];
    let count = 0; // Counter for matches of this element.

    for (let j = 0; j < firstRow.length; j++) {
      if (i !== j) { // Do not compare with itself.
        let element2 = firstRow[j];

        // Check if element1 appears in element2 (but NOT at the first position) and vice versa.
        let matchInElement2 = element2.some((item, index) => index !== 0 && item === element1[0]);
        let matchInElement1 = element1.some((item, index) => index !== 0 && item === element2[0]);

        if (matchInElement1 && matchInElement2) {
          count++; // Match found, increment counter.
        }
      }
    }

    matchCounts.push({ element: element1, score: count }); // Store the element with its score.
  }

  // Sort by number of matches in descending order.
  matchCounts.sort((a, b) => b.score - a.score);
  return matchCounts.slice(0, d).map(item => item.element); // Return only the top elements.
}

// Function to find alternative students if the first row is too small.
export function getWorstMatchesSmall(susRandom, groupNo, firstRow) {
  // d: Number of additional candidates needed.
  let d = groupNo - firstRow.length;
  let matchCounts = []; // Stores the computed score for each candidate.

  for (let i = 0; i < susRandom.length; i++) {
    let element1 = susRandom[i];
    let count = 0; // Counter for the score of this candidate.

    for (let j = 0; j < susRandom.length; j++) {
      if (i !== j) { // Do not compare with itself.
        let element2 = susRandom[j];

        // Check if the first element of element1 appears anywhere in element2 (except at index 0).
        let matchInElement2 = element2.some((item, index) => index !== 0 && item === element1[0]);
        // Check if the first element of element2 appears anywhere in element1 (except at index 0).
        let matchInElement1 = element1.some((item, index) => index !== 0 && item === element2[0]);

        if (!matchInElement1 && !matchInElement2) {
          count += 2;  // Both conditions not met → increase score by 2.
        } else if (!matchInElement1 || !matchInElement2) {
          count += 1;  // Only one condition not met → increase score by 1.
        }
      }
    }

    matchCounts.push({ element: element1, score: count });
  }

  // Sort the candidates in descending order by score (highest scores first).
  matchCounts.sort((a, b) => b.score - a.score);
  
  // Return the top d candidates (only the elements, without score).
  return matchCounts.slice(0, d).map(item => item.element);
}

// Function to remove excessive students from the first row.
function removeAccesiveElements(firstRow, bottomMatches) {
  for (let i = firstRow.length - 1; i >= 0; i--) {
    if (bottomMatches.includes(firstRow[i])) {
      firstRow.splice(i, 1);
    }
  }
}

// Function to remove elements of the first row from susRandom.
function removeCommonElements(susRandom, firstRow) {
  for (let i = susRandom.length - 1; i >= 0; i--) {
    if (firstRow.includes(susRandom[i])) {
      susRandom.splice(i, 1);
    }
  }
}

// Function to finish the first row for the "dia" method.
export function finishFirstRowDia(firstRow, groupNo, susRandom) {
  if (firstRow.length > groupNo) {
    let bottomMatches = getTopMatchesRowBig(groupNo, firstRow);
    removeAccesiveElements(firstRow, bottomMatches);
  }

  removeCommonElements(susRandom, firstRow);

  if (firstRow.length < groupNo) {
    let topMatches = getWorstMatchesSmall(susRandom, groupNo, firstRow);
    firstRow.push(...topMatches);
    removeCommonElements(susRandom, topMatches);
  }
  return firstRow.map(sublist => [sublist]);
}

// Function to find the worst matching student after the first row is finished.
export function getOverallWorstMatch(firstRow, susRandom, groupCount, gruppenGroe) {
  let globalWorst = { score: -Infinity, element: null, group: null };
  let maxSize = groupCount(firstRow, gruppenGroe);

  // Iterate over all groups in firstRow.
  for (let j = 0; j < firstRow.length; j++) {
    let group = firstRow[j];

    // Only consider groups whose length is less than maxSize.
    if (group.length >= maxSize) continue;

    // For each element in susRandom...
    for (let i = 0; i < susRandom.length; i++) {
      let element1 = susRandom[i];
      let count = 0; // Counter for the score of this element in the current group.

      // Compare element1 with all elements in the current group.
      for (let k = 0; k < group.length; k++) {
        let element2 = group[k];

        // matchInElement2: true if the first element of element1
        // appears anywhere in element2 (except at index 0).
        let matchInElement2 = element2.some((item, index) => index !== 0 && item === element1[0]);
        // matchInElement1: true if the first element of element2
        // appears anywhere in element1 (except at index 0).
        let matchInElement1 = element1.some((item, index) => index !== 0 && item === element2[0]);

        if (!matchInElement1) count++;
        if (!matchInElement2) count++;
      }

      // Update the global worst result if this score is higher.
      if (count > globalWorst.score) {
        globalWorst = { score: count, element: element1, group: j };
      }
    }
  }

  return globalWorst;
}

// Function to stack the worst matching student.
export function stackWorstMatchingStudents(globalWorst, firstRow, susRandom) {
  // Add the element to the corresponding group in firstRow.
  firstRow[globalWorst.group].push(globalWorst.element);

  // Find the index of the element in susRandom.
  const index = susRandom.indexOf(globalWorst.element);
  // If the element is found in susRandom, remove it.
  if (index !== -1) {
    susRandom.splice(index, 1);
  }

  return firstRow;
}

// Function to finish stacking for the "dia" method.
export function finishStackingDia(firstRow, susRandom, gruppenGroe, groupCount, getOverallWorstMatch, stackWorstMatchingStudents) {
  // While susRandom still has elements, repeat the process:
  while (susRandom.length > 0) {
    // Determine the global worst element based on the current firstRow and susRandom.
    let globalWorst = getOverallWorstMatch(firstRow, susRandom, groupCount, gruppenGroe);
    // Add the global worst element to the appropriate group in firstRow and remove it from susRandom.
    firstRow = stackWorstMatchingStudents(globalWorst, firstRow, susRandom);
  }
  return firstRow;
}

// Function to count matches for the "dia" method.
export function totalMatchesDia(firstRow) {
  let overallScore = 0;

  // For each group in firstRow:
  for (let g = 0; g < firstRow.length; g++) {
    const group = firstRow[g];

    // Compare each unique pair of sublists in the group.
    for (let i = 0; i < group.length; i++) {
      const sublist1 = group[i];
      for (let j = i + 1; j < group.length; j++) {
        const sublist2 = group[j];
        let score = 0;

        // Check if the first element of sublist1 does NOT appear in sublist2 (except at index 0).
        if (!sublist2.some((item, index) => index !== 0 && item === sublist1[0])) {
          score++;
        }
        // Check if the first element of sublist2 does NOT appear in sublist1 (except at index 0).
        if (!sublist1.some((item, index) => index !== 0 && item === sublist2[0])) {
          score++;
        }

        overallScore += score;
      }
    }
  }

  // Return an object with both overallScore and firstRow.
  return { overallScore, firstRow };
}

// Function to find the top distribution for the "dia" method.
export function topDistributionDia(
  susList,
  shuffleArray,
  firstMatchingElements,
  isMutualMatch,
  finishFirstRowDia,
  groupNo,
  finishStackingDia,
  groupCount,
  getOverallWorstMatch,
  stackWorstMatchingStudents,
  gruppenGroe
) {
  let topSoFar = 0;
  let topFirstRow = null;

  for (let i = 0; i < 1000; i++) {
    let susRandom = shuffleArray([...susList]);
    let firstRow = firstMatchingElements(susRandom, isMutualMatch);
    firstRow = finishFirstRowDia(firstRow, groupNo, susRandom);
    firstRow = finishStackingDia(
      firstRow,
      susRandom,
      gruppenGroe,
      groupCount,
      getOverallWorstMatch,
      stackWorstMatchingStudents
    );
    let topScore = totalMatchesDia(firstRow);

    if (topScore.overallScore > topSoFar) {
      topSoFar = topScore.overallScore;
      topFirstRow = firstRow;
    }
  }
  // Transformation: In each group, replace each subarray with its first element,
  // while keeping the group structure intact.
  if (topFirstRow) {
    topFirstRow = topFirstRow.map(group =>
      group.map(sublist =>
        Array.isArray(sublist) && sublist.length > 0 ? sublist[0] : sublist
      )
    );
  }

  return topFirstRow;
}