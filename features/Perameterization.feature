Feature: Ecommerce validations
    @validation
    Scenario Outline: Placing order

        Given Loging to ecommerce2 website with "<username>" and "<password>"
        Then Verify the error message is displayed for invalid credentials
        Examples: 
        |username                |password         |
        |ayush.am77@gmail.com    |Aahu072         |
        |ansika@gmail.com        |Iaking@000      |
        

        
        

#perameterization , parallel execution, tags, hooks, retry failed test cases, cucumber reports, allure reports, cucumber options, cucumber hooks, cucumber tags, cucumber step definition, cucumber feature file, page object model, playwright with cucumber bdd framework
#Parameretization , parallel execution, tags, hooks, retry failed test cases, cucumber reports, allure reports, cucumber options, cucumber hooks, cucumber tags, cucumber step definition, cucumber feature file, page object model, playwright with cucumber bdd framework