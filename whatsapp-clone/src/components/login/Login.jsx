import './Login.css'
import TwitterIcon from '@mui/icons-material/Twitter'
import Api from '../../api/api'

export default function Login({onReceive}){
    const handleLogin =  async ()=>{
        let result = await Api.popUp()
        if (result){
            onReceive(result.user)
        }
        else{
            alert('Erro meu nobre')
        }

    }
    return(
            <div className="login"><span><button onClick={handleLogin}><TwitterIcon style={{fontSize:35}}/>Entrar com Twitter</button></span></div>
    )
}