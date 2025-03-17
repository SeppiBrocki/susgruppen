// Functions for Homogeneous Grouping


// Function to sort keys by their corresponding value
export function sortKeysByValue(obj) {
  return Object.entries(obj)         // Creates an array of [key, value] pairs
    .sort((a, b) => a[1] - b[1])        // Sorts in ascending order by the value
    .map(entry => entry[0]);           // Returns only the keys
}

// Function to sort an array of students based on the value at index 1.
export function sortByIndex1(arr) {
  let sortedArr = [...arr];
  return sortedArr.sort((a, b) => a[1] - b[1]);
}

// Function to fill the groups with students.
export function stackHomo(susRandom, groupGroe) {
  let localSusRandom = [...susRandom];
  let finalhomo = [];

  for (let i = 0; i < groupGroe.length; i++) {
    finalhomo.push([]);
    while (finalhomo[i].length < groupGroe[i]) {
      let element = localSusRandom.shift();
      // If the element is an array and contains at least one item,
      // add only the first element (e.g., the name) to the group.
      if (Array.isArray(element) && element.length > 0) {
        finalhomo[i].push(element[0]);
      } else {
        // If the element is not an array, add it directly.
        finalhomo[i].push(element);
      }
    }
  }
  return finalhomo;
}