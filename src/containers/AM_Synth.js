import React from 'react';
import {Destination, Chebyshev} from 'tone';
import Keyboard from '../components/Keyboard'
import Effects from '../components/Effects'
import Preset from '../components/Preset'
import {AMSynth} from 'tone'


export default class AM_Synth extends React.Component {

  state={
    Chebyshev: 1,
    synth: new AMSynth().toDestination()
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
    if (this.props.keymappings[key]) {
      let note = (this.props.keymappings[key]).replace('sh', '#')
      const synth = this.state.synth
      synth.triggerAttackRelease(`${note}`)
      this.setState({note: this.props.keymappings[key]})
      let svg = document.getElementById(`${this.state.note}`)
      if ((svg.id).includes('sh')) {
        svg.setAttribute("fill", "skyblue")
      } else {
        svg.setAttribute("fill", "tomato")
      }
    } else if(Object.values(this.props.keymappings).includes(key)){
      let note = key.replace('sh', '#')
      const synth = this.state.synth
      synth.triggerAttackRelease(`${note}`)
      this.setState({note: this.props.keymappings[key]})
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
  if (this.props.keymappings[key] && this.state.note) {
    this.state.synth.triggerRelease()
    let svg = document.getElementById(`${this.state.note}`)
    if ((svg.id).includes('sh')) {
      svg.setAttribute("fill", "black")
    } else {
      svg.setAttribute("fill", "white")
    }
  } else if(Object.values(this.props.keymappings).includes(key)){
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
      if (this.state.synth) {
        this.state.synth.disconnect()
        this.state.synth.chain(this.props.reverb, this.props.gain, this.props.bitCrusher)
      }
      return (
          <div>
            {this.props.presets.map(preset => <Preset preset={preset} applyPreset={this.applyPreset}/>)}
            <Effects wetSlider={this.props.wetSlider} gainSlider={this.props.gainSlider} gain={this.props.gainSetting} reverb={this.props.reverbSettings} bitCrush={this.props.bitCrusherSettings} decaySlider={this.props.decaySlider} user={this.props.user} addLastPreset={this.props.addLastPreset} bcSlider={this.props.bitCrusherSlider} chebyshev={this.state.Chebyshev} chebySlider={this.chebySlider}/>
            <Keyboard playKey={this.playKey} endKey={this.endKey}/>
          </div>
      )
  }
}