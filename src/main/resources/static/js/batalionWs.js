var stompClient = null;

function connect() {
    stompClient = Stomp.client('ws://' + location.host + '/position');
    stompClient.connect({}, function(frame) {
        stompClient.subscribe('/topic/position', function(msg) {
            let positionUpdate = JSON.parse(msg.body);
            console.log("update", positionUpdate);
            document.getElementById(positionUpdate.id)
        });
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