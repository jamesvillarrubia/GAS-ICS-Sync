// test/helpers.test.js
import { describe, it, expect, beforeEach } from 'vitest';


// Import the functions to test
import { 
    formatDate, 
    getValidTriggerFrequency, 
    condenseCalendarMap, 
    deleteAllTriggers,
    resetAllProperties,
    fetchSourceCalendars,
    reportOverallFailure
} from '../Helpers.gs';

const TEST_CALENDAR_URL = 'https://pastebin.com/raw/HATFJa1r'

describe('Helpers.gs Tests', () => {
  describe('formatDate', () => {
    it('should format date correctly for YYYY/MM/DD', () => {
      dateFormat = "YYYY/MM/DD";
      const date = "2023-10-15T12:00:00Z";
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe("2023/10/15 at 12:00 (UTC)");
    });

    it('should format date correctly for DD/MM/YYYY', () => {
      dateFormat = "DD/MM/YYYY";
      const date = "2023-10-15T12:00:00Z";
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe("15/10/2023 at 12:00 (UTC)");
    });
  });

  describe('getValidTriggerFrequency', () => {
    it('should return 15 if no valid frequency is provided', () => {
      const frequency = getValidTriggerFrequency(null);
      expect(frequency).toBe(15);
    });

    it('should return the closest valid frequency', () => {
      const frequency = getValidTriggerFrequency(7);
      expect(frequency).toBe(10);
    });
  });

  describe('condenseCalendarMap', () => {
    it('should condense calendar map correctly', () => {
      const calendarMap = [
        ['ics1', 'google1', 'color1'],
        ['ics2', 'google1', 'color2'],
        ['ics3', 'google2', 'color3']
      ];
      const condensedMap = condenseCalendarMap(calendarMap);
      expect(condensedMap).toEqual([
        ['google1', [['ics1', 'color1'], ['ics2', 'color2']]],
        ['google2', [['ics3', 'color3']]]
      ]);
    });
  });

  describe('deleteAllTriggers', () => {

    it('should delete all relevant triggers', () => {
        // Mock triggers
        const triggers = [
          { getHandlerFunction: () => 'startSync' },
          { getHandlerFunction: () => 'install' },
          { getHandlerFunction: () => 'main' },
          { getHandlerFunction: () => 'checkForUpdate' },
          { getHandlerFunction: () => 'otherFunction' }
        ];
    
        // Mock ScriptApp methods
        ScriptApp.getProjectTriggers = vi.fn(() => triggers);
        const deleteTriggerMock = vi.fn();
        ScriptApp.deleteTrigger = deleteTriggerMock;
    
        // Run the function
        deleteAllTriggers();
    
        // Assertions
        expect(deleteTriggerMock).toHaveBeenCalledTimes(4);
        expect(deleteTriggerMock).toHaveBeenCalledWith(triggers[0]);
        expect(deleteTriggerMock).toHaveBeenCalledWith(triggers[1]);
        expect(deleteTriggerMock).toHaveBeenCalledWith(triggers[2]);
        expect(deleteTriggerMock).toHaveBeenCalledWith(triggers[3]);
    });
  });


describe('fetchSourceCalendars', () => {
    beforeEach(() => {
      // Reset mocks before each test
      vi.clearAllMocks();
    });
  
    it('should fetch and return calendar data successfully', () => {
      const sourceCalendarURLs = [[TEST_CALENDAR_URL, 'color1']];
      const mockResponse = {
        getResponseCode: () => 200,
        getContentText: () => 'BEGIN:VCALENDAR\nEND:VCALENDAR'
      };
  
      // Mock UrlFetchApp.fetch to return a successful response
      UrlFetchApp.fetch = vi.fn(() => mockResponse);
  
      // Mock callWithBackoff to directly call the function
      const callWithBackoffMock = vi.fn((func) => func());
      global.callWithBackoff = callWithBackoffMock;
  
      const result = fetchSourceCalendars(sourceCalendarURLs);
      console.log(result)
  
      expect(result).toEqual([['BEGIN:VCALENDAR\nEND:VCALENDAR', 'color1']]);
      expect(UrlFetchApp.fetch).toHaveBeenCalledWith(TEST_CALENDAR_URL, { 'validateHttpsCertificates': false, 'muteHttpExceptions': true });
      expect(callWithBackoffMock).toHaveBeenCalled();
    });
  
    it('should handle malformed ICS content', () => {
      const sourceCalendarURLs = [[TEST_CALENDAR_URL, 'color1']];
      const malformedICS = 'BEGIN:VEVENT\nSUMMARY:Event\nEND:VEVENT';
      const fixedICS = 'BEGIN:VEVENT\nSUMMARY:Event\nEND:VEVENT\nEND:VCALENDAR';
  
      const mockResponse = {
        getResponseCode: () => 200,
        getContentText: () => malformedICS
      };
  
      UrlFetchApp.fetch = vi.fn(() => mockResponse);
      const callWithBackoffMock = vi.fn((func) => func());
      global.callWithBackoff = callWithBackoffMock;
  
      const result = fetchSourceCalendars(sourceCalendarURLs);
  
      expect(result).toEqual([[fixedICS, 'color1']]);
      expect(Logger.log).toHaveBeenCalledWith('[WARNING] Microsoft is incorrectly formatting ics/ical at: https://example.com/calendar.ics');
    });
  
    it('should handle HTTP errors', () => {
      const sourceCalendarURLs = [[TEST_CALENDAR_URL, 'color1']];
      const mockResponse = {
        getResponseCode: () => 404,
        getContentText: () => ''
      };
  
      UrlFetchApp.fetch = vi.fn(() => mockResponse);
      const callWithBackoffMock = vi.fn((func) => { throw new Error('HTTP error'); });
      global.callWithBackoff = callWithBackoffMock;
  
      const result = fetchSourceCalendars(sourceCalendarURLs);
  
      expect(result).toEqual([]);
      expect(Logger.log).not.toHaveBeenCalledWith('[ERROR] Incorrect ics/ical URL: https://example.com/calendar.ics');
    });
  });
});