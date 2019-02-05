import React from 'react'

const BLOCK_TAGS = {
  blockquote: 'blockquote',
  p: 'paragraph',
  pre: 'code',
  headline: 'h3',
  subheadline: 'h4',
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underlined',
  s: 'strikethrough',
}

export const rules = [
  {
    deserialize(el, next) {
      const { tagName, childNodes, } = el
      const type = BLOCK_TAGS[tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type,
          nodes: next(childNodes),
          data: {
            className: el.getAttribute('class'),
          },
        }
      }
      return null
    },
    serialize(obj, children) {
      const { object, data, type, } = obj
      if (object === 'block') {
        const className = data.get('className')
        switch (type) {
          case 'code':
            return (
              <pre className={className}>
                <code>{children}</code>
              </pre>
            )
          case 'headline':
            return (
              <h3 className={className}>{children}</h3>
            )
          case 'subheadline':
            return (
              <h4 className={className}>{children}</h4>
            )
          case 'paragraph':
            return <p className={className}>{children}</p>
          case 'blockquote':
            return <blockquote className={className}>{children}</blockquote>
        }
      }
      return null
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const { tagName, childNodes, } = el
      const type = MARK_TAGS[tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(childNodes),
          data: {
            className: el.getAttributes('class'),
          },
        }
      }
      return null
    },
    serialize(obj, children) {
      const { object, data, type, } = obj
      if (object === 'mark') {
        const className = data.get('className')
        switch (type) {
          case 'bold':
            return <strong className={className}>{children}</strong>
          case 'italic':
            return <em className={className}>{children}</em>
          case 'underlined':
            return <u className={className}>{children}</u>
          case 'strikethrough':
            return <s className={className}>{children}</s>
        }
      }
      return null
    },
  }
]
