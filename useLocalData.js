import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocalData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem('apiData');

      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        try {
          const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
          const json = await response.json();
          const currencyData = Object.values(json.bpi);
          await AsyncStorage.setItem('apiData', JSON.stringify(currencyData));
          setData(currencyData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  return data; // This will return the data once it's loaded
};

export default useLocalData;
