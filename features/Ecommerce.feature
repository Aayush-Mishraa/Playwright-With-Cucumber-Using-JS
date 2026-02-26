Feature: Ecommerce validations
    @Regression
    Scenario: Placing order


        Given Loging to ecommerce website with "ayush.am77@gmail.com" and "Aashu072"
        When Add "ZARA COAT 3" to cart
        Then verify "ZARA COAT 4" is added to cart
        When When enter the valide details and place the order 
        Then verify order is presnt in the order history page
        

    @validation
    Scenario Outline: Placing order

        Given Loging to ecommerce2 website with "<username>" and "<password>"
        Then Verify the error message is displayed for invalid credentials
        Examples: 
        |username                |password         |
        |ayush.am77@gmail.com    |Aahu072         |
        |ansika@gmail.com        |Iaking@000      |
        


        