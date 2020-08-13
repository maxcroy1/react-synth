import React from 'react';

export default class Effects extends React.Component{

    render(){
        return(
            <div>
                <h1>Effects</h1>
                <div>
                    <h3>Reverb</h3>
                    <label>Wet</label>
                    <input type="range" min="0" max="1" step="0.1" value={this.props.reverb.wet} class="slider" id="reverbWet" onChange={this.props.wetSlider}></input>
                    <label>Decay</label>
                    <input type="range" min="0.1" max="10" step="0.1" value={this.props.reverb.decay} class="slider" id="reverbDecay" onChange={this.props.decaySlider}></input>
                </div>
                <label>Gain</label>
                <input type="range" min="0" max="1" step="0.1" value={this.props.gain} class="slider" id="Gain" onChange={this.props.gainSlider}></input>
            </div>
        )
    }
}