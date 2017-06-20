import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Text,
    View,
    ListView,
    TextInput,
    ScrollView,
    StyleSheet,
    AsyncStorage,
    Image
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';


import {Content} from 'native-base';
import NavigationContainer from './NavigationContainer';

import {CreateOrder, CreateUser} from '../api/order.js'
import {Button,Icon} from 'native-base';
import {connect} from 'react-redux';
import PanCakeList from './PanCakeList.js';
import DrinkList from './DrinkList.js';
import {delete_from_cart_pancake,delete_from_cart_drink,submit,clear_pancake,clear_drink} from '../states/order-actions.js';
import uuid from 'uuid';
import * as Animatable from 'react-native-animatable';
import ParallaxScrollView from 'react-native-parallax-scroll-view';


class ShoppingCart extends React.Component {

    constructor(props) {
      super(props);
      this.total_price = 0;
      this.state = {
                input_name : '',
                input_phone : '',
                input_email : '',
                input_time :'38247397',
                danger_name: false,
                danger_phone: false,
                danger_email: false,
                danger_time: false
            };

      this.handelAdd = this.handelAdd.bind(this);
      this.handelDelete = this.handelDelete.bind(this);
      this.handelDeleteDrink = this.handelDeleteDrink.bind(this);
      this.handelSubmit = this.handelSubmit.bind(this);
      this.handleUser = this.handleUser.bind(this);
    }

