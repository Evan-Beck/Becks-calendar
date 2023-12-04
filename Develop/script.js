$(function () {
  // Add a listener for click events on the save button.
  $(".container-fluid").on("click", ".saveBtn", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Dynamically generate time blocks for the entire day
  function generateTimeBlocks() {
    var container = $(".container-fluid");

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>")
        .attr("id", "hour-" + hour)
        .addClass("row time-block")
        .html(`
          <div class="col-2 col-md-1 hour text-center py-3">${hour > 12 ? hour - 12 + "PM" : hour + "AM"}</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        `);

      container.append(timeBlock);
    }
  }

  // Call the function to generate time blocks
  generateTimeBlocks();

  // Apply the past, present, or future class to each time block.
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

  // Call the function to update time block classes
  updateHourClasses();

  // Get any user input that was saved in localStorage.
  function loadSavedEvents() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(timeBlockId);
      $(this).children(".description").val(savedEvent);
    });
  }

  // Call the function to load saved events
  loadSavedEvents();

  // Display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
