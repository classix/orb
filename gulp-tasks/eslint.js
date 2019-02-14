/* global require */

'use strict';

module.exports = function () {
    
    var gulp = require('gulp'),
        eslint = require('gulp-eslint');
    
    return gulp
        .src(['./src/js/**/*.js', './src/js/**/*.jsx'])
        .pipe(eslint({
            "rules": {
                "no-mixed-spaces-and-tabs": 0,
                "no-unused-vars": 0,
                "quotes": 0,
            },
            "globals": {
                "google": true,
                "$": true
            }
        }))
        .pipe(eslint.format());
};
