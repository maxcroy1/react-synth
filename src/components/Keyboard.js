import React from 'react'
import {ReactComponent as KeyboardImage} from '../keys.svg'

class Keyboard extends React.Component{
	render(){
		return(
			<div> 
				<h3> Keyboard </h3>
				<KeyboardImage />
			</div>
		)
	}
}

export default Keyboard