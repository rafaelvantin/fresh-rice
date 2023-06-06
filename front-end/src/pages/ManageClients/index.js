import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeletePopup from '../../components/DeletePopup';

import styles from './styles.module.css';

const ManageClients = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [popupVisible, setPopupVisible] = useState(false);
    const [currClient, setCurrClient] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // CALL API FOR NUMBER OF TOTAL PAGES
        setTotalPages(5);
        // CALL API FOR DATA OF CURRENT PAGE

    }, []);

    useEffect(() => {
        // CALL API FOR DATA OF CURRENT PAGE
    }, [page]);


    const openPopup = (client) => {
        setCurrClient(client);
        setPopupVisible(true);
    }



    const renderDataTable = () => {
        // CALL API FOR CURRENT PAGE

        // MOCK
        const data = {
            clients: [
                { id: 1, name: 'João', orders: 5 },
                { id: 2, name: 'Maria', orders: 10 },
                { id: 3, name: 'José', orders: 15 },
                { id: 4, name: 'Pedro', orders: 20 },
                { id: 5, name: 'Ana', orders: 25 },
                { id: 6, name: 'Paulo', orders: 30 },
                { id: 7, name: 'Carlos', orders: 35 },
                { id: 8, name: 'Mariana', orders: 40 },
                { id: 9, name: 'Fernanda', orders: 45 },
                { id: 10, name: 'Rafael', orders: 50 },
            ]
        };

        return data.clients.map((client) => {
            return (
                <tr className={styles.tr} key={client.id}>
                    <td className={styles.td}>{client.id}</td>
                    <td className={styles.td_name}>{client.name}</td>
                    <td className={styles.td}>{client.orders}</td>
                    <td className={styles.td}>
                        <div className={styles.operationsContainer}>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => navigate(`/admin/clients/${client.id}`)}>edit_square</i>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openPopup(client)} style={{marginLeft: '8px', marginTop: '3px'}}>delete</i>
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
        <h1 className={styles.welcome}>Clientes</h1>
        
        <div className={styles.table}>
            <table>
                <thead>
                    <tr className={styles.thead}>
                        <td className={styles.th}>ID</td>
                        <td className={styles.th_name}>Nome</td>
                        <td className={styles.th}>Pedidos</td>
                        <td className={styles.th}>Editar</td>
                    </tr>
                </thead>
                <tbody>{renderDataTable()}</tbody>
            </table>
            {renderPagination()}
        </div>

        <DeletePopup visible={popupVisible} setVisible={setPopupVisible} client={currClient} />
      </div>
    );
  }
  
  export default ManageClients;
  