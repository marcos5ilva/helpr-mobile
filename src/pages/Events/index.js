import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingViewBase
} from 'react-native';
import api from '../../service/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

const Events = () => {
  const navigation = useNavigation();

  const navigateToDetails = event => {
    console.log('navigateToDetail ', event);
    navigation.navigate('Details', { event });
  };

  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    if (loading) {
      return;
    }

    if (total > 0 && events.length === total) {
      return;
    }

    setLoading(true);
    const resp = await api.get('events', {
      params: { page }
    });

    setEvents([...events, ...resp.data]);
    setTotal(resp.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>0 cases</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Wellcome!</Text>
      <Text style={styles.description}>Pick a case and be a Helpr today</Text>
      <FlatList
        style={styles.eventList}
        data={events}
        keyExtractor={event => String(event.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadEvents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: event }) => (
          <View style={styles.event}>
            <Text style={styles.eventProperty}>NGO:</Text>
            <Text style={styles.eventValue}>{event.name}</Text>
            <Text style={styles.eventProperty}>CASE:</Text>
            <Text style={styles.eventValue}>{event.title}</Text>
            <Text style={styles.eventProperty}>VALUE:</Text>
            <Text style={styles.eventValue}>$CAD {event.value}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetails(event)}
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
