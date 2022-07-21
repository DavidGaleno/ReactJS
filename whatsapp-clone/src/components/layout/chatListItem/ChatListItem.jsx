import './ChatListItem.css'
import {useState,useEffect} from 'react'
export default function ChatListItem({onClick,active,data}){
    
    const [time,setTime] = useState('')

    useEffect(()=>{
        if(data.lastMessageDate > 0){
            let date = new Date(data.lastMessageDate.seconds * 1000)
            let hours = date.getHours()
            let minutes = date.getMinutes()
            setTime(`${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes: minutes}`)
        }
    },[data])

    return(
        <div className={`chat-list-item ${active && 'active'}`} onClick={onClick}>
            <img className='contact-avatar' src={require(`../../../images/${data.avatar}`)} alt='Avatar'/>
            <div className='lines'>
                <div className='line'>
                    <div className='contact-name'>
                        {data.title}
                    </div>
                    <div className='date'>
                        {time}
                    </div>
                </div>
                <div className='line'>
                    <div className='last-message'>
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}