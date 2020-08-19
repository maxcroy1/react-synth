import React from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);
export default class Effects extends React.Component{

    handlePreset(props){
        let formData = {
            id: props.user,
            synth_settings_attributes: {
                gain: props.gain,
                reverb_wet: props.reverb.wet,
                reverb_decay: props.reverb.decay,
                bitcrush: props.bitCrush,
                cheby: props.chebyshev
            }
        }
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
            .then(json => {
                console.log(json.synth_setting)
                this.props.addLastPreset(json.synth_setting)
            })
            .catch(error => console.log(error))
    }





    render(){
        const drag = Draggable.create(".box", {type:"x,y", edgeResistance:0.65, bounds:"#container", inertia:true});
        return(
            <div className="slideContainer">
                <div>
                    <label>Wet</label>
                    <input type="range" min="0" max="1" step="0.1" value={this.props.reverb.wet} className="slider" id="reverbWet" onChange={this.props.wetSlider}></input>
                </div>
                <div>
                    <label>Decay</label>
                    <input type="range" min="0.1" max="10" step="0.1" value={this.props.reverb.decay} className="slider" id="reverbDecay" onChange={this.props.decaySlider}></input>
                </div>
                <div>
                    <label>Gain </label>
                    <input type="range" min="0" max="1" step="0.1" value={this.props.gain} className="slider" id="Gain" onChange={this.props.gainSlider}></input>
                </div>
                <div>
                    <label>BitCrusher</label>
                    <input type="range" min="-16" max="-4" step="1" value={this.props.bitCrush} className="slider" id="BitCrusher" onChange={this.props.bcSlider}></input>
                    <label>Chebyshev</label>
                    <input type="range" min="1" max="100" step="1" value={this.props.chebyshev} className="slider" id="Chebyshev" onChange={this.props.chebySlider}></input>
                </div>
                <button id="button" onClick={() => this.handlePreset(this.props)}>Save Preset</button>

            </div>
        )
    }
}