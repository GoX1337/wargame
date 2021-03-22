var stompClient = null;

function connect() {
    stompClient = Stomp.client('ws://172.22.196.28:8080/position');
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
    });
}

function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage(pos) {
    stompClient.send("/app/position", {}, JSON.stringify(pos));
}

connect();