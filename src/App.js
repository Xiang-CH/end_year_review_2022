import logo from './images/pootal-logo.svg';
import upArrow from './images/up-arrows.png';
import floating2 from './images/page_two_floating.png';
import floating3 from './images/page_three_floating.png';
import floating4 from './images/page_four_floating.png';
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

import testdata from './test.json';

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
    this.popup = this.popup.bind(this);
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

  popup(e) {
    e.preventDefault();
    $('#agreement').css('display', 'block');
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
          <span>允许HKUPootal访问浏览数据</span>
          <a href="#" onClick={this.popup}>《信息授权协议》</a>
        </div>


      <div id='agreement'>
      <span onClick={()=>{$('#agreement').css('display', 'none')}}>X</span>
        <h1 style={{marginTop: 50, marginBottom: 20, fontSize:25}}>
            信息授权协议
        </h1>

        <ol style={{marginLeft: 10, marginRight: '30px'}}>
            <li style={{marginBottom: 20}}>
                为了生成您的噗噗年度报告,我们将根据您的授权,查询您2022年1月1日至2022年12月31日期间在HKU噗噗平台账号的使用时间、树洞发帖数据、互动数据、HKU ONE查询数据等,并据此进行汇总统计分析,以用于本活动页面向您进行信息展示。
            </li>
            <li style={{marginBottom: 20}}>
                您的噗噗年度报告为算法自动生成结果,可能与实际有偏差,HKUPootal无法保证相关数据的绝对准确性和有效性。
            </li>
            <li style={{marginBottom: 20}}>
                活动页面包含您的个人信息,当您选择向其他人转发活动页面的截图,其他人会看到上述信息,请谨慎选择。
            </li>
            <li style={{marginBottom: 20}}>
                除上述声明目的外,HKUPootal不会对本次查询的信息作其他处理。
            </li>
        </ol>
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
    elements:{
      point:{
        radius: 0,
      }
    },
    legend: {
      display: false
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      }
    },
    layout: {
      padding:{
        bottom: 7,
      }
    },
    scales: {
      y: {
        display: false
      }
    },
    aspectRatio: 1.2,
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
      <p style={{paddingTop: '11vh', paddingBottom: '1vh'}}>
        在一天的光景里 <br />
        你最常在 <span className="bold">{props.mostCommonPeriod}</span> 光顾噗噗 <br />
      </p>
      <p style={{paddingTop: '1vh', paddingBottom: '1vh'}}>你和所有用户的时间分布</p>
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

    var aStyle = {}
    if(this.props.style == 'smallMargin'){
      var aStyle = {margin: '0px'}
    }
    

    return (
      <div className="post-outer" onClick={this.miniProgramRedirect(this.props.data.post_id)} style={aStyle}>
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
    <div id="mainContent" className="newly-added">
      <p className='sub45' style={{paddingTop: '9.7vh'}}>
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
    <div id="mainContent" className="newly-added">
      <p className='sub45' style={{paddingTop: '9.8vh'}}>
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
    this.moveNextFloatingSticker = this.moveNextFloatingSticker.bind(this);
  }

  moveFloatingSticker(translation){
    const sticker = document.querySelector(".floating2");
    sticker.style.top = `${translation}`;
  }

  moveNextFloatingSticker(right, top){
    const sticker = document.querySelector(".floating3");
    sticker.style.top = `${top}`;
    sticker.style.right = `${right}`;
    sticker.style.width = '50%';
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
          this.moveNextFloatingSticker('6vh', '6vh');
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
        this.moveNextFloatingSticker('6vh', '6vh');
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
        <span className='footer'> HKU噗噗2022年度报告</span>
      </div>
    )
  }
}

function SubPageSix(props) {
  if(props.isTop10 || props.userViewPercentile>85) var slogan = "全pootal人的心事都要被你知道啦";
  else if(props.userViewPercentile>60) var slogan = "看那么多的树洞 真是辛苦你了\n明年再接再厉";
  else var slogan = " 树洞里有超多好玩的东西\n 要记得常来喔";

  return(
    <div id="mainContent2" className="newly-added">
        <p style={{paddingTop: '57vh'}} className="sub45">
          今年噗噗共产生了 <span className="bold">{props.totalPostCount} </span> 条树洞 <br/>
          你光顾了其中的 <span className="bold">{props.userViewCount} </span> 条 <br/>
        </p>
        <p className="sub45">
          {props.isTop10? <>在 {totalUserCount} 名噗噗用户中排名第 <span className="bold">{props.userViewRank} </span></>: 
          <>击败了 <span className="bold">{props.userViewPercentile}% </span> 的噗噗用户</>}
        </p >
        <p className="sub45" style={{whiteSpace: 'pre-line'}}>{slogan}</p>
    </div>
  )
}

