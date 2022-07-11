import './App.css';
import loading from './loading.svg'
import {useState,useEffect} from 'react'
import FeaturedMovie from './components/project/featuredMovie/FeaturedMovie';
import TMDB from './components/requisiton/TMDB';
import MoviesList from './components/project/moviesList/MoviesList';
import Container from './components/layout/container/Container';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer'
function App() {
  const [black,setBlack] = useState(false)
  const [moviesLists,setMoviesLists] = useState()
  const [featuredData,setFeaturedData] = useState(null)

  useEffect(()=>{
    const scrollListener = ()=>{
        if (window.scrollY> 10){
          setBlack(true)
        }
        else{
          setBlack(false)
        }
    }
    window.addEventListener('scroll',scrollListener)

    return ()=>{
    window.removeEventListener('scroll',scrollListener)
  }
  },[])
  useEffect(()=>{
    async function loadAll(){
      let list = await TMDB.getHomeList()
      setMoviesLists(list)
      let originals = list.filter(item=> item.slug === 'suggests' )
      let randomNumber = Math.floor(Math.random() * originals[0].items.results.length - 1)
      let chosen = originals[0].items.results[randomNumber]
      let chosenInfo = await TMDB.getMovieInfo(chosen.id,'tv')
      setFeaturedData(chosenInfo)
      console.log(chosenInfo)
    }
    // const loadAll = async() =>{
    //   let list = await TMDB.getHomeList()
    //   console.log(list)
    //   setMovieList(list)
    // }
    loadAll();
  },[])
  return (
    <Container>
      <Header background={black}/>
      {featuredData ? (<FeaturedMovie item={featuredData}/>) : (<img className='loading' src={loading}/>)}
      {moviesLists ? (moviesLists.map((item,key)=>(
      <MoviesList key={key} id={item.slug} title={item.title} items={item.items}/>))) : (<img className='loading' src={loading}/>)}
      <Footer/>
    </Container>
  )
}

export default App;
