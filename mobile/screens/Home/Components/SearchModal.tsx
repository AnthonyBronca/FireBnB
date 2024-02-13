import React from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { fonts } from '../../../constants/stylings/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface ISearchModalProps {
    isVisible: boolean
}

const SearchModal:React.FC<ISearchModalProps> = ({ isVisible }) => {
  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        presentationStyle='overFullScreen'
      >
        <View style={styles.whereBox}>
            <Text style={styles.whereToHeading}>Where to?</Text>
            <View>
                <TouchableOpacity style={styles.searchDestination}>
                    <FontAwesomeIcon icon={faSearch} size={15}/>
                    <Text style={styles.searchDestinationText}>Search destinations</Text>
                </TouchableOpacity>
            </View>
            <ScrollView></ScrollView>
            <View></View>
            <View></View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    searchModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    whereBox: {
        marginVertical: 100,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    whereToHeading: {
        ...fonts.header,
        fontWeight: '700',
    },
    searchDestination: {
        borderColor: '#b9b9b9',
        borderWidth: 1,
        width: 300,
        height: 35,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        paddingLeft: 20
    },
    searchDestinationText: {
        ...fonts.detailText,
        color: '#5f5f5f'
    }
})

export default SearchModal;
