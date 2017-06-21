import React from 'react';
import PropTypes from 'prop-types';
import {Text,Image} from 'react-native';
import {Container, Header, Button, Icon, Left, Right, Body, Title, Drawer,Footer,FooterTab,View,Badge} from 'native-base';
import DrawerSideBar from './DrawerSideBar';
import appColors from '../styles/colors';
import * as Animatable from 'react-native-animatable';
import {iconFeedback} from '../states/order-actions.js';
import {connect} from 'react-redux'
import IconBadge from 'react-native-icon-badge';
AniButton = Animatable.createAnimatableComponent(Button);


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
                            <FooterTab style={{justifyContent: 'space-between'}}>
                              <Button   style={styles.item} onPress={() => navigate('Menu')}>
                                  <Icon name='pizza' style={styles.icon} />
                                </Button>
                                <Button   style={styles.item} onPress={() => navigate('Record')}>
                                  <Icon name='bookmark' style={styles.icon} />
                                </Button>
                                <Button   style={styles.item}>
                                  <Icon name='phone' style={styles.icon}/>
                                </Button>
                                <Button  onPress={() => navigate('ShoppingCart')} style={styles.item}>
                                    {this.props.present.length+this.props.present2.length > 0 ?
                                    <IconBadge
                                        MainElement={
                                          <Icon name='cart' style={{color: appColors.primaryLightText}} />
                                        }
                                        BadgeElement={
                                          <Text style={{color:'#FFFFFF'}}>{this.props.present.length+this.props.present2.length}</Text>
                                        }

                                        IconBadgeStyle={
                                          {width:17,
                                          height:17,
                                          top:-8,
                                          right: -0.6,
                                          backgroundColor: '#E32636'}
                                        }
                                      /> : <Icon name='cart' style={{color: appColors.primaryLightText}} />}
                                </Button>
                            </FooterTab>
                        </Footer>
                </Container>
        );
    }
}

const styles = {
    item: {
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
