import React from 'react';
import { Link } from "react-router-dom";
import {TagRow} from './';

export default function MasonryPost({post, tagsOnTop}){


    const windowWidth = window.innerWidth;
    const imageBackground = {backgroundImage: `url("${require(`../../assets/images/${post.image}`).default}")`};

    // This check is put in place so that the inline grid style shouldn't be applied for screens < 900px
    const style = windowWidth > 900 ? {...imageBackground, ...post.style} : imageBackground;

    return (
        <Link className='masonry-post overlay' style={style} to={`/post/${post.id}`} >
            <div className='image-text' style={{justifyContent: tagsOnTop ? 'space-between': 'flex-end'}}>
                <TagRow tags={post.categories} tagColors={post.categoryColors}/>
                <div>
                    <h2 className='image-title'>{post.title}</h2>
                    <span className='image-date'>{post.date}</span>
                </div>
            </div>
        </Link>
    )
}