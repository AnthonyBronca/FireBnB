import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



const Search:React.FC = () => {
    // const [searchInput, setSearchInput] = useState("")

    // const handleInputChange = (input: string) => {
    //     setSearchInput(input);
    // };

  return (
    <SafeAreaView >
        <View style={styles.searchBarContainer}>
            <TouchableOpacity style={styles.searchBar}>
                <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} size={20}/>
                <Text style={styles.placeholderHeading}>Where To?</Text>
                <Text style={styles.placeholderSubheading}>Anywhere · Any week · Add guests</Text>
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
    searchBarContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar: {
        backgroundColor: 'white',
        height: 50,
        width: 350,
        borderColor: '#e4e4e4',
        borderWidth: 0.4,
        shadowColor: '#e4e4e4',
        borderRadius: 30,
        justifyContent:'center'
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
    }
})

export default Search;
