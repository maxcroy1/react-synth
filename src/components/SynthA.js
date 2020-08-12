import React from 'react';
import { AMSynth } from 'tone';

export default class SynthA extends React.Component {

state = {
  note: "C4"
}

componentDidMount() {
    const synth = new AMSynth().toDestination();
    const self = this;
    function playKey(event) {
      let key = event.key
      if (self.props.keymappings[key]) {
        synth.triggerAttackRelease(`${self.props.keymappings[key]}`)
        self.setState({note: self.props.keymappings[key]}, ()=>{
          console.log(self.state)
        })
      }
        let svg = document.getElementById(`${self.state.note}`)
        svg.setAttribute("fill", "red")
        console.log(svg) 
    }



    // if clicked is true -- add a className with a # before note

    function endKey(event) {
      let key = event.key
      let svg = document.getElementById(`${self.state.note}`)
      svg.setAttribute("fill", "white")

      self.setState(prevState => {return {click: !prevState.click}})
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