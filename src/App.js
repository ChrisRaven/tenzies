import React from 'react'
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'

export default function App() {
  const NUMBER_OF_DICE = 10;

  const [dice, setDice] = React.useState(() => setNewDice())
  const [finished, setFinished] = React.useState(false)
  const [rolls, setRolls] = React.useState(0);
  const [restarted, setRestarted] = React.useState(false)


  // check if the hame is finished
  React.useEffect(() => {
    const numberOfLockedDice = dice.filter(die => die.locked).length;

    if (numberOfLockedDice === NUMBER_OF_DICE) {
      const value = dice[0].value
      if (dice.every(die => die.value === value)) {
        setFinished(true);
      }
    }
  }, [dice])


  function setNewDice() {
    const newDice = []
    for (let i = 0; i < NUMBER_OF_DICE; i++) {
      newDice.push({
        locked: false,
        value: getRandomNumber(),
        id: i
      })
    }

    return newDice
  }


  function getRandomNumber() {
    return Math.floor(Math.random() * 6 + 1)
  }


  function setNewDiceValues() {
    setDice(oldDice => {
      const newDice = oldDice.map(die => {
        if (!die.locked) {
          die.value = getRandomNumber()
        }

        return die
      })

      return newDice;
    })
  }


  function reset() {
    setFinished(false)
    setDice(setNewDice())
    setRolls(0)
    setRestarted(true)
    setTimeout(() => setRestarted(false), 0)
  }


  function clickRoll() {
    setRolls(prevRolls => prevRolls + 1)
    finished ? reset() : setNewDiceValues()
  }


  function clickDie(event) {
    let id = event.target.id
    let die = event.target

    // to make everything work, when a pip (dot) has been clicked
    while (!die.classList.contains('dice-button')) {
      die = die.parentElement
      id = die.id
    }

    const state = die.classList.contains('locked')

    setDice(oldDice => {
      const newDice = oldDice.map(die => {
        if (die.id === parseInt(id, 10)) {
          die.locked = !state
        }

        return die
      })

      return newDice
    })

    die.classList.toggle('locked')
  }

  return (
    <div className="app">
      <div className="wrapper">
        <Header />
        <Main
          numberOfDice={NUMBER_OF_DICE}
          clickDie={clickDie}
          clickRoll={clickRoll}
          dice={dice}
          finished={finished}
        />
        <Footer
          numberOfRolls={rolls}
          finished={finished}
          restarted={restarted}
        />
      </div>
    </div>
  );
}
