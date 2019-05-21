(function () {

  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  var NxBrowser = nx.declare('nx.Browser', {

  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxBrowser;
  }

}());
