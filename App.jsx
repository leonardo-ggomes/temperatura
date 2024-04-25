import react, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Button, TouchableOpacity, Alert, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const Card = ({local, temperatura, umidade, nav}) => {
  return (
    <TouchableOpacity 
      style={{
        padding: 10,
        backgroundColor:'#fafafa',
        margin:1,
        borderRadius:2,
        flexDirection:'row',
        justifyContent:'space-between'
      }}
      onPress={() => nav.navigate('Secundaria', {
        local: local,
        temperatura: temperatura,
        umidade: umidade
      })}>
        <View style={{flexDirection:'row', gap: 5, alignItems:'center'}}>
          <View>
            <Image style={{width:30, height:30}} resizeMode='contain' src={temperatura < 27 ? 'https://cdn-icons-png.flaticon.com/512/6661/6661468.png' : 'https://cdn-icons-png.flaticon.com/512/599/599502.png'} />
          </View>          
          <View>
            <Text style={{fontWeight:'bold', fontSize: 30}}>{temperatura}°</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text>{umidade}% </Text>
              <Image resizeMode='contain' style={{width:10, height: 10}} src={'https://cdn-icons-png.flaticon.com/512/728/728105.png'}/> 
            </View>
            <View>
              <Text>{local}</Text>
            </View>
          </View>
          
        </View>
        <View style={{justifyContent:'center'}}>
          <Image resizeMode='contain' style={{width:20, height: 20}} src={'https://cdn.iconscout.com/icon/free/png-256/free-chevron-right-2653420-2202869.png'}/> 
        </View>
    </TouchableOpacity>
  )
}

const PrincipalScreen = ({navigation}) => {
  const [dados, setDados] = useState([])

  useEffect(()=> {
    function chamarDados(){

      try{
        // const req = await fetch('http://10.111.9.5/api/temperatura')
        // const json = await req.json()
        
        setDados([
          {
            "Temperatura": 27,
            "Umidade": 44,
            "Local": "Lab-Inf-2"
          },
          {
            "Temperatura": 27,
            "Umidade": 45,
            "Local": "Lab-Inf-1"
          },
          {
            "Temperatura": 36,
            "Umidade": 50,
            "Local": "Usinagem"
          },
          {
            "Temperatura": 34,
            "Umidade": 46,
            "Local": "Refeitorio"
          },
          {
            "Temperatura": 29,
            "Umidade": 49,
            "Local": "Lab. Eletronica"
          },
          {
            "Temperatura": 23,
            "Umidade": 39,
            "Local": "Lab. Quimica"
          }
        ])
      }
      catch(err){
        Alert.alert('Aviso','Falha na conexão')
      }
     
    }

    chamarDados()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {
          dados.map((dt, i) => <Card nav={navigation} local={dt.Local} key={i} temperatura={dt.Temperatura} umidade={dt.Umidade}/>)
        }
      </View>
    </SafeAreaView>
  )
}

const SecundariaScreen = ({route, navigation}) => {
  const {local, temperatura, umidade} = route.params
  
  return (
    <View style={{padding:5, borderRadius:2}}>
      <View style={{height:200, backgroundColor:'#fafafa'}}>
        <Image style={{width:'100%', height:'100%'}} resizeMode='contain' src={temperatura < 27 ? 'https://cdn-icons-png.flaticon.com/512/6661/6661468.png' : 'https://cdn-icons-png.flaticon.com/512/599/599502.png'} />
      </View>
      <Text style={{
        fontWeight:'bold',
        fontSize:30,
        backgroundColor:'#f5f5f5'
      }}>{local}</Text>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10
      }}>
        <Text>{temperatura}°</Text>
        <Text>{umidade}%</Text>
      </View>
      
    </View>
  )
}

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Clima' component={PrincipalScreen}  />
        <Stack.Screen name='Secundaria' component={SecundariaScreen}  />
      </Stack.Navigator>    
    </NavigationContainer>    
  )
}

//Estilo
const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default App;