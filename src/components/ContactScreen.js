import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';
import NavigationContainer from './NavigationContainer';


// const { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class ContactScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          markers: [{
                      coordinate:{latitude:24.795767,longitude: 120.9912142},
                      key:1
                    }],
          region:{
            latitude: 24.794788,
            longitude: 120.992338,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
      }
      this.count = 0;
    }

    render(){
      const {navigate} = this.props.navigation;
      return (
        <NavigationContainer navigate={navigate} title='Contact'>
          <View style={{flex: 1}}>
              <MapView
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 24.7950681,
                  longitude: 120.9927922,
                  latitudeDelta: 0.0050,
                  longitudeDelta: 0.0050,
                }}>
                <MapView.Marker coordinate={{latitude:24.795767,longitude: 120.9920346}} title="My Waffle House" description="Welcome to order."/>
              </MapView>
            </View>
        </NavigationContainer>
        );
    }

    onRegionChange(region) {
      this.setState({ region });
    }
}

const styles = StyleSheet.create({
      container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    marker: {
      backgroundColor: '#550bbc',
      padding: 5
    }
})
