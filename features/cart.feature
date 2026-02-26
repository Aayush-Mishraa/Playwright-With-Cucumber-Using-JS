@cart
Feature: Shopping Cart
  As a logged in user
  I want to manage items in my cart
  So that I can prepare for checkout

  Background:
    Given I am logged in as "standard_user"

  @smoke
  Scenario: Add a single item to cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  @smoke
  Scenario: Add multiple items to cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"

  Scenario: View cart with added items
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    Then the cart should contain "Sauce Labs Backpack"

  Scenario: Remove an item from the cart
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty
