
import HoraAtual from "../HoraAtual";
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header__box}>
            <div>
                <h3>
                    Bem vindo à API de controle de produtos!
                </h3>
                <h6>
                    Aqui você pode adicionar produtos, editar e deletá-los quando quiser!
                </h6>
            </div>
            <div className={styles.time__box}>
                <HoraAtual />
            </div>
        </header>
    )
}

export default Header;