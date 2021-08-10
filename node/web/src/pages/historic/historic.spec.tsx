import {render, screen} from '@testing-library/react'
import Historic from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: jest.fn()
  }),
  useParams: () => ({
    actionName: 'any_action_name'
  })
}))

test('render historic page', () => {
  render(<Historic />)
  const element = screen.getByText(/Buscar Registros/i)
  expect(element).toBeInTheDocument()
})
