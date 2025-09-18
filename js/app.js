// Shrash Tech - Name Magic JavaScript

// Data mappings from the provided JSON
const letterToNumber = {
    "A": 1, "B": 2, "C": 3, "D": 4, "E": 5, "F": 6, "G": 7, "H": 8, "I": 9,
    "J": 1, "K": 2, "L": 3, "M": 4, "N": 5, "O": 6, "P": 7, "Q": 8, "R": 9,
    "S": 1, "T": 2, "U": 3, "V": 4, "W": 5, "X": 6, "Y": 7, "Z": 8
};

const numerologyMapping = {
    "1": {"color": "Red, Gold", "day": "Sunday", "planet": "Sun", "vibes": "Leadership, Creativity"},
    "2": {"color": "White, Cream", "day": "Monday", "planet": "Moon", "vibes": "Harmony, Emotions"},
    "3": {"color": "Yellow, Pink", "day": "Thursday", "planet": "Jupiter", "vibes": "Growth, Wisdom"},
    "4": {"color": "Blue, Grey", "day": "Saturday", "planet": "Rahu", "vibes": "Stability, Practicality"},
    "5": {"color": "Green, Blue", "day": "Wednesday", "planet": "Mercury", "vibes": "Freedom, Communication"},
    "6": {"color": "Pink, Silver", "day": "Friday", "planet": "Venus", "vibes": "Love, Beauty, Balance"},
    "7": {"color": "Purple", "day": "Monday", "planet": "Ketu", "vibes": "Spirituality, Intuition"},
    "8": {"color": "Black, Dark Blue", "day": "Saturday", "planet": "Saturn", "vibes": "Power, Discipline"},
    "9": {"color": "Red, Maroon", "day": "Tuesday", "planet": "Mars", "vibes": "Energy, Passion, Courage"}
};

const characterMeanings = {
    "A": "Amazing", "B": "Bold", "C": "Courage", "D": "Determined", "E": "Excellent", "F": "Faithful", "G": "Great", "H": "Helps", "I": "Inspiration",
    "J": "Joyful", "K": "Knowledge", "L": "Love", "M": "Magnificent", "N": "Nurtures", "O": "Outstanding", "P": "Prove", "Q": "Quality", "R": "Reflects",
    "S": "Strong", "T": "Thoughtful", "U": "Understanding", "V": "Victory", "W": "Wise", "X": "eXceptional", "Y": "Youthful", "Z": "Zealous"
};

const characterActions = {
    "A": "All", "B": "Brings", "C": "Creates", "D": "Develops", "E": "Everyone", "F": "Forever", "G": "Grows", "H": "Helps", "I": "Inspires",
    "J": "Joins", "K": "Keeps", "L": "Lives", "M": "Makes", "N": "Nurtures", "O": "Opens", "P": "Proves", "Q": "Qualifies", "R": "Reflects",
    "S": "Shows", "T": "Teaches", "U": "Unites", "V": "Values", "W": "Works", "X": "eXpresses", "Y": "Yields", "Z": "Zones"
};

const compatibilityRules = {
    "1": [1, 3, 5, 6],
    "2": [2, 4, 6, 8],
    "3": [1, 3, 5, 9],
    "4": [2, 4, 6, 8],
    "5": [1, 3, 5, 7],
    "6": [1, 2, 4, 6],
    "7": [5, 7, 9],
    "8": [2, 4, 6, 8],
    "9": [3, 7, 9]
};

// DOM Elements
let elements = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    bindEvents();
    setupNavigation();
});

function initializeElements() {
    elements = {
        // Navigation
        navToggle: document.getElementById('navToggle'),
        navList: document.getElementById('navList'),
        navLinks: document.querySelectorAll('.nav__link'),
        
        // Module cards
        moduleCards: document.querySelectorAll('.module-card'),
        
        // Module 1 - Name Meaning
        nameInput: document.getElementById('nameInput'),
        generateMeaning: document.getElementById('generateMeaning'),
        nameResults: document.getElementById('nameResults'),
        characterBreakdown: document.getElementById('characterBreakdown'),
        finalMeaning: document.getElementById('finalMeaning'),
        
        // Module 2 - Lucky Numbers
        luckyNameInput: document.getElementById('luckyNameInput'),
        dobInput: document.getElementById('dobInput'),
        calculateLucky: document.getElementById('calculateLucky'),
        luckyResults: document.getElementById('luckyResults'),
        calculationSteps: document.getElementById('calculationSteps'),
        luckyAttributes: document.getElementById('luckyAttributes'),
        
        // Module 3 - Compatibility
        person1Name: document.getElementById('person1Name'),
        person1Dob: document.getElementById('person1Dob'),
        person2Name: document.getElementById('person2Name'),
        person2Dob: document.getElementById('person2Dob'),
        checkCompatibility: document.getElementById('checkCompatibility'),
        compatibilityResults: document.getElementById('compatibilityResults'),
        compatibilityMeter: document.getElementById('compatibilityMeter'),
        compatibilityAnalysis: document.getElementById('compatibilityAnalysis'),
        
        // Loading modal
        loadingModal: document.getElementById('loadingModal')
    };
}

