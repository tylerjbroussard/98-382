var ClassKit = {
    Class: function (name, prototype, _extends) {
        var ctor = prototype.ctor, copy = function (value, queue) {

            if ('object' === typeof (value) && null !== value) {
                queue || (queue = []);

                for (var i = 0, j = queue.length; i < j; i++) {
                    if (queue[i].value === value) {
                        return queue[i].data;
                    }
                }

                var data = new (value.constructor), i = 0;
                if (value instanceof Array) {
                    for (var j = value.length; i < j; i++) {
                        data[i] = copy(value[i], queue);
                    }
                }
                else {
                    for (i in value) {
                        if ('_base' !== i && value.hasOwnProperty(i)) {
                            data[i] = copy(value[i], queue);
                        }
                    }
                }

                queue.push({ value: value, data: (value = data) });
            }
            return value;
        };
        window[name] = function () {
            for (var i in this) {
                if (/*this.hasOwnProperty(i) && */'object' === typeof (this[i])) {
                    this[i] = copy(this[i]);
                }
            }
            return ctor && ctor.apply(this, arguments) || this;
        };

        //        window[name] = prototype.ctor || function () {};

        if (window[_extends]) {
            window[name].prototype._base = {};
            for (var i in window[_extends].prototype) {
                var method = window[_extends].prototype[i];
                window[name].prototype[i] = method;
                window[name].prototype._base[i] = method;
            }

            for (var i in window[name].prototype._base) {
                if (ClassKit.IsFunction(window[name].prototype._base[i])) {
                    var method = window[name].prototype._base[i];
                    window[name].prototype._base[i] = function () {
                        return method.apply(arguments.callee.caller, arguments);
                    };
                }
            }
        }

        for (var i in prototype) {
            window[name].prototype[i] = prototype[i];
        }
        window[name].prototype.__type = name;
    },

    IsFunction: function (o) {
        try {
            return /^\s*\bfunction\b/.test(o);
        } catch (x) {
            return false;
        }
    }
};

ClassKit.Class('CmiValueObject', {
    __type: 'CmiValueObject',
    __cmiObject: true,
    readOnly: false,
    writeOnly: false,
    setOnlyOnce: undefined,
    SetOnlyOnce: function (setOnlyOnce) {
        this.setOnlyOnce = setOnlyOnce;
    },
    GetParent: function () {
        return this.parent;
    },
    SetParent: function (parent) {
        this.parent = parent;
        return this;
    },
    ReadOnly: function (boolValue) {
        this.readOnly = boolValue;
        return this;
    },
    IsReadOnly: function () {
        return this.readOnly;
    },
    WriteOnly: function (boolValue) {
        this.writeOnly = boolValue;
        return this;
    },
    IsWriteOnly: function () {
        return this.writeOnly;
    },
    GetValue: function () {
        return this.value;
    },
    SetValue: function (value) {
        if (this.value != undefined && this.setOnlyOnce) {
            throw "406";
        }
        this.value = value;
        return this;
    },
    ValidateLanguage: function (str) {
        var regexp = new RegExp('{lang=(.*?)(-(.*?))?}');
        if (regexp.test(str)) {
            var matches = str.match(regexp);
            if (!matches[1]) {
                throw "invalid";
            }
            if (matches[1] == 'exg' || matches[1] == 'frl' || matches[1] == 'ruq' || matches[1] == 'sp') {
                throw "invalid";
            }
            if (matches[1].length > 3) {
                if (matches[1][0] != 'i' && matches[1][0] != 'x') {
                    throw "invalid";
                }
            }
            return { code: matches[1], subCode: matches[3] };
        }
        return {};
    }
});
ClassKit.Class('CmiContainerObject', {
    __cmiContainerObject: true,
    GetProperty: function (name) {
        if (!this.properties) {
            this.peoperties = {};
        }

        if (this.properties[name] && this.properties[name].__cmiObject) {
            this.properties[name].SetParent(this);
        }
        return this.properties[name];
    },
    GetPropertyValue: function (key) {
        return this.GetProperty(key).GetValue();
    },
    SetPropertyValue: function (propertyName, value) {
        if (!this.properties) {
            this.peoperties = {};
        }

        if (this.properties[propertyName] && this.properties[propertyName].__cmiObject) {
            this.properties[propertyName].SetValue(value);
        }
    }
}, 'CmiValueObject');

ClassKit.Class('CmiString', {
    maxLength: 4000,
    SetMaxLength: function (maxLength) {
        this.maxLength = maxLength;
        return this;
    }
}, 'CmiValueObject');

ClassKit.Class('CmiState', {
    ctor: function (values, defaultValue) {
        this.values = values;
        this.value = defaultValue;
    },
    SetValue: function (value) {
        this.ValidateState(value, this.values);
        this.value = value;
        return this;
    },
    ValidateState: function (value, values) {
        var present = false;
        for (var i in values) {
            if (value == values[i]) {
                present = true;
            }
        }
        if (!present) {
            throw "406";
        }
    }
}, 'CmiValueObject');

ClassKit.Class('CmiDecimal', {
    maxValue: undefined,
    minValue: undefined,
    ctor: function (minValue, maxValue) {
        this.minValue = minValue;
        this.maxValue = maxValue;
    },
    SetValue: function (value) {
        var floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
            if (this.maxValue != undefined) {
                if (floatValue > this.maxValue) {
                    throw "407";
                }
            }
            if (this.minValue != undefined) {
                if (floatValue < this.minValue) {
                    throw "407";
                }
            }
            this.value = floatValue;
        } else {
            throw "406";
        }
        return this;
    }
}, 'CmiValueObject');

ClassKit.Class('CmiDatetime', {
    SetValue: function (value) {
        if (value) {
            var regexp = new RegExp('^(\\d{4})(-(\\d{2})(-(\\d{2})(T(\\d{2})(:(\\d{2})(:(\\d{2})(\\.(\\d{1,2})(((\\+|-)(\\d{2})(:(\\d{2}))?)?Z?)?)?)?)?)?)?)?$');
            if (regexp.test(value) && !value.match(/^\+|-$/)) {
                var matches = value.match(regexp);
                var year = matches[1];
                if (year) {
                    if (year < 1970 || year > 2038) {
                        throw "406";
                    }
                }
                var month = matches[3];
                if (month) {
                    if (month < 1 || month > 12) {
                        throw "406";
                    }
                }
                var day = matches[5];
                if (day) {
                    if (day < 1 || day > 31) {
                        throw "406";
                    }
                }
                var hour = matches[7];
                if (hour) {
                    if (hour < 0 || hour > 23) {
                        throw "406";
                    }
                }
                var minute = matches[9];
                if (minute) {
                    if (minute < 0 || minute > 59) {
                        throw "406";
                    }
                }
                var second = matches[11];
                if (second) {
                    if (second < 0 || second > 59) {
                        throw "406";
                    }
                }
                var aHour = matches[17];
                if (aHour) {
                    if (aHour < 0 || aHour > 23) {
                        throw "406";
                    }
                }
                var aMinute = matches[19];
                if (aMinute) {
                    if (aMinute < 0 || aMinute > 59) {
                        throw "406";
                    }
                }
                this.value = value;
                return this;
            }
        }

        throw "406";
    }

}, 'CmiValueObject');

