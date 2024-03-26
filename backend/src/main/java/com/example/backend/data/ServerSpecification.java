package com.example.backend.data;

import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ServerSpecification {

    public static Specification<Server> filterByCriteria(Date startDate, Date endDate, String name, Integer status, Integer type) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (startDate != null && endDate != null) {
                predicates.add(cb.between(root.get("creationDate"), startDate, endDate));
            } else if (startDate != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("creationDate"), startDate));
            } else if (endDate != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("creationDate"), endDate));
            }

            if (name != null && !name.isEmpty()) {
                predicates.add(cb.equal(root.get("name"), name));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status").as(Integer.class), status));
            }

            if (type != null) {
                predicates.add(cb.equal(root.get("type").as(Integer.class), type));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
