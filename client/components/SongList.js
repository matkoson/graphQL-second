import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo"; //Apollo Clt

class SongList extends Component {
	renderSongs() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		} else {
			return this.props.data.songs.map(song => {
				return (
					<li key={song.id} className="collection-item">
						{song.title}
					</li>
				);
			});
		}
	}
	render() {
		console.log(this.props);
		return <ul className="collection">{this.renderSongs()}</ul>;
	}
}
//the .props that were fetched in resp to the gql query

//translates the query for the Apollo
const query = gql`
	{
		songs {
			id
			title
		}
	}
`;

export default graphql(query)(SongList);
