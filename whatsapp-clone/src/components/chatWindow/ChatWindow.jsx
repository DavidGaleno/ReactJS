import './ChatWindow.css'
import EmojiPicker from 'emoji-picker-react'
import Api from '../../api/api'
import {useState,useEffect,useRef} from 'react' 
import SearchIcon from '@mui/icons-material/Search'
import AttachFile from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import MicIcon from '@mui/icons-material/Mic'
import MessageItem from '../messageitem/MessageItem'
export default function ChatWindow({activeChat,user}){

    const [users,setUsers] = useState([])

    const body = useRef()
    let recognition = null
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition()
    } 

  

    function handleEmojiClick(e,emoji){
        setText(text+emoji.emoji)
    }
    const [text,setText] = useState('')
    const[emojiActive,setEmojiActive] = useState(false)
    const [listening,setListening] = useState(false)
    const [list,setList] = useState([])
    
    

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
           body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
   },[list])

   useEffect(()=>{
        setList([])
        let unsub = Api.onChatContent(activeChat.chatId,setList,setUsers)
        return unsub
   },[activeChat.chatId])

    function handleMicClick(){
        if(recognition !== null){
            recognition.onstart = ()=> {
                setListening(true)
            }
            recognition.onend = ()=>{
                setListening(false)
            }
            recognition.onresult = (e)=>{
                setText(e.results[0][0].transcript)
            }
            recognition.start()  
        }
    }

    function handleSendClick(){
        if(text==='' || text=== ' ') return
        Api.sendMessage(activeChat,user.id,'text',text,users)
        setText('')
        setEmojiActive(false)
    }

    const handleKeyPress = (e)=>{
        if(e.key !== 'Enter') return
        handleSendClick()
    }

    return(
        <div className='active-chat'>
            <div className="active-chat-header">
                <div className="active-chat-info">
                    <img className="active-chat-avatar" src={require(`../../images/${activeChat.avatar}`)} alt="Image" />
                    <div className="active-chat-name">{activeChat.title}</div>
                </div>
                    <div className="header-buttons">
                        <div className="header-button">
                            <SearchIcon style={{color:'#919191',fontSize:25}}/>
                        </div>
                            <div className="header-button">
                                <MoreVertIcon style={{color:'#919191',fontSize:25}}/>
                            </div>
                    </div>

            </div>
            <div ref={body} className="active-chat-body">
                {list.map((item,key)=>(
                    <MessageItem key={key} data={item} user={user}/>
                ))}
            </div>
            <div className="emoji-area" style={{height: emojiActive ? '25rem' : 0}}>
                            <EmojiPicker disableSearchBar onEmojiClick={handleEmojiClick}/>
                        </div>
            <div className="active-chat-footer">
                <div className="footer-pre">
                <div className="header-button" style={{width: emojiActive ? '4rem' : 0}}>
                            <CloseIcon style={{color:'#919191',fontSize:25,opacity: emojiActive ? 1 : 0,transition: '.5s'}} onClick={()=>setEmojiActive(false)}/> 
                </div>
                <div className='header-button'>
                            <InsertEmoticonIcon style={{fontSize:25,color: emojiActive ? '#009688' : '#919191',transition: '.5s'}} onClick={()=>setEmojiActive(true)}/>
                </div>
                     <div className="header-button">
                                <AttachFile style={{color:'#919191',fontSize:25}}/>
                            </div>
                </div>
                <div className="footer-input">
                    
                    <input type="text" name="" id="" placeholder="Digite uma mensagem" value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={e=> handleKeyPress(e)}/>
                </div>
                <div className="footer-pos">
                <div className="header-button">
                              {text ? <SendIcon style={{color:'#919191',fontSize:25}} onClick={handleSendClick}/> : <MicIcon onClick={handleMicClick} style={{color: listening ? '#126ECE' : '#919191',fontSize:25}}/>}
                            </div>
                </div>
            </div>
        </div>
    )
}