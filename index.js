class Calculator {
    constructor(lastThingTextElement, currentThingTextElement) {
        this.lastThingTextElement = lastThingTextElement
        this.currentThingTextElement = currentThingTextElement
        this.clear()
    }

    clear(){
        this.currentThing = ''
        this.lastThing = ''
        this.operation = undefined
    }

    delete(){
        this.currentThing = this.currentThing.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === '.' && this.currentThing.includes('.')) return
        this.currentThing = this.currentThing.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentThing === '') return
        if(this.lastThing !== ''){
            this.compute()
        }
        this.operation = operation        
        this.lastThing = this.currentThing
        this.currentThing = ''

        
        

    }

    chooseWeirdOperation(operation){
        if(this.currentThing === '') return
        else{
            this.operation = operation
            this.computeWeird()
        }
                
        //this.lastThing = this.currentThing
        //this.currentThing = ''

        
        

    }

    computeWeird(){
        let computation
        let current = parseFloat(this.currentThing)
        if(isNaN(current)) return
        switch(this.operation){
            case 'sin':
                computation = Math.sin(current * Math.PI / 180)
                break

            case 'cos':
                computation = Math.cos(current * Math.PI / 180)
                break
                
                
            case 'tan':
                computation = Math.tan(current * Math.PI / 180)
                break

            case 'x^2':
                computation = current ** 2
                break
    
            case '(-)':
                computation = current * -1
                break

            case '√':
                computation = Math.sqrt(current)
                break
            
            case 'ln':
                computation = Math.log(current)
                break

            case 'abs':
                computation = Math.abs(current)
                break
                    
            default:
                return
        }
        this.currentThing = computation
        this.operation = undefined
        this.lastThing = ''
    }


    compute(){
        let computation 
        let last = parseFloat(this.lastThing)
        let current = parseFloat(this.currentThing)
        if(isNaN(last) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = last + current
                break
            case '*':
                computation = last * current
                break

            case '-':
                computation = last - current
                break

            case '÷':
                computation = last / current
                break

            case 'exp':
                computation = last ** current
                break         

            default:
                return
            }

            this.currentThing = computation
            this.operation = undefined
            this.lastThing = ''
    }

    changeColor(){ 
        let color = ["#D5D554", "#54D5A2", "#24B3D3", "#D628DF", "#000000", "#FFFFFF", "#8EC9E9", "#BD8EE9"]
        let randomColor1 = color[Math.floor(Math.random() * Math.floor(color.length))]
        let randomColor2 = color[Math.floor(Math.random() * Math.floor(color.length))]
        if(randomColor1 == "#000000" && randomColor2 == "#000000"){
            randomColor2 = "#FFFFFF"
            document.querySelector("body").style.background = `linear-gradient(to right, ${randomColor1} , ${randomColor2})`
        }
        document.querySelector("body").style.background = `linear-gradient(to right, ${randomColor1} , ${randomColor2})`
        
        
    

        
        
        
        
    }


    getDisplayNumber(number){
        let stringNumber = number.toString()
        let integerDigits = parseFloat(stringNumber.split('.')[0])
        let decimalDigits = stringNumber.split('.')[1]
       let integerDisplay
       if(isNaN(integerDigits)){
           integerDisplay =''
       } else{
           integerDisplay = integerDigits.toLocaleString('en', {
               maximumFractionDigits : 0
           })
       }
       if(decimalDigits != null){
           return integerDisplay + "." + decimalDigits
       } 
       else{
           return integerDisplay
       }

    }
  
    updateDisplay(){
        this.currentThingTextElement.innerText = this.getDisplayNumber(this.currentThing)
        if(this.operation != null){
            this.lastThingTextElement.innerText =
            this.getDisplayNumber(this.lastThing) + " " + this.operation
        }
        else{
            this.lastThingTextElement.innerText = ''
            
        }
        
      
        

    }



}

let numberButtons = document.querySelectorAll('[data-number]')
let operationButtons = document.querySelectorAll('[data-operation]')
let weirdOperationButtons = document.querySelectorAll('[data-weird-operation]')
let equalsButton = document.querySelector('[data-equals]')
let deleteButton = document.querySelector('[data-delete]')
let allClearButton = document.querySelector('[data-all-clear]')
let lastThingTextElement = document.querySelector('[data-last-thing]')
let currentThingTextElement = document.querySelector('[data-current-thing]')
let colorButton = document.querySelector('[color-button]')




let calculator = new Calculator(lastThingTextElement, currentThingTextElement);

numberButtons.forEach(button=> {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button=> {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})


colorButton.addEventListener('click', () => {
    calculator.changeColor()
})


weirdOperationButtons.forEach(button=> {
    button.addEventListener('click', () => {
        calculator.chooseWeirdOperation(button.innerText)
        calculator.updateDisplay()
    })
})

