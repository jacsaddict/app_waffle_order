import React from 'react';
import PropTypes from 'prop-types';
import {Text,Image} from 'react-native';
import {Container, Header, Button, Icon, Left, Right, Body, Title, Drawer,Footer,FooterTab,View,Badge} from 'native-base';
import DrawerSideBar from './DrawerSideBar';
import appColors from '../styles/colors';
import * as Animatable from 'react-native-animatable';
import {iconFeedback} from '../states/order-actions.js';
import {connect} from 'react-redux'

class NavigationContainer extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

    }
    componentDidUpdate(prevProps, prevState)
    {
      if(prevProps.bounce !== this.props.bounce)
        this.refs.icon.bounce(1500);
    }
    render() {
        const {title, navigate} = this.props;
        return (
                <Container>
                    <Header style={{justifyContent:'center',alignItems:'center',flexDirection: 'row'}}>
                        <Body ><Title style={{textAlign:'center',alignItems:'center'}}>{title}</Title></Body>
                    </Header>
                    {this.props.children}
                    <Footer >
                            <FooterTab>
                              <Button   style={styles.item} onPress={() => navigate('Menu')}>
                                  <Icon name='pizza' style={styles.icon} />
                                </Button>
                                <Button   style={styles.item} onPress={() => navigate('Record')}>
                                  <Icon name='bookmark' style={styles.icon} />
                                </Button>
                                <Button   style={styles.item}>
                                  <Icon name='phone' style={styles.icon}/>
                                </Button>
                                <Animatable.View ref="icon"><Button   style={styles.item} onPress={() => navigate('ShoppingCart')}>
                                    <Icon name='cart' style={{color: appColors.primaryLightText,flex:1}} />
                                </Button></Animatable.View>
                            </FooterTab>
                        </Footer>
                </Container>
        );
    }
}

const styles = {
    item: {
        alignItems: 'center'
    },
    icon: {
        color: appColors.primaryLightText
    },
};

export default connect((state) => {
    return {
        ...state.ShoppingCartIcon,
        ...state.order,
        ...state.order2
    };
})(NavigationContainer);
