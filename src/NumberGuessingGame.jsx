import React, { Component, useReducer } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

const MAX_ATTEMPTS = 5;

const guessReducer = (oldState, action) => {
	switch (action.type) {
		case "RESET_STATE":
			return {
				numberToGuess: getRandomNumber(),
				numberOfGuesses: 0,
				latestGuess: null,
			};
		case "UPDATE_GUESS":
			return {
				...oldState,
				numberOfGuesses: oldState.numberOfGuesses + 1,
				latestGuess: action.payload,
			};
	}
};

const NumberGuessingGame = () => {
	const initialState = {
		numberToGuess: getRandomNumber(),
		numberOfGuesses: 0,
		latestGuess: null,
	};
	const [{ numberToGuess, numberOfGuesses, latestGuess }, dispatch] =
		useReducer(guessReducer, initialState);

	const handleGuess = (guess) => {
		dispatch({ type: "UPDATE_GUESS", payload: guess });
	};

	const handleReset = () => {
		dispatch({ type: "RESET_STATE" });
	};

	const isCorrectGuess = latestGuess === numberToGuess;

	const isGameOver = isCorrectGuess || numberOfGuesses === MAX_ATTEMPTS;

	return (
		<div>
			<h2>I'm thinking of a number from 1 to 100.</h2>
			<h2>
				Can you guess the number I am thinking of in {MAX_ATTEMPTS} tries?
			</h2>
			<GuessControl onGuess={handleGuess} />
			{isGameOver && <GameOver hasWon={isCorrectGuess} onReset={handleReset} />}
			{!isGameOver && (
				<GuessMessage
					guess={latestGuess}
					numberToGuess={numberToGuess}
					numberOfGuesses={numberOfGuesses}
				/>
			)}
		</div>
	);
};

export default NumberGuessingGame;
