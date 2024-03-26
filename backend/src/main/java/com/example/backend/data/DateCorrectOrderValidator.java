package com.example.backend.data;

import org.springframework.beans.BeanWrapperImpl;
import org.springframework.web.bind.MethodArgumentNotValidException;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class DateCorrectOrderValidator
        implements ConstraintValidator<DateCorrectOrder, Object> {

    private String field;
    private String fieldMatch;

    public void initialize(DateCorrectOrder constraintAnnotation) {
        this.field = constraintAnnotation.fieldStart();
        this.fieldMatch = constraintAnnotation.fieldEnd();
    }

    public boolean isValid(Object value, ConstraintValidatorContext context) {
        try {
            Object fieldStart = new BeanWrapperImpl(value)
                    .getPropertyValue(field);
            Object fieldEnd = new BeanWrapperImpl(value)
                    .getPropertyValue(fieldMatch);

            if (fieldStart != null && fieldEnd != null) {
                int[] datesStart = Arrays.stream(fieldStart.toString().split("-")).mapToInt(Integer::parseInt).toArray();
                int[] datesEnd = Arrays.stream(fieldEnd.toString().split("-")).mapToInt(Integer::parseInt).toArray();
                for (int i = 0; i < 3; i++) {
                    if (datesEnd[i] < datesStart[i]) {
                        return false;
                    }
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
