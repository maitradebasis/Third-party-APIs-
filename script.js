$(document).ready(function () {
    // Display current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
    // Generate time blocks
    for (let i = 9; i <= 17; i++) {
      let timeBlock = $("<div>").addClass("time-block");
      let hour = dayjs().hour(i).format("h A");
      timeBlock.attr("data-hour", i);
      timeBlock.html(`<p>${hour}</p><textarea></textarea><button class="save-btn">Save</button>`);
  
      // Color-code time blocks based on past, present, and future
      if (i < dayjs().hour()) {
        timeBlock.addClass("past");
      } else if (i === dayjs().hour()) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }
  
      // Load saved events from local storage
      let savedEvent = localStorage.getItem(`event-${i}`);
      if (savedEvent) {
        timeBlock.find("textarea").val(savedEvent);
      }
  
      // Save button click event
      timeBlock.find(".save-btn").on("click", function () {
        let eventText = timeBlock.find("textarea").val();
        localStorage.setItem(`event-${i}`, eventText);
      });
  
      $(".container").append(timeBlock);
    }
  });
  