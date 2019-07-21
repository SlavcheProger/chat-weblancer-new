var flag = true;
var hidden = true;

var addMessageWithDelay1500 = delay(addMessage, 1500);
var addMessageWithDelay2500 = delay(addMessage, 2500);
var addMessageInfoWithDelay = delay(addInfoMessage, 3500);
var addInputBoxWithDelay2000 = delay(addInputBox, 2000)
var showChatWithDelay = delay(()=>{$("#chatBlock").css("bottom", "5px");hidden = false;},3000)

showChatWithDelay()
addMessage("Здравствуйте! Я юрист-консультант сайта. Чем я могу вам помочь?",1)
addMessageWithDelay1500("моя консультация бесплатна, задавайте вопросы",1);
addInputBoxWithDelay2000()  

$("#hide").click(function(){
    let position = "5px";
    if(hidden == false){
        position = "-422px"
        hidden = true
    }
    else{
        hidden = false
        position = "5px";
    }
    $("#chatBlock").css("bottom", position);
});    


function addMessage(message, messageType){ 
    $("<button class=\"message"+messageType+"\">"+message+"</button></br>").appendTo("#chat");
}
function addInfoMessage(message, messageType){
    
    $("<button class=\"message1\">Укажите телефон и время когда вам удобно получить консультацию: <input class=\"inp\" id=\"phone\" placeholder=\"Номер телефона *\"><input class=\"inp\" id=\"name\" placeholder=\"Имя *\"><input class=\"inp\" id=\"time\" placeholder=\"Время для звонка *\"><button class=\"inp\" id=\"infoBTN\">Отправить</button></button></br>").appendTo("#chat");

    $("#infoBTN").click(function(){
        secondAction()
    });    
    $(".inp").keyup(function(e){
        if(e.key == "Enter" && $("#chatInput").val()!= ""){
            secondAction()
        }  
    });

}
function delay(f, ms) {

    return function() {
      var savedThis = this;
      var savedArgs = arguments;
  
      setTimeout(function() {
        f.apply(savedThis, savedArgs);
      }, ms);
    };
  
  }
function addInputBox(){
    $("<input id=\"chatInput\" placeholder=\"Введите ваше сообщение ...\"><button id=\"chatSendBtn\">></button>").appendTo("#chat");

    $("#chatSendBtn").click(function(){
        if($("#chatInput").val()!= "") firstAction()
    });

    $("#chatInput").keyup(function(e){
        if(e.key == "Enter" && $("#chatInput").val()!= ""){
            firstAction()
        }  
    });
}
function firstAction(){
    addMessage($("#chatInput").val(), 2)

        $("#chatInput").remove()
        $("#chatSendBtn").remove()
    
        addMessageWithDelay1500("Спасибо. В течение нескольких минут я подготовлю ответ на ваш вопрос",1);
        addMessageWithDelay2500("Оставьте свой телефон ниже, я вам перезвоню и проконсультирую",1);
        addMessageInfoWithDelay();
}
function secondAction(){

    if($("#name").val() != "" && $("#phone").val() != "" && $("#time").val() != "" && flag == true){
    var xhr = new XMLHttpRequest();

    var body = 'name=' + encodeURIComponent($("#name").val()) +
      '&phone=' + encodeURIComponent($("#phone").val()) +
      '&time=' + encodeURIComponent($("#time").val());
    
    xhr.open("POST", '/chatMessage', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.send(body);

    $("#infoBTN").remove()
    addMessageWithDelay1500("Спасибо! Мы скоро свяжемся с вами!",1)

    flag = false
}
}