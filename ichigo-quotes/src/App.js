import {useState} from 'react';
import styled from 'styled-components';
import ichigo from './images/Ichigo.png'
import Quotes from './components/quotes'
import './App.css';
import jutsu from './audio/jutso.mp3'

const audio = new Audio(jutsu)
const frases = [ "Are you any different!? You sacrificed yourself to save me that time!! At that time, were you thinking about complicated stuff like 'this is my Shinigami duty'!? That's not what sacrificing yourself is!! At the very least, I'm different!! I haven't accepted any commitment. If things get bad, I might run away, since I'm not a good enough person to be able to sacrifice my life for total strangers. But, unfortunately, I'm also not trash that can live happily without paying back his debts!","I'm not superman, so I can't say anything big like I'll protect everyone on earth. I'm not a modest guy who will say it's enough if I can protect as many people as my two hands can handle either. I want to protect a mountain-load of people.", "All right. Let's do this, Chad. You keep doing your thing and don't fight for yourself, but fight for me. And I will fight for you. If you put your life on the line to protect something, then I'll put my life on the line to protect it too.", "The difference in strength...what about it? Do you think I should give up just because you're stronger than me? I've always known you were strong. Nothing I see now will change my mind. I will defeat you, Ulquiorra."]


function App() {  
  const [quoteState,setState] = useState({quote:'Aperte para gerar uma citação'})

  function bankai(){
    audio.play()
    let newQuote = parseInt(Math.random()*4)
    if(frases[newQuote] === quoteState.quote){
      bankai()
    }
    else{
    setState({
      quote: frases[newQuote]
    })
  } 
}
  
  return (
    <Content className="App">
      <Wrapper>
        <Quotes quote={quoteState.quote}></Quotes>
        <button type="button" className="btn btn-secondary" onClick={bankai}>Bankai</button>
      </Wrapper>
     <Ichigo src={ichigo} alt=""/>
    </Content>
  );
}

const Content= styled.div`
height: 100vh;
padding: 0 50px;
display:flex;
justify-content:center;
align-items:center;
`
const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`
const Ichigo = styled.img`
  max-width:50%;
  max-height:90%;
  align-self:flex-end;
`


export default App;
