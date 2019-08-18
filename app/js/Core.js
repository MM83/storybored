export default window.__core__ || new function Core(){


	let cmds = {}, handlers = {};
	let flagHandlers = {};
	let onces = [], flags = {};

	let id = Math.round(Math.random()*999999);

	let self = this;

	self.setFlag = function(name, value)
	{

		var h = flagHandlers[name];

		if(h)
			for(var i in h)
				h[i](value);

		flags[name] = !!value;

	}

	self.getFlag = function(name, value)
	{
		return flags[name];
	}

	self.addCommand = function(name, command){
		cmds[name] = command;
	};

	self.removeCommand = function(name){
		if(cmds[name])
			delete cmds[name];
	};

	self.exec = function(name, data){
		var c = cmds[name];
		if(c)
			c(data);
	};

	self.addOnceEventListener = function(event, handler){
		this.addEventListener(event, handler);
		onces.push(handler);
	};
	self.removeOnceEventListener = function(event, handler){
		this.removeEventListener(event, handler);
		onces.splice(onces.indexOf(handler), 1);
	};

	self.addEventListener = function(event, handler){
		(handlers[event] = handlers[event] || []).push(handler);

	};

	self.addFlagListener = function (flag, handler) {
		(flagHandlers[flag] = flagHandlers[flag] || []).push(handler);
	};

	self.listEventListeners = function(event)
	{
		if(event)
		{
			console.log("HANDLER FOR", event);
			console.log(handlers[event]);
			return;
		}
		console.log("**** HANDLERS ****");
		console.log(handlers);

	}

	self.removeEventListener = function(event, handler){
		var h = handlers[event], i;
		if(h && (i = h.indexOf(handler)) != -1)
			h.splice(i, 1);
	};

	self.dispatchEvent = function(event, data){
		var h = handlers[event];
		if(!h)
			return;
		for(var i in h){
			h[i](data);
			var j = onces.indexOf(h[i]);
			if(j != -1){
				h.splice(i, 1);
				onces.splice(j, 1);
			}
		}
	};

	var responses = {};
	var onceResponces = [];

	self.respond = function(name, handler){
		(responses[name] = responses[name] || []).push(handler);
	};

	self.respondOnce = function(name, handler){
		self.respond(name, handler);
		onceResponces.push(handler);
	}

	self.retract = function(name, handler){
		var arr = responses[name];
		if(!arr)
			return;
		var index = arr.indexOf(handler);
		if(index == -1)
			return;
		arr.splice(index, 1);
	};

	self.query = function(name, data, handler){
		var resp = responses[name];
		var ret = [];
		if(resp)
			for(var i = 0; i < resp.length; ++i){
				var r = resp[i];
				ret.push(r(data));
				var j = onceResponces.indexOf(r);
				if(j != -1){
					resp.splice(i--, 1);
					onceResponces.splice(j, 1);
				}
			}
		if(handler)
			handler(ret);
		return ret[0];
	};

	window.__core__ = this;

	self.listAllCommands = function(){
		for(var i in cmds)
			console.log(i);
	};


	self.getUID = function() {
		let guid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
	    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	  );
	  return guid;
	}




};