ClassKit.Class('CmiTimestamp', {
    SetValue: function (value) {
        if (value) {
            var regexp = new RegExp('^P((\\d+Y)?(\\d+M)?(\\d+D)?(T((\\d+H)?(\\d+M)?(\\d+(\\.(\\d+))?S)?)+)?)+$');
            if (regexp.test(value) && value != 'P' && !value.match(/^.*?T$/)) {
                var matches = value.match(regexp);
                if (matches.length > 2) {
                    if (monthes) {
                        var monthes = parseInt(matches[2]);
                        if (monthes < 0 || monthes > 12) {
                            throw "406";
                        }
                    }
                }
                this.value = value;
                return this;
            }
        }

        throw "406";
    }

}, 'CmiValueObject');

ClassKit.Class('CmiScore', {
    ctor: function () {
        this.properties = {
            '_children': new CmiString().SetValue('min,max,scaled,raw').ReadOnly(true),
            'scaled': new CmiDecimal(-1.0, 1.0),
            'raw': new CmiDecimal(),
            'max': new CmiDecimal(),
            'min': new CmiDecimal()
        };
    },
    SetPropertyValue: function (key, value) {
        this.properties[key].SetValue(value);
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiId', {
    throwIfUndefined: false,
    ctor: function (parent, throwIfUndefined, maxLength) {
        this.parent = parent;
        this.throwIfUndefined = throwIfUndefined;
        this.maxLength = maxLength || 5;
    },
    SetValue: function (value) {
        if (value) {
            if (value == 'urn:') {
                throw "406";
            }

            var regexp = new RegExp(' ');
            if (regexp.test(value)) {
                throw "406";
            }
        } else {
            throw "406";
        }
        this.value = value;
    },
    GetValue: function () {
        if (this.throwIfUndefined && this.value == undefined) {
            throw "301";
        }
        return this.value;
    },
    IsValuePresent: function () {
        return this.value != undefined;
    }
}, 'CmiValueObject');



ClassKit.Class('CmiInteger', {
}, 'CmiValueObject');

ClassKit.Class('CmiLearnerResponse', {
    ctor: function (parent, type) {
        this.parent = parent;
        this.type = type;
    },
    ValidateTrueFalse: function (_var, str, isFillIn) {
        var regexp = new RegExp('{' + _var + '=(.*?)}');
        var matches = str.match(regexp);
        if (matches) {
            if (matches.length > 2) {
                throw "406";
            }
            if (matches[1] != 'true' && matches[1] != 'false' && isFillIn) {
                throw "406";
            }
        }
    },
    SetValue: function (value) {
        if (this.type.GetValue() == undefined) {
            throw "408";
        }
        if (value == undefined) {
            throw "351";
        }
        if (this.type.GetValue() != undefined) {
            switch (this.type.GetValue()) {
                case 'true-false':
                    if (value != 'true' && value != 'false') {
                        throw "406";
                    }
                    this.value = value;
                    break;
                case 'sequencing':
                    if (value.match(/^\[,\]/) || value.match(/\[\]/) || value.match(/\[\.\]/)) {
                        throw "406";
                    }
                    this.value = value;
                    break;
                case 'numeric':
                    var parts = value.split('[:]');
                    if (parts.length > 2) {
                        throw "406";
                    }
                    if (parts.length == 2) {
                        if ((isNaN(parts[0]) || isNaN(parts[1]))) {
                            throw "406";
                        } else {
                            var floatVal1 = parseFloat(parts[0]);
                            var floatVal2 = parseFloat(parts[1]);
                            if (floatVal1 > floatVal2) {
                                throw "406";
                            }
                        }
                    }
                    if (isNaN(parts[0])) {
                        throw "406";
                    }
                    this.value = value;
                    break;
                case 'choice':
                    if (value == '[,]' || value.match(/^\[,\]/) || value.match(/\[\]/)) {
                        throw "406";
                    }
                    var parts = value.split('[,]');
                    for (var i in parts) {
                        try {
                            this.ValidateLanguage(parts[i]);
                            this.ValidateTrueFalse('case_matters', parts[i], false);
                            this.ValidateTrueFalse('order_matters', parts[i], false);
                        } catch (e) {
                            throw "406";
                        }
                        for (var j in parts) {
                            if (parts[i] == parts[j] && j != i) {
                                throw "406";
                            }
                        }
                    }
                    if (parts.length > 36) {
                        throw "406";
                    }
                    this.value = value;
                    break;
                case 'fill-in':
                    var parts = value.split('[,]');
                    for (var i in parts) {
                        try {
                            var lang = this.ValidateLanguage(parts[i]);
                            this.ValidateTrueFalse('case_matters', parts[i], lang.code == undefined && i == 0);
                            this.ValidateTrueFalse('order_matters', parts[i], lang.code == undefined && i == 0);
                        } catch (e) {
                            throw "406";
                        }
                        var clean = parts[i].replace(/{.*?}/, '');
                        if (clean.length > 250) {
                            throw "406";
                        }
                    }
                    this.value = value;
                    break;
                case 'long-fill-in':
                    var parts = value.split('[,]');
                    for (var i in parts) {
                        try {
                            this.ValidateLanguage(parts[i]);
                            this.ValidateTrueFalse('case_matters', parts[i], true);
                            this.ValidateTrueFalse('order_matters', parts[i], true);
                        } catch (e) {
                            throw "406";
                        }
                    }
                    this.value = value;
                    break;
                case 'matching':
                    if (value.match(/^\[,\]/) || value.match(/\[\]/) || value.match(/\[.*?\]$/)) {
                        throw "406";
                    }

                    var parts = value.split('[,]');
                    for (var i in parts) {
                        var subParts = parts[i].split('[.]');
                        if (subParts.length != 2) {
                            throw "406";
                        } else {
                            try {
                                this.ValidateLanguage(subParts[0]);
                                this.ValidateTrueFalse('case_matters', subParts[0]);
                                this.ValidateTrueFalse('order_matters', subParts[0]);

                                this.ValidateLanguage(subParts[1]);
                                this.ValidateTrueFalse('case_matters', subParts[1]);
                                this.ValidateTrueFalse('order_matters', subParts[1]);
                            } catch (e) {
                                throw "406";
                            }
                        }
                    }
                    if (parts.length > 36) {
                        throw "406";
                    }
                    this.value = value;
                    break;
                case 'performance':
                    if (value.match(/^\[,\]/) || value.match(/\[\]/)) {
                        throw "406";
                    }
                    var parts = value.split('[,]');
                    for (var i in parts) {
                        var subParts = parts[i].split('[.]');
                        if (subParts.length > 2) {
                            throw "406";
                        }
                        for (var j in subParts) {
                            if (subParts[j] == 'uri.uri.uri') {
                                throw "406";
                            }
                            try {
                                this.ValidateLanguage(subParts[j]);
                                this.ValidateTrueFalse('case_matters', subParts[j], true);
                                this.ValidateTrueFalse('order_matters', subParts[j], true);
                            } catch (e) {
                                throw "406";
                            }
                        }
                    }
                    if (parts.length > 250) {
                        throw "406";
                    }
                    this.value = value;
                    break;
                case 'likert':
                    if (value.match(/\[.*?\]/)) {
                        throw "406";
                    }
                    this.value = value;
                    break;
                default:
                    this.value = value;
                    break;
            }
            return this;
        }
        throw "408";
    }
}, 'CmiValueObject');

ClassKit.Class('CmiCorrectResponse', {
    ctor: function (parent, index, type) {
        this.type = type;
        this.parent = parent;
        this.index = index;
        this.pattern = new CmiLearnerResponse(this, this.type);
    },
    GetPattern: function () {
        return this.pattern;
    },
    SetPropertyValue: function (key, value) {
        if (!this.parent.parent.GetId().IsValuePresent()) {
            throw "408";
        }
        if (this.type.GetValue() == undefined) {
            throw "408";
        }

        switch (this.type.GetValue()) {
            case 'true-false':
            case 'numeric':
            case 'other':
            case 'likert':
                if (this.index > 0) {
                    throw "351";
                }
                break;

            case 'choice':
                if (this.index > 9) {
                    throw "351";
                }
                var items = this.parent.GetItems();
                for (var i in items) {
                    if (items[i].GetPattern().GetValue() == value && i != this.index) {
                        throw "351";
                    }
                }
                break;

            case 'fill-in':
                if (this.index > 9) {
                    throw "351";
                }
                break;

            case 'performace':
                if (this.index > 124) {
                    throw "351";
                }
                break;

            case 'sequencing':
                if (this.index > 35) {
                    throw "351";
                }
                break;
        }

        if (key == 'pattern') {
            this.pattern.SetValue(value);
            this.parent.PutItem(this.index, this);
            return;
        }
        throw "351";
    },
    GetProperty: function (key) {
        return this[key];
    },
    GetPropertyValue: function (key) {
        if (!this.parent.parent.GetId().IsValuePresent()) {
            throw "301";
        }
        if (this.type.GetValue() == undefined) {
            throw "301";
        }
        if (this[key].GetValue() == undefined) {
            throw "301";
        }
        return this[key].GetValue();
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiCorrectResponses', {
    ctor: function (parent, type) {
        this.parent = parent;
        this.type = type;
        this.items = [];
    },
    GetItems: function () {
        return this.items;
    },
    PutItem: function (index, item) {
        this.items[index] = item;
    },
    GetProperty: function (key) {
        if (key == '_children') {
            return new CmiString().SetValue('pattern').ReadOnly(true);
        }
        if (key == '_count') {
            return new CmiInteger().SetValue(this.items.length).ReadOnly(true);
        }
        if (this.items[key] == undefined) {
            var i = parseInt(key);
            if (i != 0 && i > this.items.length) {
                throw "351";
            }
            return new CmiCorrectResponse(this, this.items.length, this.type);
        } else {
            return this.items[key];
        }
        return this._base.GetProperty(key);
    },
    SetPropertyValue: function (key, value) {
        throw "404";
    },
    SetValue: function (value) {
        throw "401";
    },
    GetValue: function () {
        throw "401";
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiObjectiveReference', {
    ctor: function (parent, index) {
        this.parent = parent;
        this.index = index;
        this.id = new CmiId(this, true);
    },
    GetId: function () {
        return this.id;
    },
    SetPropertyValue: function (key, value) {
        if (!this.parent.parent.GetId().IsValuePresent()) {
            throw "408";
        }
        if (key == 'id') {
            var oldId = this.id;

            if (!value || value.length < 5) {
                throw "406";
            }

            var items = this.GetParent().GetItems();
            for (var i in items) {
                if (items[i].GetId().GetValue() == value && i != this.index) {
                    throw "351";
                }
            }
            this.id.SetValue(value);
            this.GetParent().PutItem(this.index, this);
            return;
        }
        throw "351";
    },
    GetProperty: function (key) {
        return this[key];
    },
    GetPropertyValue: function (key) {
        if (!this.parent.parent.GetId().IsValuePresent()) {
            throw "301";
        }
        return this[key].GetValue();
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiObjectiveReferences', {
    ctor: function (parent) {
        this.parent = parent;
        this.items = [];
    },
    GetItems: function () {
        return this.items;
    },
    PutItem: function (index, item) {
        this.items[index] = item;
    },
    GetProperty: function (key) {
        if (key == '_children') {
            return new CmiString().SetValue('id').ReadOnly(true);
        }
        if (key == '_count') {
            return new CmiInteger().SetValue(this.items.length).ReadOnly(true);
        }
        if (this.items[key] == undefined) {
            var i = parseInt(key);
            if (i != 0 && i > this.items.length) {
                throw "351";
            }
            return new CmiObjectiveReference(this, this.items.length);
        } else {
            return this.items[key];
        }
        return this._base.GetProperty(key);
    },
    SetPropertyValue: function (key, value) {
        throw "404";
    },
    SetValue: function (value) {
        throw "401";
    },
    GetValue: function () {
        throw "401";
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiInteraction', {
    GetId: function () {
        return this.id;
    },
    ctor: function (parent, index) {
        this.parent = parent;
        this.index = index;
        this.id = new CmiId(this, true, 4).SetParent(this);
        this.timestamp = new CmiDatetime().SetParent(this);
        this.weighting = new CmiDecimal().SetParent(this);
        this.objectives = new CmiObjectiveReferences(this);
        this.result = new CmiState(["correct", "incorrect", "unanticipated", "neutral", "$real"]).SetParent(this);
        this.result_real = undefined;
        this.latency = new CmiTimestamp().SetParent(this);
        this.description = new CmiString().SetParent(this);
        this.type = new CmiState(['true-false', 'choice', 'fill-in', 'long-fill-in', 'likert', 'matching', 'performance', 'sequencing', 'numeric', 'other']).SetParent(this);
        this.learner_response = new CmiLearnerResponse(this, this.type).SetParent(this);
        this.correct_responses = new CmiCorrectResponses(this, this.type);
    },
    ValidLearnerResponseAccordingToType: function (value) {
        // 4.2.9.2 Learner Response Data Model Element Specifics (p. 140)
        // This section defines the requirements of the data model value for characterstring defined by the learner_response
        // according to the type, we can also check the value inside the string - but for now, we'll just verify this is a string
        return (typeof value === 'string' || value instanceof String);
    },
    SetPropertyValue: function (key, value) {
        if (key == 'learner_response' && (!this.id.IsValuePresent() || this.type.GetValue() == undefined)) {
            throw "408";
        }
        if (key == 'learner_response') {
            if (!this.ValidLearnerResponseAccordingToType(value)) {
                throw "406";
            }
        }
        if (key == 'id') {
            this.id.SetValue(value);
            this.GetParent().PutItem(this.index, this);
        } else {
            if (!this.id.IsValuePresent()) {
                throw "408";
            }
            if (key == 'result') {
                var floatVal = parseFloat(value);
                if (isNaN(floatVal)) {
                    this.result.SetValue(value);
                    this.result_real = undefined;
                } else {
                    this.result.SetValue('$real');
                    if (value.match(/,/)) {
                        throw "406";
                    }
                    this.result_real = value;
                }
            }
            else {
                if (this[key] && this[key].__cmiObject) {
                    this[key].SetValue(value);
                }
                if (key == 'type') {
                    this.learner_response = new CmiLearnerResponse(this, this.type).SetParent(this);
                    this.correct_responses = new CmiCorrectResponses(this, this.type);
                }
            }
        }
    },
    GetProperty: function (key) {
        if (key == 'id') {
            return this.id;
        }
        return this[key];
    },
    GetPropertyValue: function (key) {
        if (key != 'id' && !this.id.IsValuePresent()) {
            throw "301";
        }
        if (key == 'learner_response') {
            if (this.type.GetValue() == undefined) {
                throw "403";
            }
        }
        if (key == 'result') {
            if (this.result.GetValue() == '$real') {
                return this.result_real;
            } else {
                return this.result.GetValue();
            }
        }
        return this[key].GetValue();
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiInteractionArray', {
    ctor: function () {
        this.items = [];
    },
    GetItems: function () {
        return this.items;
    },
    PutItem: function (index, item) {
        this.items[index] = item;
    },
    GetProperty: function (key) {
        if (key == '_children') {
            return new CmiString().SetValue('description,id,type,objectives,timestamp,result,learner_response,weighting,latency,correct_responses').ReadOnly(true);
        }
        if (key == '_count') {
            return new CmiInteger().SetValue(this.items.length).ReadOnly(true);
        }
        if (this.items[key] == undefined) {
            var i = parseInt(key);
            if (i != 0 && i > this.items.length) {
                throw "351";
            }
            return new CmiInteraction(this, this.items.length);
        } else {
            return this.items[key];
        }
        return this._base.GetProperty(key);
    },
    SetPropertyValue: function (key, value) {
        throw "404";
    },
    SetValue: function (value) {
        throw "401";
    },
    GetValue: function () {
        throw "401";
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiObjective', {
    id: undefined,
    index: undefined,
    description: undefined,
    score: undefined,
    completion_status: undefined,
    progress_measure: undefined,
    _children: undefined,
    success_status: undefined,
    GetId: function () {
        return this.id;
    },
    ctor: function (parent, index) {
        this.parent = parent;
        this.index = index;
        this.id = new CmiId(this, true);
        this._children = new CmiString('success_status,progress_measure,description,id,completion_status,score').ReadOnly(true);
        this.success_status = new CmiState(["passed", "failed", "unknown"]);
        this.completion_status = new CmiState(["completed", "incomplete", "not attempted", "unknown"]);
        this.description = new CmiString(250);
        this.score = new CmiScore();
        this.progress_measure = new CmiDecimal(0.0, 1.0);
    },
    SetPropertyValue: function (key, value) {
        if (key == 'id') {
            var oldId = this.id;
            if (oldId.IsValuePresent() && oldId.GetValue() != value) {
                throw "351";
            }

            var objectives = this.GetParent().GetObjectives();
            for (var i in objectives) {
                if (objectives[i].GetId().GetValue() == value && i != this.index) {
                    throw "351";
                }
            }
            this.id.SetValue(value);
            this.success_status.SetValue('unknown');
            this.completion_status.SetValue('unknown');
            this.GetParent().PutObjective(this.index, this);
        } else {
            if (!this.id.IsValuePresent()) {
                throw "408";
            }
            if (this[key] && this[key].__cmiObject) {
                this[key].SetValue(value);
            }
        }
    },
    GetProperty: function (key) {
        if (key != 'id' && !this.id.IsValuePresent()) {
            throw "notfound";
        }
        return this[key];
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiObjectiveArray', {
    objectives: [],
    GetObjectives: function () {
        return this.objectives;
    },
    PutObjective: function (index, objective) {
        this.objectives[index] = objective;
    },
    GetProperty: function (key) {
        if (key == '_children') {
            return new CmiString().SetValue('success_status,progress_measure,description,id,completion_status,score').ReadOnly(true);
        }
        if (key == '_count') {
            return new CmiInteger().SetValue(this.objectives.length).ReadOnly(true);
        }
        if (this.objectives[key] == undefined) {
            var i = parseInt(key);
            if (i != 0 && i > this.objectives.length) {
                throw "351";
            }
            return new CmiObjective(this, this.objectives.length);
        } else {
            return this.objectives[key];
        }
        return this._base.GetProperty(key);
    },
    SetPropertyValue: function (key, value) {
        throw "404";
    },
    SetValue: function (value) {
        throw "401";
    },
    GetValue: function () {
        throw "401";
    }
}, 'CmiContainerObject');

ClassKit.Class('AdlItem', {
    id: undefined,
    store: undefined,
    _children: undefined,
    parent: undefined,
    allowRead: undefined,
    allowWrite: undefined,
    GetId: function () {
        return this.id;
    },
    ctor: function (parent, index) {
        this.parent = parent;
        this.index = index;
        this.isNew = true;
        this.id = new CmiString(4000).ReadOnly(true).SetParent(this);
        this._children = new CmiString().SetValue('id,store').ReadOnly(true);
        this.allowRead = new CmiString().SetValue('true').SetParent(this);
        this.allowWrite = new CmiString().SetValue('true').SetParent(this);
        this.store = new CmiString(64000).SetParent(this);
    },
    SetPropertyValue: function (key, value, isInit) {
        if (this[key] && this[key].__cmiObject) {
            if (this[key].IsReadOnly() && key == 'store' && !isInit) {
                throw "403";
            }
            if (key == 'store' && this.id.GetValue() == undefined && !isInit) {
                throw "351";
            }

            this[key].SetValue(value);

            if (key == 'id') {
                this.isNew = false;
                this.GetParent().AddItem(this.index, this);
            }
        }
    },
    GetPropertyValue: function (key) {
        if (this.isNew && this.id.GetValue() == undefined) {
            throw "301";
        }
        if (key == 'store') {
            if (this.store.GetValue() == undefined || this.store.GetValue() == '') {
                throw "403";
            }
        }
        return this[key].GetValue();
    },
    GetProperty: function (key, isInit) {
        if (!isInit) {
            if (key == 'store') {
                if (this.allowRead.GetValue() == 'false') {
                    this.store.WriteOnly(true);
                }

                if (this.allowWrite.GetValue() == 'false') {
                    this.store.ReadOnly(true);
                }
                return this.store;
            }
            if (this[key] && this[key].__cmiObject) {
                this[key].SetParent(this);
            }
        }
        this[key].SetParent(this);
        return this[key];
    }
}, 'CmiContainerObject');

ClassKit.Class('AdlData', {
    ctor: function () {
        this.items = [];
    },
    GetItems: function () {
        return this.items;
    },
    AddItem: function (index, item) {
        this.items[index] = item;
    },
    GetProperty: function (key, isInit) {
        if (key == '_children') {
            return new CmiString().SetValue('id,store').ReadOnly(true);
        }
        if (key == '_count') {
            return new CmiInteger().SetValue(this.items.length).ReadOnly(true);
        }
        if (this.items[key] == undefined) {
            return new AdlItem(this, key);
        } else {
            return this.items[key];
        }
        return this._base.GetProperty(key);
    },
    SetPropertyValue: function (key, value) {
        throw "404";
    },
    SetValue: function (value) {
        throw "401";
    },
    GetValue: function () {
        throw "401";
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiComment', {
    ctor: function (parent, index) {
        this.parent = parent;
        this.index = index;
        this.location = new CmiString().SetParent(this).ReadOnly(parent.IsReadOnly());
        this.timestamp = new CmiDatetime().SetParent(this).ReadOnly(parent.IsReadOnly());
        this.comment = new CmiString(4000).SetParent(this).ReadOnly(parent.IsReadOnly());
    },
    GetId: function () {
        return this.id;
    },
    SetPropertyValue: function (key, value) {
        if (this.parent.IsReadOnly()) {
            throw "404";
        }
        if (this[key] && this[key].__cmiObject) {
            try {
                this.ValidateLanguage(value);
            } catch (e) {
                throw "406";
            }
            this[key].SetValue(value);
            this.parent.PutItem(this.index, this);
        }
    },
    GetProperty: function (key) {
        return this[key];
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiComments', {
    ctor: function () {
        this.items = [];
    },
    GetItems: function () {
        return this.items;
    },
    PutItem: function (index, item) {
        this.items[index] = item;
    },
    GetProperty: function (key) {
        if (key == '_children') {
            return new CmiString().SetValue('location,comment,timestamp').ReadOnly(true);
        }
        if (key == '_count') {
            return new CmiInteger().SetValue(this.items.length).ReadOnly(true);
        }
        if (this.items[key] == undefined) {
            var i = parseInt(key);
            if (i != 0 && i > this.items.length) {
                throw "351";
            }
            return new CmiComment(this, this.items.length);
        } else {
            return this.items[key];
        }
        return this._base.GetProperty(key);
    },
    SetPropertyValue: function (key, value) {
        throw "401";
    },
    SetValue: function (value) {
        throw "401";
    },
    GetValue: function () {
        throw "401";
    }
}, 'CmiContainerObject');

ClassKit.Class('AdlRequestValidActivity', {
    GetProperty: function (key) {
        return new CmiString().ReadOnly(true).SetValue('true');
    }
}, 'CmiContainerObject');

ClassKit.Class('AdlRequestValid', {
    _next: undefined,
    _prev: undefined,
    _chice: undefined,
    ctor: function () {
        this._next = new CmiString().ReadOnly(true);
        this._prev = new CmiString().ReadOnly(true);
        this._chice = new CmiString().ReadOnly(true);
    },

    GetProperty: function (key) {
        if (key == 'continue') {
            return this._next;
        }
        if (key == 'previous') {
            return this._prev;
        }
        if (key == 'chice') {
            return this._chice;
        }
        if (key == 'jump') {
            return 'false';
        }
        return new AdlRequestValidActivity();
    }
}, 'CmiContainerObject');

ClassKit.Class('AdlRequest', {
    ctor: function (values, defaultValue) {
        this.values = values;
        this.value = defaultValue;
    },
    GetValue: function () {
        return this.value;
    },
    SetValue: function (value) {
        this.ValidateState(value, this.values)
        this.value = value;
        return this;
    },
    ValidateState: function (value, values) {
        var present = false;
        var regexp = new RegExp('{target=(.*?)}');
        var matches = value.match(regexp);
        if (matches && matches[1]) {
            present = true;
        } else {
            for (var i in values) {
                if (value == values[i]) {
                    present = true;
                }
            }
        }
        if (!present) {
            throw "406";
        }
    }
}, 'CmiValueObject');

ClassKit.Class('CmiLearnerPreference', {
    ctor: function () {
        this._children = new CmiString().ReadOnly(true).SetValue('audio_level,language,delivery_speed,audio_captioning');
        this.audio_level = new CmiDecimal(0).SetParent(this).SetValue(1);
        this.language = new CmiString().SetParent(this);
        this.delivery_speed = new CmiDecimal(0).SetParent(this).SetValue(1);
        this.audio_captioning = new CmiState(['-1', '0', '1']).SetValue('0');
    },
    SetPropertyValue: function (key, value) {
        if (this[key] && this[key].__cmiObject) {
            this[key].SetValue(value);
        }
    },
    GetProperty: function (key) {
        return this[key];
    },
    SetValue: function (value) {
        throw "401";
    },
    GetValue: function () {
        throw "401";
    }
}, 'CmiContainerObject');

ClassKit.Class('CmiSession', {
    SetPropertyValue: function (key, value, isInit) {
        if (key == 'completion_status' || key == 'success_status' || key == 'score' || key == 'progress_measure') {
            this.CheckMeasureAndCompletion();
        }
        if (this.properties.cmi[key]) {
            this.properties.cmi[key].SetValue(value);
        }
    },
    GetPropertyValue: function (key) {
        //TODO: Temporary commented. It try to change status in get value process. 
        if (key == 'completion_status' || key == 'success_status' || key == 'score' || key == 'progress_measure') {
            this.CheckMeasureAndCompletion();
        }
        if (this.properties.cmi[key]) {
            return this.properties.cmi[key].GetValue();
        }
    },
    CheckMeasureAndCompletion: function () {
        var completedByMeasure = this.properties.core.completed_by_measure.GetValue();
        var satisfiedByMeasure = this.properties.core.satisfied_by_measure.GetValue();
        if (completedByMeasure == 'True') {
            var completionThreshold = parseFloat(this.properties.cmi.completion_threshold.GetValue());
            var progressMeasure = parseFloat(this.properties.cmi.progress_measure.GetValue());
            //$('#debug').append('<p>Completed ' + progressMeasure + ' ' + completionThreshold + '</p>');
            if (!isNaN(progressMeasure) && !isNaN(completionThreshold)) {
                if (progressMeasure >= completionThreshold) {
                    this.properties.cmi.completion_status.SetValue('completed');
                } else {
                    this.properties.cmi.completion_status.SetValue('incomplete');
                }
            } else {
                // debugger;
                //TODO: Temporary commented. It try to change 'not attempted' status to unknown without any reason
                if (this.properties.cmi.completion_status.value != 'incomplete') {
                    // debugger;
                    this.properties.cmi.completion_status.SetValue('unknown');
                }
            }
            //$('#debug').append('<p>Completed ' + this.properties.cmi.completion_status.GetValue() + '</p>');
            CmiData['cmi.completion_status'] = this.properties.cmi.completion_status.GetValue();
            try {
                PostObjects['cmi.completion_status'] = this.properties.cmi.completion_status.GetValue();
            }
            catch (e) { }
        }

        if (satisfiedByMeasure == 'True') {
            var scaledPassingScore = parseFloat(this.properties.cmi.scaled_passing_score.GetValue());
            var scaledScore = parseFloat(this.properties.cmi.score.GetProperty('scaled').GetValue());
            //$('#debug').append('<p>Satisfied ' + scaledScore + ' ' + scaledPassingScore + '</p>');
            if (!isNaN(scaledScore) && !isNaN(scaledPassingScore)) {
                if (scaledScore >= scaledPassingScore) {
                    this.properties.cmi.success_status.SetValue('passed');
                } else {
                    this.properties.cmi.success_status.SetValue('failed');
                }
            } else {
                this.properties.cmi.success_status.SetValue('unknown');
            }
            //$('#debug').append('<p>Satisfied ' + this.properties.cmi.success_status.GetValue() + '</p>');
            CmiData['cmi.success_status'] = this.properties.cmi.success_status.GetValue();
            try {
                PostObjects['cmi.success_status'] = this.properties.cmi.success_status.GetValue();
            }
            catch (e) { }
        }
    },
    ctor: function (values) {
        this.comments_from_lms = new CmiComments().ReadOnly(true);
        this.comments_from_learner = new CmiComments();
        this.properties = {
            'core': {
                'completed_by_measure': new CmiString().ReadOnly(true).SetValue('False'),
                'satisfied_by_measure': new CmiString().ReadOnly(true).SetValue('False')
            },
            'cmi': {
                '_version': new CmiString().ReadOnly(true).SetValue('1.0'),
                'comments_from_lms': this.comments_from_lms,
                'comments_from_learner': this.comments_from_learner,
                'credit': new CmiState(["credit", "no_credit"]).ReadOnly(true),
                'completion_status': new CmiState(["completed", "incomplete", "not attempted", "unknown"]).SetParent(this),
                'completion_threshold': new CmiDecimal(0.0, 1.0).ReadOnly(true),
                'entry': new CmiState(["ab-initio", "resume", ""]).ReadOnly(true),
                'exit': new CmiState(["time-out", "suspend", "logout", "normal", ""]).WriteOnly(true),
                'interactions': new CmiInteractionArray(),
                'launch_data': new CmiString(4000).ReadOnly(true),
                'learner_id': new CmiString().ReadOnly(true),
                'learner_name': new CmiString().ReadOnly(true),
                'learner_preference': new CmiLearnerPreference(),
                'location': new CmiString(),
                'max_time_allowed': new CmiTimestamp().ReadOnly(true),
                'mode': new CmiState(["browse", "normal", "review"]).ReadOnly(true),
                'objectives': new CmiObjectiveArray(),
                'progress_measure': new CmiDecimal(0.0, 1.0).SetParent(this),
                'scaled_passing_score': new CmiDecimal(-1.0, 1.0).SetParent(this),
                'score': new CmiScore(),
                'session_time': new CmiTimestamp().WriteOnly(true),
                'success_status': new CmiState(["passed", "failed", "unknown"]).SetParent(this),
                'suspend_data': new CmiString(64000),
                'time_limit_action': new CmiState(["exit,message", "continue,message", "exit,no message", "continue,no message"]).ReadOnly(true),
                'total_time': new CmiTimestamp().ReadOnly(true),
                'scaled_passing_score': new CmiDecimal().ReadOnly(true)
            },

            'adl': {
                'data': new AdlData(),
                'nav': {
                    'request': new AdlRequest(["continue", "previous", "choice", "exit", "exitAll", "abandon", "abandonAll", "suspendAll", "_none_"]),
                    'request_valid': new AdlRequestValid()
                }
            }
        };


    },
    Init: function (values) {
        if (values) {
            for (var i in values) {
                try {
                    var object = this.FindObject(i, true);
                    if (object) {
                        if (object.GetParent()) {
                            var chain = this.GetKeysChain(i);
                            object.GetParent().SetPropertyValue(chain[chain.length - 1], values[i], true);
                        } else {
                            object.SetValue(values[i]);
                        };
                    }
                } catch (e) {
                }
            }
        }
    },
    GetKeysChain: function (key) {
        if (key) {
            return key.split('.');
        }
        return {};
    },
    FindObject: function (key, isInit) {
        var chain = this.GetKeysChain(key);
        var currentObject = false;
        if (chain.length > 1) {
            currentObject = this;
            for (i = 0; i < chain.length; i++) {
                if (currentObject != undefined) {
                    if (currentObject.__cmiContainerObject) {
                        currentObject = currentObject.GetProperty(chain[i], isInit);
                    } else if (currentObject[chain[i]]) {
                        currentObject = currentObject[chain[i]];
                    } else {
                        throw "notfound";
                    }
                }
            }
        }
        return currentObject;
    },
    TrySetValue: function (key, value) {
        if (key == "") {
            throw "351";
        }
        var currentObject = false;
        try {
            currentObject = this.FindObject(key);
        } catch (e) {
            if (e != "408") {
                throw "351";
            }
            throw e;
        }
        // debugger;
        if (key == 'cmi.progress_measure' && value == '0.9') {
            // debugger;
        }
        // debugger;
        if (currentObject && currentObject.__cmiObject && !currentObject.__cmiContainerObject) {
            if (currentObject.IsReadOnly()) {
                throw "404";
            }
            if (currentObject.GetParent()) {
                var chain = this.GetKeysChain(key);
                currentObject.GetParent().SetPropertyValue(chain[chain.length - 1], value);
                try {
                    CmiData[key] = currentObject.GetParent().GetPropertyValue(chain[chain.length - 1]);
                } catch (e) { }
                return true;
            }
            currentObject.SetValue(value);
            try {
                CmiData[key] = currentObject.GetValue();
            } catch (e) { }
            return true;
        }
        throw "401";
    },
    TryGetValue: function (key) {
        if (key == "") {
            throw "301";
        }
        var currentObject = false;
        try {
            currentObject = this.FindObject(key);
        } catch (e) {
            if (e != "408") {
                throw "301";
            }
            throw e;
        }
        if (key == 'cmi.completion_status') {
            // debugger;
        }
        if (currentObject && currentObject.__cmiObject) {
            if (currentObject.IsWriteOnly()) {
                throw "405";
            }
            var value = undefined;
            if (currentObject.GetParent()) {
                var chain = this.GetKeysChain(key);
                value = currentObject.GetParent().GetPropertyValue(chain[chain.length - 1]);
            } else {
                value = currentObject.GetValue();
            }
            if (value == undefined) {
                throw "403";
            }
            return value;
        }
        throw "401";
    }
}, 'CmiContainerObject');

CmiSessionFactory = {
    currentSession: undefined,
    Init: function () {
        this.currentSession = new CmiSession();
        this.currentSession.Init(CmiData || {});
        this.IsInitialized = true;
    },
    IsInitialized: false,
    GetCurrentSession: function () {
        return this.currentSession;
    }
};

var Errors = {
    "0": "No Error",
    "103": "Already Initialized",
    "104": "Content Instance Terminated",
    "111": "General Termination Failure",
    "112": "Termination Before Initialization",
    "113": "Termination After Termination",
    "122": "Retrieve Data Before Initialization",
    "123": "Retrieve Data After Termination",
    "132": "Store Data Before Initialization",
    "133": "Store Data After Termination",
    "142": "Commit Before Initialization",
    "143": "Commit After Termination",
    "201": "General Argument Error",
    "301": "General Get Failure",
    "351": "General Set Failure",
    "391": "General Commit Failure",
    "401": "Undefined Data Model Element",
    "403": "Data Model Element Value Not Initialized",
    "404": "Data Model Element Is Read Only",
    "405": "Data Model Element Is Write Only",
    "406": "Data Model Element Type Mismatch",
    "407": "Data Model Element Value Out Of Range",
    "408": "Data Model Dependency Not Established"
};
ResultStr = '';
IsFinished = false;
CmiSessionFactory.Init();

LMSSession = function () { };
LMSSession.prototype = {
    isIntialized: false,
    isTerminated: false,
    lastCommitStatus: true.toString(),
    lastErrorCode: "0",
    RaiseError: function (errorCode, ret) {
        //$('#debug').append('<b style="color:Red;">Raise Error with Code : `' + errorCode + ' (' + Errors[errorCode] + ')`</b><br/>');
        this.lastErrorCode = errorCode;
        return ret ? ret : "false";
    },
    IsRunning: function () {
        return this.isIntialized && !this.isTerminated;
    },

    Initialize: function (value) {
        //     $('#debug').append('<b>Initialize Method Invoked with Parameter : `' + value + '`</b><br/>');

        if (this.isIntialized && !this.isTerminated) {
            return this.RaiseError("103");
        }

        if (this.isTerminated) {
            return this.RaiseError("104");
        }

        if (value != "") {
            return this.RaiseError("201");
        }

        this.lastErrorCode = "0";
        this.isIntialized = true;
        return "true";
    },

    //    Terminate: function (value) {
    //        //  $('#debug').append('<b>Terminate Method Invoked with Parameter : `' + value + '`</b><br/>');
    //        if (value != "") {
    //            return this.RaiseError("201");
    //        }

    //        if (!this.isIntialized) {
    //            return this.RaiseError("");
    //        }

    // //       if (this.isTerminated) {
    //   //         return this.RaiseError("113");
    //    //    }
    //        this.isTerminated = true;

    //        if (CmiData['cmi.exit'] == "time-out" || CmiData['cmi.exit'] == "logout") {
    //            this.SetValue("adl.nav.request", "exitAll");
    //        }

    //        TerminateHandler(PostObjects);
    //        return "true";
    //    },

    Terminate: function (value) {
        //    $('#debug').append('<b>Terminate Method Invoked with Parameter : `' + value + '`</b><br/>');
        if (value != "") {
            return this.RaiseError("201");
        }

        if (!this.isIntialized) {
            return this.RaiseError("112");
        }

        if (this.isTerminated) {
            return this.RaiseError("113");
        }

        this.isTerminated = true;

        if (CmiData['cmi.exit'] == "time-out" || CmiData['cmi.exit'] == "logout") {
            this.SetValue("adl.nav.request", "exitAll");
        }

        PostObjects["cmi.score.raw"] = CmiData["cmi.score.raw"];

        var res = this.DelayedTerminate();
        if (res === true) {
            return "true";
        }
        else {
            return this.RaiseError("111");
        }
    },

    DelayedTerminate: function () {
        if (!window.TerminateHandler) {
            setTimeout(function () { API.DelayedTerminate(); }, 100);
        } else {
            var res = window.TerminateHandler(PostObjects);
        }
        return res;
    },


    IsValidForGet: function (key) {
        return ScromCmiDataService.IsValidForGet(key);
    },

    IsValidForGet: function (key, value) {
        return ScromCmiDataService.IsValidForGet(key, value);
    },

    GetValue: function (key) {
        //  $('#debug').append('<b style="color:Green">GetValue Method Invoked with Key : `' + key + '`</b><br/>');
        if (!this.isIntialized) {
            this.RaiseError("122");
            return "";
        }
        if (this.isTerminated) {
            this.RaiseError("123");
            return "";
        }

        try {
            var value = this.GetCmiSession().TryGetValue(key);
            this.lastErrorCode = "0";
            //    $('#debug').append('<b style="color:Green">GetValue Method Result : `' + value + '`</b><br/>');

            //-----------------------------------------------------------------------------------------------------
            //  Lesson Location variable - triggering event for annotation purposes (calls a function in LMS3.aspx)
            //-----------------------------------------------------------------------------------------------------
            if (key.indexOf("cmi.location") != -1 && value) {
                window.triggerEvent("AnnotationEvt.2004.Get", value);
            }

            return value;
        } catch (e) {
            //   $('#debug').append('<b style="color:Red;">GetValue Error : `' + e + ' (' + Errors[e] + ')`</b><br/>');
            this.lastErrorCode = e;
            return "";
        }
    },

    SetValue: function (key, value) {
        //  $('#debug').append('<b style="color:Blue">SetValue Method Invoked with Key : `' + key + '` and Value : `' + value + '`</b><br/>');

        if (!this.isIntialized) {
            return this.RaiseError("132");
        }

        if (this.isTerminated) {
            return this.RaiseError("133");
        }
        try {
            //-----------------------------------------------------------------------------------------------------
            //  Lesson Location variable - triggering event for annotation purposes (calls a function in LMS3.aspx)
            //-----------------------------------------------------------------------------------------------------
            if (key.indexOf("cmi.location") != -1 && value) {
                window.triggerEvent("AnnotationEvt.2004.Set", value);
            }

            this.GetCmiSession().TrySetValue(key, value);
            PostObjects[key] = value;
            if (key.indexOf("objectives") >= 0 || key.indexOf("interactions") >= 0) {
                var commonKeyPart = key.match(/cmi\.(objectives|interactions)\.\d+/)[0];
                //alert(key + " " + commonKeyPart + " " + CmiData[commonKeyPart + ".id"]);
                PostObjects[commonKeyPart + ".id"] = CmiData[commonKeyPart + ".id"];
            }
            this.lastErrorCode = "0";
            return "true";
        } catch (e) {
            //       $('#debug').append('<b style="color:Red;">SetValue Error : `' + e + ' (' + Errors[e] + ')`</b><br/>');
            this.lastErrorCode = e;
            return "false";
        }
    },

    Commit: function (value, forceCommit) {
        //    $('#debug').append('<b>Commit Method Invoked with Parameter : `' + value + '`</b><br/>');

        if (!this.isIntialized) {
            return this.RaiseError("142");
        }

        if (this.isTerminated) {
            return this.RaiseError("143");
        }

        if (value != "") {
            return this.RaiseError("201");
        }

        PostObjects["cmi.score.raw"] = CmiData["cmi.score.raw"];
        var returnValue = CommitHandler(PostObjects, forceCommit);
        this.lastErrorCode = returnValue == "true" ? "0" : "391";
        return returnValue;
    },

    GetLastError: function (value) {
        if (this.lastErrorCode == undefined) {
            this.lastErrorCode = "0";
        }
        return this.lastErrorCode;
    },
    GetErrorString: function (value) {

        if (Errors[value]) {
            return Errors[value];
        }
        return "";
    },
    GetDiagnostic: function (value) {
        return "diagnostic";
    },
    GetCmiSession: function () {
        return CmiSessionFactory.GetCurrentSession();
    },
    version: '1.0'
};

API_1484_11 = API = new LMSSession();

PostObjects = {};

var newTOC = new function () {
    var initialized = false;
    var hidden = false;

    this.initNewToc = function (primaryColor, isRtl) {
        adjustDisplay(primaryColor, isRtl);
        assignEvents();
        initialized = true;
        if (hidden) {
            $(".menuToc span.button").click();
            setTimeout(resizeIframe, 200);
        }
    }

    this.resizeIframe = function () {
        // it's initialized only when newToc is recognized
        if (initialized) {
            resizeIframe();
        }
    }

    this.hideMenuToc = function () {
        if (!initialized) {
            // fix bug with Network player that display the oldToc for a moment
            $(".menuToc").hide();
        }
    }

    /* special case in Network Player when the scorm2004 css file isn't loaded */
    function isCssFileLoaded() {
        return ($(".hideToc").width() == 30) || isTocVisibleAfterNotVisible();
    }

    /* toc displayed after terminate when previous sco toc wasn't displayed - BBVA evaluation courses */
    function isTocVisibleAfterNotVisible() {
        return ($(".hideToc").css('display') == $(".menuToc").css('display'));
    }

    function assignEvents() {
        // workaround to assign click only once, it relates to the fact that this code is ran every time the user clicks on a TOC's item
        if (!initialized) {
            $(document).on("click", ".hideToc span.button", function (e) {
                $(".hideToc").hide();
                $(".menuToc").show();
                hidden = false;
                resizeIframe();

            });
            $(document).on("click", ".menuToc span.button", function (e) {
                $(".menuToc").hide();
                $(".hideToc").show();
                hidden = true;
                resizeIframe();
            });
            $(document).ready(function () {
                initialTocMode();
            });
        } else {
            setTimeout(function () {
                if (isTocVisibleAfterNotVisible()) {
                    initialTocMode();
                } else {
                    resizeIframe();
                }
            }, 2000);
        }
    }

    function initialTocMode() {
        if (isCssFileLoaded()) {
            $(".menuToc span.button").click();
        } else {
            $(".hideToc").hide();
        }
    }

    function adjustDisplay(primaryColor, isRtl) {
        if (isCssFileLoaded()) {
            $(".menuToc").css("border-color", primaryColor);
            $(".menuToc .navigation-tree li").css("color", primaryColor);
            $(".hideToc").css("background-color", primaryColor);
            // for IE7
            $(".menuToc .navigation-tree li a").css("color", primaryColor);
            $(".menuToc .navigation-tree .selected a").css({ "color": "white", "background-color": primaryColor });
            $(".menuToc .navigationTitle").css("background-color", primaryColor);

            if (isRtl) {
                jQuery('html').attr('id', 'dir-rtl');
            }
        } else {
            $(".menuToc").show();
        }
    }

    function resizeIframe() {
        var w = $(window).width();
        var $menuToc = $(".menuToc");
        var $hideToc = $(".hideToc");
        var $iframe = $("#activityFrame");
        if ($menuToc.is(':visible')) {
            var newSize = Math.round(w - $menuToc.width() - 2);
            $iframe.width(newSize);
            setTimeout(function () {
                // when the page is reload with new sco, the iframe is replaced and need to re-set after the timeout
                var $iframe = $("#activityFrame");
                if ($iframe.length > 0 && $iframe[0].offsetTop >= $(window).height()) {
                    // iframe disappeared - probably it's too wide
                    newSize -= 4;
                }
                if ($iframe.width() != newSize && $(".menuToc").is(':visible')) {
                    $iframe.width(newSize);
                }
            }, 1000);
        } else {
            $iframe.width(w - $hideToc.width() - 1);
        }
        // relate to buttonsHolder
        // adjust height of tocMenu/tocHide/iframe
        var buttonsHeight = $('#buttonsHolder').height();
        var availableHeight = $(window).height() - buttonsHeight;
        $hideToc.height(availableHeight);
        $menuToc.height(availableHeight);
        $iframe.height(availableHeight);
        setTimeout(function () {
            var $iframe = $("#activityFrame");
            $iframe.height(availableHeight);
        }, 200);
    }
}