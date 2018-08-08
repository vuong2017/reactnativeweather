import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image} from 'react-native';
import PropTypes from 'prop-types';
class WeatherCurrent extends Component{
  render(){
    const {data} = this.props;
    return(
      <View style={styles.WeatherCurrent}>
        <Text style={{fontFamily:'Lobster-Regular',fontSize:30,color:'white'}}>{data.time.day}, {data.time.time}</Text>
        <Text style={{fontFamily:'Lobster-Regular',fontSize:30,color:'white'}}>{data.name}</Text>
        {data.main === 'Clear'
          ? <Image source={require('../../image/DTcloud.png')} />
          : data.main === 'Rain'
          ? <Image source={require('../../image/DTrain.png')} />
          : <Image source={require('../../image/DTsun.png')} />
        }
        <Text style={styles.TextFonts}>{Math.round(data.temp)}°C</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  WeatherCurrent:{
    marginTop:20,
    flexDirection:'column',
    alignItems:'center'
  },
  TextFonts:{
    fontFamily:'Lobster-Regular',
    fontSize:40,
    color:'#f7f4f4'
  }
})
WeatherCurrent.propTypes = {
  data: PropTypes.object.isRequired
}
export default WeatherCurrent;
