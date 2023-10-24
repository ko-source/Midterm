import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useLocalData from './useLocalData'; 

export default function HomeScreen() {
  const dataFromHook = useLocalData();
  
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataFromHook) {
      setData(dataFromHook);
     // const storedData = await AsyncStorage.getItem('apiData');
    
      //   if (storedData) {
      //     setData(JSON.parse(storedData));
      //   } else {
      //     try {
      //       const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      //       const json = await response.json();
           
      //      const currencyData = Object.values(json.bpi);
      //       console.log(currencyData);
      //           await AsyncStorage.setItem('apiData', JSON.stringify(currencyData));
      //       setData(currencyData);
      //     } catch (error) {
      //       console.error('Error fetching data:', error);
      //     }
      //   }
      // };
    }
  }, [dataFromHook]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.currencyCode}>{item.code}</Text>
            <Text style={styles.currencyRate}>{item.rate}</Text>
            <Text style={styles.currencyDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  currencyCode: {
    fontWeight: 'bold',
  },
  currencyRate: {
    color: 'green',
  },
  currencyDescription: {
    fontStyle: 'italic',
  },
});
