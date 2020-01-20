'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroARTrackingTargets,
  ViroDirectionalLight,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    this.createTargets();

    /*
 * Register the various animations we require
 */
    ViroAnimations.registerAnimations({
      fadeOut:{properties:{opacity:0}, duration:2000},
      fadeIn:{properties:{opacity: 1}, duration:1000},
      scaleAndRotate:{properties:{rotateY: "+=90", positionZ: "-3"}, duration:1000},
    });

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  createTargets() {
    ViroARTrackingTargets.createTargets({
      "targetOne" : {
        source : require('./res/bender.jpg'),
        orientation : "Up",
        physicalWidth : 0.1 // real world width in meters
      },
    });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroDirectionalLight color="#aaaaaa" direction={[0, 0, -1.0]} />
        <ViroARImageMarker target={"targetOne"} >
        <ViroFlexView style={styles.titleContainer} position={[.1, .1, -.5]} rotation={[-90, 0, 0]} height={1} width={2}
          animation={{ name : 'fadeIn', run : true, loop : false }} >
          <ViroText style={styles.helloWorldTextStyle} text="Bender Conference Room" width={2} height={.5} />
        </ViroFlexView>
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {

  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#fff",
    padding: .2,
  },
});

module.exports = HelloWorldSceneAR;
