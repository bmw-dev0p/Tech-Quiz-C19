// e2e user journey
// 'it' in this case is the user

describe('User Journey', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3001/');
    });

    it('should see the title text on the screen', () => {
        cy.get('h1').should('have.text', 'Welcome to the Code Quiz!');
    });

    it('should be able to click the start button', () => {
        cy.get('button').click();
    });

    it('should see the quiz question', () => {
        cy.findByRole('button', { name: 'Start Quiz' }).click();
        cy.get('.card h2').should('exist');
    });

    it('should see the quiz answers', () => {
        cy.get('button').click();
        cy.get('.card button').should('exist');
    });

    it('should be able to click on the answer button 1-4', () => {
        cy.get('button').click();
        cy.get('.btn-primary').first().click();
    });
    it('should display the next question after clicking on an answer', () => {
        cy.contains('Start Quiz').click();
        cy.wait(1000); // Adjust the wait time based on your API response time
        cy.get('.btn-primary').first().click(); // Assuming the first answer is correct
        cy.get('.card h2').should('exist');
    });

    it('should see the Quiz Completed text when the quiz is over', () => {
        cy.get('button').click();
        cy.wait(1000); // Adjust the wait time based on your API response time
        for (let i = 0; i < 10; i++) {
            cy.get('.btn-primary').first().click();
            cy.wait(500); // Adjust the wait time based on your application's response time
        }
        cy.get('h2').should('have.text', 'Quiz Completed');
    });

    it('should display the score when quiz is over', () => {
        cy.get('button').click();
        cy.wait(500); // Adjust the wait time based on your API response time
        for (let i = 0; i < 10; i++) {
            cy.get('.btn-primary').first().click();
            cy.wait(500); // Adjust the wait time based on your application's response time
        }
        cy.get('h3').should('have.text', 'Your Score: ');
    });

    it('should see / click the button to take a new quiz, when the quiz is over', () => {
        cy.get('button').click();
        cy.wait(1000); // Adjust the wait time based on your API response time
        for (let i = 0; i < 10; i++) {
            cy.get('.btn-primary').first().click();
            cy.wait(500); // Adjust the wait time based on your application's response time
        }
        cy.get('h2').should('have.text', 'Quiz Completed');
    });
    
});