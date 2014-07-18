'use strict';

cai.module('peFilters')
    .filter('pageStart', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }

            return input;
        }
    });