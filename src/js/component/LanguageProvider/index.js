import React from 'react'
import {
  string,
  object,
  element,
} from 'prop-types'
import {
  IntlProvider,
} from 'react-intl'

export {
  LanguageProvider,
}
function LanguageProvider({
  locale = 'en',
  messages,
  children,
}) {
  return (
    <IntlProvider
      locale={locale}
      key={locale}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  )
}

LanguageProvider.propTypes = {
  locale: string,
  messages: object,
  children: element.isRequired,
}
