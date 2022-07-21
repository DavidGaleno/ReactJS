import './App.css';
import {useState,useEffect,useRef} from 'react'
import Api from './api/api'
import Login from './components/login/Login';
import Container from './components/layout/container/Container';
import ChatListItem from './components/layout/chatListItem/ChatListItem';
import ChatIntro from './components/layout/chatIntro/ChatIntro';
import DonutLarge from '@mui/icons-material/DonutLarge'
import ChatWindow from './components/chatWindow/ChatWindow';
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import NewChat from './components/newChat/NewChat';
import Aside from './components/layout/aside/Aside';
function App() {

  const [chatList,setChatList] = useState([])
  const [activeChat,setActiveChat] = useState({})
  const [user,setUser] = useState({id:'V0Jbx2mCVkTtv3hZqGVIE6foNvr1', title: 'Fushigi', avatar:'https://pbs.twimg.com/profile_images/1528131516034912258/EYBh2CmK_normal.jpg'})
  const [scroll,setScroll] = useState(false)
  const [activeNewChat,setActiveNewChat] = useState(false) 

  const newChat = useRef()

  useEffect(()=>{
    window.alert("Projeto feito com base no video do Boenik Lacerca")
    window.alert("https://www.youtube.com/watch?v=BkX4niTo9Ow&t=15680s&ab_channel=BoniekyLacerda")
    window.alert("Social media illustrations by Storyset")
    window.alert("https://storyset.com/social-media")
  },[])
 

  function handleNewChat(){
    if (activeNewChat){
    newChat.current.style.left = '-50rem'; 
    setActiveNewChat(false)
    }
    else{
      newChat.current.style.left = 0
      setActiveNewChat(true)
    }
  }
  const handleLoginData = async (user)=>{
    let newUser = {
      id: user.uid,
      title:user.displayName,
      avatar: user.photoURL
    }
    await Api.addUser(newUser)
    setUser(newUser)
  }
   
  async function startNewConversation(user2){
       await Api.addNewChat(user,user2)
       handleNewChat()



        // if(chatList.length > 0){
        //  for (let i of chatList){
        //     if (chat.id === i.id){
        //       return
        //     }
        //  }
          
        // }
        // chatList.push(chat)
      
  }

  
  useEffect(()=>{
    if(user !== null ){
      let unsub = Api.onChatList(user.id,setChatList)
      return unsub
    }
  },[user])

  return (
    <Container>
      {user==null ? (<Login onReceive={handleLoginData}/>) : (
      <>
      <Aside>
      <NewChat refference={newChat} handleNewChat = {handleNewChat} user={user} chatList={chatList} startNewConversation={startNewConversation}/>
      <header>
                <img src={user.avatar} alt="Avatar" />
                <div className='buttons'>
                    <div className='button'>
                      <DonutLarge style={{color:'#919191',fontSize:25}}/>
                    </div>
                    <div className='button' onClick={handleNewChat}>
                      <ChatIcon style={{color:'#919191',fontSize:25}}/>
                    </div>
                    <div className='button'>
                      <MoreVertIcon style={{color:'#919191',fontSize:25}}/>
                    </div>
                </div>
            </header>

            <div className="search">
                <div className="searchinput"> 
                  <SearchIcon style={{color:'#919191',fontSize:25}}/>
                  <input type="search" placeholder="Search or start a new conversation"/>
                </div>
            </div>

            <div className="chatlist">
                {chatList.map((item,key) =>
                    <ChatListItem key={key} onClick={()=>{setActiveChat(chatList[key])}} active={activeChat.chatId === item.chatId ? true : false} data={item}/>
                )}
            </div>
      </Aside>
      <main>
      {!activeChat.chatId ? <ChatIntro/> : <ChatWindow activeChat={activeChat} user={user}/>}
      </main>
      </>
      )}
    </Container>
  );
}

export default App;
