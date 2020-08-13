import React from 'react';

export default class Effects extends React.Component{

    render(){
        return(
            <div>
                <h1>Effects</h1>
                <button onClick={this.props.handleReverb}>Reverb</button>
                <label>Gain</label>
                <input type="range" min="1" max="100" value={this.props.gain} class="slider" id="Gain" onChange={this.props.gainSlider}></input>
            </div>
        )
    }
}