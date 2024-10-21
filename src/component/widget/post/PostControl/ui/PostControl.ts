export class PostControl extends HTMLElement {
    constructor (private readonly _likeButton?: HTMLButtonElement | null) {
        super();
    }

    connectedCallback () {
        this.innerHTML = `
            <button data-type="forward">Forward</button>
            <button data-type="comment">Comment</button>
        `;

        if (this._likeButton) {
            this.prepend(this._likeButton);
        }
    }
}