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

const headerTemplate = document.createElement('template');

class Header extends HTMLElement {
  constructor() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
    super(); // used to access properties on an object literal 
  }

  connectedCallback() { // runs each time your custom element is inserted into the DOM.

    this.innerHTML = `
      <nav>
          <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="grade.html">Mark to Grade Converter</a></li>
              <li><a href="staff.html">Staff Info</a></li>
              <li><a href="weather.html">Weather Converter</a></li>
          </ul>
      </nav>`;
  }
}

customElements.define('header-component', Header);
