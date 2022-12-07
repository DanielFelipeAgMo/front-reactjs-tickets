import Swal from 'sweetalert2';

const mensajeConfirmacion = (icon, msg) => {
    Swal.fire({
        icon: icon,
        text: msg,
    })
}

export default mensajeConfirmacion;