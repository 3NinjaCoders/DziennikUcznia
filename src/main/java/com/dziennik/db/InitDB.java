package com.dziennik.db;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import com.dziennik.model.Pupil;
import com.dziennik.model.SchoolClass;
import com.dziennik.model.Subject;
import com.dziennik.model.Teacher;
import com.dziennik.model.User;

public class InitDB implements CommandLineRunner {
	
	private SchoolClassRepo schoolClassRepo;
	private TeacherRepo teacherRepo;
	private GradeRepo gradeRepo;
	private SubjectRepo subjectRepo;
	private PupilRepo pupilRepo;
	private UserRepo userRepo;
	
	@Autowired
	public InitDB(SchoolClassRepo klasaRepo, TeacherRepo nauczycielRepo, GradeRepo ocenaRepo, SubjectRepo przedmiotRepo,
			PupilRepo uczenRepo, UserRepo uzytkownikRepo) {
		this.schoolClassRepo = klasaRepo;
		this.teacherRepo = nauczycielRepo;
		this.gradeRepo = ocenaRepo;
		this.subjectRepo = przedmiotRepo;
		this.pupilRepo = uczenRepo;
		this.userRepo = uzytkownikRepo;
	}

	@Override
	public void run(String... args) throws Exception {
		this.schoolClassRepo.deleteAll();
		this.teacherRepo.deleteAll();
		this.gradeRepo.deleteAll();
		this.subjectRepo.deleteAll();
		this.pupilRepo.deleteAll();
		this.userRepo.deleteAll();
		
				
		User u1 = new User("Jan123", "123", "NAUCZYCIEL");
		User u2 = new User("Adam123", "123", "NAUCZYCIEL");
		User u3 = new User("Jola123", "123", "NAUCZYCIEL");
		User u4 = new User("Kasia123", "123", "NAUCZYCIEL");
		
		User u01 = new User("uczen1", "123", "UCZEN");
		User u02 = new User("uczen2", "123", "UCZEN");
		User u03 = new User("uczen3", "123", "UCZEN");
		User u04 = new User("uczen4", "123", "UCZEN");
		User u05 = new User("uczen5", "123", "UCZEN");
		User u06 = new User("uczen6", "123", "UCZEN");
		User u07 = new User("uczen7", "123", "UCZEN");
		User u08 = new User("uczen8", "123", "UCZEN");
		this.userRepo.saveAll(Arrays.asList(u1, u2, u3, u4, u01, u02, u03, u04, u05, u06, u07, u08));
		
		Subject p1 = new Subject(u1.getId(), "Matematyka");
		Subject p2 = new Subject(u2.getId(), "Biologia");
		Subject p3 = new Subject(u3.getId(), "j. polski");
		Subject p4 = new Subject(u4.getId(), "Historia");
		this.subjectRepo.saveAll(Arrays.asList(p1,p2,p3,p4));
		
		this.teacherRepo.save(new Teacher(u1.getId(), p1.getId(), "Jan", "Nowak"));
		this.teacherRepo.save(new Teacher(u2.getId(), p2.getId(), "Adam", "Kowalski"));
		this.teacherRepo.save(new Teacher(u3.getId(), p3.getId(), "Jolanta", "Motyl"));
		this.teacherRepo.save(new Teacher(u4.getId(), p4.getId(), "Katarzyna", "Koza"));
		
		
		SchoolClass k1 = new SchoolClass("1A", "2020");
		SchoolClass k2 = new SchoolClass("1B", "2020");
		SchoolClass k3 = new SchoolClass("2A", "2020");
		this.schoolClassRepo.saveAll(Arrays.asList(k1,k2,k3));
		
		this.pupilRepo.save(new Pupil(u01.getId(), k1.getIdschoolclass(), "Marek", "Król"));
		this.pupilRepo.save(new Pupil(u02.getId(), k1.getIdschoolclass(), "Zuzanna", "Kłoda"));
		this.pupilRepo.save(new Pupil(u03.getId(), k1.getIdschoolclass(), "Ewa", "Adamska"));
		this.pupilRepo.save(new Pupil(u04.getId(), k2.getIdschoolclass(), "Jarosław", "Kaczyński"));
		this.pupilRepo.save(new Pupil(u05.getId(), k2.getIdschoolclass(), "Adam", "Małysz"));
		this.pupilRepo.save(new Pupil(u06.getId(), k2.getIdschoolclass(), "Anna", "Dymarska"));
		this.pupilRepo.save(new Pupil(u07.getId(), k3.getIdschoolclass(), "Ola", "Jakubowska"));
		this.pupilRepo.save(new Pupil(u08.getId(), k3.getIdschoolclass(), "Mateusz", "Kowalski"));
		
	}
	
	
	

}
