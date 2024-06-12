/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NavBarGeneral from '../../components/NavBarGeneral';
import {ScrollView} from 'react-native-gesture-handler';

const TermsOfUse = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NavBarGeneral
        leftButton={{display: true}}
        leftText="BACK"
        rightButton={{display: true, action: goBack}}
        rightText="DONE"
      />
      <View style={styles.termsView}>
        <Text style={styles.title}>
          MOBILE APPLICATION TERMS AND CONDITIONS
        </Text>
        <Text style={[styles.normalText, {marginVertical: 20}]}>
          Effective date : 1st January 2024
        </Text>
        <Text style={styles.normalText}>
          These terms and conditions (hereinafter "terms") govern your use of
          our application, "iLinkup" which is hereinafter referred to as "the
          Product" and is available at: Google Play and Apple Store.
        </Text>
        <Text style={styles.normalText}>
          The Product is owned and operated by: My IceBreaker Pty Limited.
        </Text>
        <Text style={styles.normalText}>
          These Terms and Conditions constitute a legally binding contract
          between you and the My IceBreaker Pty Limited.
        </Text>
        <Text style={styles.normalText}>
          In connection with your use of the Product, we may also provide you
          with access to various other content, documentation, materials,
          information, goods and services. In these Terms, we refer to all of
          these items collectively as 'the items'.
        </Text>
        <Text style={styles.normalText}>
          These terms wll govern Your use of all pages of the product, as well
          as your use of the items
        </Text>
        <Text style={styles.normalText}>
          If you continue to use the product, you acknowledge that you have been
          given the chanceto review the Terms. You acknowledge that You
          understand the terms and that you agree to be bound by the terms.
        </Text>
        <Text style={styles.normalText}>
          If You dont understand the terms, if you do not agree to be bound by
          the terms or if you need more time to review tand consider the terms
          then please do not agree.
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
  },
  termsView: {
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  normalText: {
    color: 'white',
    textAlign: 'left',
    lineHeight: 26,
    letterSpacing: 0.5,
  },
});
