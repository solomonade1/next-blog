import React from 'react'
import styles from "./page.module.css"
import Image from "next/image"

const Footer = () => {
    return (
        <div className={styles.container}>
            <div>@2023 Akinsdev. All rights reserved.</div>

            <div className={styles.social}>
                <Image src="/1.png" width={15} height={15} className={styles.icon} alt="Akinsdev Facebook Account" />
                <Image src="/2.png" width={15} height={15} className={styles.icon} alt="Akinsdevev" />
                <Image src="/3.png" width={15} height={15} className={styles.icon} alt="Akinsdev" />
                <Image src="/4.png" width={15} height={15} className={styles.icon} alt="Akinsdevv" />
            </div>
        </div>
    )
}

export default Footer