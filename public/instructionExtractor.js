let matchedInstructions = {};

function addMatchedInstruction(posInMem, instruction, ins) {
    matchedInstructions[posInMem] = instruction+","+ins;
}

function clearMatchedInstructions() {
    matchedInstructions = {};
}
