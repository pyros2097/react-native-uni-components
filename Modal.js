import React from 'react';
import { Platform, View, Text, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Modal = Platform.OS === 'web' ? require('modal-enhanced-react-native-web').default : require('react-native-modal').default;

export const BasicModal = ({ title, isVisible, onClose, children }) => {
  if (React.Children.count(children) !== 1) {
    throw new Error('You can pass only 1 child to Modal');
  }
  return (
    <Modal isVisible={isVisible} style={{ marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, padding: 20 }} onBackdropPress={onClose}>
      <KeyboardAwareScrollView extraHeight={200} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
          <View
            style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, paddingBottom: 10, borderBottomColor: '#b8d6e8', borderBottomWidth: 1 }}
          >
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontSize: 20, color: 'rgb(12, 82, 125)' }}>{title}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <TouchableWithoutFeedback onPress={onClose}>
                <Text>X</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, { onClose });
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default Modal;
