import React from 'react';
import { AMSynth } from 'tone';

export default class SynthA extends React.Component {

componentDidMount() {
    const synth = new AMSynth().toDestination();
    const self = this;
    function playKey(event) {
      let key = event.key
      if (self.props.keymappings[key]) {
        synth.triggerAttackRelease(`${self.props.keymappings[key].note}`)
      }
    }

    function endKey(event) {
      let key = event.key
      if (self.props.keymappings[key]) {
        synth.triggerRelease()
      }
    }

    document.addEventListener('keydown', playKey)
    document.addEventListener('keyup', endKey)
  }

  render() {
      return (
          <div></div>
      )
  }
}