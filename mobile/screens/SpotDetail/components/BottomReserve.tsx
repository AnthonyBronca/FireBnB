import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../../constants/stylings/styles';


interface IBottomReserve {
    price: number,
    dateRange: string
}

const BottomReserve: React.FC<IBottomReserve> = ({price, dateRange}) => {
  return (
    <View style={styles.container}>
        <View style={styles.mainContainer}>
        <View>
          <View style={styles.price}>
            <Text style={styles.subHeader}>{`$${price}`}</Text>
            <Text style={[styles.subText, { paddingLeft: 3, top: 2 }]}>night</Text>
          </View>
          <Text style={styles.date}>{dateRange}</Text>
        </View>
        <View style={styles.reserveButton}>
            <Text style={styles.reserveText}>Reserve</Text>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    subText: fonts.subText,
    subHeader: fonts.subHeader,
    price: {
        flexDirection: 'row',
    },
    container: {
        flexDirection: 'row',
        borderColor: '#d2d2d2',
        borderTopWidth: 1,
        borderStyle: 'solid',
        height: 100,
        alignContent: 'flex-end'
    },
    date: {
        fontFamily: 'System',
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginTop: 10
    },
    reserveButton: {
        backgroundColor: colors.RESERVERED,
        width: 130,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    reserveText: {
        fontFamily: 'System',
        color: colors.WHITE,
        fontSize: 14
    }
})


export default memo(BottomReserve);
