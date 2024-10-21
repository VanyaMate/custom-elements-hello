import './index.css';
import { Counter } from './component/Counter.ts';
import {
    Post,
    PostPreview,
} from './component/entity/post/PostPreview/ui/PostPreview.ts';
import {
    PostControl,
} from './component/widget/post/PostControl/ui/PostControl.ts';
import {
    PostLikeButton,
} from './component/feature/post/PostLikeButton/ui/PostLikeButton.ts';


customElements.define('web-counter', Counter);
customElements.define('web-post-preview', PostPreview);
customElements.define('web-post-control', PostControl);
customElements.define('web-post-like-button', PostLikeButton, { extends: 'button' });


const getPostData = function (index: number, postId: string): Post {
    return {
        id          : postId,
        title       : `[${ index }] Title of ${ postId }`,
        message     : 'Message string',
        author      : {
            login : 'Vanya',
            avatar: 'https://cms.imgworlds.com/assets/9558de9d-1e49-437e-aa7b-b8bd4d999b00.jpg?key=home-gallery',
        },
        creationDate: Date.now(),
    };
};


const app = document.querySelector<HTMLDivElement>('#app')!;

for (let i = 0; i < 10; i++) {
    const postId: string = crypto.randomUUID();
    app.append(
        new PostPreview(
            getPostData(i, postId),
            null,
            new PostControl(
                new PostLikeButton(postId, true, 1000),
            ),
        ));
}
