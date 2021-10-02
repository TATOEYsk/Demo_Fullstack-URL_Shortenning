import React, {useState} from 'react';
import Axios from 'axios';
import validator from 'validator/lib/isURL';
import './App.css';


const App= ()=> {

  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");

  function handleInputChange(e){
    setUrl(e.target.value);
    
  };

  function handleFormSubmit(e){
    e.preventDefault();
    const validURL = validator(url,{
      require_protocol:true
    });
    if (!validURL){
      alert('Please ensure this url is correct and includes the http(s) protocol.');
    }else{
      console.log('URL is: ',url);
      // Post values
      Axios.post('https://node-mongodb-url-shortner.herokuapp.com/api/shorten',{
      url: url
    })
      .then(res =>{
        console.log(res.data.hash);
        setLink(`http://shortening.spyw.com/${res.data.hash}`);
      })
      .catch((err) =>{
        console.log(err);
      })
    }
    
  };



  return (
    <div className="container">
    <div className="body-wrap">
    <header>
      <h1><span className="highlight">Demo</span>l.ink</h1>
      <small>...I need self development.</small>
    </header>
    <main>     
      
      <form onSubmit={handleFormSubmit}>
        <fieldset>
      <input type="text" name="url"
       placeholder="Enter URL including the http(s) protocol" 
       onChange={handleInputChange}></input>
      <input type="submit" value="shorten"></input>  
        </fieldset>
        <fieldset className={link !=='' ? 'display-result' : 'hide-result'}>
          <span id="result">{link}</span>
        </fieldset>
      </form>           
    </main>
    </div>
    </div>
  );
}

export default App;
