import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Clients from '../../clients.json';

import DeletePopup from '../../components/DeletePopup';
import EditClient from '../../components/EditClient';
import ArrowBack from '../../components/ArrowBack';

import styles from './styles.module.css';
import Header from '../../components/header';

const ManageClients = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [clients, setClients] = useState([]);

    const [deletePopupVisible, setDeletePopupVisible] = useState(false);
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [currClient, setCurrClient] = useState({});

    const [search, setSearch] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Fresh Rice - Gerenciar Clientes";
        // CALL API FOR NUMBER OF TOTAL PAGES
        setTotalPages(2);

        searchClient();

    }, []);

    useEffect(() => {
        searchClient();
    }, [page]);


    const openDeletePopup = (client) => {
        setCurrClient(client);
        setDeletePopupVisible(true);
    }
    const openEditPopup = (client) => {
        setCurrClient(client);
        setEditPopupVisible(true);
    }

    const searchClient = () => {
        // CALL API FOR SEARCH
        if(search === '') {
            setClients(Clients.slice((page-1) * 10, page * 10));
            return;
        }

        const filteredClients = Clients.filter((client) => client.nome.toLowerCase().includes(search.toLowerCase()));
        setClients(filteredClients.slice((page-1) * 10, page * 10));
    }

    const deletePopupResponse = (response) => {
        
        if(response === true) {
            // CALL API TO DELETE currClient.id
        }

        searchClient();
        setDeletePopupVisible(false);
        setCurrClient({});
    }

    const editPopupResponse = (response, newClient = {}) => {
        if(response === true) {
            // CALL API TO EDIT currClient.id
        }

        searchClient();
        setEditPopupVisible(false);
        setCurrClient({});
    }



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
                    <td className={styles.td}>{client.id}</td>
                    <td className={styles.td_name}>{client.nome}</td>
                    <td className={styles.td_name}>{client.email}</td>
                    <td className={styles.td}>
                        <div className={styles.operationsContainer}>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openEditPopup(client)}>edit_square</i>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openDeletePopup(client)} style={{marginLeft: '8px', marginTop: '3px'}}>delete</i>
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



    return (
      <div className={styles.container}>
        <Header />
        <ArrowBack />

        <h1 className={styles.welcome}>Clientes</h1>
        
        <div className={styles.searchbar}>
            <input className={styles.input} type="text" placeholder="Pesquisar pelo nome" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={() => searchClient()} />
            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => searchClient()}>search</i>
        </div>

        <div className={styles.table}>
            <table>
                <thead>
                    <tr className={styles.thead}>
                        <td className={styles.th}>ID</td>
                        <td className={styles.th_name}>Nome</td>
                        <td className={styles.th_name}>Email</td>
                        <td className={styles.th}>Editar</td>
                    </tr>
                </thead>
                <tbody>{renderDataTable()}</tbody>
            </table>
            {renderPagination()}
        </div>

        <DeletePopup visible={deletePopupVisible} nome={currClient.name} popupResponse={deletePopupResponse} />
        <EditClient visible={editPopupVisible} client={currClient} popupResponse={editPopupResponse} />
      </div>
    );
  }
  
  export default ManageClients;
  