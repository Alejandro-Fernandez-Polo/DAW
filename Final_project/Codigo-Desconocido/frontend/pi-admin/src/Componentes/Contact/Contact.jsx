import React, { useState } from 'react';
import Nav from '../Home/nav.js';
import logo from '../Assets/imagesHero/logo.png';
import './Contact.css';

export const handleSignInClick = () => {
    window.location.href = '#';
}

export const Contact = () => {

    return (
        <div className='container'>
            <header role="banner" id="cabecera">
                <div className="logo" onClick={handleSignInClick}>
                    <img src={logo} alt='logo' />
                </div>

                <button className="abrir-menu" id="abrir"><i className="bi bi-list"></i></button>

                <nav role="navigation" className="main-nav" id="nav">
                    <button className="cerrar-menu" id="cerrar"><i className="bi bi-x-lg"></i></button>
                    <ul className="list-nav">
                        <li className="list-nav-item"><a href="/" className="enlace">INICIO</a></li>
                        <li className="list-nav-item"><a href="sobrenosotros" className="enlace">SOBRE NOSOTROS</a></li>
                        <li className="list-nav-item"><a href="scaperooms" className="enlace">SCAPE ROOMS</a></li>
                        <li className="list-nav-item"><a href="contact" className="link active">CONTACTO</a></li>
                    </ul>
                </nav>
                <div className="icono-perfil">
                    <a href="perfil"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg></a>{sessionStorage.getItem('datosloginNombre')}
                </div>
            </header>

            <div id="hero-contact">
                <div className="primera-linea-hero-contact">
                    <p>TE VES</p>
                </div>

                <div className="segunda-linea-hero-contact">
                    <p>CAPAZ?</p>
                </div>

                <div className="scroll-down">
                    <p>SCROLL DOWN</p>
                </div>
            </div>

            <div className="rectangulo-reach-us-1">
                <div className="rectagunlo-reach-us">
                    <h2>Dinos algo !!, estamos aquí para ayudarlo</h2>
                </div>
            </div>

            <div className="section-1-contact">
                <div className="seccion-de-contacto">
                    <div className="image-contact-section-1">

                    </div>

                    <div className="section-form-contact">
                        <form action="" id="form-contacto">
                            <input className='inputsContact' type="text" id="name" name="name" placeholder="NOMBRE" required />

                            <input className='inputsContact' type="tel" id="phone" name="phone" placeholder="TELÉFONO" required />

                            <input className='inputsContact' type="email" id="email" name="email" placeholder="EMAIL" required />

                            <textarea className='textareaContact' id="project" name="project" placeholder="DINOS LO QUE QUIERAS" rows="4"
                                required></textarea>

                            <input className='inputsContact' id="btn" type="submit" value="Hablemos !!" />
                        </form>
                    </div>
                </div>
            </div>

            <div className="geolocalizacion">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6357.807293162282!2d-3.5975718090750934!3d37.17876074620472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1717767413874!5m2!1ses!2ses" width="600" height="450" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <footer id="pie-de-pagina-contact">
                <div className="contenedor-footer-top">
                    <div className="logo-footer">
                        <img src={logo} alt="" />
                    </div>

                    <div className="pages">
                        <h3>PÁGINAS</h3>
                        <a href="index" className="links">
                            <p>Home</p>
                        </a>
                        <a href="about" className="links">
                            <p>Sobre Nosotros</p>
                        </a>
                        <a href="shop" className="links">
                            <p>Scape Rooms</p>
                        </a>
                        <a href="contact" className="links">
                            <p>Contacto</p>
                        </a>
                    </div>

                    <div className="policies">
                        <h3>POLÍTICAS</h3>
                        <a href="home" className="links">
                            <p>Política de Privacidad</p>
                        </a>
                        <a href="home" className="links">
                            <p>Política de Cookies</p>
                        </a>
                        <a href="home" className="links">
                            <p>Condiciones y terminos</p>
                        </a>
                        <a href="home" className="links">
                            <p>Terminos de uso</p>
                        </a>
                    </div>

                    <div className="social-media">
                        <h3>REDES SOCIALES</h3>
                        <a href="home" className="links">
                            <p>
                                Instagram
                            </p>
                        </a>
                        <a href="home" className="links">
                            <p>
                                Twitter
                            </p>
                        </a>
                        <a href="home" className="links">
                            <p>
                                Youtube
                            </p>
                        </a>
                        <a href="home" className="links">
                            <p>
                                Facebook
                            </p>
                        </a>
                    </div>
                </div>

                <div className="contenedor-footer-bottom">
                    <p>© Código Desconocido 2024 ( Todos los derechos reservados )</p>
                </div>
            </footer>
            <Nav />
        </div>
    )
}

export default Contact;