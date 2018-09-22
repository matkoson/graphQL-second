import React, { Component } from "react";

class LyricList extends Component {
	onLike(id) {
		console.log(id);
	}
	renderLyrics() {
		console.log(this.props.songLyrics);
		if (this.props.songLyrics) {
			return this.props.songLyrics.map(({ id, content }) => (
				<li key={id} className="collection-item">
					{content}
					<i className="material-icons" onClick={() => this.onLike(id)}>
						thumb_up
					</i>
				</li>
			));
		} else {
			return <div>No lyrics available at the moment</div>;
		}
	}
	render() {
		return <ul className="collection">{this.renderLyrics()}</ul>;
	}
}

const mutation = gql`
	mutation LikeLyric($id: ID) {
		likeLyric(id: $id) {
			likes
			id
		}
	}
`;

export default LyricList;
