import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class AppleMusic extends Component {
  constructor(props) {
    super(props);

    this.animateFrontContainerPosiiton = new Animated.ValueXY({
      x: 0,
      y: SCREEN_HEIGHT - 100,
    });

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        this.animateFrontContainerPosiiton.extractOffset();
      },
      onPanResponderMove: (event, gesture) => {
        this.animateFrontContainerPosiiton.setValue({
          x: 0,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy < 0) {
          Animated.spring(this.animateFrontContainerPosiiton.y, {
            toValue: -SCREEN_HEIGHT + 100,
          }).start();
        } else if (gesture.dy > 0) {
          Animated.spring(this.animateFrontContainerPosiiton.y, {
            toValue: SCREEN_HEIGHT - 100,
          }).start();
        }
      },
    });
  }

  render() {
    const animatedTransform = {
      transform: this.animateFrontContainerPosiiton.getTranslateTransform(),
    };
    const animatedAlbumImageContainerHeight = this.animateFrontContainerPosiiton.y.interpolate(
      {
        inputRange: [0, SCREEN_HEIGHT - 100],
        outputRange: [200, 40],
        extrapolate: 'clamp',
      },
    );
    const animatedAlbumTitleAndControlesOpactice = this.animateFrontContainerPosiiton.y.interpolate(
      {
        inputRange: [0, (SCREEN_HEIGHT - 100) / 3, SCREEN_HEIGHT - 100],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
      },
    );
    const animatedImageMarginLeft = this.animateFrontContainerPosiiton.y.interpolate(
      {
        inputRange: [0, SCREEN_HEIGHT - 100],
        outputRange: [(SCREEN_WIDTH - 200) / 2, 10],
        extrapolate: 'clamp',
      },
    );
    const animatedMediaControlPanelHeight = this.animateFrontContainerPosiiton.y.interpolate(
      {
        inputRange: [0, SCREEN_HEIGHT - 100],
        outputRange: [SCREEN_HEIGHT / 2, 80],
        extrapolate: 'clamp',
      },
    );
    const animatedMediaControlPanelBorderTopWidth = this.animateFrontContainerPosiiton.y.interpolate(
      {
        inputRange: [0, SCREEN_HEIGHT - 100],
        outputRange: [0, 2],
        extrapolate: 'clamp',
      },
    );

    return (
      <Animated.View style={styles.backgroundContainer}>
        <Animated.View style={[animatedTransform, styles.frontContainer]}>
          <Animated.View
            style={[
              styles.mediaPanelContainer,
              {
                height: animatedMediaControlPanelHeight,
                borderTopWidth: animatedMediaControlPanelBorderTopWidth,
              },
            ]}
            {...this.panResponder.panHandlers}>
            <View style={styles.mediaPanelContainerStatic}>
              <Animated.View
                style={[
                  styles.albumArtContainer,
                  {
                    marginHorizontal: animatedImageMarginLeft,
                    height: animatedAlbumImageContainerHeight,
                    width: animatedAlbumImageContainerHeight,
                  },
                ]}>
                <Image
                  source={require('../assets/enrique.jpg')}
                  style={styles.albumImage}
                />
              </Animated.View>
              <Animated.Text
                style={[
                  {opacity: animatedAlbumTitleAndControlesOpactice},
                  styles.titleText,
                ]}>
                Enrique Iglesias - Bailando (English Version)
              </Animated.Text>
            </View>
            <Animated.View
              style={[
                styles.bottomMediaControlContainer,
                {opacity: animatedAlbumTitleAndControlesOpactice},
              ]}>
              <IonIcons name="md-pause" size={26} color={'#000'} />
              <IonIcons name="md-play" size={26} color={'#000'} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  frontContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  mediaPanelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#e6e6e6',
  },
  mediaPanelContainerStatic: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  albumArtContainer: {
    height: 40,
  },
  albumImage: {
    flex: 1,
    height: null,
    width: null,
  },
  titleText: {
    fontSize: 16,
    paddingRight: 10,
    flex: 1,
  },
  bottomMediaControlContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default AppleMusic;
