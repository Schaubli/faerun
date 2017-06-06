'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The SmilesDrawer namespace.
 * @typicalname SmilesDrawer
 */
var SmilesDrawer = {
    Version: '1.0.0'
};

/**
 * Cleans a SMILES string (removes non-valid characters)
 *
 * @static
 * @param {String} smiles A SMILES string.
 * @returns {String} The clean SMILES string.
 */
SmilesDrawer.clean = function (smiles) {
    return smiles.replace(/[^A-Za-z0-9@\.\+\-\?!\(\)\[\]\{\}/\\=#\$:\*]/g, '');
};

/**
 * Applies the smiles drawer draw function to each canvas element that has a smiles string in the data-smiles attribute.
 *
 * @static
 * @param {Object} options SmilesDrawer options.
 * @param {String} [themeName='light'] The theme to apply.
 */
SmilesDrawer.apply = function (options) {
    var themeName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'light';

    var smilesDrawer = new SmilesDrawer.Drawer(options);
    var elements = document.querySelectorAll('canvas[data-smiles]');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var data = SmilesDrawer.parse(SmilesDrawer.clean(element.getAttribute('data-smiles')));

        smilesDrawer.draw(data, element, themeName, false);
    }
};

/**
 * Parses the entered smiles string.
 * 
 * @static
 * @param {String} smiles A SMILES string.
 * @param {Function} successCallback A callback that is called on success with the parse tree.
 * @param {Function} errorCallback A callback that is called with the error object on error.
 */
SmilesDrawer.parse = function (smiles, successCallback, errorCallback) {
    try {
        if (successCallback) {
            successCallback(SmilesDrawer.Parser.parse(smiles));
        }
    } catch (err) {
        if (errorCallback) {
            errorCallback(err);
        }
    }
};
/** 
 * A static class containing helper functions for array-related tasks. 
 */
SmilesDrawer.ArrayHelper = function () {
    function ArrayHelper() {
        _classCallCheck(this, ArrayHelper);
    }

    _createClass(ArrayHelper, null, [{
        key: 'clone',

        /**
         * Clone an array or an object. If an object is passed, a shallow clone will be created.
         *
         * @static
         * @param {*} arr The array or object to be cloned.
         * @returns {*} A clone of the array or object.
         */
        value: function clone(arr) {
            var out = Array.isArray(arr) ? [] : {};

            for (var key in arr) {
                var value = arr[key];

                if (typeof value.clone === 'function') {
                    out[key] = value.clone();
                } else {
                    out[key] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? SmilesDrawer.ArrayHelper.clone(value) : value;
                }
            }

            return out;
        }

        /**
         * Returns a string representation of an array. If the array contains objects with an id property, the id property is printed for each of the elements.
         *
         * @static
         * @param {Object[]} arr An array.
         * @param {*} arr[].id If the array contains an object with the property 'id', the properties value is printed. Else, the array elements value is printend.
         * @returns {String} A string representation of the array.
         */

    }, {
        key: 'print',
        value: function print(arr) {
            if (arr.length == 0) {
                return '';
            }

            var s = '(';

            for (var i = 0; i < arr.length; i++) {
                s += arr[i].id ? arr[i].id + ', ' : arr[i] + ', ';
            }

            s = s.substring(0, s.length - 2);

            return s + ')';
        }

        /**
         * Run a function for each element in the array. The element is supplied as an argument for the callback function
         *
         * @static
         * @param {Array} arr An array.
         * @param {Function} callback The callback function that is called for each element.
         */

    }, {
        key: 'each',
        value: function each(arr, callback) {
            for (var i = 0; i < arr.length; i++) {
                callback(arr[i]);
            }
        }

        /**
         * Return the array element from an array containing objects, where a property of the object is set to a given value.
         *
         * @static
         * @param {Array} arr An array.
         * @param {String|Number} property A property contained within an object in the array.
         * @param {String|Number} value The value of the property.
         * @returns {*} The array element matching the value.
         */

    }, {
        key: 'get',
        value: function get(arr, property, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][property] == value) {
                    return arr[i];
                }
            }
        }

        /**
         * Checks whether or not an array contains a given value. the options object passed as a second argument can contain three properties. value: The value to be searched for. property: The property that is to be searched for a given value. func: A function that is used as a callback to return either true or false in order to do a custom comparison.
         *
         * @static
         * @param {Array} arr An array.
         * @param {Object} options See method description.
         * @param {String} options.property The property on which to check.
         * @param {*} options.value The value for which to check.
         * @param {Function} [options.func=undefined] A custom property function.
         * @returns {Boolean} A boolean whether or not the array contains a value.
         */

    }, {
        key: 'contains',
        value: function contains(arr, options) {
            if (!options.property && !options.func) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == options.value) {
                        return true;
                    }
                }
            } else if (options.func) {
                for (var _i = 0; _i < arr.length; _i++) {
                    if (options.func(arr[_i])) {
                        return true;
                    }
                }
            } else {
                for (var _i2 = 0; _i2 < arr.length; _i2++) {
                    if (arr[_i2][options.property] == options.value) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Returns an array containing the intersection between two arrays. That is, values that are common to both arrays.
         *
         * @static
         * @param {Array} arrA An array.
         * @param {Array} arrB An array.
         * @returns {Array} The intersecting vlaues.
         */

    }, {
        key: 'intersection',
        value: function intersection(arrA, arrB) {
            var intersection = new Array();

            for (var i = 0; i < arrA.length; i++) {
                for (var j = 0; j < arrB.length; j++) {
                    if (arrA[i] === arrB[j]) {
                        intersection.push(arrA[i]);
                    }
                }
            }

            return intersection;
        }

        /**
         * Returns an array of unique elements contained in an array.
         *
         * @static
         * @param {Array} arr An array.
         * @returns {Array} An array of unique elements contained within the array supplied as an argument.
         */

    }, {
        key: 'unique',
        value: function unique(arr) {
            var contains = {};
            return arr.filter(function (i) {
                // using !== instead of hasOwnProperty (http://andrew.hedges.name/experiments/in/)
                return contains[i] !== undefined ? false : contains[i] = true;
            });
        }

        /**
         * Count the number of occurences of a value in an array.
         *
         * @static
         * @param {Array} arr An array.
         * @param {*} value A value to be counted.
         * @returns {Number} The number of occurences of a value in the array.
         */

    }, {
        key: 'count',
        value: function count(arr, value) {
            var count = 0;

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === value) {
                    count++;
                }
            }

            return count;
        }

        /**
         * Toggles the value of an array. If a value is not contained in an array, the array returned will contain all the values of the original array including the value. If a value is contained in an array, the array returned will contain all the values of the original array excluding the value.
         *
         * @static
         * @param {Array} arr An array.
         * @param {*} value A value to be toggled.
         * @returns {Array} The toggled array.
         */

    }, {
        key: 'toggle',
        value: function toggle(arr, value) {
            var newArr = [];

            var removed = false;
            for (var i = 0; i < arr.length; i++) {
                // Do not copy value if it exists
                if (arr[i] !== value) {
                    newArr.push(arr[i]);
                } else {
                    // The element was not copied to the new array, which
                    // means it was removed
                    removed = true;
                }
            }

            // If the element was not removed, then it was not in the array
            // so add it
            if (!removed) {
                newArr.push(value);
            }

            return newArr;
        }

        /**
         * Remove a value from an array.
         *
         * @static
         * @param {Array} arr An array.
         * @param {*} value A value to be removed.
         * @returns {Array} A new array with the element with a given value removed.
         */

    }, {
        key: 'remove',
        value: function remove(arr, value) {
            var tmp = [];

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] !== value) {
                    tmp.push(arr[i]);
                }
            }

            return tmp;
        }

        /**
         * Remove a value from an array with unique values.
         *
         * @static
         * @param {Array} arr An array.
         * @param {*} value A value to be removed.
         * @returns {Array} An array with the element with a given value removed.
         */

    }, {
        key: 'removeUnique',
        value: function removeUnique(arr, value) {
            var index = array.indexOf(value);

            if (index > -1) {
                arr.splice(index, 1);
            }

            return arr;
        }

        /**
         * Remove all elements contained in one array from another array.
         *
         * @static
         * @param {Array} arrA The array to be filtered.
         * @param {Array} arrB The array containing elements that will be removed from the other array.
         * @returns {Array} The filtered array.
         */

    }, {
        key: 'removeAll',
        value: function removeAll(arrA, arrB) {
            return arrA.filter(function (item) {
                return arrB.indexOf(item) === -1;
            });
        }

        /**
         * Merges two arrays and returns the result. The second array will be appended to the second array.
         *
         * @static
         * @param {Array} arrA An array.
         * @param {Array} arrB An array.
         * @returns {Array} The merged array.
         */

    }, {
        key: 'merge',
        value: function merge(arrA, arrB) {
            var arr = new Array(arrA.length + arrB.length);

            for (var i = 0; i < arrA.length; i++) {
                arr[i] = arrA[i];
            }

            for (var _i3 = 0; _i3 < arrB.length; _i3++) {
                arr[arrA.length + _i3] = arrB[_i3];
            }

            return arr;
        }

        /**
         * Checks whether or not an array contains all the elements of another array, without regard to the order.
         *
         * @static
         * @param {Array} arrA An array.
         * @param {Array} arrB An array.
         * @returns {Boolean} A boolean indicating whether or not both array contain the same elements.
         */

    }, {
        key: 'containsAll',
        value: function containsAll(arrA, arrB) {
            var containing = 0;
            for (var i = 0; i < arrA.length; i++) {
                for (var j = 0; j < arrB.length; j++) {
                    if (arrA[i] === arrB[j]) {
                        containing++;
                    }
                }
            }

            return containing === arrB.length;
        }

        /**
         * Sort an array of atomic number information. Where the number is indicated as x, x.y, x.y.z, ...
         *
         * @param {Object[]} arr An array of vertex ids with their associated atomic numbers.
         * @param {Number} arr[].vertexId A vertex id.
         * @param {Number} arr[].atomicNumber The atomic number associated with the vertex id.
         * @returns {Object[]} The array sorted by atomic number. Example of an array entry: { atomicNumber: 2, vertexId: 5 }.
         */

    }, {
        key: 'sortByAtomicNumberDesc',
        value: function sortByAtomicNumberDesc(arr) {
            var map = arr.map(function (e, i) {
                return { index: i, value: e.atomicNumber.split('.').map(Number) };
            });

            map.sort(function (a, b) {
                var min = Math.min(b.value.length, a.value.length);
                var i = 0;

                while (i < min && b.value[i] === a.value[i]) {
                    i++;
                }

                return i === min ? b.value.length - a.value.length : b.value[i] - a.value[i];
            });

            return map.map(function (e) {
                return arr[e.index];
            });
        }

        /**
         * Copies a an n-dimensional array.
         * 
         * @param {Array} arr The array to be copied.
         * @returns {Array} The copy.
         */

    }, {
        key: 'deepCopy',
        value: function deepCopy(arr) {
            var newArr = [];

            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];

                if (item instanceof Array) {
                    newArr[i] = SmilesDrawer.ArrayHelper.deepCopy(item);
                } else {
                    newArr[i] = item;
                }
            }

            return newArr;
        }
    }]);

    return ArrayHelper;
}();

/** 
 * A class representing an atom.
 * 
 * @property {String} element The element symbol of this atom. Single-letter symbols are always uppercase. Examples: H, C, F, Br, Si, ...
 * @property {Boolean} drawExplicit A boolean indicating whether or not this atom is drawn explicitly (for example, a carbon atom). This overrides the default behaviour.
 * @property {Object[]} ringbonds An array containing the ringbond ids and bond types as specified in the original SMILE.
 * @property {Number} ringbonds[].id The ringbond id as defined in the SMILES.
 * @property {String} ringbonds[].bondType The bond type of the ringbond as defined in the SMILES.
 * @property {Number[]} rings The ids of rings which contain this atom.
 * @property {String} bondType The bond type associated with this array. Examples: -, =, #, ...
 * @property {Boolean} isBridge A boolean indicating whether or not this atom is part of a bridge in a bridged ring (contained by the largest ring).
 * @property {Boolean} isBridgeNode A boolean indicating whether or not this atom is a bridge node (a member of the largest ring in a bridged ring which is connected to a bridge-atom).
 * @property {Number[]} originalRings Used to back up rings when they are replaced by a bridged ring.
 * @property {Number} bridgedRing The id of the bridged ring if the atom is part of a bridged ring.
 * @property {Number[]} anchoredRings The ids of the rings that are anchored to this atom. The centers of anchored rings are translated when this atom is translated.
 * @property {Object} bracket If this atom is defined as a bracket atom in the original SMILES, this object contains all the bracket information. Example: { hcount: {Number}, charge: ['--', '-', '+', '++'], isotope: {Number} }.
 * @property {Number} chiral EXPERIMENTAL: Specifies chirality.
 * @property {Object[]} attachedPseudoElements A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count.
 * @property {String} attachedPseudoElement[].element The element symbol.
 * @property {Number} attachedPseudoElement[].count The number of occurences that match the key.
 * @property {Number} attachedPseudoElement[].hyrogenCount The number of hydrogens attached to each atom matching the key.
 * @property {Boolean} hasAttachedPseudoElements A boolean indicating whether or not this attom will be drawn with an attached pseudo element or concatinated elements.
 * @property {Boolean} isDrawn A boolean indicating whether or not this atom is drawn. In contrast to drawExplicit, the bond is drawn neither.
 * @property {Boolean} isConnectedToRing A boolean indicating whether or not this atom is directly connected (but not a member of) a ring.
 * @property {String[]} neighbouringElements An array containing the element symbols of neighbouring atoms.
 * @property {Boolean} isPartOfAromaticRing A boolean indicating whether or not this atom is part of an explicitly defined aromatic ring. Example: c1ccccc1.
 * @property {Number} bondCount The number of bonds in which this atom is participating.
 */
