import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { fonts } from '../../../constants/stylings/styles';
import SearchModal from './SearchModal';
import FilterModal from './FilterModal';


const Search:React.FC = () => {
    const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false)
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false)

    return (
            <View style={styles.searchBarComponentContainer}>
                <View>
                    <TouchableOpacity
                        style={styles.searchBar}
                        activeOpacity={0.8}
                        onPress={() => setSearchModalVisible(!searchModalVisible)}
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
                        onPress={() => setFilterModalVisible(!filterModalVisible)}
                    >
                        <FontAwesomeIcon icon={faFilter} size={20}/>
                    </TouchableOpacity>
                </View>
                <SearchModal isVisible={searchModalVisible} setIsVisible={setSearchModalVisible}/>
                <FilterModal isVisible={filterModalVisible} setIsVisible={setFilterModalVisible}/>
            </View>
    );
}

const styles = StyleSheet.create({
    searchBarComponentContainer: {
        height: 100,
        justifyContent: 'center',
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
        marginHorizontal: 5
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
        marginHorizontal: 5
    },
})

export default memo(Search);
