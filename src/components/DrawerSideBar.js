import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform} from 'react-native'

import {Container, Content, Thumbnail, Icon, Badge, Button, Text as NbText} from 'native-base';
import appColors from '../styles/colors';

export default class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    render() {
      const {navigate} = this.props;
      return (
        <Container style={styles.drawer}>
            <Image source={require('../images/account-bg.jpg')} style={styles.header}>
                <Thumbnail large source={require('../images/account.jpg')} />
            </Image>
            <Button block transparent style={styles.item} onPress={() => navigate('Menu')}>
                <Icon name='pizza' style={styles.icon} />
                <Text style={styles.text}>開始點餐</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Record')}>
                <Icon name="bookmark" style={styles.icon} />
                <Text style={styles.text}>訂單紀錄</Text>
            </Button>
            <Button block transparent style={styles.item}>
                <Icon name='phone' style={styles.icon}/>
                <Text style={styles.text}>聯絡我們</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('ShoppingCart')}>
                <Icon name='cart' style={styles.icon} />
                <Text style={styles.text}>購物車</Text>
            </Button>
        </Container>
    );
    }
}

const styles = {
    drawer: {
        flex: 1,
        backgroundColor: appColors.primaryLight
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        marginBottom: 16
    },
    item: {
        alignItems: 'center'
    },
    icon: {
        color: appColors.primaryLightText
    },
    text: {
        color: appColors.primaryLightText,
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12
    }
};
