import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <h1>Oops! This page doesn't exist</h1> 
            <Link to="/">
                Return to site
            </Link>
        </div>
    )
};

export default NotFound