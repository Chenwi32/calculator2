class Calculator{

constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
}

/*-----This function initializes the values to be entered in the display
        screeen such as numbers and operators------*/
    clear(){
        this.currentOperand = ''
       /* this.previousOperand =''*/
	this.previousOperandTextElement.innerText = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
	if(this.previousOperand != null && this.currentOperand === ''){
		this.previousOperand = this.previousOperand.toString().slice(0, -1);
		this.operation = this.operation.toString().slice(0, -1)
	}
	
    }

    /*-------This function hooks the buttons to the screen-------*/
    appendNumber(number){

        /*-----This checks if there is already a dot so that we will not be typing 
                multiple dots in a single operation-----*/
        if(number ==='.' && this.currentOperand.includes('.')) return;

        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    choseOperation(operator){
      if(this.currentOperand === '') return;
        if(this.currentOperand !== ''){
            this.compute()
        };
        this.operation = operator;
        this.previousOperand = this.currentOperand
         this.currentOperand = ''; 
        
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return;

        switch(this.operation){
           case '+':
               computation = prev + current
               break ;

           case '-':
               computation = prev - current
               break ;

           case '/':
               computation = prev / current
               break ;

           case '*':
               computation = prev * current
               break ;

            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperandTextElement.innerText = '' 
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`                                              
        }

    }
}

const numberBtns = document.querySelectorAll('.nums')
const operationButtons = document.querySelectorAll('.operator')
const allclearButton = document.getElementById('ac')
const clear = document.getElementById('del')
const equals = document.getElementById('equals')
const previousOperandTextElement = document.getElementById('primary-input')
const currentOperandTextElement = document.getElementById('secondary-input')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberBtns.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
});

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.choseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click', () => {
        calculator.clear()
    calculator.updateDisplay()

})

clear.addEventListener('click', () => {
        calculator.delete()
    calculator.updateDisplay()
})














