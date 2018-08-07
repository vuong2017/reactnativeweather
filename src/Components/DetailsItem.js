import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import api from '../Api/api';
class Details extends Component{
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTitleStyle: {
      color:'#f7f7f7',
      textAlign:"center"
    },
  };
  renderBackground = ()=>{
    const {params} = this.props.navigation.state;
    if(params.weather[0].main === 'Clear') return (<Image  style={styles.background_image} source={require('../../image/cloud.jpg')} />)
    if(params.weather[0].main === 'Rain') return (<Image  style={styles.background_image} source={require('../../image/Rain.jpg')} />)
    return (<Image  style={styles.background_image} source={require('../../image/Sun.jpg')} />)
  }
  getDay = (day)=>{
      const d = new Date(day*1000);
      return api.weather.getDay(d.getDay(),d.getDate());
  }
  render(){
    const {params} = this.props.navigation.state;
    return(
      <View style={styles.container}>
          <View style={styles.background}>
            {this.renderBackground()}
          </View>
          <View style={styles.infoTemp}>
            <Text style={styles.TextFonts}>{this.getDay(params.dt).day}, Ngày {this.getDay(params.dt).time}</Text>
            <Text style={styles.TextFonts}>{params.city}</Text>
            {params.weather[0].main === 'Clear'
              ? <Image source={require('../../image/DTcloud.png')} />
              : params.weather[0].main === 'Rain'
              ? <Image source={require('../../image/DTrain.png')} />
              : <Image source={require('../../image/DTsun.png')} />
            }
            <Text style={styles.TextFontsTemp}>{Math.round(params.temp.day)}°C</Text>
          </View>
          <View style={styles.forecast}>
              <View style={styles.forecastTitle}>
                <View style={styles.day}>
                  <Text style={styles.TextFontsDT}>Nhiệt độ cao nhất :</Text>
                </View>
                <View style={styles.TempAndImg}>
                  <Text style={styles.TextFontsDT}>{Math.round(params.temp.max)}°C</Text>
                </View>
              </View>
              <View style={styles.forecastTitle}>
                <View style={styles.day}>
                  <Text style={styles.TextFontsDT}>Nhiệt độ thấp nhất :</Text>
                </View>
                <View style={styles.TempAndImg}>
                  <Text style={styles.TextFontsDT}>{Math.round(params.temp.min)}°C</Text>
                </View>
              </View>
              <View style={styles.forecastTitle}>
                <View style={styles.day}>
                  <Text style={styles.TextFontsDT}>Nhiệt độ buổi sáng :</Text>
                </View>
                <View style={styles.TempAndImg}>
                  <Text style={styles.TextFontsDT}>{Math.round(params.temp.morn)}°C</Text>
                </View>
              </View>
              <View style={styles.forecastTitle}>
                <View style={styles.day}>
                  <Text style={styles.TextFontsDT}>Nhiệt độ buổi trưa :</Text>
                </View>
                <View style={styles.TempAndImg}>
                  <Text style={styles.TextFontsDT}>{Math.round(params.temp.eve)}°C</Text>
                </View>
              </View>
              <View style={styles.forecastTitle}>
                <View style={styles.day}>
                  <Text style={styles.TextFontsDT}>Nhiệt độ buổi tối :</Text>
                </View>
                <View style={styles.TempAndImg}>
                  <Text style={styles.TextFontsDT}>{Math.round(params.temp.night)}°C</Text>
                </View>
              </View>

          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column'
  },
  infoTemp:{
    flex:0.6,
    paddingTop:20,
    flexDirection:'column',
    alignItems:'center'
  },
  forecast:{
    flex:0.35,
    flexDirection:'column',
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderColor:'white',
    paddingLeft:25,
    paddingRight:25,
    justifyContent:'center'
  },
  forecastTitle:{
    flex:0.2,
    flexDirection:'row'
  },
  TextFonts:{
    fontFamily:'Lobster-Regular',
    fontSize:30,
    color:'#f7f4f4'
  },
  TextFontsTemp:{
    fontFamily:'Lobster-Regular',
    fontSize:50,
    color:'#f7f4f4'
  },
  day:{
    flex:0.8,
    flexDirection:'row',
    alignItems:'center'
  },
  TempAndImg:{
    flex:0.2,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  TextFontsDT:{
    fontFamily:'Lobster-Regular',
    fontSize:20,
    paddingRight:10,
    color:'#f7f4f4'
  },
  background:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0
  }
})
export default Details;
