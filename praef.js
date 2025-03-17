// Functions to stack students according to their preferences



// Function to convert the object into an array.
export function convertObjectToList(obj) {
  return Object.entries(obj).map(([key, values]) => [key, ...values]);
}

// Function to randomize the array.
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Functions to stack the first member of each group

// Function to check if two students are not matching.
export function isNotMutualMatch(list1, list2) {
  const first1 = list1[0]; // first element in list1
  const first2 = list2[0]; // first element in list2

  // Check if first1 appears in list2 (but NOT at position 0)
  let matchInList2 = list2.some((item, index) => index !== 0 && item === first1);

  // Check if first2 appears in list1 (but NOT at position 0)
  let matchInList1 = list1.some((item, index) => index !== 0 && item === first2);

  return !matchInList2 && !matchInList1;
}

// Function to find an array with non-matching students.
export function firstRowNonMatchingElements(susRandom, isNotMutualMatch) {
  let firstRow = [susRandom[0]]; // Start with the first element

  for (let i = 1; i < susRandom.length; i++) {
    let isNonMatching = true; // Assume initially that the element does NOT match

    // Check the current element against all elements in firstRow.
    for (const element of firstRow) {
      if (!isNotMutualMatch(element, susRandom[i])) {
        isNonMatching = false; // If one comparison is false, the element does match.
        break; // Break immediately, as one false is enough.
      }
    }

    // If the element does not match with ALL, add it to the list.
    if (isNonMatching) {
      firstRow.push(susRandom[i]);
    }
  }

  return firstRow;
}

// Function to find students to remove if the first row is too big.
export function getBottomMatches(firstRow, groupNo, susRandom) {
  // Determine how many elements should be removed from firstRow,
  // so that only groupNo remain (d is the number to remove)
  let d = firstRow.length - groupNo;

  let matchCounts = []; // Store the match counts for each element in firstRow

  // For each element in firstRow:
  for (let i = 0; i < firstRow.length; i++) {
    let element = firstRow[i];
    let count = 0; // Counter for the matches of this element

    // Compare this element with every element in susRandom.
    for (let j = 0; j < susRandom.length; j++) {
      let compareElement = susRandom[j];

      // Check if the first element of 'element' appears anywhere in compareElement (except at index 0)
      let matchInCompare = compareElement.some(
        (item, index) => index !== 0 && item === element[0]
      );
      // Conversely, check if the first element of compareElement appears anywhere in 'element' (except at index 0)
      let matchInElement = element.some(
        (item, index) => index !== 0 && item === compareElement[0]
      );

      if (matchInCompare && matchInElement) {
        count++; // If both conditions are met, count this as a match.
      }
    }
    // Save the element from firstRow with its corresponding score.
    matchCounts.push({ element: element, score: count });
  }

  // Sort the results in ascending order by the number of matches.
  matchCounts.sort((a, b) => a.score - b.score);
  // Return the bottom d elements (those with the fewest matches).
  return matchCounts.slice(0, d).map((item) => item.element);
}

// Function to find alternative students if the first row is too small.
export function getTopMatches(susRandom, groupNo, firstRow) {
  // d: Number of additional candidates needed.
  let d = groupNo - firstRow.length;
  let matchCounts = []; // Store the computed score for each candidate.

  for (let i = 0; i < susRandom.length; i++) {
    let element1 = susRandom[i];
    let count = 0; // Counter for the score of this candidate.

    for (let j = 0; j < susRandom.length; j++) {
      if (i !== j) { // Do not compare with itself.
        let element2 = susRandom[j];

        // Check if the first element of element1 appears anywhere in element2 (except at index 0).
        let matchInElement2 = element2.some(
          (item, index) => index !== 0 && item === element1[0]
        );
        // Check if the first element of element2 appears anywhere in element1 (except at index 0).
        let matchInElement1 = element1.some(
          (item, index) => index !== 0 && item === element2[0]
        );

        if (matchInElement1 && matchInElement2) {
          count += 2;  // Both conditions met → increase score by 2.
        } else if (matchInElement1 || matchInElement2) {
          count += 1;  // Only one condition met → increase score by 1.
        }
      }
    }

    matchCounts.push({ element: element1, score: count });
  }

  // Sort the candidates in descending order by score (highest scores first).
  matchCounts.sort((a, b) => b.score - a.score);

  // Return the top d candidates (only the elements, without the score).
  return matchCounts.slice(0, d).map((item) => item.element);
}

// Function to remove excessive students from the first row.
export function removeAccesiveElements(firstRow, bottomMatches) {
  for (let i = firstRow.length - 1; i >= 0; i--) {
    if (bottomMatches.includes(firstRow[i])) {
      firstRow.splice(i, 1);
    }
  }
}

// Function to remove elements of the first row from susRandom.
export function removeCommonElements(susRandom, firstRow) {
  for (let i = susRandom.length - 1; i >= 0; i--) {
    if (firstRow.includes(susRandom[i])) {
      susRandom.splice(i, 1);
    }
  }
}

