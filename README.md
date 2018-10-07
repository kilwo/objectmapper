# ObjectMapper
Simple Javascript Object Mapper

Provides fluent API for mapping properites from one JavaScript object to another. 

## Basic Usage

1. Include the Module

```javascript
var ObjectMapper = require("./objectmapper");
```

2. Specify the source object

```javascript
ObjectMapper.From(src)
```

3. Map the properties

Map method adds the mapping (source,dest) to the current mapper and returns the mapper.

The source of a mapping can be either a string denoting the path into the src object, or a function. In the case of a function, the mapper will call the function passing in the source object as the only parameter.

```javascript
	.Map("name", "fullname")
	.Map("dob.day", "my.dayofbirth")
	.Map((src) => {
		return src.age * 2;
	}, "age")
```

4. Execute the mapping:

To update an existing obejct

```javascript
	.Update(dest);
```

OR

To return a new object based only on the mappings

```javascript
	.ToNewObject();
```

## Examples

### Update an existing object
Only properties supplied in the map commands will be changed. all other properties in dest will remain untouched.

```javascript
ObjectMapper.From(src)
	.Map("name", "fullname")
	.Map("dob.day", "my.dayofbirth")
	.Map((src) => {
		return src.age * 2;
	}, "age")
	.Update(dest);
```

### Copy mapped fields into new object

```javascript
var res = ObjectMapper.From(src)
	.Map("name", "fullname")
	.Map("dob.day", "my.dayofbirth")
	.Map((src) => {
		return src.age * 2;
	}, "age")
	.ToNewObject();
```

### Using an object to supply mappings

Mappings are generated based on the supplied object. Destination object shape matches the template, the source locations are the template values. You can chain Map() and MapTemplate() calls to map a function.

```javascript
var res2 = ObjectMapper.From(src)
	.MapTemplate({
		fullname: "name", 
		my: { 
			dayofbirth: "dob.day" 
		}
	})
	.Map((src) => {
		return src.age * 2;
	}, "age")
	.ToNewObject();		//or .Update()
```

# License
ObjectMapper.js is freely distributable under the terms of the MIT license.