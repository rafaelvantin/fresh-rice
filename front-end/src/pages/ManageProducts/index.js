import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import api from '../../services/api';
// import Products from '../../products.json';

import DeletePopup from '../../components/DeletePopup';
import EditProduct from '../../components/EditProduct';
import ArrowBack from '../../components/ArrowBack';

import styles from './styles.module.css';
import Header from '../../components/header';

const ManageProducts = () => {

    useEffect(() => {
        document.title = "Fresh Rice - Gerenciar Produtos";
    }, []);

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
        searchProduct();
    }, []);
    
    useEffect(() => {
        searchProduct();
    }, [page]);

    const openDeletePopup = (product) => {
        setCurrProduct(product);
        setDeletePopupVisible(true);
    }
    const openEditPopup = (product) => {
        setCurrProduct(product);
        setEditPopupVisible(true);
    }


    const searchProduct = async () => {
        // CALL API FOR SEARCH
        try{
            if(products.length === 0) {
                const { data } = await api.get('/products');
    
                setProducts(data.products);
                setTotalPages(data.totalPages);
                setPage(data.currentPage);
                
                return;
            }
    
            const { data } = await api.get(`/products?page=${page}&name=${search}`);
    
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setPage(data.currentPage);
        } catch(err) {
            console.log(err);
        }
    }

    const deletePopupResponse = (response) => {
        if(response === true) {
            toast.promise(
                api.delete(`/products/${currProduct._id}`)
                .then((response) => {
                    searchProduct();
                    setDeletePopupVisible(false);
                    setCurrProduct({});
                })
                .catch((err) => {
                    throw new Error(err.response.data.error);
                }), {
                    pending: "Deletando produto...",
                    success: "Produto deletado com sucesso!",
                    error: {
                        render({ data }) {  
                            return `${data}`;
    
                        }
                    }
                }
            );       
        } else {
            searchProduct();
            setDeletePopupVisible(false);
            setCurrProduct({});
        }
    }

    const editPopupResponse = (response, newProd = {}) => {
        if(response === true) {
            let data = new FormData();

            data.append('name', newProd.name);
            data.append('price', newProd.price);
            data.append('stock', newProd.stock);
            data.append('description', newProd.description);
            data.append('color', newProd.color);
            data.append('frameMaterial', newProd.frameMaterial);
                            
            if(newProd.file)
                data.append('file', newProd.file, newProd.file.name);                

            toast.promise(
                api.put(`/products/${currProduct._id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    searchProduct();
                    setEditPopupVisible(false);
                    setCurrProduct({});
                })
                .catch((err) => {
                    throw new Error(err.response.data.error);
                }), {
                    pending: "Editando produto...",
                    success: "Produto editado com sucesso!",
                    error: {
                        render({ data }) {  
                            return `${data}`;
    
                        }
                    }
                }
            );       
        }
        else {
            searchProduct();
            setEditPopupVisible(false);
            setCurrProduct({});
        }

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
                    <td className={styles.td_name}>{product.name}</td>
                    <td className={styles.td}>R${product.price.toFixed(2)}</td>
                    <td className={styles.td}>{product.stock}</td>
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
                        <td className={styles.th_long}>Nome</td>
                        <td className={styles.th}>Preço</td>
                        <td className={styles.th}>Estoque</td>
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
  