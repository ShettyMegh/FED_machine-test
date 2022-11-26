//navbar
const toggleBtn = document.querySelector(".toggle-btn")
const navContainer = document.querySelector(".nav__container")
const navlinks = document.querySelector(".nav__links")

toggleBtn.addEventListener("click",function(){
    navlinks.classList.toggle("show-links")
    navContainer.classList.toggle("nav-active")
})


//chat
const chatBtn = document.querySelector(".chat-btn");
const chatScreen = document.querySelector(".chat__screen");
chatBtn.addEventListener("click",function(){
    chatScreen.classList.toggle("show-chat__screen")
})

const chatForm = document.querySelector(".chat-conversation__form");
chatForm.addEventListener("submit",function(e){
    e.preventDefault();
    
})