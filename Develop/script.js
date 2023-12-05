$(function () {
  // Added an event listener, timeblock IDs, and  user input to be saved. The local storage saves user input by using the ID.
  $(".container-fluid").on("click", ".saveBtn", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // This function will generate time blocks for the day.
  function generateTimeBlocks() {
    var container = $(".container-fluid");
    container.empty();

// For loop sets the hours for the day to be generated. If the statement is true, the loop continues until 17 (5 PM).
    for (var hour = 9; hour <= 17; hour++) {
      var period = hour >= 12 ? "PM" : "AM";
      var displayHour = hour > 12 ? hour - 12 : hour;

      var timeBlock = $("<div>")
        .attr("id", "hour-" + hour)
        .addClass("row time-block")
        .html(`
          <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${period}</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        `);

      container.append(timeBlock);
    }
  }

  // This calls the function to generate time blocks.
  generateTimeBlocks();

  // This function applies the past, present, or future class to each time block.
  function updateHourClasses() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  //This function updates time block classes.
  updateHourClasses();

  // This function will grab any user input that was saved in localStorage.
  function loadSavedEvents() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(timeBlockId);
      $(this).children(".description").val(savedEvent);
    });
  }

  // This function calls to load saved events.
  loadSavedEvents();

  // This will display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
