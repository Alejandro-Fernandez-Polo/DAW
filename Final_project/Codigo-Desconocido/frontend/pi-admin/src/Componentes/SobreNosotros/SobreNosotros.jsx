import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../Home/nav.js';
import logo from '../Assets/imagesHero/logo.png'
import './SobreNosotros.css';
import img1sobre from '../Assets/imagesSobreNosotros/img1-section-1-sobrenosotros.png'
import img2sobre from '../Assets/imagesSobreNosotros/img2-section-1-sobrenosotros.png'

export const handleSignInClick = () => {
    window.location.href = '#';
}

export const SobreNosotros = () => {

    return (
        <div className='container'>
            <header role="banner" id = "cabecera">
                <div className="logo" onClick={handleSignInClick}>
                    <img src={logo} alt='logo' />
                </div>

                <button className="abrir-menu" id="abrir"><i className="bi bi-list"></i></button>

                <nav role="navigation" className="main-nav" id="nav">
                    <button className="cerrar-menu" id="cerrar"><i className="bi bi-x-lg"></i></button>
                    <ul className="list-nav">
                        <li className="list-nav-item"><a href="/" className="enlace">INICIO</a></li>
                        <li className="list-nav-item"><a href="sobrenosotros" className="link active">SOBRE NOSOTROS</a></li>
                        <li className="list-nav-item"><a href="scaperooms" className="enlace">SCAPE ROOMS</a></li>
                        <li className="list-nav-item"><a href="contact" className="enlace">CONTACTO</a></li>
                    </ul>
                </nav>
                <div className="icono-perfil">
                    <a href="perfil"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg></a>{sessionStorage.getItem('datosloginNombre')}
                </div>
            </header>

            <div id="hero-sobrenosotros">
                <div className="primera-linea-hero-sobrenosotros">
                    <p>SOBRE</p>
                </div>

                <div className="segunda-linea-hero-sobrenosotros">
                    <p>NOSOTROS</p>
                </div>

                <div className="scroll-down">
                    <p>SCROLL DOWN</p>
                </div>
            </div>

            <div className="section-1-sobrenosotros">
                <div className="titulo-section-1-sobrenosotros">
                    <h3>Nuestra historia</h3>
                    <h2>¿Quiénes somos?</h2>
                </div>
                <div className="section-1-sobrenosotros-content">
                    <div className="imagenes-section-1-sobrenosotros" id='img1sobre'>
                        <img src={img1sobre} alt="" />

                        <div className="imagenes-section-1-sobrenosotros" id='img2sobre'>
                            <img src={img2sobre} alt="" />
                        </div>
                        <div className="texto-section-1-sobrenosotros">
                            <p>En Código Desconocido, somos un <span className='bold'>equipo</span> apasionado de entusiastas de los juegos de escape y la tecnología.
                                Nuestra <span className='bold'>misión</span> es llevar la emoción y el desafío de los escape rooms directamente a tu dispositivo móvil,
                                ofreciendo una experiencia envolvente desde el primer clic. </p> <br />
                                <p>Creemos en el poder de la <span className='bold'>comunidad</span>. Únete a nosotros para
                                compartir tus experiencias, consejos y trucos favoritos con otros entusiastas de los
                                escape rooms. Ya seas un novato buscando tu primer desafío o un veterano en busca
                                de nuevas aventuras, nuestra plataforma tiene algo para todos.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-2-sobrenosotros">
                <div className="section-2-content">
                    <div className="titulo-section-2-sobrenosotros">
                        <h3>Nuestro equipo</h3>
                        <h2>¿Quiénes formamos parte?</h2>
                        <p>Creemos en el poder de la comunidad. Únete a nosotros para compartir tus experiencias, consejos y trucos favoritos con otros entusiastas de los escape rooms.
                            Ya seas un novato buscando tu primer desafío o un veterano en busca de nuevas aventuras, nuestra plataforma tiene algo para todos.</p>
                    </div>
                    <div className="equipo">
                        <div className="mate-container">
                            <div className="mate" id="mate-1">

                            </div>
                            <div className="text-mate">
                                <h5></h5>
                                <h4>Samuel Sánchez</h4>
                            </div>
                        </div>

                        <div className="mate-container">
                            <div className="mate" id="mate-2">

                            </div>
                            <div className="text-mate">
                                <h5></h5>
                                <h4>Miguel Rufino</h4>
                            </div>
                        </div>

                        <div className="mate-container">
                            <div className="mate" id="mate-3">

                            </div>
                            <div className="text-mate">
                                <h5></h5>
                                <h4>Juan Carlos Carballo</h4>
                            </div>
                        </div>

                        <div className="mate-container">
                            <div className="mate" id="mate-4">

                            </div>
                            <div className="text-mate">
                                <h5></h5>
                                <h4>Tatiana Fuentes</h4>
                            </div>
                        </div>

                        <div className="mate-container">
                            <div className="mate" id="mate-5">

                            </div>
                            <div className="text-mate">
                                <h5></h5>
                                <h4>Alejandro Fernandez</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-3-sobrenosotros">
                <div className="section-3-content">
                    <div className="titulo-section-3-sobrenosotros">
                        <h3>Nuestra filosofia</h3>
                        <h2>Valores y Creencias</h2>
                        <p>Nuestra filosofía se basa en la integridad, la innovación y el compromiso con la excelencia. Creemos en hacer las cosas de manera diferente, impulsados por la pasión de crear soluciones que marquen la diferencia.</p>
                    </div>

                    <div className="rectangulo-nuestra-filosofia">
                        <div className="header-filosofia">
                            <h3>AMBIENTE TENEBROSO</h3>
                        </div>
                        <div className="parrafo-filosofia">
                            <p>¿Podrás salir antes de que sea demasiado tarde?</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-4-sobrenosotros">
                <div className="section-4-content">
                    <div className="titulo-section-4-sobrenosotros">
                        <h3>Conocenos</h3>
                        <h2>Nuestras instalaciones</h2>
                        <p>Te invitamos a descubrir nuestras instalaciones, un espacio donde cada detalle ha sido cuidadosamente diseñado para brindarte una experiencia única e inolvidable.</p>
                    </div>
                    <div className="gallery">
                        <div className="item"></div>
                        <div className="item"></div>
                        <div className="item"></div>
                    </div>
                    <div className="gallery">
                        <div className="item-2"></div>
                        <div className="item-2"></div>
                        <div className="item-2"></div>
                    </div>
                </div>
            </div>

            <footer id="pie-de-pagina">
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

export default SobreNosotros;