SmilesDrawer.Atom = function () {
    /**
     * The constructor of the class Atom.
     *
     * @param {String} element The one-letter code of the element.
     * @param {String} [bondType='-'] The type of the bond associated with this atom.
     */
    function Atom(element) {
        var bondType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

        _classCallCheck(this, Atom);

        this.element = element.length === 1 ? element.toUpperCase() : element;
        this.drawExplicit = false;
        this.ringbonds = [];
        this.rings = [];
        this.bondType = bondType;
        this.isBridge = false;
        this.isBridgeNode = false;
        this.originalRings = [];
        this.bridgedRing = null;
        this.anchoredRings = [];
        this.bracket = null;
        this.chiral = 0;
        this.order = {};
        this.attachedPseudoElements = {};
        this.hasAttachedPseudoElements = false;
        this.isDrawn = true;
        this.isConnectedToRing = false;
        this.neighbouringElements = [];
        this.isPartOfAromaticRing = element !== this.element;
        this.bondCount = 0;
    }

    /**
     * Adds a neighbouring element to this atom.
     * 
     * @param {String} element A string representing an element.
     */


    _createClass(Atom, [{
        key: 'addNeighbouringElement',
        value: function addNeighbouringElement(element) {
            this.neighbouringElements.push(element);
        }

        /**
         * Attaches a pseudo element (e.g. Ac) to the atom.
         * @param {String} element The element identifier (e.g. Br, C, ...).
         * @param {String} previousElement The element that is part of the main chain (not the terminals that are converted to the pseudo element or concatinated).
         * @param {Number} [hydrogenCount=0] The number of hydrogens for the element.
         */

    }, {
        key: 'attachPseudoElement',
        value: function attachPseudoElement(element, previousElement) {
            var hydrogenCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var key = hydrogenCount + element;

            if (this.attachedPseudoElements[key]) {
                this.attachedPseudoElements[key].count += 1;
            } else {
                this.attachedPseudoElements[key] = {
                    element: element,
                    count: 1,
                    hydrogenCount: hydrogenCount,
                    previousElement: previousElement
                };
            }

            this.hasAttachedPseudoElements = true;
        }

        /**
         * Returns the attached pseudo elements sorted by hydrogen count (ascending).
         *
         * @returns {Object} The sorted attached pseudo elements.
         */

    }, {
        key: 'getAttachedPseudoElements',
        value: function getAttachedPseudoElements() {
            var ordered = {};
            var that = this;

            Object.keys(this.attachedPseudoElements).sort().forEach(function (key) {
                ordered[key] = that.attachedPseudoElements[key];
            });

            return ordered;
        }

        /**
         * Returns the number of attached pseudo elements.
         *
         * @returns {Number} The number of attached pseudo elements.
         */

    }, {
        key: 'getAttachedPseudoElementsCount',
        value: function getAttachedPseudoElementsCount() {
            return Object.keys(this.attachedPseudoElements).length;
        }

        /**
         * Defines this atom as the anchor for a ring. When doing repositionings of the vertices and the vertex associated with this atom is moved, the center of this ring is moved as well.
         *
         * @param {Number} ringId A ring id.
         */

    }, {
        key: 'addAnchoredRing',
        value: function addAnchoredRing(ringId) {
            if (!SmilesDrawer.ArrayHelper.contains(this.anchoredRings, { value: ringId })) {
                this.anchoredRings.push(ringId);
            }
        }

        /**
         * Returns the number of ringbonds (breaks in rings to generate the MST of the smiles) within this atom is connected to.
         *
         * @returns {Number} The number of ringbonds this atom is connected to.
         */

    }, {
        key: 'getRingbondCount',
        value: function getRingbondCount() {
            return this.ringbonds.length;
        }

        /**
         * Check whether or not this atom is rotatable. The atom is deemed rotatable if it is neither a member of a ring nor participating in a bond other than a single bond. TODO: Check the chemistry.
         *
         * @returns {Boolean} A boolean indicating whether or not this atom is rotatable.
         */

    }, {
        key: 'canRotate',
        value: function canRotate() {
            return this.bondType === '-' && this.rings.length == 0;
        }

        /**
         * Returns whether or not this atom participates in ringbonds (breaks in the ring in the MST).
         *
         * @returns {Boolean} A boolean indicating whether or not this atom is associated with a ringbond.
         */

    }, {
        key: 'hasRingbonds',
        value: function hasRingbonds() {
            return this.ringbonds.length > 0;
        }

        /**
         * Returns the id of the ringbond with the highest id.
         *
         * @returns {Number} The highest ringbond id associated with this atom.
         */

    }, {
        key: 'getMaxRingbond',
        value: function getMaxRingbond() {
            var max = 0;
            for (var i = 0; i < this.ringbonds.length; i++) {
                if (this.ringbonds[i].id > max) {
                    max = this.ringbonds[i].id;
                }
            }

            return max;
        }

        /**
         * Checks whether or not this atom is part of a ring.
         * 
         * @returns {Boolean} A boolean indicating whether or not this atom is part of a ring.
         */

    }, {
        key: 'isInRing',
        value: function isInRing() {
            return this.rings.length > 0;
        }

        /**
         * Checks whether or not this atom is a member of a given ring.
         *
         * @param {Number} ringId A ring id.
         * @returns {Boolean} A boolean indicating whether or not this atom is a member of a given ring.
         */

    }, {
        key: 'hasRing',
        value: function hasRing(ringId) {
            for (var i = 0; i < this.rings; i++) {
                if (ringId === this.rings[i]) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Backs up the current rings.
         */

    }, {
        key: 'backupRings',
        value: function backupRings() {
            this.originalRings = [];

            for (var i = 0; i < this.rings.length; i++) {
                this.originalRings.push(this.rings[i]);
            }
        }

        /**
         * Restores the most recent backed up rings.
         */

    }, {
        key: 'restoreRings',
        value: function restoreRings() {
            this.rings = [];

            for (var i = 0; i < this.originalRings.length; i++) {
                this.rings.push(this.originalRings[i]);
            }
        }

        /**
         * Checks whether or not two atoms share a common ringbond id. A ringbond is a break in a ring created when generating the spanning tree of a structure.
         *
         * @param {SmilesDrawer.Atom} atomA An atom.
         * @param {SmilesDrawer.Atom} atomB An atom.
         * @returns {Boolean} A boolean indicating whether or not two atoms share a common ringbond.
         */

    }, {
        key: 'haveCommonRingbond',
        value: function haveCommonRingbond(atomA, atomB) {
            for (var i = 0; i < atomA.ringbonds.length; i++) {
                for (var j = 0; j < atomB.ringbonds.length; j++) {
                    if (atomA.ringbonds[i].id == atomB.ringbonds[j].id) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Get the highest numbered ringbond shared by two atoms. A ringbond is a break in a ring created when generating the spanning tree of a structure.
         *
         * @param {SmilesDrawer.Atom} atomA An atom.
         * @param {SmilesDrawer.Atom} atomB An atom.
         * @returns {Number} The number of the maximum ringbond shared by two atoms.
         */

    }, {
        key: 'maxCommonRingbond',
        value: function maxCommonRingbond(atomA, atomB) {
            var commonMax = 0;
            var maxA = 0;
            var maxB = 0;

            for (var i = 0; i < atomA.ringbonds.length; i++) {
                if (atomA.ringbonds[i].id > maxA) {
                    maxA = atomA.ringbonds[i].id;
                }

                for (var j = 0; j < atomB.ringbonds.length; j++) {
                    if (atomB.ringbonds[j].id > maxB) {
                        maxB = atomB.ringbonds[j].id;
                    } else if (maxA == maxB) {
                        commonMax = maxA;
                    }
                }
            }

            return commonMax;
        }

        /**
         * Returns the order of this atom given a central atom.
         * 
         * @param {Number} center The id of the central atom in respect to which the order is defined.
         * @returns {Number} The order of this atom in respect to the center atom.
         */

    }, {
        key: 'getOrder',
        value: function getOrder(center) {
            return this.order[center];
        }

        /**
         * Sets the order of this atom given a center. This is required since two atoms can have an order in respect to two different centers when connected by ringbonds.
         *
         * @param {Number} center The id of the central atom in respect to which the order is defined.
         * @param {Number} order The order of this atom.
         */

    }, {
        key: 'setOrder',
        value: function setOrder(center, order) {
            this.order[center] = order;
        }

        /**
         * Check whether or not the neighbouring elements of this atom equal the supplied array.
         * 
         * @param {String[]} arr An array containing all the elements that are neighbouring this atom. E.g. ['C', 'O', 'O', 'N']
         * @returns {Boolean} A boolean indicating whether or not the neighbours match the supplied array of elements.
         */

    }, {
        key: 'neighbouringElementsEqual',
        value: function neighbouringElementsEqual(arr) {
            if (arr.length !== this.neighbouringElements.length) {
                return false;
            }

            arr.sort();
            this.neighbouringElements.sort();

            for (var i = 0; i < this.neighbouringElements.length; i++) {
                if (arr[i] !== this.neighbouringElements[i]) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Get the atomic number of this atom.
         * 
         * @returns {Number} The atomic number of this atom.
         */

    }, {
        key: 'getAtomicNumber',
        value: function getAtomicNumber() {
            return Atom.atomicNumbers[this.element];
        }

        /**
         * Sorts an array of vertices by their respecitve atomic number.
         *
         * @param {SmilesDrawer.Vertex} root The central vertex
         * @param {Number[]} neighbours An array of vertex ids.
         * @param {SmilesDrawer.Vertex[]} vertices An array containing the vertices associated with the current molecule.
         * @param {SmilesDrawer.Ring[]} rings An array containing the rings associated with the current molecule.
         * @returns {Object[]} The array sorted by atomic number. Example of an array entry: { atomicNumber: 2, vertexId: 5 }.
         */

    }], [{
        key: 'sortByAtomicNumber',
        value: function sortByAtomicNumber(neighbours, vertices) {
            var orderedVertices = new Array(neighbours.length);

            for (var i = 0; i < neighbours.length; i++) {
                var vertex = vertices[neighbours[i]];
                var val = Atom.atomicNumbers[vertex.value.element];

                orderedVertices[i] = {
                    atomicNumber: val.toString(),
                    vertexId: vertex.id
                };
            }

            return SmilesDrawer.ArrayHelper.sortByAtomicNumberDesc(orderedVertices);
        }

        /**
         * Checks wheter or not two atoms have the same atomic number
         *
         * @param {Object[]} sortedAtomicNumbers An array of vertex ids with their associated atomic numbers.
         * @param {Number} sortedAtomicNumbers[].vertexId A vertex id.
         * @param {Number} sortedAtomicNumbers[].atomicNumber The atomic number associated with the vertex id.
         * @returns {Boolean} A boolean indicating whether or not there are duplicate atomic numbers.
         */

    }, {
        key: 'hasDuplicateAtomicNumbers',
        value: function hasDuplicateAtomicNumbers(sortedAtomicNumbers) {
            var found = {};

            for (var i = 0; i < sortedAtomicNumbers.length; i++) {
                var v = sortedAtomicNumbers[i];

                if (found[v.atomicNumber] !== undefined) {
                    return true;
                }

                found[v.atomicNumber] = true;
            }

            return false;
        }

        /**
         * Returns sets of duplicate atomic numbers.
         *
         * @param {Object[]} sortedAtomicNumbers An array of vertex ids with their associated atomic numbers.
         * @param {Number} sortedAtomicNumbers[].vertexId A vertex id.
         * @param {Number} sortedAtomicNumbers[].atomicNumber The atomic number associated with the vertex id.
         * @returns {Array[]} An array of arrays containing the indices of duplicate atomic numbers.
         */

    }, {
        key: 'getDuplicateAtomicNumbers',
        value: function getDuplicateAtomicNumbers(sortedAtomicNumbers) {
            var duplicates = {};
            var dpl = [];

            for (var i = 0; i < sortedAtomicNumbers.length; i++) {
                var v = sortedAtomicNumbers[i];

                if (duplicates[v.atomicNumber] === undefined) {
                    duplicates[v.atomicNumber] = [];
                }

                duplicates[v.atomicNumber].push(i);
            }

            for (var key in duplicates) {
                var arr = duplicates[key];

                if (arr.length > 1) {
                    dpl.push(arr);
                }
            }

            return dpl;
        }
    }]);

    return Atom;
}();

/**
 * A map mapping element symbols to their maximum bonds.
 */
SmilesDrawer.Atom.maxBonds = {
    'C': 4,
    'N': 3,
    'O': 2,
    'P': 3,
    'S': 2,
    'B': 3,
    'F': 1,
    'I': 1,
    'Cl': 1,
    'Br': 1
};

/**
 * A map mapping element symbols to the atomic number.
 */
SmilesDrawer.Atom.atomicNumbers = {
    'H': 1,
    'He': 2,
    'Li': 3,
    'Be': 4,
    'B': 5,
    'b': 5,
    'C': 6,
    'c': 6,
    'N': 7,
    'n': 7,
    'O': 8,
    'o': 8,
    'F': 9,
    'Ne': 10,
    'Na': 11,
    'Mg': 12,
    'Al': 13,
    'Si': 14,
    'P': 15,
    'p': 15,
    'S': 16,
    's': 16,
    'Cl': 17,
    'Ar': 18,
    'K': 19,
    'Ca': 20,
    'Sc': 21,
    'Ti': 22,
    'V': 23,
    'Cr': 24,
    'Mn': 25,
    'Fe': 26,
    'Co': 27,
    'Ni': 28,
    'Cu': 29,
    'Zn': 30,
    'Ga': 31,
    'Ge': 32,
    'As': 33,
    'Se': 34,
    'Br': 35,
    'Kr': 36,
    'Rb': 37,
    'Sr': 38,
    'Y': 39,
    'Zr': 40,
    'Nb': 41,
    'Mo': 42,
    'Tc': 43,
    'Ru': 44,
    'Rh': 45,
    'Pd': 46,
    'Ag': 47,
    'Cd': 48,
    'In': 49,
    'Sn': 50,
    'Sb': 51,
    'Te': 52,
    'I': 53,
    'Xe': 54,
    'Cs': 55,
    'Ba': 56,
    'La': 57,
    'Ce': 58,
    'Pr': 59,
    'Nd': 60,
    'Pm': 61,
    'Sm': 62,
    'Eu': 63,
    'Gd': 64,
    'Tb': 65,
    'Dy': 66,
    'Ho': 67,
    'Er': 68,
    'Tm': 69,
    'Yb': 70,
    'Lu': 71,
    'Hf': 72,
    'Ta': 73,
    'W': 74,
    'Re': 75,
    'Os': 76,
    'Ir': 77,
    'Pt': 78,
    'Au': 79,
    'Hg': 80,
    'Tl': 81,
    'Pb': 82,
    'Bi': 83,
    'Po': 84,
    'At': 85,
    'Rn': 86,
    'Fr': 87,
    'Ra': 88,
    'Ac': 89,
    'Th': 90,
    'Pa': 91,
    'U': 92,
    'Np': 93,
    'Pu': 94,
    'Am': 95,
    'Cm': 96,
    'Bk': 97,
    'Cf': 98,
    'Es': 99,
    'Fm': 100,
    'Md': 101,
    'No': 102,
    'Lr': 103,
    'Rf': 104,
    'Db': 105,
    'Sg': 106,
    'Bh': 107,
    'Hs': 108,
    'Mt': 109,
    'Ds': 110,
    'Rg': 111,
    'Cn': 112,
    'Uut': 113,
    'Uuq': 114,
    'Uup': 115,
    'Uuh': 116,
    'Uus': 117,
    'Uuo': 118
};

SmilesDrawer.Atom.mass = {
    'H': 1,
    'He': 2,
    'Li': 3,
    'Be': 4,
    'B': 5,
    'b': 5,
    'C': 6,
    'c': 6,
    'N': 7,
    'n': 7,
    'O': 8,
    'o': 8,
    'F': 9,
    'Ne': 10,
    'Na': 11,
    'Mg': 12,
    'Al': 13,
    'Si': 14,
    'P': 15,
    'p': 15,
    'S': 16,
    's': 16,
    'Cl': 17,
    'Ar': 18,
    'K': 19,
    'Ca': 20,
    'Sc': 21,
    'Ti': 22,
    'V': 23,
    'Cr': 24,
    'Mn': 25,
    'Fe': 26,
    'Co': 27,
    'Ni': 28,
    'Cu': 29,
    'Zn': 30,
    'Ga': 31,
    'Ge': 32,
    'As': 33,
    'Se': 34,
    'Br': 35,
    'Kr': 36,
    'Rb': 37,
    'Sr': 38,
    'Y': 39,
    'Zr': 40,
    'Nb': 41,
    'Mo': 42,
    'Tc': 43,
    'Ru': 44,
    'Rh': 45,
    'Pd': 46,
    'Ag': 47,
    'Cd': 48,
    'In': 49,
    'Sn': 50,
    'Sb': 51,
    'Te': 52,
    'I': 53,
    'Xe': 54,
    'Cs': 55,
    'Ba': 56,
    'La': 57,
    'Ce': 58,
    'Pr': 59,
    'Nd': 60,
    'Pm': 61,
    'Sm': 62,
    'Eu': 63,
    'Gd': 64,
    'Tb': 65,
    'Dy': 66,
    'Ho': 67,
    'Er': 68,
    'Tm': 69,
    'Yb': 70,
    'Lu': 71,
    'Hf': 72,
    'Ta': 73,
    'W': 74,
    'Re': 75,
    'Os': 76,
    'Ir': 77,
    'Pt': 78,
    'Au': 79,
    'Hg': 80,
    'Tl': 81,
    'Pb': 82,
    'Bi': 83,
    'Po': 84,
    'At': 85,
    'Rn': 86,
    'Fr': 87,
    'Ra': 88,
    'Ac': 89,
    'Th': 90,
    'Pa': 91,
    'U': 92,
    'Np': 93,
    'Pu': 94,
    'Am': 95,
    'Cm': 96,
    'Bk': 97,
    'Cf': 98,
    'Es': 99,
    'Fm': 100,
    'Md': 101,
    'No': 102,
    'Lr': 103,
    'Rf': 104,
    'Db': 105,
    'Sg': 106,
    'Bh': 107,
    'Hs': 108,
    'Mt': 109,
    'Ds': 110,
    'Rg': 111,
    'Cn': 112,
    'Uut': 113,
    'Uuq': 114,
    'Uup': 115,
    'Uuh': 116,
    'Uus': 117,
    'Uuo': 118
};
/** 
 * A class wrapping a canvas element.
 * 
 * @property {HTMLElement} canvas The HTML element for the canvas associated with this CanvasWrapper instance.
 * @property {CanvasRenderingContext2D} ctx The CanvasRenderingContext2D of the canvas associated with this CanvasWrapper instance.
 * @property {Object} colors The colors object as defined in the SmilesDrawer options.
 * @property {Object} opts The SmilesDrawer options.
 * @property {Number} drawingWidth The width of the canvas.
 * @property {Number} drawingHeight The height of the canvas.
 * @property {Number} offsetX The horizontal offset required for centering the drawing.
 * @property {Number} offsetY The vertical offset required for centering the drawing.
 * @property {Number} fontLarge The large font size in pt.
 * @property {Number} fontSmall The small font size in pt.
 */
SmilesDrawer.CanvasWrapper = function () {
    /**
     * The constructor for the class CanvasWrapper.
     *
     * @param {String|HTMLElement} target The canvas id or the canvas HTMLElement.
     * @param {Object} theme A theme from the smiles drawer options.
     * @param {Object} options The smiles drawer options object.
     */
    function CanvasWrapper(target, theme, options) {
        _classCallCheck(this, CanvasWrapper);

        if (typeof target === 'string' || target instanceof String) {
            this.canvas = document.getElementById(target);
        } else {
            this.canvas = target;
        }

        this.ctx = this.canvas.getContext('2d');
        this.colors = theme;
        this.opts = options;
        this.drawingWidth = 0.0;
        this.drawingHeight = 0.0;
        this.offsetX = 0.0;
        this.offsetY = 0.0;

        this.fontLarge = this.opts.fontSizeLarge + 'pt Droid Sans, sans-serif';
        this.fontSmall = this.opts.fontSizeSmall + 'pt Droid Sans, sans-serif';

        this.updateSize(this.opts.width, this.opts.height);

        this.clear();
    }

    /**
     * Update the width and height of the canvas
     * 
     * @param {Number} width 
     * @param {Number} height 
     */


    _createClass(CanvasWrapper, [{
        key: 'updateSize',
        value: function updateSize(width, height) {
            this.devicePixelRatio = window.devicePixelRatio || 1;
            this.backingStoreRatio = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1;
            this.ratio = this.devicePixelRatio / this.backingStoreRatio;

            if (this.ratio !== 1) {
                this.canvas.width = width * this.ratio;
                this.canvas.height = height * this.ratio;
                this.canvas.style.width = width + 'px';
                this.canvas.style.height = height + 'px';
                this.ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
            } else {
                this.canvas.width = width * this.ratio;
                this.canvas.height = height * this.ratio;
            }
        }

        /**
         * Sets a provided theme.
         *
         * @param {Object} theme A theme from the smiles drawer options.
         */

    }, {
        key: 'setTheme',
        value: function setTheme(theme) {
            this.colors = theme;
        }

        /**
         * Scale the canvas based on vertex positions.
         *
         * @param {SmilesDrawer.Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
         */

    }, {
        key: 'scale',
        value: function scale(vertices) {
            // Figure out the final size of the image
            var maxX = -Number.MAX_VALUE;
            var maxY = -Number.MAX_VALUE;
            var minX = Number.MAX_VALUE;
            var minY = Number.MAX_VALUE;

            for (var i = 0; i < vertices.length; i++) {
                var p = vertices[i].position;

                if (maxX < p.x) maxX = p.x;
                if (maxY < p.y) maxY = p.y;
                if (minX > p.x) minX = p.x;
                if (minY > p.y) minY = p.y;
            }

            // Add padding
            var padding = 20.0;
            maxX += padding;
            maxY += padding;
            minX -= padding;
            minY -= padding;

            this.drawingWidth = maxX - minX;
            this.drawingHeight = maxY - minY;

            var scaleX = this.canvas.offsetWidth / this.drawingWidth;
            var scaleY = this.canvas.offsetHeight / this.drawingHeight;

            var scale = scaleX < scaleY ? scaleX : scaleY;

            this.ctx.scale(scale, scale);

            this.offsetX = -minX;
            this.offsetY = -minY;

            // Center
            if (scaleX < scaleY) {
                this.offsetY += this.canvas.offsetHeight / (2.0 * scale) - this.drawingHeight / 2.0;
            } else {
                this.offsetX += this.canvas.offsetWidth / (2.0 * scale) - this.drawingWidth / 2.0;
            }
        }

        /**
         * Resets the transform of the canvas.
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

        /**
         * Returns the hex code of a color associated with a key from the current theme.
         *
         * @param {String} key The color key in the theme (e.g. C, N, BACKGROUND, ...).
         * @returns {String} A color hex value.
         */

    }, {
        key: 'getColor',
        value: function getColor(key) {
            key = key.toUpperCase();

            if (key in this.colors) {
                return this.colors[key];
            }

            return this.colors['C'];
        }

        /**
         * Draws a circle to a canvas context.
         * @param {Number} x The x coordinate of the circles center.
         * @param {Number} y The y coordinate of the circles center.
         * @param {Number} radius The radius of the circle
         * @param {String} color A hex encoded color.
         * @param {Boolean} [fill=true] Whether to fill or stroke the circle.
         * @param {Boolean} [debug=false] Draw in debug mode.
         * @param {String} [debugText=''] A debug message.
         */

    }, {
        key: 'drawCircle',
        value: function drawCircle(x, y, radius, color) {
            var fill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var debug = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
            var debugText = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';

            var ctx = this.ctx;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;

            ctx.save();
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, radius, 0, SmilesDrawer.MathHelper.twoPI, true);
            ctx.closePath();

            if (debug) {
                if (fill) {
                    ctx.fillStyle = '#f00';
                    ctx.fill();
                } else {
                    ctx.strokeStyle = '#f00';
                    ctx.stroke();
                }

                this.drawDebugText(x, y, debugText);
            } else {
                if (fill) {
                    ctx.fillStyle = color;
                    ctx.fill();
                } else {
                    ctx.strokeStyle = color;
                    ctx.stroke();
                }
            }

            ctx.restore();
        }

        /**
         * Draw a line to a canvas.
         *
         * @param {SmilesDrawer.Line} line A line.
         */

    }, {
        key: 'drawLine',
        value: function drawLine(line) {
            if (isNaN(line.from.x) || isNaN(line.from.y) || isNaN(line.to.x) || isNaN(line.to.y)) {
                return;
            }

            var ctx = this.ctx;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;

            // Add a shadow behind the line
            var shortLine = line.clone().shorten(8.0);

            var l = shortLine.getLeftVector().clone();
            var r = shortLine.getRightVector().clone();

            l.x += offsetX;
            l.y += offsetY;

            r.x += offsetX;
            r.y += offsetY;

            // Draw the "shadow"
            /*
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.moveTo(l.x, l.y);
            ctx.lineTo(r.x, r.y);
            ctx.lineCap = 'round';
            ctx.lineWidth = 3.5;
            ctx.strokeStyle = this.getColor('BACKGROUND');
            ctx.stroke();
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();
            */
            l = line.getLeftVector().clone();
            r = line.getRightVector().clone();

            l.x += offsetX;
            l.y += offsetY;

            r.x += offsetX;
            r.y += offsetY;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(l.x, l.y);
            ctx.lineTo(r.x, r.y);
            ctx.lineCap = 'round';
            ctx.lineWidth = 1.5;

            var gradient = this.ctx.createLinearGradient(l.x, l.y, r.x, r.y);
            gradient.addColorStop(0.4, this.getColor(line.getLeftElement()) || this.getColor('C'));
            gradient.addColorStop(0.6, this.getColor(line.getRightElement()) || this.getColor('C'));

            ctx.strokeStyle = gradient;

            ctx.stroke();
            ctx.restore();
        }

        /**
         * Draw a wedge on the canvas.
         *
         * @param {SmilesDrawer.Line} line A line.
         * @param {Number} width The wedge width.
         */

    }, {
        key: 'drawWedge',
        value: function drawWedge(line) {
            var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3.0;

            if (isNaN(line.from.x) || isNaN(line.from.y) || isNaN(line.to.x) || isNaN(line.to.y)) {
                return;
            }

            var ctx = this.ctx;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;

            // Add a shadow behind the line
            var shortLine = line.clone().shorten(8.0);

            var l = shortLine.getLeftVector().clone();
            var r = shortLine.getRightVector().clone();

            l.x += offsetX;
            l.y += offsetY;

            r.x += offsetX;
            r.y += offsetY;

            l = line.getLeftVector().clone();
            r = line.getRightVector().clone();

            l.x += offsetX;
            l.y += offsetY;

            r.x += offsetX;
            r.y += offsetY;

            ctx.save();

            var normals = SmilesDrawer.Vector2.normals(l, r);

            normals[0].normalize();
            normals[1].normalize();

            var isRightChiralCenter = line.getRightChiral();

            var start = l;
            var end = r;

            if (isRightChiralCenter) {
                start = r;
                end = l;
            }

            var t = SmilesDrawer.Vector2.add(start, SmilesDrawer.Vector2.multiplyScalar(normals[0], 0.75));
            var u = SmilesDrawer.Vector2.add(end, SmilesDrawer.Vector2.multiplyScalar(normals[0], width));
            var v = SmilesDrawer.Vector2.add(end, SmilesDrawer.Vector2.multiplyScalar(normals[1], width));
            var w = SmilesDrawer.Vector2.add(start, SmilesDrawer.Vector2.multiplyScalar(normals[1], 0.75));

            ctx.beginPath();
            ctx.moveTo(t.x, t.y);
            ctx.lineTo(u.x, u.y);
            ctx.lineTo(v.x, v.y);
            ctx.lineTo(w.x, w.y);

            var gradient = this.ctx.createRadialGradient(r.x, r.y, this.opts.bondLength, r.x, r.y, 0);
            gradient.addColorStop(0.4, this.getColor(line.getLeftElement()) || this.getColor('C'));
            gradient.addColorStop(0.6, this.getColor(line.getRightElement()) || this.getColor('C'));

            ctx.fillStyle = gradient;

            ctx.fill();
            ctx.restore();
        }

        /**
         * Draw a dashed wedge on the canvas.
         *
         * @param {SmilesDrawer.Line} line A line.
         * @param {Number} width The wedge width.
         */

    }, {
        key: 'drawDashedWedge',
        value: function drawDashedWedge(line) {
            var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6.0;

            if (isNaN(line.from.x) || isNaN(line.from.y) || isNaN(line.to.x) || isNaN(line.to.y)) {
                return;
            }

            var ctx = this.ctx;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;

            var l = line.getLeftVector().clone();
            var r = line.getRightVector().clone();

            l.x += offsetX;
            l.y += offsetY;

            r.x += offsetX;
            r.y += offsetY;

            ctx.save();

            var normals = SmilesDrawer.Vector2.normals(l, r);

            normals[0].normalize();
            normals[1].normalize();

            var isRightChiralCenter = line.getRightChiral();

            var start = void 0;
            var end = void 0;
            var sStart = void 0;
            var sEnd = void 0;

            var shortLine = line.clone();

            if (isRightChiralCenter) {
                start = r;
                end = l;

                shortLine.shortenRight(3.0);

                sStart = shortLine.getRightVector().clone();
                sEnd = shortLine.getLeftVector().clone();
            } else {
                start = l;
                end = r;

                shortLine.shortenLeft(3.0);

                sStart = shortLine.getLeftVector().clone();
                sEnd = shortLine.getRightVector().clone();
            }

            sStart.x += offsetX;
            sStart.y += offsetY;
            sEnd.x += offsetX;
            sEnd.y += offsetY;

            var t = SmilesDrawer.Vector2.add(start, SmilesDrawer.Vector2.multiplyScalar(normals[0], 0.75));
            var u = SmilesDrawer.Vector2.add(end, SmilesDrawer.Vector2.multiplyScalar(normals[0], width / 2.0));
            var v = SmilesDrawer.Vector2.add(end, SmilesDrawer.Vector2.multiplyScalar(normals[1], width / 2.0));
            var w = SmilesDrawer.Vector2.add(start, SmilesDrawer.Vector2.multiplyScalar(normals[1], 0.75));

            ctx.beginPath();
            ctx.moveTo(t.x, t.y);
            ctx.lineTo(u.x, u.y);
            ctx.lineTo(v.x, v.y);
            ctx.lineTo(w.x, w.y);

            var gradient = this.ctx.createRadialGradient(r.x, r.y, this.bondLength, r.x, r.y, 0);
            gradient.addColorStop(0.4, this.getColor(line.getLeftElement()) || this.getColor('C'));
            gradient.addColorStop(0.6, this.getColor(line.getRightElement()) || this.getColor('C'));

            ctx.fillStyle = gradient;

            ctx.fill();

            // Now dash it
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.moveTo(sStart.x, sStart.y);
            ctx.lineTo(sEnd.x, sEnd.y);
            ctx.lineCap = 'butt';
            ctx.lineWidth = width;
            ctx.setLineDash([1, 1]);
            ctx.strokeStyle = this.getColor('BACKGROUND');
            ctx.stroke();
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();
        }

        /**
         * Draws a debug text message at a given position
         *
         * @param {Number} x The x coordinate.
         * @param {Number} y The y coordinate.
         * @param {String} text The debug text.
         */

    }, {
        key: 'drawDebugText',
        value: function drawDebugText(x, y, text) {
            var ctx = this.ctx;

            ctx.save();
            ctx.font = '5px Droid Sans, sans-serif';
            ctx.textAlign = 'start';
            ctx.textBaseline = 'top';
            ctx.fillStyle = '#ff0000';
            ctx.fillText(text, x + this.offsetX, y + this.offsetY);
            ctx.restore();
        }

        /**
         * Draw a ball to the canvas.
         *
         * @param {Number} x The x position of the text.
         * @param {Number} y The y position of the text.
         * @param {String} elementName The name of the element (single-letter).
         * @param {Number} hydrogens The number of hydrogen atoms.
         */

    }, {
        key: 'drawBall',
        value: function drawBall(x, y, elementName) {
            var ctx = this.ctx;

            ctx.save();
            ctx.beginPath();
            ctx.arc(x + this.offsetX, y + this.offsetY, this.opts.bondLength / 4.5, 0, SmilesDrawer.MathHelper.twoPI, false);
            ctx.fillStyle = this.getColor(elementName);
            ctx.fill();
        }

        /**
         * Draw a text to the canvas.
         *
         * @param {Number} x The x position of the text.
         * @param {Number} y The y position of the text.
         * @param {String} elementName The name of the element (single-letter).
         * @param {Number} hydrogens The number of hydrogen atoms.
         * @param {String} direction The direction of the text in relation to the associated vertex.
         * @param {Boolean} isTerminal A boolean indicating whether or not the vertex is terminal.
         * @param {String} charge The charge of the atom.
         * @param {Number} isotope The isotope number.
         * @param {Object[]} attachedPseudoElements A map with containing information for pseudo elements or concatinated elements. The key is comprised of the element symbol and the hydrogen count.
         * @param {String} attachedPseudoElement[].element The element symbol.
         * @param {Number} attachedPseudoElement[].count The number of occurences that match the key.
         * @param {Number} attachedPseudoElement[].hyrogenCount The number of hydrogens attached to each atom matching the key.
         */

    }, {
        key: 'drawText',
        value: function drawText(x, y, elementName, hydrogens, direction, isTerminal, charge, isotope) {
            var attachedPseudoElement = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : {};

            var ctx = this.ctx;
            var offsetX = this.offsetX;
            var offsetY = this.offsetY;

            ctx.save();

            var fontSizeLarge = this.opts.fontSizeLarge;
            var fontSizeSmall = this.opts.fontSizeSmall;

            ctx.textAlign = 'start';
            ctx.textBaseline = 'alphabetic';

            var pseudoElementHandled = false;

            // Charge
            var chargeText = '+';
            var chargeWidth = 0;

            if (charge) {
                if (charge === 2) {
                    chargeText = '2+';
                } else if (charge === -1) {
                    chargeText = '-';
                } else if (charge === -2) {
                    chargeText = '2-';
                }

                ctx.font = this.fontSmall;
                chargeWidth = ctx.measureText(chargeText).width;
            }

            var isotopeText = '0';
            var isotopeWidth = 0;

            if (isotope > 0) {
                isotopeText = isotope;
                ctx.font = this.fontSmall;
                isotopeWidth = ctx.measureText(isotopeText).width;
            }

            ctx.font = this.fontLarge;
            ctx.fillStyle = this.getColor(elementName);

            var dim = ctx.measureText(elementName);

            dim.totalWidth = dim.width + chargeWidth;
            dim.height = parseInt(this.fontLarge, 10);

            var r = dim.width > fontSizeLarge ? dim.width : this.opts.fontSizeLarge;
            r /= 1.25;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, r, 0, SmilesDrawer.MathHelper.twoPI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';

            var cursorPos = -dim.width / 2.0;
            var cursorPosLeft = -dim.width / 2.0;

            ctx.fillStyle = this.getColor(elementName);
            ctx.fillText(elementName, x + offsetX + cursorPos, y + this.opts.fontSizeLarge / 2.0 + offsetY);
            cursorPos += dim.width;

            if (charge) {
                ctx.font = this.fontSmall;
                ctx.fillText(chargeText, x + offsetX + cursorPos, y - this.opts.fontSizeSmall / 5.0 + offsetY);
                cursorPos += chargeWidth;
            }

            if (isotope > 0) {
                ctx.font = this.fontSmall;
                ctx.fillText(isotopeText, x + offsetX + cursorPosLeft - isotopeWidth, y - this.opts.fontSizeSmall / 5.0 + offsetY);
                cursorPosLeft -= isotopeWidth;
            }

            ctx.font = this.fontLarge;

            var hydrogenWidth = 0;
            var hydrogenCountWidth = 0;

            if (hydrogens === 1) {
                var hx = x + offsetX;
                var hy = y + offsetY + fontSizeLarge / 2.0;

                hydrogenWidth = ctx.measureText('H').width;
                cursorPosLeft -= hydrogenWidth;

                if (direction === 'left') {
                    hx += cursorPosLeft;
                } else if (direction === 'right') {
                    hx += cursorPos;
                } else if (direction === 'up' && isTerminal) {
                    hx += cursorPos;
                } else if (direction === 'down' && isTerminal) {
                    hx += cursorPos;
                } else if (direction === 'up' && !isTerminal) {
                    hy -= this.opts.fontSizeLarge + this.opts.fontSizeLarge / 4.0;
                    hx -= hydrogenWidth / 2.0;
                } else if (direction === 'down' && !isTerminal) {
                    hy += this.opts.fontSizeLarge + this.opts.fontSizeLarge / 4.0;
                    hx -= hydrogenWidth / 2.0;
                }

                ctx.fillText('H', hx, hy);

                cursorPos += hydrogenWidth;
            } else if (hydrogens > 1) {
                var _hx = x + offsetX;
                var _hy = y + offsetY + fontSizeLarge / 2.0;

                hydrogenWidth = ctx.measureText('H').width;
                ctx.font = this.fontSmall;
                hydrogenCountWidth = ctx.measureText(hydrogens).width;
                cursorPosLeft -= hydrogenWidth + hydrogenCountWidth;

                if (direction === 'left') {
                    _hx += cursorPosLeft;
                } else if (direction === 'right') {
                    _hx += cursorPos;
                } else if (direction === 'up' && isTerminal) {
                    _hx += cursorPos;
                } else if (direction === 'down' && isTerminal) {
                    _hx += cursorPos;
                } else if (direction === 'up' && !isTerminal) {
                    _hy -= this.opts.fontSizeLarge + this.opts.fontSizeLarge / 4.0;
                    _hx -= hydrogenWidth / 2.0;
                } else if (direction === 'down' && !isTerminal) {
                    _hy += this.opts.fontSizeLarge + this.opts.fontSizeLarge / 4.0;
                    _hx -= hydrogenWidth / 2.0;
                }

                ctx.font = this.fontLarge;
                ctx.fillText('H', _hx, _hy);

                ctx.font = this.fontSmall;
                ctx.fillText(hydrogens, _hx + hydrogenWidth / 2.0 + hydrogenCountWidth, _hy + this.opts.fontSizeSmall / 5.0);

                cursorPos += hydrogenWidth + hydrogenWidth / 2.0 + hydrogenCountWidth;
            }

            if (pseudoElementHandled) {
                ctx.restore();
                return;
            }

            for (var key in attachedPseudoElement) {
                if (!attachedPseudoElement.hasOwnProperty(key)) {
                    continue;
                }

                var openParenthesisWidth = 0;
                var closeParenthesisWidth = 0;

                var element = attachedPseudoElement[key].element;
                var elementCount = attachedPseudoElement[key].count;
                var hydrogenCount = attachedPseudoElement[key].hydrogenCount;

                ctx.font = this.fontLarge;

                if (elementCount > 1 && hydrogenCount > 0) {
                    openParenthesisWidth = ctx.measureText('(').width;
                    closeParenthesisWidth = ctx.measureText(')').width;
                }

                var elementWidth = ctx.measureText(element).width;
                var elementCountWidth = 0;

                hydrogenWidth = 0;

                if (hydrogenCount > 0) {
                    hydrogenWidth = ctx.measureText('H').width;
                }

                ctx.font = this.fontSmall;

                if (elementCount > 1) {
                    elementCountWidth = ctx.measureText(elementCount).width;
                }

                hydrogenCountWidth = 0;

                if (hydrogenCount > 1) {
                    hydrogenCountWidth = ctx.measureText(hydrogenCount).width;
                }

                ctx.font = this.fontLarge;

                var _hx2 = x + offsetX;
                var _hy2 = y + offsetY + fontSizeLarge / 2.0;

                ctx.fillStyle = this.getColor(element);

                if (elementCount > 0) {
                    cursorPosLeft -= elementCountWidth;
                }

                if (elementCount > 1 && hydrogenCount > 0) {
                    if (direction === 'left') {
                        cursorPosLeft -= closeParenthesisWidth;
                        ctx.fillText(')', _hx2 + cursorPosLeft, _hy2);
                    } else {
                        ctx.fillText('(', _hx2 + cursorPos, _hy2);
                        cursorPos += openParenthesisWidth;
                    }
                }

                if (direction === 'left') {
                    cursorPosLeft -= elementWidth;
                    ctx.fillText(element, _hx2 + cursorPosLeft, _hy2);
                } else {
                    ctx.fillText(element, _hx2 + cursorPos, _hy2);
                    cursorPos += elementWidth;
                }

                if (hydrogenCount > 0) {
                    if (direction === 'left') {
                        cursorPosLeft -= hydrogenWidth + hydrogenCountWidth;
                        ctx.fillText('H', _hx2 + cursorPosLeft, _hy2);

                        if (hydrogenCount > 1) {
                            ctx.font = this.fontSmall;
                            ctx.fillText(hydrogenCount, _hx2 + cursorPosLeft + hydrogenWidth, _hy2 + this.opts.fontSizeSmall / 5.0);
                        }
                    } else {
                        ctx.fillText('H', _hx2 + cursorPos, _hy2);
                        cursorPos += hydrogenWidth;

                        if (hydrogenCount > 1) {
                            ctx.font = this.fontSmall;
                            ctx.fillText(hydrogenCount, _hx2 + cursorPos, _hy2 + this.opts.fontSizeSmall / 5.0);
                            cursorPos += hydrogenCountWidth;
                        }
                    }
                }

                ctx.font = this.fontLarge;

                if (elementCount > 1 && hydrogenCount > 0) {
                    if (direction === 'left') {
                        cursorPosLeft -= openParenthesisWidth;
                        ctx.fillText('(', _hx2 + cursorPosLeft, _hy2);
                    } else {
                        ctx.fillText(')', _hx2 + cursorPos, _hy2);
                        cursorPos += closeParenthesisWidth;
                    }
                }

                ctx.font = this.fontSmall;

                if (elementCount > 1) {
                    if (direction === 'left') {
                        ctx.fillText(elementCount, _hx2 + cursorPosLeft + openParenthesisWidth + closeParenthesisWidth + hydrogenWidth + hydrogenCountWidth + elementWidth, _hy2 + this.opts.fontSizeSmall / 5.0);
                    } else {
                        ctx.fillText(elementCount, _hx2 + cursorPos, _hy2 + this.opts.fontSizeSmall / 5.0);
                        cursorPos += elementCountWidth;
                    }
                }
            }

            ctx.restore();
        }

        /**
         * Draws a dubug dot at a given coordinate and adds text.
         *
         * @param {Number} x The x coordinate.
         * @param {Number} y The y coordindate.
         * @param {String} [debugText=''] A string.
         * @param {String} [color='#f00'] A color in hex form.
         */

    }, {
        key: 'drawDebugPoint',
        value: function drawDebugPoint(x, y) {
            var debugText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#f00';

            this.drawCircle(x, y, 2, color, true, true, debugText);
        }

        /**
         * Draws a ring inside a provided ring, indicating aromaticity.
         *
         * @param {SmilesDrawer.Ring} ring A ring.
         */

    }, {
        key: 'drawAromaticityRing',
        value: function drawAromaticityRing(ring) {
            var ctx = this.ctx;
            var radius = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());

            ctx.save();
            ctx.strokeStyle = this.getColor('C');
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(ring.center.x + this.offsetX, ring.center.y + this.offsetY, radius - this.opts.bondLength / 3.0 - this.opts.bondSpacing, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }

        /**
         * Clear the canvas.
         *
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        }
    }]);

    return CanvasWrapper;
}();
/** 
 * The main class of the application representing the smiles drawer 
 * 
 * @property {SmilesDrawer.Graph} graph The graph associated with this SmilesDrawer.Drawer instance.
 * @property {Number} ringIdCounter An internal counter to keep track of ring ids.
 * @property {Number} ringConnectionIdCounter An internal counter to keep track of ring connection ids.
 * @property {SmilesDrawer.CanvasWrapper} canvasWrapper The SmilesDrawer.CanvasWrapper associated with this SmilesDrawer.Drawer instance.
 * @property {Number} totalOverlapScore The current internal total overlap score.
 * @property {Object} defaultOptions The default options.
 * @property {Object} opts The merged options.
 * @property {Object} theme The current theme.
 */
SmilesDrawer.Drawer = function () {
    /**
     * The constructor for the class SmilesDrawer.
     *
     * @param {Object} options An object containing custom values for different options. It is merged with the default options.
     */
    function Drawer(options) {
        _classCallCheck(this, Drawer);

        this.graph = null;
        this.ringIdCounter = 0;
        this.ringConnectionIdCounter = 0;
        this.canvasWrapper = null;
        this.totalOverlapScore = 0;

        this.defaultOptions = {
            width: 500,
            height: 500,
            bondLength: 16,
            shortBondLength: 9,
            bondSpacing: 4,
            atomVisualization: 'default',
            allowFlips: false,
            isomeric: false,
            debug: false,
            terminalCarbons: false,
            compactDrawing: true,
            fontSizeLarge: 6,
            fontSizeSmall: 4,
            themes: {
                dark: {
                    C: '#fff',
                    O: '#e74c3c',
                    N: '#3498db',
                    F: '#27ae60',
                    CL: '#16a085',
                    BR: '#d35400',
                    I: '#8e44ad',
                    P: '#d35400',
                    S: '#f1c40f',
                    B: '#e67e22',
                    SI: '#e67e22',
                    H: '#fff',
                    BACKGROUND: '#141414'
                },
                light: {
                    C: '#222',
                    O: '#e74c3c',
                    N: '#3498db',
                    F: '#27ae60',
                    CL: '#16a085',
                    BR: '#d35400',
                    I: '#8e44ad',
                    P: '#d35400',
                    S: '#f1c40f',
                    B: '#e67e22',
                    SI: '#e67e22',
                    H: '#222',
                    BACKGROUND: '#fff'
                }
            }
        };

        this.opts = this.extend(true, this.defaultOptions, options);

        // Set the default theme.
        this.theme = this.opts.themes.dark;
    }

    /**
     * A helper method to extend the default options with user supplied ones.
     */


    _createClass(Drawer, [{
        key: 'extend',
        value: function extend() {
            var that = this;
            var extended = {};
            var deep = false;
            var i = 0;
            var length = arguments.length;

            if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
                deep = arguments[0];
                i++;
            }

            var merge = function merge(obj) {
                for (var prop in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                            extended[prop] = that.extend(true, extended[prop], obj[prop]);
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            for (; i < length; i++) {
                var obj = arguments[i];
                merge(obj);
            }

            return extended;
        }
    }, {
        key: 'draw',


        /**
         * Draws the parsed smiles data to a canvas element.
         *
         * @param {Object} data The tree returned by the smiles parser.
         * @param {String|HTMLElement} target The id of the HTML canvas element the structure is drawn to - or the element itself.
         * @param {String} themeName='dark' The name of the theme to use. Built-in themes are 'light' and 'dark'.
         * @param {Boolean} infoOnly=false Only output info on the molecule without drawing anything to the canvas.
         */
        value: function draw(data, target) {
            var themeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'light';
            var infoOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            this.data = data;
            this.canvasWrapper = new SmilesDrawer.CanvasWrapper(target, this.opts.themes[themeName], this.opts);

            this.ringIdCounter = 0;
            this.ringConnectionIdCounter = 0;

            this.graph = new SmilesDrawer.Graph(data, this.opts.isomeric);
            this.rings = [];
            this.ringConnections = [];

            this.originalRings = [];
            this.originalRingConnections = [];

            this.bridgedRing = false;

            this.initRings();

            if (this.opts.isomeric) {
                this.annotateChirality();
            }

            if (!infoOnly) {
                this.position();

                // Restore the ring information (removes bridged rings and replaces them with the original, multiple, rings)
                this.restoreRingInformation();

                var overlapScore = this.getOverlapScore();

                this.totalOverlapScore = this.getOverlapScore().total;

                for (var i = 0; i < this.graph.edges.length; i++) {
                    var edge = this.graph.edges[i];

                    if (this.isEdgeRotatable(edge)) {
                        var subTreeDepthA = this.getTreeDepth(edge.sourceId, edge.targetId);
                        var subTreeDepthB = this.getTreeDepth(edge.targetId, edge.sourceId);

                        // Only rotate the shorter subtree
                        var a = edge.targetId;
                        var b = edge.sourceId;

                        if (subTreeDepthA > subTreeDepthB) {
                            a = edge.sourceId;
                            b = edge.targetId;
                        }

                        var subTreeOverlap = this.getSubtreeOverlapScore(b, a, overlapScore.vertexScores);

                        if (subTreeOverlap.value > 1.0) {
                            var vertexA = this.graph.vertices[a];
                            var vertexB = this.graph.vertices[b];
                            var neighbours = vertexB.getNeighbours(a);

                            if (neighbours.length === 1) {
                                var neighbour = this.graph.vertices[neighbours[0]];
                                var angle = neighbour.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, SmilesDrawer.MathHelper.toRad(120));

                                // console.log('Rotate ' + neighbour.id + ' by ' + angle + ' away from ' + vertexA.id + ' around ' + vertexB.id);
                                this.rotateSubtree(neighbour.id, vertexB.id, angle, vertexB.position);

                                // If the new overlap is bigger, undo change
                                var newTotalOverlapScore = this.getOverlapScore().total;

                                if (newTotalOverlapScore > this.totalOverlapScore) {
                                    this.rotateSubtree(neighbour.id, vertexB.id, -angle, vertexB.position);
                                } else {
                                    this.totalOverlapScore = newTotalOverlapScore;
                                }
                            } else if (neighbours.length == 2) {
                                // Switch places / sides
                                // If vertex a is in a ring, do nothing
                                if (vertexB.value.rings.length + vertexA.value.rings.length > 0) {
                                    continue;
                                }

                                var neighbourA = this.graph.vertices[neighbours[0]];
                                var neighbourB = this.graph.vertices[neighbours[1]];

                                var angleA = neighbourA.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, SmilesDrawer.MathHelper.toRad(120));
                                var angleB = neighbourB.position.getRotateAwayFromAngle(vertexA.position, vertexB.position, SmilesDrawer.MathHelper.toRad(120));

                                this.rotateSubtree(neighbourA.id, vertexB.id, angleA, vertexB.position);
                                this.rotateSubtree(neighbourB.id, vertexB.id, angleB, vertexB.position);

                                var _newTotalOverlapScore = this.getOverlapScore().total;

                                if (_newTotalOverlapScore > this.totalOverlapScore) {
                                    this.rotateSubtree(neighbourA.id, vertexB.id, -angleA, vertexB.position);
                                    this.rotateSubtree(neighbourB.id, vertexB.id, -angleB, vertexB.position);
                                } else {
                                    this.totalOverlapScore = _newTotalOverlapScore;
                                }
                            }

                            overlapScore = this.getOverlapScore();
                        }
                    }
                }

                this.resolveSecondaryOverlaps(overlapScore.scores);

                // Set the canvas to the appropriate size
                this.canvasWrapper.scale(this.graph.vertices);

                // Initialize pseudo elements or shortcuts
                if (this.opts.compactDrawing && this.opts.atomVisualization === 'default') {
                    this.initPseudoElements();
                }

                // Do the actual drawing
                this.drawEdges(this.opts.debug);
                this.drawVertices(this.opts.debug);

                this.canvasWrapper.reset();
            }
        }

        /**
         * Returns the number of rings this edge is a part of.
         *
         * @param {Number} edgeId The id of an edge.
         * @returns {Number} The number of rings the provided edge is part of.
         */

    }, {
        key: 'edgeRingCount',
        value: function edgeRingCount(edgeId) {
            var edge = this.graph.edges[edgeId];
            var a = this.graph.vertices[edge.sourceId];
            var b = this.graph.vertices[edge.targetId];

            return Math.min(a.value.rings.length, b.value.rings.length);
        }

        /**
         * Returns an array containing the bridged rings associated with this  molecule.
         *
         * @returns {SmilesDrawer.Ring[]} An array containing all bridged rings associated with this molecule.
         */

    }, {
        key: 'getBridgedRings',
        value: function getBridgedRings() {
            var bridgedRings = [];

            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].isBridged) {
                    bridgedRings.push(this.rings[i]);
                }
            }

            return bridgedRings;
        }

        /**
         * Returns an array containing all fused rings associated with this molecule.
         *
         * @returns {SmilesDrawer.Ring[]} An array containing all fused rings associated with this molecule.
         */

    }, {
        key: 'getFusedRings',
        value: function getFusedRings() {
            var fusedRings = [];

            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].isFused) {
                    fusedRings.push(this.rings[i]);
                }
            }

            return fusedRings;
        }

        /**
         * Returns an array containing all spiros associated with this molecule.
         *
         * @returns {SmilesDrawer.Ring[]} An array containing all spiros associated with this molecule.
         */

    }, {
        key: 'getSpiros',
        value: function getSpiros() {
            var spiros = [];

            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].isSpiro) {
                    spiros.push(this.rings[i]);
                }
            }

            return spiros;
        }

        /**
         * Returns a string containing a semicolon and new-line separated list of ring properties: Id; Members Count; Neighbours Count; IsSpiro; IsFused; IsBridged; Ring Count (subrings of bridged rings); Insiders Count (the number of vertices contained within a bridged ring)
         *
         * @returns {String} A string as described in the method description.
         */

    }, {
        key: 'printRingInfo',
        value: function printRingInfo() {
            var result = '';
            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];

                result += ring.id + ';';
                result += ring.members.length + ';';
                result += ring.neighbours.length + ';';
                result += ring.isSpiro ? 'true;' : 'false;';
                result += ring.isFused ? 'true;' : 'false;';
                result += ring.isBridged ? 'true;' : 'false;';
                result += ring.rings.length + ';';
                result += ring.insiders.length;
                result += '\n';
            }

            return result;
        }

        /**
         * Returns the total overlap score of the current molecule.
         *
         * @returns {Number} The overlap score.
         */

    }, {
        key: 'getTotalOverlapScore',
        value: function getTotalOverlapScore() {
            return this.totalOverlapScore;
        }

        /**
         * Returns the ring count of the current molecule.
         *
         * @returns {Number} The ring count.
         */

    }, {
        key: 'getRingCount',
        value: function getRingCount() {
            return this.rings.length;
        }

        /**
         * Checks whether or not the current molecule  a bridged ring.
         *
         * @returns {Boolean} A boolean indicating whether or not the current molecule  a bridged ring.
         */

    }, {
        key: 'hasBridgedRing',
        value: function hasBridgedRing() {
            return this.bridgedRing;
        }

        /**
         * Returns the number of heavy atoms (non-hydrogen) in the current molecule.
         *
         * @returns {Number} The heavy atom count.
         */

    }, {
        key: 'getHeavyAtomCount',
        value: function getHeavyAtomCount() {
            var hac = 0;

            for (var i = 0; i < this.graph.vertices.length; i++) {
                if (this.graph.vertices[i].value.element !== 'H') {
                    hac++;
                }
            }

            return hac;
        }

        /**
         * Returns the type of the ringbond (e.g. '=' for a double bond). The ringbond represents the break in a ring introduced when creating the MST. If the two vertices supplied as arguments are not part of a common ringbond, the method returns null.
         *
         * @param {SmilesDrawer.Vertex} vertexA A vertex.
         * @param {SmilesDrawer.Vertex} vertexB A vertex.
         * @returns {String|null} Returns the ringbond type or null, if the two supplied vertices are not connected by a ringbond.
         */

    }, {
        key: 'getRingbondType',
        value: function getRingbondType(vertexA, vertexB) {
            // Checks whether the two vertices are the ones connecting the ring
            // and what the bond type should be.
            if (vertexA.value.getRingbondCount() < 1 || vertexB.value.getRingbondCount() < 1) {
                return null;
            }

            for (var i = 0; i < vertexA.value.ringbonds.length; i++) {
                for (var j = 0; j < vertexB.value.ringbonds.length; j++) {
                    // if(i != j) continue;
                    if (vertexA.value.ringbonds[i].id === vertexB.value.ringbonds[j].id) {
                        // If the bonds are equal, it doesn't matter which bond is returned.
                        // if they are not equal, return the one that is not the default ("-")
                        if (vertexA.value.ringbonds[i].bondType === '-') {
                            return vertexB.value.ringbonds[j].bond;
                        } else {
                            return vertexA.value.ringbonds[i].bond;
                        }
                    }
                }
            }

            return null;
        }

        /**
         * Initializes rings and ringbonds for the current molecule.
         */

    }, {
        key: 'initRings',
        value: function initRings() {
            var openBonds = new Map();

            // Close the open ring bonds (spanning tree -> graph)
            for (var i = this.graph.vertices.length - 1; i >= 0; i--) {
                var vertex = this.graph.vertices[i];

                if (vertex.value.ringbonds.length === 0) {
                    continue;
                }

                for (var j = 0; j < vertex.value.ringbonds.length; j++) {
                    var ringbondId = vertex.value.ringbonds[j].id;

                    // If the other ringbond id has not been discovered,
                    // add it to the open bonds map and continue.
                    // if the other ringbond id has already been discovered,
                    // create a bond between the two atoms.
                    if (!openBonds.has(ringbondId)) {
                        openBonds.set(ringbondId, vertex.id);
                    } else {
                        var sourceVertexId = vertex.id;
                        var targetVertexId = openBonds.get(ringbondId);
                        var edgeId = this.graph.addEdge(new SmilesDrawer.Edge(sourceVertexId, targetVertexId, 1));
                        var targetVertex = this.graph.vertices[targetVertexId];

                        vertex.addChild(targetVertexId);
                        vertex.value.addNeighbouringElement(targetVertex.value.element);
                        targetVertex.addChild(sourceVertexId);
                        targetVertex.value.addNeighbouringElement(vertex.value.element);
                        vertex.edges.push(edgeId);
                        targetVertex.edges.push(edgeId);

                        openBonds.delete(ringbondId);
                    }
                }
            }

            // Get the rings in the graph (the SSSR)
            var rings = SmilesDrawer.SSSR.getRings(this.graph.getComponentsAdjacencyMatrix());

            if (rings === null) {
                return;
            }

            for (var i = 0; i < rings.length; i++) {
                var ringVertices = [].concat(_toConsumableArray(rings[i]));
                var ringId = this.addRing(new SmilesDrawer.Ring(ringVertices));

                // Add the ring to the atoms
                for (var j = 0; j < ringVertices.length; j++) {
                    this.graph.vertices[ringVertices[j]].value.rings.push(ringId);
                }
            }

            // Find connection between rings
            // Check for common vertices and create ring connections. This is a bit
            // ugly, but the ringcount is always fairly low (< 100)
            for (var i = 0; i < this.rings.length - 1; i++) {
                for (var j = i + 1; j < this.rings.length; j++) {
                    var a = this.rings[i];
                    var b = this.rings[j];
                    var ringConnection = new SmilesDrawer.RingConnection(a, b);

                    // If there are no vertices in the ring connection, then there
                    // is no ring connection
                    if (ringConnection.vertices.size > 0) {
                        this.addRingConnection(ringConnection);
                    }
                }
            }

            // Add neighbours to the rings
            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];
                ring.neighbours = SmilesDrawer.RingConnection.getNeighbours(this.ringConnections, ring.id);
            }

            // Backup the ring information to restore after placing the bridged ring.
            // This is needed in order to identify aromatic rings and stuff like this in
            // rings that are member of the superring.
            this.backupRingInformation();

            // return;

            // Replace rings contained by a larger bridged ring with a bridged ring
            while (this.rings.length > 0) {
                var id = -1;
                for (var i = 0; i < this.rings.length; i++) {
                    var _ring2 = this.rings[i];

                    if (this.isPartOfBridgedRing(_ring2.id) && !_ring2.isBridged) {
                        id = _ring2.id;
                    }
                }

                if (id === -1) {
                    break;
                }

                var _ring = this.getRing(id);

                var involvedRings = this.getBridgedRingRings(_ring.id);

                this.bridgedRing = true;
                this.createBridgedRing(involvedRings, _ring.members[0]);

                // Remove the rings
                for (var i = 0; i < involvedRings.length; i++) {
                    this.removeRing(involvedRings[i]);
                }
            }
        }

        /**
         * Returns all rings connected by bridged bonds starting from the ring with the supplied ring id.
         *
         * @param {Number} ringId A ring id.
         * @returns {Number[]} An array containing all ring ids of rings part of a bridged ring system.
         */

    }, {
        key: 'getBridgedRingRings',
        value: function getBridgedRingRings(ringId) {
            var involvedRings = [];
            var that = this;

            var recurse = function recurse(r) {
                var ring = that.getRing(r);

                involvedRings.push(r);

                for (var i = 0; i < ring.neighbours.length; i++) {
                    var n = ring.neighbours[i];

                    if (involvedRings.indexOf(n) === -1 && n !== r && SmilesDrawer.RingConnection.isBridge(that.ringConnections, that.graph.vertices, r, n)) {
                        recurse(n);
                    }
                }
            };

            recurse(ringId);

            return SmilesDrawer.ArrayHelper.unique(involvedRings);
        }

        /**
         * Checks whether or not a ring is part of a bridged ring.
         *
         * @param {Number} ringId A ring id.
         * @returns {Boolean} A boolean indicating whether or not the supplied ring (by id) is part of a bridged ring system.
         */

    }, {
        key: 'isPartOfBridgedRing',
        value: function isPartOfBridgedRing(ringId) {
            for (var i = 0; i < this.ringConnections.length; i++) {
                if (this.ringConnections[i].containsRing(ringId) && this.ringConnections[i].isBridge(this.graph.vertices)) {

                    return true;
                }
            }

            return false;
        }

        /**
         * Creates a bridged ring.
         *
         * @param {Number[]} ringIds An array of ids of rings involved in the bridged ring.
         * @param {Number} sourceVertexId The vertex id to start the bridged ring discovery from.
         * @returns {SmilesDrawer.Ring} The bridged ring.
         */

    }, {
        key: 'createBridgedRing',
        value: function createBridgedRing(ringIds, sourceVertexId) {
            var bridgedRing = [];
            var vertices = [];
            var neighbours = [];

            for (var i = 0; i < ringIds.length; i++) {
                var _ring3 = this.getRing(ringIds[i]);

                for (var j = 0; j < _ring3.members.length; j++) {
                    vertices.push(_ring3.members[j]);
                }

                for (var j = 0; j < _ring3.neighbours.length; j++) {
                    neighbours.push(_ring3.neighbours[j]);
                }
            }

            // Remove duplicates
            vertices = SmilesDrawer.ArrayHelper.unique(vertices);

            // A vertex is part of the bridged ring if it only belongs to
            // one of the rings (or to another ring
            // which is not part of the bridged ring).
            var leftovers = [];

            for (var i = 0; i < vertices.length; i++) {
                var vertex = this.graph.vertices[vertices[i]];
                var intersection = SmilesDrawer.ArrayHelper.intersection(ringIds, vertex.value.rings);

                if (vertex.value.rings.length === 1 || intersection.length === 1) {
                    bridgedRing.push(vertex.id);
                } else {
                    leftovers.push(vertex.id);
                }
            }

            // Vertices can also be part of multiple rings and lay on the bridged ring,
            // however, they have to have at least two neighbours that are not part of
            // two rings
            var tmp = [];
            var insideRing = [];

            for (var i = 0; i < leftovers.length; i++) {
                var _vertex = this.graph.vertices[leftovers[i]];
                var onRing = false;

                for (var _j = 0; _j < _vertex.edges.length; _j++) {
                    if (this.edgeRingCount(_vertex.edges[_j]) === 1) {
                        onRing = true;
                    }
                }

                if (onRing) {
                    _vertex.value.isBridgeNode = true;
                    tmp.push(_vertex.id);
                } else {
                    _vertex.value.isBridge = true;
                    insideRing.push(_vertex.id);
                }
            }

            // Merge the two arrays containing members of the bridged ring
            var ringMembers = SmilesDrawer.ArrayHelper.merge(bridgedRing, tmp);

            // The neighbours of the rings in the bridged ring that are not connected by a
            // bridge are now the neighbours of the bridged ring
            neighbours = SmilesDrawer.ArrayHelper.unique(neighbours);
            neighbours = SmilesDrawer.ArrayHelper.removeAll(neighbours, ringIds);

            // Create the ring
            var ring = new SmilesDrawer.Ring(ringMembers);

            ring.isBridged = true;
            ring.neighbours = neighbours;
            ring.insiders = insideRing;

            for (var i = 0; i < ringIds.length; i++) {
                ring.rings.push(this.getRing(ringIds[i]).clone());
            }

            this.addRing(ring);

            this.graph.vertices[sourceVertexId].value.anchoredRings.push(ring.id);

            // Atoms inside the ring are no longer part of a ring but are now
            // associated with the bridged ring
            for (var i = 0; i < insideRing.length; i++) {
                var _vertex2 = this.graph.vertices[insideRing[i]];

                _vertex2.value.rings = [];
                _vertex2.value.anchoredRings = [];
                _vertex2.value.bridgedRing = ring.id;
            }

            // Remove former rings from members of the bridged ring and add the bridged ring
            for (var i = 0; i < ringMembers.length; i++) {
                var _vertex3 = this.graph.vertices[ringMembers[i]];

                _vertex3.value.rings = SmilesDrawer.ArrayHelper.removeAll(_vertex3.value.rings, ringIds);
                _vertex3.value.rings.push(ring.id);
            }

            // Remove all the ring connections no longer used
            for (var i = 0; i < ringIds.length; i++) {
                for (var j = i + 1; j < ringIds.length; j++) {
                    this.removeRingConnectionsBetween(ringIds[i], ringIds[j]);
                }
            }

            // Update the ring connections and add this ring to the neighbours neighbours
            for (var i = 0; i < neighbours.length; i++) {
                var connections = this.getRingConnections(neighbours[i], ringIds);

                for (var j = 0; j < connections.length; j++) {
                    this.getRingConnection(connections[j]).updateOther(ring.id, neighbours[i]);
                }

                this.getRing(neighbours[i]).neighbours.push(ring.id);
            }

            return ring;
        }

        /**
         * Checks whether or not two vertices are in the same ring.
         *
         * @param {SmilesDrawer.Vertex} vertexA A vertex.
         * @param {SmilesDrawer.Vertex} vertexB A vertex.
         * @returns {Boolean} A boolean indicating whether or not the two vertices are in the same ring.
         */

    }, {
        key: 'areVerticesInSameRing',
        value: function areVerticesInSameRing(vertexA, vertexB) {
            // This is a little bit lighter (without the array and push) than
            // getCommonRings().length > 0
            for (var i = 0; i < vertexA.value.rings.length; i++) {
                for (var j = 0; j < vertexB.value.rings.length; j++) {
                    if (vertexA.value.rings[i] === vertexB.value.rings[j]) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Returns an array of ring ids shared by both vertices.
         *
         * @param {SmilesDrawer.Vertex} vertexA A vertex.
         * @param {SmilesDrawer.Vertex} vertexB A vertex.
         * @returns {Number[]} An array of ids of rings shared by the two vertices.
         */

    }, {
        key: 'getCommonRings',
        value: function getCommonRings(vertexA, vertexB) {
            var commonRings = [];

            for (var i = 0; i < vertexA.value.rings.length; i++) {
                for (var j = 0; j < vertexB.value.rings.length; j++) {
                    if (vertexA.value.rings[i] == vertexB.value.rings[j]) {
                        commonRings.push(vertexA.value.rings[i]);
                    }
                }
            }

            return commonRings;
        }

        /**
         * Returns the smallest ring shared by the two vertices.
         *
         * @param {SmilesDrawer.Vertex} vertexA A vertex.
         * @param {SmilesDrawer.Vertex} vertexB A vertex.
         * @returns {SmilesDrawer.Ring|null} If a smallest common ring exists, that ring, else null.
         */

    }, {
        key: 'getSmallestCommonRing',
        value: function getSmallestCommonRing(vertexA, vertexB) {
            var commonRings = this.getCommonRings(vertexA, vertexB);
            var minSize = Number.MAX_VALUE;
            var smallestCommonRing = null;

            for (var i = 0; i < commonRings.length; i++) {
                var size = this.getRing(commonRings[i]).getSize();

                if (size < minSize) {
                    minSize = size;
                    smallestCommonRing = this.getRing(commonRings[i]);
                }
            }

            return smallestCommonRing;
        }

        /**
         * Returns the aromatic or largest ring shared by the two vertices.
         *
         * @param {SmilesDrawer.Vertex} vertexA A vertex.
         * @param {SmilesDrawer.Vertex} vertexB A vertex.
         * @returns {SmilesDrawer.Ring|null} If an aromatic common ring exists, that ring, else the largest (non-aromatic) ring, else null.
         */

    }, {
        key: 'getLargestOrAromaticCommonRing',
        value: function getLargestOrAromaticCommonRing(vertexA, vertexB) {
            var commonRings = this.getCommonRings(vertexA, vertexB);
            var maxSize = 0;
            var largestCommonRing = null;

            for (var i = 0; i < commonRings.length; i++) {
                var ring = this.getRing(commonRings[i]);
                var size = ring.getSize();

                if (ring.isBenzeneLike(this.graph.vertices)) {
                    return ring;
                } else if (size > maxSize) {
                    maxSize = size;
                    largestCommonRing = ring;
                }
            }

            return largestCommonRing;
        }

        /**
        * Returns an array of vertices positioned at a specified location.
        *
        * @param {SmilesDrawer.Vector2} position The position to search for vertices.
        * @param {Number} radius The radius within to search.
        * @param {Number} excludeVertexId A vertex id to be excluded from the search results.
        * @returns {Number[]} An array containing vertex ids in a given location.
        */

    }, {
        key: 'getVerticesAt',
        value: function getVerticesAt(position, radius, excludeVertexId) {
            var locals = [];

            for (var i = 0; i < this.graph.vertices.length; i++) {
                var vertex = this.graph.vertices[i];

                if (vertex.id === excludeVertexId || !vertex.positioned) {
                    continue;
                }

                var distance = position.distance(vertex.position);

                if (distance <= radius) {
                    locals.push(vertex.id);
                }
            }

            return locals;
        }

        /**
         * Returns the closest vertex (connected as well as unconnected).
         *
         * @param {SmilesDrawer.Vertex} vertex The vertex of which to find the closest other vertex.
         * @returns {SmilesDrawer.Vertex} The closest vertex.
         */

    }, {
        key: 'getClosestVertex',
        value: function getClosestVertex(vertex) {
            var minDist = 99999;
            var minVertex = null;

            for (var i = 0; i < this.graph.vertices.length; i++) {
                var v = this.graph.vertices[i];

                if (v.id === vertex.id) {
                    continue;
                }

                var distSq = vertex.position.distanceSq(v.position);

                if (distSq < minDist) {
                    minDist = distSq;
                    minVertex = v;
                }
            }

            return minVertex;
        }

        /**
         * Returns the closest vertex (connected as well as unconnected), which is an endpoint.
         *
         * @param {SmilesDrawer.Vertex} vertex The vertex of which to find the closest other vertex.
         * @returns {SmilesDrawer.Vertex} The closest endpoint vertex.
         */

    }, {
        key: 'getClosestEndpointVertex',
        value: function getClosestEndpointVertex(vertex) {
            var minDist = 99999;
            var minVertex = null;

            for (var i = 0; i < this.graph.vertices.length; i++) {
                var v = this.graph.vertices[i];

                if (v.id === vertex.id || v.getNeighbourCount() > 1) {
                    continue;
                }

                var distSq = vertex.position.distanceSq(v.position);

                if (distSq < minDist) {
                    minDist = distSq;
                    minVertex = v;
                }
            }

            return minVertex;
        }

        /**
         * Add a ring to this representation of a molecule.
         *
         * @param {SmilesDrawer.Ring} ring A new ring.
         * @returns {Number} The ring id of the new ring.
         */

    }, {
        key: 'addRing',
        value: function addRing(ring) {
            ring.id = this.ringIdCounter++;
            this.rings.push(ring);

            return ring.id;
        }

        /**
         * Removes a ring from the array of rings associated with the current molecule.
         *
         * @param {Number} ringId A ring id.
         */

    }, {
        key: 'removeRing',
        value: function removeRing(ringId) {
            this.rings = this.rings.filter(function (item) {
                return item.id !== ringId;
            });

            // Also remove ring connections involving this ring
            this.ringConnections = this.ringConnections.filter(function (item) {
                return item.firstRingId !== ringId && item.secondRingId !== ringId;
            });

            // Remove the ring as neighbour of other rings
            for (var i = 0; i < this.rings.length; i++) {
                var r = this.rings[i];
                r.neighbours = r.neighbours.filter(function (item) {
                    return item !== ringId;
                });
            }
        }

        /**
         * Gets a ring object from the array of rings associated with the current molecule by its id. The ring id is not equal to the index, since rings can be added and removed when processing bridged rings.
         *
         * @param {Number} ringId A ring id.
         * @returns {SmilesDrawer.Ring} A ring associated with the current molecule.
         */

    }, {
        key: 'getRing',
        value: function getRing(ringId) {
            for (var i = 0; i < this.rings.length; i++) {
                if (this.rings[i].id == ringId) {
                    return this.rings[i];
                }
            }
        }

        /**
         * Add a ring connection to this representation of a molecule.
         *
         * @param {SmilesDrawer.RingConnection} ringConnection A new ringConnection.
         * @returns {Number} The ring connection id of the new ring connection.
         */

    }, {
        key: 'addRingConnection',
        value: function addRingConnection(ringConnection) {
            ringConnection.id = this.ringConnectionIdCounter++;
            this.ringConnections.push(ringConnection);

            return ringConnection.id;
        }

        /**
         * Removes a ring connection from the array of rings connections associated with the current molecule.
         *
         * @param {Number} ringConnectionId A ring connection id.
         */

    }, {
        key: 'removeRingConnection',
        value: function removeRingConnection(ringConnectionId) {
            this.ringConnections = this.ringConnections.filter(function (item) {
                return item.id !== ringConnectionId;
            });
        }

        /**
         * Removes all ring connections between two vertices.
         *
         * @param {Number} vertexIdA A vertex id.
         * @param {Number} vertexIdB A vertex id.
         */

    }, {
        key: 'removeRingConnectionsBetween',
        value: function removeRingConnectionsBetween(vertexIdA, vertexIdB) {
            var toRemove = [];
            for (var i = 0; i < this.ringConnections.length; i++) {
                var ringConnection = this.ringConnections[i];

                if (ringConnection.firstRingId === vertexIdA && ringConnection.secondRingId === vertexIdB || ringConnection.firstRingId === vertexIdB && ringConnection.secondRingId === vertexIdA) {
                    toRemove.push(ringConnection.id);
                }
            }

            for (var i = 0; i < toRemove.length; i++) {
                this.removeRingConnection(toRemove[i]);
            }
        }

        /**
         * Get a ring connection with a given id.
         * 
         * @param {Number} id 
         * @returns {SmilesDrawer.RingConnection} The ring connection with the specified id.
         */

    }, {
        key: 'getRingConnection',
        value: function getRingConnection(id) {
            for (var i = 0; i < this.ringConnections.length; i++) {
                if (this.ringConnections[i].id == id) {
                    return this.ringConnections[i];
                }
            }
        }

        /**
         * Get the ring connections associated with a ring, the ring connections between two rings or the ring connections between one ring and multiple other rings.
         *
         * @param {Number} ringId A ring id.
         * @param {Number|Number[]|null} [ringIds=null] A ring id, an array of ring ids or null.
         * @returns {Number[]} An array of ring connection ids.
         */

    }, {
        key: 'getRingConnections',
        value: function getRingConnections(ringId) {
            var ringIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var ringConnections = [];

            if (ringIds === null) {
                for (var i = 0; i < this.ringConnections.length; i++) {
                    var ringConnection = this.ringConnections[i];

                    if (ringConnection.firstRingId === ringId || ringConnection.secondRingId === ringId) {
                        ringConnections.push(ringConnection.id);
                    }
                }
            } else if (ringIds.constructor !== Array) {
                for (var i = 0; i < this.ringConnections.length; i++) {
                    var _ringConnection = this.ringConnections[i];

                    if (_ringConnection.firstRingId === ringId && _ringConnection.secondRingId === ringIds || _ringConnection.firstRingId === ringIds && _ringConnection.secondRingId === ringId) {
                        ringConnections.push(_ringConnection.id);
                    }
                }
            } else {
                for (var i = 0; i < this.ringConnections.length; i++) {
                    for (var j = 0; j < ringIds.length; j++) {
                        var id = ringIds[j];
                        var _ringConnection2 = this.ringConnections[i];

                        if (_ringConnection2.firstRingId === ringId && _ringConnection2.secondRingId === id || _ringConnection2.firstRingId === id && _ringConnection2.secondRingId === ringId) {
                            ringConnections.push(_ringConnection2.id);
                        }
                    }
                }
            }

            return ringConnections;
        }

        /**
         * Check whether or not the two vertices specified span a bond which is a ring connection (fused rings).
         * 
         * @param {Number} vertexIdA A vertex id.
         * @param {Number} vertexIdB A vertex id.
         * @returns {Boolean} Returns a boolean indicating whether or not the two vertices specify a ringbond.
         */

    }, {
        key: 'isRingConnection',
        value: function isRingConnection(vertexIdA, vertexIdB) {
            for (var i = 0; i < this.ringConnections.length; i++) {
                var ringConnection = this.ringConnections[i];

                if (ringConnection.vertices.size !== 2) {
                    continue;
                }

                if (ringConnection.vertices.has(vertexIdA) && ringConnection.vertices.has(vertexIdB)) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Returns the overlap score of the current molecule based on its positioned vertices. The higher the score, the more overlaps occur in the structure drawing.
         *
         * @returns {Object} Returns the total overlap score and the overlap score of each vertex sorted by score (higher to lower). Example: { total: 99, scores: [ { id: 0, score: 22 }, ... ]  }
         */

    }, {
        key: 'getOverlapScore',
        value: function getOverlapScore() {
            var total = 0.0;
            var overlapScores = new Float32Array(this.graph.vertices.length);

            for (var i = 0; i < this.graph.vertices.length; i++) {
                overlapScores[i] = 0;
            }

            for (var i = 0; i < this.graph.vertices.length; i++) {
                for (var j = i + 1; j < this.graph.vertices.length; j++) {
                    var a = this.graph.vertices[i];
                    var b = this.graph.vertices[j];

                    var dist = SmilesDrawer.Vector2.subtract(a.position, b.position).length();

                    if (dist < this.opts.bondLength) {
                        var weighted = (this.opts.bondLength - dist) / this.opts.bondLength;
                        total += weighted;
                        overlapScores[i] += weighted;
                        overlapScores[j] += weighted;
                    }
                }
            }

            var sortable = [];

            for (var i = 0; i < this.graph.vertices.length; i++) {
                sortable.push({
                    id: i,
                    score: overlapScores[i]
                });
            }

            sortable.sort(function (a, b) {
                return b.score - a.score;
            });

            return {
                total: total,
                scores: sortable,
                vertexScores: overlapScores
            };
        }

        /**
         * When drawing a double bond, choose the side to place the double bond. E.g. a double bond should always been drawn inside a ring.
         *
         * @param {SmilesDrawer.Vertex} vertexA A vertex.
         * @param {SmilesDrawer.Vertex} vertexB A vertex.
         * @param {SmilesDrawer.Vector2[]} sides An array containing the two normals of the line spanned by the two provided vertices.
         * @returns {Object} Returns an object containing the following information: {
                totalSideCount: Counts the sides of each vertex in the molecule, is an array [ a, b ],
                totalPosition: Same as position, but based on entire molecule,
                sideCount: Counts the sides of each neighbour, is an array [ a, b ],
                position: which side to position the second bond, is 0 or 1, represents the index in the normal array. This is based on only the neighbours
                anCount: the number of neighbours of vertexA,
                bnCount: the number of neighbours of vertexB
            }
         */

    }, {
        key: 'chooseSide',
        value: function chooseSide(vertexA, vertexB, sides) {
            // Check which side has more vertices
            // Get all the vertices connected to the both ends
            var an = vertexA.getNeighbours(vertexB.id);
            var bn = vertexB.getNeighbours(vertexA.id);
            var anCount = an.length;
            var bnCount = bn.length;

            // All vertices connected to the edge vertexA to vertexB
            var tn = SmilesDrawer.ArrayHelper.merge(an, bn);

            // Only considering the connected vertices
            var sideCount = [0, 0];

            for (var i = 0; i < tn.length; i++) {
                var v = this.graph.vertices[tn[i]].position;

                if (v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
                    sideCount[0]++;
                } else {
                    sideCount[1]++;
                }
            }

            // Considering all vertices in the graph, this is to resolve ties
            // from the above side counts
            var totalSideCount = [0, 0];

            for (var i = 0; i < this.graph.vertices.length; i++) {
                var _v = this.graph.vertices[i].position;

                if (_v.sameSideAs(vertexA.position, vertexB.position, sides[0])) {
                    totalSideCount[0]++;
                } else {
                    totalSideCount[1]++;
                }
            }

            return {
                totalSideCount: totalSideCount,
                totalPosition: totalSideCount[0] > totalSideCount[1] ? 0 : 1,
                sideCount: sideCount,
                position: sideCount[0] > sideCount[1] ? 0 : 1,
                anCount: anCount,
                bnCount: bnCount
            };
        }

        /**
         * Checks whether or not two vertices are connected.
         *
         * @param {Number} vertexIdA A vertex id.
         * @param {Number} vertexIdA A vertex id.
         * @returns {Boolean} A boolean indicating whether or not two vertices are connected.
         */

    }, {
        key: 'areConnected',
        value: function areConnected(vertexIdA, vertexIdB) {
            for (var i = 0; i < this.graph.edges.length; i++) {
                var edge = this.graph.edges[i];

                if (edge.sourceId === vertexIdA && edge.targetId === vertexIdB || edge.sourceId === vertexIdB && edge.targetId === vertexIdA) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Returns the weight of the edge between two given vertices.
         *
         * @param {Number} vertexIdA A vertex id.
         * @param {Number} vertexIdB A vertex id.
         * @returns {Number|null} The weight of the edge or, if no edge can be found, null.
         */

    }, {
        key: 'getEdgeWeight',
        value: function getEdgeWeight(vertexIdA, vertexIdB) {
            for (var i = 0; i < this.graph.edges.length; i++) {
                var edge = this.graph.edges[i];

                if (edge.sourceId == vertexIdA && edge.targetId == vertexIdB || edge.targetId == vertexIdA && edge.sourceId == vertexIdB) {
                    return edge.weight;
                }
            }

            return null;
        }

        /**
         * Applies a force-based layout to a set of provided vertices.
         *
         * @param {Number[]} vertexIds An array containing vertexIds to be placed using the force based layout.
         * @param {SmilesDrawer.Vector2} center The center of the layout.
         * @param {Number} startVertexId A vertex id. Should be the starting vertex - e.g. the first to be positioned and connected to a previously place vertex.
         * @param {SmilesDrawer.Ring} ring The bridged ring associated with this force-based layout.
         */

    }, {
        key: 'forceLayout',
        value: function forceLayout(vertexIds, center, startVertexId, ring) {
            // Constants
            var l = this.opts.bondLength;

            var startVertex = this.graph.vertices[startVertexId];
            var startVertexNeighbours = startVertex.getNeighbours();

            // Add neighbours that are already positioned to the vertices to prevent overlap
            for (var i = 0; i < startVertexNeighbours.length; i++) {
                if (this.graph.vertices[startVertexNeighbours[i]].positioned) {
                    vertexIds.push(startVertexNeighbours[i]);
                }
            }

            // Create adjencency matrix
            var totalLength = vertexIds.length + ring.rings.length;
            var vToId = [vertexIds.length];
            var idToV = new Map();
            var adjMatrix = [totalLength];
            var edges = [];

            for (var i = 0; i < totalLength; i++) {
                adjMatrix[i] = [totalLength];

                for (var j = 0; j < totalLength; j++) {
                    adjMatrix[i][j] = 0;
                }
            }

            for (var i = 0; i < vertexIds.length; i++) {
                vToId[i] = this.graph.vertices[vertexIds[i]].id;
                idToV.set(vToId[i], i);
            }

            for (var i = 0; i < vertexIds.length - 1; i++) {
                for (var j = i; j < vertexIds.length; j++) {
                    var edge = this.graph.getEdge(vToId[i], this.graph.vertices[vertexIds[j]].id);

                    if (edge !== null) {
                        adjMatrix[i][j] = l;
                        adjMatrix[j][i] = l;
                        edges.push([i, j]);
                    }
                }
            }

            for (var i = 0; i < ring.rings.length; i++) {
                var r = ring.rings[i];
                var index = vertexIds.length + i;

                for (var j = 0; j < r.members.length; j++) {
                    var id = idToV.get(r.members[j]);
                    var radius = SmilesDrawer.MathHelper.polyCircumradius(l, r.getSize());

                    adjMatrix[id][index] = radius;
                    adjMatrix[index][id] = radius;
                }
            }

            for (var i = 0; i < edges.length; i++) {
                for (var j = 0; j < totalLength; j++) {
                    adjMatrix[j].push(0);
                }

                adjMatrix.push([]);

                for (var j = 0; j < totalLength + edges.length; j++) {
                    adjMatrix[totalLength + i].push(0);
                }
            }

            // Connect ring centers with edges 
            for (var i = 0; i < ring.rings.length; i++) {
                var _r = ring.rings[i];
                var ringIndex = vertexIds.length + i;
                var _ringSize = _r.getSize();

                for (var j = 0; j < edges.length; j++) {
                    var a = edges[j][0];

                    // If the vertex and the ring are connected, so must the edge be
                    if (adjMatrix[ringIndex][a] !== 0) {
                        var apothem = SmilesDrawer.MathHelper.apothem(adjMatrix[ringIndex][a], _ringSize);

                        adjMatrix[ringIndex][totalLength + j] = apothem;
                        adjMatrix[totalLength + j][ringIndex] = apothem;
                    }
                }

                // Connecting ring centers, let them have a distance of apothem + apothem
                for (var j = i; j < ring.rings.length; j++) {
                    var r2 = ring.rings[j];

                    if (r2.id === _r.id) {
                        continue;
                    }

                    // If they do not share a vertex, they are not connected
                    var intersection = SmilesDrawer.ArrayHelper.intersection(_r.members, r2.members).length;

                    if (intersection === 0) {
                        continue;
                    }

                    var ringIndex2 = vertexIds.length + j;
                    var ringSize2 = r2.getSize();
                    var dist = SmilesDrawer.MathHelper.apothemFromSideLength(l, _ringSize) + SmilesDrawer.MathHelper.apothemFromSideLength(l, ringSize2);

                    adjMatrix[ringIndex][ringIndex2] = dist;
                    adjMatrix[ringIndex2][ringIndex] = dist;
                }
            }

            totalLength += edges.length;

            var edgeOffset = totalLength - edges.length;
            var forces = [totalLength];
            var positions = [totalLength];
            var positioned = [totalLength];
            var isRingCenter = [totalLength];
            var ringSize = [totalLength];
            var ringCount = [totalLength];

            for (var i = 0; i < totalLength; i++) {
                isRingCenter[i] = i >= vertexIds.length && i < edgeOffset;

                ringCount[i] = i < vertexIds.length ? this.graph.vertices[vToId[i]].value.originalRings.length : 1;

                if (isRingCenter[i]) {
                    ringSize[i] = ring.rings[i - vertexIds.length].members.length;
                } else {
                    ringSize[i] = 1;
                }
            }

            for (var i = 0; i < totalLength; i++) {
                forces[i] = new SmilesDrawer.Vector2();
                positions[i] = new SmilesDrawer.Vector2(center.x + Math.random() * l, center.y + Math.random() * l);
                positioned[i] = false;

                if (i >= vertexIds.length) {
                    continue;
                }

                var vertex = this.graph.vertices[vToId[i]];
                positions[i] = vertex.position.clone();

                if (vertex.positioned && ring.rings.length === 2) {
                    positioned[i] = true;
                }
            }

            var k = l / 2.0;
            var kSq = k * k;
            var c = 0.005;
            var maxMove = l / 2.0;
            var maxDist = l * 2.0;
            var maxDistSq = maxDist * maxDist;

            for (var n = 0; n < 600; n++) {
                for (var i = 0; i < totalLength; i++) {
                    forces[i].x = 0;
                    forces[i].y = 0;
                }

                // Set the positions of the edge midpoints
                for (var i = 0; i < edges.length; i++) {
                    var _index = edgeOffset + i;
                    var _a = positions[edges[i][0]];
                    var b = positions[edges[i][1]];

                    positions[_index] = SmilesDrawer.Vector2.midpoint(_a, b);
                }

                // Repulsive forces
                for (var u = 0; u < totalLength - 1; u++) {
                    for (var v = u + 1; v < totalLength; v++) {
                        if (n <= 250 && !(isRingCenter[u] && isRingCenter[v])) {
                            continue;
                        }

                        if (n > 250 && isRingCenter[u] && isRingCenter[v]) {
                            continue;
                        }

                        if (ring.rings.length < 3 && (isRingCenter[u] || isRingCenter[v])) {
                            continue;
                        }

                        var dx = positions[v].x - positions[u].x;
                        var dy = positions[v].y - positions[u].y;

                        if (dx === 0 || dy === 0) {
                            continue;
                        }

                        var dSq = dx * dx + dy * dy;

                        if (dSq < 0.01) {
                            dx = 0.1 * Math.random() + 0.1;
                            dy = 0.1 * Math.random() + 0.1;

                            dSq = dx * dx + dy * dy;
                        }

                        var d = Math.sqrt(dSq);

                        if (d > adjMatrix[u][v] && n > 200) {
                            continue;
                        }

                        var force = kSq / d;

                        if (n <= 200) {
                            force *= ringSize[u] * ringSize[v];
                        }

                        if (n > 250 && (isRingCenter[u] || isRingCenter[v])) {
                            force *= ringSize[u] * ringSize[v];
                        }

                        var forceFactor = force / d;
                        var fx = forceFactor * dx;
                        var fy = forceFactor * dy;

                        if (!positioned[u]) {
                            forces[u].x -= fx;
                            forces[u].y -= fy;
                        }

                        if (!positioned[v]) {
                            forces[v].x += fx;
                            forces[v].y += fy;
                        }
                    }
                }

                // Attractive forces
                for (var u = 0; u < totalLength - 1; u++) {
                    for (var v = u + 1; v < totalLength; v++) {
                        var bothRingCenters = isRingCenter[u] && isRingCenter[v];

                        if (adjMatrix[u][v] < 1) {
                            continue;
                        }

                        if (n <= 250 && !bothRingCenters) {
                            continue;
                        }

                        if (n > 250 && bothRingCenters) {
                            continue;
                        }

                        var _dx = positions[v].x - positions[u].x;
                        var _dy = positions[v].y - positions[u].y;

                        if (_dx === 0 || _dy === 0) {
                            continue;
                        }

                        var _dSq = _dx * _dx + _dy * _dy;

                        if (_dSq < 0.01) {
                            _dx = 0.1 * Math.random() + 0.1;
                            _dy = 0.1 * Math.random() + 0.1;
                            _dSq = _dx * _dx + _dy * _dy;
                        }

                        var _d = Math.sqrt(_dSq);

                        if (_d > maxDist) {
                            _d = maxDist;
                            _dSq = maxDistSq;
                        }

                        var _force = (_dSq - kSq) / k;
                        var dOptimal = adjMatrix[u][v];

                        _force *= _d / dOptimal;

                        var _forceFactor = _force / _d;
                        var _fx = _forceFactor * _dx;
                        var _fy = _forceFactor * _dy;

                        if (!positioned[u]) {
                            forces[u].x += _fx;
                            forces[u].y += _fy;
                        }

                        if (!positioned[v]) {
                            forces[v].x -= _fx;
                            forces[v].y -= _fy;
                        }
                    }
                }

                // Add the edge forces to the vertices
                for (var i = 0; i < edges.length; i++) {
                    var _index2 = edgeOffset + i;
                    var _force2 = forces[_index2];

                    var _a2 = edges[i][0];
                    var _b = edges[i][1];

                    forces[_a2].x += _force2.x;
                    forces[_a2].y += _force2.y;

                    forces[_b].x += _force2.x;
                    forces[_b].y += _force2.y;
                }

                // Move the vertex
                for (var u = 0; u < totalLength; u++) {
                    if (positioned[u]) {
                        continue;
                    }

                    var _dx2 = c * forces[u].x;
                    var _dy2 = c * forces[u].y;

                    if (_dx2 > maxMove) _dx2 = maxMove;
                    if (_dx2 < -maxMove) _dx2 = -maxMove;
                    if (_dy2 > maxMove) _dy2 = maxMove;
                    if (_dy2 < -maxMove) _dy2 = -maxMove;

                    positions[u].x += _dx2;
                    positions[u].y += _dy2;
                }

                // Place the ring centers in the middle of the members
                if (n > 200 && ring.rings.length > 2) {
                    for (var i = 0; i < ring.rings.length; i++) {
                        var _r2 = ring.rings[i];
                        var _center = new SmilesDrawer.Vector2();

                        for (var j = 0; j < _r2.members.length; j++) {
                            var pos = positions[idToV.get(_r2.members[j])];
                            _center.x += pos.x;
                            _center.y += pos.y;
                        }

                        _center.x /= _r2.members.length;
                        _center.y /= _r2.members.length;

                        positions[vertexIds.length + i] = _center;
                    }
                }
            }

            for (var i = 0; i < totalLength; i++) {
                if (i < vertexIds.length) {
                    if (!positioned[i]) {
                        this.graph.vertices[vToId[i]].setPositionFromVector(positions[i]);
                        this.graph.vertices[vToId[i]].positioned = true;
                    }
                } else if (i < vertexIds.length + ring.rings.length) {
                    var _index3 = i - vertexIds.length;
                    ring.rings[_index3].center = positions[i];
                }
            }

            // Only for bridges, not for members, the members are handled in createRing.
            for (var u = 0; u < vertexIds.length; u++) {
                var _vertex4 = this.graph.vertices[vertexIds[u]];

                if (!_vertex4.value.isBridge) {
                    continue;
                }

                var neighbours = _vertex4.getNeighbours();

                for (var i = 0; i < neighbours.length; i++) {
                    var currentVertex = this.graph.vertices[neighbours[i]];

                    if (currentVertex.positioned) {
                        continue;
                    }

                    center = this.getSubringCenter(ring, _vertex4);

                    if (currentVertex.value.rings.length === 0) {
                        currentVertex.value.isConnectedToRing = true;
                    }

                    this.createNextBond(currentVertex, _vertex4, center);
                }
            }

            ring.positioned = true;
        }

        /**
         * Gets the center of a ring contained within a bridged ring and containing a given vertex.
         *
         * @param {SmilesDrawer.Ring} ring A bridged ring.
         * @param {SmilesDrawer.Vertex} vertex A vertex.
         * @returns {SmilesDrawer.Vector2} The center of the subring that  the provided vertex.
         */

    }, {
        key: 'getSubringCenter',
        value: function getSubringCenter(ring, vertex) {
            // If there are multiple subrings associated with this ring, always
            // take the smaller one
            var size = Number.MAX_VALUE;
            var center = ring.center;

            for (var i = 0; i < ring.rings.length; i++) {
                var subring = ring.rings[i];

                for (var j = 0; j < subring.members.length; j++) {
                    if (subring.members[j] === vertex.id) {
                        if (size > subring.members.length) {
                            center = subring.center;
                            size = subring.members.length;
                        }
                    }
                }
            }

            return center;
        }

        /**
         * Draw the actual edges as bonds to the canvas.
         *
         * @param {Boolean} debug A boolean indicating whether or not to draw debug helpers.
         */

    }, {
        key: 'drawEdges',
        value: function drawEdges(debug) {
            var that = this;

            for (var i = 0; i < this.graph.edges.length; i++) {
                var edge = this.graph.edges[i];
                var vertexA = this.graph.vertices[edge.sourceId];
                var vertexB = this.graph.vertices[edge.targetId];
                var elementA = vertexA.value.element;
                var elementB = vertexB.value.element;

                if ((!vertexA.value.isDrawn || !vertexB.value.isDrawn) && this.opts.atomVisualization === 'default') {
                    continue;
                }

                var a = vertexA.position;
                var b = vertexB.position;
                var normals = this.getEdgeNormals(edge);

                // Create a point on each side of the line
                var sides = SmilesDrawer.ArrayHelper.clone(normals);

                sides[0].multiplyScalar(10).add(a);
                sides[1].multiplyScalar(10).add(a);

                if (edge.bondType === '=' || this.getRingbondType(vertexA, vertexB) === '=') {
                    // Always draw double bonds inside the ring
                    var inRing = this.areVerticesInSameRing(vertexA, vertexB);
                    var s = this.chooseSide(vertexA, vertexB, sides);

                    if (inRing) {
                        // Always draw double bonds inside a ring
                        // if the bond is shared by two rings, it is drawn in the larger
                        // problem: smaller ring is aromatic, bond is still drawn in larger -> fix this
                        var lcr = this.getLargestOrAromaticCommonRing(vertexA, vertexB);
                        var center = lcr.center;

                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.multiplyScalar(that.opts.bondSpacing);
                        });

                        // Choose the normal that is on the same side as the center
                        var line = null;

                        if (center.sameSideAs(vertexA.position, vertexB.position, SmilesDrawer.Vector2.add(a, normals[0]))) {
                            line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
                        } else {
                            line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);
                        }

                        line.shorten(this.opts.bondLength - this.opts.shortBondLength);

                        // The shortened edge
                        this.canvasWrapper.drawLine(line);

                        // The normal edge
                        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
                    } else if (edge.center) {
                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.multiplyScalar(that.opts.bondSpacing / 2.0);
                        });

                        var lineA = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
                        var lineB = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

                        lineA.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        lineB.shorten(this.opts.bondLength - this.opts.shortBondLength);

                        this.canvasWrapper.drawLine(lineA);
                        this.canvasWrapper.drawLine(lineB);
                    } else if (s.anCount == 0 && s.bnCount > 1 || s.bnCount == 0 && s.anCount > 1) {
                        // Both lines are the same length here
                        // Add the spacing to the edges (which are of unit length)
                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.multiplyScalar(that.opts.bondSpacing / 2);
                        });

                        var _lineA = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
                        var _lineB = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

                        this.canvasWrapper.drawLine(_lineA);
                        this.canvasWrapper.drawLine(_lineB);
                    } else if (s.sideCount[0] > s.sideCount[1]) {
                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.multiplyScalar(that.opts.bondSpacing);
                        });

                        var _line = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);

                        _line.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        this.canvasWrapper.drawLine(_line);
                        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
                    } else if (s.sideCount[0] < s.sideCount[1]) {
                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.multiplyScalar(that.opts.bondSpacing);
                        });

                        var _line2 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

                        _line2.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        this.canvasWrapper.drawLine(_line2);
                        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
                    } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.multiplyScalar(that.opts.bondSpacing);
                        });

                        var _line3 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);

                        _line3.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        this.canvasWrapper.drawLine(_line3);
                        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
                    } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.multiplyScalar(that.opts.bondSpacing);
                        });

                        var _line4 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

                        _line4.shorten(this.opts.bondLength - this.opts.shortBondLength);
                        this.canvasWrapper.drawLine(_line4);
                        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
                    } else {}
                } else if (edge.bondType === '#') {
                    SmilesDrawer.ArrayHelper.each(normals, function (v) {
                        v.multiplyScalar(that.opts.bondSpacing / 1.5);
                    });

                    var _lineA2 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[0]), SmilesDrawer.Vector2.add(b, normals[0]), elementA, elementB);
                    var _lineB2 = new SmilesDrawer.Line(SmilesDrawer.Vector2.add(a, normals[1]), SmilesDrawer.Vector2.add(b, normals[1]), elementA, elementB);

                    this.canvasWrapper.drawLine(_lineA2);
                    this.canvasWrapper.drawLine(_lineB2);

                    this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB));
                } else if (edge.bondType === '.') {
                    // TODO: Something... maybe... version 2?
                } else {
                    var isChiralCenterA = vertexA.value.bracket && vertexA.value.bracket.chirality;
                    var isChiralCenterB = vertexB.value.bracket && vertexB.value.bracket.chirality;

                    if (edge.chiral === 'up') {
                        this.canvasWrapper.drawWedge(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
                    } else if (edge.chiral === 'down') {
                        this.canvasWrapper.drawDashedWedge(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
                    } else {
                        this.canvasWrapper.drawLine(new SmilesDrawer.Line(a, b, elementA, elementB, isChiralCenterA, isChiralCenterB));
                    }
                }

                if (debug) {
                    var midpoint = SmilesDrawer.Vector2.midpoint(a, b);
                    this.canvasWrapper.drawDebugText(midpoint.x, midpoint.y, 'e: ' + i);
                }
            }

            // Draw ring for implicitly defined aromatic rings
            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];

                if (this.isRingAromatic(ring)) {
                    this.canvasWrapper.drawAromaticityRing(ring);
                }
            }
        }

        /**
         * Draws the vertices representing atoms to the canvas.
         *
         * @param {Boolean} debug A boolean indicating whether or not to draw debug messages to the canvas.
         */

    }, {
        key: 'drawVertices',
        value: function drawVertices(debug) {
            for (var i = 0; i < this.graph.vertices.length; i++) {
                var vertex = this.graph.vertices[i];
                var atom = vertex.value;
                var charge = 0;
                var isotope = 0;
                var bondCount = this.getBondCount(vertex);
                var element = atom.element;
                var hydrogens = SmilesDrawer.Atom.maxBonds[element] - bondCount;
                var dir = vertex.getTextDirection(this.graph.vertices);
                var isTerminal = this.opts.terminalCarbons || element !== 'C' || atom.hasAttachedPseudoElements ? vertex.isTerminal() : false;
                var isCarbon = atom.element === 'C';

                if (atom.bracket) {
                    hydrogens = atom.bracket.hcount;
                    charge = atom.bracket.charge;
                    isotope = atom.bracket.isotope;
                }

                if (this.opts.atomVisualization === 'allballs') {
                    this.canvasWrapper.drawBall(vertex.position.x, vertex.position.y, element);
                } else if (atom.isDrawn && (!isCarbon || atom.drawExplicit || isTerminal || atom.hasAttachedPseudoElements)) {
                    if (this.opts.atomVisualization === 'default') {
                        this.canvasWrapper.drawText(vertex.position.x, vertex.position.y, element, hydrogens, dir, isTerminal, charge, isotope, atom.getAttachedPseudoElements());
                    } else if (this.opts.atomVisualization === 'balls') {
                        this.canvasWrapper.drawBall(vertex.position.x, vertex.position.y, element);
                    }
                }

                if (debug) {
                    var value = 'v: ' + vertex.id + ' ' + SmilesDrawer.ArrayHelper.print(atom.ringbonds);
                    this.canvasWrapper.drawDebugText(vertex.position.x, vertex.position.y, value);
                }
            }

            // Draw the ring centers for debug purposes
            if (this.opts.debug) {
                for (var i = 0; i < this.rings.length; i++) {
                    var center = this.rings[i].center;
                    this.canvasWrapper.drawDebugPoint(center.x, center.y, 'r: ' + this.rings[i].id);
                }
            }
        }

        /**
         * Position the vertices according to their bonds and properties.
         */

    }, {
        key: 'position',
        value: function position() {
            var startVertex = this.graph.vertices[0];

            this.createNextBond(startVertex);

            // Atoms bonded to the same ring atom
            this.resolvePrimaryOverlaps();
        }

        /**
         * Reset the positions of rings and vertices. The previous positions will be backed up.
         */

    }, {
        key: 'clearPositions',
        value: function clearPositions() {
            this.vertexPositionsBackup = [];
            this.ringPositionsBackup = [];

            for (var i = 0; i < this.graph.vertices.length; i++) {
                var vertex = this.graph.vertices[i];

                this.vertexPositionsBackup.push(vertex.position.clone());
                vertex.positioned = false;
                vertex.setPositionFromVector(new SmilesDrawer.Vector2());
            }

            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];

                this.ringPositionsBackup.push(ring.center.clone());
                ring.positioned = false;
                ring.center = new SmilesDrawer.Vector2();
            }
        }

        /**
         * Restore the positions backed up during the last clearPositions() call.
         */

    }, {
        key: 'restorePositions',
        value: function restorePositions() {
            for (var i = 0; i < this.vertexPositionsBackup.length; i++) {
                this.graph.vertices[i].setPositionFromVector(this.vertexPositionsBackup[i]);
                this.graph.vertices[i].positioned = true;
            }

            for (var i = 0; i < this.ringPositionsBackup.length; i++) {
                this.rings[i].center = this.ringPositionsBackup[i];
                this.rings[i].positioned = true;
            }
        }

        /**
         * Stores the current information associated with rings.
         */

    }, {
        key: 'backupRingInformation',
        value: function backupRingInformation() {
            this.originalRings = [];
            this.originalRingConnections = [];

            for (var i = 0; i < this.rings.length; i++) {
                this.originalRings.push(this.rings[i]);
            }

            for (var i = 0; i < this.ringConnections.length; i++) {
                this.originalRingConnections.push(this.ringConnections[i]);
            }

            for (var i = 0; i < this.graph.vertices.length; i++) {
                this.graph.vertices[i].value.backupRings();
            }
        }

        /**
         * Restores the most recently backed up information associated with rings.
         */

    }, {
        key: 'restoreRingInformation',
        value: function restoreRingInformation() {
            // Get the subring centers from the bridged rings
            var bridgedRings = this.getBridgedRings();

            this.rings = [];
            this.ringConnections = [];

            for (var i = 0; i < bridgedRings.length; i++) {
                var bridgedRing = bridgedRings[i];

                for (var j = 0; j < bridgedRing.rings.length; j++) {
                    var ring = bridgedRing.rings[j];
                    this.originalRings[ring.id].center = ring.center;
                }
            }

            for (var i = 0; i < this.originalRings.length; i++) {
                this.rings.push(this.originalRings[i]);
            }

            for (var i = 0; i < this.originalRingConnections.length; i++) {
                this.ringConnections.push(this.originalRingConnections[i]);
            }

            for (var i = 0; i < this.graph.vertices.length; i++) {
                this.graph.vertices[i].value.restoreRings();
            }
        }

        // TODO: This needs some cleaning up

        /**
         * Creates a new ring, that is, positiones all the vertices inside a ring.
         *
         * @param {SmilesDrawer.Ring} ring The ring to position.
         * @param {SmilesDrawer.Vector2|null} [center=null] The center of the ring to be created.
         * @param {SmilesDrawer.Vertex|null} [startVertex=null] The first vertex to be positioned inside the ring.
         * @param {SmilesDrawer.Vertex|null} [previousVertex=null] The last vertex that was positioned.
         * @param {Boolean} [previousVertex=false] A boolean indicating whether or not this ring was force positioned already - this is needed after force layouting a ring, in order to draw rings connected to it.
         */

    }, {
        key: 'createRing',
        value: function createRing(ring) {
            var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var _this = this;

            var startVertex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var previousVertex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            if (ring.positioned) {
                return;
            }

            center = center ? center : new SmilesDrawer.Vector2(0, 0);

            var orderedNeighbours = ring.getOrderedNeighbours(this.ringConnections);
            var startingAngle = startVertex ? SmilesDrawer.Vector2.subtract(startVertex.position, center).angle() : 0;

            var radius = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());
            var angle = SmilesDrawer.MathHelper.centralAngle(ring.getSize());

            ring.centralAngle = angle;

            var a = startingAngle;
            var that = this;
            var startVertexId = startVertex ? startVertex.id : null;

            if (ring.members.indexOf(startVertexId) === -1) {
                startVertexId = ring.members[0];
            }

            ring.eachMember(this.graph.vertices, function (v) {
                var vertex = that.graph.vertices[v];

                if (!vertex.positioned) {
                    vertex.setPosition(center.x + Math.cos(a) * radius, center.y + Math.sin(a) * radius);
                }

                a += angle;

                if (!ring.isBridged || ring.rings.length < 3) {
                    vertex.positioned = true;
                }
            }, startVertexId, previousVertex ? previousVertex.id : null);

            // If the ring is bridged, then draw the vertices inside the ring
            // using a force based approach
            if (ring.isBridged && !ring.positioned) {
                var allVertices = SmilesDrawer.ArrayHelper.merge(ring.members, ring.insiders);

                this.forceLayout(allVertices, center, startVertex.id, ring);
            }

            // Anchor the ring to one of it's members, so that the ring center will always
            // be tied to a single vertex when doing repositionings
            this.graph.vertices[ring.members[0]].value.addAnchoredRing(ring.id);

            ring.positioned = true;
            ring.center = center;

            // Draw neighbours in decreasing order of connectivity
            for (var i = 0; i < orderedNeighbours.length; i++) {
                var neighbour = this.getRing(orderedNeighbours[i].neighbour);

                if (neighbour.positioned) {
                    continue;
                }

                var vertices = SmilesDrawer.RingConnection.getVertices(this.ringConnections, ring.id, neighbour.id);

                if (vertices.length === 2) {
                    (function () {
                        // This ring is a fused ring
                        ring.isFused = true;
                        neighbour.isFused = true;

                        var vertexA = _this.graph.vertices[vertices[0]];
                        var vertexB = _this.graph.vertices[vertices[1]];

                        // Get middle between vertex A and B
                        var midpoint = SmilesDrawer.Vector2.midpoint(vertexA.position, vertexB.position);

                        // Get the normals to the line between A and B
                        var normals = SmilesDrawer.Vector2.normals(vertexA.position, vertexB.position);

                        // Normalize the normals
                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.normalize();
                        });

                        // Set length from middle of side to center (the apothem)
                        var r = SmilesDrawer.MathHelper.polyCircumradius(_this.opts.bondLength, neighbour.getSize());
                        var apothem = SmilesDrawer.MathHelper.apothem(r, neighbour.getSize());

                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.multiplyScalar(apothem);
                        });

                        // Move normals to the middle of the line between a and b
                        SmilesDrawer.ArrayHelper.each(normals, function (v) {
                            v.add(midpoint);
                        });

                        // Check if the center of the next ring lies within another ring and
                        // select the normal accordingly
                        var nextCenter = normals[0];

                        if (_this.isPointInRing(nextCenter)) {
                            nextCenter = normals[1];
                        }

                        // Get the vertex (A or B) which is in clock-wise direction of the other
                        var posA = SmilesDrawer.Vector2.subtract(vertexA.position, nextCenter);
                        var posB = SmilesDrawer.Vector2.subtract(vertexB.position, nextCenter);

                        if (posA.clockwise(posB) === -1) {
                            if (!neighbour.positioned) {
                                _this.createRing(neighbour, nextCenter, vertexA, vertexB);
                            }
                        } else {
                            if (!neighbour.positioned) {
                                _this.createRing(neighbour, nextCenter, vertexB, vertexA);
                            }
                        }
                    })();
                } else if (vertices.length === 1) {
                    // This ring is a spiro
                    ring.isSpiro = true;
                    neighbour.isSpiro = true;

                    var vertexA = this.graph.vertices[vertices[0]];

                    // Get the vector pointing from the shared vertex to the new center
                    var nextCenter = SmilesDrawer.Vector2.subtract(center, vertexA.position);

                    nextCenter.invert();
                    nextCenter.normalize();

                    // Get the distance from the vertex to the center
                    var r = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, neighbour.getSize());

                    nextCenter.multiplyScalar(r);
                    nextCenter.add(vertexA.position);

                    if (!neighbour.positioned) {
                        this.createRing(neighbour, nextCenter, vertexA);
                    }
                }
            }

            // Next, draw atoms that are not part of a ring that are directly attached to this ring
            for (var i = 0; i < ring.members.length; i++) {
                var ringMember = this.graph.vertices[ring.members[i]];
                var ringMemberNeighbours = ringMember.getNeighbours();

                // If there are multiple, the ovlerap will be resolved in the appropriate step
                for (var j = 0; j < ringMemberNeighbours.length; j++) {
                    var v = this.graph.vertices[ringMemberNeighbours[j]];

                    if (v.positioned) {
                        continue;
                    }

                    v.value.isConnectedToRing = true;
                    this.createNextBond(v, ringMember, ring.center);
                }
            }
        }

        /**
         * Rotate an entire subtree by an angle around a center.
         *
         * @param {Number} vertexId A vertex id (the root of the sub-tree).
         * @param {Number} parentVertexId A vertex id in the previous direction of the subtree that is to rotate.
         * @param {Number} angle An angle in randians.
         * @param {SmilesDrawer.Vector2} center The rotational center.
         */

    }, {
        key: 'rotateSubtree',
        value: function rotateSubtree(vertexId, parentVertexId, angle, center) {
            var that = this;

            this.traverseTree(vertexId, parentVertexId, function (vertex) {
                vertex.position.rotateAround(angle, center);

                for (var i = 0; i < vertex.value.anchoredRings.length; i++) {
                    var ring = that.rings[vertex.value.anchoredRings[i]];

                    if (ring) {
                        ring.center.rotateAround(angle, center);
                    }
                }
            });
        }

        /**
         * Gets the overlap score of a subtree.
         *
         * @param {Number} vertexId A vertex id (the root of the sub-tree).
         * @param {Number} parentVertexId A vertex id in the previous direction of the subtree.
         * @param {Number[]} vertexOverlapScores An array containing the vertex overlap scores indexed by vertex id.
         * @returns {Object} An object containing the total overlap score and the center of mass of the subtree weighted by overlap score { value: 0.2, center: new SmilesDrawer.Vector2() }.
         */

    }, {
        key: 'getSubtreeOverlapScore',
        value: function getSubtreeOverlapScore(vertexId, parentVertexId, vertexOverlapScores) {
            var that = this;
            var score = 0;
            var center = new SmilesDrawer.Vector2();

            this.traverseTree(vertexId, parentVertexId, function (vertex) {
                var s = vertexOverlapScores[vertex.id];
                score += s;

                var position = that.graph.vertices[vertex.id].position.clone();
                position.multiplyScalar(s);
                center.add(position);
            });

            center.divide(score);

            return { value: score, center: center };
        }

        /**
         * Returns the current (positioned vertices so far) center of mass.
         * 
         * @returns {SmilesDrawer.Vector2} The current center of mass.
         */

    }, {
        key: 'getCurrentCenterOfMass',
        value: function getCurrentCenterOfMass() {
            var total = new SmilesDrawer.Vector2();
            var count = 0;

            for (var i = 0; i < this.graph.vertices.length; i++) {
                var vertex = this.graph.vertices[i];

                if (vertex.positioned) {
                    total.add(vertex.position);
                    count++;
                }
            }

            return total.divide(count);
        }

        /**
         * Returns the current (positioned vertices so far) center of mass in the neighbourhood of a given position.
         *
         * @param {SmilesDrawer.Vector2} vec The point at which to look for neighbours.
         * @param {Number} [r=currentBondLength*2.0] The radius of vertices to include.
         * @returns {SmilesDrawer.Vector2} The current center of mass.
         */

    }, {
        key: 'getCurrentCenterOfMassInNeigbourhood',
        value: function getCurrentCenterOfMassInNeigbourhood(vec) {
            var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.opts.bondLength * 2.0;

            var total = new SmilesDrawer.Vector2();
            var count = 0;
            var rSq = r * r;

            for (var i = 0; i < this.graph.vertices.length; i++) {
                var vertex = this.graph.vertices[i];

                if (vertex.positioned && vec.distanceSq(vertex.position) < rSq) {
                    total.add(vertex.position);
                    count++;
                }
            }

            return total.divide(count);
        }

        /**
         * Resolve primary (exact) overlaps, such as two vertices that are connected to the same ring vertex.
         */

    }, {
        key: 'resolvePrimaryOverlaps',
        value: function resolvePrimaryOverlaps() {
            var overlaps = [];
            var sharedSideChains = []; // side chains attached to an atom shared by two rings
            var done = [this.graph.vertices.length];

            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];

                for (var j = 0; j < ring.members.length; j++) {
                    var vertex = this.graph.vertices[ring.members[j]];

                    if (done[vertex.id]) {
                        continue;
                    }

                    done[vertex.id] = true;

                    // Look for rings where there are atoms with two bonds outside the ring (overlaps)
                    if (vertex.getNeighbourCount() > 2) {
                        var rings = [];

                        for (var k = 0; k < vertex.value.rings.length; k++) {
                            rings.push(vertex.value.rings[k]);
                        }

                        overlaps.push({
                            common: vertex,
                            rings: rings,
                            vertices: this.getNonRingNeighbours(vertex.id)
                        });
                    }
                }
            }

            for (var i = 0; i < sharedSideChains.length; i++) {
                var chain = sharedSideChains[i];
                var angle = -chain.vertex.position.getRotateToAngle(chain.other.position, chain.common.position);
                this.rotateSubtree(chain.vertex.id, chain.common.id, angle + Math.PI, chain.common.position);
            }

            for (var i = 0; i < overlaps.length; i++) {
                var overlap = overlaps[i];

                if (overlap.vertices.length === 1) {
                    var a = overlap.vertices[0];

                    if (a.getNeighbourCount() === 1) {
                        a.flippable = true;
                        a.flipCenter = overlap.common.id;

                        for (var j = 0; j < overlap.rings.length; j++) {
                            a.flipRings.push(overlap.rings[j]);
                        }
                    }

                    // If the vertex comes out of two rings, it has to be rotated to point straight away (angles between it and both rings the same)
                    if (overlap.rings.length === 2) {
                        var neighbours = overlap.common.getNeighbours();
                        var positions = [];

                        for (var j = 0; j < neighbours.length; j++) {
                            var _vertex5 = this.graph.vertices[neighbours[j]];

                            if (!this.isRingConnection(_vertex5.id, overlap.common.id) && _vertex5.id !== a.id) {
                                positions.push(_vertex5.position);
                            }
                        }

                        var midpoint = SmilesDrawer.Vector2.midpoint(positions[0], positions[1]);
                        var _angle = a.position.getRotateToAngle(midpoint, overlap.common.position);

                        _angle *= a.position.clockwise(midpoint);
                        this.rotateSubtree(a.id, overlap.common.id, _angle, overlap.common.position);
                    }
                } else if (overlap.vertices.length === 2) {
                    var _angle2 = (2 * Math.PI - this.getRing(overlap.rings[0]).getAngle()) / 6.0;
                    var _a3 = overlap.vertices[0];
                    var b = overlap.vertices[1];

                    _a3.backAngle -= _angle2;
                    b.backAngle += _angle2;

                    this.rotateSubtree(_a3.id, overlap.common.id, _angle2, overlap.common.position);
                    this.rotateSubtree(b.id, overlap.common.id, -_angle2, overlap.common.position);

                    if (_a3.getNeighbourCount() === 1) {
                        _a3.flippable = true;
                        _a3.flipCenter = overlap.common.id;
                        _a3.flipNeighbour = b.id;

                        for (var j = 0; j < overlap.rings.length; j++) {
                            _a3.flipRings.push(overlap.rings[j]);
                        }
                    }
                    if (b.getNeighbourCount() === 1) {
                        b.flippable = true;
                        b.flipCenter = overlap.common.id;
                        b.flipNeighbour = _a3.id;

                        for (var j = 0; j < overlap.rings.length; j++) {
                            b.flipRings.push(overlap.rings[j]);
                        }
                    }
                }
            }
        }

        /**
         * Resolve secondary overlaps. Those overlaps are due to the structure turning back on itself.
         *
         * @param {Object[]} scores An array of objects sorted descending by score.
         * @param {Number} scores[].id A vertex id.
         * @param {Number} scores[].score The overlap score associated with the vertex id.
         */

    }, {
        key: 'resolveSecondaryOverlaps',
        value: function resolveSecondaryOverlaps(scores) {
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].score > this.opts.bondLength / (4.0 * this.opts.bondLength)) {
                    var vertex = this.graph.vertices[scores[i].id];

                    if (vertex.isTerminal()) {
                        var closest = this.getClosestVertex(vertex);

                        if (closest) {
                            // If one of the vertices is the first one, the previous vertex is not the central vertex but the dummy
                            // so take the next rather than the previous, which is vertex 1
                            var closestPosition = null;

                            if (closest.isTerminal()) {
                                closestPosition = closest.id === 0 ? this.graph.vertices[1].position : closest.previousPosition;
                            } else {
                                closestPosition = closest.id === 0 ? this.graph.vertices[1].position : closest.position;
                            }

                            var vertexPreviousPosition = vertex.id === 0 ? this.graph.vertices[1].position : vertex.previousPosition;

                            vertex.position.rotateAwayFrom(closestPosition, vertexPreviousPosition, SmilesDrawer.MathHelper.toRad(20));
                        }
                    }

                    if (vertex.flippable) {
                        var a = vertex.flipRings[0] ? this.rings[vertex.flipRings[0]] : null;
                        var b = vertex.flipRings[1] ? this.rings[vertex.flipRings[1]] : null;
                        var flipCenter = this.graph.vertices[vertex.flipCenter].position;

                        // Make a always the bigger ring than b
                        if (a && b) {
                            var tmp = a.members.length > b.members.length ? a : b;

                            b = a.members.length < b.members.length ? a : b;
                            a = tmp;
                        }

                        if (this.opts.allowFlips) {
                            if (a && a.allowsFlip()) {
                                vertex.position.rotateTo(a.center, flipCenter);
                                a.setFlipped();

                                if (vertex.flipNeighbour !== null) {
                                    // It's better to not straighten the other one, since it will possibly overlap
                                    // var flipNeighbour = this.graph.vertices[vertex.flipNeighbour];
                                    // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                                }
                            } else if (b && b.allowsFlip()) {
                                vertex.position.rotateTo(b.center, flipCenter);
                                b.setFlipped();

                                if (vertex.flipNeighbour !== null) {
                                    // It's better to not straighten the other one, since it will possibly overlap
                                    // var flipNeighbour = this.graph.vertices[vertex.flipNeighbour];
                                    // flipNeighbour.position.rotate(flipNeighbour.backAngle);
                                }
                            }
                        } else {}

                        // Only do a refresh of the remaining!
                        // recalculate scores (how expensive?)
                        // scores = this.getOverlapScore().scores;
                    }
                }
            }
        }

        /**
         * Positiones the next vertex thus creating a bond.
         *
         * @param {SmilesDrawer.Vertex} vertex A vertex.
         * @param {SmilesDrawer.Vertex} previousVertex The previous vertex which has been positioned.
         * @param {SmilesDrawer.Ring|Number} ringOrAngle Either a ring or a number. If the vertex is connected to a ring, it is positioned based on the ring center and thus the ring is supplied. If the vertex is not in a ring, an angle (in radians) is supplied.
         * @param {Number} dir Either 1 or -1 to break ties (if no angle can be elucidated.
         */

    }, {
        key: 'createNextBond',
        value: function createNextBond(vertex, previousVertex, ringOrAngle, dir) {
            if (vertex.positioned) {
                return;
            }

            // If the current node is the member of one ring, then point straight away
            // from the center of the ring. However, if the current node is a member of
            // two rings, point away from the middle of the centers of the two rings
            if (!previousVertex) {
                // Here, ringOrAngle is always an angle

                // Add a (dummy) previous position if there is no previous vertex defined
                // Since the first vertex is at (0, 0), create a vector at (bondLength, 0)
                // and rotate it by 90°
                var dummy = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
                dummy.rotate(SmilesDrawer.MathHelper.toRad(-120));

                vertex.previousPosition = dummy;
                vertex.setPosition(this.opts.bondLength, 0);
                vertex.angle = SmilesDrawer.MathHelper.toRad(-120);
                vertex.globalAngle = vertex.angle;
                vertex.positioned = true;
            } else if (previousVertex.value.rings.length === 0 && !vertex.value.isBridge && !previousVertex.value.isBridge) {
                // Here, ringOrAngle is always an angle

                // If the previous vertex was not part of a ring, draw a bond based
                // on the global angle of the previous bond
                var v = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
                v.rotate(ringOrAngle);
                v.add(previousVertex.position);

                vertex.globalAngle = ringOrAngle;
                vertex.setPositionFromVector(v);
                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            } else if (previousVertex.value.isBridgeNode && vertex.value.isBridge) {
                // If the previous atom is in a bridged ring and this one is inside the ring
                var pos = SmilesDrawer.Vector2.subtract(ringOrAngle, previousVertex.position);
                pos.normalize();

                // Unlike with the ring, do not multiply with radius but with bond length
                pos.multiplyScalar(this.opts.bondLength);
                vertex.position.add(previousVertex.position);
                vertex.position.add(pos);
                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            } else if (vertex.value.isBridge) {
                // The previous atom is in a bridged ring and this one is in it as well
                var _v2 = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
                _v2.rotate(ringOrAngle);
                _v2.add(previousVertex.position);

                vertex.globalAngle = ringOrAngle;
                vertex.setPositionFromVector(_v2);
                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            } else if (previousVertex.value.rings.length === 1 || previousVertex.value.isBridge) {
                // Here, ringOrAngle is always a ring (THIS IS CURRENTLY NOT TRUE - WHY?)
                // Use the same approach as with rings that are connected at one vertex
                // and draw the atom in the opposite direction of the center.
                var _pos = SmilesDrawer.Vector2.subtract(ringOrAngle, previousVertex.position);

                _pos.invert();
                _pos.normalize();
                // Unlike with the ring, do not multiply with radius but with bond length
                _pos.multiplyScalar(this.opts.bondLength);
                vertex.position.add(previousVertex.position);
                vertex.position.add(_pos);
                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            } else if (previousVertex.value.rings.length == 2) {
                // Here, ringOrAngle is always a ring
                var ringA = this.getRing(previousVertex.value.rings[0]);
                var ringB = this.getRing(previousVertex.value.rings[1]);

                // Project the current vertex onto the vector between the two centers to
                // get the direction
                var a = SmilesDrawer.Vector2.subtract(ringB.center, ringA.center);
                var b = SmilesDrawer.Vector2.subtract(previousVertex.position, ringA.center);
                var s = SmilesDrawer.Vector2.scalarProjection(b, a);

                a.normalize();
                a.multiply(s);
                a.add(ringA.center);

                var _pos2 = SmilesDrawer.Vector2.subtract(a, previousVertex.position);
                _pos2.invert();
                _pos2.normalize();
                _pos2.multiplyScalar(this.opts.bondLength);

                vertex.position.add(previousVertex.position);
                vertex.position.add(_pos2);

                vertex.previousPosition = previousVertex.position;
                vertex.positioned = true;
            }

            // Go to next vertex
            // If two rings are connected by a bond ...
            if (vertex.value.rings.length > 0) {
                var nextRing = this.getRing(vertex.value.rings[0]);
                var nextCenter = SmilesDrawer.Vector2.subtract(vertex.previousPosition, vertex.position);

                nextCenter.invert();
                nextCenter.normalize();

                var r = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, nextRing.getSize());

                nextCenter.multiplyScalar(r);
                nextCenter.add(vertex.position);

                if (!nextRing.positioned) {
                    this.createRing(nextRing, nextCenter, vertex);
                }
            } else if (vertex.value.bridgedRing !== null) {
                var _nextRing = this.getRing(vertex.value.bridgedRing);
                var _nextCenter = SmilesDrawer.Vector2.subtract(vertex.previousPosition, vertex.position);

                _nextCenter.invert();
                _nextCenter.normalize();

                var _r3 = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, _nextRing.members.length);

                _nextCenter.multiplyScalar(_r3);
                _nextCenter.add(vertex.position);

                if (!_nextRing.positioned) {
                    this.createRing(_nextRing, _nextCenter, vertex);
                }
            } else {
                // Draw the non-ring vertices connected to this one        
                var neighbours = vertex.getNeighbours();

                if (previousVertex) {
                    neighbours = SmilesDrawer.ArrayHelper.remove(neighbours, previousVertex.id);
                }

                var angle = vertex.getAngle();

                if (neighbours.length === 1) {
                    var nextVertex = this.graph.vertices[neighbours[0]];

                    // Make a single chain always cis except when there's a tribble bond
                    // or if there are successive double bonds
                    if (vertex.value.bondType === '#' || previousVertex && previousVertex.value.bondType === '#' || vertex.value.bondType === '=' && previousVertex && previousVertex.value.bondType === '=') {
                        vertex.value.drawExplicit = true;

                        if (previousVertex) {
                            var straightEdge1 = this.graph.getEdge(vertex.id, previousVertex.id);
                            straightEdge1.center = true;
                        }

                        var straightEdge2 = this.graph.getEdge(vertex.id, nextVertex.id);
                        straightEdge2.center = true;

                        nextVertex.globalAngle = angle;
                        nextVertex.angle = 0.0;
                        this.createNextBond(nextVertex, vertex, nextVertex.globalAngle, -dir);
                    } else if (previousVertex && previousVertex.value.rings.length > 0) {
                        // If coming out of a ring, always draw away from the center of mass
                        var proposedAngleA = SmilesDrawer.MathHelper.toRad(60);
                        var proposedAngleB = -proposedAngleA;

                        var proposedVectorA = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
                        var proposedVectorB = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

                        proposedVectorA.rotate(proposedAngleA).add(vertex.position);
                        proposedVectorB.rotate(proposedAngleB).add(vertex.position);

                        // let centerOfMass = this.getCurrentCenterOfMassInNeigbourhood(vertex.position, 100);
                        var centerOfMass = this.getCurrentCenterOfMass();
                        var distanceA = proposedVectorA.distance(centerOfMass);
                        var distanceB = proposedVectorB.distance(centerOfMass);

                        nextVertex.angle = distanceA < distanceB ? proposedAngleB : proposedAngleA;

                        if (nextVertex.angle > 0) {
                            dir = -1;
                        } else {
                            dir = 1;
                        }

                        nextVertex.globalAngle = angle + nextVertex.angle;
                        this.createNextBond(nextVertex, vertex, nextVertex.globalAngle, dir);
                    } else {
                        if (!dir) {
                            var _proposedAngleA = SmilesDrawer.MathHelper.toRad(60);
                            var _proposedAngleB = -_proposedAngleA;

                            var _proposedVectorA = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
                            var _proposedVectorB = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

                            _proposedVectorA.rotate(_proposedAngleA).add(vertex.position);
                            _proposedVectorB.rotate(_proposedAngleB).add(vertex.position);

                            var _centerOfMass = this.getCurrentCenterOfMass();
                            var _distanceA = _proposedVectorA.distance(_centerOfMass);
                            var _distanceB = _proposedVectorB.distance(_centerOfMass);

                            nextVertex.angle = _distanceA < _distanceB ? _proposedAngleB : _proposedAngleA;

                            if (nextVertex.angle > 0) {
                                dir = -1;
                            } else {
                                dir = 1;
                            }
                        } else {
                            nextVertex.angle = SmilesDrawer.MathHelper.toRad(60) * dir;
                            dir = -dir;
                        }

                        nextVertex.globalAngle = angle + nextVertex.angle;
                        this.createNextBond(nextVertex, vertex, nextVertex.globalAngle, dir);
                    }
                } else if (neighbours.length === 2) {
                    // Check for the longer subtree - always go with cis for the longer subtree
                    var subTreeDepthA = this.getTreeDepth(neighbours[0], vertex.id);
                    var subTreeDepthB = this.getTreeDepth(neighbours[1], vertex.id);

                    // Also get the subtree for the previous direction (this is important when
                    // the previous vertex is the shortest path)
                    var subTreeDepthC = this.getTreeDepth(previousVertex ? previousVertex.id : null, vertex.id);

                    var cis = 0;
                    var trans = 1;

                    if (subTreeDepthA > subTreeDepthB) {
                        cis = 1;
                        trans = 0;
                    }

                    var cisVertex = this.graph.vertices[neighbours[cis]];
                    var transVertex = this.graph.vertices[neighbours[trans]];

                    // If the origin tree is the shortest, set both vertices to trans
                    if (subTreeDepthC < subTreeDepthA && subTreeDepthC < subTreeDepthB) {
                        if (vertex.position.clockwise(vertex.previousPosition) === 1) {
                            transVertex.angle = SmilesDrawer.MathHelper.toRad(60);
                            cisVertex.angle = -SmilesDrawer.MathHelper.toRad(60);
                            transVertex.globalAngle = angle + transVertex.angle;
                            cisVertex.globalAngle = angle + cisVertex.angle;

                            this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
                            this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, dir);
                        } else {
                            transVertex.angle = -SmilesDrawer.MathHelper.toRad(60);
                            cisVertex.angle = SmilesDrawer.MathHelper.toRad(60);
                            transVertex.globalAngle = angle + transVertex.angle;
                            cisVertex.globalAngle = angle + cisVertex.angle;

                            this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, dir);
                            this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
                        }
                    } else {
                        if (vertex.position.clockwise(vertex.previousPosition) === 1) {
                            transVertex.angle = SmilesDrawer.MathHelper.toRad(60);
                            cisVertex.angle = -SmilesDrawer.MathHelper.toRad(60);
                            transVertex.globalAngle = angle + transVertex.angle;
                            cisVertex.globalAngle = angle + cisVertex.angle;

                            this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
                            this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, -dir);
                        } else {
                            transVertex.angle = -SmilesDrawer.MathHelper.toRad(60);
                            cisVertex.angle = SmilesDrawer.MathHelper.toRad(60);
                            transVertex.globalAngle = angle + transVertex.angle;
                            cisVertex.globalAngle = angle + cisVertex.angle;

                            this.createNextBond(cisVertex, vertex, cisVertex.globalAngle, -dir);
                            this.createNextBond(transVertex, vertex, transVertex.globalAngle, -dir);
                        }
                    }
                } else if (neighbours.length === 3) {
                    // The vertex with the longest sub-tree should always go straight
                    var d1 = this.getTreeDepth(neighbours[0], vertex.id);
                    var d2 = this.getTreeDepth(neighbours[1], vertex.id);
                    var d3 = this.getTreeDepth(neighbours[2], vertex.id);

                    var _s = this.graph.vertices[neighbours[0]];
                    var l = this.graph.vertices[neighbours[1]];
                    var _r4 = this.graph.vertices[neighbours[2]];

                    if (d2 > d1 && d2 > d3) {
                        _s = this.graph.vertices[neighbours[1]];
                        l = this.graph.vertices[neighbours[0]];
                        _r4 = this.graph.vertices[neighbours[2]];
                    } else if (d3 > d1 && d3 > d2) {
                        _s = this.graph.vertices[neighbours[2]];
                        l = this.graph.vertices[neighbours[0]];
                        _r4 = this.graph.vertices[neighbours[1]];
                    }

                    if (this.getTreeDepth(l.id, vertex.id) === 1 && this.getTreeDepth(_r4.id, vertex.id) === 1 && this.getTreeDepth(_s.id, vertex.id) > 1) {

                        if (!dir) {
                            var _proposedAngleA2 = SmilesDrawer.MathHelper.toRad(60);
                            var _proposedAngleB2 = -_proposedAngleA2;

                            var _proposedVectorA2 = new SmilesDrawer.Vector2(this.opts.bondLength, 0);
                            var _proposedVectorB2 = new SmilesDrawer.Vector2(this.opts.bondLength, 0);

                            _proposedVectorA2.rotate(_proposedAngleA2).add(vertex.position);
                            _proposedVectorB2.rotate(_proposedAngleB2).add(vertex.position);

                            // let centerOfMass = this.getCurrentCenterOfMassInNeigbourhood(vertex.position, 100);
                            var _centerOfMass2 = this.getCurrentCenterOfMass();
                            var _distanceA2 = _proposedVectorA2.distance(_centerOfMass2);
                            var _distanceB2 = _proposedVectorB2.distance(_centerOfMass2);

                            _s.angle = _distanceA2 < _distanceB2 ? _proposedAngleB2 : _proposedAngleA2;

                            if (_s.angle > 0) {
                                dir = -1;
                            } else {
                                dir = 1;
                            }
                        } else {
                            _s.angle = SmilesDrawer.MathHelper.toRad(60) * dir;
                            dir = -dir;
                        }

                        _s.globalAngle = angle + _s.angle;

                        this.createNextBond(_s, vertex, _s.globalAngle, -dir);

                        // If it's chiral, the order changes - for anticlockwise, switch the draw order around
                        // to keep the drawing the same
                        if (vertex.value.bracket && vertex.value.bracket.chirality === '@@') {
                            _r4.angle = SmilesDrawer.MathHelper.toRad(30) * dir;
                            l.angle = SmilesDrawer.MathHelper.toRad(90) * dir;

                            _r4.globalAngle = angle + _r4.angle;
                            l.globalAngle = angle + l.angle;

                            this.createNextBond(_r4, vertex, _r4.globalAngle);
                            this.createNextBond(l, vertex, l.globalAngle);
                        } else {
                            l.angle = SmilesDrawer.MathHelper.toRad(30) * dir;
                            _r4.angle = SmilesDrawer.MathHelper.toRad(90) * dir;

                            l.globalAngle = angle + l.angle;
                            _r4.globalAngle = angle + _r4.angle;

                            this.createNextBond(l, vertex, l.globalAngle);
                            this.createNextBond(_r4, vertex, _r4.globalAngle);
                        }
                    } else {
                        _s.angle = 0.0;
                        l.angle = SmilesDrawer.MathHelper.toRad(90);
                        _r4.angle = -SmilesDrawer.MathHelper.toRad(90);

                        _s.globalAngle = angle + _s.angle;
                        l.globalAngle = angle + l.angle;
                        _r4.globalAngle = angle + _r4.angle;

                        this.createNextBond(_s, vertex, _s.globalAngle);
                        this.createNextBond(l, vertex, l.globalAngle);
                        this.createNextBond(_r4, vertex, _r4.globalAngle);
                    }
                } else if (neighbours.length === 4) {
                    // The vertex with the longest sub-tree should always go to the reflected opposide direction
                    var _d2 = this.getTreeDepth(neighbours[0], vertex.id);
                    var _d3 = this.getTreeDepth(neighbours[1], vertex.id);
                    var _d4 = this.getTreeDepth(neighbours[2], vertex.id);
                    var d4 = this.getTreeDepth(neighbours[3], vertex.id);

                    var w = this.graph.vertices[neighbours[0]];
                    var x = this.graph.vertices[neighbours[1]];
                    var y = this.graph.vertices[neighbours[2]];
                    var z = this.graph.vertices[neighbours[3]];

                    if (_d3 > _d2 && _d3 > _d4 && _d3 > d4) {
                        w = this.graph.vertices[neighbours[1]];
                        x = this.graph.vertices[neighbours[0]];
                        y = this.graph.vertices[neighbours[2]];
                        z = this.graph.vertices[neighbours[3]];
                    } else if (_d4 > _d2 && _d4 > _d3 && _d4 > d4) {
                        w = this.graph.vertices[neighbours[2]];
                        x = this.graph.vertices[neighbours[0]];
                        y = this.graph.vertices[neighbours[1]];
                        z = this.graph.vertices[neighbours[3]];
                    } else if (d4 > _d2 && d4 > _d3 && d4 > _d4) {
                        w = this.graph.vertices[neighbours[3]];
                        x = this.graph.vertices[neighbours[0]];
                        y = this.graph.vertices[neighbours[1]];
                        z = this.graph.vertices[neighbours[2]];
                    }

                    w.angle = -SmilesDrawer.MathHelper.toRad(36);
                    x.angle = SmilesDrawer.MathHelper.toRad(36);
                    y.angle = -SmilesDrawer.MathHelper.toRad(108);
                    z.angle = SmilesDrawer.MathHelper.toRad(108);

                    w.globalAngle = angle + w.angle;
                    x.globalAngle = angle + x.angle;
                    y.globalAngle = angle + y.angle;
                    z.globalAngle = angle + z.angle;

                    this.createNextBond(w, vertex, w.globalAngle);
                    this.createNextBond(x, vertex, x.globalAngle);
                    this.createNextBond(y, vertex, y.globalAngle);
                    this.createNextBond(z, vertex, z.globalAngle);
                }
            }
        }

        /**
         * Gets the vetex sharing the edge that is the common bond of two rings.
         *
         * @param {SmilesDrawer.Vertex} vertex A vertex.
         * @returns {Number|null} The id of a vertex sharing the edge that is the common bond of two rings with the vertex provided or null, if none.
         */

    }, {
        key: 'getCommonRingbondNeighbour',
        value: function getCommonRingbondNeighbour(vertex) {
            var neighbours = vertex.getNeighbours();

            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = this.graph.vertices[neighbours[i]];

                if (SmilesDrawer.ArrayHelper.All(neighbour.value.rings, vertex.value.rings)) {
                    return neighbour;
                }
            }

            return null;
        }

        /**
         * Check if a vector is inside any ring.
         *
         * @param {SmilesDrawer.Vector2} vec A vector.
         * @returns {Boolean} A boolean indicating whether or not the point (vector) is inside any of the rings associated with the current molecule.
         */

    }, {
        key: 'isPointInRing',
        value: function isPointInRing(vec) {
            for (var i = 0; i < this.rings.length; i++) {
                var ring = this.rings[i];

                if (!ring.positioned) {
                    continue;
                }

                var radius = SmilesDrawer.MathHelper.polyCircumradius(this.opts.bondLength, ring.getSize());
                var radiusSq = radius * radius;

                if (vec.distanceSq(ring.center) < radiusSq) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Check whether or not an edge is part of a ring.
         *
         * @param {SmilesDrawer.Edge} edge An edge.
         * @returns {Boolean} A boolean indicating whether or not the edge is part of a ring.
         */

    }, {
        key: 'isEdgeInRing',
        value: function isEdgeInRing(edge) {
            var source = this.graph.vertices[edge.sourceId];
            var target = this.graph.vertices[edge.targetId];

            return this.areVerticesInSameRing(source, target);
        }

        /**
         * Check whether or not an edge is rotatable.
         *
         * @param {SmilesDrawer.Edge} edge An edge.
         * @returns {Boolean} A boolean indicating whether or not the edge is rotatable.
         */

    }, {
        key: 'isEdgeRotatable',
        value: function isEdgeRotatable(edge) {
            var vertexA = this.graph.vertices[edge.sourceId];
            var vertexB = this.graph.vertices[edge.targetId];

            // Only single bonds are rotatable
            if (edge.bondType !== '-') {
                return false;
            }

            // Do not rotate edges that have a further single bond to each side
            // If the bond is terminal, it doesn't make sense to rotate it
            if (vertexA.getNeighbourCount() + vertexB.getNeighbourCount() < 5) {
                return false;
            }

            // Ringbonds are not rotatable
            if (vertexA.value.rings.length > 0 && vertexB.value.rings.length > 0 && this.areVerticesInSameRing(vertexA, vertexB)) {
                return false;
            }

            return true;
        }

        /**
         * Check whether or not a ring is an implicitly defined aromatic ring (lower case smiles).
         *
         * @param {SmilesDrawer.Ring} ring A ring.
         * @returns {Boolean} A boolean indicating whether or not a ring is implicitly defined as aromatic.
         */

    }, {
        key: 'isRingAromatic',
        value: function isRingAromatic(ring) {
            for (var i = 0; i < ring.members.length; i++) {
                var vertex = this.graph.vertices[ring.members[i]];

                if (!vertex.value.isPartOfAromaticRing) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Checks whether or not an edge is part of an explicit aromatic ring (lower case smiles).
         *
         * @param {SmilesDrawer.Edge} edge An edge.
         * @returns {Boolean} A boolean indicating whether or not the vertex is part of an explicit aromatic ring.
         */

    }, {
        key: 'isEdgeInAromaticRing',
        value: function isEdgeInAromaticRing(edge) {
            var source = this.graph.vertices[edge.sourceId].value;
            var target = this.graph.vertices[edge.targetId].value;

            return source.isPartOfAromaticRing && target.isPartOfAromaticRing;
        }

        /**
         * Get the normals of an edge.
         *
         * @param {SmilesDrawer.Edge} edge An edge.
         * @returns {SmilesDrawer.Vector2[]} An array containing two vectors, representing the normals.
         */

    }, {
        key: 'getEdgeNormals',
        value: function getEdgeNormals(edge) {
            var v1 = this.graph.vertices[edge.sourceId].position;
            var v2 = this.graph.vertices[edge.targetId].position;

            // Get the normalized normals for the edge
            var normals = SmilesDrawer.Vector2.units(v1, v2);

            return normals;
        }

        /**
         * Get the depth of a subtree in the direction opposite to the vertex specified as the parent vertex.
         *
         * @param {Number} vertexId A vertex id.
         * @param {Number} parentVertexId The id of a neighbouring vertex.
         * @returns {Number} The depth of the sub-tree.
         */

    }, {
        key: 'getTreeDepth',
        value: function getTreeDepth(vertexId, parentVertexId) {
            if (vertexId === null || parentVertexId === null) {
                return 0;
            }

            var neighbours = this.graph.vertices[vertexId].getSpanningTreeNeighbours(parentVertexId);
            var max = 0;

            for (var i = 0; i < neighbours.length; i++) {
                var childId = neighbours[i];
                var d = this.getTreeDepth(childId, vertexId);

                if (d > max) {
                    max = d;
                }
            }

            return max + 1;
        }

        /**
         * Traverse a sub-tree in the graph.
         *
         * @param {Number} vertexId A vertex id.
         * @param {Number} parentVertexId A neighbouring vertex.
         * @param {Function} callback The callback function that is called with each visited as an argument.
         * @param {Number} [maxDepth=null] The maximum depth of the recursion. If null, there is no limit.
         * @param {Boolean} [ignoreFirst=false] Whether or not to ignore the starting vertex supplied as vertexId in the callback.
         */

    }, {
        key: 'traverseTree',
        value: function traverseTree(vertexId, parentVertexId, callback) {
            var maxDepth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var ignoreFirst = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var depth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
            var visited = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];

            if (maxDepth !== null && depth > maxDepth + 1) {
                return;
            }

            for (var j = 0; j < visited.length; j++) {
                if (visited[j] === vertexId) {
                    return;
                }
            }

            visited.push(vertexId);

            var vertex = this.graph.vertices[vertexId];
            var neighbours = vertex.getNeighbours(parentVertexId);

            if (!ignoreFirst || depth > 1) {
                callback(vertex);
            }

            for (var i = 0; i < neighbours.length; i++) {
                this.traverseTree(neighbours[i], vertexId, callback, maxDepth, ignoreFirst, depth + 1, visited);
            }
        }

        /**
         * Gets the number of bonds of a vertex.
         *
         * @param {SmilesDrawer.Vertex} vertex A vertex.
         * @returns {Number} The number of bonds the vertex participates in.
         */

    }, {
        key: 'getBondCount',
        value: function getBondCount(vertex) {
            var count = 0;

            for (var i = 0; i < vertex.edges.length; i++) {
                count += this.graph.edges[vertex.edges[i]].getBondCount();
            }

            return count;
        }

        /**
         * Returns an array of vertices that are neighbouring a vertix but are not members of a ring (including bridges).
         *
         * @param {Number} vertexId A vertex id.
         * @returns {SmilesDrawer.Vertex[]} An array of vertices.
         */

    }, {
        key: 'getNonRingNeighbours',
        value: function getNonRingNeighbours(vertexId) {
            var nrneighbours = [];
            var vertex = this.graph.vertices[vertexId];
            var neighbours = vertex.getNeighbours();

            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = this.graph.vertices[neighbours[i]];
                var nIntersections = SmilesDrawer.ArrayHelper.intersection(vertex.value.rings, neighbour.value.rings).length;

                if (nIntersections === 0 && neighbour.value.isBridge == false) {
                    nrneighbours.push(neighbour);
                }
            }

            return nrneighbours;
        }
    }, {
        key: 'annotateChirality',
        value: function annotateChirality() {}

        /**
         * Creates pseudo-elements (such as Et, Me, Ac, Bz, ...) at the position of the carbon sets
         * the involved atoms not to be displayed.
         */

    }, {
        key: 'initPseudoElements',
        value: function initPseudoElements() {
            for (var i = 0; i < this.graph.vertices.length; i++) {
                var vertex = this.graph.vertices[i];
                var neighbourIds = vertex.getNeighbours();
                var neighbours = [];

                for (var j = 0; j < neighbourIds.length; j++) {
                    neighbours.push(this.graph.vertices[neighbourIds[j]]);
                }

                // Ignore atoms that have less than 3 neighbours, except if
                // the vertex is connected to a ring and has two neighbours
                if (vertex.getNeighbourCount() < 3 || vertex.value.rings.length > 0) {
                    continue;
                }

                // Continue if there are less than two heteroatoms
                // or if a neighbour has more than 1 neighbour
                var heteroAtomCount = 0;
                var ctn = 0;

                for (var j = 0; j < neighbours.length; j++) {
                    var neighbour = neighbours[j];
                    var neighbouringElement = neighbour.value.element;
                    var neighbourCount = neighbour.getNeighbourCount();

                    if (neighbouringElement !== 'C' && neighbouringElement !== 'H' && neighbourCount === 1) {
                        heteroAtomCount++;
                    }

                    if (neighbourCount > 1) {
                        ctn++;
                    }
                }

                if (ctn > 1 || heteroAtomCount < 2) {
                    continue;
                }

                // Get the previous atom (the one which is not terminal)
                var previous = null;

                for (var j = 0; j < neighbours.length; j++) {
                    var _neighbour = neighbours[j];

                    if (_neighbour.getNeighbourCount() > 1) {
                        previous = _neighbour;
                    }
                }

                for (var j = 0; j < neighbours.length; j++) {
                    var _neighbour2 = neighbours[j];

                    if (_neighbour2.getNeighbourCount() > 1) {
                        continue;
                    }

                    _neighbour2.value.isDrawn = false;

                    var hydrogens = SmilesDrawer.Atom.maxBonds[_neighbour2.value.element] - this.getBondCount(_neighbour2);

                    if (_neighbour2.value.bracket) {
                        hydrogens = _neighbour2.value.bracket.hcount;
                    }

                    vertex.value.attachPseudoElement(_neighbour2.value.element, previous ? previous.value.element : null, hydrogens);
                }
            }

            // The second pass
            for (var i = 0; i < this.graph.vertices.length; i++) {
                var _vertex6 = this.graph.vertices[i];
                var atom = _vertex6.value;
                var element = atom.element;

                if (element === 'C' || element === 'H' || !atom.isDrawn) {
                    continue;
                }

                var _neighbourIds = _vertex6.getNeighbours();
                var _neighbours = [];

                for (var j = 0; j < _neighbourIds.length; j++) {
                    _neighbours.push(this.graph.vertices[_neighbourIds[j]]);
                }

                for (var j = 0; j < _neighbours.length; j++) {
                    var _neighbour3 = _neighbours[j].value;

                    if (!_neighbour3.hasAttachedPseudoElements || _neighbour3.getAttachedPseudoElementsCount() !== 2) {
                        continue;
                    }

                    var pseudoElements = _neighbour3.getAttachedPseudoElements();

                    if (pseudoElements.hasOwnProperty('0O') && pseudoElements.hasOwnProperty('3C')) {
                        _neighbour3.isDrawn = false;
                        _vertex6.value.attachPseudoElement('Ac', '', 0);
                    }
                }
            }
        }
    }]);

    return Drawer;
}();

