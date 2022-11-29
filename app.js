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
let flag = true;

//toggle chat screen when btn clicked
chatBtn.addEventListener("click",function(e){
    chatBtn.classList.toggle("chat-btn--active")
    chatScreen.classList.toggle("show-chat__screen")
})



//close chat when click outside of chat
const mainPage = document.querySelector("#main")
mainPage.addEventListener("click",(e)=>{
    chatBtn.classList.remove("chat-btn--active")
    chatScreen.classList.remove("show-chat__screen")
})


//chat start
const chatStartBtn = document.querySelector("#chat__start__btn")
const chatMain = document.querySelector(".chat__main")
const inpEle = document.querySelector("#chat__input")
chatStartBtn.addEventListener("click",function(){
    chatMain.classList.add("show-chat__main");
    inpEle.focus();
    chatStartBtn.parentElement.style.display="none";
})







//add user message
const chatForm = document.querySelector(".chat-conversation__form");
const chatConv = document.querySelector(".chat-conversation")
const chatTyping = document.querySelector(".chat-typing");
chatForm.addEventListener("submit",function(e){
    e.preventDefault();
    //if input is empty do nothing
    if(inpEle.value.trim() ==="") return;
    

    //append user message in chat screen
    creatAndAppendChatBox("chat-conversation__user",inpEle.value.toString());
    //set inp value null
    inpEle.value = "";
    

    //to avoid making unnecessary api call
    if(flag){
        let typingChatBox;
        setTimeout(()=>{
            typingChatBox = creatAndAppendChatBox("chat-conversation__reply","typing...");

            setTimeout(()=>{
                fetchReply(typingChatBox);
            },200)
        },1000)

      
        flag = false;

    }

})





//create and append message box
function creatAndAppendChatBox(convType,message){
    const chatBox = document.createElement("div");
    const animType = (convType === "chat-conversation__user")?"message-container--right":"message-container--left";
    chatBox.classList.add("chat-conversation__message-container",animType)
    const chatProfile = (convType === "chat-conversation__reply")?`<div class="chat-conversation__profile"></div>`:"";
   chatBox.innerHTML =  `
            ${chatProfile}
            <article class="chat-conversation__box ${convType}">
            </article>
    `
chatBox.querySelector("article").innerText = message.toString();
chatConv.append(chatBox)
chatConv.scrollTop = chatConv.scrollHeight;
addAnimationClass(chatBox,"add-animation")
return chatBox.querySelector("article");
}




//fetch reply from api
async function fetchReply(typingChatBox) {
    try{
        let response = await fetch('https://api.adviceslip.com/advice');
        let data = await response.text();
        data = JSON.parse(data);
        // creatAndAppendChatBox("chat-conversation__reply",data.slip.advice)
        typingChatBox.innerText = data.slip.advice;
        console.log(typingChatBox);
    }catch(e){
        // creatAndAppendChatBox("chat-conversation__reply","Server is down")
        typingChatBox.innerText = "Server is Down";

    }
    // chatTyping.classList.remove("chat-typing--active");
    flag = true;

}


//add animation
function addAnimationClass(ele,className){
    ele.classList.add(className);
}