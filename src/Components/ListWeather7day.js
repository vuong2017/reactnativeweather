import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import api from '../Api/api';
import PropTypes from 'prop-types';
class ListWeather7day extends Component{
  getDay = (day)=>{
      const d = new Date(day*1000);
      return api.weather.getDay(d.getDay(),d.getDate());
  }
  onPress = (e) => {
      this.props.navigation.navigate('Details',{...e,city:this.props.city});
  }
  renderItem = ()=>{
    const {data} = this.props;
    const Item = data.map((e,i)=>{
      this.getDay(e.dt);
      return (
        <TouchableOpacity key={i} style={styles.ListItem7day} onPress={()=>this.onPress(e)}>
          <View style={styles.day}>
            <Text style={styles.TextFonts}>{this.getDay(e.dt).day}, Ngày {this.getDay(e.dt).time}</Text>
          </View>
          <View style={styles.TempAndImg}>
            <Text style={styles.TextFonts}>{Math.round(e.temp.day)}°C</Text>
            {e.weather[0].main === 'Clear'
              ? <Image source={require('../../image/cloud.png')} />
              : e.weather[0].main === 'Rain'
              ? <Image source={require('../../image/rain.png')} />
              : <Image source={require('../../image/sun.png')} />
            }
          </View>
        </TouchableOpacity>
      )
    })
    return Item;
  }
  render(){
    return(
      <View style={styles.ListWeather7day}>
        {this.renderItem()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ListWeather7day:{
    flexDirection:'column'
  },
  ListItem7day:{
    flex:1,
    flexDirection:'row',
    padding:10,
    marginTop:5,
    marginBottom:5,
    backgroundColor: 'rgba(48, 65, 79, 0.48)'
  },
  TempAndImg:{
    flex:0.3,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  day:{
    flex:0.7,
    flexDirection:'row',
    alignItems:'center'
  },
  TextFonts:{
    fontFamily:'Lobster-Regular',
    fontSize:17,
    paddingRight:15,
    color:'#f7f4f4'
  }
})
ListWeather7day.propTypes = {
  data: PropTypes.array.isRequired
}
export default ListWeather7day;
