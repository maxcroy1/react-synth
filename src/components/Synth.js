import React from 'react';
import {MonoSynth, Reverb, Gain, BitCrusher, Chebyshev} from 'tone';
import Keyboard from './Keyboard'
import Effects from '../containers/Effects'
import Preset from './Preset'

export default class Synth extends React.Component {
  constructor(props){
    super(props);
    this.state={
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
      reverbSettings: {
        wet: 0,
        decay: 0.1
      },
      gainSetting: 0.5,
      bcSetting: -16,
      chebySetting: 1,
      synth: new MonoSynth().toDestination()
    };

    // Effects Callbacks
    this.wetSlider = this.wetSlider.bind(this);
    this.decaySlider = this.decaySlider.bind(this);
    this.gainSlider = this.decaySlider.bind(this);
    this.bitCrusherSlider = this.bitCrusherSlider.bind(this);
    this.chebySlider = this.chebySlider.bind(this);

    // Key Press Handlers
    this.playKey = this.playKey.bind(this);
    this.endKey = this.endKey.bind(this);

    // Preset Callback
    this.applyPreset = this.applyPreset.bind(this);

    // Synth Initializer
    this.synth = new MonoSynth().toDestination();

    // Effects Initializers
    this.reverb = new Reverb({"wet": this.state.reverbSettings.wet, "decay": this.state.reverbSettings.decay}).toDestination();
    this.gain = new Gain({"gain": this.state.gainSetting}).toDestination();
    this.bitCrusher = new BitCrusher({'bits': -(this.state.bcSetting)}).toDestination();
    this.chebyshev = new Chebyshev(this.state.chebySetting).toDestination();

    //Effects Compiler
    this.applySettings = this.applySettings.bind(this);
  }

  applySettings() {
    this.reverb.wet.value = this.state.reverbSettings.wet;
    this.reverb.decay = this.state.reverbSettings.decay;
    this.gain.gain.value = this.state.gainSetting;
    this.bitCrusher.bits.value = -this.state.bcSetting;
    this.chebyshev.order = this.state.chebySetting;
  }

  wetSlider = (e) => {
    this.setState({
      reverbSettings: {
        ...this.state.reverbSettings,
        wet: parseFloat(e.target.value)
      }
    })
  }

  decaySlider = (e) => {
    this.setState({
      reverbSettings: {
        ...this.state.reverbSettings,
        decay: parseFloat(e.target.value)
      }
    })
  }

  gainSlider = (e) => {
      this.setState({gainSetting: parseFloat(e.target.value)})
  }

  bitCrusherSlider = (e) => {
    this.setState({bcSetting: parseFloat(e.target.value)})
  }

  chebySlider = (e) => {
    this.setState({chebySetting: e.target.value})
  }

  applyPreset = (preset) => {
    this.setState({
      reverbSettings: {
        wet: preset.reverbSettings.wet,
        decay: preset.reverbSettings.decay
      },
      gainSetting: preset.gainSetting,
      bcSetting: preset.bcSetting,
      chebySetting: preset.chebySetting
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
        this.synth.triggerAttack(`${note}`)
        this.setState({note: this.state.keymappings[key]})
        let svg = document.getElementById(`${this.state.note}`)
        svg.setAttribute("fill", "tomato")
      } else if(Object.values(this.state.keymappings).includes(key)){
        let note = key.replace('sh', '#')
        this.synth.triggerAttackRelease(`${note}`)
        this.setState({note: this.state.keymappings[key]})
        let svg = document.getElementById(`${this.state.note}`)
        svg.setAttribute("fill", "skyblue")
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
    if (this.state.keymappings[key] && this.state.note) {
      this.synth.triggerRelease()
      let svg = document.getElementById(`${this.state.note}`)
      if ((svg.id).includes('sh')) {
        svg.setAttribute("fill", "black")
      } else {
        svg.setAttribute("fill", "white")
      }
    } else if(Object.values(this.state.keymappings).includes(key)){
      this.synth.triggerRelease()
    }
  }

  componentDidMount() {
      const self = this;

      this.synth.chain(this.reverb, this.gain, this.bitCrusher, this.chebyshev)

      document.addEventListener('keydown', this.playKey)
      document.addEventListener('keyup', this.endKey)
  }

  componentWillUnmount() {
    const self = this;
    document.removeEventListener('keydown', self.playKey)
    document.removeEventListener('keyup', self.endKey)
  }

  render() {
      this.applySettings()
      return (
          <div>
            {this.props.presets.map(preset => <Preset preset={preset} applyPreset={this.applyPreset}/>)}
            <Effects wetSlider={this.wetSlider} gainSlider={this.gainSlider} gain={this.state.gainSetting} reverb={this.state.reverbSettings} bitCrush={this.state.bcSetting} decaySlider={this.decaySlider} user={this.props.user} addLastPreset={this.props.addLastPreset} bcSlider={this.bitCrusherSlider} chebyshev={this.state.chebySetting} chebySlider={this.chebySlider}/>
            <Keyboard playKey={this.playKey} endKey={this.endKey}/>
          </div>
      )
  }
}