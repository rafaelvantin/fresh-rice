import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Products from '../../products.json';

import DeletePopup from '../../components/DeletePopup';
import EditProduct from '../../components/EditProduct';
import ArrowBack from '../../components/ArrowBack';

import styles from './styles.module.css';
import Header from '../../components/header';

const ManageProducts = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [products, setProducts] = useState([]);

    const [deletePopupVisible, setDeletePopupVisible] = useState(false);
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [currProduct, setCurrProduct] = useState({});

    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Fresh Rice - Gerenciar Admins";
        // CALL API FOR NUMBER OF TOTAL PAGES
        setTotalPages(2);

        searchProduct();
    }, []);
    
    useEffect(() => {
        searchProduct();
    }, [page]);

    const openDeletePopup = (client) => {
        setCurrProduct(client);
        setDeletePopupVisible(true);
    }
    const openEditPopup = (client) => {
        setCurrProduct(client);
        setEditPopupVisible(true);
    }


    const searchProduct = () => {
        // CALL API FOR SEARCH
        if(search === '') {
            setProducts(Products.slice((page-1) * 10, page * 10));
            return;
        }

        const filteredProducts = Products.filter((product) => product.nome.toLowerCase().includes(search.toLowerCase()));
        setProducts(filteredProducts.slice((page-1) * 10, page * 10));
    }

    const deletePopupResponse = (response) => {
        
        if(response === true) {
            // CALL API TO DELETE currProduct.id
        }

        searchProduct();
        setDeletePopupVisible(false);
        setCurrProduct({});
    }

    const editPopupResponse = (response, newProd = {}) => {
        if(response === true) {
            // CALL API TO EDIT currProduct.id
        }

        searchProduct();
        setEditPopupVisible(false);
        setCurrProduct({});
    }


    const renderDataTable = () => {
        if(products.length === 0) {
            return (
                <tr className={styles.tr}>
                    <td className={styles.td_name} colSpan="4">Nenhum produto encontrado</td>
                </tr>
            );
        }

        return products.map((product) => {
            return (
                <tr className={styles.tr} key={product.id}>
                    <td className={styles.td}>{product.id}</td>
                    <td className={styles.td_name}>{product.nome}</td>
                    <td className={styles.td}>R${product.preco.toFixed(2)}</td>
                    <td className={styles.td}>{product.estoque}</td>
                    <td className={styles.td}>
                        <div className={styles.operationsContainer}>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openEditPopup(product)}>edit_square</i>
                            <i className={`material-symbols-outlined ${styles.icon}`} onClick={() => openDeletePopup(product)} style={{marginLeft: '8px', marginTop: '3px'}}>delete</i>
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

        <h1 className={styles.welcome}>Produtos</h1>


        <div className={styles.searchbar}>
            <input className={styles.input} type="text" placeholder="Pesquisar pelo nome" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={() => searchProduct()} />
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

        <div className={styles.add} onClick={() => navigate('/admin/products/add')}>
            <i className={`material-symbols-outlined ${styles.icon}`}>add</i>
        </div>

        <DeletePopup visible={deletePopupVisible} nome={currProduct.nome} popupResponse={deletePopupResponse} />
        <EditProduct visible={editPopupVisible} product={currProduct} popupResponse={editPopupResponse} />
      </div>
    );
  }
  
  export default ManageProducts;
  