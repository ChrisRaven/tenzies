export default function Button({children, clsName, id, onclick, isDie}) {
  let content = children;

  let d1 = <div className="dot dot-1"></div>
  let d2 = <div className="dot dot-2"></div>
  let d3 = <div className="dot dot-3"></div>
  let d4 = <div className="dot dot-4"></div>
  let d5 = <div className="dot dot-5"></div>
  let d6 = <div className="dot dot-6"></div>
  let dm = <div className="dot dot-middle"></div>


  if (isDie) {
    const numberOfPips = parseInt(children, 10);

    switch (numberOfPips) {
      case 1:
        content = dm;
        break
      case 2:
        content = <>{d1}{d6}</>
        break
      case 3:
        content = <>{d1}{dm}{d6}</>
        break
      case 4:
        content = <>{d1}{d3}{d4}{d6}</>
        break
      case 5:
        content = <>{d1}{d3}{dm}{d4}{d6}</>
        break
      case 6:
        content = <>{d1}{d2}{d3}{d4}{d5}{d6}</>
        break
      default: break
    }
  }
  
  return (
    <button
      className={clsName + (isDie ? ' dot-container' : '')}
      id={id}
      onClick={(event) => onclick(event)}
    >
      {content}
    </button>
  )
}
