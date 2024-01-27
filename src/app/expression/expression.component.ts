// expression.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.scss']
})
export class ExpressionComponent implements OnInit {
  connectorType: string = 'and';
  expressions: any[] = [];
  selectedExpression: any = null;
  result: any = null;

  ngOnInit() {
    this.loadExpressionsFromLocalStorage();
  }

  addExpression() {
    this.expressions.push({
      ruleType: 'age',
      operator: '>=',
      value: null,
      score: null
    });

    this.saveExpressionsToLocalStorage();
  }

  updateExpression(index: number) {
    const updatedExpression = this.expressions[index];
    const updatedValue = prompt('Enter updated value:', updatedExpression.value);
    const updatedScore = prompt('Enter updated score:', updatedExpression.score);

    // Update the expression if the user entered values
    if (updatedValue !== null && updatedScore !== null) {
      updatedExpression.value = Number(updatedValue);
      updatedExpression.score = Number(updatedScore);

      // Save expressions to local storage after updating
      this.saveExpressionsToLocalStorage();
    }
  }

  removeExpression(index: number) {
    if (this.expressions.length > 0) {
      this.expressions.splice(index, 1);
      this.saveExpressionsToLocalStorage();
    }
  }

  readExpression(expression: any) {
    this.selectedExpression = expression;
  }

  calculateResult() {
    let resultValue = true;

    for (const expression of this.expressions) {
      const expressionValue = this.evaluateExpression(expression);
      resultValue = this.applyConnectorType(resultValue, expressionValue);
    }

    this.result = {
      rules: this.expressions,
      combinator: this.connectorType,
      result: resultValue
    };
  }

  evaluateExpression(expression: any): boolean {
    switch (expression.ruleType) {
      case 'age':
        return expression.value >= 18;
      case 'creditScore':
        return expression.value > 700;
      case 'accountBalance':
        return expression.value >= 1000;
      default:
        return false;
    }
  }

  applyConnectorType(currentResult: boolean, expressionResult: boolean): boolean {
    if (this.connectorType === 'and') {
      return currentResult && expressionResult;
    } else if (this.connectorType === 'or') {
      return currentResult || expressionResult;
    } else {
      return currentResult && expressionResult;
    }
  }

  calculateAndSubmit() {
    this.calculateResult();
    this.saveExpressionsToLocalStorage();
  }

  saveExpressionsToLocalStorage() {
    localStorage.setItem('expressions', JSON.stringify(this.expressions));
  }

  loadExpressionsFromLocalStorage() {
    const savedExpressions = localStorage.getItem('expressions');
    if (savedExpressions) {
      this.expressions = JSON.parse(savedExpressions);
    }
  }
}
