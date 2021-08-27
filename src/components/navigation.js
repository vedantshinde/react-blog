import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import { Avatar } from 'antd';

const navLinks = [
    {
        title: 'Books',
        path: '/books'
    },
    {
        title: 'Entertainment',
        path: '/entertainment'
    },
    {
        title: 'Life',
        path: '/life'
    },
    {
        title: 'Learnings',
        path: '/learnings'
    },
    {
        title: 'Login',
        path: '/login'
    }
];


let useCloseOnClickOutside = (userHandler) => {
    let domNode = useRef();

    useEffect(() =>{

        let handler = (event) =>{

            if(!domNode.current.contains(event.target)){
                userHandler();
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    return domNode;
}

export default function Navigation({user}){

    const [menuActive, setMenuActive] = useState(false);

    let navBarRef = useCloseOnClickOutside(() => {
        setMenuActive(false);
    })

    return(
        <nav ref={navBarRef} className='site-navigation'>
            <span className='menu-title'>Vedant's Blog</span>
            <div className={`menu-content-container ${menuActive && 'active'}`}>
                <ul>
                    {
                        navLinks.map((link, index) =>{
                            return(<li key={index}>
                                <Link to={link.path}>{link.title}</Link>
                            </li>)
                        })
                    }
                </ul>

            <span className='menu-avatar-container'>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={38}/>
                <span className='menu-avatar-name'>{`${user.firstName} ${user.lastName}`}</span>
            </span>
            </div>

            <i className='ionicons icon ion-ios-menu' onClick={() => setMenuActive(!menuActive)}/>
        </nav>
    )
}