import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    StyleSheet,
    Image
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Swiper from 'react-native-swiper';

import {Content,Icon} from 'native-base';
import NavigationContainer from './NavigationContainer';


import {Button} from 'native-base';
import {connect} from 'react-redux';
import Example from './Intro.js';

class WaffleScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        // const {searchText} = this.props;

        const {navigate} = this.props.navigation;
        return (
          this.props.show_intro===1 ?
          <Example/> :
            <NavigationContainer navigate={navigate} title='Home'>
              <View style={{flex: 4, justifyContent: 'center'}}>
                  <Swiper
                    horizontal={true}
                    autoplay={true}
                    width={undefined} // or set height directly
                    height={220}
                    autoplayTimeout={2.8}
                  >
                    <Image source={require('../images/waffle-1.jpg')} style={{width:undefined,height:undefined}} style={{flex:1,opacity:0.95}} resizeMode='cover'></Image>
                    <Image source={require('../images/waffle-2.jpg')} style={{width:undefined,height:undefined}} style={{flex:1,opacity:0.95}} resizeMode='cover'></Image>
                    <Image source={require('../images/waffle-3.jpg')} style={{width:undefined,height:undefined}} style={{flex:1,opacity:0.95}} resizeMode='cover'></Image>
                    </Swiper>
                    <Text style={{textAlign: 'center',flex: 1, fontWeight: '100', fontFamily: 'notoserif'}}>one Waffle a day.Makes you happy.</Text>
                </View>
                <View style={{flex: 5.5, justifyContent: 'space-around'}}>
                  <Text style={{height: 10}}></Text>
                <Button block rounded  bordered  onPress={() => navigate('Menu')} style={{justifyContent: 'space-between', borderColor: '#ff631a'}}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Icon style={{color:'#ff631a'}} name="pizza"/><Text style={styles.text}>開始點餐</Text><Text style={{width: 5}}></Text>
                </Button>
                <Button block rounded bordered warning onPress={() => navigate('Record')} style={{justifyContent: 'space-between', borderColor: '#80a4ea'}}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Icon style={{color:'#80a4ea'}} name="record"/><Text style={styles.text}>訂餐紀錄</Text><Text style={{width: 5}}></Text>
                </Button>
                <Button block rounded bordered warning onPress={() => navigate('Waffle')} style={{justifyContent: 'space-between', borderColor: '#526057'}}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Icon style={{color:'#526057'}} name="phone"/><Text style={styles.text}>聯絡我們</Text><Text style={{width: 5}}></Text>
                </Button>
                <Button block rounded bordered warning onPress={() => navigate('ShoppingCart')} style={{justifyContent: 'space-between', borderColor: '#7dd05d'}}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Icon style={{color:'#7dd05d'}} name="cart"/><Text style={styles.text}>購物車{"   "}</Text><Text style={{width: 5}}></Text>
                </Button>
                <Text style={{height: 5}}></Text>
              </View>
            </NavigationContainer>
        );
    }
}
const styles = StyleSheet.create({
  text:{
    fontSize: 18,

  }
});

export default connect(state => ({
    searchText: state.search.searchText,
    ...state.Intro
}))(WaffleScreen);
