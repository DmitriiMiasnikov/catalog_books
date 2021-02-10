import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RandomAnimationMenuDom } from './RandomAnimationMenuDom';

const RandomAnimationMenu = () => {
  const [randomAnimation, setRandomAnimation] = useState([]);

  useEffect(() => {

  })
  
  return (
    <RandomAnimationMenuDom {...{randomAnimation}}/>
  )
}

const mapStatesToProps = (state) => {
  return {

  }
}
export default connect(mapStatesToProps, {})(RandomAnimationMenu);