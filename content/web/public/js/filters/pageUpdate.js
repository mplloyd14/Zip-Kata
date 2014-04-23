'use strict';

cai.module('peFilters')
    .filter('pageUpdate', function() {
        return function(input, f) {
            if (input) {
                f(input);
            }

            return input;
        };
    });