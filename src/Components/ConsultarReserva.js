import { useState, useEffect } from 'react';
import '../App.css';
import Logo from '../assets/img/logo.png';
import Reporte from '../assets/img/informe-seo.png';
import Crear from '../assets/img/anadir.png'
import { Link } from 'react-router-dom';

function ConsultarReserva() {
    const [dataReserva, setDataReserva] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [searchTelefono, setSearchTelefono] = useState("");
    const [searchCantidad, setSearchCantidad] = useState("");
    const [searchFecha, setSearchFecha] = useState("");
    const [searchHora, setSearchHora] = useState("");
    
    // Modal
    const [isModal, setIsModal] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);

    const openModal = (reserva) => {
        setIsModal(true);
        setSelectedReserva(reserva);
    }

    const closeModal = () => {
        setIsModal(false);
        setSelectedReserva(null);
    }

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const response = await fetch('http://localhost:3001/reserva', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al momento de consultar los datos');
                }

                const data = await response.json();
                const result = data.data.docs;
                const reservasData = result.map(reserva => ({
                    id: reserva._id,
                    nombre: reserva.nombre,
                    numeroTelefonico: reserva.numeroTelefonico,
                    email: reserva.email,
                    cantClientes: reserva.cantClientes,
                    fechaReserva: reserva.fechaReserva,
                    horaReserva: reserva.horaReserva,
                    estado: reserva.estado
                }));
                setDataReserva(reservasData);
            } catch (error) {
                console.error('Error al momento de consultar los datos: ', error);
            }
        };

        fetchReserva();
    }, []);

    const handleSearchChange = (e) => {
        setSearchId(e.target.value);
    };

    const handleSearchTelefonoChange = (e) => {
        setSearchTelefono(e.target.value);
    };

    const handleSearchCantidadChange = (e) => {
        setSearchCantidad(e.target.value);
    };

    const handleSearchFechaChange = (e) => {
        setSearchFecha(e.target.value);
    };

    const handleSearchHoraChange = (e) => {
        setSearchHora(e.target.value);
    };

    const filterReserva = dataReserva.filter((reserva) => {
        const matchesId = searchId ? String(reserva.id).includes(searchId) : true;
        const matchesTelefono = searchTelefono ? String(reserva.numeroTelefonico).includes(searchTelefono) : true;
        const matchesCantidad = searchCantidad ? String(reserva.cantClientes).includes(searchCantidad) : true;
        const matchesFecha = searchFecha ? String(reserva.fechaReserva).includes(searchFecha) : true;
        const matchesHora = searchHora ? String(reserva.horaReserva).includes(searchHora) : true;
        return matchesId && matchesTelefono && matchesCantidad && matchesFecha && matchesHora;
    });

    const updateStatus = async (id, estado) => {
        try {
            const nuevoEstado = estado === 'Activo' ? 'Inactivo' : 'Activo';
            console.log(`Actualizando el estado de la reserva: ${id} a ${nuevoEstado}`);
            
            const response = await fetch(`http://localhost:3001/reserva/${id}/estado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            });
            
    
            if (!response.ok) {
                throw new Error(`Error al actualizar el estado del ID: ${id}`);
            }
    
            const data = await response.json();
            console.log('Respuesta de la API:', data);
    
            // Actualizar el estado local
            setDataReserva((prevData) =>
                prevData.map((reserva) =>
                    reserva.id === id ? { ...reserva, estado: nuevoEstado } : reserva
                )
            );
            closeModal();
        } catch (error) {
            console.error(`Error al actualizar el estado: ${error}`);
        }
    };
    
    

    return (
        <div className='contentProyect'>
            <div className='conetnLogo'>
                <img src={Logo} />
            </div>
            <div className='headers'>
                <div className='button'>
                    <Link to='/create'  className='Boton1'>Crear <img src={Crear} /> </Link>
                    <Link to='/update' className='Boton3'>Reporte <img src={Reporte} /></Link>
                </div>
            </div>

            <div className='contentConsultar'>
                <div className='contentButton'>
                    <div className='barraBusqueda'>
                        <h3>Buscar Por ID</h3>
                        <input value={searchId} onChange={handleSearchChange} placeholder='Ingrese el ID...' />
                    </div>
                    <div className='barraBusqueda'>
                        <h3>Buscar Por Numero De Telefono</h3>
                        <input value={searchTelefono} onChange={handleSearchTelefonoChange} placeholder='Ingrese el telefono...' />
                    </div>
                    <div className='barraBusqueda'>
                        <h3>Buscar Por Cantidad</h3>
                        <input value={searchCantidad} onChange={handleSearchCantidadChange} placeholder='Ingrese la cantidad...' />
                    </div>
                    <div className='barraBusqueda'>
                        <h3>Buscar Por Fecha</h3>
                        <input value={searchFecha} onChange={handleSearchFechaChange} placeholder='Ingrese la fecha...' />
                    </div>
                    <div className='barraBusqueda'>
                        <h3>Buscar Por Hora</h3>
                        <input value={searchHora} onChange={handleSearchHoraChange} placeholder='Ingrese la Hora...' />
                    </div>
                </div>
                <div className='contentTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Numero De Telefono</th>
                                <th>Email</th>
                                <th>Cantidad De Personas</th>
                                <th>Fecha De Reserva</th>
                                <th>Hora De Reserva</th>
                                <th>Estado</th>
                                <th>Actualizar</th>
                                <th>Inhabilitar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterReserva.length > 0 ? (
                                filterReserva.map((reserva, index) => (
                                    <tr key={index}>
                                        <td>{reserva.id}</td>
                                        <td>{reserva.nombre}</td>
                                        <td>{reserva.numeroTelefonico}</td>
                                        <td>{reserva.email}</td>
                                        <td>{reserva.cantClientes}</td>
                                        <td>{reserva.fechaReserva}</td>
                                        <td>{reserva.horaReserva}</td>
                                        <td>{reserva.estado}</td>
                                        <td>
                                            <Link to={`/update/${reserva.id}`} className='buttonactualizar'>Actualizar</Link>
                                        </td>
                                        <td>
                                            <button className='inabilitarButton' onClick={() => openModal(reserva)}>
                                                {reserva.estado === "Activo" ? "Inactivar" : "Activar"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>    
                                    <td colSpan={9}>No se encontraron reservas</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModal && selectedReserva && (
                <div className="modal-overlay">
                    <div className="ventana-popup">
                        <div className="contenido-popup">
                            <p>
                                ¿Estás seguro de querer {""} {selectedReserva.estado === "Activo" ? "Inactivar" : "Activar"} esta reserva?
                            </p>
                            <button className="confirmInactivar" onClick={() => updateStatus(selectedReserva.id, selectedReserva.estado)}>
                                Confirmar
                            </button>

                            <button className="cancelInactivar" onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConsultarReserva;
