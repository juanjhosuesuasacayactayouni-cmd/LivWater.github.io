document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Cerrar el menú móvil automáticamente al hacer clic en un enlace
    const menuToggle = document.getElementById("menu-toggle");
    const enlacesMenu = document.querySelectorAll(".menu a");

    enlacesMenu.forEach(enlace => {
        enlace.addEventListener("click", () => {
            // Si el checkbox está activado (menú abierto), lo desmarcamos
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    });

    // 2. Manejo y validación del formulario de contacto[cite: 56]
    const formulario = document.getElementById("formularioContacto");
    
    if (formulario) {
        formulario.addEventListener("submit", function(evento) {
            const celularInput = document.getElementById("tel");
            const celularValor = celularInput.value.trim();
            
            // Expresión regular para validar solo números y el signo "+"[cite: 56]
            const soloNumeros = /^[0-9+\s]+$/;
            
            if (!soloNumeros.test(celularValor)) {
                evento.preventDefault(); // Detiene el envío[cite: 50]
                
                // Respuesta visible al usuario[cite: 58]
                alert("El número de celular debe contener solo números.");
                celularInput.classList.add("error-input");
                celularInput.focus();
            } else {
                celularInput.classList.remove("error-input");
            }
        });
        
        // Quitar la clase de error cuando el usuario corrige el campo
        const telInput = document.getElementById("tel");
        if(telInput){
            telInput.addEventListener("input", function() {
                this.classList.remove("error-input");
            });
        }
    }
});