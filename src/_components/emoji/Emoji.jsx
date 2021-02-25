import 'emoji-mart/css/emoji-mart.css'
import React from 'react'
import { Picker as EmojiPicker } from 'emoji-mart'

import { Dropdown } from 'Templates/commons/Dropdown'
import { Icons } from 'Templates/icon/Icon'

const EmojiInput = ({ value, onSelection }) => (
  <Dropdown
    icon={Icons.Emoji}
    right="0"
    bottom="0"
    title="Open emoji selector"
    render={dismiss => {
      const addEmoji = emoji => {
        if ('native' in emoji) {
          onSelection(`${value}${emoji.native}`)
          dismiss()
        }
      }
      return (
        <EmojiPicker
          set="google"
          native
          emoji=""
          title=""
          onSelect={addEmoji}
        />
      )
    }}
  />
)

export { EmojiInput }
