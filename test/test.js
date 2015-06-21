var assert = require("assert");
var should = require("should");
var metalsmith = require('../scripts/metalsmith.js');
var Crawler = require("simplecrawler");

var crawler = new Crawler("localhost");

describe('Tests', function(){
  it('should run', function(){
    should(true).ok;
  });
});

describe('Build', function() {
  it('should run without error', function(done){
    metalsmith.build(function(err, files) {
      should.not.exist(err);
      done();
    });
  });
});

describe('Server', function() {
  it('should run without error', function(done){
    this.timeout(5000);
    metalsmith.server(function(err, files) {
      should.not.exist(err);
      done();
    });
  });
});

describe('Crawler', function() {
  crawler.initialPort = 8080;

  it('should complete without error', function(done) {
    crawler.start();
    crawler.on("complete", function(queueItem){
      done();
    });
  });

  it('should have a queue', function() {
    crawler.queue.should.be.an.Object();
  });

  it('should succeed', function() {
    crawler.queue[0].status.should.not.equal("failed");
  });
});

describe('Docs', function() {
  it('index should exist', function() {
    crawler.queue[0].status.should.not.equal("failed");
    crawler.queue[0].status.should.not.equal("notfound");
    console.log(crawler.queue);
  });
});

describe('Internal links', function() {
  it('should all succeed', function() {
    crawler.queue.countWithStatus("failed").should.equal(0);
  });

  it('should all return 200 OK', function() {
    crawler.queue.countWithStatus("notfound").should.equal(0);
  });
});
