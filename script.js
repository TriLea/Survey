// script.js
// Array to hold all user inputs
let userInputs = [];

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userResponse = document.getElementById('userResponse').value;

    // Store each user input
    userInputs.push(userResponse);
    
    // Clear the input field
    document.getElementById('userResponse').value = '';

    console.log('Stored User Inputs:', userInputs);
});

// Function to handle summarization
async function summarizeInputs() {
    const keyword = document.getElementById('keyword').value;
    if (keyword.toLowerCase() === 'summarize') {
        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ response: userInputs.join(' ') }) // Combine all inputs for summarization
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Display the summarized result in the textarea
            const analysisResult = document.getElementById('analysisResult');
            analysisResult.value = data.result || 'No summary found';

            // Clear user inputs after summarization
            userInputs = [];
            console.log('User inputs have been reset after summarization:', userInputs);
            
        } catch (error) {
            console.error('Error:', error);
            const analysisResult = document.getElementById('analysisResult');
            analysisResult.value = 'An error occurred while summarizing the text.';
        }
    } else {
        alert('Please enter the correct keyword to summarize');
    }
}

// Attach event listener to the summarize button
document.getElementById('summarizeButton').addEventListener('click', summarizeInputs);

// Function to reset user inputs and clear text boxes
function resetUserInputs() {
    userInputs = [];
    document.getElementById('userResponse').value = ''; // Clear the user input text box
    document.getElementById('keyword').value = ''; // Clear the keyword input box
    document.getElementById('analysisResult').value = ''; // Clear the analysis result text area
    console.log('User inputs and text boxes have been manually reset:', userInputs);
}

// Attach event listener to the reset button
document.getElementById('resetButton').addEventListener('click', resetUserInputs);
