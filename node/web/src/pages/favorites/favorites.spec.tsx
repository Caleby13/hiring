import {render, screen} from '@testing-library/react'
import Favorites from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: jest.fn()
  })
}))

test('render favorites page', () => {
  render(<Favorites />)
  const element = screen.getByText(/ÚLTIMA COTAÇÃO/i)
  expect(element).toBeInTheDocument()
})
