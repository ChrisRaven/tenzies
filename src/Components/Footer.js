import React from "react"
import Modal from 'react-modal'

Modal.setAppElement('#root')

let message = []

export default function Footer({numberOfRolls, finished, restarted}) {
  const [elapsed, setElapsed] = React.useState(0)
  const [startTime, setStartTime] = React.useState(Date.now())
  const [lowestNumberOfRolls, setLowestNumberOfRolls] = React.useState(Number.MAX_SAFE_INTEGER)
  const [shortestTime, setShortestTime] = React.useState(Number.MAX_SAFE_INTEGER)
  const [modalIsOpen, setIsOpen] = React.useState(false)


  // to restart timer
  React.useEffect(() => {
    if (restarted) {
      setStartTime(Date.now())
    }
  }, [restarted])


  // setting things up at the start of the game
  React.useEffect(() => {
    message = []
    setLowestNumberOfRolls(localStorage.getItem('lowestNumberOfRolls') || Number.MAX_SAFE_INTEGER)
    setShortestTime(localStorage.getItem('shortestTime') || Number.MAX_SAFE_INTEGER)

    let intv;
    if (!finished) {
      intv = setInterval(() => setElapsed(Date.now() - startTime), 500)
      setStartTime(Date.now())
    }

    return () => clearInterval(intv)
  }, [finished, restarted]) // eslint-disable-line react-hooks/exhaustive-deps
    
  let date = new Date(elapsed).toUTCString().split(' ')[4]


  // to show records
  React.useEffect(() => {
    if (finished) {
      if (numberOfRolls < lowestNumberOfRolls) {
        message.push(<div key="1">{`New lowest number of rolls: ${numberOfRolls}`}</div>)
        localStorage.setItem('lowestNumberOfRolls', numberOfRolls)
      }

      let currentDiff = Date.now() - startTime // to save more accurate time
      if (currentDiff < shortestTime) {
        message.push(<div key="2">{`New best time: ${date}`}</div>)
        localStorage.setItem('shortestTime', currentDiff)
      }
      if (message.length) {
        setIsOpen(true)
      }
    }
  }, [finished]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <div className="number-of-rolls">Number of rolls: <span>{numberOfRolls}</span></div>
      <div className="time-elapsed">Time elapsed: <span>{date}</span></div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className="Modal"
        contentLabel="Example Modal"
      >
        <h2>Congratulations!</h2>
        <div>{message}</div>
        <button onClick={() => setIsOpen(false)}>close</button>
      </Modal>
    </>
  )
}
