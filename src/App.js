  import React from 'react';
  import Die from './components/Die';
  import { nanoid } from 'nanoid';
  import Confetti from 'react-confetti';

  function App() {

    const [dice, setDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() =>{
      const allHeld = dice.every(item => item.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(item => item.value === firstValue)
      if (allHeld && allSameValue){
        setTenzies(true)
        console.log("You Won")
      }
    }, [dice])



    function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }

    function allNewDice() {
      const newDice = []
        for(let i=0; i<10; i++){
          newDice.push(
            generateNewDie()
          )
        }
      return newDice;
    }


    
    function rollDice() {
      if(!tenzies){
        setDice(oldDice => oldDice.map(die => 
          die.isHeld ? die : generateNewDie()
        ));
      }
      else{
        setTenzies(false)
        setDice(allNewDice())
      }  
    }

    function holdDice(id){
      setDice(oldDice => oldDice.map(die => 
        die.id === id ? {...die,isHeld : !die.isHeld} : die
      ))
    }

    const diceELement = dice.map(die => (
      <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    ))

    return (
        <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {diceELement}
          </div>
          <button className="rollBtn" onClick={rollDice}>{tenzies ? "New Game": "Roll"}</button>
        </main>
    );
  }

  export default App;
