import React from 'react';
import { View, Modal, Pressable, Text, StyleSheet } from 'react-native';

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
                <Text style={{fontWeight: "600"}}>x</Text>
            </Pressable>
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
        borderColor: '#b9b9b9',
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
})



export default FilterModal;
