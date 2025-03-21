Feature: Entry Projects

  As a valid use i want to be sure that projects page work fine

  Background:
    Given Session Login
    Then Go Home

    When I open actions menu
    When I select project
    Then I click on Vocabulary Mapping
    Then I get redirected to Vocabulary Mapping page

  Scenario: Upload Vocabulary Mapping

    When I click on upload resource button
    Then I select file
    Then I click on upload file button
    Then I get successfully upload


  Scenario: Edit Resource
    Then I enter file name
    Then I click on actions button
    Then I click on edit button
    Then I get redirected to edit page
    Then I update title
    Then I click on update button
    Then I get successfully update

  Scenario: Delete Resource
    When I enter updated file name
    Then I click on actions button
    Then I click on delete button
    Then I click yes button
    Then I get success delete
