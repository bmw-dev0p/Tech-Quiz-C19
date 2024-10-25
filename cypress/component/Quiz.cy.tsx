import Quiz from '../../client/src/components/Quiz';

describe('Quiz', () => {
    it('should render the quiz React component entirely', () => {
        cy.mount(<Quiz />);
    });

    it('should render the title text on the screen', () => {
        cy.mount(<Quiz />);
        cy.get('h1').should('have.text', 'Welcome to the Code Quiz!');
    });

    it('should render the start button', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').should('exist');
    });
    
    it('should render the component housing the questions', () => {
      cy.mount(<Quiz />);
      cy.contains('Start Quiz').click();
      cy.wait(500); // Adjust the wait time based on your API response time
      cy.get('.card h2').should('exist');
  });

  it('should render 4 buttons for each question', () => {
    cy.mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait(500); // Adjust the wait time based on your API response time
    cy.get('.btn-primary').should('have.length', 4);
});

  // add test for making sure there are only 10 questions? 
    //for the tests below, we need to mock the API call to get the questions from fixtures
    it('should render the question data from the db', () => {
        // Mount the component
        cy.log('Mounting the Quiz component');
        cy.mount(<Quiz />);

        // Intercept the API call and replace with mock data from fixture
        cy.log('Setting up API intercept for /api/questions/random');
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            fixture: 'questions.json', // Use the mock data from questions.json fixture
        }).as('getQuestions'); // Alias the intercept

        // Log to check if intercept is set up correctly
        cy.log('API intercept set. Waiting for Start Quiz click.');

        // Trigger the quiz start
        cy.contains('Start Quiz').click();

        // Log after the "Start Quiz" button is clicked
        cy.log('Start Quiz clicked. Waiting for API request to be intercepted.');

        // Wait for the API call to finish
        cy.wait('@getQuestions').then((interception) => {
            // Log the intercepted request and response for debugging
            cy.log('Intercepted request:', interception.request);
            cy.log('Intercepted response:', interception.response);
        });

        // Log the expectation to verify if the question is visible
        cy.log('Verifying that the first question is rendered.');

        // Assert that the mock question is rendered
        cy.findByText('What is 5 + 3?').should('be.visible');
    });





    it('should keep track of correct answers and display the correct score', () => {
        // Mount the component
        cy.log('Mounting the Quiz component');
        cy.mount(<Quiz />);
    
        // Intercept the API call and replace with mock data from fixture
        cy.log('Setting up API intercept for /api/questions/random');
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          fixture: 'questions.json',
        }).as('getQuestions'); // Alias the intercept
    
        // Trigger the quiz start
        cy.log('API intercept set. Waiting for Start Quiz click.');
        cy.contains('Start Quiz').click();
    
        // Wait for the API call to finish and loop through each question
        cy.wait('@getQuestions').then((interception) => {
          cy.log('Intercepted request:', interception.request);
          cy.log('Intercepted response:', interception.response);    
        });
    
        // Loop through each question and answer all questions
        cy.log('Answering all questions.');
        for (let i = 0; i < 10; i++) {
          cy.get('.btn-primary').eq(2).click(); // Assuming the third answer is correct
          cy.wait(500); // Adjust the wait time based on your application's response time
        }

        // Assert the final score is correct (assuming score is shown after all questions)
        cy.log('Verifying the final score is displayed.');
        cy.get('[data-cy="score"]').should('be.visible'); // Assuming correct answers lead to a perfect score
      });

    it('should display the quiz completed message after answering all questions', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').click();
        cy.wait(500); // Adjust the wait time based on your API response time
        // Loop through each question and answer all questions
        cy.log('Answering all questions.');
        for (let i = 0; i < 10; i++) {
          cy.get('.btn-primary').eq(2).click(); // Assuming the third answer is correct
          cy.wait(500); // Adjust the wait time based on your application's response time
        }
        cy.contains('Quiz Completed').should('be.visible');
    });


    it('should render the button to take a new quiz after the quiz is over', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').click();
        cy.wait(500); // Adjust the wait time based on your API response time
        // Loop through each question and answer all questions
        cy.log('Answering all questions.');
        for (let i = 0; i < 10; i++) {
          cy.get('.btn-primary').eq(2).click(); // Assuming the third answer is correct
          cy.wait(500); // Adjust the wait time based on your application's response time
        }
        cy.contains('Take New Quiz').should('exist');
    });


});
