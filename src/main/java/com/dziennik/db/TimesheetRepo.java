package com.dziennik.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dziennik.timesheet.Timesheet;

@Repository
public interface TimesheetRepo extends JpaRepository<Timesheet, Long> {
	
	@Query(value = "From Timesheet where idclass=:idclass and idteacher=:idteacher and mon=:mon and year=:year")
	List<Timesheet> findCurrentMonthClassAndTeacher(@Param("idclass") Long idclass,
														@Param("idteacher") Long idteacher,
														@Param("mon") int mon,
														@Param("year") int year);
	
	@Query(value = "From Timesheet where idpupil=:idpupil and idteacher=:idteacher and mon=:mon and year=:year")
	Timesheet findCurrentMonthPupilAndTeacher(@Param("idpupil") Long idpupil,
														@Param("idteacher") Long idteacher,
														@Param("mon") int mon,
														@Param("year") int year);
	
}
