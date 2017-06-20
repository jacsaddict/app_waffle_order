import React from 'react';
import PropTypes from 'prop-types';
import {Text,Image} from 'react-native';
import {Container, Header, Button, Icon, Left, Right, Body, Title, Drawer,Footer,FooterTab,View} from 'native-base';
import SearchButtonWithModal from './SearchButtonWithModal';
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

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }
    componentDidUpdate(prevProps, prevState)
    {
      if(prevProps.bounce !== this.props.bounce)
        this.refs.icon.bounce(1500);
    }
    render() {
        const {title, navigate} = this.props;
        return (
            <Drawer
                ref={(el) => this.drawer = el}
                content={<DrawerSideBar navigate={navigate} />}
                onClose={this.closeDrawer}
                tweenHandler={(ratio) => ({
                    mainOverlay: {
                        opacity: ratio,
                        backgroundColor: appColors.mask
                    }
                })}>
                <Container>
                    <Header>
                        <Left><Button transparent onPress={this.openDrawer}>
                            <Icon name='menu' />
                        </Button></Left>
                        <Body><Title>{title}</Title></Body>
                        <Right><SearchButtonWithModal /></Right>
                    </Header>
                    {this.props.children}
                    <Footer >
                            <FooterTab>
                              <Button block transparent style={styles.item} onPress={() => navigate('Menu')}>
                                  <Icon name='pizza' style={styles.icon} />
                                </Button>
                                <Button block transparent style={styles.item} onPress={() => navigate('Record')}>
                                  <Icon name='bookmark' style={styles.icon} />
                                </Button>
                                <Button block transparent style={styles.item}>
                                  <Icon name='phone' style={styles.icon}/>
                                </Button>
                                <Animatable.View ref="icon"><Button block transparent style={styles.item} onPress={() => navigate('ShoppingCart')}>
                                  <Icon name='cart' style={styles.icon} />
                                </Button></Animatable.View>
                            </FooterTab>
                        </Footer>
                </Container>
              </Drawer>

        );
    }





    openDrawer() {
        this.drawer._root.open();
    }

    closeDrawer() {
        this.drawer._root.close();
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
    header: {
        width: undefined,
        height: undefined,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        marginBottom: 16
    },
};

export default connect((state) => {
    return {
        ...state.ShoppingCartIcon
    };
})(NavigationContainer);
