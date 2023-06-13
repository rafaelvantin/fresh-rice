import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Admins from '../../admins.json';

import styles from './styles.module.css';
import ArrowBack from '../../components/ArrowBack';
import Header from '../../components/header';

const ManageClients = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [admins, setAdmins] = useState([]);

    const [search, setSearch] = useState('');

    useEffect(() => {
        // CALL API FOR NUMBER OF TOTAL PAGES
        setTotalPages(1);

        searchAdmin();        
    }, []);
    
    useEffect(() => {
        searchAdmin();
    }, [page]);


    const searchAdmin = () => {
        // CALL API FOR SEARCH
        if(search === '') {
            setAdmins(Admins.slice((page-1) * 10, page * 10));
            return;
        }

        const filteredAdmins = Admins.filter((admin) => admin.nome.toLowerCase().includes(search.toLowerCase()));
        setAdmins(filteredAdmins.slice((page-1) * 10, page * 10));
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
                <tr className={styles.tr} key={admin.id}>
                    <td className={styles.td}>{admin.id}</td>
                    <td className={styles.td_name}>{admin.nome}</td>
                    <td className={styles.td_name}>{admin.email}</td>
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
                    </tr>
                </thead>
                <tbody>{renderDataTable()}</tbody>
            </table>
            {renderPagination()}
        </div>
      </div>
    );
  }
  
  export default ManageClients;
  