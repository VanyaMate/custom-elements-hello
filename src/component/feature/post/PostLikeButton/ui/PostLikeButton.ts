import css from './PostLikeButton.module.css';

// Надо понять как это делать удобнее, но вообще кайф

export class PostLikeButton extends HTMLButtonElement {
    constructor (postId: string, liked: boolean, amount: number) {
        super();
        this.className = css.container;

        this.setAttribute('liked', liked.toString());
        this.setAttribute('amount', amount.toString());
        this.addEventListener('click', () => {
            if (liked) {
                console.log(`Unlike ${ postId }`);
                this.setAttribute('liked', (!liked).toString());
                this.setAttribute('amount', amount.toString());
            } else {
                console.log(`Like ${ postId }`);
                this.setAttribute('liked', (!liked).toString());
                this.setAttribute('amount', (amount + 1).toString());
            }
            liked = !liked;
        });

        if (liked) {
            this._render((amount + 1).toString());
            this.classList.add(css.liked);
        } else {
            this._render(amount.toString());
        }
    }

    static get observedAttributes () {
        return [ 'liked', 'amount' ];
    }

    attributeChangedCallback (name: string, _: string, newValue: string) {
        switch (name) {
            case 'liked':
                if (newValue === 'true') {
                    this.classList.add(css.liked);
                } else {
                    this.classList.remove(css.liked);
                }
                break;
            case 'amount':
                this._render(newValue);
                break;
            default:
                break;
        }
    }

    private _render (amount: string) {
        this.innerHTML = `Likes: (${ amount })`;
    }
}