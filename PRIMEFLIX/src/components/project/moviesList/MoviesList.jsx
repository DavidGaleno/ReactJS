import styles from  './MoviesList.module.css'
import {useState,useRef} from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect } from 'react';
export default function MoviesList({title,id,items}){
    const [imageWidth,setimageWidth] = useState(30)
    const [scrollX,setScrollX] = useState(0)
    const intervalRef = useRef(null) 
    let listWidth = items.results.length * (imageWidth * 0.9 * 10)

    useEffect(()=>{
        console.log(window.innerWidth)
        if (window.innerWidth <= 600){
            setimageWidth(10)
        }
        else if(window.innerWidth <= 665){
            setimageWidth(20)
        }
        else{
            setimageWidth(30)
        }
    },[window.innerWidth])


    const startLeftArrow = ()=>{
        if(intervalRef.current) return;
        intervalRef.current = setInterval(()=>{
            setScrollX(prevScrollX => {
                    if (prevScrollX + (Math.round(window.innerWidth/2)/10) >= 0){
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                    return 0
                    }
                    else{
                    return prevScrollX + (Math.round(window.innerWidth/2)/10)
                    }
            })
        },30)
    }


    const stopLeftArrow = ()=>{
        if(intervalRef.current){
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const startRightArrow = ()=>{
        intervalRef.current = setInterval(()=>{
            setScrollX(prevScrollX => {
               if((window.innerWidth - listWidth)/10 > (prevScrollX - (Math.round(window.innerWidth/2)/10))){
                if(window.innerWidth <= 600){
                    return (window.innerWidth - listWidth)/10 - 20
                   }
                else if(window.innerWidth <= 665){
                    return (window.innerWidth - listWidth)/10 - 40
                }
                else{
                    return (window.innerWidth - listWidth)/10 - 60
                }
               }
               else{
                return prevScrollX - (Math.round(window.innerWidth / 2)/10)
               }
            })
        },30)
    }

    const stopRightArrow = ()=>{
        if (intervalRef.current){
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }


    return(
        <section className={styles.list} id={id}>
                      <h2>{title}</h2>
                      <div className={styles.moviesArea}>
                        <div className={styles.movieRow} style={{marginLeft:scrollX+'rem',transition:.3+'s',width:items.results.length * (imageWidth * 10)}}>
                        <div className={styles.leftbutton} style={{opacity:scrollX >= 0 && '.3'}} >
                        <NavigateBeforeIcon style={{fontSize:50}}  onMouseDown={startLeftArrow} onMouseUp={stopLeftArrow} />
                      </div>
                      <div className={styles.rightbutton} style={{opacity:scrollX <=((window.innerWidth - listWidth)/10) && '.3'}}>
                        <NavigateNextIcon style={{fontSize:50}} onMouseDown={startRightArrow} onMouseUp={stopRightArrow}/>
                      </div>
                        {items.results.length > 0 && (items.results.map((item,key)=>(
                            <div className={styles.movie} key={key} style={{width: imageWidth + 'rem'}}><img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.original_title}/></div>
                        )))}
                      </div>
                  </div>
        </section>
    )
}