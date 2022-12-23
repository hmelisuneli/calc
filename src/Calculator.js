import React from 'react';

import Button from './Button.js';
import './Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    // Set up our initial state
    this.state = {
      currentExpression: '',
      previousEvaluations: []
    };
  }

  numberClicked = (number) => {
    // Take our currentExpression and append the number
    let currentExpression = this.state.currentExpression;
    currentExpression += number;

    this.setState({
      currentExpression: currentExpression
    });
  }

  addClicked = () => {
    let currentExpression = this.state.currentExpression;
    currentExpression += '+';

    this.setState({
      currentExpression: currentExpression
    });
  }

  subtractClicked = () => {
    let currentExpression = this.state.currentExpression;
    currentExpression += '-';

    this.setState({
      currentExpression: currentExpression
    });
  }

  evaluate = () => {
    // Take the currentExpression and evaluate it with eval(String)
    const currentExpression = this.state.currentExpression || 0;

    let evaluation = 'NaN';

    // Wrapping in a try & catch in the case of invalid arithmetic strings
    try {
      evaluation = eval(currentExpression);
    }
    catch (e) {
      console.error('Arithmetic Error: ' + currentExpression);
    }

    // Add evaluation to previousEvaluations
    const previousEvaluations = this.state.previousEvaluations;
    previousEvaluations.push(currentExpression + ' = ' + evaluation);

    this.setState({
      // Edge Case: We don't want to make the currentExpression 'NaN' if it was evaluted with 'NaN'
      currentExpression: evaluation !== 'NaN' ? evaluation : '',
      previousEvaluations: previousEvaluations
    });
  }

  clear = () => {
    const currentExpressionEmpty = this.state.currentExpression === '';

    if (currentExpressionEmpty) {
      // Perform All Clear, where we clear the previousEvaluations
      this.setState({
        previousEvaluations: []
      });
    }
    else {
      // Perform Clear, where we clear the currentExpression
      this.setState({
        currentExpression: ''
      });
    }
  }

  /* EXTRA WORK FUNCTIONS */
  multiplyClicked = () => {
    let currentExpression = this.state.currentExpression;
    currentExpression += '*';

    this.setState({
      currentExpression: currentExpression
    });
  }

  divideClicked = () => {
    let currentExpression = this.state.currentExpression;
    currentExpression += '/';

    this.setState({
      currentExpression: currentExpression
    });
  }

  ansClicked = () => {
    // Edge Case: No previousEvaluations
    if (this.state.previousEvaluations.length === 0) {
      return;
    }

    let currentExpression = this.state.currentExpression;
    const lastEvaluation = this.state.previousEvaluations[this.state.previousEvaluations.length-1];

    // if the lastEvaluation was '1 + 1 = 2', ans = 2, so we take the last element if we split the string via =
    const ans = lastEvaluation.split('=').pop().trim();
    currentExpression += ans;

    this.setState({
      currentExpression: currentExpression
    });
  }

  flipSign = () => {
    let currentExpression = this.state.currentExpression;

    if (currentExpression == undefined && currentExpression == null) {
      return;
    }

    // Check if the currentExpression consists of only numbers or 1 or 0 '-' signs in the beginning
    if (currentExpression.match(/^-?[0-9]+$/) && currentExpression !== '0')
    {
      if (currentExpression[0] === '-') {
        currentExpression = currentExpression.substring(1);
      }
      else {
        currentExpression = '-' + currentExpression;
      }

      this.setState({
        currentExpression: currentExpression
      });
    }
  }

  render() {
    return (
      <div className="calculator">
        <div className="display-screen">
          <div className="calculation-item">
            {this.state.currentExpression === '' ? 0 : this.state.currentExpression}
          </div>
          {
            // We need to reverse the array because the CSS renders the list in reverse order
            this.state.previousEvaluations.map((evaluation, index) => {
              return (
                <div className="calculation-item" key={index}>
                  {evaluation}
                </div>
              );
            }).reverse()
          }
        </div>
        <div className="buttons-section">
          <div className="row">
            <Button
              text={this.state.currentExpression === '' ? 'AC' : 'C'}
              onClick={this.clear}
            />
            <Button
              text="Ans"
              onClick={this.ansClicked}
            />
            <Button
              text="+/-"
              onClick={this.flipSign}
            />
            <Button
              isOrange={true}
              text="÷"
              onClick={this.divideClicked}
            />
          </div>
          <div className="row">
            <Button
              text="7"
              onClick={() => this.numberClicked('7')}
            />
            <Button
              text="8"
              onClick={() => this.numberClicked('8')}
            />
            <Button
              text="9"
              onClick={() => this.numberClicked('9')}
            />
            <Button
              isOrange={true}
              text="×"
              onClick={this.multiplyClicked}
            />
          </div>
          <div className="row">
            <Button
              text="4"
              onClick={() => this.numberClicked('4')}
            />
            <Button
              text="5"
              onClick={() => this.numberClicked('5')}
            />
            <Button
              text="6"
              onClick={() => this.numberClicked('6')}
            />
            <Button
              isOrange={true}
              text="-"
              onClick={this.subtractClicked}
            />
          </div>
          <div className="row">
            <Button
              text="1"
              onClick={() => this.numberClicked('1')}
            />
            <Button
              text="2"
              onClick={() => this.numberClicked('2')}
            />
            <Button
              text="3"
              onClick={() => this.numberClicked('3')}
            />
            <Button
              isOrange={true}
              text="+"
              onClick={this.addClicked}
            />
          </div>
          <div className="row">
            <Button
              isTwoSpaced={true}
              text="0"
              onClick={() => this.numberClicked('0')}
            />
            <Button
              text="."
              onClick={() => this.numberClicked('.')}
            />
            <Button
              isOrange={true}
              text="="
              onClick={this.evaluate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
