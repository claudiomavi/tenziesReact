export default function Die(props) {
	function getImageUrl(name) {
		return new URL(`/src/assets/dice/${name}.svg`, import.meta.url).href;
	}

	const styles = {
		backgroundColor: props.isHeld ? "#59E391" : "white",
	};
	return (
		<div className="die-face" style={styles} onClick={props.holdDice}>
			<img className="die-num" src={getImageUrl(props.value)} alt="die" />
		</div>
	);
}
