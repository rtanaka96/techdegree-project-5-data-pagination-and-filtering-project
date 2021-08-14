/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   //store start and end index
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;

   //get student list element and empty it
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   //loop over list parameter length and store student data
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentItem = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
           <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>`;
         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   //store number of pagination buttons needed
   const totalPagination = Math.ceil(list.length / 9);

   //select link list and empty it
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   //loop over variable for number of pages needed
   for (let i = 1; i < totalPagination + 1; i++) {
      let paginationButton = ` <li>
      <button type="button">${[i]}</button>
    </li>`;
    linkList.insertAdjacentHTML('beforeend',paginationButton);
   }

   //select first pagination button and give it active class
   document.querySelector('button[type="button"]').className = 'active';

   //create event listener on link list and dynamically add active class when clicked
   linkList.addEventListener('click', function(e) {
      if(e.target.tagName == 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });

}

// Call functions
showPage(data, 1);
addPagination(data);

//add search bar
document.querySelector('.header').insertAdjacentHTML('beforeend',`<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`);

//add no results found and hide it
document.querySelector('.header').insertAdjacentHTML('afterend',`<div id="noresults"><h2>No results found.</h2><p>Please try again.</p></div>`);
document.querySelector('#noresults').style.display = 'none';

//search function
const searchBar = document.querySelector('#search');
function searchStudents(query) {
   //set query to lowercase 
   const resetQuery = query.toString().toLowerCase();
   //create new list of matched students
   let matchedList = [];
   //loop through data and find matches
   //if matches first or last name, push that student to the matched students list
   for (let i = 0; i < data.length ; i++) {
      let formattedFirstName = data[i].name.first.toLowerCase();
      let formattedLastName = data[i].name.last.toLowerCase();
      if(formattedFirstName.indexOf(resetQuery) != -1) {
         matchedList.push(data[i]);
      } else if (formattedLastName.indexOf(resetQuery) != -1) {
         matchedList.push(data[i]);
      } 
   }
   if (matchedList.length < 1) {
      document.querySelector('#noresults').style.display = 'block';
   } else {
      document.querySelector('#noresults').style.display = 'none';
   }
   //call pagination and show page functions for search results
   addPagination(matchedList);
   showPage(matchedList,1);
}

//add event listener on searchbar to run search when key is pressed
searchBar.addEventListener('keyup', function(e) {
  let query = e.target.value;
  searchStudents(query);
});

//add event listener to submit button to run search when button is pressed
const searchButton = searchBar.nextElementSibling;
searchButton.addEventListener('click', function() {
   let query = searchBar.value;
   searchStudents(query);
});