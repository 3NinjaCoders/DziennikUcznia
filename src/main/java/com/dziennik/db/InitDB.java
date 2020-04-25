package com.dziennik.db;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dziennik.model.Grade;
import com.dziennik.model.Pupil;
import com.dziennik.model.SchoolClass;
import com.dziennik.model.Subject;
import com.dziennik.model.Teacher;
import com.dziennik.model.UserAuth;

@Service
public class InitDB implements CommandLineRunner {
	
	private SchoolClassRepo schoolClassRepo;
	private TeacherRepo teacherRepo;
	private GradeRepo gradeRepo;
	private SubjectRepo subjectRepo;
	private PupilRepo pupilRepo;
	private UserRepo userRepo;
	private PasswordEncoder passwordEndcoder;
	
	@Autowired
	public InitDB(SchoolClassRepo schoolClassRepo, TeacherRepo teacherRepo, GradeRepo gradeRepo,
			SubjectRepo subjectRepo, PupilRepo pupilRepo, UserRepo userRepo, PasswordEncoder passwordEndcoder) {
		this.schoolClassRepo = schoolClassRepo;
		this.teacherRepo = teacherRepo;
		this.gradeRepo = gradeRepo;
		this.subjectRepo = subjectRepo;
		this.pupilRepo = pupilRepo;
		this.userRepo = userRepo;
		this.passwordEndcoder = passwordEndcoder;
	}





	@Override
	public void run(String... args) throws Exception {
		this.schoolClassRepo.deleteAll();
		this.teacherRepo.deleteAll();
		this.gradeRepo.deleteAll();
		this.subjectRepo.deleteAll();
		this.pupilRepo.deleteAll();
		this.userRepo.deleteAll();
		
		
		UserAuth u0 = new UserAuth("Dyr", passwordEndcoder.encode("123"), "DIRECTOR");
		this.userRepo.save(u0);
//		UserAuth u1 = new UserAuth("Jan123", passwordEndcoder.encode("123"), "TEACHER");
//		UserAuth u2 = new UserAuth("Adam123", passwordEndcoder.encode("123"), "TEACHER");
//		UserAuth u3 = new UserAuth("Jola123", passwordEndcoder.encode("123"), "TEACHER");
//		UserAuth u4 = new UserAuth("Kasia123", passwordEndcoder.encode("123"), "TEACHER");
		
//		UserAuth u01 = new UserAuth("uczen1", passwordEndcoder.encode("123"), "PUPIL");
//		UserAuth u02 = new UserAuth("uczen2", passwordEndcoder.encode("123"), "PUPIL");
//		UserAuth u03 = new UserAuth("uczen3", passwordEndcoder.encode("123"), "PUPIL");
//		UserAuth u04 = new UserAuth("uczen4", passwordEndcoder.encode("123"), "PUPIL");
//		UserAuth u05 = new UserAuth("uczen5", passwordEndcoder.encode("123"), "PUPIL");
//		UserAuth u06 = new UserAuth("uczen6", passwordEndcoder.encode("123"), "PUPIL");
//		UserAuth u07 = new UserAuth("uczen7", passwordEndcoder.encode("123"), "PUPIL");
//		UserAuth u08 = new UserAuth("uczen8", passwordEndcoder.encode("123"), "PUPIL");
//		this.userRepo.saveAll(Arrays.asList(u0, u1, u2, u3, u4, u01, u02, u03, u04, u05, u06, u07, u08));
		
//		Subject p1 = new Subject(u1.getId(), "Matematyka");
//		Subject p2 = new Subject(u2.getId(), "Biologia");
//		Subject p3 = new Subject(u3.getId(), "j. polski");
//		Subject p4 = new Subject(u4.getId(), "Historia");
		
		Subject p1 = new Subject("Matematyka");
		Subject p2 = new Subject("Biologia");
		Subject p3 = new Subject("j. polski");
		Subject p4 = new Subject("Historia");
		
		this.subjectRepo.saveAll(Arrays.asList(p1,p2,p3,p4));
		this.subjectRepo.save(new Subject("Fizyka"));
		this.subjectRepo.save(new Subject("Chemia"));
		this.subjectRepo.save(new Subject("Geografia"));
		this.subjectRepo.save(new Subject("j. angielski"));
		this.subjectRepo.save(new Subject("WOS"));
		
//		this.teacherRepo.save(new Teacher(u1.getId(), p1.getId(), "Jan", "Nowak"));
//		this.teacherRepo.save(new Teacher(u2.getId(), p2.getId(), "Adam", "Kowalski"));
//		this.teacherRepo.save(new Teacher(u3.getId(), p3.getId(), "Jolanta", "Motyl"));
//		this.teacherRepo.save(new Teacher(u4.getId(), p4.getId(), "Katarzyna", "Koza"));
		
		
//		SchoolClass k1 = new SchoolClass("1A", "2020", 20);
//		SchoolClass k2 = new SchoolClass("1B", "2020", 20);
//		SchoolClass k3 = new SchoolClass("2A", "2020", 30);
//		this.schoolClassRepo.saveAll(Arrays.asList(k1,k2,k3));
		
//		this.pupilRepo.save(new Pupil(u01.getId(), k1.getIdschoolclass(), "Marek", "Król"));
//		this.pupilRepo.save(new Pupil(u02.getId(), k1.getIdschoolclass(), "Zuzanna", "Kłoda"));
//		this.pupilRepo.save(new Pupil(u03.getId(), k1.getIdschoolclass(), "Ewa", "Adamska"));
//		this.pupilRepo.save(new Pupil(u04.getId(), k2.getIdschoolclass(), "Jarosław", "Kaczyński"));
//		this.pupilRepo.save(new Pupil(u05.getId(), k2.getIdschoolclass(), "Adam", "Małysz"));
//		this.pupilRepo.save(new Pupil(u06.getId(), k2.getIdschoolclass(), "Anna", "Dymarska"));
//		this.pupilRepo.save(new Pupil(u07.getId(), k3.getIdschoolclass(), "Ola", "Jakubowska"));
//		this.pupilRepo.save(new Pupil(u08.getId(), k3.getIdschoolclass(), "Mateusz", "Kowalski"));
//		
//		
//		this.gradeRepo.save(new Grade(u01.getId(), p1.getId(), 5.0));
//		this.gradeRepo.save(new Grade(u01.getId(), p1.getId(), 2.0));
//		this.gradeRepo.save(new Grade(u01.getId(), p1.getId(), 3.5));
//		this.gradeRepo.save(new Grade(u01.getId(), p2.getId(), 4.5));
//		this.gradeRepo.save(new Grade(u01.getId(), p2.getId(), 4));
//		this.gradeRepo.save(new Grade(u01.getId(), p3.getId(), 5));
		
	}
}

