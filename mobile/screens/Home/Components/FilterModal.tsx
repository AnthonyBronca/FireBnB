import React, {useState} from 'react';
import { View, Modal, Pressable, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faXmark, faMinus } from '@fortawesome/free-solid-svg-icons';
import { fonts } from '../../../constants/stylings/styles';

interface IFilterModalProps {
    isVisible:boolean;
    setIsVisible:(isVisible: boolean) => void;
};

interface IPriceElement {
    minPrice: number;
    maxPrice: number;
    focused: 'min'| 'max'| null;
};

const FilterModal:React.FC<IFilterModalProps> = ({ isVisible, setIsVisible }) => {
    const [focusedPriceElement, setFocusedPriceElement] = useState<IPriceElement>({
        minPrice: 10,
        maxPrice: 220,
        focused: null
    });

    const handlePriceValChanges = (name: 'minPrice' | 'maxPrice', value:number) => {
        setFocusedPriceElement(prev => ({
            ...prev,
            [name]: isNaN(value) ? 0 : value
        }));
    };

    const handlePriceElementFocus = (focusedElement: 'min' | 'max' | null) => {
        setFocusedPriceElement(prev => ({
            ...prev,
            focused: focusedElement
        }))
    };


  return (
    <View>
        <Modal
            animationType='slide'
            transparent={false}
            visible={isVisible}
            presentationStyle='pageSheet'
        >
        <View style={styles.filterModalHeader}>
            <Pressable style={styles.closeModal} onPress={() => setIsVisible(false)}>
                <FontAwesomeIcon icon={faXmark} color='#212121'/>
            </Pressable>
            <Text style={styles.filterModalHeaderText}>Filters</Text>
        </View>
        <View style={styles.filterSectionView}>
            <Text style={styles.fitlerSectionText}> Host name</Text>
            <Text style={styles.filterSectionSubText}> Search for a place by host name</Text>
            <View>
                <TouchableOpacity 
                    style={styles.searchByHost}
                    activeOpacity={0.8}>
                    <FontAwesomeIcon icon={faSearch} size={15}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.filterSectionView}>
            <Text style={styles.fitlerSectionText}> Price range</Text>
            <Text style={styles.filterSectionSubText}> Nightly prices before fees and taxes</Text>
            <View style={styles.priceInputView}>
                <View>
                    <Text style={styles.priceElementText}>Minimum</Text>
                    <Text style={styles.priceElementCurrSign}>$</Text>
                    <TextInput
                        style={focusedPriceElement.focused === 'min' ? styles.priceInputBoxFocused : styles.priceInputBox}
                        keyboardType='numeric'
                        value={focusedPriceElement.minPrice.toString()}
                        onChangeText={(value: string) => handlePriceValChanges('minPrice', parseInt(value))}
                        onFocus={() => handlePriceElementFocus('min')}
                    />
                </View>
             
                <FontAwesomeIcon icon={faMinus}/>
                <View>
                    <Text style={styles.priceElementText}>Maximum</Text>
                    <Text style={styles.priceElementCurrSign}>$</Text>
                    <TextInput
                        style={focusedPriceElement.focused === 'max' ? styles.priceInputBoxFocused : styles.priceInputBox}
                        keyboardType='numeric'
                        value={focusedPriceElement.maxPrice.toString()}
                        onChangeText={(value: string) => handlePriceValChanges('maxPrice', parseInt(value))}
                        onFocus={() => handlePriceElementFocus('max')}
                    />
                </View>
      
            </View>
        </View>
        </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
    filterModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderBottomColor: '#d7d7d7',
        borderBottomWidth: 1
    },
    closeModal: {
        width: 25,
        height: 25,
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 10,
        marginLeft: 20,
        backgroundColor: '#FFFFFF',
    },
    filterSectionView: {
        marginHorizontal: 15,
        marginVertical: 15,
        borderBottomColor: '#d7d7d7',
        borderBottomWidth: 1
    },
    filterModalHeaderText: {
        ...fonts.subHeader        
    },
    fitlerSectionText: {
        ...fonts.subHeader
    },
    filterSectionSubText: {
        ...fonts.detailText
    },
    searchByHost: {
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
    priceInputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    priceInputBox: {
        borderColor: '#b4b4b4',
        borderWidth: 1,
        borderRadius: 5,
        height: 45,
        width: 130,
        paddingHorizontal: 25,
        paddingTop: 12
    },
    priceInputBoxFocused: {
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 5,
        height: 45,
        width: 130,
        paddingHorizontal: 25,
        paddingTop: 12
    },
    priceElementText: {
        ...fonts.subText,
        position: 'absolute',
        top: 0,
        left: 0,
        marginVertical: 5,
        marginHorizontal: 15
    },
    priceElementCurrSign: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginVertical: 20,
        marginHorizontal: 15
    },
})



export default FilterModal;
