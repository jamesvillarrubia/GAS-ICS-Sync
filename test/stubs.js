// Stub for ScriptApp
class ScriptAppStub {
  static newTrigger(functionName) {
    return {
      timeBased: function () {
        return {
          everyMinutes: function (minutes) {
            console.log(`Trigger set to run every ${minutes} minutes for function ${functionName}`);
            return this;
          },
          everyHours: function (hours) {
            console.log(`Trigger set to run every ${hours} hours for function ${functionName}`);
            return this;
          },
          after: function (milliseconds) {
            console.log(`Trigger set to run after ${milliseconds} milliseconds for function ${functionName}`);
            return this;
          },
          everyDays: function (days) {
            console.log(`Trigger set to run every ${days} days for function ${functionName}`);
            return this;
          },
          create: function () {
            console.log(`Trigger created for function ${functionName}`);
          }
        };
      }
    };
  }
  static getProjectTriggers() {
    console.log("Getting project triggers");
    return [];
  }

  static deleteTrigger(trigger) {
    console.log(`Deleting trigger: ${trigger}`);
  }
}

// Stub for PropertiesService
class PropertiesServiceStub {
  static getScriptProperties() {
    return {
      getProperty: function (key) {
        console.log(`Getting script property: ${key}`);
        return null; // Default value for demonstration
      },
      setProperty: function (key, value) {
        console.log(`Setting script property: ${key} to ${value}`);
      },
      deleteAllProperties: function () {
        console.log("Deleting all script properties");
      }
    };
  }

  static getUserProperties() {
    return {
      getProperty: function (key) {
        console.log(`Getting user property: ${key}`);
        return null; // Default value for demonstration
      },
      setProperty: function (key, value) {
        console.log(`Setting user property: ${key} to ${value}`);
      },
      deleteAllProperties: function () {
        console.log("Deleting all user properties");
      }
    };
  }

  static getDocumentProperties() {
    return {
      deleteAllProperties: function () {
        console.log("Deleting all document properties");
      }
    };
  }
}

// Stub for Logger
class LoggerStub {
  static log(message) {
    console.log(`Log: ${message}`);
  }
}


// Stub for Calendar
class CalendarStub {
  static Events = {
    list: function (calendarId, options) {
      console.log(`Listing events for calendar: ${calendarId} with options:`, options);
      return { items: [], nextPageToken: undefined }; // Default empty response
    }
  };

  static Events = {
    list: function (calendarId, options) {
      console.log(`Listing events for calendar: ${calendarId} with options:`, options);
      return { items: [] }; // Default empty response
    },
    insert: function (event, calendarId) {
      console.log(`Inserting event into calendar: ${calendarId}`, event);
      return event; // Return the event for demonstration
    },
    update: function (event, calendarId, eventId) {
      console.log(`Updating event ${eventId} in calendar: ${calendarId}`, event);
      return event; // Return the event for demonstration
    },
    remove: function (calendarId, eventId) {
      console.log(`Removing event ${eventId} from calendar: ${calendarId}`);
    }
  };

  static newEvent() {
    console.log("Creating new calendar event");
    return {};
  }

  static newEventSource() {
    console.log("Creating new event source");
    return {};
  }

  static newEventOrganizer() {
    console.log("Creating new event organizer");
    return {};
  }

  static CalendarList = {
    list: function (options) {
      console.log("Listing calendars with options:", options);
      return { items: [] }; // Default empty response
    }
  };

  static Calendars = {
    insert: function (calendar) {
      console.log("Inserting new calendar", calendar);
      return calendar; // Return the calendar for demonstration
    }
  };

  static Settings = {
    get: function (setting) {
      console.log(`Getting calendar setting: ${setting}`);
      return { value: 'UTC' }; // Default timezone
    }
  };
}

// Stub for MailApp
class MailAppStub {
  static sendEmail(message) {
    console.log("Sending email with message:", message);
  }
}

// Stub for UrlFetchApp
class UrlFetchAppStub {
  static fetch(url, options) {
    console.log(`Fetching URL: ${url} with options:`, options);
    return {
      getResponseCode: function () {
        return 200; // Default response code
      },
      getContentText: function () {
        return ""; // Default empty content
      }
    };
  }
}

// Stub for Utilities
class UtilitiesStub {
  static computeDigest(algorithm, value, charset) {
    console.log(`Computing digest with algorithm: ${algorithm}, value: ${value}, charset: ${charset}`);
    return new Uint8Array(); // Default empty digest
  }

  static formatDate(date, timeZone, format) {
    console.log(`Formatting date: ${date} with timeZone: ${timeZone} and format: ${format}`);
    return date.toISOString(); // Default ISO string
  }

  static DigestAlgorithm = {
    MD5: 'MD5'
  };

  static Charset = {
    UTF_8: 'UTF-8'
  };

  static sleep(milliseconds) {
    console.log(`Sleeping for ${milliseconds} milliseconds`);
  }
}

const dateFormat = "YYYY/MM/DD";
const reportOverallFailure = false;
module.exports = {
  ScriptAppStub,
  PropertiesServiceStub,
  CalendarStub,
  LoggerStub,
  MailAppStub,
  UrlFetchAppStub,
  UtilitiesStub,
  dateFormat,
  reportOverallFailure
};
// Now you can use these stubs in your code for testing purposes