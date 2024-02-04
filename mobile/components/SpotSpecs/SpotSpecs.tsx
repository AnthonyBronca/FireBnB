import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';

interface ISpotSpecProps {
    count: number,
    info: string,
    style: TextStyle
}

const SpotSpecs:React.FC<ISpotSpecProps> = ({count, info, style}) => {
  return (
    <View style={styles.container}>
      <Text style={[style,styles.text]}>{count}</Text>
      <Text style={[style, styles.text]}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        paddingRight: 5
    }
})

export default SpotSpecs;
