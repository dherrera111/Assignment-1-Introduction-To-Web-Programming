/**
* @name: Assignment1
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Dondon Herrera
*/

/*
Title: Reusable HTML Components – How to Reuse a Header and Footer on a Website
Reference: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
Author: Kristofer Koishigawa
Date Published: October 2, 2020
*/

class Footer extends HTMLElement {
    constructor() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
        super(); // used to access properties on an object literal 
    }

    connectedCallback() { // runs each time your custom element is inserted into the DOM.
        
        this.innerHTML = `
             <footer>
                <p>Copyright @ <span id="year"></span> | Web Programming | <span id="date-today"></span></p>
            </footer>
        `;

        // Update footer date and year
        // Ref: https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/
        const now = new Date();
        const dateOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        
        document.getElementById('date-today').textContent = now.toLocaleDateString('en', dateOptions);
        document.getElementById('year').textContent = now.getFullYear();
    }
}

customElements.define('footer-component', Footer);