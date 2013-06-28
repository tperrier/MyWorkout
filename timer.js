var exercises = [
 {
	name:"Jumping Jacks",
	duration:45,
	rest:5
 },
 {
	name:"Wall Sit",
	duration:30,
	rest:5
 },
  {
	 name:"Push Ups",
	 duration:60,
	 rest:5
  },
  {
	 name:"One Leg Squat",
	 duration:40,
	 rest:5
  },
  {
	 name:"Triceps Dip",
	 duration:40,
	 rest:5
  },
  {
	 name:"Squat",
	 duration:40,
	 rest:5
  },
  {
	 name:"Plank",
	 duration:40,
	 rest:5
  },
  {
	 name:"High Knee",
	 duration:40,
	 rest:5
  },
  {
	 name:"Lunge",
	 duration:40,
	 rest:5
  },
  {
	 name:"T-Pushup",
	 duration:40,
	 rest:5
  },
  {
	 name:"Side Plank",
	 duration:40,
	 rest:5
  },{
	 name:"Crunches",
	 duration:90,
	 rest:5
  }
];

var Timer = function() {
	this.curDisp = new Exercise($('#current'));
	this.nextDisp = new Exercise($('#next'));
	
	this.count_down = $('#count-down');
	this.duration = 0;
	
	this.audio = {
		tick: new Audio('tick.ogg'),
		bell:new Audio('bell.ogg'),
		done:new Audio('done.ogg')
	};
	
	this.idx=0;
};

Timer.prototype = {
	start:function() {
		$('#display').show();
		$('#start-pause').hide();
		this.audio.tick.play();
		this.next();
	},
	tick:function(attr) {
		this.duration[attr] -= 1;
		this.audio.tick.play();
		if(this.duration[attr] < 0) {
			if(attr=='active')
			{
				this.curDisp.done();
				this.count_down.html(this.duration.rest);
				this.audio.bell.play();
				window.setTimeout('timer.tick("rest")',1000);
			}
			else {
				this.audio.bell.play();
				this.next();
			}
		}else {
			this.count_down.html(this.duration[attr]);
			window.setTimeout('timer.tick("'+attr+'")',1000);
		}
	},
	next:function() {
		this.curExer = this.curDisp.set(this.idx);
		this.nextExer = this.nextDisp.set(this.idx+1);
		if(!this.curExer) return this.done();
		this.duration = {active:this.curExer.duration,rest:this.curExer.rest};
		this.count_down.html(this.duration.active);
		window.setTimeout('timer.tick("active")',1000);
		this.idx+=1;
		console.log('next()');
	},
	done:function() {
		this.curDisp.name.html('DONE');
		this.audio.done.play();
	}
};

var Exercise = function (ele) {
	this.name = ele.find('.name');
	this.duration = ele.find('.duration');
	this.rest = ele.find('.rest');
};

Exercise.prototype = {
	set:function(idx) {
		var obj = exercises[idx];
		if(!obj) {
			this.clear();
			return null;
		}
		this.name.html(obj.name);
		this.duration.html(obj.duration);
		this.rest.html(obj.rest);
		return obj;
	},
	clear:function() {
		this.name.empty();
		this.duration.empty();
		this.rest.empty();
	},
	done:function() {
		this.name.append(' (REST)');
	}
};

var timer;
$( function () {
timer = new Timer();
$('#start-pause').click(function() {timer.start()});
	
}); // load on ready
