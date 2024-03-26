package com.example.backend.filter;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateValidator implements
        ConstraintValidator<DateConstraint, String> {

    @Override
    public void initialize(DateConstraint dateConstraint) {
    }

    @Override
    public boolean isValid(String dateField, ConstraintValidatorContext cxt) {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            Date date = dateFormat.parse(dateField);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}