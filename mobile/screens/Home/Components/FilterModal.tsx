import React, { useState} from 'react';
import { View, Modal, Pressable, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faXmark, faMinus } from '@fortawesome/free-solid-svg-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { fonts } from '../../../constants/stylings/styles';


interface IFilterModalProps {
    isVisible:boolean;
    setIsVisible:(isVisible: boolean) => void;
};

interface IPriceElement {
    MIN: number;
    MAX: number;
    focused: 'min'| 'max'| null;
};

const initialPriceElementVals = {
    MIN: 10,
    MAX: 310,
    focused: null
};

const FilterModal:React.FC<IFilterModalProps> = ({ isVisible, setIsVisible }) => {
    const [price, setPrice] = useState<IPriceElement>(initialPriceElementVals);
  
    // const handlePriceBoxValuesChange = (name: 'minPrice' | 'maxPrice', value:number) => {
    //     setPrice(prev => ({
    //         ...prev,
    //         [name]: isNaN(value) ? 0 : value
    //     }));
    // };
    const handlePriceBoxValuesChange = (name: 'MIN' | 'MAX', value:number) => {
        setPrice(prev => ({
            ...prev,
            [name]:value
        }))
    }

    const handleSliderValuesChange = (values:number[]) => {
        const [minValue, maxValue] = values;
        setPrice({ MIN: minValue, MAX: maxValue, focused:null });
    };

    const handlePriceElementFocus = (focusedElement: 'min' | 'max' | null) => {
        setPrice(prev => ({
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
                    <MultiSlider
                        values={[price.MIN, price.MAX]}
                        min={price.MIN}
                        max={price.MAX} 
                        onValuesChange={handleSliderValuesChange}
                        enableLabel={false}
                        sliderLength={330}
                        selectedStyle={{backgroundColor:'#000000'}}
                    />
                </View>
                <View style={styles.priceBoxesView}>
                    <View>
                        <Text style={styles.priceElementText}>Minimum</Text>
                        <Text style={styles.priceElementCurrSign}>$</Text>
                        <TextInput
                            style={price.focused === 'min' ? styles.priceInputBoxFocused : styles.priceInputBox}
                            inputMode='numeric'
                            value={price.MIN.toString()}
                            onChangeText={(value: string) => handlePriceBoxValuesChange('MIN', parseInt(value))}
                            onFocus={() => handlePriceElementFocus('min')}
                        />
                    </View>
                    <FontAwesomeIcon icon={faMinus}/>
                    <View>
                        <Text style={styles.priceElementText}>Maximum</Text>
                        <Text style={styles.priceElementCurrSign}>$</Text>
                        <TextInput
                            style={price.focused === 'max' ? styles.priceInputBoxFocused : styles.priceInputBox}
                            inputMode='numeric'
                            value={price.MAX.toString()}
                            onChangeText={(value: string) => handlePriceBoxValuesChange('MAX', parseInt(value))}
                            onFocus={() => handlePriceElementFocus('max')}
                        />
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.modalFooter}>
            <Pressable>
                <Text 
                    style={styles.searchFooterClearText} 
                    onPress={() => setPrice(initialPriceElementVals)}>
                    Clear all
                </Text>
            </Pressable>
            <Pressable style={styles.searchFooterButton} onPress={() => setIsVisible(false)}>
                <Text style={styles.searchFooterButtonText}>Show places</Text>
            </Pressable>
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
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
    },
    priceBoxesView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 45
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
    modalFooter: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        marginTop: 340,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    searchFooterClearText: {
        ...fonts.subHeader,
        textDecorationLine: 'underline'
    },
    searchFooterButton: {
        backgroundColor: "#000000",
        width: 100,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        borderRadius: 5
    },
    searchFooterButtonText: {
        ...fonts.subHeader,
        color: "#FFFFFF",
    }
})

export default FilterModal;