/**
* @name: Assignment1
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Dondon Herrera
*/


// Convert mark to grade
function markToGrade() {
    const markInput = document.getElementById('mark-input-box').value;
    const validationMessage = document.getElementById('validation-message');

    try {

        // Check if empty
        if(!markInput.trim()) throw new Error('Please enter a valid mark');

        // Check the input length
        const maxInputMarkLength = 3;
        if(markInput.length > maxInputMarkLength) throw new Error(`Please enter a maximum of ${maxInputMarkLength} digits only`);

        // Convert to number
        const markInt = parseInt(markInput);

        // Check if number
        if (isNaN(markInt)) throw new Error ('Please enter a valid digit');

        // Check input 1-100
        if (markInt < 0 || markInt > 100) throw new Error ('Please enter a mark between 1 and 100');

        // declare grade variable
        let gradeResult;

        // re-set class name and use ".success" style 
        validationMessage.className = 'success';

        if (markInt > 90) gradeResult = 'A';
        else if (markInt > 80) gradeResult = 'B';
        else if (markInt > 70) gradeResult = 'C';
        else if (markInt > 50) {
            gradeResult = 'D'; 
            validationMessage.className = 'critical';
        } 
        else {
            gradeResult = 'F';
            validationMessage.className = 'danger';
        }

        validationMessage.textContent = `Grade: ${gradeResult}`;
    }
    catch(error) {
        // set error msg in validation-message
        validationMessage.textContent = error.message;
        validationMessage.className = 'error';
    }
};
