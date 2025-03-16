Feature: Project Create

  As a valid use i want to create test project

  Scenario: Create Project
    Given Session Login
    Then Go Home

    When I click on add project button
    Then I type project name
    Then I click create button
    Then I get success created