function bindEvents() {
    // Mobile navigation toggle
    if (elements.navToggle) {
        elements.navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Module cards navigation
    elements.moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            if (moduleId) {
                scrollToSection(moduleId);
            }
        });
    });
    
    // Module 1 events
    if (elements.generateMeaning) {
        elements.generateMeaning.addEventListener('click', generateNameMeaning);
    }
    
    if (elements.nameInput) {
        elements.nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateNameMeaning();
            }
        });
    }
    
    // Module 2 events
    if (elements.calculateLucky) {
        elements.calculateLucky.addEventListener('click', calculateLuckyNumbers);
    }
    
    // Module 3 events
    if (elements.checkCompatibility) {
        elements.checkCompatibility.addEventListener('click', checkCompatibility);
    }
}

function setupNavigation() {
    // Smooth scrolling for navigation links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (elements.navList.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    });
}

function toggleMobileNav() {
    elements.navList.classList.toggle('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showLoading() {
    elements.loadingModal.classList.remove('hidden');
}

function hideLoading() {
    elements.loadingModal.classList.add('hidden');
}

function validateInput(input, pattern = null) {
    const value = input.value.trim();
    
    // Remove existing error styles
    input.classList.remove('error');
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (!value) {
        showError(input, 'This field is required');
        return false;
    }
    
    if (pattern && !pattern.test(value)) {
        showError(input, 'Please enter a valid format');
        return false;
    }
    
    return true;
}

function showError(input, message) {
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

// Module 1: Name Meaning Generator
function generateNameMeaning() {
    const name = elements.nameInput.value.trim().toUpperCase();
    
    if (!validateInput(elements.nameInput)) {
        return;
    }
    
    if (!/^[A-Z]+$/.test(name)) {
        showError(elements.nameInput, 'Please enter only letters');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        const breakdown = generateCharacterBreakdown(name);
        const meaningfulSentence = generateMeaningfulSentence(name);
        
        displayNameResults(breakdown, meaningfulSentence);
        hideLoading();
        
        elements.nameResults.style.display = 'block';
        elements.nameResults.classList.add('success-animation');
    }, 1000);
}

function generateCharacterBreakdown(name) {
    return Array.from(name).map((letter, index) => ({
        letter,
        meaning: characterMeanings[letter] || 'Unknown',
        index
    }));
}

function generateMeaningfulSentence(name) {
    const words = [];
    let useActions = false;
    
    for (let i = 0; i < name.length; i++) {
        const letter = name[i];
        
        if (i === 0) {
            words.push(characterMeanings[letter] || 'Unknown');
        } else if (i % 2 === 1) {
            words.push(characterActions[letter] || 'Unknown');
            useActions = true;
        } else {
            if (useActions && i === name.length - 1) {
                words.push(characterMeanings[letter] || 'Unknown');
            } else {
                words.push(characterMeanings[letter] || 'Unknown');
            }
        }
    }
    
    return words.join(', ');
}

function displayNameResults(breakdown, sentence) {
    // Display character breakdown
    elements.characterBreakdown.innerHTML = '<h3>Character Breakdown:</h3>';
    breakdown.forEach(item => {
        const div = document.createElement('div');
        div.className = 'character-item';
        div.style.setProperty('--i', item.index);
        div.innerHTML = `
            <div class="character-letter">${item.letter}</div>
            <div class="character-meaning">${item.meaning}</div>
        `;
        elements.characterBreakdown.appendChild(div);
    });
    
    // Display final meaning
    elements.finalMeaning.innerHTML = `
        <h3>Your Name's Meaning:</h3>
        <p>${sentence}</p>
    `;
}

// Module 2: Lucky Number Calculator
function calculateLuckyNumbers() {
    const name = elements.luckyNameInput.value.trim().toUpperCase();
    const dob = elements.dobInput.value.trim();
    
    const dobPattern = /^\d{2}-\d{2}-\d{4}$/;
    
    if (!validateInput(elements.luckyNameInput) || 
        !validateInput(elements.dobInput, dobPattern)) {
        return;
    }
    
    if (!/^[A-Z\s]+$/.test(name)) {
        showError(elements.luckyNameInput, 'Please enter only letters and spaces');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        const nameNumber = calculateNameNumber(name);
        const birthNumber = calculateBirthNumber(dob);
        const finalNumber = (nameNumber + birthNumber) % 9 || 9;
        
        displayLuckyResults(name, dob, nameNumber, birthNumber, finalNumber);
        hideLoading();
        
        elements.luckyResults.style.display = 'block';
        elements.luckyResults.classList.add('success-animation');
    }, 1500);
}

