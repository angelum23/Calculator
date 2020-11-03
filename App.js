import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import InputNumber from './InputNumber';

const buttons = [
  ['Limpar', '← Backspace'],
  ['%', 'x', '-','+'],
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0', '.', '='],
  ["cemacalculadora"]

  
]
export default class App extends Component {

  constructor(){
    super()
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false
    }
    this.state = this.initialState;
  }
  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumber
          value={buttonItems}
          handleOnPress={this.handleInput.bind(this, buttonItems)}
          key={'btn-' + buttonIndex}
        />
      });

      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });

    return layouts
  }

  handleInput = (input) => {
    const { displayValue, operator, firstValue, secondValue, nextValue } = this.state;
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': 
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        })

        if(!nextValue){
          this.setState({
            firstValue: firstValue + input
          })
        } else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        
        break;
      case '+':
      case '-':
      case 'x':
      case '%':
        this.setState({
          nextValue: true,
          operator: input,
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input
        })
        break;

      case '.':
        let dot = displayValue.toString().slice(-1) 
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue
        })

        if(!nextValue){
          this.setState({
            firstValue: firstValue + input
          })
        } else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;

      case '=':
        let formatOperator = (operator == 'x') ? '*' : (operator == '%') ? '/' : operator
        let result = eval(firstValue + formatOperator + secondValue)
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
          secondValue: '',
          operator: null,
          nextValue: false
        })
        break;

      case 'Limpar':
        this.setState(this.initialState);
        break;

      case '← Backspace':
        let string = displayValue.toString();
        let deletedString = string.substr(0, string.length - 1);
        let length = string.length;
        this.setState({
          displayValue: length == 1 ? '0' : deletedString,
          firstValue: length == 1 ? '' : deletedString
        })
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {this.state.displayValue}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {this.renderButtons()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#D17F00',
  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#EA8E00',
  },
  resultText: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 40,
    textAlign: 'left',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  }
});
