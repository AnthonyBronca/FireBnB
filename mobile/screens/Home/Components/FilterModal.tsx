import React from 'react';
import { View, Modal, Text } from 'react-native';

interface IFilterModalProps {
    isVisible:boolean,
    setIsVisible:(isVisible: boolean) => void;
};

const FilterModal:React.FC<IFilterModalProps> = ({ isVisible, setIsVisible }) => {
  return (
    <View>
        <Modal
            animationType='fade'
            transparent={false}
            visible={isVisible}
            presentationStyle='overFullScreen'
        >

        </Modal>
    </View>
  );
}

export default FilterModal;
