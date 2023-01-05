// En el Index.html se debe agregar el CDN de FontAwesome para que se vean los iconos
// Ej.:   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">

import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <a href='#'>
                            <i class='fab fa-facebook'></i>
                            <span>Facebook</span>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i class='fab fa-twitter'></i>
                            <span>Twitter</span>
                        </a>
                    </li >
                    <li>
                        <a href='#'>
                            <i class='fab fa-instagram'></i>
                            <span>Instagram</span>
                        </a >
                    </li >
                    <li>
                        <a href='#'>
                            <i class='fab fa-linkedin'></i>
                            <span>Linkedin</span>
                        </a >
                    </li >
                    <li>
                        <a href='#'>
                            <i class='fab fa-github'></i>
                            <span>Github</span>
                        </a >
                    </li >
                    <li>
                        <a href='#'>
                            <i class='fab fa-youtube'></i>
                            <span>Youtube</span>
                        </a >
                    </li >
                </ul >
            </nav >
        </>
    )
}
