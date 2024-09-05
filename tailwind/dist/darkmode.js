let darkmode = localStorage.getItem('dark');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('dark');
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('dark');
    localStorage.setItem('darkmode', 'inactive')
}

if(darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click" , () => {
    darkmode = localStorage.getItem('darkmode');
    if(darkmode !== "active") {
        enableDarkmode();
    }
    else {
        disableDarkmode();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the details element
    const detailsElement = document.querySelector("details");
  
    // Select the close button (the "X")
    const closeButton = document.querySelector(".bg-gray-400");
  
    // Handle the close button click
    closeButton.addEventListener("click", function () {
      detailsElement.removeAttribute("open");
    });
  
    // Optionally handle when the user clicks on the summary element to open/close the details
    detailsElement.addEventListener("toggle", function () {
      if (detailsElement.open) {
        console.log("Details opened");
      } else {
        console.log("Details closed");
      }
    });
  });

  document.querySelector('.popup-overlay').addEventListener('click', function () {
    document.querySelector('details').removeAttribute('open');
  });
  
  