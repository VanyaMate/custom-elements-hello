import {
    PostPreview,
} from '../../../entity/post/PostPreview/ui/PostPreview.ts';
import {
    PostControl,
} from '../../../widget/post/PostControl/ui/PostControl.ts';
import {
    PostLikeButton,
} from '../../../feature/post/PostLikeButton/ui/PostLikeButton.ts';
import { Post } from '@/action/posts/getPosts/getPosts.ts';
import {
    getPostsEffect,
    posts,
    postsPending,
} from '@/model/posts/posts.model.ts';


class PostsPage extends HTMLElement {
    private _unsubscribes: Array<() => void> = [];

    constructor () {
        super();
    }

    connectedCallback () {
        this._unsubscribes.push(postsPending.subscribe(this._renderLoader.bind(this)));
        this._unsubscribes.push(posts.subscribe(this._renderPosts.bind(this)));

        getPostsEffect();
    }

    disconnectedCallback () {
        this._unsubscribes.forEach((cb) => cb());
    }

    private _renderLoader (loading: boolean) {
        if (loading) {
            this.innerHTML = 'Loading..';
        }
    }

    private _renderPosts (posts: Array<Post>) {
        this.innerHTML = '';

        if (posts.length) {
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
        } else {
            this.innerHTML = 'No posts';
        }
    }
}


customElements.define('web-post-page', PostsPage);

export default new PostsPage();