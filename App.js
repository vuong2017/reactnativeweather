import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Platform,StyleSheet,Text,View,Dimensions,Image,ActivityIndicator,Button,ScrollView} from 'react-native';
import  WeatherCurrent from './src/Components/WeatherCurrent';
import  ListWeather7day from './src/Components/ListWeather7day';
import {FetchDataWeather} from './src/Redux/ActionCreators';
import PropTypes from 'prop-types';
class App extends Component{
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTitleStyle: {
      color:'#f7f7f7',
      textAlign:"center",
      flex:1
    },
  };
  renderBackground = ()=>{
    const {data} = this.props;
    if(data.list[0].weather[0].main === 'Clear') return (<Image  style={styles.background_image} source={require('./image/BGCloud.jpg')} />)
    if(data.list[0].weather[0].main === 'Rain') return (<Image  style={styles.background_image} source={require('./image/BGRain.jpg')} />)
    return (<Image  style={styles.background_image} source={require('./image/BGSun.jpg')} />)
  }
  render(){
    const {isLoading,data,error,navigation} = this.props;
    if(isLoading){
      return (
        <View style={{flex:1,justifyContent:'center'}}>
          <ActivityIndicator size="large" color="#f4511e" />
        </View>
      );
    }
    if(error){
      return (
        <View style={{flex:1,justifyContent:'center'}}>
        <Text style={styles.TextFonts}>{error}</Text>
        <Button  title={"Refresh"} onPress={()=>this.props.dispatch(FetchDataWeather())} />
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <View style={styles.background}>
          {this.renderBackground()}
        </View>
        <ScrollView>
          <WeatherCurrent  data={data.datacurrent} />
          <ListWeather7day navigation={navigation} city={data.city.name} data={data.list} />
        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column'
  },
  background:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  background_image:{
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },
  TextFonts:{
    fontFamily:'Lobster-Regular',
    fontSize:25,
    textAlign:'center',
    color:'black',
    paddingLeft:20,
    paddingRight:10
  }
})
const mapStateToProps = state=>({
  error:state.error,
  data:state.data,
  isLoading:state.isLoading
})
App.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading:PropTypes.bool.isRequired,
  error:PropTypes.string.isRequired
}
export default connect(mapStateToProps)(App);
