import React, {useState} from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { fonts } from '../../../constants/stylings/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface ISearchModalProps {
    isVisible: boolean
};

const SearchModal:React.FC<ISearchModalProps> = ({ isVisible }) => {
    const [focusedImage, setFocusedImage] = useState<number | null>(null);

    const whereToImagesData = [
        { image: require('../../../assets/images/flexible.jpg'), alt:"I'm flexible", text:"I'm flexible" },
        { image: require('../../../assets/images/europe.jpg'), alt:"Europe", text:"Europe"},
        { image: require('../../../assets/images/mexico.jpg'), alt:"Mexico", text:"Mexico"},
        { image: require('../../../assets/images/caribbean.jpg'), alt:"Caribbean", text:"Caribbean"},
        { image: require('../../../assets/images/italy.jpg'), alt:"Italy", text:"Italy"},
        { image: require('../../../assets/images/south-america.jpg'), alt:"South America", text:"South America"},
        { image: require('../../../assets/images/canada.jpg'), alt:"Canada", text:"Canada"},
        { image: require('../../../assets/images/central-america.jpg'), alt:"Central America", text:"Central America"},
        { image: require('../../../assets/images/colombia.jpg'), alt:"Colombia", text:"Colombia"},
    ];

    const toggleWhereToImgPress = (id:number) => {
       setFocusedImage(id)
    };


  return (
    <View>
      <Modal
        animationType='fade'
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
                {whereToImagesData.map((image, idx)=> (
                    <TouchableOpacity 
                        key={`whereToImage-${idx}`} 
                        activeOpacity={0.8}
                        onPress={() => toggleWhereToImgPress(idx)}
                    >
                        <Image
                            source={image.image}
                            alt={image.alt}
                            style={focusedImage !== idx ? styles.whereToImage : styles.whereToImageFocused}
                        />
                        <Text style={styles.whereToImageText}>{image.text}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
        <View style={styles.whenAndWhoBox}>
            <Text style={styles.whenAndWhoBoxTextLeft}>When</Text>
            <Text style={styles.whenAndWhoBoxTextRight}>Any week</Text>
        </View>
        <View style={styles.whenAndWhoBox}>
            <Text style={styles.whenAndWhoBoxTextLeft}>Who</Text>
            <Text style={styles.whenAndWhoBoxTextRight}>Add guests</Text>
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
        marginTop: 100,
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
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10
    },
    whereToImageFocused: {
        width: 100,
        height: 100,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10
    },
    whereToImageText: {
        ...fonts.detailText,
        color: '#5f5f5f',
        width: 100,
        textAlign: 'center'
    },
    whenAndWhoBox: {
        marginTop: 15,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 35,
        paddingVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    whenAndWhoBoxTextLeft: {
        ...fonts.defaultText,
        color: '#5f5f5f',
    },
    whenAndWhoBoxTextRight: {
        ...fonts.defaultText,
    }
})

export default SearchModal;