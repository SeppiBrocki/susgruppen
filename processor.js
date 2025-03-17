// Functions that prepare user input data for further processing



export function tableToDictionary(table) {
  const dict = {};
  const rows = table.querySelectorAll('tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td, th');
    if (cells.length > 0) {
      const key = cells[0].textContent.trim();
      const values = [];
      for (let i = 1; i < cells.length; i++) {
        values.push(cells[i].textContent.trim());
      }
      dict[key] = values;
    }
  });
  return dict;
}

export function removeNoneAndEmptyFromDictionary(dict) {
  for (const key in dict) {
    if (Array.isArray(dict[key])) {
      dict[key] = dict[key].filter(item => item !== null && item !== "");
    }
  }
  return dict;
}

export function convertStringNumbersInDict(dict) {
  for (const key in dict) {
    if (Array.isArray(dict[key])) {
      dict[key] = dict[key].map(item => {
        if (typeof item === "string" && /^\s*\d+\s*$/.test(item)) {
          return parseInt(item, 10);
        }
        return item;
      });
    }
  }
  return dict;
}

export function separateIntegersFromObject(obj) {
  const objWithoutIntegers = {};
  const objOnlyIntegers = {};

  const isInteger = x => typeof x === 'number' && Number.isInteger(x);

  for (const key in obj) {
    const arr = obj[key];
    if (Array.isArray(arr)) {
      objWithoutIntegers[key] = arr.filter(item => !isInteger(item));
      objOnlyIntegers[key] = arr.filter(item => isInteger(item));
    } else {
      objWithoutIntegers[key] = arr;
      objOnlyIntegers[key] = arr;
    }
  }
  return { objWithoutIntegers, objOnlyIntegers };
}

export function formatGroups(groups) {
  return groups.map((group, index) => {
    return `<div><strong>Group ${index + 1}:</strong> ${group.join(', ')}</div>`;
  }).join("");
}