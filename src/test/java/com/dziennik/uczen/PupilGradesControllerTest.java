package com.dziennik.uczen;

import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.Matchers.hasProperty;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.hamcrest.Matchers.hasSize;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.dziennik.db.GradeRepo;
import com.dziennik.db.SubjectRepo;
import com.dziennik.model.Grade;
import com.dziennik.model.Pupil;
import com.dziennik.model.Subject;
import com.dziennik.view.GradesView;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(PupilGradesController.class)
class PupilGradesControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private GradeRepo gradeRepo;
	@MockBean
	private SubjectRepo subjectRepo;
	
	Pupil pupil = new Pupil(101l, 1l, "Jan", "Kowalski");
	
	RequestBuilder request;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
		request = MockMvcRequestBuilders.get("/pupil/home").sessionAttr("pupil", pupil);
	}

	//@Test
	public void CallThePathReturnStatusIsOK() throws Exception {
		
		when(gradeRepo.getPupilDistinctSubject(pupil.getId())).thenReturn(new ArrayList<>());
		
		MvcResult resutl = mockMvc.perform(request)
				.andExpect(status().isOk())
				.andExpect(view().name("pupil/home"))
				.andReturn();
	}

	
	//@Test
	public void pupilHasOneGrade() throws Exception {
		List<Long> subjectId = Arrays.asList(1l);

		
		List<Grade> grades = new ArrayList<>();
		grades.add(new Grade(pupil.getId(), 1l, 5));
		
		when(gradeRepo.getPupilDistinctSubject(pupil.getId())).thenReturn(subjectId);
		when(gradeRepo.findPupilSubjectGrade(pupil.getId(), 1l)).thenReturn(grades);
		when(subjectRepo.findById(1l)).thenReturn(Optional.of(new Subject(1l, "Biologia")));
		
		MvcResult resutl = mockMvc.perform(request)
				.andExpect(status().isOk())
				.andExpect(model().attribute("grades", hasSize(1)))
				.andExpect(model().attribute("grades", hasItem(hasProperty("subject", is("Biologia")))))
				.andExpect(model().attribute("grades", hasItem(hasProperty("grades", hasItem(is(5.0))))))
				.andExpect(model().attribute("grades", hasItem(hasProperty("average", is(5.0)))))
				.andReturn();
	}
	
	//@Test
	public void pupilHasManyGrades() throws Exception {
		RequestBuilder request = MockMvcRequestBuilders.get("/pupil/home")
					.sessionAttr("pupil", pupil);
		
		List<Grade> grades1 = Arrays.asList(new Grade(pupil.getId(), 1l, 5),
											new Grade(pupil.getId(), 1l, 3));
		
		List<Grade> grades2 = Arrays.asList(new Grade(pupil.getId(), 2l, 4));
		List<Grade> grades3 = Arrays.asList(new Grade(pupil.getId(), 3l, 4),
											new Grade(pupil.getId(), 3l, 5));	
		
		List<Long> subjectId = Arrays.asList(1l, 2l , 3l);
		
		
		when(gradeRepo.getPupilDistinctSubject(pupil.getId())).thenReturn(subjectId);
		when(gradeRepo.findPupilSubjectGrade(pupil.getId(), 1l))
							.thenReturn(grades1).thenReturn(grades2)
							.thenReturn(grades3);
		
		when(subjectRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(new Subject(1l, "Biologia")))
										.thenReturn(Optional.of(new Subject(2l, "Matematyka")))
										.thenReturn(Optional.of(new Subject(3l, "Historia")));
		
		
		MvcResult resutl = mockMvc.perform(request)
				.andExpect(status().isOk())
				.andExpect(model().attribute("grades", hasSize(3)))
				.andExpect(model().attribute("grades", hasItem(hasProperty("subject", is("Biologia")))))
				.andExpect(model().attribute("grades", hasItem(hasProperty("grades", hasItems( 5.0, 3.0)))))
				.andExpect(model().attribute("grades", hasItem(hasProperty("average", is(4.0)))))		
				.andExpect(model().attribute("grades", hasItem(hasProperty("subject", is("Matematyka")))))
				.andExpect(model().attribute("grades", hasItem(hasProperty("subject", is("Historia")))))
				.andReturn();
	}

}
