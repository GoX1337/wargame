const template = document.createElement('template');
template.innerHTML = `
    <style>
        div {
            color: darkslategrey;
            border: 3px solid darkslategrey;
            height: 50px; 
            width: 200px; 
            position: absolute;
            cursor: grab;
        }
    </style>
    <div id="batalion" draggable="true" class="box">
        <span id="pos"><span>
    </div>
`;

class Batalion extends HTMLElement {

    position = {};
    offset = {};

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    toggleInfo() {
        console.log("clicked")
        console.log("position", this.getAttribute('posX'), this.getAttribute('posY'));
    }

    dragstart(ev) {
        console.log("dragstart");
        ev.dataTransfer.setDragImage(ev.target, window.outerWidth, window.outerHeight);
        this.position = {
            x: ev.clientX,
            y: ev.clientY
        };
        this.offset = {
            x: ev.offsetX,
            y: ev.offsetY
        };

        sendMessage("/topic/drag/start", {
            id: this.getAttribute('id'),
            position: this.position,
            offset: this.offset
        });
    }

    move(x, y, status, isFromOtherClient){
        console.log(status === "MOVE" ? "MOVE" : "MOVED", x, y, status, this.offset);
        let node = this.shadowRoot.querySelector('#batalion');
        let newX = x - (this.offset.x);
        let newY = y - (this.offset.y);
        this.position.x = newX;
        this.position.y = newY;
        node.style.left = newX + 'px';
        node.style.top = newY + 'px';
        this.setAttribute('posX', newX);
        this.setAttribute('posY', newY);

        if(!isFromOtherClient){
            sendMessage("/app/position", {
                id: this.getAttribute('id'),
                position: { x: x, y: y},
                offset: { x: this.offset.x, y: this.offset.y},
                status: status
            });
        }
        this.shadowRoot.querySelector('#pos').innerHTML = "(" + newX + ", " + newY + ")";
    }

    drag(ev) {
        this.move(ev.clientX, ev.clientY, "MOVE", false);
    }

    dragend(ev) {
        console.log("dragend");
        this.move(ev.clientX, ev.clientY, "MOVED", false);
    }

    connectedCallback() {
        console.log("connectedCallback");
        let node = this.shadowRoot.querySelector('#batalion');
        let x = this.getAttribute('posX');
        let y = this.getAttribute('posY');
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        this.shadowRoot.querySelector('#pos').innerHTML = "(" + x + ", " + y + ")";
    
        node.addEventListener('click', () => this.toggleInfo());
        node.addEventListener('drag', (ev) => this.drag(ev));
        node.addEventListener('dragstart', (ev) => this.dragstart(ev));
        node.addEventListener('dragend', (ev) => this.dragend(ev));

        this.addEventListener("position-update-" + this.getAttribute('id'), (msg) => {
            console.log("update position from external source");
            let update = msg.detail;
            console.log(update);
            this.offset = update.offset;
            this.move(update.position.x, update.position.y, update.status, true);
        });

        this.addEventListener("drag-start-" + this.getAttribute('id'), (msg) => {
            console.log("drag-start", msg.detail);
            this.position = msg.detail.position;
            this.offset = msg.detail.offset;
        });
    }

    disconnectedCallback() {
        console.log("disconnectedCallback");
        this.shadowRoot.querySelector('#batalion').removeEventListener();
    }
}

window.customElements.define('batalion-comp', Batalion);