    render() {
        // const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        const userid = uuid();
        this.total_price = 0;
        for(var i = 0;i<this.props.present.length;i++)
        {
            this.total_price += this.props.present[i].price*this.props.present[i].quantity;
        }
        for(var i = 0;i<this.props.present2.length;i++)
        {
            this.total_price += this.props.present2[i].price*this.props.present2[i].quantity;
        }


        return (
            <NavigationContainer navigate={navigate} title='ShoppingCart'>
                <ParallaxScrollView
                               backgroundColor="#ffffff"
                               contentBackgroundColor="#ffffff"
                               parallaxHeaderHeight={300}
                               renderForeground={() => (
                                 <Image source={require('../images/checkout3.jpg')} style={styles.image} resizeMode='cover'>
                                 </Image>
                               )}>
                <View style={styles.rowContainer}>
                    <Text  style={[styles.itemname_title,styles.text]}>items</Text>
                    <Text style={styles.text}>#</Text>
                    <Text style={styles.text}>$</Text>
                    <Text style={styles.text}>total</Text>
                    <Text style={styles.title1}></Text>
                </View>
                <View style={styles.mainbox}>
                  {this.props.present.map((m=>
                    <View key = {m.name} style={styles.rowContainer} >
                                       <Text style={styles.itemname}>{m.name}</Text>
                                       <Text style = {styles.quantity}>{m.quantity}</Text>
                                       <Text style = {styles.quantity}>{m.price}</Text>
                                       <Text style = {styles.quantity2}>{m.quantity * m.price}</Text>
                                       <Text ><Icon style={{color: 'dimgray'}} name = 'delete' onPress = {() => this.handelDelete(m.name)}></Icon></Text>

                    </View>))}



                  {this.props.present2.map((m=>
                    <View  key = {m.name} style={styles.rowContainer}>
                                       <Text style={styles.itemname}>{m.name}</Text>
                                       <Text style = {styles.quantity}>{m.quantity}</Text>
                                       <Text style = {styles.quantity}>{m.price}</Text>
                                       <Text style = {styles.quantity2}>{m.quantity * m.price}</Text>
                                       <Text ><Icon style={{color: 'dimgray'}} name = 'delete' onPress = {() => this.handelDeleteDrink(m.name)}></Icon></Text>

                    </View>))}
                <Text style={styles.text}>{'\n'}Total : {this.total_price}{'\n'}</Text>
              </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontFamily: 'monospace',color: '#444',fontWeight:'bold'}}>{"  "}Name</Text>
              <TextInput
                style={{height: 40, borderColor: 'grey', borderWidth: 1,fontFamily: 'monospace',borderRadius: 8}}
                onChangeText={(input_name) => this.setState({input_name})}
                value={this.state.input_name}
                placeholder=" Please input your name."
                placeholderTextColor='grey'
                underlineColorAndroid='#108838'
              /><Text>{'\n'}</Text>
              <Text style={{fontFamily: 'monospace',color: '#444',fontWeight:'bold'}}>{"  "}Phone number</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1,fontFamily: 'monospace',borderRadius: 8}}
                onChangeText={(input_phone) => this.setState({input_phone})}
                value={this.state.input_phone}
                keyboardType='phone-pad'
                placeholder=" Please input your phome number."
                placeholderTextColor='grey'
              /><Text>{'\n'}</Text>
              <Text style={{fontFamily: 'monospace',color: '#444',fontWeight:'bold'}}>{"  "}E-mail</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1,fontFamily: 'monospace',borderRadius: 8}}
                onChangeText={(input_email) => this.setState({input_email})}
                value={this.state.input_email}
                keyboardType='email-address'
                placeholder=" Please input your e-mail."
                placeholderTextColor='grey'
              />
            </View>


            <Animatable.View ref="submit"><Button  block transparent onPress = {() => {this.handelSubmit(); this.handleUser(userid,this.state.input_name,this.state.input_email)}} ><Text style={{fontFamily: 'monospace'}}>submit</Text></Button></Animatable.View>
                <Button block transparent  onPress={() => {this.handelAdd(this.props.present,this.props.present2,this.state.input_name,this.state.input_phone,this.state.input_email,this.state.input_time);}}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text style={{fontFamily: 'monospace'}}>add to record</Text>
                </Button>
                <Button block transparent  onPress={() => navigate('Waffle')}>
                    {/* <Icon name='rocket' style={styles.icon} /> */}
                    <Text style={{fontFamily: 'monospace'}}>return</Text>
                </Button>
                <Button block rounded onPress={()=>{AsyncStorage.removeItem('USER').then(value => console.log(value));}}><Text>Delete Records</Text></Button>
              </ParallaxScrollView>
            </NavigationContainer>
        );
    }


    async handleUser(userid, name, email){
        const value = await AsyncStorage.getItem('USER');
        console.log(value);
        if(value !== null){
            console.log('User existed.');
        }else{
          var UID_object = {
                userid: userid,
                name: name,
                email: email
              };
          AsyncStorage.setItem('USER', JSON.stringify(UID_object), () =>{
              console.log('An user has been created.');
          });
          CreateUser(userid, name, email);
        }
    }


    handelAdd(present1,present2,name,phone,email,time){
        this.props.dispatch(submit(present1,present2,name,phone,email,time));
    }


    handelDelete(item){
      this.props.dispatch(delete_from_cart_pancake(item));
    }

    handelDeleteDrink(item){
      this.props.dispatch(delete_from_cart_drink(item));
    }
    handelSubmit(){
      if(!this.state.input_name){
        this.setState({
          danger_name : true
        });
        this.refs.submit.shake(600);
        Alert.alert(
          '請輸入姓名',
          '姓名為點餐用',
          [
            {text: '好', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        return;
      }
      if(!this.state.input_phone){
        this.setState({
          danger_phone : true
        });
        this.refs.submit.shake(600);
        Alert.alert(
          '請輸入電話',
          '電話為點餐用',
          [
            {text: '好', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        return;
      }
      if(!this.state.input_email){
        this.setState({
          danger_email: true
        });
        this.refs.submit.shake(600);
        Alert.alert(
          '請輸入e-mail',
          'e-mail為點餐用',
          [
            {text: '好', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        return;
      }
      const products = [...this.props.present,...this.props.present2];
      CreateOrder(this.state.input_name,
                  this.state.input_email,
                  this.state.input_phone,
                  this.state.input_time,
                  products,
                  this.props.present,
                  this.props.present2,
                  this.total_price
                );
      Alert.alert(
        '成功',
        '您已經送出訂單',
        [
          {text: '好', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this.setState({
        input_name: '',
        input_phone: '',
        input_email: ''
      });
      this.props.dispatch(clear_pancake());
      this.props.dispatch(clear_drink());
    }

}



    var styles = StyleSheet.create({
      mainbox:{
        alignItems: 'stretch',
        flex: 1,

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
        flex:1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'

      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex : 1
      },
      quantity: {
        width : 20
      },
      quantity2: {
        width : 25
      },
      itemname_title:{
        width: 80,
        textAlign: 'center'
      },
      itemname: {
        width : 80,
        textAlign: 'center'
      },
      title1: {
        // flex:2
        width:61
      },
      text:{
        textAlign: 'center',
        opacity : 1,
        flex: 1,
        fontFamily: 'monospace'
      },
      image:{
        opacity:0.7
      }
    });

export default connect((state) => {
    return {
        ...state.order,
        ...state.order2,
        ...state.Record
    };
})(ShoppingCart);
