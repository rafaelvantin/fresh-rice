import styles from "./styles.module.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from "react";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 900);

    const navigate = useNavigate();

  const updateMedia = () => {
      console.log(window.innerWidth)
      setDesktop(window.innerWidth > 900);
    };
  
    useEffect(() => {
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
    });

    useEffect(() => {
        document.title = "Fresh Rice";
    }, []);

  return (
    <>
    <Header />
    <div className={styles.container}>
       <h1 className={styles.title} >Fresh Rice</h1>
       <h3 className={styles.subtitle}>Jeito mais fácil de comprar óculos</h3>

       <button className={styles.button} onClick={() => navigate('/shop')}> Ver Produtos</button>
        <Carousel 
          autoPlay={true}
          interval={4000}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
          width={"70%"}
          className={styles.carouselContainer}
        >
          <div>
          <img src="../../../img/glasses_guy.png" alt="Homem de óculos" width={"800px"}/>
          </div>
          <div>
          <img src="../../../img/mens_og.avif" alt="Homem de óculos" width={"800px"}/>
          </div>
      </Carousel>
      <h1 className={styles.title}>Lançamentos</h1>
      <h3 className={styles.subtitle}>Temos ótimas notícias para os amantes de óculos! A loja acaba de receber uma nova coleção de armações e lentes incríveis, perfeitas para todos os estilos e necessidades de visão.</h3>
      <button className={styles.button}> Comprar</button>

      
     
    {
      isDesktop ? (<div className={styles.displayImg}>
                    <img src="../../../img/glasses_woman.png" alt="Mulher de óculos"/>
                    <img src="../../../img/glasses_woman_2.png" alt="Mulher de óculos"/>
                    <img src="../../../img/glasees_woman_3.png" alt="Mulher de óculos"/>
                  </div>
      ) : (<Carousel 
        autoPlay={true}
        interval={4000}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop={true}
        width={"70%"}
        className={styles.carouselContainer}
      >
        <div>
        <img src="../../../img/glasses_woman.png" alt="Mulher de óculos"/>
        </div>
        <div>
        <img src="../../../img/glasses_woman_2.png" alt="Mulher de óculos"/>
        </div>
        <div>
        <img src="../../../img/glasees_woman_3.png" alt="Mulher de óculos"/>
        </div>
      </Carousel>)
    }
    </div>
    </>
  );
}

export default Home;
