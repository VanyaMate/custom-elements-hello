export type JsonPlaceholderPost = {
    userId: number,
    id: number,
    title: string,
    body: string
};

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

export const convertJsonPlaceholderPostsToDomain = function (posts: Array<JsonPlaceholderPost>): Array<Post> {
    return posts.map((post) => {
        return {
            id          : post.id.toString(),
            title       : post.title,
            message     : post.body,
            creationDate: Date.now(),
            author      : {
                login : `Vanya${ post.userId }`,
                avatar: 'https://cms.imgworlds.com/assets/9558de9d-1e49-437e-aa7b-b8bd4d999b00.jpg?key=home-gallery',
            },
        };
    });
};

export const getPosts = function () {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then(convertJsonPlaceholderPostsToDomain);
};