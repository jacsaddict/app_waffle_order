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

import {Content,
        DeckSwiper,
        Card,
        CardItem,
        Left,
        Body
} from 'native-base';
import NavigationContainer from './NavigationContainer';


import {Button,Icon} from 'native-base';
import {connect} from 'react-redux';
import {add_drink,minus_drink,add_to_cart_drink,iconFeedback} from '../states/order-actions.js';
import * as Animatable from 'react-native-animatable';



class DrinkItem extends React.Component {
    // static propTypes = {
    //     // navigation: PropTypes.object.isRequired,
    //     // searchText: PropTypes.string.isRequired
    // };

    constructor(props) {
        super(props);


        this.cards = [
            {
              item: this.props.item2[0],
              price: this.props.price2[0],
              quantity: this.props.quantity2[0],
              image: require('../images/lemon-black-tea.jpg'),
              intro: 'Life Gave Me Lessons When I Wanted Lemons.',
              id: 0
            },
            {
              item: this.props.item2[1],
              price: this.props.price2[1],
              quantity: this.props.quantity2[1],
              image: require('../images/icecream-black-tea.jpg'),
              intro: 'ice cream ice cream fulfills my dream',
              id:1
            },
            {
              item: this.props.item2[2],
              price: this.props.price2[2],
              quantity: this.props.quantity2[2],
              image: require('../images/mellon-lemon.jpg'),
              intro: 'Sour lemons mixed with sweet mellon tea quenching your thirst.',
              id:2
            }
          ];
        this.func_add = this.func_add.bind(this);
        this.func_minus = this.func_minus.bind(this);
        this.func_add_to_cart = this.func_add_to_cart.bind(this);
    }

    componentDidMount(){
      this.refs.view.fadeIn(600);
    }

    func_add(id)
      {
        this.props.dispatch(add_drink(id));
        this.forceUpdate();
      }

      func_minus(id)
      {
        if(this.props.quantity2[id] > 0)
            this.props.dispatch(minus_drink(id));
        this.forceUpdate();
      }
      func_add_to_cart(id)
      {
          this.props.dispatch(iconFeedback());
          this.props.dispatch(add_to_cart_drink(id));
          this.forceUpdate();
      }



    render() {
        // const {searchText} = this.props;
        // const {navigate} = this.props.navigation;
        return (
          <Animatable.View style={styles.mainbox} ref="view" style={{height: 425}}>
              <DeckSwiper
                        dataSource={this.cards}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem style={{backgroundColor:'#e8e8e8'}}>
                                    <Left>
                                        <Body>
                                            <Text style={{color: '#e55100',fontSize: 18}}>{item.item}</Text>
                                            <Text>{item.intro}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody style={{alignSelf:'center',backgroundColor:'#e8e8e8'}}>
                                  <View style={{backgroundColor:'#e8e8e8'}}>
                                    <Image style={{ resizeMode: 'cover', width: 400 ,height:280, alignSelf:'center',opacity:1}} source={item.image} />
                                  </View>
                                </CardItem>
                                <CardItem style={{justifyContent: 'space-between',backgroundColor:'#e8e8e8'}}>
                                  <Button  small rounded onPress={() => this.func_minus(item.id)}><Text>–</Text></Button>
                                    <Text style = {styles.quantity}>
                                      {this.props.quantity2[item.id]}
                                    </Text>
                                  <Button  small rounded onPress={() => this.func_add(item.id)  }><Text>+</Text></Button>
                                  <Text style={{width: 130}}></Text>
                                <Button  small onPress={() => this.func_add_to_cart(item.id)}><Icon name="cart"/></Button>
                                </CardItem>
                            </Card>
                        }
                    />
              {/* <View style={styles.rowContainer}>
                <Text style={styles.itemname}>
                  {this.props.item2[0]}
                </Text>
                <Text>
                  {this.props.price2[0]}
                </Text>
                <Text>
                    元
                </Text>
                <Button small onPress={() => this.func_minus(0)}><Text>-</Text></Button>
                <Text style = {styles.quantity}>
                   {this.props.quantity2[0]}
                </Text>
                <Button small onPress={() => this.func_add(0)  }><Text>+</Text></Button>
                <Button small onPress={() => this.func_add_to_cart(0)}><Icon name="cart"/></Button>
              </View>



              <View style={styles.rowContainer}>
                <Text style={styles.itemname}>
                  {this.props.item2[1]}
                </Text>
                <Text>
                  {this.props.price2[1]}
                </Text>
                <Text>
                    元
                </Text>
                <Button small onPress={() => this.func_minus(1)}><Text>-</Text></Button>
                <Text style = {styles.quantity}>
                   {this.props.quantity2[1]}
                </Text>
                <Button small onPress={() => this.func_add(1)  }><Text>+</Text></Button>
                <Button small onPress={() => this.func_add_to_cart(1)}><Icon name="cart"/></Button>
              </View>



              <View style={styles.rowContainer}>
                <Text style={styles.itemname}>
                  {this.props.item2[2]}
                </Text>
                <Text>
                  {this.props.price2[2]}
                </Text>
                <Text>
                    元
                </Text>
                <Button small onPress={() => this.func_minus(2)}><Text>-</Text></Button>
                <Text style = {styles.quantity}>
                   {this.props.quantity2[2]}
                </Text>
                <Button small onPress={() => this.func_add(2)  }><Text>+</Text></Button>
                <Button small onPress={() => this.func_add_to_cart(2)}><Icon name="cart"/></Button>
              </View> */}
          </Animatable.View>
        );
    }
}

var styles = StyleSheet.create({
  mainbox:{
    alignItems: 'stretch',
    flex: 1
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    flexDirection: 'row',
    // width: 40
    justifyContent: 'flex-start'
  },
  price: {
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex : 1
  },
  quantity: {
    width : 20
  },
  itemname: {
    width : 80
  }
});

export default connect(state => ({
    ...state.order2,
    ...state.ShoppingCartIcon
}))(DrinkItem);
