import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const ARTICLES = [
  {id: 1, url: require('../assets/1.jpg')},
  {id: 2, url: require('../assets/2.jpg')},
  {id: 3, url: require('../assets/3.jpg')},
  {id: 4, url: require('../assets/4.jpg')},
  {id: 5, url: require('../assets/5.jpg')},
];
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

class InShort extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY(0);
    this.swipedCardPosition = new Animated.ValueXY({x: 0, y: -SCREEN_HEIGHT});
    this.state = {
      currentIndex: 0,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // console.log('gestureState', gestureState.dy);
        if (gestureState.dy > 0 && this.state.currentIndex > 0) {
          this.swipedCardPosition.setValue({
            x: 0,
            y: -SCREEN_HEIGHT + gestureState.dy,
          });
        } else {
          this.position.setValue({y: gestureState.dy, x: 0});
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        // console.log('gestureState', gestureState.vy);
        if (gestureState.dy > 50 && gestureState.vy > 0.5) {
          Animated.timing(this.swipedCardPosition, {
            toValue: {x: 0, y: 0},
            duration: 200,
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex - 1});
            this.swipedCardPosition.setValue({x: 0, y: -SCREEN_HEIGHT});
          });
        } else if (gestureState.dy < -50 && gestureState.vy < -0.5) {
          Animated.timing(this.position, {
            toValue: {x: 0, y: -SCREEN_HEIGHT},
            duration: 200,
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1});
            this.position.setValue({x: 0, y: 0});
          });
        } else {
          Animated.parallel([
            Animated.spring(this.position, {
              toValue: {x: 0, y: 0},
            }).start(),
            Animated.spring(this.swipedCardPosition, {
              toValue: {x: 0, y: -SCREEN_HEIGHT},
            }).start(),
          ]);
        }
      },
    });
  }

  renderArticles() {
    return ARTICLES.map((article, index) => {
      if (index === this.state.currentIndex - 1) {
        return (
          <Animated.View
            key={article.id}
            style={[this.swipedCardPosition.getLayout()]}
            {...this.panResponder.panHandlers}>
            <View style={[styles.Container]}>
              <View style={styles.ImageContainer}>
                <Image source={article.url} style={styles.Image} />
              </View>
              <View style={styles.TextContainer}>
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
              </View>
            </View>
          </Animated.View>
        );
      } else if (index < this.state.currentIndex) {
        return null;
      }
      if (index === this.state.currentIndex) {
        return (
          <Animated.View
            key={article.id}
            style={[this.position.getLayout()]}
            {...this.panResponder.panHandlers}>
            <View style={[styles.Container]}>
              <View style={styles.ImageContainer}>
                <Image source={article.url} style={styles.Image} />
              </View>
              <View style={styles.TextContainer}>
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
              </View>
            </View>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View key={article.id}>
            <View style={[styles.Container]}>
              <View style={styles.ImageContainer}>
                <Image source={article.url} style={styles.Image} />
              </View>
              <View style={styles.TextContainer}>
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
              </View>
            </View>
          </Animated.View>
        );
        // </Animated.View>;
      }
    }).reverse();
  }

  render() {
    return <View style={{flex: 1}}>{this.renderArticles()}</View>;
  }
}

const styles = StyleSheet.create({
  Container: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'lightskyblue',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  ImageContainer: {
    flex: 2,
  },
  TextContainer: {
    flex: 3,
    padding: 15,
  },
  Image: {
    flex: 1,
    height: null,
    width: null,
  },
});

export default InShort;
