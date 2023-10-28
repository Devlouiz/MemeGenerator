import React from 'react'
import { useState,useEffect } from 'react'

const Meme = () => {
    const [ memeUI,setmemeUI]= useState({
        toptext: "",
        bottomtext: "",
        randommeme:"",
    })
    const [ allmeme,setallmeme ] = useState({})

    useEffect(() =>{
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(data => setallmeme(data))
    },[])

    const memeGen = () => {
        const memelist = allmeme.data.memes
        const randomnum = Math.floor(Math.random() * memelist.length)
        const randomimg =  memelist[randomnum].url

        setmemeUI( prevmemeUI => ({
            ...prevmemeUI,
            randommeme: randomimg
        }))
    }
    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setmemeUI(prevmemeUI => ({
            ...prevmemeUI,
            [name]: value
        }))
    }
  return (
    <div className='memeUI form'>
        <h3 className='introtxt'>Get creative with Memes, Generate a meme and customize the top and bottom text.</h3>
        <div className='inputtext'>
            <input 
            type="text"
            placeholder='toptext'
            value={memeUI.toptext}
            name='toptext'
            onChange={handleInputChange} />
            <input 
            type="text"
            placeholder='bottomtext'
            value={memeUI.bottomtext}
            name='bottomtext'
            onChange={handleInputChange} />
        </div>
        <button onClick={memeGen} type='button' className='button'> Generate Random Meme</button>
        <div className='imgtxt'>
            <img src={memeUI.randommeme} id="memeImage" alt="randommeme" />
            <h2 className='memetxt top'>{memeUI.toptext}</h2>
            <h2 className='memetxt bottom'>{memeUI.bottomtext}</h2>
        </div>
    </div>
  )
}

export default Meme