import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from  './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';

// added my own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '9a44025114f544a381b2e2f029f3adda'
});

const ParticleOptions= {
  particles: {
    number: {
      value:50,
        density: {
            enable: true,
            value_area: 800
          
        }
    }
  }
}

class App extends Component {
  constructor()
  {
    super();
    this.state={
      input:'',
      imageUrl:''
    }
  }
  onInputchange=(event)=>
  {
    this.setState({input:event.target.value});
  }
  onButtonSubmit=()=>
  {
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(
    function(response)
    {
console.log(response);
    },
    function(err)
    {

    }
    );
  }
  render()
  {
    return(
      <div className="App">
       <Particles className='particles'
                params={ParticleOptions}
                 />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm  on InputChange={this.onInputchange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
      );
  }
}

export default App;
