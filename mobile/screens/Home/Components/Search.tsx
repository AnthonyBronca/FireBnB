import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';


const Search:React.FC = () => {
    // const [searchInput, setSearchInput] = useState("")

    // const handleInputChange = (input: string) => {
    //     setSearchInput(input);
    // };

  return (
    <SafeAreaView >
        <View style={styles.searchBarComponentContainer}>
            <TouchableOpacity style={styles.searchBar}>
                <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} size={20}/>
                <Text style={styles.placeholderHeading}>Where To?</Text>
                <Text style={styles.placeholderSubheading}>Anywhere · Any week · Add guests</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterIconContainer}>
                <FontAwesomeIcon icon={faFilter} size={20}/>
            </TouchableOpacity>
   
         


      {/* <SearchBar
        platform='ios'
        placeholder='Where to?'
        value={searchInput} 
        onBlur={undefined} 
        onChangeText={handleInputChange} 
        onFocus={undefined} 
        clearIcon={false}
        searchIcon={{ name: 'search' }} 
        loadingProps={undefined} 
        showLoading={false} 
        onClear={undefined} 
        onCancel={undefined} 
        lightTheme={false} 
        round={true} 
        cancelButtonTitle={''} 
        cancelButtonProps={undefined} 
        showCancel={false}
        // style={{backgroundColor:'red'}}     
        />
        */}
        </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    searchBarComponentContainer: {
        height: 100,
        justifyContent: 'center',
        borderBottomColor: '#e2e2e2',
        shadowColor: '#cecece',
        borderBottomWidth: 1
        // alignItems: 'center'
    },
    searchBar: {
        backgroundColor: 'white',
        height: 50,
        width: 320,
        borderColor: '#e4e4e4',
        borderWidth: 0.4,
        shadowColor: '#e4e4e4',
        borderRadius: 30,
        justifyContent:'center',
        marginLeft: 25
    },
    placeholderHeading: {
        marginLeft: 60,
        fontWeight: '500',
        fontSize: 14,
        fontFamily: 'System'
    },
    placeholderSubheading: {
        marginLeft: 60,
        color: '#717171',
        fontSize: 12,
        fontFamily: 'System'
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
        position: 'absolute',
        left: 360,
        bottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Search;
