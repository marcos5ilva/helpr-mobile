import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const event = route.params.event;

  const navigateToEvents = () => {
    navigation.navigate('Events');
  };

  const message = `Olá ${event.name}, estou entrando em contato pois gostaria de ajudar no caso ${event.tile} com o valor de ${event.value}`;

  const sendMail = () => {
    MailComposer.composeAsync({
      subject: `Helpr case:  ${event.title}`,
      recipients: [event.email],
      body: message
    });
  };

  const sendWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=13855579151&text=${message}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateToEvents}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>
      <View style={styles.event}>
        <Text style={([styles.eventProperty], { marginTop: 0 })}>NGO:</Text>
        <Text style={styles.eventValue}>
          {event.name} from {event.city} / {event.state}
        </Text>
        <Text style={styles.eventProperty}>CASE: {event.title}</Text>
        <Text style={styles.eventValue}>Help is need</Text>
        <Text style={styles.eventProperty}>VALUE:</Text>
        <Text style={styles.eventValue}>$CAD {event.value}</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.helprTitle}>Save the day!</Text>
        <Text style={styles.helprTitle}>Be a helpr for this case</Text>
        <Text style={styles.helprDescription}>Contact us</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Details;
