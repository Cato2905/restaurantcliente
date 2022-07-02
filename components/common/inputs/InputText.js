import React from 'react'
import styles from '../../../styles/styles'
import { TextInput } from 'react-native'

const InputText = ({value,setValue,namePlaceholder,pass,editable}) => {
    return (
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => setValue(text)}
            value={value}
            placeholder={namePlaceholder}
            secureTextEntry={pass}
            editable={editable}
        />

    )
}

export default InputText