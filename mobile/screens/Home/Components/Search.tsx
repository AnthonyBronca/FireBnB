import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { fonts } from '../../../constants/stylings/styles';


const Search:React.FC = () => {

  return (
        <View style={styles.searchBarComponentContainer}>
            <View style={styles.searchBarView}>
                <TouchableOpacity
                    style={styles.searchBar}
                    activeOpacity={0.8}
                >
                    <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} size={20}/>
                    <Text style={styles.placeholderHeading}>Where To?</Text>
                    <Text style={styles.placeholderSubheading}>Anywhere · Any week · Add guests</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.filterIconView}>
                <TouchableOpacity
                    style={styles.filterIconContainer}
                    activeOpacity={0.9}
                >
                    <FontAwesomeIcon icon={faFilter} size={20}/>
                </TouchableOpacity>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    searchBarComponentContainer: {
        height: 100,
        justifyContent: 'center',
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1
        // alignItems: 'center'
    },
    searchBarView: {
        width: 320,
        marginLeft: 25,
        borderRadius: 30,
    },
    searchBar: {
        backgroundColor: 'white',
        height: 50,
        width: 320,
        borderColor: '#e4e4e4',
        borderWidth: 0.4,
        borderRadius: 30,
        justifyContent:'center',
    },
    placeholderHeading: {
        ...fonts.defaultText,
        fontWeight: '500',
        marginLeft: 60,
    },
    placeholderSubheading: {
        ...fonts.subText,
        marginLeft: 60,
    },
    searchIcon: {
        position: 'absolute',
        marginLeft: 20
    },
    filterIconView: {
        width: 40,
        height: 40,
        position: 'absolute',
        left: 360,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    filterIconContainer: {
        width: 40,
        height: 40,
        borderColor: '#b8b8b8',
        borderWidth: 1.5,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default memo(Search);
