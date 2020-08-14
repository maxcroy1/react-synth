import React from 'react'
import Key from './Key'
import {ReactComponent as FullKeyboard} from '../keys.svg'


class Keyboard extends React.Component{
	render(){
		return(
			<div className="keyboard-container"> 
				<FullKeyboard onClick={(e)=>{
					this.props.playKey(e)
				}} onMouseUp={(e)=>{
					this.props.endKey(e)
				}}/>
			</div>
		)
	}
}

export default Keyboard