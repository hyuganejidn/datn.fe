import React, { useRef } from 'react'
import { EmojiInput } from 'Templates/emoji/Emoji'
import { EmojiSuggestion } from 'Templates/emoji/EmojiSuggestion'

function InputEmoji(props) {
  const { field, form, label, disabled, placeholder, autoComplete } = props
  const { name, value } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]
  const textareaRef = useRef(null)

  const emojiInserted = messageWithEmoji => {
    const eventChange = {
      target: {
        name,
        value: messageWithEmoji,
      },
    }
    field.onChange(eventChange)
    textareaRef.current.focus()
  }

  return (
    <div style={{ position: 'relative' }}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        {...field}
        id={name}
        style={{ width: 400 }}
        placeholder={placeholder}
        disabled={disabled || false}
        autoComplete={autoComplete || 'off'}
      />
      <EmojiInput value={value} onSelection={emojiInserted} />
      <EmojiSuggestion value={value} onSelection={emojiInserted} />

      <div className="is-invalid" />
      {showError && <div>{errors[name]}</div>}
    </div>
  )
}

export default InputEmoji
