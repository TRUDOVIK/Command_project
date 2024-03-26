package com.example.backend.filter;

import com.example.backend.filter.DateValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DateValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface DateConstraint {
    String message() default "Некорректный формат даты";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
