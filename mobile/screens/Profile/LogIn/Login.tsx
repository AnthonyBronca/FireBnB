import React from 'react';
import Title from './components/Title';
import Body from './components/Body';

interface ILoginProps {
    navigation: any;
}
const Login:React.FC<ILoginProps> = ({navigation}) => {
  return (
    <>
        <Title />
        <Body navigation={navigation} />
    </>
  );
}

export default Login;
