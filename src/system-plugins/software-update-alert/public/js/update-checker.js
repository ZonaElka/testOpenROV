(function (window, $, undefined) {
  'use strict';

  $.postJSON = function(url, data, callback) {
    return jQuery.ajax({
      'type': 'POST',
      'url': url,
      'contentType': 'application/json',
      'data': JSON.stringify(data),
      'dataType': 'json',
      'success': callback
    });
  };

  function SoftwareUpdateChecker(config) {
    var self = this;

    self.getBranches = function(callback) {
      setTimeout(function() {
        $.get(config.dashboardUrl() + "/plugin/software/branches", callback );
      }, 3000);
    };

    self.checkForUpdates = function(callback){
      config.getSelectedBranches(function(selectedBranches){
        $.postJSON(
          config.dashboardUrl() + "/plugin/software/updates",
          selectedBranches,
          function(updates) {
            callback(updates);
          });
        });
      return { updates: false }
    };

    return self;
  }
  window.SoftwareUpdateChecker = SoftwareUpdateChecker;

}(window, jQuery));
