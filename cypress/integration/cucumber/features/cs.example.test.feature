Feature: cs_example_test_Feature
    Test feature

Scenario: Test the login feature
    Given I visit CS Site
    Given I click login link
    #And I login as user with "admin" and "password"
    Given I login as following
        | userName | Password |
        | admin    | password |