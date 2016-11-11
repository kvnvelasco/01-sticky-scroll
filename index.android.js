/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView
} from 'react-native';

import { View, Text, } from 'react-native-better-components'

export default class StickyScroll extends Component {
  constructor() {
    super()
    this.rows = new Array(30).fill(undefined).map( (item, index) => {
      return (
        <View key={index} flex={0} align='center' height={60}>
          <Text>{`Sample item ${index}`}</Text>
        </View>
      )
    })
    this._scrollFix = debounce(this._scrollFix.bind(this), 100)

    this.styles = {
      scroll: {
        backgroundColor:'white',
        alignItems: 'stretch',
        flexDirection: 'column',
        paddingHorizontal: 50
      },
      barContainer: {
        position: 'absolute',
        top: 40,
        bottom: 40,
        right: 40,
        left: 40,
      },
      bars: {
        borderTopWidth: 2,
        borderTopColor: '#FD7D37',
        borderBottomWidth: 2,
        borderBottomColor: '#FD7D37',
        borderStyle: 'solid',
        height: 60,
      }
    }
  }

  _scrollHandler(event) {
    this._scrollFix(event.nativeEvent.contentOffset.y)
  }

  _scrollFix(offset) {
    // find the nearest 60 divisble scroll area and scroll to it
    const fixed = (offset % 60) >= 30 ? ((offset % 60) - 60) : (offset % 60)
    this.scroll.scrollTo({y: offset - fixed}, true)
  }
  render() {
    return (
      <View height={180} flex={0} align='stretch' padding={[20,20,20,20]}>
        <ScrollView
          contentContainerStyle={this.styles.scroll}
          onScroll={this._scrollHandler.bind(this)}
          ref={(scroll) => this.scroll = scroll}>
          {this.rows}
        </ScrollView>
        <View pointerEvents="none" align='stretch' justify='center' 
          style={this.styles.barContainer}>
          <View style={this.styles.bars} flex={0}/>
        </View>
      </View>
    );
  }
}

function debounce(fn, wait) {
  let timeout
  return function() {
    const ctx = this
          , args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(ctx, args), wait)
  }
}




AppRegistry.registerComponent('stickyscroll', () => StickyScroll);
