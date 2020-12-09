import React from 'react'

const Footer = () => {
    var year = new Date().toJSON().slice(0,4)
    return (
        <footer className="mt-auto">
            <p className="text-center py-2 my-0">{process.env.REACT_APP_SITE_NAME} { year } All Rights Reserved</p>
        </footer>
    )
}

export default Footer
