import React from 'react';
import {Reverb, Gain, Destination} from 'tone';
import Keyboard from './Keyboard'
import Effects from '../containers/Effects'
import Preset from './Preset'

export default class Synth extends React.Component {

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
      ";": "E5",
      "'": "F5"
    },
    reverb: {
      wet: 0,
      decay: 0.1
    },
    gain: 0.5
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
    this.setState({gain: parseFloat(e.target.value)})
}

applyPreset = (preset) => {
  this.setState({
    reverb: {
      wet: preset.reverb_wet,
      decay: preset.reverb_decay
    },
    gain: preset.gain
  })
}

playKey = (event) => {
  if (event.repeat) {
    return null
  } else {
    let key = event.key
    if (this.state.keymappings[key]) {
      let note = (this.state.keymappings[key]).replace('sh', '#')
      const synth = this.props.synth
      synth.disconnect()
      const reverb = new Reverb({"wet": this.state.reverb.wet, "decay": this.state.reverb.decay})
      const gain = new Gain({"gain": this.state.gain})
      synth.chain(reverb, gain, Destination)
      synth.triggerAttackRelease(`${note}`)
      this.setState({note: this.state.keymappings[key]})
      let svg = document.getElementById(`${this.state.note}`)
      if ((svg.id).includes('sh')) {
        svg.setAttribute("fill", "skyblue")
      } else {
        svg.setAttribute("fill", "tomato")
      }
    }
  }
}

endKey = (event) => {
  let key = event.key
  if (this.state.keymappings[key]) {
    this.props.synth.triggerRelease()
    let svg = document.getElementById(`${this.state.note}`)
    if ((svg.id).includes('sh')) {
      svg.setAttribute("fill", "black")
    } else {
      svg.setAttribute("fill", "white")
    }
  }
}

componentDidMount() {
    const self = this;

    document.addEventListener('keydown', self.playKey)
    document.addEventListener('keyup', self.endKey)
  }

  render() {
      return (
          <div>
            {this.props.presets.map(preset => <Preset preset={preset} applyPreset={this.applyPreset}/>)}
            <Effects wetSlider={this.wetSlider} gainSlider={this.gainSlider} gain={this.state.gain} reverb={this.state.reverb} decaySlider={this.decaySlider} user={this.props.user}/>
            <Keyboard playKey={"playkey"}/>
          </div>
      )
  }
}