// Caesar Cipher
function encryptCaesar() {
    const input = document.getElementById('caesarInput').value.toUpperCase();
    const key = parseInt(document.getElementById('caesarKey').value);
    let output = '';
    
    for (let i = 0; i < input.length; i++) {
        if (input[i] >= 'A' && input[i] <= 'Z') {
            const charCode = input.charCodeAt(i);
            const shiftedCode = ((charCode - 65 + key) % 26) + 65;
            output += String.fromCharCode(shiftedCode);
        } else {
            output += input[i];
        }
    }
    
    document.getElementById('caesarOutput').value = output;
}

function decryptCaesar() {
    const input = document.getElementById('caesarInput').value.toUpperCase();
    const key = parseInt(document.getElementById('caesarKey').value);
    let output = '';
    
    for (let i = 0; i < input.length; i++) {
        if (input[i] >= 'A' && input[i] <= 'Z') {
            const charCode = input.charCodeAt(i);
            const shiftedCode = ((charCode - 65 - key + 26) % 26) + 65;
            output += String.fromCharCode(shiftedCode);
        } else {
            output += input[i];
        }
    }
    
    document.getElementById('caesarOutput').value = output;
}

// Railfence Cipher
function encryptRailfence() {
    const input = document.getElementById('railfenceInput').value.toUpperCase();
    const key = parseInt(document.getElementById('railfenceKey').value);
    let output = '';
    
    // Create the rail fence pattern
    const rails = Array(key).fill().map(() => []);
    let rail = 0;
    let direction = 1;
    
    for (let i = 0; i < input.length; i++) {
        rails[rail].push(input[i]);
        rail += direction;
        
        if (rail === key - 1) direction = -1;
        if (rail === 0) direction = 1;
    }
    
    // Read the pattern
    for (let i = 0; i < key; i++) {
        output += rails[i].join('');
    }
    
    document.getElementById('railfenceOutput').value = output;
}

function decryptRailfence() {
    const input = document.getElementById('railfenceInput').value.toUpperCase();
    const key = parseInt(document.getElementById('railfenceKey').value);
    let output = '';
    
    // Create the rail fence pattern
    const pattern = [];
    let rail = 0;
    let direction = 1;
    
    for (let i = 0; i < input.length; i++) {
        pattern.push(rail);
        rail += direction;
        
        if (rail === key - 1) direction = -1;
        if (rail === 0) direction = 1;
    }
    
    // Calculate the length of each rail
    const railLengths = Array(key).fill(0);
    for (let i = 0; i < pattern.length; i++) {
        railLengths[pattern[i]]++;
    }
    
    // Split the input into rails
    const rails = [];
    let pos = 0;
    for (let i = 0; i < key; i++) {
        rails.push(input.substr(pos, railLengths[i]));
        pos += railLengths[i];
    }
    
    // Read the pattern
    rail = 0;
    direction = 1;
    const railPositions = Array(key).fill(0);
    
    for (let i = 0; i < input.length; i++) {
        output += rails[rail][railPositions[rail]];
        railPositions[rail]++;
        rail += direction;
        
        if (rail === key - 1) direction = -1;
        if (rail === 0) direction = 1;
    }
    
    document.getElementById('railfenceOutput').value = output;
}

// Playfair Cipher
function createPlayfairMatrix(key) {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    const matrix = [];
    const used = new Set();
    
    // Remove spaces and convert to uppercase
    key = key.toUpperCase().replace(/\s/g, '');
    
    // Fill the matrix with the key
    let row = [];
    for (let i = 0; i < key.length; i++) {
        const char = key[i] === 'J' ? 'I' : key[i];
        if (!used.has(char)) {
            used.add(char);
            row.push(char);
            if (row.length === 5) {
                matrix.push(row);
                row = [];
            }
        }
    }
    
    // Fill the remaining spaces with the alphabet
    for (let i = 0; i < alphabet.length; i++) {
        const char = alphabet[i];
        if (!used.has(char)) {
            used.add(char);
            row.push(char);
            if (row.length === 5) {
                matrix.push(row);
                row = [];
            }
        }
    }
    
    return matrix;
}

