import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({
                    options
                }))

            }
        } catch (e) {
            
        }
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount() {
        console.log('componentwillunmount')
    }
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption = (optionText) => {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => optionText !== option)
            }
        })
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => {
            return {
                selectedOption: option
            }
        })
    }
    handleClearSelectedOption = () => {
        this.setState(() => {
            return {
                selectedOption: undefined
            }
        })
    }
    handleAddOption = (option) => {
        if(!option){
           return `Enter valid value to add item`;
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        } else {
             this.setState((prevState) => ({ options: prevState.options.concat(option) }));
        }
    }
    render(){
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header 
                    subtitle={subtitle}
                />
                <div className="container">
                    <Action 
                        handlePick={this.handlePick} 
                        hasOptions={this.state.options.length > 0}
                    />
                    <div className="widget">
                        <Options
                            handleDeleteOption={this.handleDeleteOption}
                            handleDeleteOptions={this.handleDeleteOptions}
                            options={this.state.options}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                         />
                    </div>
                </div>
                <OptionModal 
                    handleClearSelectedOption={this.handleClearSelectedOption}
                    selectedOption={this.state.selectedOption}
                />
            </div>
        )
    }
}

export default IndecisionApp;