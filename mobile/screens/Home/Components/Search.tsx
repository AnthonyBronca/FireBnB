import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { fonts } from '../../../constants/stylings/styles';
import SearchModal from './SearchModal';


const Search:React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    return (
            <View style={styles.searchBarComponentContainer}>
                <View>
                    <TouchableOpacity
                        style={styles.searchBar}
                        activeOpacity={0.8}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} size={20}/>
                        <Text style={styles.placeholderHeading}>Where To?</Text>
                        <Text style={styles.placeholderSubheading}>Anywhere · Any week · Add guests</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.filterIconContainer}
                        activeOpacity={0.9}
                    >
                        <FontAwesomeIcon icon={faFilter} size={20}/>
                    </TouchableOpacity>
                </View>
                <SearchModal isVisible={modalVisible} setIsVisible={setModalVisible}/>
            </View>
    );
}

const styles = StyleSheet.create({
    searchBarComponentContainer: {
        height: 100,
        justifyContent: 'center',
        gap: 10,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchBar: {
        backgroundColor: 'white',
        height: 50,
        width: 310,
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
    filterIconContainer: {
        width: 40,
        height: 40,
        borderColor: '#b8b8b8',
        borderWidth: 1.5,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default memo(Search);
