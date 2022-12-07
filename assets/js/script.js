//Values
let today = dayjs();
$('#currentDay').text(today.format('[Today is] dddd MMM DD, YYYY'));
let store = window.localStorage;
let container = $('.container-lg');

let currentTime = {text: today.format('h:00 A'), hour: today.hour()};
//This createa a new array of 24 hours in a day
let todaysHours = Array.from(new Array(24)).map((v, i) => {
        let text = today.hour(i).format('h:00 A');
        let hour = today.hour(i);
        return {text, hour};
    })

//Setting the parameters
function color(time) {
    return time.text === currentTime.text
//This helps set the colors on the time slots
    ? 'present'
    : time.hour < today
    ? 'past'
    : 'future';
}


//refer to line 9, forEach creates a new div element
$(function () {
    
        todaysHours.forEach((hr) => {
           let grid = $(
            `<form id='${hr.text}' class='row time-block'> </form>`
           );

           let time = $(
            `<div class='col-2 col-md-1 hour text-center py-3'>${hr.text}</div>`
           );
//Adds function colors, also use two | or auto value will be ZERO
           let textArea = $(
            `<textarea name='${hr.text}' class='col-8 col-md-10 description ${color(hr)}' rows='3'>${store.getItem(hr.text) || ""}</textarea>`
           );
        
           let saveButton = $(
            `<button class='btn saveBtn col-2 col-md-1' aria-label='save'><i class='fas fa-save' aria-hidden='true'></i></button>`
           );
//Uses event listener to save user data in local storage           
           grid.submit((event) => {
                event.preventDefault();
           
           let value = $(`textarea[name='${hr.text}']`).value();
           store.setItem(hr.item, value);
           })
           
           container.append(grid);
           grid.append(time);
           grid.append(textArea);
           grid.append(saveButton);

        });

});

