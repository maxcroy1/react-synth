import React from 'react';
import {Reverb, Gain, Destination, BitCrusher, Chebyshev} from 'tone';
import Keyboard from './Keyboard'
import Effects from '../containers/Effects'
import Preset from './Preset'
import {FMSynth} from 'tone'


export default class FM_Synth extends React.Component {

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
    gain: 0.5,
    bitCrusher: -16,
    Chebyshev: 1,
    synth: new FMSynth().toDestination()
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

bitCrusherSlider = (e) => {
  this.setState({bitCrusher: parseFloat(e.target.value)})
}

chebySlider = (e) => {
  this.setState({Chebyshev: e.target.value})
}

applyPreset = (preset) => {
  this.setState({
    reverb: {
      wet: preset.reverb_wet,
      decay: preset.reverb_decay
    },
    gain: preset.gain,
    bitCrusher: preset.bitCrusher
  })
}

playKey = (event) => {
  if (event.repeat || event.target.nodeName === 'INPUT') {
    return null
  } else {
    let key = ""
    if(event.target.id){
      key = event.target.id
    }else{
      key = event.key
    }
    if (this.state.keymappings[key]) {
      let note = (this.state.keymappings[key]).replace('sh', '#')
      const synth = this.state.synth
      synth.disconnect()
<<<<<<< HEAD
      const reverb = new Reverb({"wet": this.state.reverb.wet, "decay": this.state.reverb.decay})
      const gain = new Gain({"gain": this.state.gain})
      const bitCrusher = new BitCrusher({'bits': -(this.state.bitCrusher)})
      const cheby = new Chebyshev(this.state.Chebyshev)
      synth.chain(reverb, gain, bitCrusher, cheby, Destination)
=======
>>>>>>> styles
      synth.triggerAttackRelease(`${note}`)
      this.setState({note: this.state.keymappings[key]})
      let svg = document.getElementById(`${this.state.note}`)
      if ((svg.id).includes('sh')) {
        svg.setAttribute("fill", "skyblue")
      } else {
        svg.setAttribute("fill", "tomato")
      }
    } else if(Object.values(this.state.keymappings).includes(key)){
      let note = key.replace('sh', '#')
      const synth = this.state.synth
      synth.disconnect()
      const reverb = new Reverb({"wet": this.state.reverb.wet, "decay": this.state.reverb.decay})
      const gain = new Gain({"gain": this.state.gain})
      const bitCrusher = new BitCrusher({'bits': -(this.state.bitCrusher)})
      const cheby = new Chebyshev(this.state.Chebyshev)
      synth.chain(reverb, gain, bitCrusher, cheby, Destination)
      synth.triggerAttackRelease(`${note}`)
      this.setState({note: this.state.keymappings[key]})
    }
  }
}

endKey = (event) => {
 let key = ""
    if(event.target.id){
      key = event.target.id
    }else{
      key = event.key
  }
  const synth = this.state.synth
  if (this.state.keymappings[key] && this.state.note) {
    this.state.synth.triggerRelease()
    let svg = document.getElementById(`${this.state.note}`)
    if ((svg.id).includes('sh')) {
      svg.setAttribute("fill", "black")
    } else {
      svg.setAttribute("fill", "white")
    }
  } else if(Object.values(this.state.keymappings).includes(key)){
    synth.triggerRelease()
  }
}

componentDidMount() {
    const self = this;
    document.addEventListener('keydown', self.playKey)
    document.addEventListener('keyup', self.endKey)
}

componentWillUnmount() {
  const self = this;
  document.removeEventListener('keydown', self.playKey)
  document.removeEventListener('keyup', self.endKey)
}

  render() {
      return (
          <div>
            {this.props.presets.map(preset => <Preset preset={preset} applyPreset={this.applyPreset}/>)}
            <Effects wetSlider={this.wetSlider} gainSlider={this.gainSlider} gain={this.state.gain} reverb={this.state.reverb} bitCrush={this.state.bitCrusher} decaySlider={this.decaySlider} user={this.props.user} addLastPreset={this.props.addLastPreset} bcSlider={this.bitCrusherSlider} chebyshev={this.state.Chebyshev} chebySlider={this.chebySlider}/>
            <Keyboard playKey={this.playKey} endKey={this.endKey}/>
          </div>
      )
  }
}