function SubPageSeven(props) {
  return(
    <div id="mainContent2" className="newly-added">
    <p style={{paddingTop: '52vh'}} className="sub7">
       你查看过 <span className="bold">{props.hotPostCount} </span> 次热榜 <br/>
       参与了 <span className="bold">{props.voteCount} </span> 次投票 <br/>
       与港大、中大、科大三校的<br/>
       共计 <span className="bold">{props.intereactionCount} </span> 名同学进行了互动
    </p>
    <p className="sub7">
      为噗噗贡献了 <span className="bold">{props.postCount}</span> 条树洞 <br/>
      <span className="bold">{props.commentCount} </span> 条评论 <br/>
      <span className="bold">{props.pmCount} </span> 条私信 <br/>
    </p >
    <p className="sub7">小噗做梦也不会忘记</p>
</div>
  )
}

function CardOne (props) {
  return(
    <div className="card">
        <p className='sub8'>阅读量 最高 达到了 <span className="bold">{props.data.view_count}</span> 次</p>
        <Post style='smallMargin' data={props.data.post_detail}/>
    </div> 
  )
}

function CardTwo (props) {
  return(
    <div className="card">
      <p className='sub8'>评论数 最高 达到了 <span className="bold">{props.data.comment_count}</span> 条</p>
        <Post style='smallMargin' data={props.data.post_detail}/>
    </div>
  )
}

function CardThree (props) {
  return(
    <div className="card">
      <p className='sub8'>围观数 最高 达到了 <span className="bold">{props.data.follow_count}</span> 次</p>
        <Post style='smallMargin' data={props.data.post_detail}/>
    </div>
  )
}

