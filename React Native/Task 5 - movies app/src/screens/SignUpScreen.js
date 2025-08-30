import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.title}>Let's get started</Text>
      <Text style={styles.subtitle}>The latest movies and series are here</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="3adel shakal"
          placeholderTextColor="gray"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Tiffanyjearsey@gmail.com"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="············"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Text style={styles.eyeIcon}>{isPasswordVisible ? '👀':'🫣'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.agreeContainer}>
        <Switch
          value={agree}
          onValueChange={setAgree}
          trackColor={{ false: '#767577', true: '#12CDD9' }}
          thumbColor={agree ? '#f4f3f4' : '#f4f3f4'}
        />
        <Text style={styles.agreeText}>
          I agree to the <Text style={styles.link}>Terms and Services</Text> and <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', { screen: 'Home' })}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signInText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1d2b',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
    fontSize: 30,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#2a2839',
    color: 'white',
    padding: 15,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2839',
    borderRadius: 10,
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    color: 'white',
    padding: 15,
  },
  eyeIcon: {
    paddingRight: 15,
    color: 'gray',
    fontSize: 20,
  },
  agreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  agreeText: {
    color: 'gray',
    marginLeft: 10,
    flex: 1,
  },
  link: {
    color: '#12CDD9',
  },
  button: {
    backgroundColor: '#12CDD9',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#12CDD9',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignUpScreen;
