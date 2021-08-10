import {render, screen} from '@testing-library/react'
import Gains from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: jest.fn()
  }),
  useParams: () => ({
    actionName: 'any_action_name'
  })
}))

test('render gains page', () => {
  render(<Gains />)
  const element = screen.getByText(/Calcular Ganhos/i)
  expect(element).toBeInTheDocument()
})
