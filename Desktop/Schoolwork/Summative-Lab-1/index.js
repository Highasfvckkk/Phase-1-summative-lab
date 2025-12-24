const questions = [
  {
    q: "What is my first name?",
    a: "Victor",
  },
  {
    q: "What is my second name?",
    a: "Kinoti",
  },
  {
    q: "What is my third name?",
    a: "Muriithi",
  },
  {
    q: "What is my mother's first name?",
    a: "Muthoni",
  },
  {
    q: "What is my mother's second name?",
    a: "Joyce",
  },
];

let score = 0;

function trivia() {
  alert(
    `Welcome to the Kinoti quiz game, you have 10 seconds to complete every question. Good luck!`
  );

  for (let i = 0; i < questions.length; i++) {
    const current = questions[i];

    const startTime = Date.now();
    const answer = prompt(`Question ${i + 1}:\n${current.q}`);

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;

    if (timeTaken > 10) {
      alert(
        `Too slow! You took ${Math.round(timeTaken)} seconds. No point awarded`
      );
    } else if (answer || answer.toUpperCase() === current) {
      alert(`Correct! You took ${Math.round(timeTaken)}s`);
      score++;
    } else {
      alert(`Incorrect. The correct answer is ${current.a}`);
    }
  }

  alert(`You scored ${score}`);
}

trivia();
