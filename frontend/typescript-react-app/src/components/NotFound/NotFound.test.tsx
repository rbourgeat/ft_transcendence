import NotFound from './NotFound'
import { BrowserRouter } from 'react-router-dom' 
import { render } from '@testing-library/react'
import TypeAnimation from 'react-type-animation'
import Nav from '../Nav/Nav';

describe('NotFound components renders', () => {
	it('Should render NotFound without crash', async () => {
		render(
			<BrowserRouter>
				<NotFound />
			</BrowserRouter>
		 )
	})

	it('Should render TypeAnimation without crash', async () => {
			render (
				<TypeAnimation className="title" cursor={false} sequence={["404!", 2500, '']} wrapper="h1" repeat={Infinity} />
			)
	})
	it('Should render Nav without crash', async () => {
		render (
			<BrowserRouter>
				<Nav />
			</BrowserRouter>
		)
	})	
})
