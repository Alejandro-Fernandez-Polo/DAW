import React, { useState, useRef, useEffect } from 'react';
import { Cliente } from './cliente.js';
let cont = 0

const ChatComponent = () => {
    const [isChatOpen, setIsChatOpen] = useState(true);
    const chatInputRef = useRef(null);
    const nameUserRef = useRef(null);
    const chatBodyRef = useRef(null);
  
    

    useEffect(() => {
        const canvas = {
            UserName: () => {
                const userElement = document.getElementById("user");
                if (userElement) {
                    userElement.innerHTML = "User " + Math.random();
                    return userElement.textContent;
                }
            },
            notify: (data) => {
                if (chatBodyRef.current) {
                    chatBodyRef.current.innerHTML = data;
                }
            },
            message_Update: (data) => {
                if (chatBodyRef.current) {
                    const not = chatBodyRef.current;
                    const h1 = document.createElement("p");
                    h1.innerHTML = data;
                    not.appendChild(h1);
                    not.scrollTop = not.scrollHeight;
                }
            },
        };
        cont++
    if (cont == 1) {
        const client = new Cliente("127.0.0.1", "8080", canvas);

        

        const sendButton = document.getElementById("send");
        if (sendButton) {
            sendButton.onclick = function () {
                const chatInput = chatInputRef.current.value;
                const nameUser = sessionStorage.getItem('datosloginNombre');
                let data = {
                    message: chatInput,
                    name_user: nameUser,
                };
                client.message(data);
            };
        }
    }
    }, [isChatOpen]); // Dependencia isChatOpen para ejecutar el efecto cada vez que el chat se abre/cierra
    const toggleChatWindow = () => {
        const chatWindow = document.querySelector('.chat-window');
        if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
            chatWindow.style.display = 'inline';
        } else {
            chatWindow.style.display = 'none';
        }
    };
    return (
        <div>
            <div className="chat-icon" id='chat-icon' onClick={toggleChatWindow} >
                <i  className="bi bi-chat-dots-fill"></i>
            </div>
      
                <div className="chat-window">
                    <div className="chat-header">
                        <p>Chat with us</p>
                        <button >✖</button>
                    </div>
                    <div className="chat-body" id="chat-body" ref={chatBodyRef}></div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            id="chat_input"
                            ref={chatInputRef}
                        />
                   
                        <button className='btn-enviar-mensaje' id="send">Send</button>
                    </div>
                </div>
          
        </div>
     
    );
};  
export default ChatComponent;
