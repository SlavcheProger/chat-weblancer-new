var flag = true;
var hidden = true;

var addMessageWithDelay1500 = delay(addMessage, 1500);
var addMessageWithDelay2500 = delay(addMessage, 2500);
var addMessageInfoWithDelay = delay(addInfoMessage, 3500);
var addInputBoxWithDelay2000 = delay(addInputBox, 2000)
var showChatWithDelay = delay(()=>{
    $("#chatBlock").css("bottom", "5px");
    hidden = false;
    $("#hide").html('-');
    addMessage("Здравствуйте! Я юрист-консультант сайта. Чем я могу вам помочь?",1)
    isWriting()
    addMessageWithDelay1500("моя консультация бесплатна, задавайте вопросы",1);
    isWriting()
    addInputBoxWithDelay2000()  
},3000)

addChatForm()
showChatWithDelay()

$("#hide").click(function(){
    let position = "5px";
    if(hidden == false){
        position = "-425px"
        hidden = true
        $("#hide").html('^');
    }
    else{
        hidden = false
        position = "5px";
        $("#hide").html('-');
    }
    $("#chatBlock").css("bottom", position);
});    

function isWriting(){

    try{
        $(".dots-gif").remove()
        $(".iswritingP").remove()
    }catch(ex){}
        $("<center><img class=\"dots-gif\" src=\"./dots-gif.gif\"></img><p class=\"iswritingP\">Подождите, вам пишут сообщение ... </p></center>").appendTo("#chat");
        scrollDown()
}
function addMessage(message, messageType){ 
    
$(".dots-gif").remove()
$(".iswritingP").remove()

    $("<button class=\"message"+messageType+"\">"+message+"</button></br>").appendTo("#chat");
    scrollDown()
}
function addInfoMessage(message, messageType){
      
$(".dots-gif").remove()
$(".iswritingP").remove()

    $("<button class=\"message1\">Укажите телефон и время когда вам удобно получить консультацию: <input class=\"inp\" id=\"phone\" placeholder=\"Номер телефона *\"><input class=\"inp\" id=\"name\" placeholder=\"Имя *\"><input class=\"inp\" id=\"time\" placeholder=\"Время для звонка *\"><button class=\"inp\" id=\"infoBTN\">Отправить</button></button></br>").appendTo("#chat");
    scrollDown()

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
    scrollDown()
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
    let msg = $("#chatInput").val();
    $("#chatInput").remove()
    $("#chatSendBtn").remove()
    
    addMessage(msg, 2)
        isWriting()
        addMessageWithDelay1500("Спасибо. В течение нескольких минут я подготовлю ответ на ваш вопрос",1);
        isWriting()
        addMessageWithDelay2500("Оставьте свой телефон ниже, я вам перезвоню и проконсультирую",1);
        isWriting()
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
    isWriting()
    addMessageWithDelay1500("Спасибо! Мы скоро свяжемся с вами!",1)

    flag = false
}
}

function addChatForm(){

    let form = "<div id=\"chatBlock\">"+
    "<img id=\"chat-img\" src=\"./20.jpg\">"+
    "<table id=\"chattable\">"+
    "<tr><td>Надежда Ивонина</td></tr>"+
    "<tr><td>Дежурный юрист</td></tr>"+
    "</table>"+
    "<button id=\"hide\">^</button>"+
    "<div id=\"chat\" style=\"height:400px;width:350px; overflow : auto;\">"+
    "</div></div>";

    $(form).appendTo("body");
    scrollDown()
}

function scrollDown(){
    var div = $("#chat");
    div.scrollTop(div.prop('scrollHeight'));
}