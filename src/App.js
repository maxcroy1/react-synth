import React from 'react';
import { AMSynth } from 'tone';

class App extends React.Component {

  state={
    keymappings: {
      a: "C4",
      w: "C#4",
      s: "D4",
      e: "D#4",
      d: "E4",
      f: "F4",
      t: "F#4",
      g: "G4",
      y: "G#4",
      h: "A4",
      u: "A#4", 
      j: "B4",
      k: "C5",
      o: "C#5",
      l: "D5",
      p: "D#5",
      ":": "E5",
      "'": "F5"
    }
  }

  componentDidMount() {
    const synth = new AMSynth().toDestination();
    const self = this;
    function playKey(event) {
      let key = event.key
      if (self.state.keymappings[key]) {
        synth.triggerAttackRelease(`${self.state.keymappings[key]}${self.state.octave}`)
      }
    }

    function endKey(event) {
      let key = event.key
      if (self.state.keymappings[key]) {
        synth.triggerRelease()
      }
    }

    document.addEventListener('keydown', playKey)
    document.addEventListener('keyup', endKey)
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
