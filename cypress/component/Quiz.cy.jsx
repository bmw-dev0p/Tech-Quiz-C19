import Quiz from '../../client/src/components/Quiz';

describe('Quiz', () => {    
    it('should render a quiz', () => {
        cy.mount(<Quiz />);

        // cy.get('.quiz').should('exist');
    });
    it('should render the start button', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').should('exist');
    });
    it('should be able to click on the start button', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').click();
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
        cy.get('h3').should('have.text', 'Your Score: ');
    });

});
