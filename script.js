// create elements for planner using for loop and appending them to the parent element

function createElements() {
  var contEl = document.querySelector(".px-5");
  
  for (let i = 0; i < 24; i++){
    // create and append child elements for each planner row
    var timeBlockEl = document.createElement('div');
    var idString = "hour-" + i;
    timeBlockEl.setAttribute("id", idString);
    timeBlockEl.classList.add("row", "time-block");
    contEl.appendChild(timeBlockEl);

    var textCenterEl = document.createElement('div');
    textCenterEl.classList.add("col-2", "col-md-1", "hour", "text-center", "py-3");
    textCenterEl.textContent = i+":00";
    timeBlockEl.appendChild(textCenterEl);

    var textAreaEl = document.createElement("textarea");
    textAreaEl.classList.add("col-8", "col-md-10", "description");
    textAreaEl.rows = "3";
    timeBlockEl.appendChild(textAreaEl);

    var buttonEl = document.createElement("button");
    buttonEl.classList.add("btn", "saveBtn", "col-2", "col-md-1");
    buttonEl.ariaLabel = "save";
    timeBlockEl.appendChild(buttonEl);

    var iEl = document.createElement("i");
    iEl.classList.add("fas", "fa-save");
    iEl.ariaHidden = "true";
    buttonEl.appendChild(iEl);
  }
}

// adds past, present, and future classes based on current time and the time on the planner
function timeCompare() {
  var currentHour = dayjs().format("H");
  console.log(currentHour);
  var parent = $(".container-fluid");
  var children = parent.children(".time-block");
  children.each(function(){
    var plannerTime = parseInt($(this).attr("id").split("-")[1]);
    if (currentHour > plannerTime) {
      $(this).addClass("past");
    } else if (currentHour == plannerTime) {
      $(this).addClass("present");
      $(this).removeClass("past");
    } else {
      $(this).addClass("future");
      $(this).removeClass("present");
    }
  });
}

// upon clicking save, save the value in the textarea to local storage
$(window).ready(function () {
  $('.saveBtn').on('click', function(){
    var userInput = $(this).siblings(".description").val();
    var userInputCont = $(this).siblings("description");

    var timeBlockID = $(this).parent().attr("id");

    window.localStorage.setItem(timeBlockID, userInput);
  })
  
  // update classes every minute
  timeCompare();
  setInterval(timeCompare, 60000);

  // for each row, retrieve values from local storage
  var parentNode = $(".px-5");
  parentNode.children(".time-block").each(function(){
    var id = $(this).attr("id");
    console.log($(this));
    $(this).children(".description").val(window.localStorage.getItem(id));
  })
  
  // displays date header
  var currentDay = $('#currentDay');
  currentDay.text(dayjs().format('MMM DD, YYYY'));
});

createElements();