import React from 'react'
import Hero from './Hero'
import Stats from './Stats'
import Business from './Business'
import  CardDeal  from './CardDeal'
import CTA from './CTA'
import styles from '../style'
const Home = ()=> {
    return (
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Hero />
                <Stats />
                <Business />
                <CardDeal />
                <CTA />
            </div>
        </div>
    )
}

export default Home;
