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
import ParallaxScrollView from 'react-native-parallax-scroll-view';





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
              <ParallaxScrollView
                              style={{flex: 1}}
                             backgroundColor="#ebebeb"
                             contentBackgroundColor="#ebebeb"
                             parallaxHeaderHeight={100}
                             renderForeground={() => (
                               <Image source={require('../images/pk_bg2.jpg')} style={styles.image} resizeMode='cover'>
                               </Image>
                             )}>
                <ScrollView style={{height: 950}}>
                <Button block transparent onPress={this.handlePanCakeList}>
                    <Text style={styles.text}>Waffle</Text>
                    <Icon name = 'chevron-right'></Icon>
                </Button>
                {this.state.PanCakeList_open === 1 && <View ref="PanCakeList_Animation" style={{flex: 1}}><PanCakeList /></View>}
                <Button block transparent onPress={this.handleDrinkList}>
                    <Text style={styles.text}>Drinks</Text>
                    <Icon name = 'chevron-right'></Icon>
                </Button>
                {this.state.DrinkList_open === 1 &&  <View ref="DrinkList_Animation" style={{flex: 1}}><DrinkList /></View>}
              </ScrollView>

              </ParallaxScrollView>
              <Button block transparent  onPress={() => navigate('Waffle')}>
                  <Text style={{textAlign:'right',fontFamily: 'monospace'}}>Return</Text>
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
    flex: 0.1
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
