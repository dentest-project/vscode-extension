Feature: Create permission
  As an admin
  I want to create a new permission
  So that users right can be managed

  Background:
    Given there are the following permission categories
      | id | label key     | parent category id |
      | 1  | main-category |                    |
      | 2  | sub-category  | 1                  |
    And there are the following scopes
      | id                  |
      | Hublo::Match::Admin |
    And there are the following permissions
      | id           | scope               | category     |
      | canEditUsers | Hublo::Match::Admin | sub-category |

  Scenario: Create a new permission organized in an existing sub-category
    When I create a permission "canSeeUsers" in the scope "Hublo::Match::Admin" , organized in the category "sub-category"
    Then there are "2" permissions
    And I see a permission "canSeeUsers" on scope "Hublo::Match::Admin" attached to the category "sub-category" that is "not deleted"

  Scenario: Fail to create a permission if the category does not exist
    When I create a permission "canSeeUsers" in the scope "Hublo::Match::Admin" , organized in the category "not-exists"
    Then it fails with the error "permission category not found"
    And there are "1" permissions

  Scenario: Fail to create a permission organized in a main category
    When I create a permission "canSeeUsers" in the scope "Hublo::Match::Admin" , organized in the category "main-category"
    Then it fails with the error "invalid permission category hierarchy"
    And there are "1" permissions

  Scenario: Fail to create a permission if its identifier already exists
    When I create a permission "canEditUsers" in the scope "Hublo::Match::Admin" , organized in the category "sub-category"
    Then it fails with the error "permission already exists"
    And there are "1" permissions