/** 
 * A class representing an edge. 
 * 
 * @property {Number} id The id of this edge.
 * @property {Number} sourceId The id of the source vertex.
 * @property {Number} targetId The id of the target vertex.
 * @property {Number} weight The weight of this edge.
 * @property {String} [bondType='-'] The bond type of this edge.
 * @property {Boolean} [isInAromaticRing=false] Whether or not this edge is part of an aromatic ring.
 * @property {Boolean} [center=false] Wheter or not the bond is centered. For example, this affects straight double bonds.
 * @property {String} [chiral=''] Chirality information.
 */
SmilesDrawer.Edge = function () {
    /**
     * The constructor for the class Edge.
     *
     * @param {Number} sourceId A vertex id.
     * @param {Number} targetId A vertex id.
     * @param {Number} [weight=1] The weight of the edge.
     */
    function Edge(sourceId, targetId) {
        var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        _classCallCheck(this, Edge);

        this.id = null;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.weight = weight;
        this.bondType = '-';
        this.isInAromaticRing = false;
        this.center = false;
        this.chiral = '';
    }

    /**
     * Returns the number of bonds associated with the bond type of this edge.
     *
     * @returns {Number} The number of bonds associated with this edge.
     */


    _createClass(Edge, [{
        key: 'getBondCount',
        value: function getBondCount() {
            return Edge.bonds[this.bondType];
        }

        /**
         * An object mapping the bond type to the number of bonds.
         *
         * @returns {Object} The object containing the map.
         */

    }], [{
        key: 'bonds',
        get: function get() {
            return {
                '-': 1,
                '/': 1,
                '\\': 1,
                '=': 2,
                '#': 3,
                '$': 4
            };
        }
    }]);

    return Edge;
}();

