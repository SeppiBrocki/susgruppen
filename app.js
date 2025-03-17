import { 
  tableToDictionary, 
  removeNoneAndEmptyFromDictionary, 
  convertStringNumbersInDict, 
  separateIntegersFromObject,
  formatGroups 
} from './processor.js';

import { 
  convertObjectToList, 
  shuffleArray, 
  isNotMutualMatch, 
  firstRowNonMatchingElements,
  finishFirstRow, 
  groupSizes, 
  groupCount, 
  getOverallBestMatch, 
  finishStacking,  
  topDistribution 
} from './praef.js';

import { 
  isMutualMatch, 
  firstMatchingElements, 
  finishFirstRowDia, 
  getOverallWorstMatch, 
  stackWorstMatchingStudents, 
  finishStackingDia, 
  topDistributionDia 
} from './dia.js';

import { groupSizesRandom, stackRandomStudents } from './random.js';
import { sortByIndex1, stackHomo } from './homo.js';
import { stackHetero } from './hetero.js';

// Get DOM elements.
const pasteArea = document.getElementById('pasteArea');
const numberInput = document.getElementById('numberInput');
const saveButton = document.getElementById('saveButton');
const resultsContainer = document.getElementById('resultsContainer');
const copyButton = document.getElementById('copyButton');

// Local variables for storing data.
let savedTable = null;
let savedNumber = null;

// Paste event: The user pastes a table via copy & paste.
pasteArea.addEventListener('paste', (e) => {
  e.preventDefault();

  const clipboardData = e.clipboardData || window.clipboardData;
  const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text');

  const parser = new DOMParser();
  const doc = parser.parseFromString(pastedData, 'text/html');
  const table = doc.querySelector('table');

  if (table) {
    // Instead of a separate container, fill the pasteArea with the table.
    pasteArea.innerHTML = table.outerHTML;
    savedTable = table.outerHTML;

    // Set the max value of the number input to the number of rows in the table.
    const rows = table.querySelectorAll('tr');
    numberInput.max = rows.length;
    numberInput.value = 1;
  } else {
    pasteArea.innerHTML = "<p>No table was found.</p>";
  }
  // The pasteArea is not cleared so that the table remains visible as a preview.
});

// Save button: Saves the table and the currently set number.
saveButton.addEventListener('click', () => {
  savedNumber = Number(numberInput.value);

  // Convert the HTML string of the table into a DOM element.
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = savedTable;
  const tableElement = tempDiv.querySelector('table');

  // Process the table: convert to a dictionary, clean up, convert strings to integers, and separate integers.
  let dict = tableToDictionary(tableElement);
  dict = removeNoneAndEmptyFromDictionary(dict);
  dict = convertStringNumbersInDict(dict);
  const { objWithoutIntegers, objOnlyIntegers } = separateIntegersFromObject(dict);

  // Further processing:
  let randomList = convertObjectToList(objWithoutIntegers);
  randomList = shuffleArray(randomList);
  let groups = groupSizesRandom(randomList, savedNumber);
  let finalRandom = stackRandomStudents(randomList, groups);

  let endResultPraef, endResultDia, finalhomo, finalhetero;

  if (!Object.values(objWithoutIntegers).every(value => Array.isArray(value) && value.length === 0)) {
    let praefList = convertObjectToList(objWithoutIntegers);
    let gruppenGroe = groupSizes(praefList, savedNumber);
    endResultPraef = topDistribution(
      praefList,
      shuffleArray,
      firstRowNonMatchingElements,
      isNotMutualMatch,
      finishFirstRow,
      savedNumber,
      finishStacking,
      groupCount,
      getOverallBestMatch,
      stackWorstMatchingStudents,
      gruppenGroe
    );
    let diaList = convertObjectToList(objWithoutIntegers);
    endResultDia = topDistributionDia(
      diaList,
      shuffleArray,
      firstMatchingElements,
      isMutualMatch,
      finishFirstRowDia,
      savedNumber,
      finishStackingDia,
      groupCount,
      getOverallWorstMatch,
      stackWorstMatchingStudents,
      gruppenGroe
    );
  }
  if (!Object.values(objOnlyIntegers).every(value => Array.isArray(value) && value.length === 0)) {
    let homoList = convertObjectToList(objOnlyIntegers);
    let sorted = sortByIndex1(homoList);
    finalhomo = stackHomo(sorted, groups);
    finalhetero = stackHetero(sorted, savedNumber);
  }

  // Output the results in the UI with grouped labels.
  let output = "";
  if (finalRandom) {
    output += `<h3>Random Grouping</h3>` + formatGroups(finalRandom);
  }
  if (endResultPraef) {
    output += `<h3>Preference-Based Grouping</h3>` + formatGroups(endResultPraef);
  }
  if (endResultDia) {
    output += `<h3>Opposite Preference Grouping</h3>` + formatGroups(endResultDia);
  }
  if (finalhomo) {
    output += `<h3>Homogeneous Grouping</h3>` + formatGroups(finalhomo);
  }
  if (finalhetero) {
    output += `<h3>Heterogeneous Grouping</h3>` + formatGroups(finalhetero);
  }
  resultsContainer.innerHTML = output;
});

// Copy button: Copies the HTML content of the results to the clipboard.
copyButton.addEventListener('click', async () => {
  try {
    const htmlContent = resultsContainer.innerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const clipboardItem = new ClipboardItem({ 'text/html': blob });
    await navigator.clipboard.write([clipboardItem]);
    alert('Results have been copied to the clipboard as a table!');
  } catch (error) {
    console.error('Copying failed:', error);
  }
});