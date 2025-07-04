import React, { Component } from 'react'
import traktör from '../resim/Likya.png';
export default class Logo extends Component {
  render() {
    return (
      <img  src={traktör} style={{width:"5rem"}}></img>
    )
  }
}