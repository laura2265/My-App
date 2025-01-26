import Logo from '../assets/img/logo.png';
import Flecha from '../assets/img/flecha-hacia-atras.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ActualilarReserva(){

    const {id} = useParams()
    const navigate = useNavigate()

    const [formDataUpdate, setFormDataUpdate] = useState({
        nombre: "",
        numeroTelefonico: "",
        email: "",
        cantClientes: "",
        fechaReserva: "",
        horaReserva: "",
        estado: ""
    });
    

    useEffect(() => {
        const fetchDataClient = async () => {
            try {
                const response = await fetch(`http://localhost:3001/reserva/${id}`, {
                    method: 'GET',
                });
    
                if (!response.ok) {
                    throw new Error(`Error al consultar la reserva con ID: ${id}`);
                }
    
                const result = await response.json();
                const data = result.data;
                console.log('La reserva por ID es:', data);
    
                setFormDataUpdate({
                    nombre: data.nombre,
                    numeroTelefonico: data.numeroTelefonico,
                    email: data.email,
                    cantidadPersonas: data.cantClientes,
                    fechaReserva: new Date(data.fechaReserva).toISOString().split('T')[0], // Formato válido para input date
                    horaReserva: data.horaReserva,
                    estado: data.estado,
                });
            } catch (error) {
                console.error('Error al momento de consultar los datos de la reserva', error);
            }
        };
        fetchDataClient();
    }, [id]);
    

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setFormDataUpdate({
            ...formDataUpdate,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ajusta los nombres según los requerimientos del backend
        const updatedData = {
            nombre: formDataUpdate.nombre,
            numeroTelefonico: formDataUpdate.numeroTelefonico,
            email: formDataUpdate.email,
            cantClientes: formDataUpdate.cantidadPersonas, // Convertir cantidadPersonas a cantClientes
            fechaReserva: formDataUpdate.fechaReserva,
            horaReserva: formDataUpdate.horaReserva,
            estado: formDataUpdate.estado,
        };
    
        try {
            const response = await fetch(`http://localhost:3001/reserva/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
    
            if (!response.ok) {
                throw new Error(`Error al momento de actualizar la reserva con ID: ${id}`);
            }
    
            const data = await response.json();
            console.log('Datos actualizados: ', data);
            alert('Datos actualizados correctamente');
            navigate('/');
        } catch (error) {
            console.error(`Error al momento de actualizar los datos de la reserva: ${error}`);
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
                                <h3>Actualizar Reserva</h3>
                                <br/>
                                <label>Nombre</label><br/>
                                <input
                                    type='text'
                                    name='nombre'
                                    value={formDataUpdate.nombre}
                                    onChange={handleUpdateChange}
                                    placeholder='Nombre' 
                                /><br/><br/>
                                <label>Numero De Telefono</label><br/>
                                <input 
                                    type='number'
                                    name='numeroTelefonico'
                                    value={formDataUpdate.numeroTelefonico}
                                    onChange={handleUpdateChange}
                                    placeholder='Telefono'
                                /><br/><br/>

                                <label>Email</label><br/>
                                <input
                                 type='email'
                                    name='email'
                                    value={formDataUpdate.email}
                                    onChange={handleUpdateChange}
                                    placeholder='Email'
                                 /><br/><br/>
                                <label>Cantidad De Personas</label><br/>
                                <input 
                                    type='number'
                                    name='cantidadPersonas'
                                    onChange={handleUpdateChange}
                                    value={formDataUpdate.cantidadPersonas}
                                    placeholder='Cantidad de personas'
                                /><br/><br/>
                                <label>Fecha De Reserva</label><br/>
                                <input 
                                    type="date"
                                    name="fechaReserva"
                                    value={formDataUpdate.fechaReserva}
                                    onChange={handleUpdateChange}
                                    placeholder="Fecha de reserva" 
                                /><br/><br/>
                                <label>Hora De Reserva</label><br/>
                                <input 
                                    type='time' 
                                    name='horaReserva'
                                    onChange={handleUpdateChange}
                                    value={formDataUpdate.horaReserva}
                                    placeholder='Hora de reserva'
                                /><br/><br/>

                                <button type='submit' className='buttonCreate'>Actualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ActualilarReserva