/** 
 * A class representing the molecular graph. 
 * 
 * @property {SmilesDrawer.Vertex[]} vertices The vertices of the graph.
 * @property {SmilesDrawer.Edge[]} edges The edges of this graph.
 * @property {Object} vertexIdsToEdgeId A map mapping vertex ids to the edge between the two vertices. The key is defined as vertexAId + '_' + vertexBId.
 * @property {Object} elementCount A map associating element symbols with the number of occurences in this graph.
 * @property {Boolean} isometric A boolean indicating whether or not the SMILES associated with this graph is isometric.
 */
SmilesDrawer.Graph = function () {
    /**
     * The constructor of the class Graph.
     * 
     * @param {Object} parseTree A SMILES parse tree.
     * @param {Boolean} [isomeric=false] A boolean specifying whether or not the SMILES is isomeric.
     */
    function Graph(parseTree) {
        var isomeric = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, Graph);

        this.vertices = [];
        this.edges = [];
        this.vertexIdsToEdgeId = {};
        this.elementCount = {};
        this.isomeric = isomeric;

        // Used for the bridge detection algorithm
        this._time = 0;
        this._init(parseTree);
        this._initInfos();
    }

    /**
     * PRIVATE FUNCTION. Initializing the graph from the parse tree.
     *
     * @param {Object} node The current node in the parse tree.
     * @param {Number} parentVertexId=null The id of the previous vertex.
     * @param {Boolean} isBranch=false Whether or not the bond leading to this vertex is a branch bond. Branches are represented by parentheses in smiles (e.g. CC(O)C).
     */


    _createClass(Graph, [{
        key: '_init',
        value: function _init(node) {
            var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var parentVertexId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var isBranch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            // Create a new vertex object
            var atom = new SmilesDrawer.Atom(node.atom.element ? node.atom.element : node.atom, node.bond);

            atom.branchBond = node.branchBond;
            atom.ringbonds = node.ringbonds;
            atom.bracket = node.atom.element ? node.atom : null;
            atom.setOrder(parentVertexId, order);

            var vertex = new SmilesDrawer.Vertex(atom);
            var parentVertex = this.vertices[parentVertexId];

            this.addVertex(vertex);

            // Add the id of this node to the parent as child
            if (parentVertexId !== null) {
                vertex.setParentVertexId(parentVertexId);
                vertex.value.addNeighbouringElement(parentVertex.value.element);
                parentVertex.addChild(vertex.id);
                parentVertex.value.addNeighbouringElement(atom.element);

                // In addition create a spanningTreeChildren property, which later will
                // not contain the children added through ringbonds
                parentVertex.spanningTreeChildren.push(vertex.id);

                // Add edge between this node and its parent
                var edge = new SmilesDrawer.Edge(parentVertexId, vertex.id, 1);

                if (isBranch) {
                    edge.bondType = vertex.value.branchBond;
                } else {
                    edge.bondType = parentVertex.value.bondType;
                }

                var edgeId = this.addEdge(edge);
                vertex.edges.push(edgeId);
                parentVertex.edges.push(edgeId);
            }

            if (atom.bracket && this.isomeric) {
                for (var i = 0; i < atom.bracket.hcount; i++) {
                    if (this.isomeric) {
                        this._init({ atom: { element: 'H', bond: '-' }, ringbonds: [] }, i + 1, vertex.id);
                    }
                }
            }

            var offset = node.ringbondCount + 1;

            if (atom.bracket) {
                offset += atom.bracket.hcount;
            }

            for (var i = 0; i < node.branchCount; i++) {
                this._init(node.branches[i], i + offset, vertex.id, true);
            }

            if (node.hasNext) {
                this._init(node.next, node.branchCount + offset, vertex.id);
            }
        }

        /**
         * PRIVATE FUNCTION. Initializes element counts etc.
         */

    }, {
        key: '_initInfos',
        value: function _initInfos() {
            for (var i = 0; i < this.vertices.length; i++) {
                var atom = this.vertices[i].value;

                if (typeof this.elementCount[atom.element] !== 'undefined') {
                    this.elementCount[atom.element] += 1;
                } else {
                    this.elementCount[atom.element] = 0;
                }
            }
        }

        /**
         * Clears all the elements in this graph (edges and vertices).
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.vertices = [];
            this.edges = [];
            this.vertexIdsToEdgeId = {};
        }

        /**
         * Add a vertex to the graph.
         *
         * @param {SmilesDrawer.Vertex} vertex A new vertex.
         * @returns {Number} The vertex id of the new vertex.
         */

    }, {
        key: 'addVertex',
        value: function addVertex(vertex) {
            vertex.id = this.vertices.length;
            this.vertices.push(vertex);

            return vertex.id;
        }

        /**
         * Add an edge to the graph.
         *
         * @param {SmilesDrawer.Edge} edge A new edge.
         * @returns {Number} The edge id of the new edge.
         */

    }, {
        key: 'addEdge',
        value: function addEdge(edge) {
            edge.id = this.edges.length;
            this.edges.push(edge);

            this.vertexIdsToEdgeId[edge.sourceId + '_' + edge.targetId] = edge.id;
            this.vertexIdsToEdgeId[edge.targetId + '_' + edge.sourceId] = edge.id;

            return edge.id;
        }

        /**
         * Returns the edge between two given vertices.
         *
         * @param {Number} vertexIdA A vertex id.
         * @param {Number} vertexIdB A vertex id.
         * @returns {Number|null} The edge or, if no edge can be found, null.
         */

    }, {
        key: 'getEdge',
        value: function getEdge(vertexIdA, vertexIdB) {
            var edgeId = this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB];

            return edgeId === undefined ? null : this.edges[edgeId];
        }

        /**
         * Returns the edge between two given vertices.
         *
         * @param {Number} vertexIdA A vertex id.
         * @param {Number} vertexIdB A vertex id.
         * @returns {Number|null} The edge or, if no edge can be found, null.
         */

    }, {
        key: 'hasEdge',
        value: function hasEdge(vertexIdA, vertexIdB) {
            return this.vertexIdsToEdgeId[vertexIdA + '_' + vertexIdB] !== undefined;
        }

        /**
         * Returns an array containing the vertex ids of this graph.
         * 
         * @returns {Number[]} An array containing all vertex ids of this graph.
         */

    }, {
        key: 'getVertexList',
        value: function getVertexList() {
            var arr = [this.vertices.length];

            for (var i = 0; i < this.vertices.length; i++) {
                arr[i] = this.vertices[i].id;
            }

            return arr;
        }

        /**
         * Returns an array containing source, target arrays of this graphs edges.
         * 
         * @returns {Array[]} An array containing source, target arrays of this graphs edges. Example: [ [ 2, 5 ], [ 6, 9 ] ].
         */

    }, {
        key: 'getEdgeList',
        value: function getEdgeList() {
            var arr = [this.edges.length];

            for (var i = 0; i < this.edges.length; i++) {
                arr[i] = [this.edges[i].sourceId, this.edges[i].targetId];
            }

            return arr;
        }

        /**
         * Get the adjacency matrix of the graph.
         * 
         * @returns {Array[]} The adjancency matrix of the molecular graph.
         */

    }, {
        key: 'getAdjacencyMatrix',
        value: function getAdjacencyMatrix() {
            var length = this.vertices.length;
            var adjacencyMatrix = Array(length);

            for (var i = 0; i < length; i++) {
                adjacencyMatrix[i] = new Array(length);
                adjacencyMatrix[i].fill(0);
            }

            for (var i = 0; i < this.edges.length; i++) {
                var edge = this.edges[i];

                adjacencyMatrix[edge.sourceId][edge.targetId] = 1;
                adjacencyMatrix[edge.targetId][edge.sourceId] = 1;
            }

            return adjacencyMatrix;
        }

        /**
         * Get the adjacency matrix of the graph with all bridges removed (thus the components). Thus the remaining vertices are all part of ring systems.
         * 
         * @returns {Array[]} The adjancency matrix of the molecular graph with all bridges removed.
         */

    }, {
        key: 'getComponentsAdjacencyMatrix',
        value: function getComponentsAdjacencyMatrix() {
            var length = this.vertices.length;
            var adjacencyMatrix = Array(length);
            var bridges = this.getBridges();

            for (var i = 0; i < length; i++) {
                adjacencyMatrix[i] = new Array(length);
                adjacencyMatrix[i].fill(0);
            }

            for (var i = 0; i < this.edges.length; i++) {
                var edge = this.edges[i];

                adjacencyMatrix[edge.sourceId][edge.targetId] = 1;
                adjacencyMatrix[edge.targetId][edge.sourceId] = 1;
            }

            for (var i = 0; i < bridges.length; i++) {
                adjacencyMatrix[bridges[i][0]][bridges[i][1]] = 0;
                adjacencyMatrix[bridges[i][1]][bridges[i][0]] = 0;
            }

            return adjacencyMatrix;
        }

        /**
         * Get the adjacency matrix of a subgraph.
         * 
         * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
         * @returns {Array[]} The adjancency matrix of the subgraph.
         */

    }, {
        key: 'getSubgraphAdjacencyMatrix',
        value: function getSubgraphAdjacencyMatrix(vertexIds) {
            var length = vertexIds.length;
            var adjacencyMatrix = Array(length);

            for (var i = 0; i < length; i++) {
                adjacencyMatrix[i] = new Array(length);
                adjacencyMatrix[i].fill(0);

                for (var j = 0; j < length; j++) {
                    if (i === j) {
                        continue;
                    }

                    if (this.hasEdge(vertexIds[i], vertexIds[j])) {
                        adjacencyMatrix[i][j] = 1;
                    }
                }
            }

            return adjacencyMatrix;
        }

        /**
         * Get the adjacency list of the graph.
         * 
         * @returns {Array[]} The adjancency list of the graph.
         */

    }, {
        key: 'getAdjacencyList',
        value: function getAdjacencyList() {
            var length = this.vertices.length;
            var adjacencyList = Array(length);

            for (var i = 0; i < length; i++) {
                adjacencyList[i] = [];

                for (var j = 0; j < length; j++) {
                    if (i === j) {
                        continue;
                    }

                    if (this.hasEdge(this.vertices[i].id, this.vertices[j].id)) {
                        adjacencyList[i].push(j);
                    }
                }
            }

            return adjacencyList;
        }

        /**
         * Get the adjacency list of a subgraph.
         * 
         * @param {Number[]} vertexIds An array containing the vertex ids contained within the subgraph.
         * @returns {Array[]} The adjancency list of the subgraph.
         */

    }, {
        key: 'getSubgraphAdjacencyList',
        value: function getSubgraphAdjacencyList(vertexIds) {
            var length = vertexIds.length;
            var adjacencyList = Array(length);

            for (var i = 0; i < length; i++) {
                adjacencyList[i] = [];

                for (var j = 0; j < length; j++) {
                    if (i === j) {
                        continue;
                    }

                    if (this.hasEdge(vertexIds[i], vertexIds[j])) {
                        adjacencyList[i].push(j);
                    }
                }
            }

            return adjacencyList;
        }

        /**
         * Returns an array containing the edge ids of bridges. A bridge splits the graph into multiple components when removed.
         * 
         * @returns {Number[]} An array containing the edge ids of the bridges.
         */

    }, {
        key: 'getBridges',
        value: function getBridges() {
            var length = this.vertices.length;
            var visited = new Array(length);
            var disc = new Array(length);
            var low = new Array(length);
            var parent = new Array(length);
            var adj = this.getAdjacencyList();
            var outBridges = [];

            visited.fill(false);
            parent.fill(null);
            this._time = 0;

            for (var i = 0; i < length; i++) {
                if (!visited[i]) {
                    this._bridgeDfs(i, visited, disc, low, parent, adj, outBridges);
                }
            }

            return outBridges;
        }

        /**
         * PRIVATE FUNCTION used by getBridges().
         */

    }, {
        key: '_bridgeDfs',
        value: function _bridgeDfs(u, visited, disc, low, parent, adj, outBridges) {
            visited[u] = true;
            disc[u] = low[u] = ++this._time;

            for (var i = 0; i < adj[u].length; i++) {
                var v = adj[u][i];

                if (!visited[v]) {
                    parent[v] = u;

                    this._bridgeDfs(v, visited, disc, low, parent, adj, outBridges);

                    low[u] = Math.min(low[u], low[v]);

                    // If low > disc, we have a bridge
                    if (low[v] > disc[u]) {
                        outBridges.push([u, v]);
                    }
                } else if (v !== parent[u]) {
                    low[u] = Math.min(low[u], disc[v]);
                }
            }
        }

        /**
         * Returns the number of connected components for the grpah 
         * 
         * @param {Array[]} adjacencyMatrix An adjacency matrix.
         * @returns {Number} The number of connected components of the supplied graph.
         */

    }], [{
        key: 'getConnectedComponentCount',
        value: function getConnectedComponentCount(adjacencyMatrix) {
            var length = adjacencyMatrix.length;
            var visited = new Array(length);
            var count = 0;

            visited.fill(false);

            for (var u = 0; u < length; u++) {
                if (!visited[u]) {
                    visited[u] = true;
                    count++;
                    Graph._ccCountDfs(u, visited, adjacencyMatrix);
                }
            }

            return count;
        }

        /**
         * PRIVATE FUNCTION used by getConnectedComponentCount().
         */

    }, {
        key: '_ccCountDfs',
        value: function _ccCountDfs(u, visited, adjacencyMatrix) {
            for (var v = 0; v < adjacencyMatrix[u].length; v++) {
                var c = adjacencyMatrix[u][v];

                if (!c || visited[v] || u === v) {
                    continue;
                }

                visited[v] = true;
                Graph._ccCountDfs(v, visited, adjacencyMatrix);
            }
        }
    }]);

    return Graph;
}();
/** 
 * A class representing a line.
 * 
 * @property {SmilesDrawer.Vector2} from The SmilesDrawer.Vector2 defining the start of the line.
 * @property {SmilesDrawer.Vector2} to The SmilesDrawer.Vector2 defining the end of the line.
 * @property {String} elementFrom The element symbol associated with the start of the line.
 * @property {String} elementTo The element symbol associated with the end of the line.
 * @property {Boolean} chiralFrom A boolean indicating whether or not the source atom is a chiral center.
 * @property {Boolean} chiralTo A boolean indicating whether or tno the target atom is a chiral center.
 */
