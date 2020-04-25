package com.dziennik;

import java.util.Arrays;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dziennik.db.GradeRepo;
import com.dziennik.db.PupilRepo;
import com.dziennik.db.SchoolClassRepo;
import com.dziennik.db.SubjectRepo;
import com.dziennik.db.TeacherRepo;
import com.dziennik.db.UserRepo;
import com.dziennik.model.Subject;
import com.dziennik.model.UserAuth;

@Service
public class ResetService {

	private SchoolClassRepo schoolClassRepo;
	private TeacherRepo teacherRepo;
	private GradeRepo gradeRepo;
	private SubjectRepo subjectRepo;
	private PupilRepo pupilRepo;
	private UserRepo userRepo;
	private PasswordEncoder passwordEndcoder;
	
	public ResetService(SchoolClassRepo schoolClassRepo, TeacherRepo teacherRepo, GradeRepo gradeRepo,
			SubjectRepo subjectRepo, PupilRepo pupilRepo, UserRepo userRepo, PasswordEncoder passwordEndcoder) {
		this.schoolClassRepo = schoolClassRepo;
		this.teacherRepo = teacherRepo;
		this.gradeRepo = gradeRepo;
		this.subjectRepo = subjectRepo;
		this.pupilRepo = pupilRepo;
		this.userRepo = userRepo;
		this.passwordEndcoder = passwordEndcoder;
	}

	public void reset() {
		this.schoolClassRepo.deleteAll();
		this.teacherRepo.deleteAll();
		this.gradeRepo.deleteAll();
		this.subjectRepo.deleteAll();
		this.pupilRepo.deleteAll();
		this.userRepo.deleteAll();
		
		
		UserAuth u0 = new UserAuth("Dyr", passwordEndcoder.encode("123"), "DIRECTOR");
		this.userRepo.save(u0);
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
	}
	
	
}
