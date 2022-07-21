import './MessageItem.css'

export default function MessageItem({data,user}){
    console.log(user)
    console.log(data)
    return(
        <div className='messageLine' style={{justifyContent: data.author === user.id ? 'flex-end' : 'flex-start'}}>
                <div className='messageItem' id='messageItem' style={{backgroundColor: data.author === user.id ? '#dcf8c6' : 'white'}}>
                <div className='triangle' style={{left:data.author === user.id ? '' : '-.7rem',right: data.author === user.id ? '-.7rem' : '',borderTopColor: data.author === user.id ? '#dcf8c6' : 'white'}}></div>
                <div className='messageText'>{data.body}</div>
                <div className='messageDate'>20:07</div>
            </div>
        </div>
    )
}