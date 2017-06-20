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

import {Content} from 'native-base';
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
                    height={270}
                  >
                    <Image source={require('../images/waffle-1.jpg')} style={{width:undefined,height:undefined}} style={{flex:1,opacity:0.95}} resizeMode='cover'></Image>
                    <Image source={require('../images/waffle-2.jpg')} style={{width:undefined,height:undefined}} style={{flex:1,opacity:0.95}} resizeMode='cover'></Image>
                    </Swiper>
                    <Text style={{textAlign: 'center',flex: 1}}>Waffle Store</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                <Button block transparent  onPress={() => navigate('Menu')}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text>開始點餐</Text>
                </Button>
                <Button block transparent  onPress={() => navigate('Record')}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text>訂餐紀錄</Text>
                </Button>
                <Button block transparent  onPress={() => navigate('Waffle')}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text>聯絡我們</Text>
                </Button>
                <Button block transparent  onPress={() => navigate('ShoppingCart')}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text>購物車</Text>
                </Button>
              </View>
            </NavigationContainer>
        );
    }
}
const styles = StyleSheet.create({
});

export default connect(state => ({
    searchText: state.search.searchText,
    ...state.Intro
}))(WaffleScreen);
