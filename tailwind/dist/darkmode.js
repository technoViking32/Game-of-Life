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