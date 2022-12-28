import logo from './images/pootal-logo.svg';
import upArrow from './images/up-arrows.png';
import floating2 from './images/page_two_floating.png';
import star_fill from "./images/sf-star-fill.svg";
import comment from "./images/sf-comment.svg";
import star from "./images/sf-star.svg";
import React from 'react';
import $ from 'jquery';
import wx from 'weixin-js-sdk';
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

const totalUserCount = 5812;

function getDate(rawString) {
  var date = rawString.split("-");
  return date[0]+"年"+date[1]+"月"+date[2]+"日";
}

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
    this.handleClick = this.handleClick.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  handleClick(e) {
    if (e.target.classList.contains("activated")) {
      this.props.getData();
      setTimeout(() => this.props.onClick(-100), 500);
      setTimeout(() => {const sticker = document.querySelector(".floating2");
      sticker.style.top="80px"}, 700);
    }
  }

  onCheck(e) {
    if (e.target.checked) {
      $("#enterBtn").addClass("activated")
    } else {
      $("#enterBtn").removeClass("activated")
    }
  }

  render() {
    return (
      <div className="page one">
        <button
          id="enterBtn"
          className="btn"
          onClick={this.handleClick}
        >
          点击开启年度报告</button>
        <div className="privacy">
          <input id="permit" type="checkbox" onClick={this.onCheck}></input>
          <span>允许薄扶林噗噗访问浏览数据</span>
          <a href='privacyAgreement.html'>《信息授权协议》</a>
        </div>
      </div>
    );
  }
}

function SubPageOne(props) {

  return(
    <div id="mainContent" className="newly-added">
      <p style={{paddingTop: '15vh'}}>2020年10月31日<br/>
       噗噗来到这个世界</p>
      {props.joinDate != null ? <p> <span className="bold">{getDate(props.joinDate)}</span> <br />是你和噗噗初识的日子<br />
      今天是我们相识的第 <span className="bold">{props.joinTillNow}</span> 天</p> : <></>}
      <p>不知不觉 噗噗已经陪你 <br/>
        走到了2022年的尽头 <br/>
        <span className='bold'>出发去看看</span>这一年 <br/>
        你在噗噗留下的印迹吧</p>
    </div>
  )

}

function SubPageTwo(props) {
  if (props.percentile > 98) var slogen = "噗噗特别特别荣幸\n你愿意抽出这么多时间\n来陪伴我长大";
  else if (props.percentile > 75) var slogen = "噗噗一定是一个\n你特别特别珍爱的\n精神老家吧";
  else if (props.percentile > 50) var slogen = "希望这一年你在噗噗\n有笑有泪有收获\n也有成长";
  else var slogen = "噗噗知道自己还不够好\n但是希望下一年\n你能多陪陪人家喔";

  return (
    <div id="mainContent" className="newly-added">
      <p style={{paddingTop: '8vh'}} className="smallBottomPadding">2022年</p>
      <p>
        你在噗噗度过了 <span className="bold">{props.daysUsedCounter} 天</span> <br />
        共计 <span className="bold">{props.minutesUsedCounter} 分钟</span> <br />
      </p>

      <p>
        折算下来<br />
        平均每天在噗噗流连 <span className="bold">{Math.round(props.minutesUsedCounter / props.daysUsedCounter)} 分钟</span><br />
        {props.inTop10 ?
          <>在 {totalUserCount} 名噗噗用户中排名<br />第 <span className="bold">{props.rank}</span></>
          : <>击败了 <span className="bold">{props.percentile}%</span> 的噗噗用户</>}
      </p>
      
      <p>
        相当于修了 <span className="bold">{Math.round(props.minutesUsedCounter / 216) / 10}</span> <br/>
        门6学分的 PUPU1001
      </p>


      <p style={{whiteSpace: 'pre-line'}}>{slogen}</p>
    </div>
  )
}

