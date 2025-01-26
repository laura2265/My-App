import Logo from '../assets/img/logo.png';
import Flecha from '../assets/img/flecha-hacia-atras.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CrearReserva(){

    const text = /^[A-Za-z Á-Úá-úñÑ]{3,20}$/;
    const emailParttern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const number = /^[0-9]{1,10}$/
    const number1 = /^[0-1]{1,10}$/
    const fechaPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; 
    const horaPattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    const navigate = useNavigate()
    const [formError, setFormErrors] = useState({})
    const [formData, setFormData]= useState({
        nombre: '',
        numeroTelefonico: '',
        email: '',
        cantidadPersonas: '',
        FechaReserva: '',
        HoraReserva: '',
      });

      const validateForm = () => {
        let errors = {}


        if(!text.test(formData.nombre)){
            errors.nombre = 'El nombre del ususario no es valido'
        }

        if(!number.test(formData.numeroTelefonico)){
            errors.numeroTelefonico = 'el numero de telefono no es valido'
        }

        if(!emailParttern.test(formData.email)){
            errors.email = 'el email no es valido'
        }

        if(!number1.test(formData.cantidadPersonas)){
            errors.cantidadPersonas = 'La cantidad de personas no es valido'
        }
        
        if(!fechaPattern.test(formData.FechaReserva)){
            errors.FechaReserva = 'la fecha no es valida'
        }
        
        if(!horaPattern.test(formData.HoraReserva)){
            errors.HoraReserva = 'la hora no es valida'
        }
        return errors
    }

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = validateForm();
        setFormErrors(errors);
    
    
        // Verifica si hay errores
        if (Object.keys(errors).length > 0 ) {
            const errorMessages = [
                ...Object.values(errors),
            ].join('\n');

            alert(`Campos inválidos:\n${errorMessages}`);
            return;
        }

        const dataToSend = {
            nombre: formData.nombre,
            numeroTelefonico: formData.numeroTelefonico,
            email: formData.email,
            cantClientes: formData.cantidadPersonas,
            FechaReserva: formData.FechaReserva,
            horaReserva: formData.HoraReserva,
            estado: 'activo',
        };

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify(dataToSend);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch('http://localhost:3001/reserva', requestOptions);

            if (!response.ok) {
                throw new Error('Error al registrar la reserva');
            }
            const data = await response.json();
            console.log(data);
            alert('reserva registrada correctamente')
            navigate('/')
        } catch (error) {
            console.error('Error al momento de registrar el usuario', error);
        }
    };

    return(

        <>
            <div className="contentProyect1">
                <div className='conetnLogo'>
                    <img src={Logo} />
                </div>
                <div className='headers'>
                    <div className='button'>
                        <Link to='/'  className='Boton1'>Volver <img src={Flecha} /> </Link>
                    </div>
                </div>
                <div className='contentForm'>
                    <form onSubmit={handleSubmit}>
                        <div className='contentInput'>
                            <div className='content'>
                                <h3>Crear Reserva</h3>
                                <br/>
                                <label>Nombre</label><br/>
                                <input
                                    type='text'
                                    name='nombre'
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    placeholder='Nombre' 
                                /><br/><br/>
                                <label>Numero De Telefono</label><br/>
                                <input 
                                    type='number'
                                    name='numeroTelefonico'
                                    value={formData.numeroTelefonico}
                                    onChange={handleInputChange}
                                    placeholder='Telefono'
                                /><br/><br/>

                                <label>Email</label><br/>
                                <input
                                 type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder='Email'
                                 /><br/><br/>
                                <label>Cantidad De Personas</label><br/>
                                <input 
                                    type='number'
                                    name='cantidadPersonas'
                                    onChange={handleInputChange}
                                    value={formData.cantidadPersonas}
                                    placeholder='Cantidad de personas'
                                /><br/><br/>
                                <label>Fecha De Reserva</label><br/>
                                <input 
                                    type='date'
                                    name='FechaReserva'
                                    onChange={handleInputChange}
                                    value={formData.FechaReserva}
                                    placeholder='Fecha de reserva' 
                                /><br/><br/>
                                <label>Hora De Reserva</label><br/>
                                <input 
                                    type='time' 
                                    name='HoraReserva'
                                    onChange={handleInputChange}
                                    value={formData.HoraReserva}
                                    placeholder='Hora de reserva'
                                /><br/><br/>

                                <button type='submit' className='buttonCreate'>Crear</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CrearReserva