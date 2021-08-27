import gql from 'graphql-tag'


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

