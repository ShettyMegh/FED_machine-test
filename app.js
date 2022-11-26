//navbar
const toggleBtn = document.querySelector(".toggle-btn")
const navContainer = document.querySelector(".nav__container")
const navlinks = document.querySelector(".nav__links")

toggleBtn.addEventListener("click",function(){
    navlinks.classList.toggle("show-links")
    navContainer.classList.toggle("nav-active")
})




/* 
**************
chat functionalities
**************
*/
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



//create and append message box
function creatAndAppendChatBox(convType,message){
        const chatBox = document.createElement("div");
        chatBox.classList.add("chat-conversation__message-container")
        const chatProfile = (convType === "chat-conversation__reply")?`<div class="chat-conversation__profile"></div>`:"";
       chatBox.innerHTML =  `
                ${chatProfile};
                <article class="chat-conversation__box ${convType}">
                    ${message.toString()}
                </article>
        `
    chatConv.append(chatBox)
    chatConv.scrollTop = chatConv.scrollHeight;
}


//add user message
const chatForm = document.querySelector(".chat-conversation__form");
const chatConv = document.querySelector(".chat-conversation")
chatForm.addEventListener("submit",function(e){
    e.preventDefault();
    const inpEle = document.querySelector("#chat__input")
    //if input is empty do nothing
    if(inpEle.value.trim() ==="") return;
    creatAndAppendChatBox("chat-conversation__user",inpEle.value.toString());
    inpEle.value = "";
    var fetchConst = setTimeout(()=>{
        fetchReply();
    },200)
})



//fetch reply from api
async function fetchReply() {
    let response = await fetch('https://api.adviceslip.com/advice');
    let data = await response.text();
    data = JSON.parse(data);
    creatAndAppendChatBox("chat-conversation__reply",data.slip.advice)
}

