import Quiz from '../../client/src/components/Quiz';
// import { Question } from '../../client/src/models/Question';
// import { Answer } from '../../client/src/models/Answer';


// interface QuizProps {

//     questions: Question[];

//     title: string;

// }



// const questions: Question [] = [
//     {
//         _id: '1',
//         question: 'What is 5 + 3?',
//         answers: [
//             { text: '8', isCorrect: true },
//             { text: '5', isCorrect: false },
//             { text: '6', isCorrect: false },
//             { text: '7', isCorrect: false }
//         ]
//     },
//     {
//         '_id': '2',
//         question: 'What is 6 + 7?',
//         answers: [
//             { text: '4', isCorrect: false },
//             { text: '5', isCorrect: false },
//             { text: '13', isCorrect: true },
//             { text: '7', isCorrect: false }
//         ]
//     }
// ];

describe('Quiz', () => {    
    it('should render the quiz React component entirely', () => {
        cy.mount(<Quiz 
        // questions = {questions} 
        // title = "sample" 
        />);

        // cy.get('.quiz').should('exist');
    });
    it('should render the title text on the screen', () => {
        cy.mount(<Quiz />);
        cy.get('h1').should('have.text', 'Welcome to the Code Quiz!');
      });
    it('should render the start button', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').should('exist');
    });
    it('should be able to click on the start button', () => {
        cy.mount(<Quiz />);
        
    });
    it('should display the first question after starting the quiz', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').click();
        cy.wait(1000); // Adjust the wait time based on your API response time
        cy.get('.card h2').should('exist');
    });
    it('should display the next question after clicking on an answer', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').click();
        cy.wait(1000); // Adjust the wait time based on your API response time
        cy.get('.btn-primary').first().click(); // Assuming the first answer is correct
        cy.get('.card h2').should('exist');
    });

    it('should display the quiz completed message after answering all questions', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').click();
        cy.wait(1000); // Adjust the wait time based on your API response time
        cy.get('.btn-primary').each((button) => {
            cy.wrap(button).click();
        });
        cy.contains('Quiz Completed').should('exist');
    });
    

    it('should display the score when the quiz is over', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').click();
        cy.wait(1000); // Adjust the wait time based on your API response time
        for (let i = 0; i < 10; i++) {
            cy.get('.btn-primary').first().click();
            cy.wait(500); // Adjust the wait time based on your application's response time
        }
        cy.get('button').should('exist');
        cy.get('button').click();
    });

});
