import React from "react";
import "./Search.scss";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

export interface SearchProps {}

export interface SearchState {}

export default class Search extends React.Component<SearchProps, SearchState>
{
	constructor(props: SearchProps)
	{
		super(props);
		this.state = {}
	}

	componentDidMount() {}

	render()
	{
		return (
			<div id="search">
				<Nav />
					<div className="container">
						<div className="row d-flex justify-content-center text-center">
							<div className="col-7">
							<h1 id="search--title">Search [deprecated]</h1>
								<div id="searchbox--div">
									<form className="form">
										<input
											id="search--input"
											type="form-control"
											placeholder=""
										/>
										<span id="loop">🔍</span>
										</form>
									</div>
							</div>
						</div>
					</div>
			</div>
		);
	}

}
