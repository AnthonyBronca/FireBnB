import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../../constants/stylings/styles';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface IDetailParagraph {
    details: string[]
}

const DetailParagraph:React.FC<IDetailParagraph> = ({details}) => {

    const [seeMore, setSeeMore] = useState<boolean>(false);

    const handleSeeMore = () => {
        setSeeMore(!seeMore);
    }


  return (
    <View style={styles.mainContainer}>
        {seeMore ?
            <Text style={styles.defaultText}>{details[1]}</Text> :
            <Text style={styles.defaultText}>{details[0]}</Text>
        }
        <TouchableOpacity style={styles.seeMoreContainer} onPress={handleSeeMore}>
            <Text style={styles.seeMore}>{seeMore? "Show less": "Show more"}</Text>
            {seeMore?
                <FontAwesomeIcon size={10} icon={faChevronLeft} /> :
                <FontAwesomeIcon size={10} icon={faChevronRight}/>
             }
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 40,
        marginBottom: 40
    },
    defaultText: fonts.defaultText,
    seeMore: {
        textDecorationLine: 'underline',
        fontWeight: '600',
        fontFamily: 'System',
        marginRight: 5
    },
    seeMoreContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default DetailParagraph;
