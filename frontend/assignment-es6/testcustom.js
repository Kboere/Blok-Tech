const hamburger = document.querySelector("header nav button");
const navMenu = document.querySelector(" header nav ul");
const navbar = document.querySelector(" header nav");

hamburger.addEventListener("click", function(e){
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navbar.classList.toggle("active");
});

// const mobileMenu () => {
//     hamburger.classList.toggle("active");
//     navMenu.classList.toggle("active");
//     navbar.classList.toggle("active");
// }

const slide = document.querySelector("body.page2 main section article:nth-of-type(2) div div");
const btn1 = document.querySelector("body.page2 main section:first-of-type article:nth-of-type(2) ul li:first-of-type");
const btn2 = document.querySelector("body.page2 main section:first-of-type article:nth-of-type(2) ul li:nth-of-type(2)");
const btn3 = document.querySelector("body.page2 main section:first-of-type article:nth-of-type(2) ul li:nth-of-type(3)");

if(btn1) {
    btn1.onclick = function () {
      slide.style.transform = "translateX(0px)";
    };
}

if(btn2) {
    btn2.onclick = function () {
      slide.style.transform = "translateX(-100%)";
    };
}

if(btn3) {
    btn3.onclick = function () {
      slide.style.transform = "translateX(-200%)";
    };
}

const divisor = document.getElementById("divisor");
const slider = document.getElementById("slider");
const moveDivisor = () => { 
	divisor.style.width = slider.value+"%";
}

const svgs = document.querySelectorAll("svg");

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    console.log('interactings ')
    if (entry.isIntersecting) {
      entry.target.classList.add("triggered")
    }
  })
}

const options = {}

const myObserver = new IntersectionObserver(callback, options)

svgs.forEach(svg => {
    myObserver.observe(svg)
})


const darkmode = document.querySelector("main aside button");
darkmode.addEventListener("click", (e) => document.body.classList.toggle("darkmode"));

// const darkmodeEnable () => {
//     document.body.classList.toggle("darkmode");
// }


console.log(darkmode);

