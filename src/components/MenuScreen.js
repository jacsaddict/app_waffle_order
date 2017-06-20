import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    Image,
    ScrollView
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Content} from 'native-base';
import NavigationContainer from './NavigationContainer';


import {Button,Icon} from 'native-base';
import {connect} from 'react-redux';
import PanCakeList from './PanCakeList.js';
import DrinkList from './DrinkList.js';
import * as Animatable from 'react-native-animatable';





export default class MenuScreen extends React.Component {


    constructor(props) {

      super(props);
      this.state = {
      PanCakeList_open : 0,
      DrinkList_open : 0
    }

    this.handlePanCakeList = this.handlePanCakeList.bind(this);
    this.handleDrinkList   = this.handleDrinkList.bind(this);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Menu'>
              <Image source={require('../images/pk_bg2.jpg')} style={styles.image} resizeMode='cover'>
              </Image>
                <ScrollView style={{flex: 3}}>
                    {/* <Text style={[styles.text, styles.store]}>高菲鬆餅屋</Text> */}
                <Button block transparent onPress={this.handlePanCakeList}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text style={styles.text}>waffle</Text>
                    <Icon name = 'chevron-right'></Icon>
                </Button>
                {this.state.PanCakeList_open === 1 && <View ref="PanCakeList_Animation"><PanCakeList /></View>}
                {/* <View ref="PanCakeList_Animation"><PanCakeList /></View> */}
                <Button block transparent onPress={this.handleDrinkList}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text style={styles.text}>drinks</Text>
                    <Icon name = 'chevron-right'></Icon>
                </Button>
                {this.state.DrinkList_open === 1 &&  <View ref="DrinkList_Animation"><DrinkList /></View>}
                {/* <View ref="DrinkList_Animation"><DrinkList /></View> */}
              </ScrollView>


                {/* {this.state.DrinkList_open === 1 && <DrinkList />}
                {this.state.PanCakeList_open === 1 && <PanCakeList/>} */}
                <Button block transparent  onPress={() => navigate('Waffle')}>
                    <Text style={{textAlign:'right',fontFamily: 'monospace'}}>return</Text>
                </Button>
            </NavigationContainer>
        );
    }



        handlePanCakeList(){
          if(this.state.PanCakeList_open === 0)
          {
            this.setState({
              PanCakeList_open : 1
            });

          }
          else {
          this.setState({
              PanCakeList_open : 0
          });
          }
      }
      handleDrinkList(){
        if(this.state.DrinkList_open === 0)
          this.setState({
            DrinkList_open : 1
          })
        else {
          this.setState({
            DrinkList_open : 0
          })
        }
      }



}
const styles = {
  image:{
    width: undefined,
    height: undefined,
    flex: 0.6
  },
  store:{

  },
  text:{
    opacity : 1,
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 20
  }
}
