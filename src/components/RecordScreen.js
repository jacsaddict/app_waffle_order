import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    AsyncStorage,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Content} from 'native-base';
import NavigationContainer from './NavigationContainer';

import uuid from 'uuid';
import {Button} from 'native-base';
import {connect} from 'react-redux';

import {q_order_pancake,q_order_drink} from '../states/order-actions.js';
import {listOrder} from '../api/order.js';

class RecordScreen extends React.Component {
    // static propTypes = {
    //     navigation: PropTypes.object.isRequired,
    //     // searchText: PropTypes.string.isRequired
    // };

    constructor(props) {

      super(props);
      this.outMessage;
      this.quick_order = this.quick_order.bind(this);
    }
    async componentDidMount(){
        const value = await AsyncStorage.getItem('USER');
        console.log(value);
        console.log(typeof(value));
        let user = JSON.parse(value);
        listOrder(user.userid, user.name, user.email).then(function(res) {
            this.outMessage = res;
            console.log(this.outMessage[0]);
        }).catch(function(err){
            console.log(err);
        });
        // AsyncStorage.getItem('USER', (result) => {
        //     console.log(result);
        //     // listOrder(result.userid, result.name, result.email);
        // });
    }

    render() {
        // const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        var count = 0;
        var temp1 = [];
        var temp2 = [];
        for(let x=0;x<this.props.records.length;x++)
        {
            if(x%2 === 0)
            {
              temp1 = [...temp1,this.props.records[x]];
            }
            else
            {
              temp2 = [...temp2,this.props.records[x]];
            }
        }

        return (
            <NavigationContainer navigate={navigate} title='Record'>
              <View style={{flex: 9}}>
                  {this.props.records.map((m=>
                      <View key = {count++} >
                        <Text style={{height: 20}}></Text>
                        {m.map((k=>
                          <Text style={{textAlign: 'center',justifyContent: 'space-between'}} key = {uuid().toString()} id = "list">{k.name} {k.quantity}</Text>
                      ))}
                      {(count === 2) && <Button block transparent  onPress={() => this.quick_order(temp1[0],temp2[0])}><Text style={{fontFamily: 'monospace'}}>quick order</Text></Button>}
                      {(count === 4) && <Button block transparent  onPress={() => this.quick_order(temp1[1],temp2[1])}><Text style={{fontFamily: 'monospace'}}>quick order</Text></Button>}
                      {(count === 6) && <Button block transparent  onPress={() => this.quick_order(temp1[2],temp2[2])}><Text style={{fontFamily: 'monospace'}}>quick order</Text></Button>}
                    </View>
                  ))}
            </View>
            <Text>{this.outMessage}</Text>
            <Button block transparent  onPress={() => navigate('Waffle')}>
                {/* <Icon name='rocket' style={styles.icon} /> */}
                <Text style={{fontFamily: 'monospace',flex: 1,textAlign: 'center'}}>return</Text>
            </Button>
            </NavigationContainer>
        );
    }




    quick_order(temp1,temp2)
    {
      var t1 = [];
      console.log(temp1);
      if(temp1 !== [])
        for(let x=0;x<temp1.length;x++)
        {
          t1 = [...t1,temp1[x]];
        }
      var t2 = [];
      if(temp2 !== [])
        for(let x=0;x<temp2.length;x++)
        {
          t2 = [...t2,temp2[x]];
        }
      this.props.dispatch(q_order_pancake(t1));
      this.props.dispatch(q_order_drink(t2));
    }


}





export default connect((state) => {
    return {
        ...state.order,
        ...state.order2,
        ...state.record
    };
})(RecordScreen);
