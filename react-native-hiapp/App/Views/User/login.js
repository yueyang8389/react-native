import React, { PureComponent } from 'react';
import connect from 'redux-connect-decorator';
import {
  Text, View, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import config from '@Config';
import Storage from '@Utils/storage';
import styles from '@Styles';
import ChatService from '@Service/chat';
import { fetchUserToken } from '@Store/Actions';

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    backgroundColor: config.mainColor,
    color: config.viewsBackgroundColor,
    marginTop: 30,
    borderColor: config.mainColor,
    borderWidth: 1,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    fontSize: 25,
  },
});

@connect(
  state => ({
    token: state.app.token,
  }),
  {
    getUserToken: fetchUserToken,
  },
)
class login extends PureComponent {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
    password: '',
  };

  onChangeText = (name, text) => {
    this.setState({ [name]: text });
  }

  login = () => {
    const { username, password } = this.state;
    const { navigation, getUserToken } = this.props;
    getUserToken(username, password)
      .then((token) => {
        Storage.save('token', token);
        Storage.save('userId', username);
        ChatService.start(token);
        navigation.navigate('Home');
      });
  }

  render() {
    return (
      <View style={viewStyles.container}>
        <View style={viewStyles.title}>
          <Text>LOGIN</Text>
        </View>
        <TextInput
          style={viewStyles.input}
          placeholder="用户名"
          onChangeText={text => this.onChangeText('username', text)}
        />
        <TextInput
          style={viewStyles.input}
          placeholder="密码"
          secureTextEntry
          onChangeText={text => this.onChangeText('password', text)}
        />
        <TouchableOpacity
          style={viewStyles.button}
          onPress={this.login}
        >
          <Text>立即登陆</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default login;
