import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ProductSmall from "../../components/ProductSmall"
import Header from "../../components/header"
import products from "../../products.json"
import Button from "../../components/Button";
import styles from "./styles.module.css"
import Slider from '@mui/material/Slider';

const PageSize = 6;
function valuetext(value) {
    return `${value}°C`;
  }
const Shop = () => {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState("");

    const [numberPages, setNumberPages] = useState(1);
    const [price, setPrice] =useState([20, 37]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [listArmacoes, setListArmacoes] = useState(new Array(4).fill(true));

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
    }, [searchParams]);

    useEffect(() => {
        const prices = products.map((product) => product.price);
        setMaxPrice(Math.max(...prices));
    },[maxPrice]);

    const handleChangePrice = (event, newValue) => {
        setPrice(newValue);
    };
    

    const currentTableData = useMemo(() => {
        const lastPageIndex = 0 + numberPages*PageSize;
        
        const filterByPrice = products.filter((product) => product.price >= price[0] && product.price <= price[1]);
        
        const filterByArmacao = filterByPrice.filter((product) => { 
            if(listArmacoes[0] && product.frameMaterial === "Metal"){
                return true;
            }
            if(listArmacoes[1] && product.frameMaterial === "Acetato"){
                return true;
            }
            if(listArmacoes[2] && product.frameMaterial === "Plástico"){
                return true;
            }
            if(listArmacoes[3] && product.frameMaterial === "Titânio"){
                return true;
            }
            return false;
         })

        const filterBySearch = filterByArmacao.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
        
        return filterBySearch.slice(0, lastPageIndex);
    }, [numberPages, price, listArmacoes, search]);

    
    function handlePagination(){
        setNumberPages(numberPages +1);
    }

    function handleChangeCheckebox(index){
        const updatedCheckedState = listArmacoes.map((item, i) => 
             i === index ? !item : item
        );
        setListArmacoes(updatedCheckedState);
    }
    return (
        <>
        <Header />
        <main>
            <div className={styles.filter}> 
                <h3>
                    Filtrar
                </h3>
                <div>
                    <div>
                        <h4>
                            Material da armação
                        </h4>
                        <div>
                            <input 
                                type="checkbox" 
                                id="Metal" 
                                name="Metal"
                                checked={listArmacoes[0]}   
                                onChange={() => handleChangeCheckebox(0)}
                             />
                            <label htmlFor="Metal">Metal</label>
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                id="Acetato" 
                                name="Acetato"
                                checked={listArmacoes[1]}
                                onChange={() => handleChangeCheckebox(1)}
                                />
                            <label htmlFor="Acetato">Acetato</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                id="Plástico" 
                                name="Plástico"
                                checked={listArmacoes[2]}
                                onChange={() => handleChangeCheckebox(2)}
                                />
                            <label htmlFor="Plástico">Plástico</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                id="Titânio" 
                                name="Titânio"
                                checked={listArmacoes[3]}
                                onChange={() => handleChangeCheckebox(3)}
                                />
                            <label htmlFor="Titânio">Titânio</label>
                        </div>
                    </div>
                    <div>
                        <h4>
                            Preço
                        </h4>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={price}
                        onChange={handleChangePrice}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={maxPrice}
                    />
                    </div>

                </div>
            </div>
            <div className={styles.box}>
            <div className={styles.boxProducts}>
            {
                currentTableData.map((product) => {
                    return (
                        <ProductSmall
                            key={product.id}
                            name={product.name}
                            image={product.pathImage}
                            price={product.price}
                            id={product.id}
                         />
                    )
                })
            }

            </div>
            <Button onClick={handlePagination} width="150px" text={"Carregar mais"}/>

            </div>
        </main>

        </>
    )
}

export default Shop