SmilesDrawer.Line = function () {
    /**
     * The constructor for the class Line.
     *
     * @param {Vector2} [from=new Vector2(0, 0)] A vector marking the beginning of the line.
     * @param {Vector2} [to=new Vector2(0, 0)] A vector marking the end of the line.
     * @param {string} [elementFrom=null] A one-letter representation of the element associated with the vector marking the beginning of the line.
     * @param {string} [elementTo=null] A one-letter representation of the element associated with the vector marking the end of the line.
     * @param {boolean} [chiralFrom=false] Whether or not the from atom is a chiral center.
     * @param {boolean} [chiralTo=false] Whether or not the to atom is a chiral center.
     */
    function Line() {
        var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new SmilesDrawer.Vector2(0, 0);
        var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new SmilesDrawer.Vector(0, 0);
        var elementFrom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var elementTo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var chiralFrom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var chiralTo = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        _classCallCheck(this, Line);

        this.from = from;
        this.to = to;
        this.elementFrom = elementFrom;
        this.elementTo = elementTo;
        this.chiralFrom = chiralFrom;
        this.chiralTo = chiralTo;
    }

    /**
     * Clones this line and returns the clone.
     *
     * @returns {SmilesDrawer.Line} A clone of this line.
     */


    _createClass(Line, [{
        key: 'clone',
        value: function clone() {
            return new SmilesDrawer.Line(this.from.clone(), this.to.clone(), this.elementFrom, this.elementTo);
        }

        /**
         * Returns the length of this line.
         *
         * @returns {Number} The length of this line.
         */

    }, {
        key: 'getLength',
        value: function getLength() {
            return Math.sqrt(Math.pow(this.to.x - this.from.x, 2) + Math.pow(this.to.y - this.from.y, 2));
        }

        /**
         * Returns the angle of the line in relation to the coordinate system (the x-axis).
         *
         * @returns {Number} The angle in radians.
         */

    }, {
        key: 'getAngle',
        value: function getAngle() {
            // Get the angle between the line and the x-axis
            var diff = SmilesDrawer.Vector2.subtract(this.getRightVector(), this.getLeftVector());
            return diff.angle();
        }

        /**
         * Returns the right vector (the vector with the larger x value).
         *
         * @returns {SmilesDrawer.Vector2} The right vector.
         */

    }, {
        key: 'getRightVector',
        value: function getRightVector() {
            // Return the vector with the larger x value (the right one)
            if (this.from.x < this.to.x) {
                return this.to;
            } else {
                return this.from;
            }
        }

        /**
         * Returns the left vector (the vector with the smaller x value).
         *
         * @returns {SmilesDrawer.Vector2} The left vector.
         */

    }, {
        key: 'getLeftVector',
        value: function getLeftVector() {
            // Return the vector with the smaller x value (the left one)
            if (this.from.x < this.to.x) {
                return this.from;
            } else {
                return this.to;
            }
        }

        /**
         * Returns the element associated with the right vector (the vector with the larger x value).
         *
         * @returns {String} The element associated with the right vector.
         */

    }, {
        key: 'getRightElement',
        value: function getRightElement() {
            if (this.from.x < this.to.x) {
                return this.elementTo;
            } else {
                return this.elementFrom;
            }
        }

        /**
         * Returns the element associated with the left vector (the vector with the smaller x value).
         *
         * @returns {String} The element associated with the left vector.
         */

    }, {
        key: 'getLeftElement',
        value: function getLeftElement() {
            if (this.from.x < this.to.x) {
                return this.elementFrom;
            } else {
                return this.elementTo;
            }
        }

        /**
         * Returns whether or not the atom associated with the right vector (the vector with the larger x value) is a chiral center.
         *
         * @returns {Boolean} Whether or not the atom associated with the right vector is a chiral center.
         */

    }, {
        key: 'getRightChiral',
        value: function getRightChiral() {
            if (this.from.x < this.to.x) {
                return this.chiralTo;
            } else {
                return this.chiralFrom;
            }
        }

        /**
         * Returns whether or not the atom associated with the left vector (the vector with the smaller x value) is a chiral center.
         *
         * @returns {Boolean} Whether or not the atom  associated with the left vector is a chiral center.
         */

    }, {
        key: 'getLeftChiral',
        value: function getLeftChiral() {
            if (this.from.x < this.to.x) {
                return this.chiralFrom;
            } else {
                return this.chiralTo;
            }
        }

        /**
         * Set the value of the right vector.
         *
         * @param {Number} x The x value.
         * @param {Number} y The y value.
         * @returns {SmilesDrawer.Line} This line.
         */

    }, {
        key: 'setRightVector',
        value: function setRightVector(x, y) {
            if (this.from.x < this.to.x) {
                this.to.x = x;
                this.to.y = y;
            } else {
                this.from.x = x;
                this.from.y = y;
            }

            return this;
        }

        /**
         * Set the value of the left vector.
         *
         * @param {Number} x The x value.
         * @param {Number} y The y value.
         * @returns {SmilesDrawer.Line} This line.
         */

    }, {
        key: 'setLeftVector',
        value: function setLeftVector(x, y) {
            if (this.from.x < this.to.x) {
                this.from.x = x;
                this.from.y = y;
            } else {
                this.to.x = x;
                this.to.y = y;
            }

            return this;
        }

        /**
         * Rotates this line to be aligned with the x-axis. The center of rotation is the left vector.
         *
         * @returns {SmilesDrawer.Line} This line.
         */

    }, {
        key: 'rotateToXAxis',
        value: function rotateToXAxis() {
            var left = this.getLeftVector();

            this.setRightVector(left.x + this.getLength(), left.y);

            return this;
        }

        /**
         * Rotate the line by a given value (in radians). The center of rotation is the left vector.
         *
         * @param {Number} theta The angle (in radians) to rotate the line.
         * @returns {SmilesDrawer.Line} This line.
         */

    }, {
        key: 'rotate',
        value: function rotate(theta) {
            var l = this.getLeftVector();
            var r = this.getRightVector();
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            var x = cosTheta * (r.x - l.x) - sinTheta * (r.y - l.y) + l.x;
            var y = sinTheta * (r.x - l.x) - cosTheta * (r.y - l.y) + l.y;

            this.setRightVector(x, y);

            return this;
        }

        /**
         * Shortens this line from the "from" direction by a given value (in pixels).
         *
         * @param {Number} by The length in pixels to shorten the vector by.
         * @returns {SmilesDrawer.Line} This line.
         */

    }, {
        key: 'shortenFrom',
        value: function shortenFrom(by) {
            var f = SmilesDrawer.Vector2.subtract(this.to, this.from);

            f.normalize();
            f.multiplyScalar(by);

            this.from.add(f);

            return this;
        }

        /**
         * Shortens this line from the "to" direction by a given value (in pixels).
         *
         * @param {Number} by The length in pixels to shorten the vector by.
         * @returns {SmilesDrawer.Line} This line.
         */

    }, {
        key: 'shortenTo',
        value: function shortenTo(by) {
            var f = SmilesDrawer.Vector2.subtract(this.from, this.to);

            f.normalize();
            f.multiplyScalar(by);

            this.to.add(f);

            return this;
        }

        /**
         * Shorten the right side.
         *
         * @param {Number} by The length in pixels to shorten the vector by.
         * @returns {SmilesDrawer.Line} Returns itself.
         */

    }, {
        key: 'shortenRight',
        value: function shortenRight(by) {
            if (this.from.x < this.to.x) {
                this.shortenTo(by);
            } else {
                this.shortenFrom(by);
            }

            return this;
        }

        /**
         * Shorten the left side.
         * 
         * @param {Number} by The length in pixels to shorten the vector by.
         * @returns {SmilesDrawer.Line} Returns itself.
         */

    }, {
        key: 'shortenLeft',
        value: function shortenLeft(by) {
            if (this.from.x < this.to.x) {
                this.shortenFrom(by);
            } else {
                this.shortenTo(by);
            }

            return this;
        }

        /**
         * Shortens this line from both directions by a given value (in pixels).
         *
         * @param {Number} by The length in pixels to shorten the vector by.
         * @returns {SmilesDrawer.Line} This line.
         */

    }, {
        key: 'shorten',
        value: function shorten(by) {
            var f = SmilesDrawer.Vector2.subtract(this.from, this.to);

            f.normalize();
            f.multiplyScalar(by / 2.0);

            this.to.add(f);
            this.from.subtract(f);

            return this;
        }

        /**
         * Returns the normals of this line.
         *
         * @returns {SmilesDrawer.Vector2[]} An array containing the two normals as vertices.
         */

    }, {
        key: 'getNormals',
        value: function getNormals() {
            var delta = SmilesDrawer.Vector2.subtract(from, to);

            return [new SmilesDrawer.Vector2(-delta.y, delta.x), new SmilesDrawer.Vector2(delta.y, -delta.x)];
        }
    }]);

    return Line;
}();

