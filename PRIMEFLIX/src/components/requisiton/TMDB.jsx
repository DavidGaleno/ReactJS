const API_KEY = '5fb8cff009e93c091fcd119f20942bc4'
const API_BASE = 'https://api.themoviedb.org/3'


async function basicFetch(endpoint){
    const req= await fetch(`${API_BASE}${endpoint}`)
    const resp = await req.json()
    return resp
}

export default {
    getHomeList: async ()=>{
        return[
            {
                slug:'suggests',
                title: 'Suggests',
                items: await basicFetch(`/discover/tv?api_key=${API_KEY}&with_network=213&language=en-US`)
            },
            {
                slug: 'trending',
                title:'Trending',
                items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&language=en-US`)
            },
            {
                slug: 'toprated',
                title: 'Top Rated',
                items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}&language=en-US`)
            },
            {
                slug: 'action',
                title:'Action',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`)

            },
            {
                slug: 'comedy',
                title:'Comedy',
                items:await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`)

            },
            {
                slug: 'horror',
                title:'Horror',
                items:await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`)

            },
            {
                slug: 'anime',
                title:'Anime',
                items:await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=16&language=en-US`)

            },
            {
                slug:'documentary',
                title:'Documentary',
                items:await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US`)
            }
        ]
    }, 
    getMovieInfo: async (movieID,category)=>{
        let info = {}

        if(movieID){
            switch(category){
                case 'movie':
                    info = await basicFetch(`/movie/${movieID}?api_key=${API_KEY}&language=en-US`)
                break
                case 'tv':
                    info = await basicFetch(`/tv/${movieID}?api_key=${API_KEY}&language=en-US`)
                break
                default:
                    info =  null
                break
            }
        }

        return info
    }
}