import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

import styles from './styles.module.css';
import ArrowBack from '../../components/ArrowBack';
import Header from '../../components/header';
import DeletePopup from '../../components/DeletePopup';
import EditAdmin from '../../components/EditAdmin';

const ManageClients = () => {

    useEffect(() => {
        document.title = "Fresh Rice - Gerenciar Administradores";
    }, []);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [admins, setAdmins] = useState([]);
    const [deletePopupVisible, setDeletePopupVisible] = useState(false);
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [currAdmin, setCurrAdmin] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
        // CALL API FOR NUMBER OF TOTAL PAGES
        setTotalPages(1);
        api.get('/admin').then((response) => {
            const { totalPages, users, currentPage } = response.data;
            setTotalPages(totalPages);
            setAdmins(users);
            setPage(currentPage);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    
    useEffect(() => {
        // CALL API FOR ADMINS
        api.get(`/admin?page=${page}&name=${search}`).then((response) => {
            const { users } = response.data;
            setAdmins(users);
        }).catch((err) => {
            console.log(err);
        });
    }, [page]);


    const openDeletePopup = (admin) => {
        setCurrAdmin(admin);
        setDeletePopupVisible(true);
    }
    const openEditPopup = (admin) => {
        setCurrAdmin(admin);
        setEditPopupVisible(true);
    }

    const deletePopupResponse = async (response) => {
        
        if(response === true) {
            await api.delete(`/admin/${currAdmin._id}`).then((response) => {
                console.log(response);
            }
            ).catch((err) => {
                console.log(err);
            }
            );
        }
        setSearch('');
        searchAdmin();
        setDeletePopupVisible(false);
        setCurrAdmin({});
    }

    const editPopupResponse = async (response, newAdmin = {}) => {
        if(response === true) {
            await api.put(`/admin/${currAdmin._id}`, newAdmin).then((response) => {
                console.log(response);
            }
            ).catch((err) => {  
                console.log(err);
            }
            );  
        }
        setSearch('');
        searchAdmin();
        setEditPopupVisible(false);
        setCurrAdmin({});
    }


    const searchAdmin = () => {
        // CALL API FOR SEARCH
        api.get(`/admin?&name=${search}`).then((response) => {
            const { users, totalPages, currentPage } = response.data;
            console.log(response.data);
            setTotalPages(totalPages);
            setPage(currentPage);
            setAdmins(users);
        }).catch((err) => {
            console.log(err);
        }  );
        
            
    }

    const renderDataTable = () => {
        if(admins.length === 0) {
            return (
                <tr className={styles.tr}>
                    <td className={styles.td_name} colSpan="4">Nenhum admin encontrado</td>
                </tr>
            );
        }

        return admins.map((admin) => {
            return (
                <tr className={styles.tr} key={admin._id}>
                    <td className={styles.td}>{admin._id}</td>
                    <td className={styles.td_name}>{admin.name}</td>
                    <td className={styles.td_name}>{admin.email}</td>
                    <td className={styles.td}>
                        <div className={styles.operationsContainer}>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openEditPopup(admin)}>edit_square</i>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openDeletePopup(admin)} style={{marginLeft: '8px', marginTop: '3px'}}>delete</i>
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

    const handleKeyUp = () => {
        searchAdmin();
    }


    return (
      <div className={styles.container}>
        <Header />
        <ArrowBack />

        <h1 className={styles.welcome}>Admins</h1>


        <div className={styles.searchbar}>
            <input className={styles.input} type="text" placeholder="Pesquisar por nome" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleKeyUp} />
            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => searchAdmin()}>search</i>
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
        <DeletePopup visible={deletePopupVisible} nome={currAdmin.name} popupResponse={deletePopupResponse} />
        <EditAdmin visible={editPopupVisible} admin={currAdmin} popupResponse={editPopupResponse} />
      </div>
    );
  }
  
  export default ManageClients;
  