// Function to create heterogeneous groups



export function stackHetero(susRandom, groupNo) {
  // Create a shallow copy of susRandom so that the original is not modified.
  let localSusRandom = [...susRandom];

  // Initialize finalhetero as an array of groupNo empty arrays.
  let finalhetero = Array.from({ length: groupNo }, () => []);

  // Variable to control whether to fill in normal or reverse order.
  let reverseOrder = false;

  // While there are still elements in localSusRandom:
  while (localSusRandom.length > 0) {
    if (!reverseOrder) {
      // Fill in normal order:
      for (let i = 0; i < groupNo; i++) {
        if (localSusRandom.length === 0) break;
        let candidate = localSusRandom.shift();
        // If candidate is an array with elements, add only the first element.
        if (Array.isArray(candidate) && candidate.length > 0) {
          finalhetero[i].push(candidate[0]);
        } else {
          finalhetero[i].push(candidate);
        }
      }
    } else {
      // Fill in reverse order:
      for (let i = groupNo - 1; i >= 0; i--) {
        if (localSusRandom.length === 0) break;
        let candidate = localSusRandom.shift();
        if (Array.isArray(candidate) && candidate.length > 0) {
          finalhetero[i].push(candidate[0]);
        } else {
          finalhetero[i].push(candidate);
        }
      }
    }
    // Reverse the order after each round.
    reverseOrder = !reverseOrder;
  }

  return finalhetero;
}