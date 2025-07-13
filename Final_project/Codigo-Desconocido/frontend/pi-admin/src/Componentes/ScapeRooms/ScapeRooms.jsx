import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Home/nav.js';
import logo from '../Assets/imagesHero/logo.png';
import './ScapeRooms.css';
import ChatComponent from './index.js'

console.log(sessionStorage.getItem('datosloginId'));
console.log(sessionStorage.getItem('datosloginNombre'));
console.log(sessionStorage.getItem('datosloginCorreo'));
export const ScapeRooms = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const datosLoginNombre = sessionStorage.getItem('datosloginNombre');
        if (!datosLoginNombre) {
            navigate('/');
        }
    }, [navigate]);



    const [escapeRooms, setEscapeRooms] = useState([]);
    const [mostrarCiudades, setMostrarCiudades] = useState(false);
    const [mostrarDificultad, setMostrarDificultad] = useState(false);
    const [mostrarTematicas, setMostrarTematicas] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/escaperooms/?page=1&per_page=100')
            .then(response => response.json())
            .then(data => setEscapeRooms(data))
            .catch(error => console.error('Error fetching escape rooms:', error));
    }, []);

    const toggleCiudades = () => {
        setMostrarCiudades(!mostrarCiudades);
    };

    const toggleDificultad = () => {
        setMostrarDificultad(!mostrarDificultad);
    };

    const toggleTematicas = () => {
        setMostrarTematicas(!mostrarTematicas);
    };



    const handleMessageSend = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, inputValue]);
            setInputValue('');
        }
    };

    const handleSignInClick = () => {
        window.location.href = '#';
    }

    const handleSelectClick = (event) => {
        event.stopPropagation();
    };
    const handleReservaClick = (roomId) => {
        console.log(`/book/${roomId}`)
        navigate(`/book/${roomId}`);
    };
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
                        <li className="list-nav-item"><a href="scaperooms" className="link active">SCAPE ROOMS</a></li>
                        <li className="list-nav-item"><a href="contact" className="enlace">CONTACTO</a></li>
                    </ul>
                </nav>
                <div className="icono-perfil">
                    <a href="perfil"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg></a><p id='name_user'>{sessionStorage.getItem('datosloginNombre')}</p>
                </div>
            </header>

            <div id="hero-scaperooms">
                <div className="primera-linea-hero-scaperooms">
                    <p>SALAS DE</p>
                </div>

                <div className="segunda-linea-hero-scaperooms">
                    <p>SCAPEROOMS</p>
                </div>

                <div className="scroll-down">
                    <p>SCROLL DOWN</p>
                </div>
            </div>

            <div className="section-1-scaperooms">
                <div className="rectangulo-1-filtros-scaperooms">
                    <p id="como">¿Cómo lo prefieres?</p>
                    <div className="filtros-scaperooms">
                    <div className="ubicacion" onClick={toggleCiudades}>
                            <p className="rectangulos">Ubicación</p>
                            <div className={`ciudades ${mostrarCiudades ? 'open' : ''}`}>
                                <select onClick={handleSelectClick} id ="select-scaperooms">
                                    <option value="ciudad1">Ciudad 1</option>
                                    <option value="ciudad2">Ciudad 2</option>
                                    <option value="ciudad3">Ciudad 3</option>
                                </select>
                            </div>
                        </div>

                        <div className="dificultad" onClick={toggleDificultad}>
                            <p className="rectangulos">Dificultad</p>
                            <div className={`nivel-dificultad ${mostrarDificultad ? 'open' : ''}`}>
                                <select onClick={handleSelectClick} id ="select-scaperooms">
                                    <option value="facil">Fácil</option>
                                    <option value="intermedio">Intermedio</option>
                                    <option value="dificil">Difícil</option>
                                </select>
                            </div>
                        </div>

                        <div className="tematicas" onClick={toggleTematicas}>
                            <p className="rectangulos">Temáticas</p>
                            <div className={`lista-tematicas ${mostrarTematicas ? 'open' : ''}`}>
                                <select onClick={handleSelectClick} id ="select-scaperooms">
                                    <option value="tematica1">Temática 1</option>
                                    <option value="tematica2">Temática 2</option>
                                    <option value="tematica3">Temática 3</option>
                                </select>
                            </div>
                        </div>

                        <div className="buscar">
                            <p>🔎</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-2-scaperooms">
                <div className="lista-scaperooms">
                    {console.log(escapeRooms)}
                    {escapeRooms.map(room => (
                        <div className="caja-scaperoom" key={room._id}>
                            {/* You can customize this part according to your data */}
                            <div className="imagen-scaperoom">
                                <img src={`data:image/png;base64, ${room.photo}`} alt="Room Photo" />
                            </div>
                            <div className="info-scaperoom">
                                <div className="nombre-scaperoom">
                                    <p>{room.name}</p>
                                </div>
                                <div className="caracteristicas-scaperoom">
                                    <p>{room.min_players}-{room.max_players || 'N'} Personas</p>
                                    <p>{room.difficulty}</p>
                                    <p>🔐 Encontrar</p>
                                </div>
                                <div className="descripcion-scaperoom">
                                    <p>{room.description}</p>
                                </div>
                                <div className="precio-y-reserva">
                                    <button className='reserva-ahora' onClick={() => handleReservaClick(room._id)}  ><p>RESERVA AHORA ➡</p></button>
                                    <p>{room.price ? `${room.price}€ / Persona` : 'Precio no disponible'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
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
            <ChatComponent />
        </div>
    )
}

export default ScapeRooms;
