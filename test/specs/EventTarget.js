/*globals describe, it, expect, jasmine, beforeEach, spyOn*/
describe('ObjectEvent should', function() {
  /*globals ObjectEvent, ObjectEventTarget*/

  var Emitter;

  beforeEach(function() {
    Emitter = Object.create(ObjectEventTarget.prototype);
  });
 

  it('be available on global scope', function() {
    expect(ObjectEvent).toBeDefined();
  });

  it('throw an error if not using "new" operator', function() {
    expect(ObjectEvent).toThrow();
  });

  it('throw an error if construct with no arguments', function(){
    var result;
    try{
      new ObjectEvent();
      result = function(){};
    } catch(e){
      result = function(){
        throw e;
      };
    }
    expect(result).toThrow();
  });

  it('allow any value that can be parsed to a string as type parameter', function(){
    expect(new ObjectEvent('')).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent('a')).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent(0)).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent(1)).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent(null)).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent(undefined)).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent(true)).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent(false)).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent({})).toEqual(jasmine.any(ObjectEvent));
    expect(new ObjectEvent([])).toEqual(jasmine.any(ObjectEvent));
  });

  it('allow add detail property in the seccond param object', function(){
    var myObject = {};
    var event = new ObjectEvent('', { detail: myObject });
    expect(event).toEqual(jasmine.any(ObjectEvent));
    expect(event.detail).toBe(myObject);
  });

  describe('be ran ïnitEvent"', function(){
    it('when dispatching a event', function(){
      // Code coverage workaround:
      var event = new ObjectEvent('test');
      Emitter.dispatchEvent(event);

      // Now spy for testing:
      spyOn(ObjectEvent.prototype, 'initEvent');
      event = new ObjectEvent('test');
      Emitter.dispatchEvent(event);

      expect(ObjectEvent.prototype.initEvent).toHaveBeenCalled();
    });

    it('even when it\'s a native event', function(){
      // Code coverage workaround:
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('test', false, false, null);
      Emitter.dispatchEvent(event);

      // Now spy for testing:
      spyOn(ObjectEvent.prototype, 'initEvent');
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('test', false, false, null);
      Emitter.dispatchEvent(event);

      expect(ObjectEvent.prototype.initEvent).toHaveBeenCalled();
    });

    it('even when it\'s a literal object with type', function(){
      // Code coverage workaround:
      var event = {type: 'test'};
      Emitter.dispatchEvent(event);

      // Now spy for testing:
      spyOn(ObjectEvent.prototype, 'initEvent');
      event = {type: 'test'};
      Emitter.dispatchEvent(event);

      expect(ObjectEvent.prototype.initEvent).toHaveBeenCalled();
    });
  });

  describe('be able to ran "stopImmediatePropagation"', function(){
    it('and updated ïmmediatePropagationStopped"', function(){
      var event = new ObjectEvent('test');

      // False before it ran
      expect(event.immediatePropagationStopped).toBe(false);
      var listener = function(event){
        event.stopImmediatePropagation();
      };
      Emitter.addEventListener('test', listener);
      Emitter.dispatchEvent(event);

      // True outside
      expect(event.immediatePropagationStopped).toBe(true);

      // Now spy for testing:
      spyOn(ObjectEvent.prototype, 'stopImmediatePropagation');
      event = new ObjectEvent('test');
      Emitter.dispatchEvent(event);

      expect(ObjectEvent.prototype.stopImmediatePropagation).toHaveBeenCalled();
    });

    it('even when it\'s a native event', function(){
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('test', false, false, null);

      // False before it ran
      expect(event.immediatePropagationStopped).toBe(undefined);
      var listener = function(event){
        event.stopImmediatePropagation();
      };
      Emitter.addEventListener('test', listener);
      Emitter.dispatchEvent(event);

      // True outside
      expect(event.immediatePropagationStopped).toBe(true);

      // Now spy for testing:
      spyOn(ObjectEvent.prototype, 'stopImmediatePropagation');
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('test', false, false, null);
      Emitter.dispatchEvent(event);

      expect(ObjectEvent.prototype.stopImmediatePropagation).toHaveBeenCalled();
    });

    it('even when it\'s a literal object', function(){
      var event = {type: 'test'};

      // False before it ran
      expect(event.immediatePropagationStopped).toBe(undefined);
      var listener = function(event){
        event.stopImmediatePropagation();
      };
      Emitter.addEventListener('test', listener);
      Emitter.dispatchEvent(event);

      // True outside
      expect(event.immediatePropagationStopped).toBe(true);

      // Now spy for testing:
      spyOn(ObjectEvent.prototype, 'stopImmediatePropagation');
      event = {type: 'test'};
      Emitter.dispatchEvent(event);

      expect(ObjectEvent.prototype.stopImmediatePropagation).toHaveBeenCalled();
    });
  });

  
});