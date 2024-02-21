import { FlatList, StyleSheet, Text, View,SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import ListItem from './components/ListItem';
import { getMarketData } from './services/cryptoService';

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.titleWrapper}>
    <Text style={styles.largeTitle}>CryptAura-Watcher</Text>
    </View>
    <View  style={styles.divider}/>
    
    <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <ListItem
          name={item.name}
          symbol={item.symbol}
          currentPrice={item.current_price}
          priceChangePercentage14d={item.price_change_percentage_14d_in_currency} 
          logoUrl={item.image}
        />

        )}
      />
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  largeTitle:{
    fontSize:24,
    fontWeight:"bold"
  },
  titleWrapper:{
    marginTop:64,
    paddingHorizontal:16
  },
  divider:{
    height:StyleSheet.hairlineWidth,
    backgroundColor:"#A9ABB1",
    marginHorizontal:16,
    marginTop:16,
  }
});
