import {
    Post,
    PostPreview,
} from '../../../entity/post/PostPreview/ui/PostPreview.ts';
import {
    PostControl,
} from '../../../widget/post/PostControl/ui/PostControl.ts';
import {
    PostLikeButton,
} from '../../../feature/post/PostLikeButton/ui/PostLikeButton.ts';


customElements.define('web-post-preview', PostPreview);
customElements.define('web-post-control', PostControl);
customElements.define('web-post-like-button', PostLikeButton, { extends: 'button' });


type JsonPlaceholderPost = {
    userId: number,
    id: number,
    title: string,
    body: string
};

class PostsPage extends HTMLElement {
    constructor () {
        super();
        this._renderLoader();
        this._getPosts().then(this._renderPosts.bind(this));
    }

    private _renderLoader () {
        this.innerHTML = 'Loading..';
    }

    private _getPosts () {
        return fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then(this._convertJsonPlaceholderPostToDomain);
    }

    private _renderPosts (posts: Array<Post>) {
        this.innerHTML = '';
        posts.forEach((post) => {
            this.append(
                new PostPreview(
                    post,
                    null,
                    new PostControl(
                        new PostLikeButton(post.id, true, 1000),
                    ),
                ),
            );
        });
    }

    private _convertJsonPlaceholderPostToDomain (posts: Array<JsonPlaceholderPost>): Array<Post> {
        return posts.map((post) => {
            return {
                id          : post.id.toString(),
                title       : `[${ post.id }] ${ post.title }`,
                message     : post.body,
                author      : {
                    login : 'Vanya',
                    avatar: 'https://cms.imgworlds.com/assets/9558de9d-1e49-437e-aa7b-b8bd4d999b00.jpg?key=home-gallery',
                },
                creationDate: Date.now(),
            };
        });
    }
}


customElements.define('web-post-page', PostsPage);

export default new PostsPage();