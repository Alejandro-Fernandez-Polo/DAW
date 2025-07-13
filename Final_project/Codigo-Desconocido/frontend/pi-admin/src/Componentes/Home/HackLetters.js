import { useEffect } from 'react';

const AnimateLetters = () => {
    useEffect(() => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const elements = document.getElementsByClassName("hackletters");

        const animateLetters = (element, letters) => {
            let iterations = 0;
            const interval = setInterval(() => {
                element.innerText = element.innerText.split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return element.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                if (iterations >= element.dataset.value.length) {
                    clearInterval(interval);
                }
                iterations += 1 / 5;
            }, 30);
        }

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            animateLetters(element, letters);
        }

        // Clean up function
        return () => {
            // Clear any intervals or timeouts if necessary
        };
    }, []);

    return null; // Since this is a utility component, it doesn't render anything
}

export default AnimateLetters;
