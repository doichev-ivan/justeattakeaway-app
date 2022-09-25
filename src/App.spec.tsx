import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { persistor, store } from './logic/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'

test('renders game', () => {
  const { getByText } = render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )

  expect(getByText(/Win the game or win the job/i)).toBeInTheDocument()
})
