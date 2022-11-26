//navbar
const toggleBtn = document.querySelector(".toggle-btn")
const navContainer = document.querySelector(".nav__container")
const navlinks = document.querySelector(".nav__links")

toggleBtn.addEventListener("click",function(){
    navlinks.classList.toggle("show-links")
    navContainer.classList.toggle("nav-active")
})


//chat

//chat btn click
const chatBtn = document.querySelector(".chat-btn");
const chatScreen = document.querySelector(".chat__screen");
chatBtn.addEventListener("click",function(){
    chatScreen.classList.toggle("show-chat__screen")
})


//chat start
const chatStartBtn = document.querySelector("#chat__start__btn")
const chatMain = document.querySelector(".chat__main")
chatStartBtn.addEventListener("click",function(){
    chatMain.classList.add("show-chat__main");
    chatStartBtn.parentElement.style.display="none";
})


