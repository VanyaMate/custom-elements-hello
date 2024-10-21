export class Router extends HTMLElement {
    constructor () {
        super();
    }

    async connectedCallback () {
        this.innerHTML              = 'Loading posts page...';
        const { default: PostPage } = await new Promise<typeof import('@/component/page/posts-page/ui/PostsPage.ts')>((resolve) => {
            setTimeout(() => {
                resolve(import('@/component/page/posts-page/ui/PostsPage.ts'));
            }, 1000);
        });
        this.innerHTML              = '';
        this.append(PostPage);
    }
}