// Function to finish the first row.
export function finishFirstRow(firstRow, groupNo, susRandom) {
  if (firstRow.length > groupNo) {
    let bottomMatches = getBottomMatches(firstRow, groupNo, susRandom);
    removeAccesiveElements(firstRow, bottomMatches);
  }

  removeCommonElements(susRandom, firstRow);

  if (firstRow.length < groupNo) {
    let topMatches = getTopMatches(susRandom, groupNo, firstRow);
    firstRow.push(...topMatches);
    removeCommonElements(susRandom, topMatches);
  }
  return firstRow.map((sublist) => [sublist]);
}

// Function to get an array with group sizes.
export function groupSizes(susRandom, groupNo) {
  const gruppenGroe = [];
  let divident = susRandom.length;
  for (let i = groupNo; i > 0; i--) {
    let toPush = Math.ceil(divident / i);
    gruppenGroe.push(toPush);
    divident = divident - toPush;
  }
  let maxValue = gruppenGroe[0]; // Assume the first element is the largest.
  let count = 1; // Counter for the first occurrence of the maximum element.

  for (let i = 1; i < gruppenGroe.length; i++) {
    if (gruppenGroe[i] === maxValue) {
      // If the same maximum is found again, increment the counter.
      count++;
    }
  }
  return { maxValue, count };
}

// Function to determine if there is space in any group.
export function groupCount(firstRow, gruppenGroe) {
  let maxObject = gruppenGroe;
  let { maxValue: maxSize, count: maxGroupCount } = maxObject;
  let maxGroups = 0;

  for (const group of firstRow) {
    if (group.length === maxSize) {
      maxGroups++;
    }
    if (maxGroups === maxGroupCount) {
      maxSize--;
      return maxSize;
    }
  }
  return maxSize;
}

// Function to find the best matching student after the first row is finished.
export function getOverallBestMatch(firstRow, susRandom, groupCount, gruppenGroe) {
  let globalBest = { score: -Infinity, element: null, group: null };
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
        let matchInElement2 = element2.some(
          (item, index) => index !== 0 && item === element1[0]
        );
        // matchInElement1: true if the first element of element2
        // appears anywhere in element1 (except at index 0).
        let matchInElement1 = element1.some(
          (item, index) => index !== 0 && item === element2[0]
        );

        if (matchInElement1) count++;
        if (matchInElement2) count++;
      }

      // Update the global best result if this score is higher.
      if (count > globalBest.score) {
        globalBest = { score: count, element: element1, group: j };
      }
    }
  }

  return globalBest;
}

// Function to stack best matching students.
export function stackBestMatchingStudents(globalBest, firstRow, susRandom) {
  // Add the element to the corresponding group in firstRow.
  firstRow[globalBest.group].push(globalBest.element);

  // Find the index of the element in susRandom.
  const index = susRandom.indexOf(globalBest.element);
  // Check if the element is found in susRandom (index !== -1)
  if (index !== -1) {
    susRandom.splice(index, 1);
  }

  return firstRow;
}

// Function to finish an attempt to stack all students.
export function finishStacking(firstRow, susRandom, groupCount, getOverallBestMatch, stackBestMatchingStudents, gruppenGroe) {
  // While susRandom still has elements, repeat the process:
  while (susRandom.length > 0) {
    // Determine the global best element based on the current firstRow and susRandom.
    let globalBest = getOverallBestMatch(firstRow, susRandom, groupCount, gruppenGroe);
    // Add the global best element to the appropriate group in firstRow and remove it from susRandom.
    firstRow = stackBestMatchingStudents(globalBest, firstRow, susRandom);
  }
  return firstRow;
}

// Function to count matches.
export function totalMatches(firstRow) {
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

        // Check if the first element of sublist1 appears in sublist2 (except at index 0).
        if (sublist2.some((item, index) => index !== 0 && item === sublist1[0])) {
          score++;
        }
        // Check if the first element of sublist2 appears in sublist1 (except at index 0).
        if (sublist1.some((item, index) => index !== 0 && item === sublist2[0])) {
          score++;
        }

        overallScore += score;
      }
    }
  }

  // Return an object with both overallScore and firstRow.
  return { overallScore, firstRow };
}

// Function to find the top distribution.
export function topDistribution(
  susList,
  shuffleArray,
  firstRowNonMatchingElements,
  isNotMutualMatch,
  finishFirstRow,
  groupNo,
  finishStacking,
  groupCount,
  getOverallBestMatch,
  stackBestMatchingStudents,
  gruppenGroe
) {
  let topSoFar = 0;
  let topFirstRow = null;

  for (let i = 0; i < 1000; i++) {
    let susRandom = shuffleArray([...susList]);
    let firstRow = firstRowNonMatchingElements(susRandom, isNotMutualMatch);
    firstRow = finishFirstRow(firstRow, groupNo, susRandom);
    firstRow = finishStacking(
      firstRow,
      susRandom,
      groupCount,
      getOverallBestMatch,
      stackBestMatchingStudents,
      gruppenGroe
    );
    let topScore = totalMatches(firstRow);

    if (topScore.overallScore > topSoFar) {
      topSoFar = topScore.overallScore;
      topFirstRow = firstRow;
    }
  }
  // Transformation: In each group, replace each subarray with its first element,
  // while keeping the group structure intact.
  if (topFirstRow) {
    topFirstRow = topFirstRow.map((group) =>
      group.map((sublist) =>
        Array.isArray(sublist) && sublist.length > 0 ? sublist[0] : sublist
      )
    );
  }

  return topFirstRow;
}