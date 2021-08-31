import gql from 'graphql-tag'

export const GET_POST_QUERY = gql`
    query GetPostQuery($id: ID!){
        post: getPost(id: $id){
            id
            author
            title
            text
            keyword1
            keyword2
            description
            image
            bg_src
            bg_type
            updated_at
        }
    }
`


export const GET_ALL_POSTS_QUERY = gql`
    query GetAllPosts{
        posts: getAllPosts{
            id
            title
            description
            updated_at
            author
            image
            categories
            categoryColors
        }
    }
`

export const GET_POSTS_BY_CATEGORIES_QUERY = gql`
    query GetBlogPostsByCategories($categories: [String]){
        posts: getPostsByCategories(categories: $categories){
            id
            title
            description
            updated_at
            author
            image
            categories
            categoryColors
        }
    }
`

export const GET_POSTS_BY_TYPE_QUERY = gql`
    query GetBlogPostsByType($type: String){
        posts: getPostsByType(type: $type){
            id
            title
            description
            updated_at
            author
            image
            categories
            categoryColors
        }
    }
`

