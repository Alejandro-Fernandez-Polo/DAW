import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';
import logo from '../Assets/imagesHero/logo.png';
import Nav from '../Home/nav.js';

export const handleSignInClick = () => {
    window.location.href = '#';
}
const nombre_editable = sessionStorage.getItem('datosloginNombre')
const correo_editable = sessionStorage.getItem('datosloginCorreo')

export const Perfil = () => {
 const BorrarSesion = () => {
    sessionStorage.removeItem('datosloginNombre')
    sessionStorage.removeItem('datosloginId')
    sessionStorage.removeItem('datosloginCorreo')
    sessionStorage.removeItem('datosloginId')
    sessionStorage.removeItem('datosloginRole')
    window.location.href = '/login2';
}
    const [NewAmigos, setNewAmigos] = useState([]);


    const descriptionRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const userId = sessionStorage.getItem('datosloginId');
    const [showModal, setShowModal] = useState(false);

    
    const handleSave = async () => {
        const description = descriptionRef.current.value || sessionStorage.getItem('datoslogindescription');
        const name = nameRef.current.value || sessionStorage.getItem('datosloginNombre');
        const email = emailRef.current.value || sessionStorage.getItem('datosloginCorreo');

        const response = await fetch(`http://localhost:8000/clients/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description,
                name,
                email,
            }),
        });

        if (response.ok) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
            // Update session storage with new values
            sessionStorage.setItem('datoslogindescription', description);
            sessionStorage.setItem('datosloginNombre', name);
            sessionStorage.setItem('datosloginCorreo', email);
        } else {
            alert('Error al guardar los datos');
        }
    };
    const editarCliente = async () => {
        try {
            const id = sessionStorage.getItem('datosloginId');
            const response = await fetch(`http://localhost:8000/clients/${id}`);
            const cliente = await response.json();

            // Obtenemos la lista actual de amigos del cliente
            const amigosActuales = cliente.friends || [];

            // Agregamos el nuevo amigo a la lista
            const nuevoAmigo = document.getElementById('amigonuevo').value;
            amigosActuales.push(nuevoAmigo);

            // Enviamos la lista actualizada de amigos al servidor
            const editarResponse = await fetch(`http://localhost:8000/clients/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    friends: amigosActuales
                })
            });

            const data = await editarResponse.json();
            console.log('Cliente editado:', data);
            // Aquí podrías actualizar el estado o hacer cualquier otra acción necesaria
        } catch (error) {
            console.error('Error al editar cliente:', error);
        }
    };
    const eliminarAmigo = async (idAmigo) => {
        try {
          const idCliente = sessionStorage.getItem('datosloginId');
          const response = await fetch(`http://localhost:8000/clients/${idCliente}`);
          const cliente = await response.json();
      
          // Obtenemos la lista actual de amigos del cliente
          const amigosActuales = cliente.friends || [];
      
          // Eliminamos el ID del amigo de la lista
          const amigosActualizados = amigosActuales.filter((amigoId) => amigoId !== idAmigo);
      
          // Enviamos la lista actualizada de amigos al servidor
          const editarResponse = await fetch(`http://localhost:8000/clients/${idCliente}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              friends: amigosActualizados
            })
          });
      
          const data = await editarResponse.json();
          console.log('Cliente editado:', data);
          // Aquí podrías actualizar el estado o hacer cualquier otra acción necesaria
        } catch (error) {
          console.error('Error al editar cliente:', error);
        }
      };
      

    const buscarAmigos = async () => {
        const name = document.getElementById('buscadoramigos').value;
        try {
            const response = await fetch(`http://localhost:8000/clients/name/${name}`);
            const data = await response.json();
            setNewAmigos(data); // Suponiendo que la respuesta de la API es un array de amigos
        } catch (error) {
            console.error('Error al buscar amigos:', error);
        }
    };

    const navigate = useNavigate();
    const [amigos, setamigos] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/clients/' + sessionStorage.getItem('datosloginId') + '/friends')
            .then(response => response.json())
            .then(data => setamigos(data))
            .catch(error => console.error('Error fetching escape rooms:', error));
    }, []);
    useEffect(() => {
        const datosLoginNombre = sessionStorage.getItem('datosloginNombre');
        if (!datosLoginNombre) {
            navigate('/login2');
        }
    }, [navigate]);
   

    return (
    
        <div className='container'>
            <header role="banner" id="cabecera-perfil">
                <div className="logo" onClick={handleSignInClick}>
                    <img src={logo} alt='logo' />
                </div>

                <button className="abrir-menu" id="abrir"><i className="bi bi-list"></i></button>

                <nav role="navigation" className="main-nav" id="nav">
                    <button className="cerrar-menu" id="cerrar"><i className="bi bi-x-lg"></i></button>
                    <ul className="list-nav">
                        <li className="list-nav-item"><a href="/" className="enlace">INICIO</a></li>
                        <li className="list-nav-item"><a href="sobrenosotros" className="enlace">SOBRE NOSOTROS</a></li>
                        <li className="list-nav-item"><a href="scaperooms" className="enlace ">SCAPE ROOMS</a></li>
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

            <div className="section-1-info-user-perfil">
                <div className="perfil-1er-div">
                    <div className="foto-user">

                    </div>
                    <div className="nombre-email-user">
                        <h3>{sessionStorage.getItem('datosloginNombre')}</h3>
                        <p>{sessionStorage.getItem('datosloginCorreo')}</p>
                    </div>
                </div>

                <div className="perfil-2do-div">
                    <div className="descripcion-user">
                        <p>Descripcion</p>
                        <textarea  name="description"
                        id="description"
                        ref={descriptionRef}
                        defaultValue={sessionStorage.getItem('datoslogindescription')}></textarea>
                    </div>
                    <div className="info-user">
                        <div className="nombre-user">
                            <p>Nombre</p>
                            <input  type="text"
                            name="name"
                            id="name"
                            ref={nameRef}
                            defaultValue={sessionStorage.getItem('datosloginNombre')}/>
                        </div>
                        <div className="correo-user">
                            <p>Correo</p>
                            <input  type="text"
                            name="email"
                            id="email"
                            ref={emailRef}
                            defaultValue={sessionStorage.getItem('datosloginCorreo')} ></input>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-2-info-user-perfil">

                <div className="amigos-1er-div">
                    <div className="titulo-1er-div-amigos">
                        <h3>Amigos</h3>
                    </div>
                    <div className="solicitud-amigo">
                        {amigos.map(amigo => (
                            <div className="info-amigo-amigos" key={amigo._id}>
                                <div className="foto-amigo"></div>
                                <input className='inputnone' type="hidden" value={amigo._id} id={`idAmigoEliminar-${amigo._id}`} />
                                <h3>{amigo.name}</h3>
                                <p>{amigo.email}</p>
                                <div className="chat-eliminar">
                                    <div className="chat">
                                        <p>Iniciar Chat</p>
                                    </div>
                                    <div onClick={() => eliminarAmigo(amigo._id)} className="eliminar">
                                        <p>Eliminar Amigo</p>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>

                <div className="amigos-2do-div">
                    <div className="titulo-2do-div-amigos">
                        <h3>Buscar amigos:</h3>
                        <input type="text" id='buscadoramigos' />
                        <div className="buscar-perfil-amigos" onClick={buscarAmigos}>
                            <p>🔎</p>
                        </div>
                    </div>

                    <div className="segundo-div-amigos">

                        <div className="info-amigo-amigoss">

                            <div className="foto-amigo">
                                <input className='inputnone' value={NewAmigos._id} id='amigonuevo'></input>
                            </div>{console.log(NewAmigos)}
                            <h3>{NewAmigos.name}</h3>
                            <p>{NewAmigos.email}</p>
                            <div onClick={editarCliente} className="enviar-solicitud">
                                <p>Enviar solicitud</p>

                            </div>
                        </div>



                    </div>

                </div>

              {/* <div className="amigos-3er-div">
                    <div className="titulo-3er-div-amigos">
                        <h3>Solicitudes</h3>
                    </div>
                    <div className="tercer-div-amigos">
                        <div className="info-amigo">
                            <div className="foto-amigo">

                            </div>
                            <h3>Amigo 1</h3>
                            <p>xxxxxxxxxxxxxxxxxxxx@gmail.com</p>
                            <div className="aceptar-eliminar-solicitud">
                                <div className="chat">
                                    <p>Aceptar</p>
                                </div>

                                <div className="eliminar">
                                    <p>Rechazar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>  */}
                <div className="guardado-y-cierre-sesion">
                    <div onClick={handleSave} className="guardar-cambios">
                        <p>Guardar</p>
                    </div>

                    <div onClick={BorrarSesion} className="cierre-de-sesion">
                        <p>Cerrar Sesion</p>
                    </div>
                    {showModal &&
                <div className="modal">
                    <div className="modal-content">
                        <p>Sus datos se han guardado con éxito.</p>
                    </div>
                </div>
            }
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
            <Nav />
        </div>
        
    );
    
}

export default Perfil;
