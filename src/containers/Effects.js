import React from 'react';
export default class Effects extends React.Component{


    handlePreset(props){
        let formData = {
            id: props.user,
            synth_settings_attributes: {
                gain: props.gain,
                reverb_wet: props.reverb.wet,
                reverb_decay: props.reverb.decay
            }
        }
        console.log(formData)
        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch("http://localhost:3000/api/v1/users/" + this.props.user, configObj)
            .then(resp => resp.json())
            .then(json => this.props.addLastPreset(json.synth_setting))
            .catch(error => console.log(error))
    }

    render(){
        console.log(this.props)
        return(
            
            <div>
                <h1>Effects</h1>
                <button onClick={() => this.handlePreset(this.props)}>Save Preset</button>
                <div>
                    <h3>Reverb</h3>
                    <label>Wet</label>
                    <input type="range" min="0" max="1" step="0.1" value={this.props.reverb.wet} className="slider" id="reverbWet" onChange={this.props.wetSlider}></input>
                    <label>Decay</label>
                    <input type="range" min="0.1" max="10" step="0.1" value={this.props.reverb.decay} className="slider" id="reverbDecay" onChange={this.props.decaySlider}></input>
                </div>
                <label>Gain</label>
                <input type="range" min="0" max="1" step="0.1" value={this.props.gain} className="slider" id="Gain" onChange={this.props.gainSlider}></input>
            </div>
        )
    }
}