import React, { useState} from 'react';
import { View, Modal, Pressable, Text, TextInput, Image, StyleSheet } from 'react-native';
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

    const handlePriceBoxValuesChange = (name: 'MIN' | 'MAX', value: number) => {
        setPrice(prev => {
            const noLeadingZeros = value.toString().replace(/^0+/, '')
            const newValue = noLeadingZeros === '' ? '0' : noLeadingZeros;
            const updatedPrices = {
                ...prev,
                [name]: isNaN(parseInt(newValue)) ? (name === 'MIN' ? 0 : 5) : parseInt(newValue),
            };

            const currValue = prev[name].toString()
            if (currValue === '0' && value === 0) {
                return prev
            };
            if (isNaN(updatedPrices.MIN) && isNaN(updatedPrices.MAX)) {
                return initialPriceElementVals;
            };
            if (updatedPrices.MIN === updatedPrices.MAX) {
                return prev;
            };
            if (price.focused === 'min' && (updatedPrices.MIN > updatedPrices.MAX)) {
                updatedPrices.MAX = updatedPrices.MIN + 5;
            };
            if (price.focused === 'max' && (updatedPrices.MIN > updatedPrices.MAX)) {
                updatedPrices.MIN = (updatedPrices.MAX - 5 < 0) ? 0 : updatedPrices.MAX - 5;
            };
            return updatedPrices;
        });
    };

  
    return (
        <View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={isVisible}
                presentationStyle='pageSheet'
            >
            <View style={styles.filterHeader}>
                <Pressable style={styles.closeModal} onPress={() => setIsVisible(false)}>
                    <FontAwesomeIcon icon={faXmark} color='#212121'/>
                </Pressable>
                <Text style={styles.filterMainText}>Filters</Text>
            </View>
            <View style={styles.filterSectionView}>
                <Text style={styles.filterMainText}>Host name</Text>
                <Text style={styles.filterSubText}>Search for a place by host name</Text>
                <View>
                    <Pressable style={styles.searchByHost}>
                        <FontAwesomeIcon icon={faSearch} size={15}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.filterSectionView}>
                <Text style={styles.filterMainText}>Price range</Text>
                <Text style={styles.filterSubText}>Nightly prices before fees and taxes</Text>
                <View style={styles.priceRangeSection}>
                    <View>
                        <View style={{marginBottom: 132}}>
                            <Image 
                            source={require('../../../assets/images/filter-price.jpeg')} 
                            resizeMode='center'
                            style={{width: 300, position:'absolute'}}
                            />
                        </View>
                        <MultiSlider
                            values={[price.MIN, price.MAX]}
                            min={price.MIN}
                            max={price.MAX} 
                            onValuesChange={handleSliderValuesChange}
                            allowOverlap={false}
                            enableLabel={false}
                            sliderLength={330}
                            selectedStyle={{backgroundColor:'#000000'}}
                        />
                    </View>
                    <View style={styles.priceInputs}>
                        <View>
                            <Text style={styles.priceInputBoxText}>Minimum</Text>
                            <Text style={styles.priceInputBoxCurrSign}>$</Text>
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
                            <Text style={styles.priceInputBoxText}>Maximum</Text>
                            <Text style={styles.priceInputBoxCurrSign}>$</Text>
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
    filterHeader: {
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
        marginHorizontal: 20,
        marginVertical: 15,
        borderBottomColor: '#d7d7d7',
        borderBottomWidth: 1,
        alignItems:'flex-start'
    },
    filterMainText: {
        ...fonts.subHeader        
    },
    filterSubText: {
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
    priceRangeSection: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10
    },
    priceInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40
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
    priceInputBoxText: {
        ...fonts.subText,
        position: 'absolute',
        top: 0,
        left: 0,
        marginVertical: 5,
        marginHorizontal: 15
    },
    priceInputBoxCurrSign: {
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
        marginTop: 210,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
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
});

export default FilterModal;