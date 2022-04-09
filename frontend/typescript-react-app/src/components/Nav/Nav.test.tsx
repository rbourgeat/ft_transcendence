import Nav from './Nav'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('Nav component render', () => {
	it('should render Nav', async () => {
		render (
			<BrowserRouter>
				<Nav />
			</BrowserRouter>
		)
	})
})
