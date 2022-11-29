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
            //append def message for replying and store the artcile ele in variable
            typingChatBox = creatAndAppendChatBox("chat-conversation__reply","typing...");
            setTimeout(()=>{
                //send stored article ele to fetchReply so that it can be edited when data is fetched
                fetchReply(typingChatBox);
            },1000)
        },1000)

      
        flag = false;

    }

})





//create and append message box
function creatAndAppendChatBox(convType,message){
    //create outer element
    const chatEle = document.createElement("div");

    //add proper class according to who's chat
    const animType = (convType === "chat-conversation__user")?"message-container--right":"message-container--left";
    chatEle.classList.add("chat-conversation__message-container",animType)
    
    //if its reply then profile should be there according to design
    const chatProfile = (convType === "chat-conversation__reply")?`<div class="chat-conversation__profile"></div>`:"";

    //add chatbox html inside chatEle
    chatEle.innerHTML =  `
                ${chatProfile}
                <article class="chat-conversation__box ${convType}">
                </article>
        `
    //select added article and append message inside that
    //html tags are treated as text now
    chatEle.querySelector("article").innerText = message.toString();
    //append chatEle to chat conversation
    chatConv.append(chatEle)

    //make it scroll down by default when new message is added
    chatConv.scrollTop = chatConv.scrollHeight;
    //add animation
    addAnimationClass(chatEle,"add-animation")

    //return chatEle article element
    //returning is used only for fetchReply
    //we add "typing..." as def message to "chat reply box" when user send's message, after 1 sec delay
    //will fetch data from api and that text to the returned article element in fetchReply function
    return chatEle.querySelector("article");
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