function SubPageThree(props) {
  const options = {
    responsive: true,
    backgroundColor: '#D8D8D8',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      }
    },
    layout: {
      padding: 0,
    },
    scales: {

      y: {
        display: false
      }
    },
    aspectRatio: 1.2,
    plugins:{
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    }
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
        label: '平均时间分布',
        data: props.averageTimeDistribution,
        borderColor: 'rgb(153,153,153)',
        backgroundColor: 'rgba(153,153,153, 0.5)',
      },
    ]
  }
  return (
    <div id="mainContent" className="newly-added">
      <p style={{paddingTop: '9vh', paddingBottom: 0}}>
        在一天的光景里 <br />
        你最常在 <span className="bold">{props.mostCommonPeriod}</span> 光顾噗噗 <br />
      </p>
      <p style={{paddingTop: '0', paddingBottom:'1vh'}}>你和所有用户的时间分布</p>
      <div id="lineChart">
        <Line
          id="lineChart"
          options={options}
          data={data}
        />
      </div>
    </div>
  )
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.miniProgramRedirect = this.miniProgramRedirect.bind(this);
  }

  miniProgramRedirect(post_id) {
    wx.miniProgram.navigateTo({
      url: '/pages/detail/detail?post_id=' + post_id
    })
  }


  render()
    {if (this.props.data.post_image == "") {
      var content_percentage = '100%';
      var img_div = <></>
    } else {
      var content_percentage = '82%';
      var img_div = <div className="post-image-outer">
      <img className="post-image" src={this.props.data.post_image} />
    </div>;;
    }

    if (this.props.data.post_is_complete) var long_msg = <></>;
    else var long_msg = <span>...</span>;


    var post_content = <>
      <div className="post-divider"></div>

      <div className="post-content">


        <div className="post-content-outer" style={{width: content_percentage}}>
          <div className="post-content-text">
            <span>{this.props.data.post_msg}</span>
            {long_msg}
          </div>
        </div>

        {img_div}
      </div>
    </>;
    

    return (
      <div className="post-outer" onClick={this.miniProgramRedirect(this.props.data.post_id)}>
        <div className="post-header">

          <div className="post-header-title">
            <span className="post-serial">#{this.props.data.post_id}</span>

            {(this.props.data.user_avatar == '') ? <></> :
              <div className="post-avatar-outer">
                <img className="post-avatar" src={"https://i.boatonland.com/avatar/" + this.props.data.user_avatar + ".svg"} />
              </div>}

            <div className="post-topic">
              <span className="post-topic-text">{this.props.data.post_topic}</span>
            </div>

            <div className="post-follower-comment-outer">

              <div style={{paddingRight: '7.5px'}}>
                {this.props.data.is_following ?
                  <img className="post-follower-icon" src={star_fill} /> :
                  <img className="post-follower-icon" src={star} />}
              </div>

              <div className="post-follower-num" style={{paddingRight: '12.5px'}}>{this.props.data.follower_num}</div>

              <div style={{paddingRight: '7.5px'}}>
                <img className="post-follower-icon" src={comment} />
              </div>

              <div className="post-follower-num">{this.props.data.comment_num}</div>
            </div>
          </div>
        </div>
        {post_content}

          
        
      </div>
    )}
}

function SubPageFour(props) {
  return (
    <div id="mainContent">
      <p className='sub45' style={{paddingTop: '8vh'}}>
      <span className="bold">{getDate(props.latest.date).slice(5)}</span> <br />
      <span className="bold">{props.latest.time}</span> 
      </p>
      <p className='sub45'>
        你在噗噗流连 <br />
        迟迟未睡 <br />
      </p>
      <p className='sub45'>
        这条树洞见证了 <br />
        你那晚的心事 <br />
      </p>
      <Post data={props.latest.post_detail} onClick={props.redirect} />
    </div>
  )
}

