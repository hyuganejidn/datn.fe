import { emojiIndex } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import React, { useRef } from 'react'

import useClickOutside from '../../hooks/useClickOutside'

const getEmojisFromEmojiSearchTerm = emojiSearchTerm =>
  emojiIndex.search(emojiSearchTerm)

const getEmojiSearchTerm = (content, replaceEmoji) => {
  const colons = content.match(/:([a-z_]+)(:)?/)
  if (!colons) return ''

  if (colons[2] !== undefined) {
    const match = emojiIndex.emojis[colons[1]]
    if (match && 'native' in match) {
      replaceEmoji(`${colons[1]}:`, match, content)
    } else {
      const results = emojiIndex.search(colons[1])
      if (results[0] && 'native' in results[0]) {
        replaceEmoji(`${colons[1]}:`, results[0], content)
      }
    }
    return ''
  }

  if (colons[1].length > 1) return colons[1]

  return ''
}

const EmojiSuggestion = ({ value, onSelection }) => {
  const suggestions = useRef(null)

  const replaceEmoji = (search, emoji, content) => {
    if ('native' in emoji) {
      const txt = content.replace(`:${search}`, emoji.native)
      onSelection(txt)
    }
  }

  let displayed = false

  const emojiSearchTerm = getEmojiSearchTerm(value, replaceEmoji)
  const emojis = getEmojisFromEmojiSearchTerm(emojiSearchTerm)

  if (emojiSearchTerm !== '' && emojis.length > 0) {
    displayed = true
  } else {
    displayed = false
  }
  useClickOutside(suggestions, () => {
    displayed = false
  })

  const EmojiResult = ({ emoji }) => (
    <li>
      <button
        type="button"
        onClick={() => replaceEmoji(emojiSearchTerm, emoji, value)}
      >
        {'native' in emoji && emoji.native}
        {emoji.colons}
      </button>
    </li>
  )

  return (
    <>
      {displayed && (
        <div ref={suggestions}>
          Suggestions for <b>{emojiSearchTerm}</b>
          {emojis.map((emoji, i) => (
            <EmojiResult key={i} emoji={emoji} />
          ))}
        </div>
      )}
    </>
  )
}

export { EmojiSuggestion }