function calculateNameNumber(name) {
    let total = 0;
    const cleanName = name.replace(/\s/g, '');
    
    for (let char of cleanName) {
        if (letterToNumber[char]) {
            total += letterToNumber[char];
        }
    }
    
    return reduceToSingleDigit(total);
}

function calculateBirthNumber(dob) {
    const digits = dob.replace(/-/g, '').split('').map(Number);
    const total = digits.reduce((sum, digit) => sum + digit, 0);
    return reduceToSingleDigit(total);
}

function reduceToSingleDigit(number) {
    while (number > 9) {
        const digits = number.toString().split('').map(Number);
        number = digits.reduce((sum, digit) => sum + digit, 0);
    }
    return number;
}

function displayLuckyResults(name, dob, nameNumber, birthNumber, finalNumber) {
    // Display calculation steps
    const nameTotal = calculateNameTotal(name);
    const birthTotal = calculateBirthTotal(dob);
    
    elements.calculationSteps.innerHTML = `
        <div class="step-card">
            <h4><span class="step-number">1</span>Name Number Calculation</h4>
            <p>Name: ${name}</p>
            <div class="calculation">Total = ${nameTotal} → ${nameNumber}</div>
        </div>
        <div class="step-card">
            <h4><span class="step-number">2</span>Birth Number Calculation</h4>
            <p>DOB: ${dob}</p>
            <div class="calculation">Total = ${birthTotal} → ${birthNumber}</div>
        </div>
        <div class="step-card">
            <h4><span class="step-number">3</span>Final Lucky Number</h4>
            <div class="calculation">${nameNumber} + ${birthNumber} = ${finalNumber}</div>
        </div>
    `;
    
    // Display attributes
    const attributes = numerologyMapping[finalNumber.toString()];
    elements.luckyAttributes.innerHTML = `
        <div class="attribute-card">
            <div class="attribute-icon">🔢</div>
            <h5>Lucky Number</h5>
            <div class="attribute-value">${finalNumber}</div>
        </div>
        <div class="attribute-card">
            <div class="attribute-icon">🎨</div>
            <h5>Lucky Colors</h5>
            <div class="attribute-value">${attributes.color}</div>
        </div>
        <div class="attribute-card">
            <div class="attribute-icon">📅</div>
            <h5>Lucky Day</h5>
            <div class="attribute-value">${attributes.day}</div>
        </div>
        <div class="attribute-card">
            <div class="attribute-icon">🪐</div>
            <h5>Ruling Planet</h5>
            <div class="attribute-value">${attributes.planet}</div>
        </div>
        <div class="attribute-card">
            <div class="attribute-icon">✨</div>
            <h5>Personality Vibes</h5>
            <div class="attribute-value">${attributes.vibes}</div>
        </div>
    `;
}

function calculateNameTotal(name) {
    let total = 0;
    const cleanName = name.replace(/\s/g, '');
    
    for (let char of cleanName) {
        if (letterToNumber[char]) {
            total += letterToNumber[char];
        }
    }
    
    return total;
}

function calculateBirthTotal(dob) {
    const digits = dob.replace(/-/g, '').split('').map(Number);
    return digits.reduce((sum, digit) => sum + digit, 0);
}

