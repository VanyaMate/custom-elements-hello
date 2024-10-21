export class Counter extends HTMLElement {
    static get observedAttributes () {
        return [ 'count' ];
    }

    connectedCallback () {
        if (!this.getAttribute('count')) {
            this.setAttribute('count', '0');
        }
        this.addEventListener('click', () => this.setAttribute('count', (parseInt(this.getAttribute('count') ?? '0') + 1).toString()));
        this._render();
    }

    attributeChangedCallback (name: string, oldValue: string, newValue: string) {
        console.log(`Attribute [${ name }] changed from [${ oldValue }] to [${ newValue }].`);
        this._render();
    }

    private _render () {
        this.innerHTML = `Count: ${ this.getAttribute('count') }`;
    }
}