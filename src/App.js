import logo from './pootal-logo.svg';
import upArrow from './up-arrows.png';
import React from 'react';
import $ from 'jquery';
import './App.css';

class PageOne extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this);
    this.onCheck=this.onCheck.bind(this);
  }

  handleClick(e){
    if(e.target.classList.contains("activated")){
      this.props.onClick(-100);
    }
  }

  onCheck(e){
    if(e.target.checked){
      $("#enterBtn").addClass("activated")
    }else{
      $("#enterBtn").removeClass("activated")
    }
  }

  render() {return(
    <div className="page one">
      <img src={logo} className="logo"></img>
      <button
        id = "enterBtn"
        className="btn"
        onClick ={this.handleClick}
      >
      点击开启年度报告</button>
      <div className="privacy"> 
        <input id="permit" type="checkbox" onClick={this.onCheck}></input>
        <span>允许薄扶林噗噗访问浏览数据生成报告</span>
      </div>
    </div>
  );}
}

class PageTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPageNo: 1
    }
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  handleTouchStart(e){
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e){
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e){

    if(this.state.touchStart - this.state.touchEnd > 150){
      if(this.state.inPageNo < 3){
        
        $("#mainContent").children().each(function(){
          $(this).removeClass('newly-added');
          $(this).addClass('fadeOut');
        });

        setTimeout(() => {
          this.setState(prevState => {return {
            inPageNo: prevState.inPageNo+1
          }});

          $("#mainContent").children().each(function(){
            $(this).removeClass('fadeOut');
            $(this).addClass('newly-added');
          });
        }, 1200);
        

      }else{
        this.props.changePage(-100);
      }
    }else if(this.state.touchEnd - this.state.touchStart > 150){
      if(this.state.inPageNo > 1){ 
        this.setState(prevState => {return {
          inPageNo: prevState.inPageNo-1
        }});
      }else{
        this.props.changePage(100);
      }
    }
  }

  render() {

    if(this.state.inPageNo == 1){
      var html = <div id="mainContent"> 
      <h1> Element Set one </h1>
      </div>;
    }else if(this.state.inPageNo == 2){
      var html = <div id="mainContent"> 
      <h1> Element set two</h1> 
      </div>
    }else if(this.state.inPageNo == 3){
      var html = <div id="mainContent"> 
      <h1> Element set three</h1> 
      </div>
    }

    return (
      <div 
        className="page two"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >    
      {html}
      <img className='arrow' src={upArrow} draggable={false}/>
      </div>
    )
  }
}

class PageThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPageNo: 1
    }
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  handleTouchStart(e){
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e){
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e){

    if(this.state.touchStart - this.state.touchEnd > 150){
      if(this.state.inPageNo < 3){
        
        $("#mainContent2").children().each(function(){
          $(this).removeClass('newly-added');
          $(this).addClass('fadeOut');
        });

        setTimeout(() => {
          this.setState(prevState => {return {
            inPageNo: prevState.inPageNo+1
          }});

          $("#mainContent2").children().each(function(){
            $(this).removeClass('fadeOut');
            $(this).addClass('newly-added');
          });
        }, 1200);
        

      }else{
        this.props.changePage(-100);
      }
    }else if(this.state.touchEnd - this.state.touchStart > 150){
      if(this.state.inPageNo > 1){ 
        this.setState(prevState => {return {
          inPageNo: prevState.inPageNo-1
        }});
      }else{
        this.props.changePage(100);
      }
    }
  }

  render() {

    if(this.state.inPageNo == 1){
      var html = <div id="mainContent2"> 
      <h1> Element Set one </h1>
      </div>;
    }else if(this.state.inPageNo == 2){
      var html = <div id="mainContent2"> 
      <h1> Element set two</h1> 
      </div>
    }else if(this.state.inPageNo == 3){
      var html = <div id="mainContent2"> 
      <h1> Element set three</h1> 
      </div>
    }

    return (
      <div 
        className="page three"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >    
      {html}
      <img className='arrow' src={upArrow} draggable={false}/>
      </div>
    )
  }
}

class PageFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPageNo: 1
    }
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  handleTouchStart(e){
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e){
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e){

    if(this.state.touchStart - this.state.touchEnd > 150){
      if(this.state.inPageNo < 4){
        
        $("#mainContent3").children().each(function(){
          $(this).removeClass('newly-added');
          $(this).addClass('fadeOut');
        });

        setTimeout(() => {
          this.setState(prevState => {return {
            inPageNo: prevState.inPageNo+1
          }});

          $("#mainContent3").children().each(function(){
            $(this).removeClass('fadeOut');
            $(this).addClass('newly-added');
          });
        }, 1200);
        

      }else{
        this.props.changePage(-100);
      }
    }else if(this.state.touchEnd - this.state.touchStart > 150){
      if(this.state.inPageNo > 1){ 
        this.setState(prevState => {return {
          inPageNo: prevState.inPageNo-1
        }});
      }else{
        this.props.changePage(100);
      }
    }
  }

  render() {

    if(this.state.inPageNo == 1){
      var html = <div id="mainContent3"> 
      <h1> Element Set one </h1>
      </div>;
    }else if(this.state.inPageNo == 2){
      var html = <div id="mainContent3"> 
      <h1> Element set two</h1> 
      </div>
    }else if(this.state.inPageNo == 3){
      var html = <div id="mainContent3"> 
      <h1> Element set three</h1> 
      </div>
    }else{
      var html = <div id="mainContent3"> 
      <h1> Element set four</h1> 
      </div>
    }

    return (
      <div 
        className="page four"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >    
      {html}
      <img className='arrow' src={upArrow} draggable={false}/>
      </div>
    )
  }
}

class PageFive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPageNo: 1
    }
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.download = this.download.bind(this);
  }

  componentDidUpdate(){
    if(this.state.inPageNo == 2){
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#000000"
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      ctx.font = "40px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText("2022噗噗年度报告", 60, 90);
    }
  }

  handleTouchStart(e){
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e){
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e){

    if(this.state.touchStart - this.state.touchEnd > 150){
      if(this.state.inPageNo < 2){
        
        $("#mainContent4").children().each(function(){
          $(this).removeClass('newly-added');
          $(this).addClass('fadeOut');
        });

        setTimeout(() => {
          this.setState(prevState => {return {
            inPageNo: prevState.inPageNo+1
          }});

          $("#mainContent4").children().each(function(){
            $(this).removeClass('fadeOut');
            $(this).addClass('newly-added');
          });
        }, 1200);
      }
    }else if(this.state.touchEnd - this.state.touchStart > 150){
      if(this.state.inPageNo > 1){ 
        this.setState(prevState => {return {
          inPageNo: prevState.inPageNo-1
        }});
      }else{
        this.props.changePage(100);
      }
    }
  }

  download(){
    var canvas = document.getElementById("myCanvas");
    let canvasUrl = canvas.toDataURL("PupuEndOfYearReview/jpeg", 1);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "PupuEndOfYearReview";
    createEl.click();
    createEl.remove();
  }

  render() {

    if(this.state.inPageNo == 1){
      var html = <div id="mainContent4"> 
      <h1> Element Set one </h1>
      <img className='arrow' src={upArrow} draggable={false}/>
      </div>;
    }else if(this.state.inPageNo == 2){
      var html = <div id="mainContent"> 
      <canvas 
        id="myCanvas"
        width="600"
        height="900"
      ></canvas>
      <button 
        className="btn downloadBtn"
        onClick={this.download}
      >保存至相册</button> 
      </div>
    }
    

    return (
      <div 
        className="page five"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >    
      {html}
      </div>
    )
  }
}

class Pages extends React.Component {
  constructor() {
    super();
    this.state = {
      touchStart:0,
      touchEnd:0,
      translate:0
    }

    this.changePage = this.changePage.bind(this);
  }

  changePage(translation){
    translation = this.state.translate + translation;

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
        <PageTwo changePage={this.changePage}/>
        <PageThree changePage={this.changePage}/>
        <PageFour changePage={this.changePage}/>
        <PageFive changePage={this.changePage}/>
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
