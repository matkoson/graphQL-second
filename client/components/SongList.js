import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo"; //Apollo Clt
import { Link } from "react-router";

import query from "../queries/fetchSongs";

class SongList extends Component {
	onSongDelete(id) {
		console.log("working", id);
		this.props
			.mutate({ variables: { id } })
			.then(() => this.props.data.refetch());
	}
	renderSongs() {
		if (this.props.data.loading) {
			console.log("no");
			return <div>Loading...</div>;
		} else {
			console.log("yes");
			console.log(this.props.data.songs);
			return this.props.data.songs.map(({ id, title }) => {
				console.log(id, title);
				return (
					<li key={id} className="collection-item">
						{title}
						<div className="icons">
							<Link
								to={`/songs/${id}`}
								className="btn waves-effect waves-light more right"
							>
								More
							</Link>
							<i
								className="material-icons"
								onClick={() => this.onSongDelete(id)}
							>
								delete
							</i>
						</div>
					</li>
				);
			});
		}
	}
	render() {
		console.log(this.props);
		return (
			<div>
				<ul className="collection">{this.renderSongs()}</ul>
				<Link to="/songs/new" className="btn-floating btn red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}
//the .props that were fetched in resp to the gql query

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`;

export default graphql(mutation)(graphql(query)(SongList));
