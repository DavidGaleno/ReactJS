import './ChatIntro.css'
import aboveImage from '../../../images/Texting-bro.svg'
export default function ChatIntro(){
    return(
       <div className='chatIntro'>
            <img src={aboveImage} alt="Banner Whatsapp" />
            <h1>Mantenha seu celular conectado</h1>
            <h2>O Whatsapp conecta seu telefone para sincronizar suas mensagens. Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi</h2>
       </div>
    )
}