import styles from "./styles.module.scss"

import tl from "./../../assets/svg/tl.svg"
import mouse from "./../../assets/svg/mouse.svg"


const Hero = () => {
    return ( 
        <div className={styles.hero}>
            <img src={tl} alt="TatarLearn" />
            <div className={styles.hero__scroll}>
                <img src={mouse} alt="" />
                <p>листайте ниже</p>
            </div>
        </div>
     );
}
 
export default Hero;