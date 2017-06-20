import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import AppIntro from 'react-native-app-intro';
import {connect} from 'react-redux';
import {intro_close} from '../states/order-actions.js';

class Example extends Component {
  onSkipBtnHandle = (index) => {
    // Alert.alert('Skip');
    this.props.dispatch(intro_close());
    console.log(index);
  }
  doneBtnHandle = () => {
    // Alert.alert('Done');
    this.props.dispatch(intro_close());
  }
  nextBtnHandle = (index) => {
    // Alert.alert('Next');
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }
  render() {
    const pageArray = [{
      title: '鬆餅屋訂餐APP',
      description: '一機在手，訂餐要有！',
      img: require('../images/bear.png'),
      imgStyle: {
        height: 85 * 2.5,
        width: 85 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: '介面清晰 操作容易',
      description: '快速上手！',
      img: require('../images/pic22.png'),
      imgStyle: {
        height: 110 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#FFE66F',//'#afbd5d',
      // opacity:0.3,
      fontColor: '#fff',
      level: 10,
    },{
      title: '開始體驗鬆餅屋APP！',
      description: '營養活力的一天！',
      img: require('../images/pic3.gif'),
      imgStyle: {
        height: 90 * 2.5,
        width: 90 * 2.5,
      },
      backgroundColor: '#ACD6FF',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}



export default connect(state => ({
    ...state.Intro
}))(Example);
//
// AppRegistry.registerComponent('Example', () => Example);
