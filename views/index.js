var addMessageWithDelay = delay(addMessage, 1500);
var addMessageInfoWithDelay = delay(addInfoMessage, 1500);
var addInputBoxWithDelay = delay(addInputBox, 2000)

addMessage("Здравствуйте! Я юрист-консультант сайта. Чем я могу вам помочь?",1)
addMessageWithDelay("моя консультация бесплатна, задавайте вопросы",1);
addInputBoxWithDelay()  

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
    
        addMessageWithDelay("Спасибо. В течение нескольких минут я подготовлю ответ на ваш вопрос",1);
        addMessageWithDelay("Оставьте свой телефон ниже, я вам перезвоню и проконсультирую",1);
        addMessageInfoWithDelay();
}
function secondAction(){

    if($("#name").val() != "" && $("#phone").val() != "" && $("#time").val() != ""){
    var xhr = new XMLHttpRequest();

    var body = 'name=' + encodeURIComponent($("#name").val()) +
      '&phone=' + encodeURIComponent($("#phone").val()) +
      '&time=' + encodeURIComponent($("#time").val());
    
    xhr.open("POST", '/chatMessage', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.send(body);

    $("#infoBTN").remove()
    addMessage("Спасибо! Мы скоро свяжемся с вами!",1)
}
}