import { useState, useMemo } from "react";
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
    const [numberPages, setNumberPages] = useState(1);
    const [price, setPrice] =useState([20, 37]);

    const handleChange = (event, newValue) => {
        setPrice(newValue);
    };

    const currentTableData = useMemo(() => {
       
        const lastPageIndex = 0 + numberPages*PageSize;
        return products.slice(0, lastPageIndex);
    }, [numberPages]);

    function handlePagination(){
        setNumberPages(numberPages +1);
    }
    return (
        <>
        <Header />
        <main>
            <div>
                <h3>
                    Filtrar
                </h3>
                <div>
                    <h4>
                        Forma da armação
                    </h4>
                    <div>
                        <input type="checkbox" id="Redondo" name="Redondo" />
                        <label for="Redondo">Redondo</label>
                    </div>

                    <div>
                    <input type="checkbox" id="Piloto" name="Piloto" />
                    <label for="Piloto">Piloto</label>
                    </div>
                    <div>
                    <input type="checkbox" id="Quadrado" name="Quadrado" />
                    <label for="Quadrado">Quadrado</label>
                    </div>

                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={price}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />

                </div>
            </div>
            <div className={styles.boxProducts}>
            {
                currentTableData.map((product) => {
                    return (
                        <ProductSmall
                            key={product.id}
                            name={product.nome}
                            image={product.imagem}
                            price={product.preco}
                         />
                    )
                })
            }
            </div>
        </main>

        <Button onClick={handlePagination} width="150px" text={"Carregar mais"}/>
        </>
    )
}

export default Shop