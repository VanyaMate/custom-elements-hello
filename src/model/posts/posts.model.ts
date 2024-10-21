import { getPosts, Post } from '@/action/posts/getPosts/getPosts.ts';
import { effect, store } from '@vanyamate/sec';


export const getPostsEffect = effect(getPosts);

export const postsPending = store<boolean>(false)
    .on(getPostsEffect, 'onBefore', () => true)
    .on(getPostsEffect, 'onFinally', () => false);

export const posts = store<Array<Post>>([])
    .on(getPostsEffect, 'onSuccess', (_, { result }) => result!);