import React, { Component, useState } from "react";
import Button from "./Button";

const GuessControl = (props) => {
	const { onGuess } = props;
	const [currentGuess, setGuess] = useState("");

	const handleInputChange = (e) => {
		e.preventDefault();
		const guess = e.target.value;
		setGuess(guess);
	};

	const onSubmitGuess = () => {
		onGuess(Number(currentGuess));
	};

	return (
		<div>
			<input type="number" value={currentGuess} onChange={handleInputChange} />
			<Button onClick={onSubmitGuess}>Submit Guess</Button>
		</div>
	);
};

export default GuessControl;
