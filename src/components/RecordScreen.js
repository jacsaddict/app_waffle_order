import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    AsyncStorage,
    Image
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Content} from 'native-base';
import NavigationContainer from './NavigationContainer';

import uuid from 'uuid';
import {Button} from 'native-base';
import {connect} from 'react-redux';

import {q_order_pancake,q_order_drink,iconFeedback} from '../states/order-actions.js';
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
        console.log(value);
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
            <View key={JSON.parse(m).name} style={styles.innercontent} >
              <Text  style={styles.contentText}>{JSON.parse(m).name}{"  "}{JSON.parse(m).quantity}</Text>
              <Text  style={{height: 7}}>{'\n'}</Text>
            </View>
          ))}
          {section.content.length>0 && <Button rounded style={{alignSelf: 'center'}}  onPress={() => this.quick_order(section.content)}><Text style={{textAlign: 'center'}}>Quick Order</Text></Button>}
          <Text  style={{height: 7}}>{'\n'}</Text>
        </View>
      );
    }
    render() {
        const {navigate} = this.props.navigation;
        const sections = this.sections;
        return (
            <NavigationContainer navigate={navigate} title='Record'>
              <Image source={require('../images/record6.jpg')} style={styles.image} resizeMode='cover'>
              </Image>
              <View style={{flex: 9,justifyContent: 'center'}}>
                  <Accordion
                    sections={sections}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    underlayColor="rgba(241, 161, 75, 0.9)"
                    quick_order={this.quick_order}
                  />
            </View>
            <Button block transparent  onPress={() => navigate('Waffle')}>
                <Text style={{fontFamily: 'monospace',flex: 1,textAlign: 'center'}}>return</Text>
            </Button>
            </NavigationContainer>
        );
    }




    quick_order(content)
    {
      var temp = JSON.parse("["+content.toString()+"]");
      this.props.dispatch(q_order_pancake(temp));
      this.props.dispatch(q_order_drink(temp));
      this.props.dispatch(iconFeedback());
    }
}

const styles = {
    header:{
        justifyContent: 'center',
    },
    headerText:{
        fontSize: 18,
        fontFamily: "monospace",
        textAlign: "center"
    },
    content:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    innercontent:{
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    contentText:{
        textAlign: "right",
        fontFamily: "monospace",
        height: 18
    },
    image:{
    opacity:0.7,
    flex: 7
    }
}




export default connect((state) => {
    return {
        ...state.order,
        ...state.order2,
        ...state.record,
        ...state.ShoppingCartIcon
    };
})(RecordScreen);
