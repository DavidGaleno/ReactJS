import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import firebaseConfig from '../firebase/firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

export default {
    popUp: async ()=>{
        const provider = new firebase.auth.TwitterAuthProvider()
        let result = await firebaseApp.auth().signInWithPopup(provider)
        return result
    },
    addUser: async (user) => {
        await db.collection('users').doc(user.id).set({
            title: user.title,
            avatar: user.avatar                                                                 
        }, {merge:true})
    },
    getContactList: async(userid) =>{
        let list = []
        let results = await db.collection('users').get()
        results.forEach(result=> {
            let data = result.data()
            if (result.id !== userid){
                list.push({
                    id: result.id,
                    title: data.title,
                    avatar: data.avatar
                })
            }
        })
        return list
    },
    addNewChat : async(user,user2)=>{
        let newChat = await db.collection('chats').add({
            messages:[],
            users:[user.id,user2.id],

        })

        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user2.title,
                avatar: user2.avatar,
                with: user2.id
            })
        })

        db.collection('users').doc(user2.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user.title,
                avatar: user.avatar,
                with: user.id
            })
        })
    },
    onChatList: (userId,setChatList)=>{
        return db.collection('users').doc(userId).onSnapshot((doc)=>{
            if(doc.exists){
                let data = doc.data()

                if(data.chats){
                    let chats = [...data.chats]

                    chats.sort((actualChat,nextChat)=>{
                        if(actualChat.lastMessage === undefined){
                            return -1
                        }
                        if(actualChat.lastMessageDate.seconds < nextChat.lastMessageDate.seconds){
                            return 1
                        }
                        else {
                            return -1
                        }
                    })

                    setChatList(chats)
                }
            }
        })
    },
  onChatContent:(chatId,setList,setUsers)=>{
  
     return db.collection('chats').doc(chatId).onSnapshot((doc)=>{
        console.log(doc)
        if(doc.exists) {
           let data = doc.data()
           setList(data.messages)
           setUsers(data.users)
        }
     })
  },
  sendMessage: async (chatData,userId,type,message,users)=>{
        let now = new Date()
        db.collection('chats').doc(chatData.chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type:type,
                author:userId,
                body:message,
                date: now,

            })
        })

        for( let i in users){
            let user = await db.collection('users').doc(users[i]).get()
            let userData = user.data()
            if(userData.chats) {
                let chats = [...userData.chats]

                for (let e in chats){
                    if(chats[e].chatId == chatData.chatId){
                        chats[e].lastMessage = message
                        chats[e].lastMessageDate = now
                    }
                }
                await db.collection('users').doc(users[i]).update({
                    chats  
                })
            }
            else(console.log('oi'))

        }

  }
}
