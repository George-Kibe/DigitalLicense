import {ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import NavBarGeneral from '../../components/NavBarGeneral';
import SingleMatchItem from './SingleMatchItem';
import SendingIceBreakerModal from './SendingIcebreakerModal';

const YourIceBreakers = () => {
  const [viewing, setViewing] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: () => setViewing('Pending')}}
        leftText="PENDING"
        title={'Your IceBreakers'}
        rightButton={{display: true, action: () => setViewing('Matches')}}
        rightText={'MATCHES'}
      />
      <SendingIceBreakerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <SingleMatchItem setModalVisible={setModalVisible} />
      <SingleMatchItem match={true} setModalVisible={setModalVisible} />
      <SingleMatchItem setModalVisible={setModalVisible} />
      <SingleMatchItem match={true} setModalVisible={setModalVisible} />
      <SingleMatchItem setModalVisible={setModalVisible} />
      <SingleMatchItem setModalVisible={setModalVisible} />
    </ScrollView>
  );
};

export default YourIceBreakers;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
    flex: 1,
  },
  text: {
    color: 'white',
  },
});
