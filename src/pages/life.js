import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import PostGrid from '../components/common/post-grid'
import withTitle from '../components/common/with-title'
import {GET_POSTS_BY_CATEGORIES_QUERY} from '../queries/posts'

const categories = ['Story', 'Life']

export default function Life({history}){

    const {data, error} = useQuery(GET_POSTS_BY_CATEGORIES_QUERY, {
        variables: {
            categories: categories
        }
    })

    if(error){
        return 'Oops! Something went sideways.'
    }

    return withTitle(
        'Life',
        data?.posts ? <PostGrid posts={data.posts}/> : 'Loading'
    )
}