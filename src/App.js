import logo from './pootal-logo.svg';
import upArrow from './up-arrows.png';
import React from 'react';
import './App.css';

function PageOne(props) {
  return(
    <div className="page one">
      <img src={logo} className="logo"></img>
      <button 
        className="btn"
        onClick={()=>props.onClick(-100)}
      >
      点击开启年度报告</button>
    </div>
  );
}

class Pages extends React.Component {
  constructor() {
    super();
    this.state = {
      touchStart:0,
      touchEnd:0,
      translate:0
    }
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  handleTouchStart(e){
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e){
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e){
    var newTranslate = 1 
    if(this.state.touchStart - this.state.touchEnd > 150){
      newTranslate = this.state.translate - 100;
    }else if(this.state.touchEnd - this.state.touchStart > 150){
      newTranslate = this.state.translate + 100;
    }

    this.changePage(newTranslate);
    this.setState({touchStart:0, touchEnd:0});
  }

  changePage(translation){

    if(translation<=0 && translation>= -400){
      const pages = document.querySelectorAll(".page");
      pages.forEach(page => {
        page.style.transform = `translateY(${translation}vh)`
      })
      this.setState({translate: translation});
    }

  }

  render() {
    return(
      <div 
        className="pages"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <PageOne onClick={this.changePage}/>
        <div className="page two">
          <img className='arrow' src={upArrow} draggable={false}/>
        </div>
        <div className="page three">
          <img className='arrow' src={upArrow} draggable={false}/>
        </div>
        <div className="page four">
         <img className='arrow' src={upArrow} draggable={false}/>  
        </div>
        <div className="page five"></div>
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
