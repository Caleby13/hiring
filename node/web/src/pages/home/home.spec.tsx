import {render, screen} from '@testing-library/react'
import Home from './index'

test('render home page', () => {
  render(<Home />)
  const element = screen.getByText(/Buscar/i)
  expect(element).toBeInTheDocument()
})
