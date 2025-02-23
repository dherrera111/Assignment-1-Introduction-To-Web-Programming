/**
* @name: Assignment1
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Dondon Herrera
*/

$(document).ready(() => {

    // I got the formula here: https://www.thoughtco.com/fahrenheit-to-celsius-formula-609230
    function fahrenheitToCelsius(fahrenheit) { return (fahrenheit - 32) * 5/9; }
    
    // I got the formula here: https://byjus.com/chemistry/celsius-to-kelvin/
    function celsiusToKelvin(celsius) { return celsius + 273.15; }

    $('#temperature-convert').on('click', function() {
        let tempInputValue = $('#temperature').val();
        let $validationConvert = $('#validation-convert');
    
        try {
            // Check if empty
            if (!$.trim(tempInputValue)) {
                throw new Error('Please enter a valid temperature');
            }

            const maxInputTempLength = 9;

            // I got this idea from here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
            // Check for multiple dots and find "." in input, if > 1, throw error
            if ((tempInputValue.match(/\./g) || []).length > 1) {
                throw new Error("Only one decimal point is allowed.");
            }

            // Remove dot and check length
            const numericPart = tempInputValue.replace(/\./g, ''); // replace with an empty string with regex
            if (numericPart.length > maxInputTempLength) {
                throw new Error(`Please enter a maximum of ${maxInputTempLength} digits only.`);
            }
    
            // Convert to float
            const fahrenheit = parseFloat(tempInputValue);
    
            // Check if float
            if (isNaN(fahrenheit)) {
                throw new Error('Please enter a valid temperature');
            }
    
            const celsius = fahrenheitToCelsius(fahrenheit);
            const kelvin = celsiusToKelvin(celsius);
            
            // I got this idea from: https://www.geeksforgeeks.org/jquery-addclass-method/
            $validationConvert.removeClass('error').addClass('success').text(`Celsius: ${celsius.toFixed(2)} °C  &  Kelvin: ${kelvin.toFixed(2)} K`);
            
        } catch (error) {
            $validationConvert.removeClass('success').addClass('error').text(error.message);
        }
    });
});