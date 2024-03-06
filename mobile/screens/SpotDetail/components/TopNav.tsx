import React, { memo } from 'react';
import { View, StyleSheet, Animated} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { colors } from '../../../constants/stylings/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';



interface ITopNav {
    navigation: any;
    val: any
}

const TopNav:React.FC<ITopNav> = ({navigation, val}) => {


    const goBack = () => {
        navigation.pop();
    };

    const animatedButtons = val.interpolate({
        inputRange: [0, 50],
        outputRange: [colors.WHITE, "transparent"],
        extrapolate: 'clamp'
    })

  return (
    <View style={styles.topNavContainer}>
        <View>
            <Animated.View style={[
                styles.button, {
                    backgroundColor: animatedButtons
                }]}>
                <TouchableOpacity onPress={goBack}>
                    <FontAwesomeIcon size={15} icon={faChevronLeft} />
                </TouchableOpacity>
            </Animated.View>
        </View>
        <View style={styles.rightButtonContainer}>
            <Animated.View style={[
                styles.button,{
                marginRight: 5,
                backgroundColor: animatedButtons
                }]}>
                <FontAwesomeIcon size={15} icon={faArrowUpFromBracket} />
            </Animated.View>
            <Animated.View
                style={[
                    styles.button,{
                    marginLeft: 5,
                    backgroundColor: animatedButtons
                    }]}>
                <FontAwesomeIcon size={15} style={{ 'color': 'black' }} icon={faHeart} />
            </Animated.View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    topNavContainer: {
        zIndex: 100,
        position: 'absolute',
        top: 50,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    rightButtonContainer: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 50,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    navIcon: {
        padding: 3,
        width: 3,
    },
    navButton: {
        backgroundColor: colors.WHITE,
        borderRadius: 50,
    },

})


export default memo(TopNav);
