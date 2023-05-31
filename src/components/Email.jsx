import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Email = () =>  {

    const form = useRef();

    emailjs.sendForm('service_dgqcw9e', 'template_ud7w9g7', form.current, 'onyCXSYB7HMml3vGP')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });

  //CAMBIAR LA PAGINA A UNA DE PAGO AL DARLE PAGAR (SINGLE PAGE MANEJA TRES COSAS PERFIL, CARRITO Y PAGO)
  return (
    <>    
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
    </>
  );
}

export default Email;