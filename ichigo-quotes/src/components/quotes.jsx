import styled from "styled-components"
function Quotes({quote}){
    return(
        <Quote>
            <blockquote><em>{quote}</em></blockquote>
            <Speaker>Kurosaki Ichigo</Speaker>
        </Quote>
    )
}

const Quote = styled.div`
    font-size:1.5em;
    margin: 0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color: rgba(0, 0, 0, 0.5);
    padding:1rem;
    border-radius:10px;
`

const Speaker = styled.cite `
    align-self:flex-end
`


export default Quotes