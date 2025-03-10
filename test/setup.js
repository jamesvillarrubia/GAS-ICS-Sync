// test/setup.js
const {
  ScriptAppStub,
  PropertiesServiceStub,
  CalendarStub,
  MailAppStub,
  UrlFetchAppStub,
  UtilitiesStub,
  dateFormat,
  LoggerStub,
  reportOverallFailure
} = require('./stubs.js');

global.ScriptApp = ScriptAppStub;
global.PropertiesService = PropertiesServiceStub;
global.Calendar = CalendarStub;
global.MailApp = MailAppStub;
global.UrlFetchApp = UrlFetchAppStub;
global.Utilities = UtilitiesStub;
global.dateFormat = dateFormat;
global.Logger = LoggerStub;
global.reportOverallFailure = reportOverallFailure;
global.defaultMaxRetries = 3;