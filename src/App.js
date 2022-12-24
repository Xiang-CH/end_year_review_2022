import logo from './pootal-logo.svg';
import upArrow from './up-arrows.png';
import React from 'react';
import $ from 'jquery';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      <button
        id = "enterBtn"
        className="btn"
        onClick ={this.handleClick}
      >
      点击开启年度报告</button>
      <div className="privacy"> 
        <input id="permit" type="checkbox" onClick={this.onCheck}></input>
        <span>允许薄扶林噗噗访问浏览数据</span>
        <a href='privacyAgreement.html'>《信息授权协议》</a>
      </div>
    </div>
  );}
}

function SubPageOne(props){
  if(props.percentile > 98) var slogen ="噗噗特别特别荣幸你愿意抽出这么多时间来陪伴我长大";
  else if(props.percentile > 75) var slogen = "噗噗一定是一个你特别特别珍爱的精神老家吧";
  else if(props.percentile > 50) var slogen = "希望这一年你在噗噗有笑有泪有收获也有成长";
  else var slogen = "噗噗知道自己还不够好 但是希望下一年你能多陪陪人家喔";

  return(
  <div id="mainContent">
      {props.joinDate!=null? <p>你于 {props.joinDate} 加入了HKU噗噗 <br/>
        距今已有 {props.joinTillNow} 天</p>:<></>}
      <p>
        你在噗噗度过了 {props.daysUsedCounter} 天 <br/>
        总共 {props.minutesUsedCounter} 分钟 <br/>
        折算下来平均每天在噗噗流连 {Math.round(props.minutesUsedCounter/props.daysUsedCounter)} <br/>
      </p>
      {props.inTop10? 
        <p>在 5812 名噗噗用户中排名第 {props.rank}</p>
      : <p>击败了 {props.percentile}% 的噗噗用户</p>}
      <p>相当于修了 {Math.round(props.minutesUsedCounter/216)/10} 门6学分的 PUPU1001</p>
      <p>{slogen}</p>
  </div>
  )   
}

function SubPageTwo(props){
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '噗噗使用时间分布',
      },
    },
    layout: {
      padding: 20,
    },
    scales: {
      // x: {
      //   ticks: {
      //     autoSkip: false
      //   }
      // },
      y: {
        display: false
      }
    },
    aspectRatio: 1,
  };
  const label = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const data = {
    labels: label, 
    datasets: [
      {
        label: '你的时间分布',
        data: props.userTimeDistribution,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '所有用户的时间分布',
        data: props.averageTimeDistribution,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ]
  }
  return(
    <div id="mainContent"> 
      <p>
        在一天的光景里 <br/>
        你最常在 {props.mostCommonPeriod} 光顾噗噗 <br/>
      </p>
      <Line
        options = {options}
        data = {data}
    
      />
    </div>
  )
}

function SubPageThree(props){
  return(
    <div id="mainContent"> 
      <p>
        {props.latest.date} <br/>
        {props.latest.time} <br/>
        你在噗噗流连 <br/>
        迟迟未睡 <br/>
        这条树洞见证了 <br/>
        你那晚的心事 <br/>
        #{props.latest.post_id}
      </p>
    </div>
  )
}

function SubPageFour(props){
  return(
    <div>
      <p>
        {props.earliest.date} <br/>
        {props.earliest.time} <br/>
        你比小噗起得还要早 <br/>
        你翻开的第一条树洞 #{props.earliest.post_id}<br/>
        无声地同你说着早安 <br/>
  
      </p>
    </div>
  )
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
      if(this.state.inPageNo < 4){

        $("#mainContent").children().each(function(){
          $(this).removeClass('newly-added');
          $(this).addClass('fadeOut');
        });

        if((this.state.inPageNo==2 && this.props.data.user_latest.post_id == null && this.props.data.user_earliest.post_id==null) || (this.state.inPageNo==3 && this.props.data.user_earliest.post_id==null)){
          this.props.changePage(-100);
        }else if(this.state.inPageNo==2 && this.props.data.user_latest.post_id == null && this.props.data.user_earliest.post_id!=null){
          setTimeout(() => {
            this.setState(prevState => {return {
              inPageNo: prevState.inPageNo+2
            }});
  
            $("#mainContent").children().each(function(){
              $(this).removeClass('fadeOut');
              $(this).addClass('newly-added');
            });
          }, 1200);
        }else{
          setTimeout(() => {
            this.setState(prevState => {return {
              inPageNo: prevState.inPageNo+1
            }});

            $("#mainContent").children().each(function(){
              $(this).removeClass('fadeOut');
              $(this).addClass('newly-added');
            });
          }, 1200);
        }
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
      var html = <SubPageOne 
                    joinDate={this.props.data.user_join_date}
                    joinTillNow={this.props.data.user_join_time_till_now}
                    daysUsedCounter={this.props.data.user_date_count}
                    minutesUsedCounter={this.props.data.user_minute_count}
                    inTop10={this.props.data.user_minute_count_is_top10}
                    rank={this.props.user_minute_count_rank}
                    percentile={this.props.data.user_minute_count_percentage}
                  />
    }else if(this.state.inPageNo == 2){
      var html = <SubPageTwo 
                    mostCommonPeriod={this.props.data.user_most_common_time_period}
                    userTimeDistribution={this.props.data.user_hour_distribution}
                    averageTimeDistribution={this.props.data.total_hour_distribution}
                  />
    }else if(this.state.inPageNo == 3){
      var html = <SubPageThree latest={this.props.data.user_latest}/>
    }else{
      var html = <SubPageFour earliest={this.props.data.user_earliest}/> 
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
      translate:0,
      data:{}
    }

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount(){
    const usrToken = 'cxiang'
    $.getJSON(`https://api.pupu.hkupootal.com/v3/report2022/get.php?user_itsc=${usrToken}`, function(result){
      if(result.code === 200){
        console.log(result.report_data);
        this.setState({data: result.report_data});
      }
    }.bind(this))
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
        <PageOne onClick={this.changePage} username={this.state.data.user_serial}/>
        <PageTwo changePage={this.changePage} data={this.state.data}/>
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
