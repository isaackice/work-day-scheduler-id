//Values
let today = dayjs();
let store = window.localStorage;
let container = $('.container-lg');
let currentTime = {text: today.format('h:00 A'), hour: today.hour()};


//Setting the parameters
function color(time) {
    return time.text === currentTime.text
//This helps set the colors on the time slots
    ? 'present'
    : time.hour < today
    ? 'past'
    : 'future';
}


$('#currentDay').text(today.format('[Today is] dddd MMM DD, YYYY'));

$(function () {
    let todaysHours = Array.from(new Array(12)).map((v, i) => {
        let text = today.hour(i).format('h:00 A');
        let hour = today.hour(i);
        return {text, hour};
    })
        todaysHours.forEach((hr) => {
           let grid = $(
            `<form id='${hr.text}' class='row time-block'> </form>`
           );

           let time = $(
            `<div class='col-2 col-md-1 hour text-center py-3'>${hr.text}</div>`
           );

           let textArea = $(
            `<textarea name='${hr.text}' class='col-8 col-md-10 description ${color(hr)}' rows='3'>${store.getItem(hr.text) || ''}</textarea>`
           );
        
           let saveButton = $(
            `<button class='btn saveBtn col-2 col-md-1' aria-label='save'><i class='fas fa-save' aria-hidden='true'></i></button>`
           );

           let value = $(`textarea[name='${hr.text}']`).value();
           store.setItem(hr.item, value);

           grid.submit((event) => {
            event.preventDefault();
           })

           container.append(grid);
           grid.append(textArea);
           grid.append(saveButton);
           grid.append(time);

        });

});

