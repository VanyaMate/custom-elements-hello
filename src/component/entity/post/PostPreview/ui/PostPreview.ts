import css from './PostPreview.module.css';


export type Post = {
    id: string;
    title: string;
    message: string;
    creationDate: number;
    author: {
        login: string;
        avatar: string;
    }
}

export class PostPreview extends HTMLElement {
    constructor (
        private readonly _post: Post,
        private readonly _extraOptions?: HTMLElement | null,
        private readonly _extraFooter?: HTMLElement | null,
    ) {
        super();
    }

    connectedCallback () {
        this.className = css.container;
        this.role      = 'article';
        this.innerHTML = `
            <header>
                <div class="${ css.left }">
                    <img src="${ this._post.author.avatar }" alt="${ this._post.author.login } avatar">
                    <div class="${ css.info }">
                        <a href="#user-page/${ this._post.author.login }">${ this._post.author.login }</a>
                        <time datetime="${ this._post.creationDate }">${ this._post.creationDate }</time>
                    </div>
                </div>
            </header>
            <div class="${ css.content }">
                <h2>${ this._post.title }</h2>
                <p>${ this._post.message }</p>
            </div>
            <footer></footer>
        `;

        if (this._extraOptions) {
            this.querySelector('header')!.append(this._extraOptions);
        }

        if (this._extraFooter) {
            this.querySelector('footer')!.append(this._extraFooter);
        } else {
            this.querySelector('footer')!.remove();
        }
    }
}