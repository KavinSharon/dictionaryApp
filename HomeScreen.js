import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { word: 'loading....', definition: '',type:'',text:'',isSearchedPressed:false};
  }
  getWord =(word) => {
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+word+".json";
    return fetch(url)
    .then((data)=>{
      if (data.status === 200) {
        return data.json();
      }
      else {
        return null;
      }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject){
          //console.log(response);
          var word_1 = response.definitions[0];
          //console.log(word);
          var definition = word_1.description;
          //console.log(definition);
          var type = word_1.wordtype;
          this.setState({
            word: this.state.text,
            definition: definition,
            type: type,
          });
      }
    })
    
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'#000000'}
          centerComponent={{
            text: ' Dictionary App',

            style: { color: 'white', fontSize: 30, fontFamily: 'Bold' },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'loading....',
              lexicalCategory: '',
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> search </Text>{' '}
        </TouchableOpacity>
        <View>
          <Text>{this.state.isSearchedPressed&&this.state.word=="loading...."?
                  this.state.word:""}
          </Text>
          {this.state.word!=="loading...."?
            (
              <View>
              <Text style={{ fontSize: 18 }}>word:{this.state.word}</Text>
              <Text style={{ fontSize: 18 }}>definition:{this.state.definition}</Text>
              <Text style={{ fontSize: 18 }}>type:{this.state.type}</Text>
              </View>
            ):null}
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 70,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'red',
    outline: 'none',
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderLeftColor: 'red',
    borderRightColor:'green',
    borderTopColor:'yellow',
    borderBottomColor:'blue',
    backgroundColor: 'white'
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'times',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
