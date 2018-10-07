/**
 * ObjectMapper 
 * Provides simple fluent interface to support object mapping.
 *
 * MIT License
 * 
 * Copyright (c) 2018 Richard Wilkinson
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

/************************
 * Private Functions
 ************************/
function propertyFromObject(obj, property) {
	if(typeof obj === 'undefined') {
			return undefined;
	}

	var index = property.indexOf('.');
	if(index > -1) {
		var objectKey = property.substring(0, index);
		var childKey = property.substr(index + 1);
		return propertyFromObject(obj[objectKey], childKey);
	} else {
		return obj[property];
	}
}

function propertyIntoObject(obj, property, value) {
	if(typeof obj === 'undefined') {
		return;
	}

	var index = property.indexOf('.')
	if(index > -1) {
		var objectKey = property.substring(0, index);
		var childKey = property.substr(index + 1);

		obj[objectKey] = {};
		propertyIntoObject(obj[objectKey], childKey, value);
	} else {
		obj[property] = value;
	}
}

function isObject(val) {
	if (val === null) { 
		return false;
	}

	return ( (typeof val === 'function') || (typeof val === 'object') );
}

/****************************
 * Class Def: ObjectMapper
 ****************************/
module.exports = class ObjectMapper {

	constructor(sourceObj) {
		this.srcObj = sourceObj;
		this.mappings = [];
	}

	static From(sourceObj) {
		var mapper = new ObjectMapper(sourceObj);
		return mapper;
	}
 
	Map(sourceField, destField) {
		this.mappings.push({
			src: sourceField,
			dest: destField
		});
		return this;
	}

	MapTemplate(obj, prefix = "") {
		var keys = Object.keys(obj);
		for (var i=0; i<keys.length; i++) {
			var key = keys[i];
			var value = obj[key];
			if (isObject(value)) {
				this.MapTemplate(value, prefix + key + ".");
			} else {
				this.mappings.push({
					src: obj[key],
					dest: prefix + key
				});
			}
		}
		return this;
	}

	Update(destObj) {
		if (this.srcObj == null) {
			throw "Source object has not bee supplied.";
		}

		for (var i = 0; i < this.mappings.length; i++) {
			var mapping = this.mappings[i];
			var value = propertyFromObject(this.srcObj, mapping.src);
			propertyIntoObject(destObj, mapping.dest, value);
		}
		return destObj;
	}

	ToNewObject() {
		return this.Update({});
	}
}