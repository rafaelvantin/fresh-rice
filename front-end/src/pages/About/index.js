import Header from "../../components/header"
import styles from "./styles.module.css"
const About = () => {
    return (
        <>
        <Header />
        <div className={styles.container}>
            <h1 className={styles.title} >Fresh Rice</h1>
            <h3 className={styles.subtitle}>Jeito mais fácil de comprar óculos</h3>

            <div className={styles.sub_main}>
                <div>
                    <h2 className={`${styles.title} ${styles['title-2']}`}>Quem somos</h2>
                    <p>
                    A Fresh Rice começou como uma ótica fundada na Alemanha em 1978 que, com o tempo, se tornou uma franquia de ótica internacional e após muitos pedidos, irá lançar seu próprio ecommerce.
                    </p>
                    <p>
                    Agora, com o lançamento do nosso ecommerce, a Fresh Rice quer levar a experiência única de compra de óculos para o conforto da sua casa. Com uma vasta seleção de óculos de sol e de grau das melhores marcas, você pode navegar pelo nosso site facilmente e encontrar o par perfeito para você. Nós também oferecemos lentes de alta qualidade para garantir que você tenha a melhor visão possível. Não perca a oportunidade de comprar seus óculos com a Fresh Rice e experimentar o que há de melhor em qualidade e conveniência.
                    </p>
                </div>
                <img src="../../img/glasses_woman.png" alt="Mulher de óculos" height={"200px"}/>
            </div>

            <div className={`${styles.sub_main} ${styles.sub_main3}`}>
                <h2 className={`${styles.title} ${styles['title-2']}`}>Missão</h2>
                    <p>
                    Nossa missão é revolucionar a indústria de óculos, oferecendo produtos inovadores que vão além da correção visual. Com design vanguardista e tecnologia de ponta, nossos óculos são verdadeiras obras de arte, refletindo a personalidade e estilo de cada indivíduo. Priorizamos a qualidade, durabilidade e oferecemos um atendimento personalizado, proporcionando uma experiência excepcional. Queremos transformar a forma como as pessoas enxergam e se expressam.                    </p>
            </div>
        </div>
        </>
    )
}

export default About