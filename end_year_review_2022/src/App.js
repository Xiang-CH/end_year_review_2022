import logo from './logo.svg';
import upArrow from './up-arrows.png';
import React from 'react';
import './App.css';

class Pages extends React.Component {
  constructor() {
    super();
    this.state = {
      touchStart:0,
      touchEnd:0
    }
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  handleTouchStart(e){
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e){
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e){
    if(this.state.touchStart - this.state.touchEnd > 75){
      const pages = document.querySelectorAll(".page");
      pages.forEach(page => {
        page.style.transform = `translateY(-100vh)`
      })
    }
    this.setState({touchStart:0, touchEnd:0});
  }

  render() {
    return(
      <div 
        className="pages"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <div className="page one">
          <img className='arrow' src={upArrow}/>
        </div>
        <div className="page two">
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="container">
      <Pages/>
    </div> 
  );
}

export default App;
