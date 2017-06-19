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
import Accordion from 'react-native-collapsible/Accordion';


const reqRcords = []
class RecordScreen extends React.Component {
    // static propTypes = {
    //     navigation: PropTypes.object.isRequired,
    //     // searchText: PropTypes.string.isRequired
    // };

    constructor(props) {

      super(props);
      this.state = {
          record_first:  [],
          record_second: [],
          record_third:  []
      };
      this.sections = [];
      this.quick_order = this.quick_order.bind(this);
    }
    async componentDidMount(){
        const value = await AsyncStorage.getItem('USER');
        let user = JSON.parse(value);
        await listOrder(user.userid, user.name, user.email).then(function(res) {
            reqRcords = res;
        }).catch(function(err){
            console.log(err);
        });
        console.log(reqRcords);
        this.setState({
            record_first:   reqRcords.length > 0 ? reqRcords[0].products:[],
            record_second:  reqRcords.length > 1 ? reqRcords[1].products:[],
            record_third:   reqRcords.length > 2 ? reqRcords[2].products:[]
        });
        console.log(this.state);
        this.sections = [
          {
            title: 'First  Record',
            content: this.state.record_first,
          },
          {
            title: 'Second Record',
            content: this.state.record_second,
          },
          {
            title: 'Third  Record',
            content: this.state.record_third,
          }
        ];
        this.forceUpdate();
    }

    _renderHeader(section) {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      );
    }

    _renderContent(section) {
      console.log(section);
      return (
        <View style={styles.content}>
          {section.content.map((m =>
            <View key={JSON.parse(m).name} style={styles.content} >
              <Text  style={styles.contentText}>{JSON.parse(m).name}{"  "}{JSON.parse(m).quantity}</Text>
              <Text  style={styles.contentText}>{'\n'}</Text>
            </View>
          ))}
          {section.content.length>0 && <Button onPress={() => this.quick_order(section.content)}><Text>Quick Order</Text></Button>}
        </View>
      );
    }
    render() {
        // const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        const sections = this.sections;
        // var count = 0;
        // var temp1 = [];
        // var temp2 = [];
        // for(let x=0;x<this.props.records.length;x++)
        // {
        //     if(x%2 === 0)
        //     {
        //       temp1 = [...temp1,this.props.records[x]];
        //     }
        //     else
        //     {
        //       temp2 = [...temp2,this.props.records[x]];
        //     }
        // }

        return (
            <NavigationContainer navigate={navigate} title='Record'>
              <View style={{flex: 9,justifyContent: 'center'}}>
                  {/* {this.props.records.map((m=>
                      <View key = {count++} >
                        <Text style={{height: 20}}></Text>
                        {m.map((k=>
                          <Text style={{textAlign: 'center',justifyContent: 'space-between'}} key = {uuid().toString()} id = "list">{k.name} {k.quantity}</Text>
                      ))}
                      {(count === 2) && <Button block transparent  onPress={() => this.quick_order(temp1[0],temp2[0])}><Text style={{fontFamily: 'monospace'}}>quick order</Text></Button>}
                      {(count === 4) && <Button block transparent  onPress={() => this.quick_order(temp1[1],temp2[1])}><Text style={{fontFamily: 'monospace'}}>quick order</Text></Button>}
                      {(count === 6) && <Button block transparent  onPress={() => this.quick_order(temp1[2],temp2[2])}><Text style={{fontFamily: 'monospace'}}>quick order</Text></Button>}
                    </View>
                  ))} */}
                  <Accordion
                    sections={sections}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    underlayColor="rgba(241, 161, 75, 0.9)"
                    quick_order={this.quick_order}
                  />
            </View>
            <Button block transparent  onPress={() => navigate('Waffle')}>
                {/* <Icon name='rocket' style={styles.icon} /> */}
                <Text style={{fontFamily: 'monospace',flex: 1,textAlign: 'center'}}>return</Text>
            </Button>
            </NavigationContainer>
        );
    }




    quick_order(content)
    {
      console.log(content.toString());
      var temp = JSON.parse("["+content.toString()+"]");
      console.log(content);
      console.log(temp);
      this.props.dispatch(q_order_pancake(temp));
      this.props.dispatch(q_order_drink(temp));
    }
}

const styles = {
    header:{
        justifyContent: 'center',
    },
    headerText:{
        fontSize: 21,
        fontFamily: "monospace",
        textAlign: "center"
    },
    content:{
        justifyContent: 'center'
    },
    contentText:{
        textAlign: "center",
        fontFamily: "monospace"
    }
}




export default connect((state) => {
    return {
        ...state.order,
        ...state.order2,
        ...state.record
    };
})(RecordScreen);
