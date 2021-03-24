let stompClient = null;

var uuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c =>(c^(window.crypto||window.msCrypto).getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));
const wsSourceId = uuid();

function connect() {
    stompClient = Stomp.client('ws://' + location.host + '/position');
    stompClient.debug = null;
    stompClient.connect({}, (frame) => {
        stompClient.subscribe('/topic/position', (msg) => {
            let positionUpdate = JSON.parse(msg.body);
            if(wsSourceId !== positionUpdate.eventSource){
                let eventMsg = { bubbles: true, composed: true, detail: positionUpdate };
                let event = new CustomEvent('position-update-' + positionUpdate.id, eventMsg);
                document.getElementById(positionUpdate.id).dispatchEvent(event);
            }
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
    pos.eventSource = wsSourceId;
    console.log("sendMessage from :", wsSourceId);
    stompClient.send("/app/position", {}, JSON.stringify(pos));
}

connect();