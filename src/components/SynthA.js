import React from 'react';
import { AMSynth } from 'tone';
import Keyboard from './Keyboard'

export default class SynthA extends React.Component {

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
            <Keyboard />
          </div>
      )
  }
}