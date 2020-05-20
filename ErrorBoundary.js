import React from 'react';
import { Platform, View, Text, Button } from 'react-native';
import Sentry from './sentry';

export default class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({
        eventId,
      });
    });
  }

  render() {
    const { children, navigation, reloadRouteName } = this.props;
    const { eventId } = this.state;
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#004E7A', textAlign: 'center' }}>Oops something went wrong on our side.</Text>
          <Text style={{ fontSize: 18, fontWeight: '400', color: '#004E7A', textAlign: 'center', marginTop: 20 }}>
            You can help us by reporting the problem and we will get back to you soon.
          </Text>
          {Platform.OS === 'web' && (
            <View style={{ marginTop: 60 }}>
              <Button title="Report Problem" onPress={() => Sentry.showReportDialog({ eventId: eventId })} />
            </View>
          )}
          <View style={{ marginTop: 60 }}>
            <Button
              title="Go Back"
              onPress={() => {
                navigation.replace(reloadRouteName, { reload: true });
              }}
            />
          </View>
        </View>
      );
    }
    return children;
  }
}
