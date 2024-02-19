import React from 'react';
import { View, Modal, Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IFilterModalProps {
    isVisible:boolean,
    setIsVisible:(isVisible: boolean) => void;
};

const FilterModal:React.FC<IFilterModalProps> = ({ isVisible, setIsVisible }) => {
  return (
    <View>
        <Modal
            animationType='slide'
            transparent={false}
            visible={isVisible}
            presentationStyle='pageSheet'
        >
        <View>
            <Pressable style={styles.closeModal} onPress={() => setIsVisible(false)}>
                <FontAwesomeIcon icon={faXmark} color='#212121'/>
            </Pressable>
            <Text>Filters</Text>
        </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    closeModal: {
        marginTop: 60,
        marginLeft: 15,
        width: 25,
        height: 25,
        position: 'absolute',
        elevation: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeX: {
        fontWeight: '500',
    }
})



export default FilterModal;
