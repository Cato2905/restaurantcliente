import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from '../../../styles/styles'

const TouOpasLarge = ({ nameBtn, nameOnPress }) => {
  return(
    <TouchableOpacity
      style={styles.btnLarge}
      onPress={() => nameOnPress()}
    >
      <Text
        style={styles.textBtn}
      >
        {nameBtn}
      </Text>
    </TouchableOpacity>
  )
}


export default TouOpasLarge