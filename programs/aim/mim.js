const msgSound = new Audio("msg.mp3");
const body = document.getElementById("body");
const usernameBox = document.getElementById("usernamefield");
const chatInput = document.getElementById("chatinput");
const loginWindow = document.getElementById("loginwindow");
const chatWindow = document.getElementById("chatwindow");
const chatLog = document.getElementById("chatlog");
var hostname = "forkievm.ddns.net";
var conn = new WebSocket("wss://" + hostname + ":6003");
const connTimeout = setTimeout(connErr, 10000);
var username;
var loggedIn;
function connErr() {
    console.log("Websocket connection error");
    window.parent.postMessage("mimconnerr", '*');
    window.close();
}
conn.onerror = function(error) {
    clearTimeout(connTimeout);
    connErr();
};
conn.onopen = function(e) {
    clearTimeout(connTimeout);
    body.style.display = "block";
    console.log("[open] Connection established");
};
conn.onmessage = function(event) {
    console.log(`ws: ${event.data}`);
    if (event.data.substring(0, 6) == "logon,") {
        loggedIn = true;
        loginWindow.style.display = "none";
        chatWindow.style.display = "block";
    }
    if (event.data.substring(0, 5) == "chat,") {
        var rawmsg = event.data.substring(5);
        var sender = rawmsg.substring(0, rawmsg.indexOf(","));
        var msg = rawmsg.substring(rawmsg.indexOf(",") + 1);
        var el = document.createElement("div");
        el.classList.add("chatmsg");
        el.innerHTML = "<strong>" + sender + "&gt;</strong> " + msg;
        chatLog.appendChild(el);
        msgSound.play();
    }
    if (event.data == "usernametaken") {
        window.parent.postMessage("mimusernametaken", '*');
    }
};
conn.close = function(){connErr();};
function logon() {
    if (usernameBox.value == "") {
        return;
    }
    conn.send("identify," + usernameBox.value);
}
function sendMsg(msga) {
    var msg;
    if (chatInput.value == "" && msga === undefined) {
        return;
    }
    else if (msga === undefined) {
        msg = chatInput.value;
    } else {
        msg = msga;
    }
    conn.send("chat," + msg);
    chatInput.value = "";
}
