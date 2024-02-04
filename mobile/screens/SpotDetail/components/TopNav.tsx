import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { colors } from '../../../constants/stylings/styles';


const TopNav:React.FC = () => {
  return (
    <View style={styles.topNavContainer}>
        <View>
            <View style={styles.button}>
                <FontAwesomeIcon size={15} icon={faChevronLeft} />
            </View>
        </View>
        <View style={styles.rightButtonContainer}>
            <View style={[styles.button, { marginRight: 5 }]}>
                <FontAwesomeIcon size={15} icon={faArrowUpFromBracket} />
            </View>
            <View style={[styles.button, { marginLeft: 5 }]}>
                <FontAwesomeIcon size={15} style={{ 'color': 'black' }} icon={faHeart} />
            </View>
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
        backgroundColor: colors.WHITE,
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


export default TopNav;
