import { Testimoniales } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {

    //validar
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push( {mensaje: 'El nombre está vacío'} );
    }  
    if (correo.trim() === '') {
        errores.push( {mensaje: 'El correo está vacío'} );
    } 
    if (mensaje.trim() === '') {
        errores.push( {mensaje: 'El mensaje está vacío'} );
    }   

    if(errores.length > 0 ){

        //consultar los testimoniales
        try {
            const testimoniales = await Testimoniales.findAll();

            //mostrar la vista con errores
            res.render('testimoniales', {
                pagina: 'Testimoniales',
                errores,
                nombre,
                correo,
                mensaje,
                testimoniales
            });
        } catch (error) {
            console.log(error);
        }

    } else {
        //almacenarlo en la base de datos
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales');

        } catch (error) {
            console.log(error);
        }
    }

}

export {
    guardarTestimonial
}