import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Content} from 'native-base';
import NavigationContainer from './NavigationContainer';
import ImageSlider from 'react-native-image-slider';

import {Button} from 'native-base';
import {connect} from 'react-redux';

class WaffleScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        // searchText: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        // const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Waffle'>
                <View style={{flex: 4, justifyContent: 'center'}}>
                  <Swiper
                    horizontal={true}
                    autoplay={true}
                    width={undefined} // or set height directly
                    height={270}
                  >
                    <Image source={require('../images/waffle-1.jpg')} style={{width:undefined,height:undefined}} style={{flex:1}} resizeMode='cover'></Image>
                    <Image source={require('../images/waffle-2.jpg')} style={{width:undefined,height:undefined}} style={{flex:1}} resizeMode='cover'></Image>
                    </Swiper>
                    <Text style={{textAlign: 'center',flex: 1}}>Waffle Store</Text>
                </View>
                <View style={{flex: 3,justifyContent:'center'}}>
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
}))(WaffleScreen);
