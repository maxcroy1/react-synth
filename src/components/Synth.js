import React from 'react';
import {Reverb, Gain, Distortion, Destination} from 'tone';
import Keyboard from './Keyboard'
import Effects from '../containers/Effects'

export default class SynthA extends React.Component {

  state={
    keymappings: {
      a: "C4",
      w: "Csh4",
      s: "D4",
      e: "Dsh4",
      d: "E4",
      f: "F4",
      t: "Fsh4",
      g: "G4",
      y: "Gsh4",
      h: "A4",
      u: "Ash4", 
      j: "B4",
      k: "C5",
      o: "Csh5",
      l: "D5",
      p: "Dsh5",
      ":": "E5",
      "'": "F5"
    },
    reverb: {
      wet: 0,
      decay: 0.1
    },
    gain: 50
}

wetSlider = (e) => {
  this.setState({
    reverb: {
      ...this.state.reverb,
      wet: parseFloat(e.target.value)
    }
  })
}

decaySlider = (e) => {
  this.setState({
    reverb: {
      ...this.state.reverb,
      decay: parseFloat(e.target.value)
    }
  })
}

gainSlider = (e) => {
    this.setState({gain: e.target.value})
}

componentDidMount() {
    const self = this;

    function playKey(event) {
      let key = event.key
      if (self.state.keymappings[key]) {
        let note = (self.state.keymappings[key]).replace('sh', '#')
        const reverb = new Reverb({"wet": self.state.reverb.wet, "decay": self.state.reverb.decay})
        const synth = self.props.synth.chain(reverb, Destination)
        synth.triggerAttackRelease(`${note}`)
        self.setState({note: self.state.keymappings[key]})
        let svg = document.getElementById(`${self.state.note}`)
        if ((svg.id).includes('sh')) {
          svg.setAttribute("fill", "skyblue")
        } else {
          svg.setAttribute("fill", "tomato")
        }
      }
    }
    // if clicked is true -- add a className with a # before note
    function endKey(event) {
      let key = event.key
      if (self.state.keymappings[key]) {
        self.props.synth.triggerRelease()
        let svg = document.getElementById(`${self.state.note}`)
        if ((svg.id).includes('sh')) {
          svg.setAttribute("fill", "black")
        } else {
          svg.setAttribute("fill", "white")
        }
      }
    }

    document.addEventListener('keydown', playKey)
    document.addEventListener('keyup', endKey)
  }

  render() {
      return (
          <div>
            <Effects wetSlider={this.wetSlider} gainSlider={this.gainSlider} gain={this.state.gain} reverb={this.state.reverb} decaySlider={this.decaySlider}/>
            <Keyboard />
          </div>
      )
  }
}