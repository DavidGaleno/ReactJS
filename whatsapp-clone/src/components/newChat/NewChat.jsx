import './NewChat.css'
import Api from '../../api/api'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import image from '../../images/avatar-image.png'
import {useState,useEffect} from 'react'

export default function NewChat({refference,handleNewChat,user,startNewConversation}){
    const [list,setList] = useState([])

    useEffect(()=>{
        const getList = async() =>{
          if (user!== null) {
            let results = await Api.getContactList(user.id) 
            setList(results)
          }
        }
        getList()
      },[user])

    return(
        <div className='newChat' ref={refference} >
            <div className='newChat--head'>
                <div className='newChat--backbutton' onClick={handleNewChat}>
                    <ArrowBackIcon style={{color:'white',fontSize:25}}/>
                </div>
                <div className='newChat--headtitle'>
                    Nova Conversa
                </div>
            </div>
            <div className='newChatList'>
                {list.map((item,key)=>(
                    <div className='newChat--item' key={key} onClick={()=>startNewConversation(item)}>
                        <img src={image} className='newChat--itemavatar'/>
                        <div className='newChat--itemname'>{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}