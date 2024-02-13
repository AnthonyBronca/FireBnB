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
                <TouchableOpacity 
                    style={styles.searchDestination}
                    activeOpacity={0.8}>
                    <FontAwesomeIcon icon={faSearch} size={15}/>
                    <Text style={styles.searchDestinationText}>Search destinations</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                style={styles.whereToImagesContainer}>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/flexible.jpg')} alt="I'm flexible" style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>I'm flexible</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/europe.jpg')}  alt= 'Europe' style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>Europe</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/mexico.jpg')} alt='Mexico' style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>Mexico</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/caribbean.jpg')} alt='Caribbean' style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>Caribbean</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/italy.jpg')} alt='Italy' style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>Italy</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/south-america.jpg')} alt='South America' style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>South America</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/canada.jpg')} alt='Canada' style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>Canada</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/central-america.jpg')} alt='Central America' style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>Central America</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image source={require('../../../assets/images/colombia.jpg')} alt='Colombia' style={styles.whereToImage}/>
                    <Text style={styles.whereToImageText}>Colombia</Text>
                </TouchableOpacity>
            </ScrollView>
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
        paddingLeft: 20,
        marginVertical: 10
    },
    searchDestinationText: {
        ...fonts.detailText,
        color: '#5f5f5f'
    },
    whereToImagesContainer: {
    marginVertical: 10,
    },
    whereToImage: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        marginRight: 15,
    },
    whereToImageFocused: {
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10
    },
    whereToImageText: {
        ...fonts.detailText,
        color: '#5f5f5f',
    }
})

export default SearchModal;
