import styles from './FeaturedMovie.module.css'
import Button from '../../layout/button/Button'
import loading from '../../../loading.svg'
export default function FeaturedMovie({item}){
        const year = new Date(item.first_air_date).getFullYear()
        const score = item.vote_average
        const sinopse = item.overview.substring(0,230)
       return(
        <section className={styles.featured} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path === null ? item.poster_path : item.backdrop_path})`}}>
             <h1>{item.name}</h1>
             <div className={styles.info}>
                <div className={score >= 8.0 ? styles.green : score >= 6.0 ? styles.yellow : styles.red}>
                    {item.vote_average === 0 ? <span className={styles.none}>N/A</span> : item.vote_average }
                </div>
                <div className='seasons'>
                    {item.number_of_seasons} Season{item.number_of_seasons > 1 && 's'}
                </div>
                <div className='year'>
                    {year}
                </div>
            </div>
            <div className={styles.sinopse}>
                {item.overview.length > sinopse.length ? sinopse+'...' : item.overview}
            </div>
            <div className={styles.buttons}>
                <Button text='► Watch' className='watch'></Button>
                <Button text='+ My List' className='mylist'></Button>
            </div>
            <div className={styles.genres}><strong>Genre{item.genres.length > 1 && 's'}:</strong> {item.genres.map((genre,index) => <span key={genre.id}>{genre.name.replace('&','')} </span>)}</div>
        </section>
       ) 
}