class SubPageEight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPageNo: 1,
    }
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.slideCards = this.slideCards.bind(this);

  }

  handleTouchStart(e) {
    this.state.touchStart = e.targetTouches[0].clientX;
  }

  handleTouchMove(e) {
    this.state.touchEnd = e.targetTouches[0].clientX;
  }

  handleTouchEnd(e) {
    var totalPages = 0;
    if (this.props.user_most_view.post_id) totalPages += 1;
    if (this.props.user_most_comment.post_id) totalPages += 1;
    if (this.props.user_most_follow.post_id) totalPages += 1;

    if (this.state.touchStart - this.state.touchEnd > 100) {
      if (this.state.inPageNo < totalPages) {
        this.slideCards(-87*this.state.inPageNo);
        setTimeout(() => {this.setState(prevState => {
          return {
            inPageNo: prevState.inPageNo + 1
          }
          })
        },200)
      }
    }
    if (this.state.touchEnd - this.state.touchStart > 100) {
      if (this.state.inPageNo > 1) {
        this.slideCards(-87*(this.state.inPageNo-2));
        setTimeout(() => {this.setState(prevState => {
          return {
            inPageNo: prevState.inPageNo - 1
          }
          })
        }, 200)
      }
    }
  }

  slideCards(translation) {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.style.transform = `translateX(${translation}vw)`
    })
  }

  render() {

    var card1 = <></>;
    if (this.props.user_most_view.post_id) var card1 = <CardOne data={this.props.user_most_view}/>;

    var card2 = <></>;
    if (this.props.user_most_comment.post_id) var card2 = <CardTwo data={this.props.user_most_comment}/>;

    var card3 = <></>;
    if (this.props.user_most_follow.post_id) var card3 = <CardThree data={this.props.user_most_follow}/>;
    
    return(
      <div id="mainContent2" className='newly-added'>
      <p style={{paddingTop: '50.5vh', paddingLeft: '30px'}} className='sub8'>你发布的树洞中</p>
      <div 
        id='sliderCards' 
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {card1}
        {card2}
        {card3}
      </div>
      <p style={{padding:0, marginLeft: '30px', marginTop: '18px'}}>加油 你离百万树洞主只有一步之遥</p>
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

  handleTouchStart(e) {
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e) {
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e) {

    if (this.state.touchStart - this.state.touchEnd > 150) {
      if (this.state.inPageNo < 3) {

          $("#mainContent2").removeClass('newly-added');
          $("#mainContent2").addClass('fadeOut');

        const displayPage3 = this.props.data.user_most_view.post_id || this.props.data.user_most_comment.post_id || this.props.data.user_most_follow.post_id;
        if(this.state.inPageNo == 2 && !displayPage3){
          this.props.changePage(-100);
        }else{
          setTimeout(() => {
            this.setState(prevState => {
              return {
                inPageNo: prevState.inPageNo + 1
              }
            });

            $("#mainContent2").children().each(function () {
              $(this).removeClass('fadeOut');
            });
          }, 1200);
        }

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
        const sticker = document.querySelector(".floating3");
        sticker.style.top = '-10px';
        sticker.style.right = '-100px';
        sticker.style.width = '40%';
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
      var html = <SubPageSeven
            hotPostCount={this.props.data.user_view_hot_post_count}
            voteCount={this.props.data.user_vote_count}
            intereactionCount={this.props.data.interaction_count}
            postCount={this.props.data.user_post_count}
            commentCount={this.props.data.user_comment_count}
            pmCount={this.props.data.user_pm_count}
        />
    } else if (this.state.inPageNo == 3) {
      var html = <SubPageEight
          user_most_view={this.props.data.user_most_view}
          user_most_comment={this.props.data.user_most_comment}
          user_most_follow={this.props.data.user_most_follow}
      />
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
        <img className='floating3' src={floating3} draggable={false}/>
        <span className='header'> @HKUPootal</span>
        <span className='footer'> HKU噗噗2022年度报告</span>
      </div>
    )
  }
}

function SubPageNine(props) {
  return(
    <div id="mainContent3" className="newly-added">
        <p style={{paddingTop: '14vh'}}>
        <span className='bold'>{getDate(props.data.fire_date).slice(5)}</span><br/>
          对你来说一定是一个特殊的日子吧
        </p>
        <p style={{paddingBottom: '0.7vh'}}>   
        那天你接连发布了 <br/>
        <span className='bold'>{props.data.fire_post_count}</span> 条树洞 <br/>
        <span className='bold'>{props.data.fire_comment_count}</span>  条评论
        </p>
        <Post data={props.data.post_detail }/>
        <p>有<span className='bold'>表达欲</span>的瞬间值得被铭记</p>
    </div>
  )
}

function SubPageTen(props) {
  return(
    <div id="mainContent3" className="newly-added">
        <p style={{paddingTop: '10vh'}}>
          噗噗帮你记住了一条被遗忘的树洞<br/>
          <span className='bold'>#{props.data.post_id}</span><br/>
        </p>
        <p>
          <span className='bold'>{getDate(props.data.date).slice(5)}</span><br/>
          你围观了它<br/>
          但之后再未查看
        </p>
        <Post data={props.data.post_detail }/>
        <p>
          如今再看到这条树洞<br/>
          你会是什么感受呢 ?<br/>
          你是否还记得<br/>
          围观当天的心情呢 ?
        </p>
    </div>
  )
}

function SubPageEleven(props) {
  var list = ['     ', '     ', '     ', '     ', '     '];
  var numChar = ['一','两','三','四','五'];
  const wordCount = props.wordList.length;
  var otherSearch = '';
  for (let i = 0; i < wordCount; i++) {
    list[i] = props.wordList[i].keyword;
    otherSearch += `Top ${i+1}: ${props.wordList[i].keyword}, 还有 ${props.wordList[i].other_user_count} 名用户也搜索过这个关键词\n`;
  }

  return(
    <div id="mainContent3" className="newly-added">
      <p style={{textAlign: 'center',padding: '9vh 25px 1vh 25px', fontSize:'2.4vh', fontWeight:65}}>2022年<br/>
      你在 HKU ONE 搜索频次最高的{numChar[wordCount-1]}项词条是</p>

      <div id='keywords'>
        <span id="word2">{list[1]}</span>
        <span id="word1">{list[0]}</span>
        <span id="word3">{list[2]}</span>
        <span id="word4">{list[3]}</span>
        <span id="word5">{list[4]}</span>
      </div>

      <p style={{textAlign: 'center', fontSize: '2.2vh', marginBottom: 0}}>
        它们对你来说意味着什么 <br/>
        又串起了怎样苦甜参半的回忆呢？
      </p>
      <p style={{whiteSpace: 'pre-line', padding: '40px 30px 0 30px', fontSize: '1.92vh', textAlign: 'left', fontWeight: '45'}}>
        {otherSearch}
      </p>

    </div>
  )
}

class PageFour extends React.Component {
  constructor(props) {
    super(props);
    var total_page = 0;
    if (this.props.data.user_fire.post_id) total_page+=1;
    if (this.props.data.user_no_view_follow_post.post_id) total_page+=1;
    if (this.props.data.user_search_keyword_list.length > 0 ) total_page+=1;
    this.state = {
      inPageNo: 1,
      touchStart: 0,
      touchEnd: 0,
      totalPages: total_page,
      noPageOne: (!this.props.data.user_fire.post_id)
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
      if (this.state.inPageNo < this.state.totalPages) {

          $("#mainContent3").removeClass('newly-added');
          $("#mainContent3").addClass('fadeOut');

          const sticker = document.querySelector(".floating4");
          sticker.style.animation = 'floating 1s ease-in';

        if (this.state.inPageNo == 2 || (this.state.inPageNo == 1 && !this.props.data.user_fire.post_id)){
          setTimeout(() => {sticker.style.bottom = '-160px'}, 1000) 
        }

        setTimeout(() => {
          this.setState(prevState => {
            return {
              inPageNo: prevState.inPageNo + 1
            }
          });
        }, 1200);

        setTimeout(() => {sticker.style.animation = '';}, 1000)

      } else {
        this.props.changePage(-100);
      }
    } else if (this.state.touchEnd - this.state.touchStart > 150) {
      if (this.state.inPageNo > 1) {
        const sticker = document.querySelector(".floating4");
        sticker.style.animation = 'floating 1s ease-in-out alternate';

        if (this.state.inPageNo == 3){
          setTimeout(() => {sticker.style.bottom = '55px'}, 100)
          this.setState(prevState => {
            return {
              inPageNo: prevState.inPageNo - 1
            }
          }) ;

        } else{
          this.setState(prevState => {
            return {
              inPageNo: 1
            }
          });
        }


      
        setTimeout(() => {sticker.style.animation = '';}, 1000)
      } else {
        this.props.changePage(100);
      }
    }
  }

  render() {

    if (this.state.inPageNo == 1) {
      if (this.props.data.user_fire.post_id)
        var html = <SubPageNine data={this.props.data.user_fire}/>;
      else if (this.props.data.user_no_view_follow_post.post_id)
        var html = <SubPageTen data={this.props.data.user_no_view_follow_post}/>
      else
        var html = <SubPageEleven wordList={this.props.data.user_search_keyword_list}/>
    } else if (this.state.inPageNo == 2 ) {
      if (this.props.data.user_no_view_follow_post.post_id && !this.state.noPageOne)
        var html = <SubPageTen data={this.props.data.user_no_view_follow_post}/>
      else
        var html = <SubPageEleven wordList={this.props.data.user_search_keyword_list}/>
    } else{
      var html = <SubPageEleven wordList={this.props.data.user_search_keyword_list}/>
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
        <img className='floating4' src={floating4} draggable={false}/>
        <span className='header'> @HKUPootal</span>
        <span className='footer'> HKU噗噗2022年度报告</span>
      </div>
    )
  }
}

class PageFive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touchStart:0,
      touchEnd:0
    }

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.download = this.download.bind(this);
  }

  componentDidMount() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    const avatar = new Image();
    avatar.src = "https://i.boatonland.com/avatar/"+this.props.avatar+".svg"; 
    avatar.onload = () => { ctx.drawImage(avatar, 80, 160, 120, 120) }

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

    ctx.font = "45px PuHui";
    ctx.fillStyle = "#000000";
    ctx.fillText("2022噗噗年度报告", 110, 100);
    ctx.fillText("的HKUPootal关键词", 105, 370);
    ctx.font = "70px PuHui";
    ctx.fillText(this.props.username, 210, 240);

    ctx.fillStyle = "#000000";
    ctx.fillText(this.props.title1, 20+(8-this.props.title1.length)*70/2, 500);
    ctx.fillText(this.props.title2, 20+(8-this.props.title2.length)*70/2, 600);


  }

  handleTouchStart(e) {
    this.state.touchStart = e.targetTouches[0].clientY;
  }

  handleTouchMove(e) {
    this.state.touchEnd = e.targetTouches[0].clientY;
  }

  handleTouchEnd(e) {

    if (this.state.touchStart - this.state.touchEnd > 150) {

      
    } else if (this.state.touchEnd - this.state.touchStart > 150) {
        this.props.changePage(100);
      
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
    return (
      <div
        className="page five"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <div id="mainContent">
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
      data: {},
      dataLoaded: false,
    }
    this.getUserData = this.getUserData.bind(this);
    this.changePage = this.changePage.bind(this);

  }

  getUserData() {
    const usrToken = 'cxiang'
    $.getJSON(`https://api.pupu.hkupootal.com/v3/report2022/get.php?user_itsc=${usrToken}`, function (result) {
      if (result.code === 200) {
        console.log(result.report_data);
        this.setState({ data: result.report_data, dataLoaded: true  });
      }
    }.bind(this))
    // this.setState({ data: testdata, dataLoaded: true });
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
    var posterPage = <></>
    var pageFour = <></>
    if(this.state.dataLoaded) {
        posterPage =  <PageFive 
            changePage={this.changePage} 
            username={this.state.data.user_serial} 
            avatar={this.state.data.user_avatar} 
            title1={this.state.data.user_title_1}
            title2={this.state.data.user_title_2}
          />;
        pageFour = <PageFour changePage={this.changePage} data={this.state.data}/>;
    }
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
        {pageFour}
        {posterPage}
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
