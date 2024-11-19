import { GithubFilled, LinkedinFilled } from "@ant-design/icons";
import "./Footer.module.css"
import styles from "./Footer.module.css"

function Footer() {
    return (
        <footer>
            <div></div>
            <p className={styles.text__class}>DESENVOLVIDO POR LUCAS BAILO</p>
            <a className={styles.link__class} href="https://www.linkedin.com/in/lcsbailo/" target="_blank" rel="noreferrer noopener">
                <LinkedinFilled />
            </a>
            <a className={styles.link__class} href="https://github.com/lucasbailo" target="_blank" rel="noreferrer noopener">
                <GithubFilled />
            </a>
        </footer>
    )
}

export default Footer;