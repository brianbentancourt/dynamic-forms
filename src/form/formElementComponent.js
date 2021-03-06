import React from 'react'
import { ELEMENT_TYPE } from '../constants/contants'
import { TextElement, TextAreaElement, LabelElement, PasswordElement, CheckboxElement, RadioElement, SimpleSelectElement } from './formElement'
import { shouldBeHidden } from '../utils/formUtils'

const ElementDictionary = {
  [ELEMENT_TYPE.PRINT]: LabelElement,
  [ELEMENT_TYPE.TEXT]: TextElement,
  [ELEMENT_TYPE.PASSWORD]: PasswordElement,
  [ELEMENT_TYPE.CHECKBOX]: CheckboxElement,
  [ELEMENT_TYPE.RADIO]: RadioElement,
  [ELEMENT_TYPE.TEXTAREA]: TextAreaElement,
  [ELEMENT_TYPE.SIMPLE_SELECT]: SimpleSelectElement
}

const FormElementComponent = (props) => {
  const { element, formElements, valueMap } = props
  const MyReactElement = ElementDictionary[element.type]

  const handleChange = (event) => {
    const { element, setValue = (e, v) => console.log(e, v) } = props
    const value = getCurrentValue(event)
    setValue(element.elementId, value)
  }

  const getCurrentValue = (event) => {

    const { element } = props

    switch (element.type) {
      case ELEMENT_TYPE.RADIO:
        return event.target.value
      case ELEMENT_TYPE.CHECKBOX:
        return event.target.checked
      default:
        return event.target.value
    }
  }

  const isHidden = shouldBeHidden(formElements, element, valueMap)

  if (isHidden) {
    return null
  }
  return (<MyReactElement handleChange={handleChange} {...props} />)
}

export default FormElementComponent