/** 
 * A static class containing helper functions for math-related tasks. 
 */
SmilesDrawer.MathHelper = function () {
    function MathHelper() {
        _classCallCheck(this, MathHelper);
    }

    _createClass(MathHelper, null, [{
        key: 'round',

        /**
         * Rounds a value to a given number of decimals.
         *
         * @static
         * @param {Number} value A number.
         * @param {Number} decimals The number of decimals.
         * @returns {Number} A number rounded to a given number of decimals.
         */
        value: function round(value, decimals) {
            decimals = decimals ? decimals : 1;
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

        /**
         * Returns the means of the angles contained in an array. In radians.
         *
         * @static
         * @param {Number[]} arr An array containing angles (in radians).
         * @returns {Number} The mean angle in radians.
         */

    }, {
        key: 'meanAngle',
        value: function meanAngle(arr) {
            var sin = 0.0;
            var cos = 0.0;

            for (var i = 0; i < arr.length; i++) {
                sin += Math.sin(arr[i]);
                cos += Math.cos(arr[i]);
            }

            return Math.atan2(sin / arr.length, cos / arr.length);
        }

        /**
         * Returns the inner angle of a n-sided regular polygon.
         *
         * @static
         * @param {Number} n Number of sides of a regular polygon.
         * @returns {Number} The inner angle of a given regular polygon.
         */

    }, {
        key: 'innerAngle',
        value: function innerAngle(n) {
            return SmilesDrawer.MathHelper.toRad((n - 2) * 180 / n);
        }

        /**
         * Returns the circumradius of a n-sided regular polygon with a given side-length.
         *
         * @static
         * @param {Number} s The side length of the regular polygon.
         * @param {Number} n The number of sides.
         * @returns {Number} The circumradius of the regular polygon.
         */

    }, {
        key: 'polyCircumradius',
        value: function polyCircumradius(s, n) {
            return s / (2 * Math.sin(Math.PI / n));
        }

        /**
         * Returns the apothem of a regular n-sided polygon based on its radius.
         *
         * @static
         * @param {Number} r The radius.
         * @param {Number} n The number of edges of the regular polygon.
         * @returns {Number} The apothem of a n-sided polygon based on its radius.
         */

    }, {
        key: 'apothem',
        value: function apothem(r, n) {
            return r * Math.cos(Math.PI / n);
        }
    }, {
        key: 'apothemFromSideLength',
        value: function apothemFromSideLength(s, n) {
            var r = SmilesDrawer.MathHelper.polyCircumradius(s, n);

            return SmilesDrawer.MathHelper.apothem(r, n);
        }

        /**
         * The central angle of a n-sided regular polygon. In radians.
         *
         * @static
         * @param {Number} n The number of sides of the regular polygon.
         * @returns {Number} The central angle of the n-sided polygon in radians.
         */

    }, {
        key: 'centralAngle',
        value: function centralAngle(n) {
            return SmilesDrawer.MathHelper.toRad(360 / n);
        }

        /**
         * Convertes radians to degrees.
         *
         * @static
         * @param {Number} rad An angle in radians.
         * @returns {Number} The angle in degrees.
         */

    }, {
        key: 'toDeg',
        value: function toDeg(rad) {
            return rad * SmilesDrawer.MathHelper.degFactor;
        }

        /**
         * Converts degrees to radians.
         *
         * @static
         * @param {Number} deg An angle in degrees.
         * @returns {Number} The angle in radians.
         */

    }, {
        key: 'toRad',
        value: function toRad(deg) {
            return deg * SmilesDrawer.MathHelper.radFactor;
        }
    }]);

    return MathHelper;
}();

/** The factor to convert degrees to radians. */
SmilesDrawer.MathHelper.radFactor = Math.PI / 180;

/** The factor to convert radians to degrees. */
SmilesDrawer.MathHelper.degFactor = 180 / Math.PI;

/** Two times PI. */
SmilesDrawer.MathHelper.twoPI = 2 * Math.PI;
SmilesDrawer.Parser = function () {
    "use strict";

    /*
     * Generated by PEG.js 0.9.0.
     *
     * http://pegjs.org/
     */

    function peg$subclass(child, parent) {
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
    }

    function peg$SyntaxError(message, expected, found, location) {
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, peg$SyntaxError);
        }
    }

    peg$subclass(peg$SyntaxError, Error);

    function peg$parse(input) {
        var options = arguments.length > 1 ? arguments[1] : {},
            parser = this,
            peg$FAILED = {},
            peg$startRuleFunctions = {
            chain: peg$parsechain
        },
            peg$startRuleFunction = peg$parsechain,
            peg$c0 = function peg$c0(s) {
            var branches = [];
            var rings = [];

            for (var i = 0; i < s[1].length; i++) {
                branches.push(s[1][i]);
            }

            for (var i = 0; i < s[2].length; i++) {
                var bond = s[2][i][0] ? s[2][i][0] : '-';
                rings.push({
                    'bond': bond,
                    'id': s[2][i][1]
                });
            }

            for (var i = 0; i < s[3].length; i++) {
                branches.push(s[3][i]);
            }

            for (var i = 0; i < s[6].length; i++) {
                branches.push(s[6][i]);
            }

            return {
                'atom': s[0],
                'isBracket': s[0].element ? true : false,
                'branches': branches,
                'branchCount': branches.length,
                'ringbonds': rings,
                'ringbondCount': rings.length,
                'bond': s[4] ? s[4] : '-',
                'next': s[5],
                'hasNext': s[5] ? true : false
            };

            return s;
        },
            peg$c1 = "(",
            peg$c2 = {
            type: "literal",
            value: "(",
            description: "\"(\""
        },
            peg$c3 = ")",
            peg$c4 = {
            type: "literal",
            value: ")",
            description: "\")\""
        },
            peg$c5 = function peg$c5(b) {
            var bond = b[1] ? b[1] : '-';
            b[2].branchBond = bond;
            return b[2];
        },
            peg$c6 = function peg$c6(a) {
            return a;
        },
            peg$c7 = /^[\-=#$:\/\\.]/,
            peg$c8 = {
            type: "class",
            value: "[-=#$:/\\\\.]",
            description: "[-=#$:/\\\\.]"
        },
            peg$c9 = function peg$c9(b) {
            return b;
        },
            peg$c10 = "[",
            peg$c11 = {
            type: "literal",
            value: "[",
            description: "\"[\""
        },
            peg$c12 = "se",
            peg$c13 = {
            type: "literal",
            value: "se",
            description: "\"se\""
        },
            peg$c14 = "as",
            peg$c15 = {
            type: "literal",
            value: "as",
            description: "\"as\""
        },
            peg$c16 = "]",
            peg$c17 = {
            type: "literal",
            value: "]",
            description: "\"]\""
        },
            peg$c18 = function peg$c18(b) {
            return {
                'isotope': b[1],
                'element': b[2],
                'chirality': b[3],
                'hcount': b[4],
                'charge': b[5],
                'class': b[6]
            };
        },
            peg$c19 = "B",
            peg$c20 = {
            type: "literal",
            value: "B",
            description: "\"B\""
        },
            peg$c21 = "r",
            peg$c22 = {
            type: "literal",
            value: "r",
            description: "\"r\""
        },
            peg$c23 = "C",
            peg$c24 = {
            type: "literal",
            value: "C",
            description: "\"C\""
        },
            peg$c25 = "l",
            peg$c26 = {
            type: "literal",
            value: "l",
            description: "\"l\""
        },
            peg$c27 = /^[NOPSFI]/,
            peg$c28 = {
            type: "class",
            value: "[NOPSFI]",
            description: "[NOPSFI]"
        },
            peg$c29 = function peg$c29(o) {
            if (o.length > 1) return o.join('');
            return o;
        },
            peg$c30 = /^[bcnops]/,
            peg$c31 = {
            type: "class",
            value: "[bcnops]",
            description: "[bcnops]"
        },
            peg$c32 = "*",
            peg$c33 = {
            type: "literal",
            value: "*",
            description: "\"*\""
        },
            peg$c34 = function peg$c34(w) {
            return w;
        },
            peg$c35 = /^[A-Z]/,
            peg$c36 = {
            type: "class",
            value: "[A-Z]",
            description: "[A-Z]"
        },
            peg$c37 = /^[a-z]/,
            peg$c38 = {
            type: "class",
            value: "[a-z]",
            description: "[a-z]"
        },
            peg$c39 = function peg$c39(e) {
            return e.join('');
        },
            peg$c40 = "%",
            peg$c41 = {
            type: "literal",
            value: "%",
            description: "\"%\""
        },
            peg$c42 = /^[1-9]/,
            peg$c43 = {
            type: "class",
            value: "[1-9]",
            description: "[1-9]"
        },
            peg$c44 = /^[0-9]/,
            peg$c45 = {
            type: "class",
            value: "[0-9]",
            description: "[0-9]"
        },
            peg$c46 = function peg$c46(r) {
            if (r.length == 1) return Number(r);
            return Number(r.join('').replace('%', ''));
        },
            peg$c47 = "@",
            peg$c48 = {
            type: "literal",
            value: "@",
            description: "\"@\""
        },
            peg$c49 = "TH",
            peg$c50 = {
            type: "literal",
            value: "TH",
            description: "\"TH\""
        },
            peg$c51 = /^[12]/,
            peg$c52 = {
            type: "class",
            value: "[12]",
            description: "[12]"
        },
            peg$c53 = "AL",
            peg$c54 = {
            type: "literal",
            value: "AL",
            description: "\"AL\""
        },
            peg$c55 = "SP",
            peg$c56 = {
            type: "literal",
            value: "SP",
            description: "\"SP\""
        },
            peg$c57 = /^[1-3]/,
            peg$c58 = {
            type: "class",
            value: "[1-3]",
            description: "[1-3]"
        },
            peg$c59 = "TB",
            peg$c60 = {
            type: "literal",
            value: "TB",
            description: "\"TB\""
        },
            peg$c61 = "OH",
            peg$c62 = {
            type: "literal",
            value: "OH",
            description: "\"OH\""
        },
            peg$c63 = function peg$c63(c) {
            if (!c[1]) return '@';
            if (c[1] == '@') return '@@';

            return c[1].join('').replace(',', '');
        },
            peg$c64 = function peg$c64(c) {
            return c;
        },
            peg$c65 = "+",
            peg$c66 = {
            type: "literal",
            value: "+",
            description: "\"+\""
        },
            peg$c67 = function peg$c67(c) {
            if (!c[1]) return 1;
            if (c[1] != '+') return Number(c[1].join(''));
            return 2;
        },
            peg$c68 = "-",
            peg$c69 = {
            type: "literal",
            value: "-",
            description: "\"-\""
        },
            peg$c70 = function peg$c70(c) {
            if (!c[1]) return -1;
            if (c[1] != '-') return -Number(c[1].join(''));
            return -2;
        },
            peg$c71 = "H",
            peg$c72 = {
            type: "literal",
            value: "H",
            description: "\"H\""
        },
            peg$c73 = function peg$c73(h) {
            if (h[1]) return Number(h[1]);
            return 1;
        },
            peg$c74 = ":",
            peg$c75 = {
            type: "literal",
            value: ":",
            description: "\":\""
        },
            peg$c76 = /^[0]/,
            peg$c77 = {
            type: "class",
            value: "[0]",
            description: "[0]"
        },
            peg$c78 = function peg$c78(c) {
            return Number(c[1][0] + c[1][1].join(''));
        },
            peg$c79 = function peg$c79(i) {
            return Number(i.join(''));
        },
            peg$currPos = 0,
            peg$savedPos = 0,
            peg$posDetailsCache = [{
            line: 1,
            column: 1,
            seenCR: false
        }],
            peg$maxFailPos = 0,
            peg$maxFailExpected = [],
            peg$silentFails = 0,
            peg$result;

        if ("startRule" in options) {
            if (!(options.startRule in peg$startRuleFunctions)) {
                throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
            }

            peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }

        function text() {
            return input.substring(peg$savedPos, peg$currPos);
        }

        function location() {
            return peg$computeLocation(peg$savedPos, peg$currPos);
        }

        function expected(description) {
            throw peg$buildException(null, [{
                type: "other",
                description: description
            }], input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
        }

        function error(message) {
            throw peg$buildException(message, null, input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
        }

        function peg$computePosDetails(pos) {
            var details = peg$posDetailsCache[pos],
                p,
                ch;

            if (details) {
                return details;
            } else {
                p = pos - 1;
                while (!peg$posDetailsCache[p]) {
                    p--;
                }

                details = peg$posDetailsCache[p];
                details = {
                    line: details.line,
                    column: details.column,
                    seenCR: details.seenCR
                };

                while (p < pos) {
                    ch = input.charAt(p);
                    if (ch === "\n") {
                        if (!details.seenCR) {
                            details.line++;
                        }
                        details.column = 1;
                        details.seenCR = false;
                    } else if (ch === "\r" || ch === '\u2028' || ch === '\u2029') {
                        details.line++;
                        details.column = 1;
                        details.seenCR = true;
                    } else {
                        details.column++;
                        details.seenCR = false;
                    }

                    p++;
                }

                peg$posDetailsCache[pos] = details;
                return details;
            }
        }

        function peg$computeLocation(startPos, endPos) {
            var startPosDetails = peg$computePosDetails(startPos),
                endPosDetails = peg$computePosDetails(endPos);

            return {
                start: {
                    offset: startPos,
                    line: startPosDetails.line,
                    column: startPosDetails.column
                },
                end: {
                    offset: endPos,
                    line: endPosDetails.line,
                    column: endPosDetails.column
                }
            };
        }

        function peg$fail(expected) {
            if (peg$currPos < peg$maxFailPos) {
                return;
            }

            if (peg$currPos > peg$maxFailPos) {
                peg$maxFailPos = peg$currPos;
                peg$maxFailExpected = [];
            }

            peg$maxFailExpected.push(expected);
        }

        function peg$buildException(message, expected, found, location) {
            function cleanupExpected(expected) {
                var i = 1;

                expected.sort(function (a, b) {
                    if (a.description < b.description) {
                        return -1;
                    } else if (a.description > b.description) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                while (i < expected.length) {
                    if (expected[i - 1] === expected[i]) {
                        expected.splice(i, 1);
                    } else {
                        i++;
                    }
                }
            }

            function buildMessage(expected, found) {
                function stringEscape(s) {
                    function hex(ch) {
                        return ch.charCodeAt(0).toString(16).toUpperCase();
                    }

                    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
                        return '\\x0' + hex(ch);
                    }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
                        return '\\x' + hex(ch);
                    }).replace(/[\u0100-\u0FFF]/g, function (ch) {
                        return '\\u0' + hex(ch);
                    }).replace(/[\u1000-\uFFFF]/g, function (ch) {
                        return '\\u' + hex(ch);
                    });
                }

                var expectedDescs = new Array(expected.length),
                    expectedDesc,
                    foundDesc,
                    i;

                for (i = 0; i < expected.length; i++) {
                    expectedDescs[i] = expected[i].description;
                }

                expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

                foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

                return "Expected " + expectedDesc + " but " + foundDesc + " found.";
            }

            if (expected !== null) {
                cleanupExpected(expected);
            }

            return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
        }

        function peg$parsechain() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = peg$parseatom();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsebranch();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsebranch();
                }
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$currPos;
                    s6 = peg$parsebond();
                    if (s6 === peg$FAILED) {
                        s6 = null;
                    }
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parsering();
                        if (s7 !== peg$FAILED) {
                            s6 = [s6, s7];
                            s5 = s6;
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$currPos;
                        s6 = peg$parsebond();
                        if (s6 === peg$FAILED) {
                            s6 = null;
                        }
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parsering();
                            if (s7 !== peg$FAILED) {
                                s6 = [s6, s7];
                                s5 = s6;
                            } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = [];
                        s6 = peg$parsebranch();
                        while (s6 !== peg$FAILED) {
                            s5.push(s6);
                            s6 = peg$parsebranch();
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsebond();
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsechain();
                                if (s7 === peg$FAILED) {
                                    s7 = null;
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = [];
                                    s9 = peg$parsebranch();
                                    while (s9 !== peg$FAILED) {
                                        s8.push(s9);
                                        s9 = peg$parsebranch();
                                    }
                                    if (s8 !== peg$FAILED) {
                                        s2 = [s2, s3, s4, s5, s6, s7, s8];
                                        s1 = s2;
                                    } else {
                                        peg$currPos = s1;
                                        s1 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s1;
                                    s1 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s1;
                                s1 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s1;
                            s1 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c0(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsebranch() {
            var s0, s1, s2, s3, s4, s5;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 40) {
                s2 = peg$c1;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c2);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsebond();
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsechain();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                            s5 = peg$c3;
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c4);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s2 = [s2, s3, s4, s5];
                            s1 = s2;
                        } else {
                            peg$currPos = s1;
                            s1 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c5(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseatom() {
            var s0, s1;

            s0 = peg$currPos;
            s1 = peg$parseorganicsymbol();
            if (s1 === peg$FAILED) {
                s1 = peg$parsearomaticsymbol();
                if (s1 === peg$FAILED) {
                    s1 = peg$parsebracketatom();
                    if (s1 === peg$FAILED) {
                        s1 = peg$parsewildcard();
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c6(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsebond() {
            var s0, s1;

            s0 = peg$currPos;
            if (peg$c7.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c9(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsebracketatom() {
            var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 91) {
                s2 = peg$c10;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c11);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseisotope();
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c12) {
                        s4 = peg$c12;
                        peg$currPos += 2;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c13);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c14) {
                            s4 = peg$c14;
                            peg$currPos += 2;
                        } else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c15);
                            }
                        }
                        if (s4 === peg$FAILED) {
                            s4 = peg$parsearomaticsymbol();
                            if (s4 === peg$FAILED) {
                                s4 = peg$parseelementsymbol();
                                if (s4 === peg$FAILED) {
                                    s4 = peg$parsewildcard();
                                }
                            }
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsechiral();
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsehcount();
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parsecharge();
                                if (s7 === peg$FAILED) {
                                    s7 = null;
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parseclass();
                                    if (s8 === peg$FAILED) {
                                        s8 = null;
                                    }
                                    if (s8 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 93) {
                                            s9 = peg$c16;
                                            peg$currPos++;
                                        } else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c17);
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s2 = [s2, s3, s4, s5, s6, s7, s8, s9];
                                            s1 = s2;
                                        } else {
                                            peg$currPos = s1;
                                            s1 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s1;
                                        s1 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s1;
                                    s1 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s1;
                                s1 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s1;
                            s1 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c18(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseorganicsymbol() {
            var s0, s1, s2, s3;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 66) {
                s2 = peg$c19;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c20);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 114) {
                    s3 = peg$c21;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c22);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 === peg$FAILED) {
                s1 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 67) {
                    s2 = peg$c23;
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c24);
                    }
                }
                if (s2 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 108) {
                        s3 = peg$c25;
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c26);
                        }
                    }
                    if (s3 === peg$FAILED) {
                        s3 = null;
                    }
                    if (s3 !== peg$FAILED) {
                        s2 = [s2, s3];
                        s1 = s2;
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
                if (s1 === peg$FAILED) {
                    if (peg$c27.test(input.charAt(peg$currPos))) {
                        s1 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c28);
                        }
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c29(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsearomaticsymbol() {
            var s0, s1;

            s0 = peg$currPos;
            if (peg$c30.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c31);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c6(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsewildcard() {
            var s0, s1;

            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 42) {
                s1 = peg$c32;
                peg$currPos++;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c33);
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c34(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseelementsymbol() {
            var s0, s1, s2, s3;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (peg$c35.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c36);
                }
            }
            if (s2 !== peg$FAILED) {
                if (peg$c37.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c38);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c39(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsering() {
            var s0, s1, s2, s3, s4;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 37) {
                s2 = peg$c40;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c41);
                }
            }
            if (s2 !== peg$FAILED) {
                if (peg$c42.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                    }
                }
                if (s3 !== peg$FAILED) {
                    if (peg$c44.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c45);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s2 = [s2, s3, s4];
                        s1 = s2;
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 === peg$FAILED) {
                if (peg$c44.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c46(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsechiral() {
            var s0, s1, s2, s3, s4, s5, s6;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 64) {
                s2 = peg$c47;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c48);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 64) {
                    s3 = peg$c47;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c48);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c49) {
                        s4 = peg$c49;
                        peg$currPos += 2;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c50);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        if (peg$c51.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c52);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                    if (s3 === peg$FAILED) {
                        s3 = peg$currPos;
                        if (input.substr(peg$currPos, 2) === peg$c53) {
                            s4 = peg$c53;
                            peg$currPos += 2;
                        } else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c54);
                            }
                        }
                        if (s4 !== peg$FAILED) {
                            if (peg$c51.test(input.charAt(peg$currPos))) {
                                s5 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else {
                                s5 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c52);
                                }
                            }
                            if (s5 !== peg$FAILED) {
                                s4 = [s4, s5];
                                s3 = s4;
                            } else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                        if (s3 === peg$FAILED) {
                            s3 = peg$currPos;
                            if (input.substr(peg$currPos, 2) === peg$c55) {
                                s4 = peg$c55;
                                peg$currPos += 2;
                            } else {
                                s4 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c56);
                                }
                            }
                            if (s4 !== peg$FAILED) {
                                if (peg$c57.test(input.charAt(peg$currPos))) {
                                    s5 = input.charAt(peg$currPos);
                                    peg$currPos++;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c58);
                                    }
                                }
                                if (s5 !== peg$FAILED) {
                                    s4 = [s4, s5];
                                    s3 = s4;
                                } else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                            if (s3 === peg$FAILED) {
                                s3 = peg$currPos;
                                if (input.substr(peg$currPos, 2) === peg$c59) {
                                    s4 = peg$c59;
                                    peg$currPos += 2;
                                } else {
                                    s4 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c60);
                                    }
                                }
                                if (s4 !== peg$FAILED) {
                                    if (peg$c42.test(input.charAt(peg$currPos))) {
                                        s5 = input.charAt(peg$currPos);
                                        peg$currPos++;
                                    } else {
                                        s5 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c43);
                                        }
                                    }
                                    if (s5 !== peg$FAILED) {
                                        if (peg$c44.test(input.charAt(peg$currPos))) {
                                            s6 = input.charAt(peg$currPos);
                                            peg$currPos++;
                                        } else {
                                            s6 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c45);
                                            }
                                        }
                                        if (s6 === peg$FAILED) {
                                            s6 = null;
                                        }
                                        if (s6 !== peg$FAILED) {
                                            s4 = [s4, s5, s6];
                                            s3 = s4;
                                        } else {
                                            peg$currPos = s3;
                                            s3 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s3;
                                        s3 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                                if (s3 === peg$FAILED) {
                                    s3 = peg$currPos;
                                    if (input.substr(peg$currPos, 2) === peg$c61) {
                                        s4 = peg$c61;
                                        peg$currPos += 2;
                                    } else {
                                        s4 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c62);
                                        }
                                    }
                                    if (s4 !== peg$FAILED) {
                                        if (peg$c42.test(input.charAt(peg$currPos))) {
                                            s5 = input.charAt(peg$currPos);
                                            peg$currPos++;
                                        } else {
                                            s5 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c43);
                                            }
                                        }
                                        if (s5 !== peg$FAILED) {
                                            if (peg$c44.test(input.charAt(peg$currPos))) {
                                                s6 = input.charAt(peg$currPos);
                                                peg$currPos++;
                                            } else {
                                                s6 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c45);
                                                }
                                            }
                                            if (s6 === peg$FAILED) {
                                                s6 = null;
                                            }
                                            if (s6 !== peg$FAILED) {
                                                s4 = [s4, s5, s6];
                                                s3 = s4;
                                            } else {
                                                peg$currPos = s3;
                                                s3 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s3;
                                            s3 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s3;
                                        s3 = peg$FAILED;
                                    }
                                }
                            }
                        }
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c63(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsecharge() {
            var s0, s1;

            s0 = peg$currPos;
            s1 = peg$parseposcharge();
            if (s1 === peg$FAILED) {
                s1 = peg$parsenegcharge();
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c64(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseposcharge() {
            var s0, s1, s2, s3, s4, s5;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 43) {
                s2 = peg$c65;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c66);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 43) {
                    s3 = peg$c65;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c66);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    if (peg$c42.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c43);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        if (peg$c44.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c45);
                            }
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c67(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsenegcharge() {
            var s0, s1, s2, s3, s4, s5;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 45) {
                s2 = peg$c68;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c69);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 45) {
                    s3 = peg$c68;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c69);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    if (peg$c42.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c43);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        if (peg$c44.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c45);
                            }
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c70(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsehcount() {
            var s0, s1, s2, s3;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 72) {
                s2 = peg$c71;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c72);
                }
            }
            if (s2 !== peg$FAILED) {
                if (peg$c44.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c73(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseclass() {
            var s0, s1, s2, s3, s4, s5, s6;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 58) {
                s2 = peg$c74;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c75);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                if (peg$c42.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                    }
                }
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    if (peg$c44.test(input.charAt(peg$currPos))) {
                        s6 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s6 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c45);
                        }
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        if (peg$c44.test(input.charAt(peg$currPos))) {
                            s6 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s6 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c45);
                            }
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    if (peg$c76.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c77);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c78(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseisotope() {
            var s0, s1, s2, s3, s4;

            s0 = peg$currPos;
            s1 = peg$currPos;
            if (peg$c42.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c43);
                }
            }
            if (s2 !== peg$FAILED) {
                if (peg$c44.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    if (peg$c44.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c45);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s2 = [s2, s3, s4];
                        s1 = s2;
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c79(s1);
            }
            s0 = s1;

            return s0;
        }

        peg$result = peg$startRuleFunction();

        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
            return peg$result;
        } else {
            if (peg$result !== peg$FAILED && peg$currPos < input.length) {
                peg$fail({
                    type: "end",
                    description: "end of input"
                });
            }

            throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
        }
    }

    return {
        SyntaxError: peg$SyntaxError,
        parse: peg$parse
    };
}();
/** 
 * A class representing a ring.
 * 
 * @property {Number} id The id of this ring.
 * @property {Number[]} members An array containing the vertex ids of the ring members.
 * @property {Number[]} edges An array containing the edge ids of the edges between the ring members.
 * @property {Number[]} insiders An array containing the vertex ids of the vertices contained within the ring if it is a bridged ring.
 * @property {Number[]} neighbours An array containing the ids of neighbouring rings.
 * @property {Boolean} positioned A boolean indicating whether or not this ring has been positioned.
 * @property {SmilesDrawer.Vector2} center The center of this ring.
 * @property {SmilesDrawer.Ring[]} rings The rings contained within this ring if this ring is bridged.
 * @property {Boolean} isBridged A boolean whether or not this ring is bridged.
 * @property {Boolean} isSpiro A boolean whether or not this ring is part of a spiro.
 * @property {Boolean} isFused A boolean whether or not this ring is part of a fused ring.
 * @property {Number} centralAngle The central angle of this ring.
 * @property {Boolean} canFlip A boolean indicating whether or not this ring allows flipping of attached vertices to the inside of the ring.
 */
