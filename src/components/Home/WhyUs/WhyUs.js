import React from 'react'
import classes from "./WhyUs.module.css"
import undraw2 from "../../../assets/img/undraw2.svg"
import alert from "../../../assets/img/alert.svg"

const WhyUs = () => {

    const Card = () => {
        return (
            <div className={classes.card}>

                <div className={`${classes.cardContent} ${classes.reverse}`}>
                    <div className={classes.cardImage}>
                        <img src={alert} alt='' />
                    </div>
                    <div className={classes.cardData}>
                        <h2>Alerts and Notifications</h2>
                        <p>Mandeer Stock API allows users to set up alerts and notifications for specific stocks, market events, or news.</p>
                    </div>
                </div>
                <div className={classes.cardContent}>
                    <div className={classes.cardImage}>
                        <img src={undraw2} alt='' />
                    </div>
                    <div className={classes.cardData}>
                        <h2>Real-Time Financial Information</h2>
                        <p>
Mandeer Stock API delivers real-time financial information, providing users instant access to live stock prices, up-to-the-minute market trends, and timely financial news.</p>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className={classes.container}>
        <div className={classes.content}>
            <p className={classes.heading}>Why Mandeer Stock API?</p>
            <div className={classes.whyus}>
               <div className={classes.image}>
               <img src={undraw2} alt='whyus' />
               </div>
               <div className={classes.data} >
                <p>Financial News and Updates</p>
                <p>Research and Analysis</p>
               </div>
            </div>
            <Card />
        </div>
    </div>
  )
}

export default WhyUs