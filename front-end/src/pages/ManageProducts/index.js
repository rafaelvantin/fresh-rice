import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeletePopup from '../../components/DeletePopup';

import styles from './styles.module.css';

const ManageClients = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [products, setProducts] = useState([]);

    const [popupVisible, setPopupVisible] = useState(false);
    const [currClient, setCurrClient] = useState({});

    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // CALL API FOR NUMBER OF TOTAL PAGES
        setTotalPages(5);
        // CALL API FOR DATA OF CURRENT PAGE

        setProducts([
            { id: 1, name: 'Óculos de Sol Rayban', price: 10.00, quantity: 5 },
            { id: 2, name: 'Armação de óculos Polaroid', price: 10.00, quantity: 5 },
            { id: 3, name: 'Óculos de Sol Rayban 2', price: 10.00, quantity: 5 },
            { id: 4, name: 'Armação de óculos Polaroid 2', price: 10.00, quantity: 5 },
            { id: 5, name: 'Óculos de Sol Rayban 3', price: 10.00, quantity: 5 },
            { id: 6, name: 'Armação de óculos Polaroid 3', price: 10.00, quantity: 5 },
            { id: 7, name: 'Óculos de Sol Rayban 4', price: 10.00, quantity: 5 },
            { id: 8, name: 'Armação de óculos Polaroid 4', price: 10.00, quantity: 5 },
            { id: 9, name: 'Óculos de Sol Rayban 5', price: 10.00, quantity: 5 },
            { id: 10, name: 'Armação de óculos Polaroid 5', price: 10.00, quantity: 5 },
        ]);

    }, []);

    useEffect(() => {
        // CALL API FOR DATA OF CURRENT PAGE
    }, [page]);


    const openPopup = (client) => {
        setCurrClient(client);
        setPopupVisible(true);
    }



    

    const searchProduct = () => {
        // CALL API FOR SEARCH
    }

    const popupResponse = (response) => {
        
        if(response === true) {
            // CALL API TO DELETE currClient.id
        }

        setProducts([]);
        setPopupVisible(false);
        setCurrClient({});
    }


    const renderDataTable = () => {
        // CALL API FOR CURRENT PAGE

        // MOCK
        

        if(products.length === 0) {
            return (
                <tr className={styles.tr}>
                    <td className={styles.td_name} colSpan="4">Nenhum cliente encontrado</td>
                </tr>
            );
        }

        return products.map((product) => {
            return (
                <tr className={styles.tr} key={product.id}>
                    <td className={styles.td}>{product.id}</td>
                    <td className={styles.td_name}>{product.name}</td>
                    <td className={styles.td}>R${product.price.toFixed(2)}</td>
                    <td className={styles.td}>{product.quantity}</td>
                    <td className={styles.td}>
                        <div className={styles.operationsContainer}>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => navigate(`/admin/products/${product.id}`)}>edit_square</i>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openPopup(product)} style={{marginLeft: '8px', marginTop: '3px'}}>delete</i>
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

    const handleKeyUp = (e) => {
        if(e.key === 'Enter') {
            searchProduct();
        }
    }


    return (
      <div className={styles.container}>
        <h1 className={styles.welcome}>Produtos</h1>

        <div className={styles.searchbar}>
            <input className={styles.input} type="text" placeholder="Pesquisar" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleKeyUp} />
            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => searchProduct()}>search</i>
        </div>
        
        <div className={styles.table}>
            <table>
                <thead>
                    <tr className={styles.thead}>
                        <td className={styles.th}>ID</td>
                        <td className={styles.th_name}>Nome</td>
                        <td className={styles.th}>Preço</td>
                        <td className={styles.th}>Vendidos</td>
                        <td className={styles.th}>Editar</td>
                    </tr>
                </thead>
                <tbody>{renderDataTable()}</tbody>
            </table>
            {renderPagination()}
        </div>

        <DeletePopup visible={popupVisible} name={currClient.name} popupResponse={popupResponse} />
      </div>
    );
  }
  
  export default ManageClients;
  