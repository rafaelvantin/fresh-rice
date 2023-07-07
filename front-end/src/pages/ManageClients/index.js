import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

import DeletePopup from '../../components/DeletePopup';
import EditClient from '../../components/EditClient';
import PromotePopup from '../../components/PromotePopup';
import ArrowBack from '../../components/ArrowBack';

import styles from './styles.module.css';
import Header from '../../components/header';
import { toast } from 'react-toastify';

const ManageClients = () => {

    const LIMIT = 10;

    useEffect(() => {
        document.title = "Fresh Rice - Gerenciar Clientes";
    }, []);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [clients, setClients] = useState([]);

    const [deletePopupVisible, setDeletePopupVisible] = useState(false);
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [promotePopupVisible, setPromotePopupVisible] = useState(false);
    const [currClient, setCurrClient] = useState({});

    const [search, setSearch] = useState('');

    const navigate = useNavigate();
    
    // Initial fetch
    useEffect(() => {
        document.title = "Fresh Rice - Gerenciar Clientes";
        
        searchClients(true, true);
    }, []);

    useEffect(() => {
        searchClients(false, false);
    }, [page, search]);

    const openDeletePopup = (client) => {
        setCurrClient(client);
        setDeletePopupVisible(true);
    }
    
    const openEditPopup = (client) => {
        setCurrClient(client);
        setEditPopupVisible(true);
    }

    const openPromotePopup = (client) => {
        setCurrClient(client);
        setPromotePopupVisible(true);
    };

    const searchClients = async (updateTotalPages = false, showToast = false) => {

        const url = `/clients?page=${page}&limit=${LIMIT}&count=${updateTotalPages}&name=${search}`;

        const fetchPromise = api.get(url)
        .then((response) => {
            if(updateTotalPages) {
                setTotalPages(response.data.totalPages);
            }

            setClients(response.data.clients);
        }).catch(()=>{});

        if(showToast) {
            toast.promise(fetchPromise, {
                pending: 'Carregando...',
                success: 'Clientes carregados.',
                error: 'Erro ao carregar clientes.'
            });
        }
    }

    const deletePopupResponse = (response) => {
        
        if(response === true) {
            const deletePromise = api.delete(`/clients/${currClient.id}`)
            .then(() => {
                searchClients(true);
            });

            toast.promise(deletePromise, {
                pending: 'Deletando...',
                success: 'Cliente deletado.',
                error: 'Erro ao deletar cliente.'
            });
        }

        setDeletePopupVisible(false);
        setCurrClient({});
    }

    const editPopupResponse = (response, newClient = {}) => {
        if(response === true) {
            const editPromise = api.put(`/clients/${currClient.id}`, newClient)
            .then(() => {
                searchClients(true);
            });

            toast.promise(editPromise, {
                pending: 'Editando...',
                success: 'Cliente editado.',
                error: 'Erro ao editar cliente.'
            });
        }

        setEditPopupVisible(false);
        setCurrClient({});
    }

    const promotePopupResponse = (response, password = "") => {
        if(response === true) {
            const promotePromise = api.post(`/clients/${currClient.id}/promote`, { password })
            .then(() => {
                searchClients(true);
            });

            toast.promise(promotePromise, {
                pending: 'Promovendo...',
                success: 'Cliente promovido.',
                error: {
                    render({ data }) {
                        if(data.response.status === 401) {
                            return 'Senha incorreta.';
                        } else {
                            return 'Erro ao promover cliente.';
                        }
                    }
                }
            });
        }

        setPromotePopupVisible(false);
        setCurrClient({});
    };

    const renderDataTable = () => {
        if(clients.length === 0) {
            return (
                <tr className={styles.tr}>
                    <td className={styles.td_name} colSpan="4">Nenhum cliente encontrado</td>
                </tr>
            );
        }

        return clients.map((client) => {
            return (
                <tr className={styles.tr} key={client.id}>
                    <td className={styles.td_name}>{client.name}</td>
                    <td className={styles.td_name}>{client.email}</td>
                    <td className={styles.td_name}>{
                        `${client.cpf.substring(0, 3)}.${client.cpf.substring(3, 6)}.${client.cpf.substring(6, 9)}-${client.cpf.substring(9, 11)}`
                    }</td>
                    <td className={styles.td}>
                        <div className={styles.operationsContainer}>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openEditPopup(client)}>edit_square</i>

                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openDeletePopup(client)} style={{marginLeft: '8px', marginTop: '3px'}}>delete</i>

                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openPromotePopup(client)} style={{marginLeft: '8px', marginTop: '3px'}}>add_moderator</i>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    const renderPagination = () => {
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button key={i} className={i === page ? styles.active : styles.unactive} onClick={() => setPage(i)}>{i}</button>
            );
        }

        return (
            <div className={styles.containerPages}>
                {buttons}
            </div>
        );
    }

    const dataTable = useMemo(renderDataTable, [clients]);
    const paginationButtons = useMemo(renderPagination, [page, totalPages]);

    return (
      <div className={styles.container}>
        <Header />
        <ArrowBack />

        <h1 className={styles.welcome}>Clientes</h1>
        
        <div className={styles.searchbar}>
            <input className={styles.input} type="text" placeholder="Pesquisar pelo nome" value={search} onChange={(e) => setSearch(e.target.value)} />
            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => searchClients()}>search</i>
        </div>

        <div className={styles.table}>
            <table>
                <thead>
                    <tr className={styles.thead}>
                        <td className={styles.th_name}>Nome</td>
                        <td className={styles.th_name}>Email</td>
                        <td className={styles.th_name}>CPF</td>
                        <td className={styles.th}>Editar</td>
                    </tr>
                </thead>
                <tbody>{dataTable}</tbody>
            </table>

            {paginationButtons}
        </div>

        <DeletePopup visible={deletePopupVisible} nome={currClient.name} popupResponse={deletePopupResponse} />
        <EditClient visible={editPopupVisible} client={currClient} popupResponse={editPopupResponse} />
        <PromotePopup visible={promotePopupVisible} name={currClient.name} popupResponse={promotePopupResponse} />
      </div>
    );
  }
  
  export default ManageClients;
  