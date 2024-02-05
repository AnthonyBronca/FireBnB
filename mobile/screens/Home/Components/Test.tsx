import { useState, useEffect } from 'react';
import { View, Text, Image, Alert, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadFilesToS3 } from '../../../awsS3';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
uuidv4()


const Test = () => {
  const [images, setImages] = useState<string[]>([]);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (indexToRemove:number) => {
    const updatedImages = [...images];
    updatedImages.splice(indexToRemove, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    if (images.length === 6) {
      Alert.alert(
        'Alert',
        'You have reached the max upload limit!',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false }
      );
    }
  }, [images]);

  console.log(uploadFilesToS3([
    {
      Key: "demofile5.txt",
      Body: "Content of file 5",
      ACL: "public-read",
    }
  ]))

 
  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.button} 
        onPress={pickImage}
        disabled={images.length === 6}
      >
        <Text style={{color:"#FFFFFF"}}>Choose a photo</Text>
      </Pressable>
      <View style={styles.imageContainer}>
        {images.map((imageUri, index) => (
          <View key={`image-container-${index}`}>
          <Pressable 
            onPress={() => removeImage(index)}
            style={styles.removeImage}
          >
            <Text>x</Text>
          </Pressable>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.image} 
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems:'center'
  },
  button: {
    backgroundColor: '#FF5A5F',
    borderRadius: 20,
    height: 30,
    width: 150,
    justifyContent: 'center',
    alignItems:'center'
  },
  imageContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    padding: 10,
    width: 400,
    height: 250,
  },
  image: {
    height: 100,
    width: 100
  },
  removeImage: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#DEDEDE',
    opacity: 0.8,
    borderRadius: 30,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  }
})

export default Test;
