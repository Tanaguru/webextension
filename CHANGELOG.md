# Changelog

## 1.5.0

- All the RGAA tests listed in the rgaa.js script
- Improved performance

## 1.5.1

- update tab's panel title
- update manifest

## 1.5.2

- update regex in tests (engine compatibility)
- create new function "getImplicitAriaRoleCategory" to replace htmlData references in tests (engine compatibility)

## 2.0.0

- New home panel interface
- New features : relaunch/restart analyze, filters (custom analyze), display results progressively
- Update highlight action
- Update some RGAA tests
- Update manifest 
- fixes some bugs

## 2.0.1
- update webext version

## 3.0.0
- new feature : display the detail of the accessible name calculation
- update code cell integration
- new feature : add testStatus propertie in test object
- fixes some bugs

## 3.1.0
- update the project structure
- update Readme files

## 4.0.0
- new features : monitoring DOM and tab's url changes, display headings hierarchy
- update interface integration and some tests
- fixes aria pattern and accessibleName bugs

## 5.0.0
- new feature : display tab order on the analysed webpage
- updates : interface integration, navigation/headings/links tests, internationalization
- fixes : some tests (table title, figure legend, date field), canBeReachingUsingKeyboard function, accessibleName function

## 5.0.1
- fix : tab signature

## 5.0.2
- fix : compatibility with old browsers
## 5.1.0
- updates : test object(the mark property is now a function that allows to be more precise, a test can now be marked with the warning property), 
- fixes : getVisibility/getXPath/getDuplicateID (these functions sometimes caused errors that blocked the analysis of some pages or gave erroneous results)
- new feature : warning tag can be added on cantTell tests

## 5.1.1
- fixes : wcag tests