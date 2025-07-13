import { useEffect } from 'react';

const NavMenu = () => {
    useEffect(() => {
        const abrir = document.querySelector("#abrir");
        const cerrar = document.querySelector("#cerrar");
        const nav = document.querySelector("#nav");

        const openNav = () => {
            if (nav) {
                nav.classList.add("visible");
            }
        };

        const closeNav = () => {
            if (nav) {
                nav.classList.remove("visible");
            }
        };

        if (abrir) {
            abrir.addEventListener("click", openNav);
        }

        if (cerrar) {
            cerrar.addEventListener("click", closeNav);
        }

        // Cleanup function to remove event listeners
        return () => {
            if (abrir) {
                abrir.removeEventListener("click", openNav);
            }

            if (cerrar) {
                cerrar.removeEventListener("click", closeNav);
            }
        };
    }, []); // Empty dependency array ensures the effect runs only once after the component mounts

    return null; // Since this component doesn't render anything, return null
};

export default NavMenu;
