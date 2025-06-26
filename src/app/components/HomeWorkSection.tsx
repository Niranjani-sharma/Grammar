import {FC} from 'react'
import { HomeWorkListType } from './lists/HomeWork'
import styles from '../home.module.scss'
import Image from 'next/image'

interface HomeWorkSectionProps {
   data : HomeWorkListType
}

const HomeWorkSection:React.FC<HomeWorkSectionProps> = ({data})=>{
   return <div className={styles.home__work__section}>
         <h5 style={{fontWeight:'bold',height:'50px'}}>{data.title}</h5>
         <div className={styles.home__work__section__icons__container__up}>
            <div style={{width:'50%'}}>
               <Image className={styles.home__work__section__icon} src={data.img0} alt="icon" width={40} height={40} />
               <p className={styles.home__work__section__text}>{data.text0}</p>
            </div>
            <div style={{width:'50%'}}>
               <Image className={styles.home__work__section__icon} src={data.img1} alt="icon" width={40} height={40} />
               <p className={styles.home__work__section__text}>{data.text1}</p>
            </div>
         </div>
         <div className={styles.home__work__section__icons__container__down}>
            <div style={{width:'50%'}}>
               <Image className={styles.home__work__section__icon} src={data.img2} alt="icon" width={40} height={40} />
               <p className={styles.home__work__section__text}>{data.text2}</p>
            </div>
            <div style={{width:'50%'}}>
               <Image className={styles.home__work__section__icon} src={data.img3} alt="icon" width={40} height={40} />
               <p className={styles.home__work__section__text}>{data.text3}</p>
            </div>
         </div>
      </div>
}

export default HomeWorkSection