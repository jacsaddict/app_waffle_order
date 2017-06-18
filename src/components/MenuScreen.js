import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    Image
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Content} from 'native-base';
import NavigationContainer from './NavigationContainer';


import {Button,Icon} from 'native-base';
import {connect} from 'react-redux';
import PanCakeList from './PanCakeList.js';
import DrinkList from './DrinkList.js';



export default class MenuScreen extends React.Component {
    // static propTypes = {
    //     navigation: PropTypes.object.isRequired,
    //     // searchText: PropTypes.string.isRequired
    // };

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
        // const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Menu'>
              <Image source={require('../images/pk_bg2.jpg')} style={styles.image} resizeMode='cover'>
              </Image>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    {/* <Text style={[styles.text, styles.store]}>高菲鬆餅屋</Text> */}
                <Button block transparent onPress={this.handlePanCakeList}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Icon name = 'pizza'></Icon>
                    <Text style={styles.text}>waffle</Text>
                    <Icon name = 'chevron-right'></Icon>
                </Button>
                <Button block transparent onPress={this.handleDrinkList}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text style={styles.text}>drinks</Text>
                </Button>
                <Button block transparent  onPress={() => navigate('Waffle')}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                  
                    <Text style={styles.text}>return</Text>

                </Button>
              </View>


                {this.state.DrinkList_open === 1 && <DrinkList />}
                {this.state.PanCakeList_open === 1 && <PanCakeList/>}

            </NavigationContainer>
        );
    }



        handlePanCakeList(){
        this.setState({
          PanCakeList_open : 1,
          DrinkList_open : 0
        })
      }
      handleDrinkList(){
        this.setState({
          DrinkList_open : 1,
          PanCakeList_open : 0
        })
      }



}
const styles = {
  image:{
    // opacity:0.8,
    width: undefined,
    height: undefined,
    flex: 2
  },
  store:{

  },
  text:{
    textAlign: 'center',
    opacity : 1,
    flex: 1,
    fontFamily: 'monospace'
  }

}
