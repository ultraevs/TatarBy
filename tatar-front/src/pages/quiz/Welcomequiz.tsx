import { MainLayout } from "../../components/MainLayout";
import { Quiz } from "../../components/Quiz";

import styles from "./styles.module.scss"
const Welcome = () => {
    return (
        <MainLayout>
            <div className={styles.test}>
                <h2>Тест на знание татарского языка</h2>
                <Quiz />
            </div>
        </MainLayout>
    );
}

export { Welcome };