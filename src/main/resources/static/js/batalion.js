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
    }

    move(x, y, status){
        let node = this.shadowRoot.querySelector('#batalion');
        let newX = x - (this.offset.x);
        let newY = y - (this.offset.y);
        this.position.x = newX;
        this.position.y = newY;
        node.style.left = newX + 'px';
        node.style.top = newY + 'px';
        this.setAttribute('posX', newX);
        this.setAttribute('posY', newY);
        sendMessage({
            id: this.getAttribute('id'),
            x: newX,
            y: newY,
            status: status
        });
        this.shadowRoot.querySelector('#pos').innerHTML = "(" + newX + ", " + newY + ")";
    }

    drag(ev) {
        this.move(ev.clientX, ev.clientY, "MOVE");
    }

    dragend(ev) {
        console.log("dragend");
        this.move(ev.clientX, ev.clientY, "MOVED");
        this.position = null;
        this.offset = null;
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

        node.addEventListener("position-update-" + this.getAttribute('id'), function (e) {
            console.log(e);
        });
    }

    disconnectedCallback() {
        console.log("disconnectedCallback");
        this.shadowRoot.querySelector('#batalion').removeEventListener();
    }
}

window.customElements.define('batalion-comp', Batalion);