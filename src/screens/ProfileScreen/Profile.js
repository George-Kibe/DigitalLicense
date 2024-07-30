import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {signOut} from 'aws-amplify/auth';
import NavBarGeneral from '../../components/NavBarGeneral';
import ProfileLinks from './ProfileLinks';
import BasicImage from '../../assets/photos/basic.png';
import StandardImage from '../../assets/photos/standard.png';
import PremiumImage from '../../assets/photos/premium.png';
import PremiumMembership from './PremiumMembership';
import StandardMemberShip from './StandardMembership';
import BasicMemberShip from './BasicMembership';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {authSlice} from '../../store/AuthSlice';
import BasicUserMemberShip from './BasicUserMembership';
import PremiumUserMembership from './PremiumUserMembership';
import StandardUserMembership from './StandardUserMembership';
import {useAuthProvider} from '../../providers/AuthProvider';

const Profile = () => {
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  const {setSession} = useAuthProvider();
  const membershipType = mongoUser?.membershipType;
  // const membershipType = '';
  const [initialMembership, setInitialMembership] = useState('');
  // const [userMembership, setUserMembership] = useState('');

  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      await signOut();
      setSession(null);
      dispatch(authSlice.actions.logOutUser());
      Toast.show({
        type: 'success',
        text1: 'User Logged Out Successfully!',
        text2: 'You can login Again',
      });
    } catch (error) {}
  };
  console.log(
    'membershipType: ',
    membershipType,
    'initialMembership: ',
    initialMembership,
  );
  return (
    <ScrollView style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: () => setInitialMembership('')}}
        leftText="CHANGE"
        rightButton={{display: true, action: logoutUser}}
        rightText="LOGOUT"
      />
      {!membershipType && !initialMembership && (
        <View style={styles.membershipView}>
          <Text style={styles.topText}>SELECT YOUR MEMBERSHIP</Text>
          <TouchableOpacity onPress={() => setInitialMembership('Premium')}>
            <Image source={PremiumImage} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInitialMembership('Standard')}>
            <Image source={StandardImage} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInitialMembership('Basic')}>
            <Image source={BasicImage} style={styles.image} />
          </TouchableOpacity>
        </View>
      )}
      {membershipType && !initialMembership && membershipType !== 'Premium' && (
        <View style={styles.membershipView}>
          <Text style={styles.topText}>UPGRADE YOUR MEMBERSHIP TO</Text>
          <TouchableOpacity onPress={() => setInitialMembership('Premium')}>
            <Image source={PremiumImage} style={styles.image} />
          </TouchableOpacity>
        </View>
      )}
      {initialMembership === 'Premium' && <PremiumMembership />}
      {initialMembership === 'Standard' && <StandardMemberShip />}
      {initialMembership === 'Basic' && <BasicMemberShip />}

      {membershipType === 'Premium' && <PremiumUserMembership />}
      {membershipType === 'Standard' && <StandardUserMembership />}
      {membershipType === 'Basic' && <BasicUserMemberShip />}

      <ProfileLinks />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
    flex: 1,
    paddingBottom: 10,
  },
  topText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  membershipView: {
    flex: 1,
  },
  image: {
    width: '80%',
    marginBottom: 10,
    height: 80,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
