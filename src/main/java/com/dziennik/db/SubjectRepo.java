package com.dziennik.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dziennik.model.Subject;

@Repository
public interface SubjectRepo extends JpaRepository<Subject, Long> {

}
