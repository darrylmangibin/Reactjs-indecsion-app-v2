import React from 'react';
import Option from './Option';

const Options = (props) => {
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an options to get started!</p>}
            {
                props.options.map((option) => {
                    return <Option 
                        handleDeleteOption={props.handleDeleteOption}
                        key={option}
                        optionText={option}
                    /> 
                })
            }
        </div>
    )
}

export default Options