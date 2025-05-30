import React from "react";
import Die from "/src/Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
	const [dice, setDice] = React.useState(allNewDice());
	const [tenzies, setTenzies] = React.useState(false);
	const [counter, setCounter] = React.useState(0);
	const [best, setBest] = React.useState(350);

	localStorage.setItem("bestGame", best);

	React.useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);
		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}

	function rollDice() {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.isHeld ? die : generateNewDie();
				})
			);
		} else {
			setTenzies(false);
			setDice(allNewDice());
		}
	}

	function holdDice(id) {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	}

	function diceCounter() {
		if (!tenzies) {
			setCounter((prevState) => prevState + 1);
		} else {
			setCounter(0);
		}
	}

	function bestGame() {
		if (tenzies && best > counter) {
			setBest(counter);
		}
		localStorage.setItem("bestGame", best);
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			url={die.value}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	return (
		<main>
			{tenzies && <Confetti />}
			<p className="best">
				BEST: {best !== 350 && localStorage.getItem("bestGame")}
			</p>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<h1 className="counter">{counter}</h1>
			<div className="dice-container">{diceElements}</div>
			<button
				className="roll-dice"
				onClick={() => {
					rollDice();
					diceCounter();
					bestGame();
				}}>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	);
}
