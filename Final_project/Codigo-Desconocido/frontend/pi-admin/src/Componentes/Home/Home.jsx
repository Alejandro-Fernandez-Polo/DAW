import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

import Nav from './nav.js';
import Letters from './HackLetters.js';
import logo from '../Assets/imagesHero/logo.png'
import cartel1 from '../Assets/imagesHero/cartel-1.png'
import cartel2 from '../Assets/imagesHero/cartel-2.png'
import cartel3 from '../Assets/imagesHero/cartel-3.png'
import cartel4 from '../Assets/imagesHero/cartel-4.png'
import cartel5 from '../Assets/imagesHero/cartel-5.png'

import './Home.css';

export const handleSignInClick = () => {
    window.location.href = '#';
}

export const Home = () => {
    useEffect(() => {
        const sections = document.querySelectorAll('.section-1, .section-2, .section-3, .section-4');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('section-1')) {
                        anime({
                            targets: '.section-1 .text-project, .section-1 .imagen-project',
                            translateX: [50, 0],
                            opacity: [0, 1],
                            duration: 2000,
                            easing: 'easeOutExpo',
                            delay: anime.stagger(100, { start: 1000 }),
                            complete: () => observer.unobserve(entry.target)
                        });
                    } else if (entry.target.classList.contains('section-2')) {
                        anime({
                            targets: '.section-2 .text-que-hacer, .section-2 .imagen-que-hacer',
                            translateX: [50, 0],
                            opacity: [0, 1],
                            duration: 2000,
                            easing: 'easeOutExpo',
                            delay: anime.stagger(100, { start: 1000 }),
                            complete: () => observer.unobserve(entry.target)
                        });
                    } else if (entry.target.classList.contains('section-3')) {
                        anime({
                            targets: '.section-3 .text-section-3',
                            translateY: [50, 0],
                            opacity: [0, 1],
                            duration: 2000,
                            easing: 'easeOutExpo',
                            delay: anime.stagger(100, { start: 1000 }),
                            complete: () => observer.unobserve(entry.target)
                        });
                    } else if (entry.target.classList.contains('section-4')) {
                        anime({
                            targets: '.section-4 .text-our-best-scaperooms, .section-4 .slide img',
                            translateX: [50, 0],
                            opacity: [0, 1],
                            duration: 2000,
                            easing: 'easeOutExpo',
                            delay: anime.stagger(200, { start: 1000 }),
                            complete: () => observer.unobserve(entry.target)
                        });
                    }
                }
            });
        }, {
            threshold: 0.25 // Ajusta este valor según tus necesidades
        });

        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, []);
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
                        <li className="list-nav-item"><a href="/" className="link active">INICIO</a></li>
                        <li className="list-nav-item"><a href="sobrenosotros" className="enlace">SOBRE NOSOTROS</a></li>
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

            <div id="hero">
                <div className="primera-linea-hero-home">
                    <p data-value="CODIGO" className="hackletters">CODIGO</p>
                </div>

                <div className="segunda-linea-hero-home">
                    <p data-value="DESCONOCIDO" className="hackletters">DESCONOCIDO</p>
                </div>

                <div className="scroll-down">
                    <p>SCROLL DOWN</p>
                </div>
            </div>

            <div className="section-1">
                <div className="our-project">
                    <div className="text-project">
                        <h3>Nuestro Proyecto</h3>
                        <h2>Codigo Desconocido</h2>
                        <p><span className='bold'>Código Desconocido</span> es mucho más que una simple aplicación de reserva de escape
                            rooms, es tu pasaporte a un mundo de intriga, desafíos y diversión sin límites donde
                            cada reserva es el comienzo de una <span className='bold'>emocionante odisea</span> donde cada paso te acerca
                            más al corazón del enigma y la emoción!</p>

                        <p>¿Cómo nació esta emocionante iniciativa? Todo comenzó como un proyecto de clase en la
                            asignatura de <span className='bold'>empresas</span>. Inspirados por nuestra pasión por los juegos de escape y la tecnología,
                            nos propusimos crear algo único: una <span className='bold'>plataforma</span> que no solo facilitara la reserva de escape rooms,
                            sino que también proporcionara una experiencia envolvente desde el momento en que abres la aplicación.</p>

                        <p> Así es como nació Código Desconocido: una <span className='bold'>fusión</span> perfecta entre el mundo físico de los escape rooms
                            y el poder de la tecnología digital. Desde entonces, hemos estado trabajando incansablemente para
                            llevar la <span className='bold'>emoción</span> y el <span className='bold'>desafío</span> de los escape rooms directamente a tu dispositivo móvil.</p>

                    </div>
                    <div className="imagen-project">

                    </div>
                </div>
            </div>

            <div className="section-2" id="section-2">
                <div className="que-hacer">
                    <div className="imagen-que-hacer">

                    </div>
                    <div className="text-que-hacer">
                        <h3>Descubre lo desconocido</h3>
                        <h2>¿Qué puedes hacer en la web?</h2>
                        <p>En <span className='bold'>Código Desconocido</span>, te ofrecemos una experiencia completa donde la diversión y la aventura
                            están a solo un <span className='bold'>click</span> de distancia. ¿Qué puedes hacer en nuestra plataforma?</p>
                        <p>-  <span className='bold'>Reservar Escape Rooms</span>: Explora una amplia selección de emocionantes escape rooms y reserva
                            tu próxima aventura con facilidad. Desde misterios históricos hasta desafíos modernos, tenemos
                            algo para todos los amantes de los enigmas y la intriga.</p>
                        <p>- <span className='bold'>Conectar con Otros Aficionados</span>: Únete a nuestra comunidad de entusiastas de los escape rooms
                            y comparte tus experiencias, consejos y trucos favoritos. ¡Conoce a otros jugadores apasionados y
                            sumérgete en conversaciones emocionantes sobre tus aventuras de escape favoritas!</p>
                        <p>- <span className='bold'>Solicitar la Adición de tu Escape Room</span>: ¿Tienes tu propio escape room y te gustaría que aparezca
                            en nuestra aplicación? ¡Nos encantaría conocerlo! Envíanos los detalles de tu escape room y
                            trabajaremos para agregarlo a nuestra plataforma, brindándote una mayor visibilidad.</p>
                    </div>
                </div>
            </div>

            <div className="section-3">
                <div className="text-section-3">
                    <p>“Challenge your mind, escape to adventure!”</p>
                    <p>Every door is a new challenge, are you brave enough to open it?</p>
                </div>
            </div>

            <div className="section-4">
                <div className="our-best-scaperooms">
                    <div className="text-our-best-scaperooms">
                        <h3>Nuestro Proyecto</h3>
                        <h2>Scape-Rooms más reservados</h2>
                        <p>Bienvenido a la élite de la aventura: los escape rooms más reservados de Código Desconocido. Sumérgete en una experiencia única donde el
                            tiempo es tu enemigo y la astucia es tu mejor aliado. Nuestros escape rooms han sido cuidadosamente diseñados para desafiar tus habilidades
                            mentales, tu trabajo en equipo y tu capacidad para resolver enigmas en un entorno lleno de emoción y misterio.</p>

                    </div>
                    <div class="carousel-container">
                        <div className="galeria">
                            <div className="slide" id="foto1">
                                <img src={cartel1} alt="" />
                            </div>

                            <div className="slide" id="foto2">
                                <img src={cartel2} alt="" />
                            </div>

                            <div className="slide" id="foto3">
                                <img src={cartel3} alt="" />
                            </div>
                            <div className="slide" id="foto1">
                                <img src={cartel4} alt="" />
                            </div>

                            <div className="slide" id="foto2">
                                <img src={cartel5} alt="" />
                            </div>

                            <div className="slide" id="foto3">
                                <img src={cartel3} alt="" />
                            </div>
                            <div className="slide" id="foto1">
                                <img src={cartel1} alt="" />
                            </div>

                            <div className="slide" id="foto2">
                                <img src={cartel2} alt="" />
                            </div>

                            <div className="slide" id="foto3">
                                <img src={cartel3} alt="" />
                            </div>
                        </div>
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
                        <a href="sobrenosotros" className="links">
                            <p>Sobre Nosotros</p>
                        </a>
                        <a href="scaperooms" className="links">
                            <p>Scape Rooms</p>
                        </a>
                        <a href="contacto" className="links">
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
            <Letters />
            <Nav />
        </div>
    )
}

export default Home;
