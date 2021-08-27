import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import PostGrid from '../components/common/post-grid'
import withTitle from '../components/common/with-title'
import {GET_POSTS_BY_CATEGORIES_QUERY} from '../queries/posts'

const categories = ["Books"]

export default function Books ({history}){

    const {data, error} = useQuery(GET_POSTS_BY_CATEGORIES_QUERY, {
        variables: {
            categories: categories
        }
    })

    if(error){
        return 'Oops! Something went sideways.'
    }

    return withTitle(
        'Books',
        data?.posts ? <PostGrid posts={data.posts}/> : 'Loading'
    )
}