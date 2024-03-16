import React, {  useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import {Formik} from 'formik';
import { colors, fonts } from '../../../constants/stylings/styles';
import { Divider } from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import { useAppDispatch } from '../../../store/hooks';
import * as Yup from 'yup';
import { login } from '../../../store/session';
import AuthContext from '../../../context/AuthContext';
// import { useAppSelector } from '../../../store';



interface ILoginFormProps {
    navigation: any;
    err: string[];
    setErr: Function
};

interface IForm {
    email: string;
    password: string;
};

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required")
})


const LoginForm:React.FC<ILoginFormProps>= ({navigation, err, setErr}) => {
    const dispatch = useAppDispatch();
    // const user = useAppSelector((state)=> state.session.user)
    const { toggleAuthorized } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false);
    // const [err, setErr] = useState<string[]>([]);
    const submit = async(values: IForm) => {
        const {email, password} = values;
        const form = {credential: email, password}
        setIsLoading(true);
        Keyboard.dismiss();
       const res = await dispatch(login(form))
       if(res){
        setIsLoading(false);
       }
       if(res.status !== 200){
        const newErrors = [res.data.message];
        setErr(newErrors);
       } else{
        toggleAuthorized(true)
           //Joe.Smith@demo.com
           //StrongDemoPassword!
        navigation.navigate('Home')
       }
    }
  return (
    <Formik
    validationSchema={LoginSchema}
    validateOnMount={false}
    initialValues={{email: '', password: ''}}
    onSubmit={(values)=> submit(values)}
    >{({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.formContainer}>
            <View style={styles.textInputContainer}>
                <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
                value={values.email}
                style={styles.input}
                mode='outlined'
                outlineColor='rgba(255,255,255,0)'
                activeOutlineColor='black'
                label="Email or Username"
                error={errors.email && touched.email? true: false}
                />
                <Divider width={1} />
                <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'
                label='Password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                mode='outlined'
                style={styles.input}
                outlineColor='rgba(255,255,255,0)'
                activeOutlineColor='black'
                secureTextEntry
                error={errors.password && touched.password? true: false}
                />
            </View>

                {err.length > 0 ? err.map((error, idx) => (
                    <View key={`${idx}-${new Date()}`} style={{
                        justifyContent: 'center',
                        flexDirection: 'row'
                        }}>
                        <Text style={{color: 'red'}}>{`${error}`}</Text>
                    </View>
                ))
                :
                null
                }
            <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimerText}>We will NOT call or text you to confirm your number. This is not a real app.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={(e: any) => handleSubmit(e) }>
                    <View style={styles.loginButton}>
                        {
                            isLoading ?
                            <View><ActivityIndicator size="large" color={colors.WHITE} /></View>
                            :
                            <Text style={styles.loginButtonText}>Continue</Text>

                        }
                    </View>
                </Pressable>
            </View>
        </View>
        )}
    </Formik>
  );
}

const styles = StyleSheet.create({
    loginButton: {
        width: '100%',
        backgroundColor: colors.RESERVERED,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        color: 'white',
        fontWeight: '500',
        fontFamily: 'System'
    },
    buttonContainer: {
        marginHorizontal: 40
    },
    input: {
        height: 25,
        // margin: 12,
        // borderWidth: 1,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0)'
    },
    formContainer: {
        marginTop: 30,
    },
    textInputContainer: {
        borderWidth: 1,
        marginHorizontal: 40,
        borderRadius: 8,
        borderColor: 'rgb(150,150,150)',
        marginBottom: 5,
        padding: 0
    },
    disclaimerContainer: {
        marginTop: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginHorizontal: 40,
        marginBottom: 20
    },
    disclaimerText: fonts.subText
})

export default LoginForm;
