package com.dziennik.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dziennik.model.Timetable;

@Repository
public interface TimetableRepo extends JpaRepository<Timetable, String> {

}
