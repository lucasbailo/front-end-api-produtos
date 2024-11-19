import React, { useEffect, useState } from "react";
import styles from "./HoraAtual.module.css"

function HoraAtual() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])

    return (
        <div>
            <p className={styles.time__display}>{time.toLocaleTimeString()}</p>
        </div>
    )
}

export default HoraAtual;