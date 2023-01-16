let root = ReactDOM.createRoot(document.querySelector("#container"))

function App() {

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(function() {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    const [meme, setMeme] = React.useState({
        randomImage: "welcome.jpg"
    })

    function getMeme() {
        const randomNumber = Math.floor(Math.random()*allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
                ...prevMeme, randomImage: url
            
        }))
    }

    const [textState, setTextState] = React.useState({
        topText: "",
        bottomText: ""
    })

    function handleChange(event) {
        setTextState(function(prevState) {
            return {
                ...prevState,
                [event.target.name] : event.target.value
            }
        })
    }





///================= The Actual Page ===============================

    return (
        <div>
            <nav>
                <div className="nav-div-one" >
                    <img className="nav-img" src="doge.png"/>
                    <h2>Meme Generator</h2>
                </div>
                <div className="nav-div-two" >
                    <h3>by Kieran M.</h3>
                </div>
            </nav>
            <div>
                <div className="text-div" >
                    <input type="text" placeholder="top text" name="topText" value={textState.topText} onChange = {handleChange}></input>
                    <input type="text" placeholder="bottom text" name="bottomText" value={textState.bottomText} onChange = {handleChange}></input>
                </div>
                <div className="custom-container">
                    <div className="button-div" >
                        <button onClick={getMeme}>Get new Image <img className="man-img" src="man.png"/></button>
                    </div>
                    <div className="custom-div">
                        <button className="custom-btn">Customize
                        </button>
                        <button className="custom-btn">Save</button>
                    </div>
                </div>
                <div className="meme-div" >
                    <p className="text top-text">{textState.topText}</p>
                    <p className="text bottom-text">{textState.bottomText}</p>
                    <img className="meme-img" src={meme.randomImage} />
                </div>
            </div>
        </div>
    )
}

root.render(<App />);
