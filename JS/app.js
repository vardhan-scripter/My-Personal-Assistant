const btn = document.querySelector('#talk');
const content = document.querySelector('#content');
const record = document.querySelector('#record');

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

document.querySelector('#initial_time').textContent = new Date().toLocaleTimeString();

const commands = ["how are you","who are you","why are you"];

const answers = ["I am great!, what about you","I am your personal assistance designed by you","I am here to help you"];


const appendmessage = (class1,class2,class3,message) =>{
    let today = new Date().toLocaleTimeString();
    var node = document.createElement("div");
    node.classList.add("userd-flex");
    node.classList.add(class1);
    node.classList.add("mb-4");
    var subnode = document.createElement("div");
    subnode.classList.add(class2);
    var textnode = document.createTextNode(message);
    var time = document.createElement("span");
    time.classList.add(class3);
    var timetext = document.createTextNode(today);
    time.appendChild(timetext);
    subnode.appendChild(textnode);
    subnode.appendChild(time);
    node.appendChild(subnode);
    content.appendChild(node);
}


recognition.onstart = function() {
    console.log("voice recognition activated");
    
};

recognition.onresult = function(event) {
    record.innerHTML='<button id="talk" class="talk" onclick="assistant()"><img src="Images/send.png" class="send_button"></button>';
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    appendmessage("ustify-content-end","msg_cotainer_send","msg_time_send",transcript);
    readOutLoud(transcript);
};

const assistant = function(){
    recognition.start();
    record.innerHTML='<p class="talk">recording...</p>';
};

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "I dont recognize you";
    const description = "Your request to changing of ";
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        if(message.includes(command)){
            speech.text = answers[i];
            break;
        }
        
    }
    appendmessage("ustify-content-start","msg_cotainer","msg_time",speech.text);
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}