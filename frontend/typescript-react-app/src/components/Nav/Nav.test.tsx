import Nav from './Nav'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { faUser, faComment, faTrophy, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

describe('Nav component render', () => {
	it('should render Nav', async () => {
		render (
			<BrowserRouter>
				<Nav />
			</BrowserRouter>
		)
	})

	it('should render faUser icon', async () => {
			render (
					<FontAwesomeIcon icon={faUser}/>
			)
	})

	
	it('should render faComment icon', async () => {
			render (
					<FontAwesomeIcon icon={faComment}/>
			)
	})

	it('should render faTrophy icon', async () => {
			render (
					<FontAwesomeIcon icon={faTrophy}/>
			)
	})

	
	it('should render faMagnifyingGlass icon', async () => {
			render (
					<FontAwesomeIcon icon={faMagnifyingGlass}/>
			)
	})
})