function SubPageFive(props) {
  return (
    <div>
      <p className='sub45' style={{paddingTop: '9vh'}}>
        <span className="bold">{getDate(props.earliest.date).slice(5)}</span> <br />
        <span className="bold">{props.earliest.time}</span> <br />
      </p>
      <p className='sub45' >
        你比小噗起得还要早 <br />
        你翻开的第一条树洞 <br />
        无声地同你说着早安 <br />
      </p>
      <Post data={props.earliest.post_detail} onClick={props.redirect}/>
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
    this.moveFloatingSticker =this.moveFloatingSticker.bind(this);
  }

  moveFloatingSticker(translation){
    const sticker = document.querySelector(".floating2");
    sticker.style.top = `${translation}`;
  }

  handleTouchStart(e) {
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e) {
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e) {

    if (this.state.touchStart - this.state.touchEnd > 150) {
      if (this.state.inPageNo < 5) {

        $("#mainContent").removeClass('newly-added');
        $("#mainContent").addClass('fadeOut');
      

        if ((this.state.inPageNo == 3 && this.props.data.user_latest.post_id == null && this.props.data.user_earliest.post_id == null) || (this.state.inPageNo == 4 && this.props.data.user_earliest.post_id == null)) {
          this.props.changePage(-100);
        } else if (this.state.inPageNo == 3 && this.props.data.user_latest.post_id == null && this.props.data.user_earliest.post_id != null) {
          setTimeout(() => {
            this.setState(prevState => {
              return {
                inPageNo: prevState.inPageNo + 2
              }
            });
          }, 1200);
        } else {
          setTimeout(() => {
            this.setState(prevState => {
              return {
                inPageNo: prevState.inPageNo + 1
              }
            });
          }, 1200);
          this.moveFloatingSticker('71vh')
        }

      }else{
        this.props.changePage(-100);
      }
    } else if (this.state.touchEnd - this.state.touchStart > 150) {
      if (this.state.inPageNo > 1) {
        if (this.state.inPageNo == 2){
          this.moveFloatingSticker('80px')
        }
        if (this.state.inPageNo == 5 && this.props.data.user_latest.post_id == null){
          this.setState(prevState => {
            return {
              inPageNo: prevState.inPageNo - 2
            }
          });
        }else{
          this.setState(prevState => {
            return {
              inPageNo: prevState.inPageNo - 1
            }
          });
        }
      } else {
        this.props.changePage(100);
      }
    }
  }

  render() {

    if (this.state.inPageNo == 1) {
      var html = <SubPageOne
        joinDate={this.props.data.user_join_date}
        joinTillNow={this.props.data.user_join_time_till_now}
      />
    } else if (this.state.inPageNo == 2) {
      var html = <SubPageTwo
        daysUsedCounter={this.props.data.user_date_count}
        minutesUsedCounter={this.props.data.user_minute_count}
        inTop10={this.props.data.user_minute_count_is_top10}
        rank={this.props.user_minute_count_rank}
        percentile={this.props.data.user_minute_count_percentage}
      />
    } else if (this.state.inPageNo == 3) {
      var html = <SubPageThree 
        mostCommonPeriod={this.props.data.user_most_common_time_period}
        userTimeDistribution={this.props.data.user_hour_distribution}
        averageTimeDistribution={this.props.data.total_hour_distribution}
      />
    } else if (this.state.inPageNo == 4) {
      var html = <SubPageFour latest={this.props.data.user_latest} />
    } else{
      var html = <SubPageFive earliest={this.props.data.user_earliest} />
    }

    return (
      <div
        className="page two"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {html}
        <img className='arrow' src={upArrow} draggable={false} />
        <img className='floating2' src={floating2} draggable={false}/>
        <span className='header'> @HKUPootal</span>
        <span className='footer'> HKU噗噗年终总结</span>
      </div>
    )
  }
}

