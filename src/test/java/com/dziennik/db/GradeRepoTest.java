package com.dziennik.db;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.dziennik.model.Grade;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
class GradeRepoTest {
	
	@Autowired
	private GradeRepo gradeRepo;
	Long idpupil = 1001l;

	@BeforeEach
	void setUp() throws Exception {
		this.gradeRepo.deleteAll();
	}

	@Test
	public void ifPupilHasntAnyGradesDBreturnEmpytList() {
		
		List<Grade>allgrades = gradeRepo.findByIdpupil(idpupil);
		
		assertEquals(0, allgrades.size());
	}
	
	@Test
	public void pupilHasOneGrade() {
		Grade g = new Grade(idpupil, 1l, 5);
		gradeRepo.save(g);
		
		List<Grade>allgrades = gradeRepo.findByIdpupil(idpupil);
		assertEquals(1, allgrades.size());
		assertEquals(5, allgrades.get(0).getGrade());
	}
	
	@Test
	public void pupilHasManyGrades() {
		Grade g1 = new Grade(idpupil, 1l, 5);
		Grade g2 = new Grade(idpupil, 2l, 2);
		Grade g3 = new Grade(idpupil, 3l, 3);
		Grade g4 = new Grade(idpupil, 3l, 4);
		gradeRepo.saveAll(Arrays.asList(g1, g2, g3, g4));
		
		List<Grade>allgrades = gradeRepo.findByIdpupil(idpupil);
		assertEquals(4, allgrades.size());
		assertEquals(5, allgrades.get(0).getGrade());
		assertEquals(2, allgrades.get(1).getGrade());
		assertEquals(4, allgrades.get(3).getGrade());
	}
	
	@Test
	public void giveAllGradesOfOneSubject() {
		Grade g1 = new Grade(idpupil, 1l, 5);
		Grade g2 = new Grade(idpupil, 2l, 2);
		Grade g3 = new Grade(idpupil, 3l, 3);
		Grade g4 = new Grade(idpupil, 3l, 4);
		Grade g5 = new Grade(102l, 3l, 2);
		gradeRepo.saveAll(Arrays.asList(g1, g2, g3, g4, g5));
		
		List<Grade> subjecGrades = gradeRepo.findPupilSubjectGrade(idpupil, 3l);
		
		assertEquals(2, subjecGrades.size());
		assertEquals(1001l, subjecGrades.get(0).getIdpupil());
		assertEquals(1001l, subjecGrades.get(1).getIdpupil());
		
		assertEquals(3l, subjecGrades.get(0).getIdsubject());
		assertEquals(3l, subjecGrades.get(1).getIdsubject());
	}
	
	@Test
	public void distinctSubject() {
		Grade g1 = new Grade(idpupil, 1l, 5);
		Grade g2 = new Grade(idpupil, 2l, 2);
		Grade g3 = new Grade(idpupil, 2l, 3);
		Grade g4 = new Grade(idpupil, 3l, 3);
		Grade g5 = new Grade(idpupil, 3l, 4);
		Grade g6 = new Grade(102l, 3l, 2);
		gradeRepo.saveAll(Arrays.asList(g1, g2, g3, g4, g5, g6));
		
		List<Long> subjecid = gradeRepo.getPupilDistinctSubject(idpupil);
		
		assertEquals(3, subjecid.size());
		assertEquals(1l, subjecid.get(0));
		assertEquals(2l, subjecid.get(1));
		assertEquals(3l, subjecid.get(2));
	}
	
	@Test
	public void testDistinctWithoutGrades() {

		List<Long> subjecid = gradeRepo.getPupilDistinctSubject(idpupil);
		
		assertEquals(0, subjecid.size());
	}

}