SmilesDrawer.Ring = function () {
    /**
     * The constructor for the class Ring.
     *
     * @param {Number[]} members An array containing the vertex ids of the members of the ring to be created.
     */
    function Ring(members) {
        _classCallCheck(this, Ring);

        this.id = null;
        this.members = members;
        this.edges = [];
        this.insiders = [];
        this.neighbours = [];
        this.positioned = false;
        this.center = new SmilesDrawer.Vector2();
        this.rings = [];
        this.isBridged = false;
        this.isSpiro = false;
        this.isFused = false;
        this.centralAngle = 0.0;
        this.canFlip = true;
    }

    /**
     * Clones this ring and returns the clone.
     *
     * @returns {SmilesDrawer.Ring} A clone of this ring.
     */


    _createClass(Ring, [{
        key: 'clone',
        value: function clone() {
            var clone = new Ring(this.members);

            clone.id = this.id;
            clone.insiders = SmilesDrawer.ArrayHelper.clone(this.insiders);
            clone.neighbours = SmilesDrawer.ArrayHelper.clone(this.neighbours);
            clone.positioned = this.positioned;
            clone.center = this.center.clone();
            clone.rings = SmilesDrawer.ArrayHelper.clone(this.rings);
            clone.isBridged = this.isBridged;
            clone.isSpiro = this.isSpiro;
            clone.isFused = this.isFused;
            clone.centralAngle = this.centralAngle;
            clone.canFlip = this.canFlip;

            return clone;
        }

        /**
         * Returns a boolean indicating whether or not this ring is allowed to flip attached vertices (atoms) to the inside of the ring. Is only allowed for rings with more than 4 members. Can be disabling by setting the canFlip property of the ring to false.
         *
         * @returns {Boolean} Returns a boolean indicating whether or not vertices (atoms) attached to this ring can be flipped to the inside of the ring.
         */

    }, {
        key: 'allowsFlip',
        value: function allowsFlip() {
            return this.canFlip && this.members.length > 4;
        }

        /**
         * Sets the canFlip property of this ring to false if the ring has less than 8 members. If the ring has more than 8 members, the value of canFlip is not changed.
         */

    }, {
        key: 'setFlipped',
        value: function setFlipped() {
            if (this.members.length < 8) {
                this.canFlip = false;
            }
        }

        /**
         * Returns the size (number of members) of this ring.
         *
         * @returns {Number} The size (number of members) of this ring.
         */

    }, {
        key: 'getSize',
        value: function getSize() {
            return this.members.length;
        }

        /**
         * Gets the polygon representation (an array of the ring-members positional vectors) of this ring.
         *
         * @param {SmilesDrawer.Vertex[]} vertices An array of vertices representing the current molecule.
         * @returns {SmilesDrawer.Vector2[]} An array of the positional vectors of the ring members.
         */

    }, {
        key: 'getPolygon',
        value: function getPolygon(vertices) {
            var polygon = [];

            for (var i = 0; i < this.members.length; i++) {
                polygon.push(vertices[this.members[i]].position);
            }

            return polygon;
        }

        /**
         * Returns the angle of this ring in relation to the coordinate system.
         *
         * @returns {Number} The angle in radians.
         */

    }, {
        key: 'getAngle',
        value: function getAngle() {
            return Math.PI - this.centralAngle;
        }

        /**
         * Loops over the members of this ring from a given start position in a direction opposite to the vertex id passed as the previousId.
         *
         * @param {SmilesDrawer.Vertex[]} vertices The vertices associated with the current molecule.
         * @param {Function} callback A callback with the current vertex id as a parameter.
         * @param {Number} startVertexId The vertex id of the start vertex.
         * @param {Number} previousVertexId The vertex id of the previous vertex (the loop calling the callback function will run in the opposite direction of this vertex).
         */

    }, {
        key: 'eachMember',
        value: function eachMember(vertices, callback, startVertexId, previousVertexId) {
            startVertexId = startVertexId || startVertexId === 0 ? startVertexId : this.members[0];
            var current = startVertexId;
            var max = 0;

            while (current != null && max < 100) {
                var prev = current;

                callback(prev);
                current = vertices[current].getNextInRing(vertices, this.id, previousVertexId);
                previousVertexId = prev;

                // Stop while loop when arriving back at the start vertex
                if (current == startVertexId) {
                    current = null;
                }

                // Currently, there can be rings where the start vertex is never
                // reached again (bridged rings)
                if (max == 99) {
                    console.log('Smiles-drawer was not able to loop over the members of this ring.', this);
                    throw 'Smiles-drawer was not able to loop over the members of this ring.';
                }

                max++;
            }
        }

        /**
         * Returns an array containing the neighbouring rings of this ring ordered by ring size.
         *
         * @param {SmilesDrawer.RingConnection[]} ringConnections An array of ring connections associated with the current molecule.
         * @returns {Object[]} An array of neighbouring rings sorted by ring size. Example: { n: 5, neighbour: 1 }.
         */

    }, {
        key: 'getOrderedNeighbours',
        value: function getOrderedNeighbours(ringConnections) {
            var orderedNeighbours = [];

            for (var i = 0; i < this.neighbours.length; i++) {
                var vertices = SmilesDrawer.RingConnection.getVertices(ringConnections, this.id, this.neighbours[i]);

                orderedNeighbours.push({
                    n: vertices.size,
                    neighbour: this.neighbours[i]
                });
            }

            orderedNeighbours.sort(function (a, b) {
                // Sort highest to lowest
                return b.n - a.n;
            });

            return orderedNeighbours;
        }

        /**
         * Check whether this ring is an implicitly defined benzene-like (e.g. C1=CC=CC=C1) with 6 members and 3 double bonds.
         *
         * @param {SmilesDrawer.Vertex[]} vertices An array of vertices associated with the current molecule.
         * @returns {Boolean} A boolean indicating whether or not this ring is an implicitly defined benzene-like.
         */

    }, {
        key: 'isBenzeneLike',
        value: function isBenzeneLike(vertices) {
            var db = this.getDoubleBondCount(vertices);
            var length = this.members.length;

            return db === 3 && length === 6 || db === 2 && length === 5;
        }

        /**
         * Get the number of double bonds inside this ring.
         *
         * @param {SmilesDrawer.Vertex[]} vertices An array of vertices associated with the current molecule.
         * @returns {Number} The number of double bonds inside this ring.
         */

    }, {
        key: 'getDoubleBondCount',
        value: function getDoubleBondCount(vertices) {
            var doubleBondCount = 0;

            for (var i = 0; i < this.members.length; i++) {
                var atom = vertices[this.members[i]].value;

                if (atom.bondType === '=' || atom.branchBond === '=') {
                    doubleBondCount++;
                }
            }

            return doubleBondCount;
        }

        /**
         * Checks whether or not this ring contains a member with a given vertex id.
         *
         * @param {Number} vertexId A vertex id.
         * @returns {Boolean} A boolean indicating whether or not this ring contains a member with the given vertex id.
         */

    }, {
        key: 'contains',
        value: function contains(vertexId) {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i] == vertexId) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Checks whether or not this ring or one of its neighbouring rings contains a member with a given vertex id.
         *
         * @param {SmilesDrawer.Ring[]} rings An array of rings associated with this molecule.
         * @param {Number} vertexId A vertex id.
         * @returns {Boolean} A boolean indicating whether or not this ring or one of its neighbouring rings contains a emember with the given vertex id.
         */

    }, {
        key: 'thisOrNeighboursContain',
        value: function thisOrNeighboursContain(rings, vertexId) {
            for (var i = 0; i < this.neighbours.length; i++) {
                if (Ring.getRing(rings, this.neighbours[i]).contains(vertexId)) {
                    return true;
                }
            }

            if (this.contains(vertexId)) {
                return true;
            }

            return false;
        }

        /**
         * Returns a ring based on a provided ring id.
         *
         * @param {SmilesDrawer.Ring[]} rings An array of rings associated with the current molecule.
         * @param {Number} id A ring id.
         * @returns {SmilesDrawer.Ring} A ring with a given id.
         */

    }], [{
        key: 'getRing',
        value: function getRing(rings, id) {
            for (var i = 0; i < rings.length; i++) {
                if (rings[i].id == id) {
                    return rings[i];
                }
            }
        }
    }]);

    return Ring;
}();

/** 
 * A class representing a ring connection.
 * 
 * @property {Number} id The id of this ring connection.
 * @property {Number} firstRingId A ring id.
 * @property {Number} secondRingId A ring id.
 * @property {Set<Number>} vertices A set containing the vertex ids participating in the ring connection.
 */
