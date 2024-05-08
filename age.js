// form year validation
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const yearInput = document.getElementById("year-input");
if (yearInput) {
  yearInput.setAttribute("max", currentYear);
} else {
  console.error("Element with ID 'year-input' not found.");
}
// form year validation.

//  calculations
document
  .getElementById("date-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let day = document.getElementById("day-input").value;
    let month = document.getElementById("month-input").value;
    let year = document.getElementById("year-input").value;

    let inputDate = new Date(year, month - 1, day);
    const dateNow = new Date();

    let ageInYears = dateNow.getFullYear() - inputDate.getFullYear();

    if (
      dateNow.getMonth() < inputDate.getMonth() ||
      (dateNow.getMonth() === inputDate.getMonth() &&
        dateNow.getDate() < inputDate.getDate())
    ) {
      ageInYears--;
    }

    document.getElementById("year").textContent = ageInYears;

    let monthsApart =
      (dateNow.getFullYear() - inputDate.getFullYear()) * 12 +
      dateNow.getMonth() -
      inputDate.getMonth();

    if (dateNow.getDate() < inputDate.getDate()) {
      monthsApart--;
    }

    if (monthsApart < 0) {
      monthsApart += 12;
    }

    document.getElementById("month").textContent = monthsApart % 12;

    let daysApart = dateNow.getDate() - inputDate.getDate();
    if (daysApart < 0) {
      let lastDayOfMonth = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        0
      ).getDate();
      daysApart += lastDayOfMonth;
    }

    document.getElementById("day").textContent = daysApart;

    const nextBirthday = calculateNextBirthday(inputDate);

    document.getElementById("next-day").textContent = nextBirthday;
  });

function calculateNextBirthday(birthDate) {
  const today = new Date();
  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const timeDifference = nextBirthday - today;
  const daysUntilNextBirthday = Math.ceil(
    timeDifference / (1000 * 60 * 60 * 24)
  );

  return daysUntilNextBirthday;
}
//  calculations.

// show results
const appResults = document.querySelector(".app-results");
const showResults = function () {
  appResults.style.display = "flex";
};

document
  .getElementById("date-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    showResults();
  });
// show results.

// change theme
const lightModeIcon = document.querySelector(".fa-sun");
const darkModeIcon = document.querySelector(".fa-cloud");
const styleSheetLink = document.querySelector('link[href="./age.css"]');

lightModeIcon.addEventListener("click", function () {
  styleSheetLink.href = "./age-light.css";
});

darkModeIcon.addEventListener("click", function () {
  styleSheetLink.href = "./age.css";
});
// change theme.
