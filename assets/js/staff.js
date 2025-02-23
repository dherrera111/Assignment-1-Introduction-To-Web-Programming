/**
* @name: Assignment1
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Dondon Herrera
*/

// declare global variable for staff list container
let staffObjects = [];

$(document).ready(() => {
   initializeStaff();
});

// constructor - initialization
function initializeStaff() {
    // initial load - staff data
    extractStaffInfo(() => { 
        displayStaff(); 
    });
}

// Extract text file from assets > data > staff.txt and set to staff objects
function extractStaffInfo(callback) {
    // Ref: https://www.geeksforgeeks.org/jquery-getjson-method/
    $.getJSON('./assets/data/staff.json', function(data) {
        staffObjects = data.map(item => ({
            name: item[0],
            position: item[1],
            location: item[2],
            postalCode: item[3],
            dateEmployed: item[4],
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
            // replace '$' ',' with empty string and convert to number
            salary: parseInt(item[5].replace("$", "").replace(/,/g, "")) 
        }));
        callback(staffObjects);
    });
}

// Ref: https://www.scaler.com/topics/pagination-in-javascript/
// global variables for pagination
let currentPage = 1;
let itemsPerPage = 6;

// assign and display to table
function displayStaff() {
    const staffList = $('#staff-list'); // container list in html <tbody id="staff-list"></tbody>
    staffList.empty(); // reset all elements and text from selected element.
    
    // first item on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;

    // determine the last item of the page
    const endIndex = startIndex + itemsPerPage;

    // remove items (startIndex, endIndex) from staff objects and assigned to new variable array
    const paginatedListStaff = staffObjects.slice(startIndex, endIndex);

    // loop through the list and append each item to each table row
    paginatedListStaff.forEach((person, index) => {
        staffList.append(`
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${person.name}</td>
                <td>${person.position}</td>
                <td>${person.location}</td>
                <td>${person.postalCode}</td>
                <td>${person.dateEmployed}</td>
                <td>$${person.salary.toLocaleString()}</td>
            </tr>
        `);
    });

    updateAccessPaginationControl();
};

function updateAccessPaginationControl() {
    const totalPages = Math.ceil(staffObjects.length / itemsPerPage);
    $('#page-info').text(`Page ${currentPage} of ${totalPages}`);

    const prevPage = document.getElementById("prev-page");
    const nextPage = document.getElementById("next-page");

    if(currentPage === 1)
        prevPage.className = 'btn-disabled';
    else
        prevPage.className = 'button';

    if(currentPage === totalPages)
        nextPage.className = 'btn-disabled';
    else
        nextPage.className = 'button';  
}

let currentSortField = 'name';
let sortAscending = true;

// sort staff function by colName 
function sortStaff(colName) {

    if (currentSortField === colName) { // 'name' === 'name' then true
        sortAscending = !sortAscending; // sortAscending = (!true), so false
    } else {
        currentSortField = colName; // 'salary'
        sortAscending = true;
    }
        // created a new array copy and original staff objects remains unchanged.
        const sortedStaff = [...staffObjects].sort((a, b) => {
            const valueA = a[colName]; // access a["name"] or a["salary"]
            const valueB = b[colName]; // access b["name"] or b["salary"]

            if (typeof valueA === 'string') { // check if string type...
                return sortAscending ? 
                    // I got this idea after reading: https://dev.to/hariseldon27/localecompare-and-sorting-in-javascript-1god
                    valueA.localeCompare(valueB) : // return a negative value if valueA comes first alphabetically, which means a comes before b.
                    valueB.localeCompare(valueA); // return a negative value if valueB comes first alphabetically, meaning b comes before a.
            } else {
                return sortAscending ? 
                    valueA - valueB : // If valueA is larger than valueB, a comes after b (ascending order).
                    valueB - valueA; // If valueB is larger than valueA, b comes after a (descending order).
            }
        });

    staffObjects = sortedStaff; // assigned sorted staff to global variable
    currentPage = 1;
    displayStaff();
}

// set current page by passing +1(next page) or -1(prev page)
function setCurrentPage(pageDirection) {
    const totalPages = Math.ceil(staffObjects.length / itemsPerPage);
    const newPage = currentPage + pageDirection;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayStaff();
    }
}

