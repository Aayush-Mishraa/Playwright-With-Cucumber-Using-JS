@login
Feature: User Login
  As a registered user
  I want to log in to the e-commerce site
  So that I can access my account and shop

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the inventory page

  @negative
  Scenario: Login fails with invalid credentials
    When I login with username "invalid_user" and password "wrong_pass"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  @negative
  Scenario: Login fails with locked out user
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."

  @smoke
  Scenario: Login with performance_glitch_user
    When I login with username "performance_glitch_user" and password "secret_sauce"
    Then I should be redirected to the inventory page
