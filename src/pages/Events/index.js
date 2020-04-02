import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

const Events = () => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate('Details');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>0 casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Wellcome!</Text>
      <Text style={styles.description}>Pick a case and be a Helpr today</Text>
      <FlatList
        style={styles.eventList}
        data={[1, 2, 3]}
        keyExtractor={event => String(event)}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.event}>
            <Text style={styles.eventProperty}>NGO:</Text>
            <Text style={styles.eventValue}>New NGO</Text>
            <Text style={styles.eventProperty}>CASE:</Text>
            <Text style={styles.eventValue}>Help is need</Text>
            <Text style={styles.eventProperty}>VALUE:</Text>
            <Text style={styles.eventValue}>$CAD 100.00</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={navigateToDetails}
            >
              <Text style={styles.detailsButtonText}>more details</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Events;
