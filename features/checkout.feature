@checkout
Feature: Checkout Flow
  As a logged in user with items in my cart
  I want to complete the checkout process
  So that I can purchase my items

  Background:
    Given I am logged in as "standard_user"
    And I have "Sauce Labs Backpack" in my cart

  @smoke
  Scenario: Complete a successful checkout
    When I proceed to checkout
    And I fill in shipping info with first name "John", last name "Doe", and postal code "12345"
    And I continue to the order summary
    Then I should see the order summary
    When I finish the order
    Then I should see the order confirmation message "Thank you for your order!"

  @negative
  Scenario: Checkout fails without first name
    When I proceed to checkout
    And I fill in shipping info with first name "", last name "Doe", and postal code "12345"
    And I continue to the order summary
    Then I should see a checkout error "Error: First Name is required"

  @negative
  Scenario: Checkout fails without postal code
    When I proceed to checkout
    And I fill in shipping info with first name "John", last name "Doe", and postal code ""
    And I continue to the order summary
    Then I should see a checkout error "Error: Postal Code is required"

  Scenario: Cancel checkout returns to cart
    When I proceed to checkout
    And I cancel the checkout
    Then I should be on the cart page
