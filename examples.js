
var ObjectMapper = require("./objectmapper");

var src = {
	name: "Richard",
	age: 30,
	dob: {
		day: 01,
		month: 04
	}
};

var dest = {
	preserved: true
};

var template = {
	fullname: "name", 
	my: { 
		dayofbirth: "dob.day" 
	}
}

ObjectMapper.From(src)
	.Map("name", "fullname")
	.Map("dob.day", "my.dayofbirth")
	.Update(dest);

console.log(dest);

var res = ObjectMapper.From(src)
	.Map("name", "fullname")
	.Map("dob.day", "my.dayofbirth")
	.ToNewObject();

console.log(res);

var res2 = ObjectMapper.From(src)
	.MapTemplate(template)
	.ToNewObject();

console.log(res2);