function SubPageSix(props) {
  if(props.isTop10 || props.userViewPercentile>85) var slogan = "全pootal人的心事都要被你知道啦";
  else if(props.userViewPercentile>60) var slogan = "看那么多的树洞 真是辛苦你了 明年再接再厉";
  else var slogan = " 树洞里有超多好玩的东西 要记得常来喔";

  return(
    <div id="mainContent2">
        <p>
          今年噗噗共产生了 <span className="bold">{props.totalPostCount} </span> 条树洞 <br/>
          你光顾了其中的 <span className="bold">{props.userViewCount} </span> 条 <br/>
          {props.isTop10? <>在 {totalUserCount} 名噗噗用户中排名第 <span className="bold">{props.userViewRank} </span></>: 
          <>击败了 <span className="bold">{props.userViewPercentile}% </span> 的噗噗用户</>}
        </p>
        <p>{slogan}</p>
    </div>
  )
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

  handleTouchStart(e) {
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e) {
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e) {

    if (this.state.touchStart - this.state.touchEnd > 150) {
      if (this.state.inPageNo < 3) {

        $("#mainContent2").children().each(function () {
          $(this).removeClass('newly-added');
          $(this).addClass('fadeOut');
        });

        setTimeout(() => {
          this.setState(prevState => {
            return {
              inPageNo: prevState.inPageNo + 1
            }
          });

          $("#mainContent2").children().each(function () {
            $(this).removeClass('fadeOut');
            $(this).addClass('newly-added');
          });
        }, 1200);


      } else {
        this.props.changePage(-100);
      }
    } else if (this.state.touchEnd - this.state.touchStart > 150) {
      if (this.state.inPageNo > 1) {
        this.setState(prevState => {
          return {
            inPageNo: prevState.inPageNo - 1
          }
        });
      } else {
        this.props.changePage(100);
      }
    }
  }

  render() {

    if (this.state.inPageNo == 1) {
      var html = <SubPageSix
                    totalPostCount={this.props.data.total_post_count}
                    userViewCount={this.props.data.user_view_post_id_count}
                    isTop10={this.props.data.user_view_post_id_is_top10}
                    userViewRank={this.props.data.user_view_post_id_rank}
                    userViewPercentile={this.props.data.user_view_post_id_percentage}
                  />;
    } else if (this.state.inPageNo == 2) {
      var html = <div id="mainContent2">
        <h1> Element set two</h1>
      </div>
    } else if (this.state.inPageNo == 3) {
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
        <img className='arrow' src={upArrow} draggable={false} />
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

  handleTouchStart(e) {
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e) {
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e) {

    if (this.state.touchStart - this.state.touchEnd > 150) {
      if (this.state.inPageNo < 4) {

        $("#mainContent3").children().each(function () {
          $(this).removeClass('newly-added');
          $(this).addClass('fadeOut');
        });

        setTimeout(() => {
          this.setState(prevState => {
            return {
              inPageNo: prevState.inPageNo + 1
            }
          });

          $("#mainContent3").children().each(function () {
            $(this).removeClass('fadeOut');
            $(this).addClass('newly-added');
          });
        }, 1200);


      } else {
        this.props.changePage(-100);
      }
    } else if (this.state.touchEnd - this.state.touchStart > 150) {
      if (this.state.inPageNo > 1) {
        this.setState(prevState => {
          return {
            inPageNo: prevState.inPageNo - 1
          }
        });
      } else {
        this.props.changePage(100);
      }
    }
  }

  render() {

    if (this.state.inPageNo == 1) {
      var html = <div id="mainContent3">
        <h1> Element Set one </h1>
      </div>;
    } else if (this.state.inPageNo == 2) {
      var html = <div id="mainContent3">
        <h1> Element set two</h1>
      </div>
    } else if (this.state.inPageNo == 3) {
      var html = <div id="mainContent3">
        <h1> Element set three</h1>
      </div>
    } else {
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
        <img className='arrow' src={upArrow} draggable={false} />
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

  componentDidUpdate() {
    if (this.state.inPageNo == 2) {
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");

      const avatar = new Image();
      avatar.src = "https://i.boatonland.com/avatar/"+this.props.avatar+".svg"; 
      avatar.onload = () => { ctx.drawImage(avatar, canvas.width - 180, 60, 120, 120) }

      // ctx.fillStyle = "#FFFFFF";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      var grd = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
      grd.addColorStop(0, "#b4b4b4");
      grd.addColorStop(1, "#d6d6d6");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#000000"
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      ctx.font = "40px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText("#2022", 40, 80);
      ctx.fillText("噗噗年度报告", 40, 150);
      ctx.fillText(this.props.username + "的关键词", 40, 220);

    }
  }

  handleTouchStart(e) {
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e) {
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e) {

    if (this.state.touchStart - this.state.touchEnd > 150) {
      if (this.state.inPageNo < 2) {

        $("#mainContent4").children().each(function () {
          $(this).removeClass('newly-added');
          $(this).addClass('fadeOut');
        });

        setTimeout(() => {
          this.setState(prevState => {
            return {
              inPageNo: prevState.inPageNo + 1
            }
          });

          $("#mainContent4").children().each(function () {
            $(this).removeClass('fadeOut');
            $(this).addClass('newly-added');
          });
        }, 1200);
      }
    } else if (this.state.touchEnd - this.state.touchStart > 150) {
      if (this.state.inPageNo > 1) {
        this.setState(prevState => {
          return {
            inPageNo: prevState.inPageNo - 1
          }
        });
      } else {
        this.props.changePage(100);
      }
    }
  }

  download() {
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

    if (this.state.inPageNo == 1) {
      var html = <div id="mainContent4">
        <h1> Element Set one </h1>
        <img className='arrow' src={upArrow} draggable={false} />
      </div>;
    } else if (this.state.inPageNo == 2) {
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
      touchStart: 0,
      touchEnd: 0,
      translate: 0,
      data: {}
    }
    this.getUserData = this.getUserData.bind(this);
    this.changePage = this.changePage.bind(this);

  }

  getUserData() {
    const usrToken = 'cxiang'
    $.getJSON(`https://api.pupu.hkupootal.com/v3/report2022/get.php?user_itsc=${usrToken}`, function (result) {
      if (result.code === 200) {
        console.log(result.report_data);
        this.setState({ data: result.report_data });
      }
    }.bind(this))
  }

  changePage(translation) {
    translation = this.state.translate + translation;

    if (translation <= 0 && translation >= -400) {
      const pages = document.querySelectorAll(".page");
      pages.forEach(page => {
        page.style.transform = `translateY(${translation}vh)`
      })
      this.setState({ translate: translation });
    }

  }


  render() {
    return (
      <div
        className="pages"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <PageOne onClick={this.changePage} getData={this.getUserData}/>
        <PageTwo changePage={this.changePage} data={this.state.data}/>
        <PageThree changePage={this.changePage} data={this.state.data}/>
        <PageFour changePage={this.changePage} />
        <PageFive changePage={this.changePage} username={this.state.data.user_serial} avatar={this.state.data.user_avatar}/>
      </div>
    )
  }
}

function App() {
  return (
    <div className="container">
      <Pages />
    </div>
  );
}

export default App;
