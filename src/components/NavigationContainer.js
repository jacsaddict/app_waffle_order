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
      if(prevProps.bounce !== this.props.bounce)
           this.refs.icon.bounce(800);

    }
    render() {
        const {title, navigate} = this.props;
        return (
                <Container>
                    <Header style={{justifyContent:'center',alignItems:'center',flexDirection: 'row'}}>
                        <Body ><Title style={{textAlign:'center',alignItems:'center'}}>{title}</Title></Body>
                    </Header>
                    {this.props.children}
                    <Footer style={{padding:null,zIndex:0}}>
                            <FooterTab style={{justifyContent: 'space-between',padding:null,zIndex:0}}>
                              <Button   style={styles.item} onPress={() => navigate('Menu')}>
                                  <Icon name='pizza' style={styles.icon} />
                                </Button>
                                <Button   style={styles.item} onPress={() => navigate('Record')}>
                                  <Icon name='bookmark' style={styles.icon} />
                                </Button>
                                <Button   style={styles.item} onPress={() => navigate('Contact')}>
                                  <Icon name='phone' style={styles.icon}/>
                                </Button>

                                    {this.props.present.length+this.props.present2.length > 0 ?
                                      <Button  onPress={() => navigate('ShoppingCart')} style={{padding:null,zIndex:0}}>
                                          <Animatable.View ref="icon" style={{padding: null}}><IconBadge
                                              MainElement={
                                                <Icon name='cart' style={{color: appColors.primaryLightText,fontSize:20,zIndex:1}} />
                                              }
                                              BadgeElement={
                                                <Text style={{color:'#FFFFFF',fontSize:10,zIndex:1}}>{this.props.present.length+this.props.present2.length}</Text>
                                              }

                                              IconBadgeStyle={
                                                {width:15,
                                                height:10.5,
                                                top:-1,
                                                right: -0.6,
                                                backgroundColor: '#E32636',
                                                zIndex:1}
                                              }
                                              style={{height: 52,padding:null,border:null,zIndex:1}}
                                            /></Animatable.View></Button>
                                            :
                                            <Button  onPress={() => navigate('ShoppingCart')} style={styles.item}><View><Icon name='cart' style={{color: appColors.primaryLightText}} /></View></Button>}
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