// Module 3: Compatibility Checker
function checkCompatibility() {
    const name1 = elements.person1Name.value.trim().toUpperCase();
    const dob1 = elements.person1Dob.value.trim();
    const name2 = elements.person2Name.value.trim().toUpperCase();
    const dob2 = elements.person2Dob.value.trim();
    
    const dobPattern = /^\d{2}-\d{2}-\d{4}$/;
    
    if (!validateInput(elements.person1Name) || 
        !validateInput(elements.person1Dob, dobPattern) ||
        !validateInput(elements.person2Name) || 
        !validateInput(elements.person2Dob, dobPattern)) {
        return;
    }
    
    if (!/^[A-Z\s]+$/.test(name1) || !/^[A-Z\s]+$/.test(name2)) {
        alert('Please enter only letters and spaces for names');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        const person1Number = calculateFinalNumber(name1, dob1);
        const person2Number = calculateFinalNumber(name2, dob2);
        
        const compatibility = calculateCompatibilityScore(person1Number, person2Number);
        
        displayCompatibilityResults(name1, name2, person1Number, person2Number, compatibility);
        hideLoading();
        
        elements.compatibilityResults.style.display = 'block';
        elements.compatibilityResults.classList.add('success-animation');
    }, 2000);
}

function calculateFinalNumber(name, dob) {
    const nameNumber = calculateNameNumber(name);
    const birthNumber = calculateBirthNumber(dob);
    return (nameNumber + birthNumber) % 9 || 9;
}

function calculateCompatibilityScore(num1, num2) {
    const compatibleNumbers = compatibilityRules[num1.toString()] || [];
    const isCompatible = compatibleNumbers.includes(num2);
    
    let baseScore = isCompatible ? 75 : 45;
    
    // Add bonus for exact match
    if (num1 === num2) {
        baseScore += 20;
    }
    
    // Add random variation
    const variation = Math.floor(Math.random() * 15) - 7;
    const finalScore = Math.max(20, Math.min(100, baseScore + variation));
    
    return finalScore;
}

function displayCompatibilityResults(name1, name2, num1, num2, score) {
    // Display compatibility meter
    elements.compatibilityMeter.innerHTML = `
        <h3>Compatibility Score</h3>
        <div class="compatibility-score">${score}%</div>
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        <p>${getCompatibilityDescription(score)}</p>
    `;
    
    // Animate progress bar
    setTimeout(() => {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = score + '%';
        }
    }, 100);
    
    // Display analysis
    const attributes1 = numerologyMapping[num1.toString()];
    const attributes2 = numerologyMapping[num2.toString()];
    
    elements.compatibilityAnalysis.innerHTML = `
        <div class="analysis-section">
            <h4>Individual Numbers</h4>
            <p><strong>${name1}:</strong> Lucky Number ${num1} (${attributes1.vibes})</p>
            <p><strong>${name2}:</strong> Lucky Number ${num2} (${attributes2.vibes})</p>
        </div>
        <div class="analysis-section">
            <h4>Shared Attributes</h4>
            <div class="shared-attributes">
                ${getSharedAttributes(attributes1, attributes2)}
            </div>
        </div>
        <div class="analysis-section">
            <h4>Compatibility Insights</h4>
            <p>${getCompatibilityInsights(num1, num2, score)}</p>
        </div>
    `;
}

function getCompatibilityDescription(score) {
    if (score >= 80) return "Excellent compatibility! You're a perfect match.";
    if (score >= 60) return "Good compatibility with great potential.";
    if (score >= 40) return "Moderate compatibility. Communication is key.";
    return "Challenging compatibility. Understanding is important.";
}

function getSharedAttributes(attr1, attr2) {
    const shared = [];
    
    if (attr1.day === attr2.day) {
        shared.push(`<span class="attribute-tag">Same Lucky Day: ${attr1.day}</span>`);
    }
    
    if (attr1.planet === attr2.planet) {
        shared.push(`<span class="attribute-tag">Same Planet: ${attr1.planet}</span>`);
    }
    
    const colors1 = attr1.color.toLowerCase().split(', ');
    const colors2 = attr2.color.toLowerCase().split(', ');
    const commonColors = colors1.filter(color => colors2.includes(color));
    
    if (commonColors.length > 0) {
        shared.push(`<span class="attribute-tag">Shared Colors: ${commonColors.join(', ')}</span>`);
    }
    
    if (shared.length === 0) {
        return '<p>Different attributes can bring complementary energies to your relationship.</p>';
    }
    
    return shared.join('');
}

function getCompatibilityInsights(num1, num2, score) {
    if (num1 === num2) {
        return "You both share the same lucky number, creating natural harmony and understanding. Your similar energies complement each other beautifully.";
    }
    
    const compatibleNumbers = compatibilityRules[num1.toString()] || [];
    const isCompatible = compatibleNumbers.includes(num2);
    
    if (isCompatible) {
        return "Your numbers are naturally compatible according to numerology. This suggests a harmonious relationship with mutual understanding and support.";
    } else {
        return "While your numbers present some challenges, different energies can create balance and growth. Focus on understanding and appreciating your differences.";
    }
}