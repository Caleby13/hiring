import {render, screen} from '@testing-library/react'
import {FavoriteItem} from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}))

test('render favorite item page', () => {
  render(<FavoriteItem actionName="any_action_name" handleDelete={jest.fn()} />)
  const element = screen.getByText(/Historico/i)
  expect(element).toBeInTheDocument()
})