SmilesDrawer.RingConnection = function () {
    /**
     * The constructor for the class RingConnection.
     *
     * @param {SmilesDrawer.Ring} firstRing A ring.
     * @param {SmilesDrawer.Ring} secondRing A ring.
     */
    function RingConnection(firstRing, secondRing) {
        _classCallCheck(this, RingConnection);

        this.id = null;
        this.firstRingId = firstRing.id;
        this.secondRingId = secondRing.id;
        this.vertices = new Set();

        for (var m = 0; m < firstRing.members.length; m++) {
            var c = firstRing.members[m];

            for (var n = 0; n < secondRing.members.length; n++) {
                var d = secondRing.members[n];

                if (c === d) {
                    this.addVertex(c);
                }
            }
        }
    }

    /**
     * Adding a vertex to the ring connection.
     *
     * @param {Number} vertexId A vertex id.
     */


    _createClass(RingConnection, [{
        key: 'addVertex',
        value: function addVertex(vertexId) {
            this.vertices.add(vertexId);
        }

        /**
         * Checks whether or not this ring connection is a bridge in a bridged ring.
         *
         * @param {SmilesDrawer.Vertex[]}. vertices The array of vertices associated with the current molecule.
         * @returns {Boolean} A boolean indicating whether or not this ring connection is a bridge.
         */

    }, {
        key: 'isBridge',
        value: function isBridge(vertices) {
            if (this.vertices.size > 2) {
                return true;
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.vertices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var vertexId = _step.value;

                    if (vertices[vertexId].value.rings.length > 2) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return false;
        }

        /**
         * Update the ring id of this ring connection that is not the ring id supplied as the second argument.
         *
         * @param {Number} ringId A ring id. The new ring id to be set.
         * @param {Number} otherRingId A ring id. The id that is NOT to be updated.
         */

    }, {
        key: 'updateOther',
        value: function updateOther(ringId, otherRingId) {
            if (this.firstRingId === otherRingId) {
                this.secondRingId = ringId;
            } else {
                this.firstRingId = ringId;
            }
        }

        /**
         * Returns a boolean indicating whether or not a ring with a given id is participating in this ring connection.
         * 
         * @param {Number} ringId A ring id.
         * @returns {Boolean} A boolean indicating whether or not a ring with a given id participates in this ring connection.
         */

    }, {
        key: 'containsRing',
        value: function containsRing(ringId) {
            return this.firstRingId === ringId || this.secondRingId === ringId;
        }

        /**
         * Checks whether or not two rings are connected by a bridged bond.
         *
         * @static
         * @param {SmilesDrawer.RingConnection[]} ringConnections An array of ring connections containing the ring connections associated with the current molecule.
         * @param {SmilesDrawer.Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
         * @param {Number} firstRingId A ring id.
         * @param {Nmber} secondRingId A ring id.
         * @returns {Boolean} A boolean indicating whether or not two rings ar connected by a bridged bond.
         */

    }], [{
        key: 'isBridge',
        value: function isBridge(ringConnections, vertices, firstRingId, secondRingId) {
            var ringConnection = null;

            for (var i = 0; i < ringConnections.length; i++) {
                ringConnection = ringConnections[i];

                if (ringConnection.firstRingId === firstRingId && ringConnection.secondRingId === secondRingId || ringConnection.firstRingId === secondRingId && ringConnection.secondRingId === firstRingId) {
                    return ringConnection.isBridge(vertices);
                }
            }

            return false;
        }

        /**
         * Retruns the neighbouring rings of a given ring.
         *
         * @static
         * @param {SmilesDrawer.RingConnection[]} ringConnections An array of ring connections containing ring connections associated with the current molecule.
         * @param {Number} ringId A ring id.
         * @returns {Number[]} An array of ring ids of neighbouring rings.
         */

    }, {
        key: 'getNeighbours',
        value: function getNeighbours(ringConnections, ringId) {
            var neighbours = [];

            for (var i = 0; i < ringConnections.length; i++) {
                var ringConnection = ringConnections[i];

                if (ringConnection.firstRingId === ringId) {
                    neighbours.push(ringConnection.secondRingId);
                } else if (ringConnection.secondRingId === ringId) {
                    neighbours.push(ringConnection.firstRingId);
                }
            }

            return neighbours;
        }

        /**
         * Returns an array of vertex ids associated with a given ring connection.
         *
         * @static
         * @param {SmilesDrawer.RingConnection[]} ringConnections An array of ring connections containing ring connections associated with the current molecule.
         * @param {Number} firstRingId A ring id.
         * @param {Number} secondRingId A ring id.
         * @returns {Number[]} An array of vertex ids associated with the ring connection.
         */

    }, {
        key: 'getVertices',
        value: function getVertices(ringConnections, firstRingId, secondRingId) {
            for (var i = 0; i < ringConnections.length; i++) {
                var ringConnection = ringConnections[i];
                if (ringConnection.firstRingId === firstRingId && ringConnection.secondRingId === secondRingId || ringConnection.firstRingId === secondRingId && ringConnection.secondRingId === firstRingId) {
                    return [].concat(_toConsumableArray(ringConnection.vertices));
                }
            }
        }
    }]);

    return RingConnection;
}();

/** A class encapsulating the functionality to find the smallest set of smallest rings in a graph. */
SmilesDrawer.SSSR = function () {
    function SSSR() {
        _classCallCheck(this, SSSR);
    }

    _createClass(SSSR, null, [{
        key: 'getRings',

        /**
         * Returns an array containing arrays, each representing a ring from the smallest set of smallest rings in the graph.
         * 
         * @param {Array[]} adjacencyMatrix A 2-dimensional array representing a graph.
         * @returns {Array[]} An array containing arrays, each representing a ring from the smallest set of smallest rings in the group.
         */
        value: function getRings(adjacencyMatrix) {
            if (adjacencyMatrix.length === 0) {
                return null;
            }

            // Get the edge list and the theoretical number of rings in SSSR
            var nSssr = SmilesDrawer.SSSR.getEdgeList(adjacencyMatrix).length - adjacencyMatrix.length + SmilesDrawer.Graph.getConnectedComponentCount(adjacencyMatrix);

            if (nSssr === 0) {
                return null;
            }

            var _SmilesDrawer$SSSR$ge = SmilesDrawer.SSSR.getPathIncludedDistanceMatrices(adjacencyMatrix),
                d = _SmilesDrawer$SSSR$ge.d,
                pe1 = _SmilesDrawer$SSSR$ge.pe1,
                pe2 = _SmilesDrawer$SSSR$ge.pe2;

            var c = SmilesDrawer.SSSR.getRingCandidates(d, pe1, pe2);
            var sssr = SmilesDrawer.SSSR.getSSSR(c, d, pe1, pe2, nSssr);
            var rings = new Array(sssr.length);

            for (var i = 0; i < sssr.length; i++) {
                rings[i] = new Array(sssr[i].length);

                var index = 0;

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = sssr[i][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var val = _step2.value;

                        rings[i][index++] = val;
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }

            return rings;
        }

        /**
         * Creates a printable string from a matrix (2D array).
         * 
         * @param {Array[]} matrix A 2D array.
         * @returns {String} A string representing the matrix.
         */

    }, {
        key: 'matrixToString',
        value: function matrixToString(matrix) {
            var str = '';

            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    str += matrix[i][j] + ' ';
                }

                str += '\n';
            }

            return str;
        }

        /**
         * Returnes the two path-included distance matrices used to find the sssr.
         * 
         * @param {Array[]} adjacencyMatrix An adjacency matrix.
         * @returns {Object} The path-included distance matrices. { p1, p2 }
         */

    }, {
        key: 'getPathIncludedDistanceMatrices',
        value: function getPathIncludedDistanceMatrices(adjacencyMatrix) {
            var length = adjacencyMatrix.length;
            var d = Array(length);
            var pe1 = Array(length);
            var pe2 = Array(length);
            var l = 0;
            var m = 0;
            var n = 0;

            for (var i = 0; i < length; i++) {
                d[i] = Array(length);
                pe1[i] = Array(length);
                pe2[i] = Array(length);

                for (var j = 0; j < length; j++) {
                    d[i][j] = i === j || adjacencyMatrix[i][j] === 1 ? adjacencyMatrix[i][j] : Number.POSITIVE_INFINITY;

                    if (d[i][j] === 1) {
                        pe1[i][j] = [[[i, j]]];
                    } else {
                        pe1[i][j] = [];
                    }

                    pe2[i][j] = [];
                }
            }

            for (var k = 0; k < length; k++) {
                for (var _i4 = 0; _i4 < length; _i4++) {
                    for (var _j2 = 0; _j2 < length; _j2++) {
                        var previousPathLength = d[_i4][_j2];
                        var newPathLength = d[_i4][k] + d[k][_j2];

                        if (previousPathLength > newPathLength) {
                            if (previousPathLength === newPathLength + 1) {
                                pe2[_i4][_j2] = [pe1[_i4][_j2].length];
                                for (l = 0; l < pe1[_i4][_j2].length; l++) {
                                    pe2[_i4][_j2][l] = [pe1[_i4][_j2][l].length];
                                    for (m = 0; m < pe1[_i4][_j2][l].length; m++) {
                                        pe2[_i4][_j2][l][m] = [pe1[_i4][_j2][l][m].length];
                                        for (n = 0; n < pe1[_i4][_j2][l][m].length; n++) {
                                            pe2[_i4][_j2][l][m][n] = [pe1[_i4][_j2][l][m][0], pe1[_i4][_j2][l][m][1]];
                                        }
                                    }
                                }
                            } else {
                                pe2[_i4][_j2] = [];
                            }

                            d[_i4][_j2] = newPathLength;

                            pe1[_i4][_j2] = [[]];

                            for (l = 0; l < pe1[_i4][k][0].length; l++) {
                                pe1[_i4][_j2][0].push(pe1[_i4][k][0][l]);
                            }
                            for (l = 0; l < pe1[k][_j2][0].length; l++) {
                                pe1[_i4][_j2][0].push(pe1[k][_j2][0][l]);
                            }
                        } else if (previousPathLength === newPathLength) {
                            if (pe1[_i4][k].length && pe1[k][_j2].length) {
                                if (pe1[_i4][_j2].length) {
                                    var tmp = [];

                                    for (l = 0; l < pe1[_i4][k][0].length; l++) {
                                        tmp.push(pe1[_i4][k][0][l]);
                                    }
                                    for (l = 0; l < pe1[k][_j2][0].length; l++) {
                                        tmp.push(pe1[k][_j2][0][l]);
                                    }

                                    pe1[_i4][_j2].push(tmp);
                                } else {
                                    var _tmp = [];

                                    for (l = 0; l < pe1[_i4][k][0].length; l++) {
                                        _tmp.push(pe1[_i4][k][0][l]);
                                    }
                                    for (l = 0; l < pe1[k][_j2][0].length; l++) {
                                        _tmp.push(pe1[k][_j2][0][l]);
                                    }

                                    pe1[_i4][_j2][0] = _tmp;
                                }
                            }
                        } else if (previousPathLength === newPathLength - 1) {
                            if (pe2[_i4][_j2].length) {
                                var _tmp2 = [];

                                for (var l = 0; l < pe1[_i4][k][0].length; l++) {
                                    _tmp2.push(pe1[_i4][k][0][l]);
                                }
                                for (var l = 0; l < pe1[k][_j2][0].length; l++) {
                                    _tmp2.push(pe1[k][_j2][0][l]);
                                }

                                pe2[_i4][_j2].push(_tmp2);
                            } else {
                                var _tmp3 = [];

                                for (var l = 0; l < pe1[_i4][k][0].length; l++) {
                                    _tmp3.push(pe1[_i4][k][0][l]);
                                }
                                for (var l = 0; l < pe1[k][_j2][0].length; l++) {
                                    _tmp3.push(pe1[k][_j2][0][l]);
                                }

                                pe2[_i4][_j2][0] = _tmp3;
                            }
                        }
                    }
                }
            }

            return {
                d: d,
                pe1: pe1,
                pe2: pe2
            };
        }

        /**
         * Get the ring candidates from the path-included distance matrices.
         * 
         * @param {Array[]} d The distance matrix.
         * @param {Array[]} pe1 A matrix containing the shortest paths.
         * @param {Array[]} pe2 A matrix containing the shortest paths + one vertex.
         * @returns {Array[]} The ring candidates.
         */

    }, {
        key: 'getRingCandidates',
        value: function getRingCandidates(d, pe1, pe2) {
            var length = d.length;
            var candidates = [];
            var c = 0;

            for (var i = 0; i < length; i++) {
                for (var j = 0; j < length; j++) {
                    if (d[i][j] === 0 || pe1[i][j].length === 1 && pe2[i][j] === 0) {
                        continue;
                    } else {
                        // c is the number of vertices in the cycle.
                        if (pe2[i][j].length !== 0) {
                            c = 2 * (d[i][j] + 0.5);
                        } else {
                            c = 2 * d[i][j];
                        }

                        if (c !== Infinity) {
                            candidates.push([c, pe1[i][j], pe2[i][j]]);
                        }
                    }
                }
            }

            // Candidates have to be sorted by c
            candidates.sort(function (a, b) {
                return a[0] - b[0];
            });

            return candidates;
        }

        /**
         * Searches the candidates for the smallest set of smallest rings.
         * 
         * @param {Array[]} c The candidates.
         * @param {Array[]} d The distance matrix.
         * @param {Array[]} pe1 A matrix containing the shortest paths.
         * @param {Array[]} pe2 A matrix containing the shortest paths + one vertex.
         * @param {Number} nsssr The theoretical number of rings in the graph.
         * @returns {Set[]} The smallest set of smallest rings.
         */

    }, {
        key: 'getSSSR',
        value: function getSSSR(c, d, pe1, pe2, nsssr) {
            var cSssr = [];

            for (var i = 0; i < c.length; i++) {
                if (c[i][0] % 2 !== 0) {
                    for (var j = 0; j < c[i][2].length; j++) {
                        var bonds = c[i][1][0].concat(c[i][2][j]);
                        var atoms = SSSR.bondsToAtoms(bonds);

                        if (bonds.length === atoms.size && !SSSR.pathSetsContain(cSssr, atoms)) {
                            cSssr.push(atoms);
                        }

                        if (cSssr.length === nsssr) {
                            return cSssr;
                        }
                    }
                } else {
                    for (var _j3 = 0; _j3 < c[i][1].length - 1; _j3++) {
                        var _bonds = c[i][1][_j3].concat(c[i][1][_j3 + 1]);
                        var _atoms = SSSR.bondsToAtoms(_bonds);

                        if (_bonds.length === _atoms.size && !SSSR.pathSetsContain(cSssr, _atoms)) {
                            cSssr.push(_atoms);
                        }

                        if (cSssr.length === nsssr) {
                            return cSssr;
                        }
                    }
                }
            }

            return cSssr;
        }

        /**
         * Returns the number of edges in a graph defined by an adjacency matrix.
         * 
         * @param {Array[]} adjacencyMatrix An adjacency matrix.
         * @returns {Number} The number of edges in the graph defined by the adjacency matrix.
         */

    }, {
        key: 'getEdgeCount',
        value: function getEdgeCount(adjacencyMatrix) {
            var edgeCount = 0;
            var length = adjacencyMatrix.length;

            for (var i = 0; i < length - 1; i++) {
                for (var j = i + 1; j < length; j++) {
                    if (adjacencyMatrix[i][j] === 1) {
                        edgeCount++;
                    }
                }
            }

            return edgeCount;
        }

        /**
         * Returns an edge list constructed form an adjacency matrix.
         * 
         * @param {Array[]} adjacencyMatrix An adjacency matrix.
         * @returns {Array[]} An edge list. E.g. [ [ 0, 1 ], ..., [ 16, 2 ] ]
         */

    }, {
        key: 'getEdgeList',
        value: function getEdgeList(adjacencyMatrix) {
            var length = adjacencyMatrix.length;
            var edgeList = [];

            for (var i = 0; i < length - 1; i++) {
                for (var j = i + 1; j < length; j++) {
                    if (adjacencyMatrix[i][j] === 1) {
                        edgeList.push([i, j]);
                    }
                }
            }

            return edgeList;
        }

        /**
         * Return a set of vertex indices contained in an array of bonds.
         * 
         * @param {Array} bonds An array of bonds. A bond is defined as [ sourceVertexId, targetVertexId ].
         * @returns {Set<Number>} An array of vertices.
         */

    }, {
        key: 'bondsToAtoms',
        value: function bondsToAtoms(bonds) {
            var atoms = new Set();

            for (var i = 0; i < bonds.length; i++) {
                atoms.add(bonds[i][0]);
                atoms.add(bonds[i][1]);
            }

            return atoms;
        }

        /**
         * Checks whether or not a given path already exists in an array of paths.
         * 
         * @param {Set[]} pathSets An array of sets each representing a path.
         * @param {Set<Number>} pathSet A set representing a path.
         * @returns {Boolean} A boolean indicating whether or not a give path is contained within a set.
         */

    }, {
        key: 'pathSetsContain',
        value: function pathSetsContain(pathSets, pathSet) {
            for (var i = 0; i < pathSets.length; i++) {
                if (SSSR.isSupersetOf(pathSet, pathSets[i])) {
                    return true;
                }

                if (pathSets[i].size !== pathSet.size) {
                    continue;
                }

                if (SSSR.areSetsEqual(pathSets[i], pathSet)) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Checks whether or not two sets are equal (contain the same elements).
         * 
         * @param {Set<Number>} setA A set.
         * @param {Set<Number>} setB A set.
         * @returns {Boolean} A boolean indicating whether or not the two sets are equal.
         */

    }, {
        key: 'areSetsEqual',
        value: function areSetsEqual(setA, setB) {
            if (setA.size !== setB.size) {
                return false;
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = setA[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var element = _step3.value;

                    if (!setB.has(element)) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return true;
        }

        /**
         * Checks whether or not a set (setA) is a superset of another set (setB).
         * 
         * @param {Set<Number>} setA A set.
         * @param {Set<Number>} setB A set.
         * @returns {Boolean} A boolean indicating whether or not setB is a superset of setA.
         */

    }, {
        key: 'isSupersetOf',
        value: function isSupersetOf(setA, setB) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = setB[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var element = _step4.value;

                    if (!setA.has(element)) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return true;
        }
    }]);

    return SSSR;
}();
/** 
 * A class representing a 2D vector.
 * 
 * @property {Number} x The x component of the vector.
 * @property {Number} y The y component of the vector.
 */
SmilesDrawer.Vector2 = function () {
    /**
     * The constructor of the class Vector2.
     *
     * @param {Number} x The initial x coordinate value.
     * @param {Number} y The initial y coordinate value.
     */
    function Vector2(x, y) {
        _classCallCheck(this, Vector2);

        if (arguments.length == 0) {
            this.x = 0;
            this.y = 0;
        } else if (arguments.length == 1) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * Clones this vector and returns the clone.
     *
     * @returns {SmilesDrawer.Vector2} The clone of this vector.
     */


    _createClass(Vector2, [{
        key: 'clone',
        value: function clone() {
            return new SmilesDrawer.Vector2(this.x, this.y);
        }

        /**
         * Returns a string representation of this vector.
         *
         * @returns {String} A string representation of this vector.
         */

    }, {
        key: 'toString',
        value: function toString() {
            return '(' + this.x + ',' + this.y + ')';
        }

        /**
         * Add the x and y coordinate values of a vector to the x and y coordinate values of this vector.
         *
         * @param {SmilesDrawer.Vector2} vec Another vector.
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'add',
        value: function add(vec) {
            this.x += vec.x;
            this.y += vec.y;

            return this;
        }

        /**
         * Subtract the x and y coordinate values of a vector from the x and y coordinate values of this vector.
         *
         * @param {SmilesDrawer.Vector2} vec Another vector.
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'subtract',
        value: function subtract(vec) {
            this.x -= vec.x;
            this.y -= vec.y;

            return this;
        }

        /**
         * Divide the x and y coordinate values of this vector by a scalar.
         *
         * @param {Number} scalar The scalar.
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'divide',
        value: function divide(scalar) {
            this.x /= scalar;
            this.y /= scalar;

            return this;
        }

        /**
         * Multiply the x and y coordinate values of this vector by the values of another vector.
         *
         * @param {SmilesDrawer.Vector2} v A vector.
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'multiply',
        value: function multiply(v) {
            this.x *= v.x;
            this.y *= v.y;

            return this;
        }

        /**
         * Multiply the x and y coordinate values of this vector by a scalar.
         *
         * @param {Number} scalar The scalar.
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'multiplyScalar',
        value: function multiplyScalar(scalar) {
            this.x *= scalar;
            this.y *= scalar;

            return this;
        }

        /**
         * Inverts this vector. Same as multiply(-1.0).
         *
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'invert',
        value: function invert() {
            this.x = -this.x;
            this.y = -this.y;

            return this;
        }

        /**
         * Returns the angle of this vector in relation to the coordinate system.
         *
         * @returns {Number} The angle in radians.
         */

    }, {
        key: 'angle',
        value: function angle() {
            return Math.atan2(this.y, this.x);
        }

        /**
         * Returns the euclidean distance between this vector and another vector.
         *
         * @param {SmilesDrawer.Vector2} vec A vector.
         * @returns {Number} The euclidean distance between the two vectors.
         */

    }, {
        key: 'distance',
        value: function distance(vec) {
            return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y));
        }

        /**
         * Returns the squared euclidean distance between this vector and another vector. When only the relative distances of a set of vectors are needed, this is is less expensive than using distance(vec).
         *
         * @param {SmilesDrawer.Vector2} vec Another vector.
         * @returns {Number} The squared euclidean distance of the two vectors.
         */

    }, {
        key: 'distanceSq',
        value: function distanceSq(vec) {
            return (vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y);
        }

        /**
         * Checks whether or not this vector is in a clockwise or counter-clockwise rotational direction compared to another vector in relation to the coordinate system.
         *
         * @param {SmilesDrawer.Vector2} vec Another vector.
         * @returns {Number} Returns -1, 0 or 1 if the vector supplied as an argument is clockwise, neutral or counter-clockwise respectively to this vector in relation to the coordinate system.
         */

    }, {
        key: 'clockwise',
        value: function clockwise(vec) {
            var a = this.y * vec.x;
            var b = this.x * vec.y;

            if (a > b) {
                return -1;
            } else if (a === b) {
                return 0;
            }

            return 1;
        }

        /**
         * Rotates this vector by a given number of radians around the origin of the coordinate system.
         *
         * @param {Number} angle The angle in radians to rotate the vector.
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'rotate',
        value: function rotate(angle) {
            var tmp = new SmilesDrawer.Vector2();
            var cosAngle = Math.cos(angle);
            var sinAngle = Math.sin(angle);

            tmp.x = this.x * cosAngle - this.y * sinAngle;
            tmp.y = this.x * sinAngle + this.y * cosAngle;

            this.x = tmp.x;
            this.y = tmp.y;

            return this;
        }

        /**
         * Rotates this vector around another vector.
         *
         * @param {Number} angle The angle in radians to rotate the vector.
         * @param {SmilesDrawer.Vector2} vec The vector which is used as the rotational center.
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'rotateAround',
        value: function rotateAround(angle, vec) {
            var s = Math.sin(angle);
            var c = Math.cos(angle);

            this.x -= vec.x;
            this.y -= vec.y;

            var x = this.x * c - this.y * s;
            var y = this.x * s + this.y * c;

            this.x = x + vec.x;
            this.y = y + vec.y;

            return this;
        }

        /**
         * Rotate a vector around a given center to the same angle as another vector (so that the two vectors and the center are in a line, with both vectors on one side of the center), keeps the distance from this vector to the center.
         *
         * @param {SmilesDrawer.Vector2} vec The vector to rotate this vector to.
         * @param {SmilesDrawer.Vector2} center The rotational center.
         * @param {Number} [offsetAngle=0.0] An additional amount of radians to rotate the vector.
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'rotateTo',
        value: function rotateTo(vec, center) {
            var offsetAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;

            // Problem if this is first position
            this.x += 0.001;
            this.y -= 0.001;

            var a = SmilesDrawer.Vector2.subtract(this, center);
            var b = SmilesDrawer.Vector2.subtract(vec, center);
            var angle = SmilesDrawer.Vector2.angle(b, a);

            this.rotateAround(angle + offsetAngle, center);

            return this;
        }

        /**
         * Rotates the vector away from a specified vector around a center.
         * 
         * @param {SmilesDrawer.Vector2} vec The vector this one is rotated away from.
         * @param {SmilesDrawer.Vector2} center The rotational center.
         * @param {Number} angle The angle by which to rotate.
         */

    }, {
        key: 'rotateAwayFrom',
        value: function rotateAwayFrom(vec, center, angle) {
            this.rotateAround(angle, center);

            var distSqA = this.distanceSq(vec);

            this.rotateAround(-2.0 * angle, center);

            var distSqB = this.distanceSq(vec);

            // If it was rotated towards the other vertex, rotate in other direction by same amount.
            if (distSqB < distSqA) {
                this.rotateAround(2.0 * angle, center);
            }
        }

        /**
         * Returns the angle in radians used to rotate this vector away from a given vector.
         * 
         * @param {SmilesDrawer.Vector2} vec The vector this one is rotated away from.
         * @param {SmilesDrawer.Vector2} center The rotational center.
         * @param {Number} angle The angle by which to rotate.
         * @returns {Number} The angle in radians.
         */

    }, {
        key: 'getRotateAwayFromAngle',
        value: function getRotateAwayFromAngle(vec, center, angle) {
            var tmp = this.clone();

            tmp.rotateAround(angle, center);

            var distSqA = tmp.distanceSq(vec);

            tmp.rotateAround(-2.0 * angle, center);

            var distSqB = tmp.distanceSq(vec);

            if (distSqB < distSqA) {
                return angle;
            } else {
                return -angle;
            }
        }

        /**
         * Returns the angle in radians used to rotate this vector towards a given vector.
         * 
         * @param {SmilesDrawer.Vector2} vec The vector this one is rotated towards to.
         * @param {SmilesDrawer.Vector2} center The rotational center.
         * @param {Number} angle The angle by which to rotate.
         * @returns {Number} The angle in radians.
         */

    }, {
        key: 'getRotateTowardsAngle',
        value: function getRotateTowardsAngle(vec, center, angle) {
            var tmp = this.clone();

            tmp.rotateAround(angle, center);

            var distSqA = tmp.distanceSq(vec);

            tmp.rotateAround(-2.0 * angle, center);

            var distSqB = tmp.distanceSq(vec);

            if (distSqB > distSqA) {
                return angle;
            } else {
                return -angle;
            }
        }

        /**
         * Gets the angles between this vector and another vector around a common center of rotation.
         *
         * @param {SmilesDrawer.Vector2} vec Another vector.
         * @param {SmilesDrawer.Vector2} center The center of rotation.
         * @returns {Number} The angle between this vector and another vector around a center of rotation in radians.
         */

    }, {
        key: 'getRotateToAngle',
        value: function getRotateToAngle(vec, center) {
            var a = SmilesDrawer.Vector2.subtract(this, center);
            var b = SmilesDrawer.Vector2.subtract(vec, center);
            var angle = SmilesDrawer.Vector2.angle(b, a);

            return Number.isNaN(angle) ? 0.0 : angle;
        }

        /**
         * Checks whether a vector lies within a polygon spanned by a set of vectors.
         *
         * @param {SmilesDrawer.Vector2[]} polygon An array of vectors spanning the polygon.
         * @returns {Boolean} A boolean indicating whether or not this vector is within a polygon.
         */

    }, {
        key: 'isInPolygon',
        value: function isInPolygon(polygon) {
            var inside = false;

            // Its not always a given, that the polygon is convex (-> sugars)
            for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                if (polygon[i].y > this.y != polygon[j].y > this.y && this.x < (polygon[j].x - polygon[i].x) * (this.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
                    inside = !inside;
                }
            }

            return inside;
        }

        /**
         * Returns the length of this vector.
         *
         * @returns {Number} The length of this vector.
         */

    }, {
        key: 'length',
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * Normalizes this vector.
         *
         * @returns {SmilesDrawer.Vector2} Returns itself.
         */

    }, {
        key: 'normalize',
        value: function normalize() {
            this.divide(this.length());

            return this;
        }

        /**
         * Returns a normalized copy of this vector.
         *
         * @returns {SmilesDrawer.Vector2} A normalized copy of this vector.
         */

    }, {
        key: 'normalized',
        value: function normalized() {
            return SmilesDrawer.Vector2.divide(this, this.length());
        }

        /**
         * Calculates which side of a line spanned by two vectors this vector is.
         *
         * @param {SmilesDrawer.Vector2} vecA A vector.
         * @param {SmilesDrawer.Vector2} vecB A vector.
         * @returns {Number} A number indicating the side of this vector, given a line spanned by two other vectors.
         */

    }, {
        key: 'whichSide',
        value: function whichSide(vecA, vecB) {
            return (this.x - vecA.x) * (vecB.y - vecA.y) - (this.y - vecA.y) * (vecB.x - vecA.x);
        }

        /**
         * Checks whether or not this vector is on the same side of a line spanned by two vectors as another vector.
         *
         * @param {SmilesDrawer.Vector2} vecA A vector spanning the line.
         * @param {SmilesDrawer.Vector2} vecB A vector spanning the line.
         * @param {SmilesDrawer.Vector2} vecC A vector to check whether or not it is on the same side as this vector.
         * @returns {Boolean} Returns a boolean indicating whether or not this vector is on the same side as another vector.
         */

    }, {
        key: 'sameSideAs',
        value: function sameSideAs(vecA, vecB, vecC) {
            var d = this.whichSide(vecA, vecB);
            var dRef = vecC.whichSide(vecA, vecB);

            return d < 0 && dRef < 0 || d == 0 && dRef == 0 || d > 0 && dRef > 0;
        }

        /**
         * Adds two vectors and returns the result as a new vector.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA A summand.
         * @param {SmilesDrawer.Vector2} vecB A summand.
         * @returns {SmilesDrawer.Vector2} Returns the sum of two vectors.
         */

    }], [{
        key: 'add',
        value: function add(vecA, vecB) {
            return new SmilesDrawer.Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
        }

        /**
         * Subtracts one vector from another and returns the result as a new vector.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA The minuend.
         * @param {SmilesDrawer.Vector2} vecB The subtrahend.
         * @returns {SmilesDrawer.Vector2} Returns the difference of two vectors.
         */

    }, {
        key: 'subtract',
        value: function subtract(vecA, vecB) {
            return new SmilesDrawer.Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
        }

        /**
         * Multiplies two vectors (value by value) and returns the result.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA A vector.
         * @param {SmilesDrawer.Vector2} vecB A vector.
         * @returns {SmilesDrawer.Vector2} Returns the product of two vectors.
         */

    }, {
        key: 'multiply',
        value: function multiply(vecA, vecB) {
            return new SmilesDrawer.Vector2(vecA.x * vecB.x, vecA.y * vecB.y);
        }

        /**
         * Multiplies two vectors (value by value) and returns the result.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vec A vector.
         * @param {Number} scalar A scalar.
         * @returns {SmilesDrawer.Vector2} Returns the product of two vectors.
         */

    }, {
        key: 'multiplyScalar',
        value: function multiplyScalar(vec, scalar) {
            return new SmilesDrawer.Vector2(vec).multiply(scalar);
        }

        /**
         * Returns the midpoint of a line spanned by two vectors.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA A vector spanning the line.
         * @param {SmilesDrawer.Vector2} vecB A vector spanning the line.
         * @returns {SmilesDrawer.Vector2} The midpoint of the line spanned by two vectors.
         */

    }, {
        key: 'midpoint',
        value: function midpoint(vecA, vecB) {
            return new SmilesDrawer.Vector2((vecA.x + vecB.x) / 2, (vecA.y + vecB.y) / 2);
        }

        /**
         * Returns the normals of a line spanned by two vectors.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA A vector spanning the line.
         * @param {SmilesDrawer.Vector2} vecB A vector spanning the line.
         * @returns {SmilesDrawer.Vector2[]} An array containing the two normals, each represented by a vector.
         */

    }, {
        key: 'normals',
        value: function normals(vecA, vecB) {
            var delta = SmilesDrawer.Vector2.subtract(vecB, vecA);

            return [new SmilesDrawer.Vector2(-delta.y, delta.x), new SmilesDrawer.Vector2(delta.y, -delta.x)];
        }

        /**
         * Returns the unit (normalized normal) vectors of a line spanned by two vectors.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA A vector spanning the line.
         * @param {SmilesDrawer.Vector2} vecB A vector spanning the line.
         * @returns {SmilesDrawer.Vector2[]} An array containing the two unit vectors.
         */

    }, {
        key: 'units',
        value: function units(vecA, vecB) {
            var delta = SmilesDrawer.Vector2.subtract(vecB, vecA);

            return [new SmilesDrawer.Vector2(-delta.y, delta.x).normalize(), new SmilesDrawer.Vector2(delta.y, -delta.x).normalize()];
        }

        /**
         * Divides a vector by another vector and returns the result as new vector.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA The dividend.
         * @param {SmilesDrawer.Vector2} vecB The divisor.
         * @returns {SmilesDrawer.Vector2} The fraction of the two vectors.
         */

    }, {
        key: 'divide',
        value: function divide(vecA, vecB) {
            if (vecB.x && vecB.y) {
                return new SmilesDrawer.Vector2(vecA.x / vecB.x, vecA.y / vecB.y);
            }

            return new SmilesDrawer.Vector2(vecA.x / vecB, vecA.y / vecB);
        }

        /**
         * Returns the dot product of two vectors.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA A vector.
         * @param {SmilesDrawer.Vector2} vecB A vector.
         * @returns {Number} The dot product of two vectors.
         */

    }, {
        key: 'dot',
        value: function dot(vecA, vecB) {
            return vecA.x * vecB.x + vecA.y * vecB.y;
        }

        /**
         * Returns the angle between two vectors.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA A vector.
         * @param {SmilesDrawer.Vector2} vecB A vector.
         * @returns {Number} The angle between two vectors in radians.
         */

    }, {
        key: 'angle',
        value: function angle(vecA, vecB) {
            var dot = SmilesDrawer.Vector2.dot(vecA, vecB);

            return Math.acos(dot / (vecA.length() * vecB.length()));
        }

        /**
         * Returns the angle between two vectors based on a third vector in between.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA A vector.
         * @param {SmilesDrawer.Vector2} vecB A vector.
         * @param {SmilesDrawer.Vector2} vecC A vector.
         * @returns {Number} The angle in radians.
         */

    }, {
        key: 'threePointangle',
        value: function threePointangle(vecA, vecB, vecC) {
            var ab = SmilesDrawer.Vector2.subtract(vecB - vecA);
            var bc = SmilesDrawer.Vector2.subtract(vecC, vecB);
            var abLength = vecA.distance(vecB);
            var bcLenght = vecB.distance(vecC);

            return Math.acos(SmilesDrawer.Vector2.dot(ab, bc) / (abLenght * bcLenght));
        }

        /**
         * Returns the scalar projection of a vector on another vector.
         *
         * @static
         * @param {SmilesDrawer.Vector2} vecA Thecreate jsdoc babel vector to be projected.
         * @param {SmilesDrawer.Vector2} vecB The vector to be projection upon.
         * @returns {Number} The scalar component.
         */

    }, {
        key: 'scalarProjection',
        value: function scalarProjection(vecA, vecB) {
            var unit = vecB.normalized();

            return SmilesDrawer.Vector2.dot(vecA, unit);
        }
    }]);

    return Vector2;
}();

/** 
 * A class representing a vertex.
 * 
 * @property {Number} id The id of this vertex.
 * @property {Atom} value The atom associated with this vertex.
 * @property {SmilesDrawer.Vector2} position The position of this vertex.
 * @property {SmilesDrawer.Vector2} previousPosition The position of the previous vertex.
 * @property {Number|null} parentVertexId The id of the previous vertex.
 * @property {Number[]} children The ids of the children of this vertex.
 * @property {Number[]} spanningTreeChildren The ids of the children of this vertex as defined in the spanning tree defined by the SMILES.
 * @property {Number[]} edges The ids of edges associated with this vertex.
 * @property {Boolean} positioned A boolean indicating whether or not this vertex has been positioned.
 * @property {Number} angle The angle of this vertex.
 * @property {Number} globalAngle The global angle of this vertex.
 * @property {Number} dir The direction of this vertex.
 * @property {Number} backAngle The back angle associated with this vertex.
 * @property {Boolean} flippable A boolean indicating whether or not this vertex can be flipped into a ring.
 * @property {Number|null} flipCenter The id of the vertex on which this one can be flipped.
 * @property {Number|null} flipNeighbour The id of the vertex which caused this vertex to be flipped.
 * @property {Number[]} flipRings An array of ring ids which specify candidates for this vertex to be flipped into.
 * @property {Number} neighbourCount The number of neighbouring vertices.
 * @property {Number[]} neighbours The vertex ids of neighbouring vertices.
 * @property {String[]} neighbouringElements The element symbols associated with neighbouring vertices.         
 */
SmilesDrawer.Vertex = function () {
    /**
     * The constructor for the class Vertex.
     *
     * @param {*} value The value associated with this vertex.
     * @param {Number} [x=0] The initial x coordinate of the positional vector of this vertex.
     * @param {Number} [y=0] The initial y coordinate of the positional vector of this vertex.
     */
    function Vertex(value) {
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Vertex);

        this.id = null;
        this.value = value;
        this.position = new SmilesDrawer.Vector2(x ? x : 0, y ? y : 0);
        this.previousPosition = new SmilesDrawer.Vector2(0, 0);
        this.parentVertexId = null;
        this.children = [];
        this.spanningTreeChildren = [];
        this.edges = [];
        this.positioned = false;
        this.angle = 0.0;
        this.globalAngle = 0.0;
        this.dir = 1.0;
        this.backAngle = 0.0;
        this.flippable = false; // can be flipped into a ring
        this.flipCenter = null;
        this.flipNeighbour = null;
        this.flipRings = new Array();
        this.neighbourCount = 0;
        this.neighbours = [];
        this.neighbouringElements = [];
    }

    /**
     * Set the 2D coordinates of the vertex.
     * 
     * @param {Number} x The x component of the coordinates.
     * @param {Number} y The y component of the coordinates.
     * 
     */


    _createClass(Vertex, [{
        key: 'setPosition',
        value: function setPosition(x, y) {
            this.position.x = x;
            this.position.y = y;
        }

        /**
         * Set the 2D coordinates of the vertex from a Vector2.
         * 
         * @param {SmilesDrawer.Vector2} v A 2D vector.
         * 
         */

    }, {
        key: 'setPositionFromVector',
        value: function setPositionFromVector(v) {
            this.position.x = v.x;
            this.position.y = v.y;
        }

        /**
         * Add a child vertex id to this vertex.
         * @param {Number} vertexID The id of a vertex to be added as a child to this vertex.
         */

    }, {
        key: 'addChild',
        value: function addChild(vertexId) {
            this.neighbourCount++;
            this.children.push(vertexId);
            this.neighbours.push(vertexId);

            this.value.bondCount++;
        }

        /**
         * Set the vertex id of the parent.
         * 
         * @param {Number} parentVertexId The parents vertex id.
         */

    }, {
        key: 'setParentVertexId',
        value: function setParentVertexId(parentVertexId) {
            this.neighbourCount++;
            this.parentVertexId = parentVertexId;
            this.neighbours.push(parentVertexId);

            this.value.bondCount++;
        }

        /**
         * Returns true if this vertex is terminal (has no parent or child vertices), otherwise returns false. Always returns true if associated value has property hasAttachedPseudoElements set to true.
         *
         * @returns {Boolean} A boolean indicating whether or not this vertex is terminal.
         */

    }, {
        key: 'isTerminal',
        value: function isTerminal() {
            if (this.value.hasAttachedPseudoElements) {
                return true;
            }

            return this.parentVertexId === null && this.children.length < 2 || this.children.length === 0;
        }

        /**
         * Clones this vertex and returns the clone.
         *
         * @returns {SmilesDrawer.Vertex} A clone of this vertex.
         */

    }, {
        key: 'clone',
        value: function clone() {
            var clone = new Vertex(this.value, this.position.x, this.position.y);
            clone.id = this.id;
            clone.previousPosition = new SmilesDrawer.Vector2(this.previousPosition.x, this.previousPosition.y);
            clone.parentVertexId = this.parentVertexId;
            clone.children = SmilesDrawer.ArrayHelper.clone(this.children);
            clone.spanningTreeChildren = SmilesDrawer.ArrayHelper.clone(this.spanningTreeChildren);
            clone.edges = SmilesDrawer.ArrayHelper.clone(this.edges);
            clone.positioned = this.positioned;
            clone.angle = this.angle;
            clone.backAngle = this.backAngle;
            clone.flippable = this.flippable;
            clone.flipCenter = this.flipCenter;
            clone.flipRings = SmilesDrawer.ArrayHelper.clone(this.flipRings);
            return clone;
        }

        /**
         * Returns true if this vertex and the supplied vertex both have the same id, else returns false.
         *
         * @param {SmilesDrawer.Vertex} vertex The vertex to check.
         * @returns {Boolean} A boolean indicating whether or not the two vertices have the same id.
         */

    }, {
        key: 'equals',
        value: function equals(vertex) {
            return this.id === vertex.id;
        }

        /**
         * Returns the angle of this vertexes positional vector. If a reference vector is supplied in relations to this vector, else in relations to the coordinate system.
         *
         * @param {SmilesDrawer.Vertex} [referenceVector=null] - The refernece vector.
         * @param {Boolean} [returnAsDegrees=false] - If true, returns angle in degrees, else in radians.
         * @returns {Number} The angle of this vertex.
         */

    }, {
        key: 'getAngle',
        value: function getAngle() {
            var referenceVector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var returnAsDegrees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var u = null;

            if (!referenceVector) {
                u = SmilesDrawer.Vector2.subtract(this.position, this.previousPosition);
            } else {
                u = SmilesDrawer.Vector2.subtract(this.position, referenceVector);
            }

            if (returnAsDegrees) {
                return SmilesDrawer.MathHelper.toDeg(u.angle());
            }

            return u.angle();
        }

        /**
         * Returns the suggested text direction when text is added at the position of this vertex.
         *
         * @param {SmilesDrawer.Vertex[]} vertices The array of vertices for the current molecule.
         * @returns {String} The suggested direction of the text.
         */

    }, {
        key: 'getTextDirection',
        value: function getTextDirection(vertices) {
            var neighbours = this.getDrawnNeighbours(vertices);
            var angles = [];

            for (var i = 0; i < neighbours.length; i++) {
                angles.push(this.getAngle(vertices[neighbours[i]].position));
            }

            var textAngle = SmilesDrawer.MathHelper.meanAngle(angles);

            // Round to 0, 90, 180 or 270 degree
            var halfPi = Math.PI / 2.0;
            textAngle = Math.round(Math.round(textAngle / halfPi) * halfPi, 3);

            if (textAngle === 2) {
                return 'down';
            } else if (textAngle === -2) {
                return 'up';
            } else if (textAngle === 0 || textAngle === -0) {
                return 'right'; // is checking for -0 necessary?
            } else if (textAngle === 3 || textAngle === -3) {
                return 'left';
            } else {
                return 'down'; // default to down
            }
        }

        /**
         * Returns an array of ids of neighbouring vertices.
         *
         * @param {Number} [vertexId=null] If a value is supplied, the vertex with this id is excluded from the returned indices.
         * @returns {Number[]} An array containing the ids of neighbouring vertices.
         */

    }, {
        key: 'getNeighbours',
        value: function getNeighbours() {
            var vertexId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (vertexId === null) {
                return this.neighbours;
            }

            var arr = [];

            for (var i = 0; i < this.neighbours.length; i++) {
                if (this.neighbours[i] !== vertexId) {
                    arr.push(this.neighbours[i]);
                }
            }

            return arr;
        }

        /**
         * Returns an array of ids of neighbouring vertices that will be drawn (vertex.value.isDrawn === true).
         * 
         * @param {SmilesDrawer.Vertex[]} vertices An array containing the vertices associated with the current molecule.
         * @returns {Number[]} An array containing the ids of neighbouring vertices that will be drawn.
         */

    }, {
        key: 'getDrawnNeighbours',
        value: function getDrawnNeighbours(vertices) {
            var arr = [];

            for (var i = 0; i < this.neighbours.length; i++) {
                if (vertices[this.neighbours[i]].value.isDrawn) {
                    arr.push(this.neighbours[i]);
                }
            }

            return arr;
        }

        /**
         * Returns the number of neighbours of this vertex.
         *
         * @returns {Number} The number of neighbours.
         */

    }, {
        key: 'getNeighbourCount',
        value: function getNeighbourCount() {
            return this.neighbourCount;
        }

        /**
         * Gets the common neighbours of this and another vertex.
         *
         * @param {Vertex} vertex The vertex to check for common neighbours.
         * @returns {Number[]} An array containing the ids of common neighbours.
         */

    }, {
        key: 'getCommonNeighbours',
        value: function getCommonNeighbours(vertex) {
            // There can only be one common neighbour of a Vertex
            // outside of a ring
            var commonNeighbours = new Array();
            var neighboursA = this.getNeighbours();
            var neighboursB = vertex.getNeighbours();

            for (var i = 0; i < neighboursA.length; i++) {
                for (var j = 0; j < neighboursB.length; j++) {
                    if (neighboursA[i] === neighboursB[j]) {
                        commonNeighbours.push(neighboursA[i]);
                    }
                }
            }

            return commonNeighbours;
        }

        /**
         * Checks whether or not a vertex is a neighbour of this vertex.
         *
         * @param {Number} vertexId The id of the vertex to check if it is a neighbour of this vertex.
         * @returns {Boolean} A boolean indicating whether or not the two vertices are neighbours.
         */

    }, {
        key: 'isNeighbour',
        value: function isNeighbour(vertexId) {
            if (this.parentVertexId === vertexId) {
                return true;
            }

            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i] === vertexId) {
                    return true;
                }
            }
        }

        /**
         * Returns a list of ids of vertices neighbouring this one in the original spanning tree, excluding the ringbond connections.
         *
         * @param {Number} [vertexId=null] If supplied, the vertex with this id is excluded from the array returned.
         * @returns {Number[]} An array containing the ids of the neighbouring vertices.
         */

    }, {
        key: 'getSpanningTreeNeighbours',
        value: function getSpanningTreeNeighbours() {
            var vertexId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var neighbours = [];

            for (var i = 0; i < this.spanningTreeChildren.length; i++) {
                if (vertexId === undefined || vertexId != this.spanningTreeChildren[i]) {
                    neighbours.push(this.spanningTreeChildren[i]);
                }
            }

            if (this.parentVertexId != null) {
                if (vertexId === undefined || vertexId != this.parentVertexId) {
                    neighbours.push(this.parentVertexId);
                }
            }

            return neighbours;
        }

        /**
         * Gets the next vertex in the ring in opposide direction to the supplied vertex id.
         *
         * @param {SmilesDrawer.Vertex[]} vertices The array of vertices for the current molecule.
         * @param {Number} ringId The id of the ring containing this vertex.
         * @param {Number} previousVertexId The id of the previous vertex. The next vertex will be opposite from the vertex with this id as seen from this vertex.
         * @returns {Number} The id of the next vertex in the ring.
         */

    }, {
        key: 'getNextInRing',
        value: function getNextInRing(vertices, ringId, previousVertexId) {
            var neighbours = this.getNeighbours();

            for (var i = 0; i < neighbours.length; i++) {
                if (SmilesDrawer.ArrayHelper.contains(vertices[neighbours[i]].value.rings, { value: ringId }) && neighbours[i] != previousVertexId) {
                    return neighbours[i];
                }
            }

            return null;
        }
    }]);

    return Vertex;
}();