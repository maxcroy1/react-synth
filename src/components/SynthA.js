import React from 'react';
import { AMSynth, Reverb } from 'tone';
import Keyboard from './Keyboard'
import Effects from '../containers/Effects'

export default class SynthA extends React.Component {

  state={
    reverb: false,
    gain: 50
}

handleReverb = () => {
    this.setState(previousState => {
        return {
            reverb: !previousState.reverb
        }
    })
    if (this.state.reverb){

    } else {
        
    }
}

gainSlider = (e) => {
    this.setState({gain: e.target.value})
}

componentDidMount() {
    const synth = new AMSynth().toDestination();
    const self = this;
    function playKey(event) {
      let key = event.key
      if (self.props.keymappings[key]) {
        let note = (self.props.keymappings[key]).replace('sh', '#')
        synth.triggerAttackRelease(`${note}`)
        self.setState({note: self.props.keymappings[key]})
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
      if (self.props.keymappings[key]) {
        synth.triggerRelease()
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
            <Effects handleReverb={this.handleReverb} gainSlider={this.gainSlider} gain={this.state.gain}/>
            <Keyboard />
          </div>
      )
  }
}