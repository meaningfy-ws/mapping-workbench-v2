Feature: Entry Projects

  As a valid use i want to be sure that projects page work fine

#  Scenario: Create Project
#    Given Session Login
#    Then Go Home
#
#    When I click on add project button
#    Then I type project name
#    When I click create button
#    Then I get success created
#
#  Scenario: Select Project
#    Given Session Login
#    Then Go Home
#
#    When I open actions menu
#    When I select project
#
#  Scenario: Edit Project
#    Given Session Login
#    Then Go Home
#
#    When I open actions menu
#    When I click on edit button
#    Then I update project description
##    Then I uncheck checkboxes
#    Then I click on update button
#    Then I receive update success

  Scenario: Delete Project
    Given Session Login
    Then Go Home

    When I open actions menu
    When I click on delete button
    Then I click yes button
    Then I get success delete