function findPosition(matrix, char) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === char) {
                return [i, j];
            }
        }
    }
    return null;
}

function encryptPlayfair() {
    const input = document.getElementById('playfairInput').value.toUpperCase().replace(/\s/g, '');
    const key = document.getElementById('playfairKey').value;
    const matrix = createPlayfairMatrix(key);
    let output = '';
    
    // Prepare the input (handle 'J' and add padding)
    let preparedInput = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] === 'J') {
            preparedInput += 'I';
        } else {
            preparedInput += input[i];
        }
    }
    
    // Add padding if necessary
    if (preparedInput.length % 2 !== 0) {
        preparedInput += 'X';
    }
    
    // Encrypt pairs of letters
    for (let i = 0; i < preparedInput.length; i += 2) {
        const char1 = preparedInput[i];
        const char2 = preparedInput[i + 1];
        
        const pos1 = findPosition(matrix, char1);
        const pos2 = findPosition(matrix, char2);
        
        if (pos1 && pos2) {
            let [row1, col1] = pos1;
            let [row2, col2] = pos2;
            
            if (row1 === row2) {
                // Same row
                output += matrix[row1][(col1 + 1) % 5];
                output += matrix[row2][(col2 + 1) % 5];
            } else if (col1 === col2) {
                // Same column
                output += matrix[(row1 + 1) % 5][col1];
                output += matrix[(row2 + 1) % 5][col2];
            } else {
                // Rectangle
                output += matrix[row1][col2];
                output += matrix[row2][col1];
            }
        }
    }
    
    document.getElementById('playfairOutput').value = output;
}

function decryptPlayfair() {
    const input = document.getElementById('playfairInput').value.toUpperCase().replace(/\s/g, '');
    const key = document.getElementById('playfairKey').value;
    const matrix = createPlayfairMatrix(key);
    let output = '';
    
    // Decrypt pairs of letters
    for (let i = 0; i < input.length; i += 2) {
        const char1 = input[i];
        const char2 = input[i + 1];
        
        const pos1 = findPosition(matrix, char1);
        const pos2 = findPosition(matrix, char2);
        
        if (pos1 && pos2) {
            let [row1, col1] = pos1;
            let [row2, col2] = pos2;
            
            if (row1 === row2) {
                // Same row
                output += matrix[row1][(col1 + 4) % 5];
                output += matrix[row2][(col2 + 4) % 5];
            } else if (col1 === col2) {
                // Same column
                output += matrix[(row1 + 4) % 5][col1];
                output += matrix[(row2 + 4) % 5][col2];
            } else {
                // Rectangle
                output += matrix[row1][col2];
                output += matrix[row2][col1];
            }
        }
    }
    
    document.getElementById('playfairOutput').value = output;
}

// Vigenère Cipher
function encryptVigenere() {
    const input = document.getElementById('vigenereInput').value.toUpperCase();
    const key = document.getElementById('vigenereKey').value.toUpperCase();
    let output = '';
    
    for (let i = 0; i < input.length; i++) {
        if (input[i] >= 'A' && input[i] <= 'Z') {
            const inputChar = input.charCodeAt(i) - 65;
            const keyChar = key.charCodeAt(i % key.length) - 65;
            const shiftedCode = ((inputChar + keyChar) % 26) + 65;
            output += String.fromCharCode(shiftedCode);
        } else {
            output += input[i];
        }
    }
    
    document.getElementById('vigenereOutput').value = output;
}

function decryptVigenere() {
    const input = document.getElementById('vigenereInput').value.toUpperCase();
    const key = document.getElementById('vigenereKey').value.toUpperCase();
    let output = '';
    
    for (let i = 0; i < input.length; i++) {
        if (input[i] >= 'A' && input[i] <= 'Z') {
            const inputChar = input.charCodeAt(i) - 65;
            const keyChar = key.charCodeAt(i % key.length) - 65;
            const shiftedCode = ((inputChar - keyChar + 26) % 26) + 65;
            output += String.fromCharCode(shiftedCode);
        } else {
            output += input[i];
        }
    }
    
    document.getElementById('vigenereOutput').value = output;
} 