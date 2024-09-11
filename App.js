import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Đây là data mẫu do em không có thẻ visa dể lấy gg map api
const mockData = [
  { id: '1', title: 'Hà Nội' },
  { id: '2', title: 'Bắc Ninh' },
  { id: '3', title: 'Bắc Giang' },
  { id: '4', title: 'Quảng Ninh' },
  { id: '5', title: 'Huế' },
  { id: '6', title: 'Đà Nẵng' },
  { id: '7', title: 'Hồ Chí Minh' },
  { id: '8', title: 'Hạ Long' },
  { id: '9', title: 'Nha Trang' },
  { id: '10', title: 'Cần Thơ' },
];

const highlightText = (text, keyword) => {
  if (!keyword.trim()) return <Text>{text}</Text>;

  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <Text key={index} style={{ backgroundColor: 'yellow' }}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        )
      )}
    </>
  );
};

const SearchBar = ({ query, setQuery }) => {
  return (
    <View style={styles.searchBar}>
      <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Nhập địa chỉ..."
      />
    </View>
  );
};

// Thành phần hiển thị kết quả tìm kiếm
const SearchResults = ({ results, keyword }) => {
  const openGoogleMaps = (address) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.resultsContainer}>
      {results.map((result) => (
        <TouchableOpacity
          key={result.id}
          onPress={() => openGoogleMaps(result.title)}
          style={styles.resultContainer}
        >
          <Text style={styles.result}>{highlightText(result.title, keyword)}</Text>
          <Icon name="arrow-right" size={20} color="#007BFF" style={styles.arrowIcon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchAddresses = (searchQuery) => {
    if (searchQuery.length > 0) {
      const filteredResults = mockData.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleQueryChange = (text) => {
    setQuery(text);
    searchAddresses(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar query={query} setQuery={handleQueryChange} />
      <SearchResults results={results} keyword={query} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  resultsContainer: {
    flex: 1,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  result: {
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default App;
